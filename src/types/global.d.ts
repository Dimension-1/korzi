// src/global.d.ts
export {};

type FlexyPeCheckoutEventPayload = unknown;

interface FlexyPeCheckoutOpenParams {
  flow: 'checkout' | 'buynow';
  source?: string;
  items?: Array<{ product_id: number; variant_id: number; quantity: number }>;
  session?: string;
  btn?: HTMLButtonElement;
  variantId?: number;
  onSuccess?: (payload?: FlexyPeCheckoutEventPayload) => void;
  onFailure?: (payload?: FlexyPeCheckoutEventPayload) => void;
  onClose?: (payload?: FlexyPeCheckoutEventPayload) => void;
}

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      action: string | Date,
      params?: Record<string, unknown>
    ) => void;
    FlexyPeCheckout?: {
      open: (params: FlexyPeCheckoutOpenParams) => void;
      close: () => void;
      active?: boolean;
    };
  }
}
