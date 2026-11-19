# 🔄 COMPLETE API FLOW DIAGRAM

## Order Completion Flow with Invoice Sending

```
┌─────────────────────────────────────────────────────────────────┐
│                         CUSTOMER                                 │
│                    (Checkout Page)                               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 1. Clicks "Place Order"
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                              │
│                  CheckoutPage.tsx                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 2. POST /api/shopify/create-order
                         │    { orderData, paymentId: 'pending' }
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js)                             │
│                     server.js                                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 3. Create Draft Order
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                  SHOPIFY ADMIN API                               │
│              draftOrderCreate mutation                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 4. Returns draftOrderId
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js)                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 5. POST /api/razorpay/create-order
                         │    { amount, currency, receipt }
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    RAZORPAY API                                  │
│                  orders.create()                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 6. Returns razorpay_order_id
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                              │
│              Razorpay Checkout Modal                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 7. Customer enters card details
                         │    and completes payment
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    RAZORPAY                                      │
│              Payment Processing                                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 8. Payment Success Callback
                         │    { razorpay_payment_id,
                         │      razorpay_order_id,
                         │      razorpay_signature }
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                              │
│              onSuccess Handler                                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 9. POST /api/razorpay/verify-payment
                         │    { razorpay_order_id,
                         │      razorpay_payment_id,
                         │      razorpay_signature }
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js)                             │
│              Payment Verification                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 10. Verify signature (HMAC SHA256)
                         │ 11. Fetch payment from Razorpay API
                         │ 12. Verify status = 'captured'
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    RAZORPAY API                                  │
│              payments.fetch(payment_id)                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 13. Returns payment details
                         │     { status: 'captured', amount, ... }
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js)                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 14. Payment verified ✅
                         │     Returns { success: true, verified: true }
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 15. POST /api/shopify/complete-order
                         │     { draftOrderId, paymentId }
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js)                             │
│              Order Completion                                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 16. Complete Draft Order
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                  SHOPIFY ADMIN API                               │
│            draftOrderComplete mutation                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 17. Draft → Real Order
                         │     Returns orderId
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js)                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 18. Mark Order as Paid
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                  SHOPIFY ADMIN API                               │
│            orderMarkAsPaid mutation                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 19. Order marked as PAID ✅
                         │ 20. Shopify sends invoice email 📧
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    CUSTOMER EMAIL                                │
│              Order Confirmation Invoice                          │
│              - Order Number                                      │
│              - Items Purchased                                   │
│              - Total Amount                                      │
│              - Shipping Address                                  │
└─────────────────────────────────────────────────────────────────┘
                         │
                         │ 21. Returns success
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 22. Save to order history
                         │ 23. Clear cart
                         │ 24. Navigate to Thank You page
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    THANK YOU PAGE                                │
│              Order Confirmed! ✅                                 │
└─────────────────────────────────────────────────────────────────┘
                         │
                         │ 25. Background: Create BigShip shipment
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BIGSHIP API                                   │
│              Shipment Creation                                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 26. Returns AWB number
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js)                             │
│              Update Order with Tracking                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ 27. Update Shopify order tags
                         │     awb:XXXXXX, courier:BlueDart
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                  SHOPIFY ADMIN API                               │
│              Order Updated with Tracking ✅                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔑 KEY ENDPOINTS

### Backend Endpoints Created/Updated:

1. **POST /api/razorpay/create-order**
   - Creates Razorpay order
   - Returns: `{ orderId }`

2. **POST /api/razorpay/verify-payment** ✨ NEW
   - Verifies payment signature
   - Fetches payment from Razorpay API
   - Verifies status and amount
   - Returns: `{ success, verified, payment }`

3. **POST /api/shopify/create-order**
   - Creates draft order in Shopify
   - Returns: `{ orderId, orderNumber }`

4. **POST /api/shopify/complete-order** ✨ NEW
   - Completes draft order
   - Marks order as paid
   - Triggers invoice email
   - Returns: `{ orderId, orderNumber }`

5. **POST /api/shopify/update-order-tracking**
   - Updates order with AWB number
   - Returns: `{ success }`

6. **POST /api/bigship/create-shipment**
   - Creates shipment in BigShip
   - Returns: `{ shipmentId, awbNumber }`

---

## 📧 INVOICE EMAIL TRIGGER

**When does Shopify send invoice?**

Shopify automatically sends order confirmation email when:
1. ✅ Draft order is completed (`draftOrderComplete`)
2. ✅ Order is marked as paid (`orderMarkAsPaid`)

**Email contains:**
- Order number
- Items with images
- Subtotal, shipping, total
- Customer details
- Shipping address
- Payment method (Razorpay)
- Order status link

**No manual email sending needed!**

---

## 🔐 SECURITY CHECKS

### Payment Verification (3 Layers):

1. **Signature Verification**
   ```javascript
   HMAC-SHA256(order_id|payment_id, secret) === signature
   ```

2. **Razorpay API Verification**
   ```javascript
   razorpay.payments.fetch(payment_id)
   // Check: status === 'captured'
   ```

3. **Order ID Match**
   ```javascript
   payment.order_id === razorpay_order_id
   ```

All 3 must pass before completing order! ✅

---

## 🎯 SUCCESS INDICATORS

After successful order:

1. ✅ Console: "Payment verified successfully"
2. ✅ Console: "Order completed and invoice sent"
3. ✅ Shopify Admin: Order status = "Paid"
4. ✅ Customer Email: Invoice received
5. ✅ Razorpay Dashboard: Payment status = "Captured"
6. ✅ Frontend: Redirected to Thank You page
7. ✅ BigShip: Shipment created (background)

---

## 🐛 ERROR HANDLING

### If Payment Verification Fails:
- Order stays as draft
- No invoice sent
- Customer sees error message
- Can retry payment

### If Order Completion Fails:
- Payment is captured (money received)
- Draft order exists
- Manual completion needed in Shopify Admin
- Customer notified to contact support

### If BigShip Fails:
- Order still completes
- Invoice still sent
- Shipment creation retried
- Manual shipment creation fallback

---

## 📊 MONITORING POINTS

Check these after each order:

1. **Backend Console**
   - Payment verification logs
   - Order completion logs
   - BigShip creation logs

2. **Shopify Admin → Orders**
   - Order exists
   - Status = "Paid"
   - Tags include payment ID

3. **Razorpay Dashboard**
   - Payment captured
   - Amount matches
   - Order ID matches

4. **Customer Email**
   - Invoice received
   - Details correct

5. **BigShip Dashboard**
   - Shipment created
   - AWB assigned

---

**Last Updated:** January 2025
