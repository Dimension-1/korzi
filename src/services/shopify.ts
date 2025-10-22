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