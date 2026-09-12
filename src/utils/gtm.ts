import { trackEvent } from "../services/metaPixels";

 export const eventNames = {
    payment_failed:"payment_failed",
    purchase:"initiate_checkout",
    add_to_cart:'add_to_cart',
    payment_initiated_failed:'payment_initiated_failed',
    payment_initiated:'payment_initiated',
    payment_initate_successful:'payment_initate_successful',
    payment_verification_failed:'payment_verification_failed',
    payment_verification_successful:'payment_verification_successful',
    remove_from_cart:'remove_from_cart',
    add_quantity_cart:'add_quantity_cart',
    amazon_cta_clicked:'amazon_cta_clicked',
    amazon_faq_cta_clicked : 'amazon_faq_cta_clicked'
  }

type GAEventParams = Record<string, unknown>;

export const gaEvent = (
  name: string,
  params: GAEventParams = {}
): void => {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", name, params);
  }
  trackEvent(name, params);
};