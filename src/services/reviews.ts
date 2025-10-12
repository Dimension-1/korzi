import { GraphQLClient } from "graphql-request";

const shopifyUrl = import.meta.env.VITE_SHOPIFY_STOREFRONT_URL;
const shopifyToken = import.meta.env.VITE_SHOPIFY_TOKEN;

// Use Admin API for metaobject creation (requires different token)
const shopifyAdminUrl = import.meta.env.VITE_SHOPIFY_ADMIN_URL || shopifyUrl.replace('/api/2023-10/graphql.json', '/admin/api/2023-10/graphql.json');
const shopifyAdminToken = import.meta.env.VITE_SHOPIFY_ADMIN_TOKEN || shopifyToken;

const shopifyAdminClient = new GraphQLClient(shopifyAdminUrl, {
  headers: {
    'X-Shopify-Access-Token': shopifyAdminToken,
  },
});

// Types
export interface ReviewData {
  rating: number;
  text: string;
  name: string;
  email: string;
  productId?: string;
  images?: FileList | null;
  video?: File | null;
}

export interface ReviewResponse {
  success: boolean;
  reviewId?: string;
  errors?: string[];
  message?: string;
}

// GraphQL Mutation for creating review metaobject
const CREATE_REVIEW_METAOBJECT = `
  mutation metaobjectCreate($metaobject: MetaobjectCreateInput!) {
    metaobjectCreate(metaobject: $metaobject) {
      metaobject {
        id
        handle
        type
        fields {
          key
          value
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// GraphQL Query to get product information
const GET_PRODUCT_INFO = `
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      handle
    }
  }
`;

// Upload file to Shopify Files API
const uploadFile = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${shopifyAdminUrl.replace('/graphql.json', '')}/files.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': shopifyAdminToken,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    const data = await response.json();
    return data.file?.url || null;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

// Submit review to Shopify
export const submitReview = async (reviewData: ReviewData): Promise<ReviewResponse> => {
  try {
    // Validate required fields
    if (!reviewData.rating || reviewData.rating < 1 || reviewData.rating > 5) {
      return {
        success: false,
        errors: ['Rating must be between 1 and 5'],
        message: 'Invalid rating'
      };
    }

    if (!reviewData.text.trim()) {
      return {
        success: false,
        errors: ['Review text is required'],
        message: 'Review text cannot be empty'
      };
    }

    if (!reviewData.name.trim()) {
      return {
        success: false,
        errors: ['Name is required'],
        message: 'Name cannot be empty'
      };
    }

    if (!reviewData.email.trim()) {
      return {
        success: false,
        errors: ['Email is required'],
        message: 'Email cannot be empty'
      };
    }

    // Upload images if provided (optional)
    let imageUrls: string[] = [];
    if (reviewData.images && reviewData.images.length > 0) {
      try {
        const uploadPromises = Array.from(reviewData.images).map(file => uploadFile(file));
        const uploadedUrls = await Promise.all(uploadPromises);
        imageUrls = uploadedUrls.filter(url => url !== null) as string[];
      } catch (error) {
        console.warn('Failed to upload images, continuing without them:', error);
        // Continue without images if upload fails
      }
    }

    // Upload video if provided (optional)
    let videoUrl: string | null = null;
    if (reviewData.video) {
      try {
        videoUrl = await uploadFile(reviewData.video);
      } catch (error) {
        console.warn('Failed to upload video, continuing without it:', error);
        // Continue without video if upload fails
      }
    }

    // Prepare metaobject fields
    const fields = [
      {
        key: 'rating',
        value: JSON.stringify({
          scale_min: '1.0',
          scale_max: '5.0',
          value: reviewData.rating.toString()
        })
      },
      {
        key: 'review_text',
        value: reviewData.text
      },
      {
        key: 'author_name',
        value: reviewData.name
      },
      {
        key: 'author_email',
        value: reviewData.email
      },
      {
        key: 'submitted_at',
        value: new Date().toISOString()
      },
      {
        key: 'source',
        value: 'web_app'
      },
      {
        key: 'app_verification_status',
        value: 'verified'
      },
      {
        key: 'language',
        value: 'en'
      }
    ];

    // Add product reference if provided
    if (reviewData.productId) {
      fields.push({
        key: 'product',
        value: reviewData.productId
      });
    }

    // Add image URLs if any (optional)
    if (imageUrls.length > 0) {
      fields.push({
        key: 'images',
        value: JSON.stringify(imageUrls)
      });
    }

    // Add video URL if provided (optional)
    if (videoUrl) {
      fields.push({
        key: 'video',
        value: videoUrl
      });
    }

    // Try metaobject creation first, fallback to REST API if needed
    try {
      const data = await shopifyAdminClient.request(CREATE_REVIEW_METAOBJECT, {
        metaobject: {
          type: 'product_review', // This should match your metaobject definition
          fields: fields
        }
      });

      const result = (data as any).metaobjectCreate;

      if (result.userErrors && result.userErrors.length > 0) {
        console.warn('Metaobject creation failed, trying REST API fallback:', result.userErrors);
        return await submitReviewViaREST(reviewData);
      }

      return {
        success: true,
        reviewId: result.metaobject?.id,
        message: 'Review submitted successfully!'
      };
    } catch (metaobjectError) {
      console.warn('Metaobject creation failed, trying REST API fallback:', metaobjectError);
      return await submitReviewViaREST(reviewData);
    }

  } catch (error) {
    console.error('Error submitting review:', error);
    return {
      success: false,
      errors: ['Network error. Please try again.'],
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Get product information for review context
export const getProductInfo = async (productId: string) => {
  try {
    const data = await shopifyAdminClient.request(GET_PRODUCT_INFO, {
      id: productId
    });
    return (data as any).product;
  } catch (error) {
    console.error('Error fetching product info:', error);
    return null;
  }
};

// Alternative: Submit review via REST API (if metaobjects are not available)
export const submitReviewViaREST = async (reviewData: ReviewData): Promise<ReviewResponse> => {
  try {
    const storeUrl = import.meta.env.VITE_SHOPIFY_STORE_URL;
    
    // Prepare review data (without media for REST API)
    const reviewPayload = {
      rating: reviewData.rating,
      text: reviewData.text,
      name: reviewData.name,
      email: reviewData.email,
      productId: reviewData.productId,
      submittedAt: new Date().toISOString(),
      // Note: Media uploads would need separate handling in REST API
      hasImages: reviewData.images && reviewData.images.length > 0,
      hasVideo: !!reviewData.video
    };
    
    // Create a custom review submission endpoint
    const response = await fetch(`${storeUrl}/apps/reviews/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': shopifyAdminToken,
      },
      body: JSON.stringify(reviewPayload),
    });

    if (!response.ok) {
      throw new Error('Failed to submit review');
    }

    const result = await response.json();
    
    return {
      success: true,
      reviewId: result.id,
      message: 'Review submitted successfully!'
    };

  } catch (error) {
    console.error('Error submitting review via REST:', error);
    return {
      success: false,
      errors: ['Network error. Please try again.'],
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
