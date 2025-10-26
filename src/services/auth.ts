// Shopify Customer Authentication Service
// Using Shopify Storefront API for customer authentication

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  acceptsMarketing: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptsMarketing?: boolean;
}

export interface AuthResponse {
  success: boolean;
  customer?: Customer;
  errors?: string[];
  message?: string;
}

// Get Shopify store URL and access token from environment
const getShopifyConfig = () => {
  const storeUrl = import.meta.env.VITE_SHOPIFY_STOREFRONT_URL;
  const accessToken = import.meta.env.VITE_SHOPIFY_TOKEN;
  
  if (!storeUrl) {
    throw new Error('VITE_SHOPIFY_STOREFRONT_URL environment variable is required');
  }
  if (!accessToken) {
    throw new Error('VITE_SHOPIFY_TOKEN environment variable is required');
  }
  
  return {
    storeUrl: storeUrl.endsWith('/') ? storeUrl.slice(0, -1) : storeUrl,
    accessToken
  };
};

// GraphQL queries for customer authentication
const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

const CUSTOMER_CREATE = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
        acceptsMarketing
        createdAt
        updatedAt
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

const CUSTOMER_RECOVER = `
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        field
        message
      }
    }
  }
`;

const GET_CUSTOMER = `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      acceptsMarketing
      createdAt
      updatedAt
    }
  }
`;

