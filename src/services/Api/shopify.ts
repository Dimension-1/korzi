import { GraphQLClient } from "graphql-request";
import Cookies from 'js-cookie';

const shopifyUrl = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL!;
const shopifyToken = process.env.NEXT_SHOPIFY_TOKEN!;
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

const UPDATE_CART_LINE = `
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

const CREATE_CHECKOUT = `
  mutation checkoutCreate($input: CheckoutInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        totalPrice {
          amount
          currencyCode
        }
        lineItems(first: 100) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                  handle
                }
              }
            }
          }
        }
      }
      checkoutUserErrors {
        field
        message
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

// Cart Management Functions
export const getCartId = (): string | null => {
  return Cookies.get('shopify_cart_id') || null;
};

export const setCartId = (cartId: string): void => {
  Cookies.set('shopify_cart_id', cartId, { expires: 30 });
};

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

export const getCart = async (): Promise<Cart | null> => {
  const cartId = getCartId();
  if (!cartId) return null;

  try {
    const data = await shopifyClient.request(GET_CART, { cartId });
    return (data as any).cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
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

export const updateCartLine = async (lineId: string, quantity: number): Promise<Cart | null> => {
  const cartId = getCartId();
  if (!cartId) return null;

  try {
    const data = await shopifyClient.request(UPDATE_CART_LINE, {
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

export const removeFromCart = async (lineId: string): Promise<Cart | null> => {
  const cartId = getCartId();
  if (!cartId) return null;

  try {
    const data = await shopifyClient.request(REMOVE_FROM_CART, {
      cartId,
      lineIds: [lineId]
    });

    return (data as any).cartLinesRemove.cart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return null;
  }
};

// Product Functions
export const getProducts = async (limit: number = 20): Promise<ShopifyProduct[]> => {
  try {
    const data = await shopifyClient.request(GET_PRODUCTS, { first: limit });
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

// Checkout Function
export const createCheckout = async (): Promise<string | null> => {
  const cart = await getCart();
  if (!cart) return null;

  try {
    const lineItems = cart.lines.edges.map(edge => ({
      variantId: edge.node.merchandise.id,
      quantity: edge.node.quantity
    }));

    const data = await shopifyClient.request(CREATE_CHECKOUT, {
      input: {
        lineItems
      }
    });

    const checkout = (data as any).checkoutCreate.checkout;
    return checkout?.webUrl || null;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
};
