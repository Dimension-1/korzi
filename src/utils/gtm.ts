type ButtonClickEvent = {
    event: string;
    button_name: string;
    destination?:string
    [key: string]: any; 
  };

  
  type PageViewEvent = {
    event: 'pageview';
    page: string;
  };
  
  type CtaClickEvent = {
    event: 'cta_click';
    cta_name: string;
    cta_location?: string;
    destination?: string;
  };
  
  type GTMEvent =
    | ButtonClickEvent
    | PageViewEvent
    | CtaClickEvent;
  
  export const pushToDataLayer = (event: GTMEvent): void => {
    if (typeof window === 'undefined') return;
  
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
  };
  

  export const eventNames = {
    payment_failed:"payment_failed",
    purchase:"purchase",
    add_to_cart:'add_to_cart',
    payment_initiated_failed:'payment_initiated_failed',
    payment_initiated:'payment_initiated',
    payment_initate_successful:'payment_initate_successful',
    payment_verification_failed:'payment_verification_failed',
    payment_verification_successful:'payment_verification_successful',
    remove_from_cart:'remove_from_cart',
    add_quantity_cart:'add_quantity_cart'
  }