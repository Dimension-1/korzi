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
const GET_COLLECTIONS = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
          products(first: 4) {
            edges {
              node {
                id
                title
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
              }
            }
          }
        }
      }
    }
  }
`;

const GET_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
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
  }
`;

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

const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
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
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

// Collection Functions
export const getCollections = async (limit: number = 20): Promise<ShopifyCollection[]> => {
  try {
    const data = await shopifyClient.request(GET_COLLECTIONS, { first: limit });
    return (data as any).collections.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
};

export const getCollectionByHandle = async (handle: string, limit: number = 20): Promise<ShopifyCollection | null> => {
  try {
    const data = await shopifyClient.request(GET_COLLECTION_BY_HANDLE, { handle, first: limit });
    return (data as any).collection;
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
};

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

export const getProductByHandle = async (handle: string): Promise<ShopifyProduct | null> => {
  try {
    const data = await shopifyClient.request(GET_PRODUCT_BY_HANDLE, { handle });
    return (data as any).product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
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

// Get current cart details
export const getCart = async (cartId?: string): Promise<Cart | null> => {
  const currentCartId = cartId || getCartId();
  
  if (!currentCartId) {
    return null;
  }

  try {
    const data = await shopifyClient.request(GET_CART, {
      cartId: currentCartId
    });
    
    return (data as any).cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
};

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

// Remove items from cart
export const removeFromCart = async (lineIds: string[]): Promise<Cart | null> => {
  const cartId = getCartId();
  
  if (!cartId) {
    return null;
  }

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

// Get checkout URL for current cart
export const getCheckoutUrl = async (cartId?: string): Promise<string | null> => {
  const currentCartId = cartId || getCartId();
  
  if (!currentCartId) {
    return null;
  }

  try {
    const cart = await getCart(currentCartId);
    return cart?.checkoutUrl || null;
  } catch (error) {
    console.error('Error getting checkout URL:', error);
    return null;
  }
};

// Clear all cart items (remove all lines)
export const clearCart = async (): Promise<Cart | null> => {
  const cartId = getCartId();
  
  if (!cartId) {
    return null;
  }

  try {
    // First get all line IDs
    const cart = await getCart(cartId);
    if (!cart || !cart.lines.edges.length) {
      return cart;
    }

    const lineIds = cart.lines.edges.map((edge: any) => edge.node.id);
    
    // Remove all lines
    return await removeFromCart(lineIds);
  } catch (error) {
    console.error('Error clearing cart:', error);
    return null;
  }
};