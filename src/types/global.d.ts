// src/global.d.ts
export {};

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      action: string | Date,
      params?: Record<string, unknown>
    ) => void;
    FlexyPeCheckout?: {
      open: (params: {
        flow: "checkout" | "buynow";
        source?: string;
        items?: Array<{ product_id: number; variant_id: number; quantity: number }>;
        session?: string;
        btn?: HTMLButtonElement;
        variantId?: number;
      }) => void;
      close: () => void;
    };
  }
}
