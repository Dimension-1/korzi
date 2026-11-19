/** Session key for InitiateCheckout deduplication across a single checkout attempt. */
const CHECKOUT_EVENT_ID_KEY = 'korzi_meta_checkout_event_id';

export function createMetaEventId(prefix = 'evt'): string {
  const uuid =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  return `${prefix}_${uuid}`;
}

/** Reuse one ID per checkout session for InitiateCheckout (browser pixel). */
export function getOrCreateCheckoutEventId(): string {
  if (typeof sessionStorage === 'undefined') return createMetaEventId('checkout');
  const existing = sessionStorage.getItem(CHECKOUT_EVENT_ID_KEY);
  if (existing) return existing;
  const id = createMetaEventId('checkout');
  sessionStorage.setItem(CHECKOUT_EVENT_ID_KEY, id);
  return id;
}

export function clearCheckoutEventId(): void {
  sessionStorage?.removeItem(CHECKOUT_EVENT_ID_KEY);
}

/** Meta recommends order ID for Purchase deduplication with Shopify server events. */
export function purchaseEventId(orderId?: string | number | null): string | undefined {
  if (orderId === undefined || orderId === null || orderId === '') return undefined;
  return `order_${orderId}`;
}
