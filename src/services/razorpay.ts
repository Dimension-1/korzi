// Razorpay Payment Service
import { CustomerInfo } from './orders';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  amount: number; // in paise (e.g., 100 for ₹1)
  currency: string;
  orderId: string;
  customerInfo: CustomerInfo;
  onSuccess: (response: RazorpaySuccessResponse) => void;
  onFailure: (error: any) => void;
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Initialize Razorpay payment
export const initiateRazorpayPayment = async (options: RazorpayOptions): Promise<void> => {
  const isLoaded = await loadRazorpayScript();
  
  if (!isLoaded) {
    throw new Error('Failed to load Razorpay SDK');
  }

  const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
  
  if (!razorpayKeyId) {
    throw new Error('Razorpay Key ID not configured');
  }

  const razorpayOptions = {
    key: razorpayKeyId,
    amount: options.amount, // Amount in paise
    currency: options.currency,
    name: 'Your Store Name',
    description: `Order #${options.orderId}`,
    order_id: options.orderId,
    handler: function (response: RazorpaySuccessResponse) {
      console.log('Razorpay payment success:', response);
      options.onSuccess(response);
    },
    prefill: {
      name: `${options.customerInfo.firstName} ${options.customerInfo.lastName}`,
      email: options.customerInfo.email,
      contact: options.customerInfo.phone || ''
    },
    theme: {
      color: '#3B82F6' // Blue color
    },
    modal: {
      ondismiss: function() {
        console.log('Payment modal closed');
        options.onFailure({ error: 'Payment cancelled by user' });
      }
    }
  };

  const razorpay = new window.Razorpay(razorpayOptions);
  
  razorpay.on('payment.failed', function (response: any) {
    console.error('Razorpay payment failed:', response);
    options.onFailure(response.error);
  });

  razorpay.open();
};

// Create Razorpay order (this would typically be done on your backend)
// For now, we'll use a mock implementation
// Replace the createRazorpayOrder function with this:

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export const createRazorpayOrder = async (
  amount: number,
  currency: string,
  receipt?: string
): Promise<string> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/razorpay/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency, receipt }),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to create order');
    }

    return data.orderId;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

// Add payment verification function
export const verifyPaymentSignature = async (
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/razorpay/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
      }),
    });

    const data = await response.json();
    return data.verified;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return false;
  }
};



