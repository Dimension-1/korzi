// Note: This service uses Shopify Storefront API for checkout
// The Storefront API is designed for browser use and doesn't have CORS issues
// It uses the cart checkout flow instead of direct order creation

import { GraphQLClient } from "graphql-request";
import { getCartId, getCart } from './shopify';

// Get Shopify Storefront API configuration
const getShopifyStorefrontConfig = () => {
  const storeUrl = import.meta.env.VITE_SHOPIFY_STOREFRONT_URL;
  const storefrontToken = import.meta.env.VITE_SHOPIFY_TOKEN;
  
  if (!storeUrl) {
    throw new Error('VITE_SHOPIFY_STOREFRONT_URL environment variable is required');
  }
  if (!storefrontToken) {
    throw new Error('VITE_SHOPIFY_TOKEN environment variable is required');
  }
  
  return {
    storeUrl,
    storefrontToken
  };
};

// Create Shopify Storefront GraphQL client
const createStorefrontClient = () => {
  const { storeUrl, storefrontToken } = getShopifyStorefrontConfig();
  return new GraphQLClient(storeUrl, {
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontToken,
    },
  });
};

// Types
export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  variantId?: string;
  image?: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface ShippingAddress {
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
}

export interface OrderData {
  items: OrderItem[];
  customer: CustomerInfo;
  shippingAddress: ShippingAddress;
  totalAmount: number;
  currency: string;
}

export interface OrderResponse {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  errors?: string[];
}

