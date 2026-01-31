import ReactPixel from 'react-facebook-pixel';
const PIXEL_ID = '762167953595336'
export const initMetaPixel = (): void => {
  ReactPixel.init(PIXEL_ID);
};

export const trackPageView = (): void => {
  ReactPixel.pageView();
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>
): void => {
  ReactPixel.trackCustom(eventName, params);
};
