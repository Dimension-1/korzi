# ⚡ QUICK START CHECKLIST

## 🎯 Complete This in 15 Minutes

### ☐ STEP 1: Get Shopify Credentials (5 min)
1. Go to new Shopify store admin
2. Settings → Apps and sales channels → Develop apps
3. Create app: "Korzi Custom Checkout"
4. Configure Storefront API:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_checkouts`
5. Configure Admin API:
   - ✅ `write_draft_orders`
   - ✅ `write_orders`
   - ✅ `read_orders`
6. Install app
7. Copy both tokens

### ☐ STEP 2: Update Environment Files (2 min)
Update these 3 files:
- `korzi/.env.local`
- `korzi/.env.production`
- `korzi/backend/.env.local`

Replace:
- `YOUR_STOREFRONT_TOKEN_HERE` → Your Storefront token
- `YOUR_ADMIN_TOKEN_HERE` → Your Admin token (shpat_...)
- `YOUR-STORE-NAME` → Your store name

### ☐ STEP 3: Start Servers (2 min)
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run backend

# Terminal 2 - Frontend
cd korzi
npm run dev
```

### ☐ STEP 4: Test Order (5 min)
1. Open http://localhost:5173
2. Add product to cart
3. Go to checkout
4. Fill test details:
   - Email: test@example.com
   - Phone: 9999999999
   - Address: Mumbai, Maharashtra, 400001
5. Click "Place Order"
6. Use test card: `4111 1111 1111 1111`
7. Complete payment
8. Check email for invoice ✅

### ☐ STEP 5: Verify in Shopify (1 min)
1. Go to Shopify Admin → Orders
2. See completed order
3. Status should be "Paid" ✅

---

## 🎉 DONE!

Your order automation is now complete with:
- ✅ Payment verification
- ✅ Order completion
- ✅ Automatic invoice sending
- ✅ BigShip integration

---

## 🚀 Go Live

When ready for production:
1. Get live Razorpay credentials
2. Update `VITE_RAZORPAY_KEY_ID` and `VITE_RAZORPAY_SECRET`
3. Deploy backend to server
4. Deploy frontend to hosting
5. Test with real payment

---

## 📖 Full Documentation
See `ORDER_COMPLETION_GUIDE.md` for detailed instructions.