// Storefront API mutation to update cart buyer identity
const UPDATE_CART_BUYER_IDENTITY = `
  mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        id
        checkoutUrl
        buyerIdentity {
          email
          phone
          customer {
            id
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Helper function to update cart with customer info
const updateCartWithCustomerInfo = async (cartId: string, customerInfo: CustomerInfo, shippingAddress: ShippingAddress): Promise<string | null> => {
  const storefrontClient = createStorefrontClient();
  
  try {
    console.log('=== UPDATING CART WITH CUSTOMER INFO ===');
    console.log('Cart ID:', cartId);
    console.log('Customer info:', customerInfo);
    console.log('Shipping address:', shippingAddress);
    
    // Update cart with buyer identity
    const result = await storefrontClient.request(UPDATE_CART_BUYER_IDENTITY, {
      cartId,
      buyerIdentity: {
        email: customerInfo.email,
        phone: customerInfo.phone || null,
        countryCode: shippingAddress.country === 'India' ? 'IN' : 'US',
        deliveryAddressPreferences: [{
          deliveryAddress: {
            address1: shippingAddress.address1,
            address2: shippingAddress.address2 || null,
            city: shippingAddress.city,
            province: shippingAddress.province,
            country: shippingAddress.country,
            zip: shippingAddress.zip,
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            phone: customerInfo.phone || null
          }
        }]
      }
    });
    
    console.log('Cart update result:', result);
    
    const cart = (result as any).cartBuyerIdentityUpdate.cart;
    const userErrors = (result as any).cartBuyerIdentityUpdate.userErrors;
    
    if (userErrors && userErrors.length > 0) {
      console.error('Errors updating cart:', userErrors);
      return null;
    }
    
    if (cart && cart.checkoutUrl) {
      console.log('Cart updated successfully, checkout URL:', cart.checkoutUrl);
      return cart.checkoutUrl;
    }
    
    console.log('Failed to get checkout URL');
    return null;
  } catch (error) {
    console.error('=== CART UPDATE ERROR ===');
    console.error('Error updating cart:', error);
    console.error('=========================');
    return null;
  }
};

// Place order using Shopify Storefront API (browser-safe, no CORS issues)
export const placeOrder = async (orderData: OrderData): Promise<OrderResponse> => {
  try {
    console.log('=== SHOPIFY CHECKOUT START (STOREFRONT API) ===');
    console.log('Order data:', orderData);
    
    // 1. Get current cart ID
    console.log('Step 1: Getting cart ID...');
    const cartId = getCartId();
    
    if (!cartId) {
      console.error('No cart found');
      return {
        success: false,
        errors: ['Cart not found. Please add items to cart first.']
      };
    }
    
    console.log('Cart ID:', cartId);
    
    // 2. Get current cart to verify items
    console.log('Step 2: Verifying cart contents...');
    const cart = await getCart(cartId);
    
    if (!cart || cart.lines.edges.length === 0) {
      console.error('Cart is empty');
      return {
        success: false,
        errors: ['Cart is empty. Please add items to cart first.']
      };
    }
    
    console.log('Cart contents verified:', cart);
    
    // 3. Update cart with customer info and shipping address
    console.log('Step 3: Updating cart with customer info...');
    const checkoutUrl = await updateCartWithCustomerInfo(
      cartId,
      orderData.customer,
      orderData.shippingAddress
    );
    
    if (!checkoutUrl) {
      console.error('Failed to update cart with customer info');
      return {
        success: false,
        errors: ['Failed to prepare checkout. Please try again.']
      };
    }
    
    console.log('=== CHECKOUT READY ===');
    console.log('Checkout URL:', checkoutUrl);
    console.log('======================');
    
    // 4. Redirect to Shopify checkout page
    // The checkout page will handle payment and order creation
    console.log('Redirecting to Shopify checkout...');
    window.location.href = checkoutUrl;
    
    // Return success - the actual order will be created by Shopify checkout
    return {
      success: true,
      orderId: cartId, // Using cart ID temporarily
      orderNumber: `CHECKOUT-${Date.now()}` // Temporary order number
    };
    
  } catch (error) {
    console.error('Error preparing checkout:', error);
    return {
      success: false,
      errors: ['Failed to prepare checkout. Please try again.']
    };
  }
};

// Get order details (for order confirmation page)
export const getOrderDetails = async (orderId: string): Promise<any> => {
  try {
    // In a real implementation, fetch from your backend/database
    // For now, return mock data
    return {
      id: orderId,
      orderNumber: `ORD-${orderId.slice(-6)}`,
      status: 'confirmed',
      totalAmount: 0, // Will be set by the calling component
      items: [], // Will be set by the calling component
      customer: {}, // Will be set by the calling component
      shippingAddress: {}, // Will be set by the calling component
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
};

// Note: Order payment status updates are handled by Shopify checkout
// No need to manually update payment status when using Storefront API checkout

// Create order in Shopify using Admin API (after payment confirmation)
const CREATE_ORDER_ADMIN = `
  mutation draftOrderCreate($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder {
        id
        name
        order {
          id
          name
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Create order in Shopify Admin API after successful Razorpay payment
export const createShopifyOrder = async (orderData: OrderData, paymentId: string): Promise<OrderResponse> => {
  try {
    const adminToken = import.meta.env.VITE_SHOPIFY_ADMIN_TOKEN;
    const shopifyAdminUrl = import.meta.env.VITE_SHOPIFY_STOREFRONT_URL?.replace('/storefront/', '/admin/');
    
    if (!adminToken || !shopifyAdminUrl) {
      throw new Error('Shopify Admin API credentials not configured');
    }

    const adminClient = new GraphQLClient(shopifyAdminUrl, {
      headers: {
        'X-Shopify-Access-Token': adminToken,
      },
    });

    // Prepare line items
    const lineItems = orderData.items.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity,
      customAttributes: [{
        key: 'payment_id',
        value: paymentId
      }]
    }));

    // Create draft order
    const result = await adminClient.request(CREATE_ORDER_ADMIN, {
      input: {
        email: orderData.customer.email,
        phone: orderData.customer.phone,
        lineItems: lineItems,
        shippingAddress: {
          firstName: orderData.customer.firstName,
          lastName: orderData.customer.lastName,
          address1: orderData.shippingAddress.address1,
          address2: orderData.shippingAddress.address2,
          city: orderData.shippingAddress.city,
          province: orderData.shippingAddress.province,
          country: orderData.shippingAddress.country,
          zip: orderData.shippingAddress.zip,
          phone: orderData.customer.phone
        },
        billingAddress: {
          firstName: orderData.customer.firstName,
          lastName: orderData.customer.lastName,
          address1: orderData.shippingAddress.address1,
          address2: orderData.shippingAddress.address2,
          city: orderData.shippingAddress.city,
          province: orderData.shippingAddress.province,
          country: orderData.shippingAddress.country,
          zip: orderData.shippingAddress.zip,
          phone: orderData.customer.phone
        },
        customAttributes: [{
          key: 'razorpay_payment_id',
          value: paymentId
        }],
        note: `Order paid via Razorpay. Payment ID: ${paymentId}`
      }
    });

    const draftOrder = (result as any).draftOrderCreate.draftOrder;
    const userErrors = (result as any).draftOrderCreate.userErrors;

    if (userErrors && userErrors.length > 0) {
      console.error('Errors creating order:', userErrors);
      return {
        success: false,
        errors: userErrors.map((e: any) => e.message)
      };
    }

    if (draftOrder && draftOrder.order) {
      return {
        success: true,
        orderId: draftOrder.order.id,
        orderNumber: draftOrder.order.name
      };
    }

    return {
      success: false,
      errors: ['Failed to create order']
    };
  } catch (error) {
    console.error('Error creating Shopify order:', error);
    return {
      success: false,
      errors: [error instanceof Error ? error.message : 'Failed to create order']
    };
  }
};

// Process payment using Razorpay
export const processPayment = async (
  amount: number,
  currency: string,
  orderId: string,
  _customerInfo: CustomerInfo
): Promise<{ success: boolean; paymentId?: string; errors?: string[] }> => {
  try {
    console.log('Note: Razorpay payment will be handled in the checkout component');
    console.log(`Payment amount: ${amount} ${currency} for order ${orderId}`);
    
    // Payment will be handled by Razorpay SDK in the frontend
    // This function is kept for compatibility
    return {
      success: true,
      paymentId: 'razorpay-pending'
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      errors: [error instanceof Error ? error.message : 'Payment failed']
    };
  }
};
