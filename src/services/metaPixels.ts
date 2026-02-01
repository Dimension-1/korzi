import ReactPixel from 'react-facebook-pixel';
const PIXEL_ID = '762167953595336'
export const initMetaPixel = (): void => {
    ReactPixel.init(PIXEL_ID);
};

export const trackPageView = (): void => {
    ReactPixel.pageView();
};

const mappingStandardEvents: Record<string, string> = {
    "payment_verification_successful": 'Purchase',
    "lead": 'Lead',
    "add_to_cart": 'AddToCart',
    "purchase": 'InitiateCheckout'
}

export const trackEvent = (
    eventName: string,
    params?: Record<string, unknown>
): void => {
    if (!!mappingStandardEvents?.[eventName]) {
        ReactPixel.track(mappingStandardEvents[eventName], params)
    } else {
        ReactPixel.trackCustom(eventName, params);
    }
};
