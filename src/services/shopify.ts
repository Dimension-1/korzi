import { GraphQLClient } from "graphql-request";
import Cookies from 'js-cookie';

const shopifyUrl = import.meta.env.VITE_SHOPIFY_STOREFRONT_URL;
const shopifyToken = import.meta.env.VITE_SHOPIFY_TOKEN;
const shopifyClient = new GraphQLClient(shopifyUrl, {
  headers: {
    'X-Shopify-Storefront-Access-Token': shopifyToken,
  },
});

// Types
export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: {
    url: string;
    altText: string;
  };
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

export interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      id: string;
      title: string;
      handle: string;
    };
    image?: {
      url: string;
      altText: string;
    };
  };
}

export interface Cart {
  id: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: Array<{
      node: CartItem;
    }>;
  };
  checkoutUrl?: string;
}

// GraphQL Queries
const GET_PRODUCTS = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

// Product Functions
export const getProducts = async (limit: number = 20): Promise<ShopifyProduct[]> => {
  try {
    const data = await shopifyClient.request(GET_PRODUCTS, { first: limit });
    console.log(data); 
    return (data as any).products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Cart Management Functions
export const getCartId = (): string | null => {
  return Cookies.get('shopify_cart_id') || null;
};

export const setCartId = (cartId: string): void => {
  Cookies.set('shopify_cart_id', cartId, { expires: 30 });
};

const CREATE_CART = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
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

const ADD_TO_CART = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
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

export const createCart = async (): Promise<Cart | null> => {
  try {
    const data = await shopifyClient.request(CREATE_CART, {
      input: {}
    });
    
    const cart = (data as any).cartCreate.cart;
    if (cart) {
      setCartId(cart.id);
    }
    return cart;
  } catch (error) {
    console.error('Error creating cart:', error);
    return null;
  }
};

export const addToCart = async (variantId: string, quantity: number = 1): Promise<Cart | null> => {
  let cartId = getCartId();
  
  if (!cartId) {
    const newCart = await createCart();
    cartId = newCart?.id || null;
  }

  if (!cartId) return null;

  try {
    const data = await shopifyClient.request(ADD_TO_CART, {
      cartId,
      lines: [{
        merchandiseId: variantId,
        quantity
      }]
    });

    return (data as any).cartLinesAdd.cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return null;
  }
};

// Additional Cart Management Queries and Mutations
const GET_CART = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                  handle
                }
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
      checkoutUrl
    }
  }
`;

// Get current cart details
export const getCart = async (cartId?: string): Promise<Cart | null> => {
  const currentCartId = cartId || getCartId();
  console.log('getCart called with cartId:', currentCartId);
  
  if (!currentCartId) {
    console.log('No cart ID provided to getCart');
    return null;
  }

  try {
    console.log('Making GraphQL request for cart:', currentCartId);
    const data = await shopifyClient.request(GET_CART, {
      cartId: currentCartId
    });
    
    console.log('GraphQL response:', data);
    const cart = (data as any).cart;
    console.log('Extracted cart:', cart);
    
    return cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
};

const UPDATE_CART_LINES = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
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

// Update cart line item quantity
export const updateCartLine = async (lineId: string, quantity: number): Promise<Cart | null> => {
  const cartId = getCartId();
  
  if (!cartId) {
    return null;
  }

  try {
    const data = await shopifyClient.request(UPDATE_CART_LINES, {
      cartId,
      lines: [{
        id: lineId,
        quantity
      }]
    });

    return (data as any).cartLinesUpdate.cart;
  } catch (error) {
    console.error('Error updating cart line:', error);
    return null;
  }
};

// Add or update item in cart (smarter version with better error handling)
export const addOrUpdateCart = async (variantId: string, quantity: number = 1): Promise<Cart | null> => {
  let cartId = getCartId();
  
  // Create cart if doesn't exist
  if (!cartId) {
    const newCart = await createCart();
    cartId = newCart?.id || null;
  }

  if (!cartId) return null;

  try {
    // Get existing cart to check if item already exists
    const existingCart = await getCart(cartId);
    
    if (existingCart) {
      // Check if variant already in cart
      const existingLine = existingCart.lines.edges.find(
        (edge) => edge.node.merchandise.id === variantId
      );

      if (existingLine) {
        // Update existing line
        console.log('Updating existing cart line...');
        const updatedCart = await updateCartLine(existingLine.node.id, quantity);
        
        // Add delay to ensure Shopify backend processes the update
        if (updatedCart) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        return updatedCart;
      }
    }

    // Add new item if not exists
    console.log('Adding new item to cart...');
    const newCart = await addToCart(variantId, quantity);
    
    // Add delay to ensure Shopify backend processes the addition
    if (newCart) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return newCart;
  } catch (error) {
    console.error('Error in addOrUpdateCart:', error);
    return null;
  }
};

// Clear entire cart (remove all items)
export const clearCart = async (): Promise<Cart | null> => {
  const cartId = getCartId();
  
  if (!cartId) {
    return null;
  }

  try {
    // Get current cart to get all line IDs
    const currentCart = await getCart(cartId);
    
    if (!currentCart || currentCart.lines.edges.length === 0) {
      return currentCart; // Already empty
    }

    // Get all line IDs
    const lineIds = currentCart.lines.edges.map(edge => edge.node.id);
    
    // Remove all items
    const clearedCart = await removeFromCart(lineIds);
    
    // Add delay to ensure Shopify backend processes the removal
    if (clearedCart) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return clearedCart;
  } catch (error) {
    console.error('Error clearing cart:', error);
    return null;
  }
};

// Sync React cart state with Shopify cart
export const syncCartWithShopify = async (): Promise<Cart | null> => {
  const cartId = getCartId();
  
  if (!cartId) {
    return null;
  }

  try {
    const shopifyCart = await getCart(cartId);
    
    if (shopifyCart) {
      console.log('Cart synced with Shopify:', shopifyCart);
    }
    
    return shopifyCart;
  } catch (error) {
    console.error('Error syncing cart with Shopify:', error);
    return null;
  }
};

// Validate cart ID and refresh if needed
export const validateAndRefreshCart = async (): Promise<Cart | null> => {
  const cartId = getCartId();
  console.log('Cart ID from cookies:', cartId);
  
  if (!cartId) {
    console.log('No cart ID found, creating new cart...');
    // No cart ID, create new cart
    return await createCart();
  }

  try {
    console.log('Fetching cart with ID:', cartId);
    // Try to fetch cart with existing ID
    const cart = await getCart(cartId);
    console.log('Fetched cart:', cart);
    
    if (!cart) {
      console.log('Cart not found with ID, creating new cart...');
      // Cart ID is invalid, create new cart
      const newCart = await createCart();
      return newCart;
    }
    
    console.log('Cart validation successful, returning cart with', cart.lines?.edges?.length || 0, 'items');
    return cart;
  } catch (error) {
    console.error('Error validating cart:', error);
    // Create new cart if validation fails
    return await createCart();
  }
};

// Remove items from cart
export const removeFromCart = async (lineIds: string[]): Promise<Cart | null> => {
  const cartId = getCartId();
  
  if (!cartId) {
    return null;
  }

  const REMOVE_FROM_CART = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      id
                      title
                      handle
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
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

  try {
    const data = await shopifyClient.request(REMOVE_FROM_CART, {
      cartId,
      lineIds
    });

    return (data as any).cartLinesRemove.cart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return null;
  }
};