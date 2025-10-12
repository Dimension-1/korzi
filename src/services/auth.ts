// Shopify Customer Authentication Service
// Based on Shopify's customer authentication forms

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

// Get Shopify store URL from environment
const getShopifyStoreUrl = () => {
  const storeUrl = import.meta.env.VITE_SHOPIFY_STORE_URL;
  if (!storeUrl) {
    throw new Error('VITE_SHOPIFY_STORE_URL environment variable is required');
  }
  return storeUrl.endsWith('/') ? storeUrl.slice(0, -1) : storeUrl;
};

// Helper function to handle Shopify form responses
const handleShopifyResponse = async (response: Response): Promise<AuthResponse> => {
  if (!response.ok) {
    const errorText = await response.text();
    return {
      success: false,
      errors: ['Authentication failed. Please check your credentials.'],
      message: errorText
    };
  }

  // Check if response contains customer data (successful login)
  const html = await response.text();
  
  // Parse customer data from Shopify's response
  // This is a simplified approach - in production, you'd want to use Shopify's Customer API
  const customerMatch = html.match(/window\.ShopifyAnalytics\.meta\.page\.customerId["\s]*:["\s]*(\d+)/);
  
  if (customerMatch) {
    // Extract customer info from the page
    const emailMatch = html.match(/customer\[email\]" value="([^"]+)"/);
    const firstNameMatch = html.match(/customer\[first_name\]" value="([^"]+)"/);
    const lastNameMatch = html.match(/customer\[last_name\]" value="([^"]+)"/);
    
    const customer: Customer = {
      id: customerMatch[1],
      email: emailMatch?.[1] || '',
      firstName: firstNameMatch?.[1] || '',
      lastName: lastNameMatch?.[1] || '',
      displayName: `${firstNameMatch?.[1] || ''} ${lastNameMatch?.[1] || ''}`.trim(),
      acceptsMarketing: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return {
      success: true,
      customer
    };
  }

  // Check for errors in the response
  const errorMatches = html.match(/form__message[^>]*>([^<]+)</g);
  if (errorMatches) {
    const errors = errorMatches.map(match => 
      match.replace(/form__message[^>]*>/, '').replace(/</, '').trim()
    ).filter(error => error.length > 0);
    
    return {
      success: false,
      errors: errors.length > 0 ? errors : ['Authentication failed']
    };
  }

  return {
    success: false,
    errors: ['Authentication failed']
  };
};

// Customer Login
export const loginCustomer = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const storeUrl = getShopifyStoreUrl();
    
    const formData = new FormData();
    formData.append('form_type', 'customer_login');
    formData.append('utf8', '✓');
    formData.append('customer[email]', credentials.email);
    formData.append('customer[password]', credentials.password);

    const response = await fetch(`${storeUrl}/account/login`, {
      method: 'POST',
      body: formData,
      credentials: 'include', // Include cookies for session management
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await handleShopifyResponse(response);
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
    const storeUrl = getShopifyStoreUrl();
    
    const formData = new FormData();
    formData.append('form_type', 'create_customer');
    formData.append('utf8', '✓');
    formData.append('customer[first_name]', data.firstName);
    formData.append('customer[last_name]', data.lastName);
    formData.append('customer[email]', data.email);
    formData.append('customer[password]', data.password);
    
    if (data.acceptsMarketing) {
      formData.append('customer[accepts_marketing]', 'true');
    }

    const response = await fetch(`${storeUrl}/account/register`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return await handleShopifyResponse(response);
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
    const storeUrl = getShopifyStoreUrl();
    
    const formData = new FormData();
    formData.append('form_type', 'recover_customer_password');
    formData.append('utf8', '✓');
    formData.append('email', email);

    const response = await fetch(`${storeUrl}/account/login`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const html = await response.text();
    
    // Check for success message
    if (html.includes('recover_password.success') || html.includes('We\'ve sent you an email')) {
      return {
        success: true,
        message: 'Password recovery email sent successfully'
      };
    }

    // Check for errors
    const errorMatches = html.match(/form__message[^>]*>([^<]+)</g);
    if (errorMatches) {
      const errors = errorMatches.map(match => 
        match.replace(/form__message[^>]*>/, '').replace(/</, '').trim()
      ).filter(error => error.length > 0);
      
      return {
        success: false,
        errors: errors.length > 0 ? errors : ['Password recovery failed']
      };
    }

    return {
      success: false,
      errors: ['Password recovery failed']
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
    const storeUrl = getShopifyStoreUrl();
    
    const formData = new FormData();
    formData.append('form_type', 'guest_login');
    formData.append('utf8', '✓');

    const response = await fetch(`${storeUrl}/account/login`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Guest checkout enabled'
      };
    }

    return {
      success: false,
      errors: ['Guest checkout failed']
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
    const storeUrl = getShopifyStoreUrl();
    
    const response = await fetch(`${storeUrl}/account/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Logged out successfully'
      };
    }

    return {
      success: false,
      errors: ['Logout failed']
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

// Check if customer is logged in
export const checkAuthStatus = async (): Promise<AuthResponse> => {
  try {
    const storeUrl = getShopifyStoreUrl();
    
    const response = await fetch(`${storeUrl}/account`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    if (response.ok) {
      const html = await response.text();
      
      // Check if we're redirected to login page (not authenticated)
      if (html.includes('customer.login_page.title') || html.includes('account/login')) {
        return {
          success: false,
          message: 'Not authenticated'
        };
      }

      // Extract customer info from account page
      const customerMatch = html.match(/window\.ShopifyAnalytics\.meta\.page\.customerId["\s]*:["\s]*(\d+)/);
      const emailMatch = html.match(/customer\[email\]" value="([^"]+)"/);
      const firstNameMatch = html.match(/customer\[first_name\]" value="([^"]+)"/);
      const lastNameMatch = html.match(/customer\[last_name\]" value="([^"]+)"/);
      
      if (customerMatch) {
        const customer: Customer = {
          id: customerMatch[1],
          email: emailMatch?.[1] || '',
          firstName: firstNameMatch?.[1] || '',
          lastName: lastNameMatch?.[1] || '',
          displayName: `${firstNameMatch?.[1] || ''} ${lastNameMatch?.[1] || ''}`.trim(),
          acceptsMarketing: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        return {
          success: true,
          customer
        };
      }
    }

    return {
      success: false,
      message: 'Not authenticated'
    };
  } catch (error) {
    console.error('Auth check error:', error);
    return {
      success: false,
      errors: ['Network error. Please try again.'],
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