const CUSTOMER_ACTIVATE_BY_URL = `
  mutation customerActivateByUrl($activationUrl: URL!, $password: String!) {
    customerActivateByUrl(activationUrl: $activationUrl, password: $password) {
      customer {
        id
        email
        firstName
        lastName
        acceptsMarketing
        createdAt
        updatedAt
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

// Helper function to make GraphQL requests
const makeGraphQLRequest = async (query: string, variables: any = {}) => {
  const { storeUrl, accessToken } = getShopifyConfig();
  
  
  const response = await fetch(storeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Response error:', response.status, errorText);
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    console.error('GraphQL errors:', data.errors);
    throw new Error(data.errors[0].message);
  }

  return data.data;
};

// Customer Login
export const loginCustomer = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const data = await makeGraphQLRequest(CUSTOMER_ACCESS_TOKEN_CREATE, {
      input: {
        email: credentials.email,
        password: credentials.password,
      },
    });

    const { customerAccessTokenCreate } = data;

    if (customerAccessTokenCreate.customerUserErrors.length > 0) {
      return {
        success: false,
        errors: customerAccessTokenCreate.customerUserErrors.map((error: any) => {
          // Make error messages more user-friendly
          if (error.message.includes('Unidentified customer')) {
            return 'Invalid email or password. Please check your credentials and try again.';
          }
          return error.message;
        }),
      };
    }

    if (!customerAccessTokenCreate.customerAccessToken) {
      return {
        success: false,
        errors: ['Invalid credentials'],
      };
    }

    // Store the access token in sessionStorage (more secure than localStorage)
    sessionStorage.setItem('shopify_customer_token', customerAccessTokenCreate.customerAccessToken.accessToken);

    // Get customer details
    const customerData = await makeGraphQLRequest(GET_CUSTOMER, {
      customerAccessToken: customerAccessTokenCreate.customerAccessToken.accessToken,
    });

    const customer: Customer = {
      id: customerData.customer.id,
      email: customerData.customer.email,
      firstName: customerData.customer.firstName || '',
      lastName: customerData.customer.lastName || '',
      displayName: `${customerData.customer.firstName || ''} ${customerData.customer.lastName || ''}`.trim(),
      acceptsMarketing: customerData.customer.acceptsMarketing,
      createdAt: customerData.customer.createdAt,
      updatedAt: customerData.customer.updatedAt,
    };

    return {
      success: true,
      customer,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      errors: ['Network error. Please try again.'],
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Customer Registration
export const registerCustomer = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const result = await makeGraphQLRequest(CUSTOMER_CREATE, {
      input: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        acceptsMarketing: data.acceptsMarketing || false,
      },
    });

    console.log('Registration result:', result);

    const { customerCreate } = result;

    if (customerCreate.customerUserErrors.length > 0) {
      return {
        success: false,
        errors: customerCreate.customerUserErrors.map((error: any) => {
          // Make error messages more user-friendly
          if (error.message.includes('Email has already been taken')) {
            return 'An account with this email already exists. Please try logging in instead.';
          }
          if (error.message.includes('Password is too short')) {
            return 'Password must be at least 6 characters long.';
          }
          return error.message;
        }),
      };
    }

    if (!customerCreate.customer) {
      return {
        success: false,
        errors: ['Registration failed'],
      };
    }

    return {
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      errors: ['Network error. Please try again.'],
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Password Recovery
export const recoverPassword = async (email: string): Promise<AuthResponse> => {
  try {
    const result = await makeGraphQLRequest(CUSTOMER_RECOVER, {
      email,
    });

    const { customerRecover } = result;

    if (customerRecover.customerUserErrors.length > 0) {
      return {
        success: false,
        errors: customerRecover.customerUserErrors.map((error: any) => error.message),
      };
    }

    return {
      success: true,
      message: 'Password recovery email sent successfully',
    };
  } catch (error) {
    console.error('Password recovery error:', error);
    return {
      success: false,
      errors: ['Network error. Please try again.'],
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Guest Checkout
export const guestCheckout = async (): Promise<AuthResponse> => {
  try {
    // For guest checkout, we don't need to authenticate
    // Just clear any existing customer session
    sessionStorage.removeItem('shopify_customer_token');
    
    return {
      success: true,
      message: 'Guest checkout enabled'
    };
  } catch (error) {
    console.error('Guest checkout error:', error);
    return {
      success: false,
      errors: ['Network error. Please try again.'],
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Logout
export const logoutCustomer = async (): Promise<AuthResponse> => {
  try {
    // Clear the stored access token from sessionStorage
    sessionStorage.removeItem('shopify_customer_token');
    
    return {
      success: true,
      message: 'Logged out successfully'
    };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      errors: ['Network error. Please try again.'],
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Customer Activation
export const activateCustomer = async (activationUrl: string, password: string): Promise<AuthResponse> => {
  try {
    const data = await makeGraphQLRequest(CUSTOMER_ACTIVATE_BY_URL, {
      activationUrl,
      password,
    });

    const { customerActivateByUrl } = data;

    if (customerActivateByUrl.customerUserErrors.length > 0) {
      return {
        success: false,
        errors: customerActivateByUrl.customerUserErrors.map((error: any) => {
          // Make error messages more user-friendly
          if (error.message.includes('Invalid activation URL')) {
            return 'Invalid or expired activation link. Please request a new activation email.';
          }
          if (error.message.includes('Password is too short')) {
            return 'Password must be at least 6 characters long.';
          }
          return error.message;
        }),
      };
    }

    if (!customerActivateByUrl.customer) {
      return {
        success: false,
        errors: ['Account activation failed'],
      };
    }

    // Store the access token in sessionStorage (more secure than localStorage)
    sessionStorage.setItem('shopify_customer_token', customerActivateByUrl.customerAccessToken.accessToken);

    const customer: Customer = {
      id: customerActivateByUrl.customer.id,
      email: customerActivateByUrl.customer.email,
      firstName: customerActivateByUrl.customer.firstName || '',
      lastName: customerActivateByUrl.customer.lastName || '',
      displayName: `${customerActivateByUrl.customer.firstName || ''} ${customerActivateByUrl.customer.lastName || ''}`.trim(),
      acceptsMarketing: customerActivateByUrl.customer.acceptsMarketing,
      createdAt: customerActivateByUrl.customer.createdAt,
      updatedAt: customerActivateByUrl.customer.updatedAt,
    };

    return {
      success: true,
      customer,
    };
  } catch (error) {
    console.error('Activation error:', error);
    return {
      success: false,
      errors: ['Network error. Please try again.'],
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Check if customer is logged in
export const checkAuthStatus = async (): Promise<AuthResponse> => {
  try {
    const token = sessionStorage.getItem('shopify_customer_token');
    
    if (!token) {
      return {
        success: false,
        message: 'Not authenticated'
      };
    }

    // Verify the token by fetching customer data
    const customerData = await makeGraphQLRequest(GET_CUSTOMER, {
      customerAccessToken: token,
    });

    if (!customerData.customer) {
      // Token is invalid, clear it
      sessionStorage.removeItem('shopify_customer_token');
      return {
        success: false,
        message: 'Not authenticated'
      };
    }

    const customer: Customer = {
      id: customerData.customer.id,
      email: customerData.customer.email,
      firstName: customerData.customer.firstName || '',
      lastName: customerData.customer.lastName || '',
      displayName: `${customerData.customer.firstName || ''} ${customerData.customer.lastName || ''}`.trim(),
      acceptsMarketing: customerData.customer.acceptsMarketing,
      createdAt: customerData.customer.createdAt,
      updatedAt: customerData.customer.updatedAt,
    };

    return {
      success: true,
      customer
    };
  } catch (error) {
    console.error('Auth check error:', error);
    // Clear invalid token
    sessionStorage.removeItem('shopify_customer_token');
    return {
      success: false,
      errors: ['Network error. Please try again.'],
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
