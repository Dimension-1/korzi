/**
 * FlexyPe checkout communicates with the parent page via window.postMessage.
 * Event names match the FlexyPe SDK (checkout.min.js).
 *
 * Pass onSuccess / onFailure / onClose on open() — use openFlexyPeCheckout() so
 * those callbacks are wired to the SDK messages (see global.d.ts).
 */

export type FlexyPeCheckoutOpenParams = NonNullable<
  Window['FlexyPeCheckout']
>['open'] extends (params: infer P) => void
  ? P
  : never;

export const FLEXYPE_EVENTS = {
  CLOSE: 'flexy-checkout-close',
  SUCCESS: 'flexy-checkout-success',
  FAILURE: 'flexy-checkout-failure',
  REDIRECT: 'flexy-checkout-redirect',
  CART_UPDATE: 'flexy-checkout-cart-update',
} as const;

export type FlexyPeCheckoutEvent =
  (typeof FLEXYPE_EVENTS)[keyof typeof FLEXYPE_EVENTS];

export type FlexyPeCheckoutEventPayload = unknown;

export interface FlexyPeCheckoutHandlers {
  onClose?: (payload?: FlexyPeCheckoutEventPayload) => void;
  onSuccess?: (payload?: FlexyPeCheckoutEventPayload) => void;
  onFailure?: (payload?: FlexyPeCheckoutEventPayload) => void;
  onRedirect?: (payload?: FlexyPeCheckoutEventPayload) => void;
  onCartUpdate?: (payload?: FlexyPeCheckoutEventPayload) => void;
}

const PAYLOAD_SEPARATOR = '|-|-|';

function parseMessageData(data: unknown): { event: string; payload?: unknown } | null {
  if (typeof data !== 'string') return null;

  const eventNames = Object.values(FLEXYPE_EVENTS);
  const matched = eventNames.find(
    (e) => data === e || data.startsWith(`${e}${PAYLOAD_SEPARATOR}`) || data.startsWith(e)
  );
  if (!matched) return null;

  let payload: unknown;
  if (data.includes(PAYLOAD_SEPARATOR)) {
    const parts = data.split(PAYLOAD_SEPARATOR).slice(1);
    if (parts.length === 1) {
      try {
        payload = JSON.parse(parts[0]);
      } catch {
        payload = parts[0];
      }
    } else if (parts.length > 1) {
      payload = parts.map((p) => {
        try {
          return JSON.parse(p);
        } catch {
          return p;
        }
      });
    }
  }

  return { event: matched, payload };
}

/**
 * Subscribe to FlexyPe checkout lifecycle events. Returns an unsubscribe function.
 */
export function subscribeFlexyPeCheckout(handlers: FlexyPeCheckoutHandlers): () => void {
  const listener = (messageEvent: MessageEvent) => {
    const parsed = parseMessageData(messageEvent.data);
    if (!parsed) return;

    switch (parsed.event) {
      case FLEXYPE_EVENTS.CLOSE:
        handlers.onClose?.(parsed.payload);
        break;
      case FLEXYPE_EVENTS.SUCCESS:
        handlers.onSuccess?.(parsed.payload);
        break;
      case FLEXYPE_EVENTS.FAILURE:
        handlers.onFailure?.(parsed.payload);
        break;
      case FLEXYPE_EVENTS.REDIRECT:
        handlers.onRedirect?.(parsed.payload);
        break;
      case FLEXYPE_EVENTS.CART_UPDATE:
        handlers.onCartUpdate?.(parsed.payload);
        break;
      default:
        break;
    }
  };

  window.addEventListener('message', listener);
  return () => window.removeEventListener('message', listener);
}

/**
 * Opens FlexyPe checkout and runs onSuccess / onFailure / onClose from params
 * when the SDK posts the matching message.
 */
export function openFlexyPeCheckout(params: FlexyPeCheckoutOpenParams): void {
  const { onSuccess, onFailure, onClose, ...sdkParams } = params;

  if (!window.FlexyPeCheckout?.open) {
    console.warn('FlexyPeCheckout.open is not available');
    return;
  }

  let unsubscribe: (() => void) | undefined;
  let settled = false;

  const finish = () => {
    if (settled) return;
    settled = true;
    unsubscribe?.();
  };

  if (onSuccess || onFailure || onClose) {
    unsubscribe = subscribeFlexyPeCheckout({
      onSuccess: (payload?: FlexyPeCheckoutEventPayload) => {
        onSuccess?.(payload);
        finish();
      },
      onFailure: (payload?: FlexyPeCheckoutEventPayload) => {
        onFailure?.(payload);
        finish();
      },
      onClose: (payload?: FlexyPeCheckoutEventPayload) => {
        onClose?.(payload);
        finish();
      },
      onCartUpdate: () => {
        /* keep listening until terminal event */
      },
    });
  }

  window.FlexyPeCheckout.open(sdkParams);
}
