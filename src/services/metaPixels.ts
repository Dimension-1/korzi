import ReactPixel from "react-facebook-pixel";

const PIXEL_ID = "762167953595336";

const mappingStandardEvents: Record<string, string> = {
  payment_verification_successful: "Purchase",
  lead: "Lead",
  add_to_cart: "AddToCart",
  purchase: "InitiateCheckout",
  initiate_checkout: "InitiateCheckout",
};

export const initMetaPixel = (): void => {
  ReactPixel.init(PIXEL_ID);
};

export const trackPageView = (): void => {
  ReactPixel.pageView();
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>,
): void => {
    console.log("$$$$$eventname---",eventName,mappingStandardEvents[eventName])
  const { event_id, eventID, ...eventData } = params ?? {};
  const dedupeId =
    typeof event_id === "string"
      ? event_id
      : typeof eventID === "string"
        ? eventID
        : undefined;

  const standardEvent = mappingStandardEvents[eventName];
  if (standardEvent) {
    if (dedupeId) {
      // eventID (4th arg) pairs browser events with Conversions API for deduplication
      ReactPixel.fbq("track", standardEvent, eventData, { eventID: dedupeId });
    } else {
      ReactPixel.track(standardEvent, eventData);
    }
    return;
  }

  ReactPixel.trackCustom(eventName, eventData);
};
