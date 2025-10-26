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
export const createRazorpayOrder = async (amount: number, currency: string, receipt?: string): Promise<string> => {
  try {
    // In production, this should call your backend API which creates the order using Razorpay server SDK
    // Backend should use VITE_RAZORPAY_SECRET to create order
    
    // For now, returning a mock order ID based on the receipt (Shopify order number)
    // You need to implement backend endpoint: POST /api/razorpay/create-order
    const orderId = receipt ? `order_${receipt}_${Date.now()}` : `order_${Date.now()}`;
    
    console.warn('Using mock Razorpay order ID. Implement backend endpoint for production.');
    console.log('Mock order created:', { orderId, amount, currency, receipt });
    
    return orderId;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

// Verify payment signature (should be done on backend for security)
export const verifyPaymentSignature = async (
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> => {
  try {
    // In production, this MUST be done on your backend for security
    // Backend should verify using: razorpay_signature = hmac_sha256(order_id + "|" + payment_id, secret)
    
    console.warn('Payment signature verification should be done on backend for security');
    console.log('Payment details:', { orderId, paymentId, signature });
    
    // For now, returning true (INSECURE - only for development)
    return true;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return false;
  }
};
