// Google OAuth Authentication Service
import { Customer } from './auth';

export interface GoogleAuthResponse {
  success: boolean;
  customer?: Customer;
  errors?: string[];
  message?: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

// Verify Google token and create/login customer
export const loginWithGoogle = async (credential: string): Promise<GoogleAuthResponse> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ credential }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        errors: [data.error || 'Google authentication failed'],
      };
    }

    if (data.success && data.customer) {
      // Store the Shopify customer token
      if (data.shopifyToken) {
        sessionStorage.setItem('shopify_customer_token', data.shopifyToken);
      }

      return {
        success: true,
        customer: data.customer,
      };
    }

    return {
      success: false,
      errors: ['Authentication failed'],
    };
  } catch (error) {
    console.error('Google auth error:', error);
    return {
      success: false,
      errors: ['Network error. Please try again.'],
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
