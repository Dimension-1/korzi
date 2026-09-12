# 🎯 COMPLETE ORDER AUTOMATION GUIDE (A to Z)

## 📋 OVERVIEW
This guide will help you complete the order automation flow with invoice sending for your new Shopify store using Razorpay test credentials.

---

## ✅ WHAT'S BEEN DONE
- ✅ Payment verification with Razorpay API added
- ✅ Order completion endpoint created
- ✅ Invoice sending automated (Shopify sends email automatically)
- ✅ Frontend checkout updated to use new flow
- ✅ Environment files updated with placeholders

---

## 🔧 STEP-BY-STEP IMPLEMENTATION

### **STEP 1: Get New Shopify Store Credentials**

#### A. Get Storefront API Token
1. Go to your **NEW Shopify store** admin
2. Navigate to: **Settings** → **Apps and sales channels**
3. Click **"Develop apps"** (bottom of page)
4. Click **"Create an app"** or use existing app
5. Name it: `Korzi Custom Checkout`
6. Click **"Configure Storefront API"**
7. Select these scopes:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_checkouts`
   - ✅ `unauthenticated_read_product_inventory`
8. Click **"Save"**
9. Click **"Install app"**
10. Copy the **Storefront Access Token** (starts with letters/numbers)

#### B. Get Admin API Token
1. Same app → Click **"Configure Admin API"**
2. Select these scopes:
   - ✅ `write_draft_orders`
   - ✅ `write_orders`
   - ✅ `read_orders`
   - ✅ `read_products`
3. Click **"Save"**
4. Click **"Install app"** (if prompted)
5. Copy the **Admin API Access Token** (starts with `shpat_`)

#### C. Get Store URL
- Your store URL format: `https://YOUR-STORE-NAME.myshopify.com`
- Example: `https://korzi-new.myshopify.com`

---

### **STEP 2: Update Environment Variables**

Update these **3 files** with your new credentials:

#### File 1: `korzi/.env.local`
```env
VITE_HYPGRAPH_URL=https://ap-south-1.cdn.hygraph.com/content/cmfhrlzgy00sy07w98knv2z90/master
VITE_SHOPIFY_TOKEN=YOUR_STOREFRONT_TOKEN_HERE
VITE_SHOPIFY_STOREFRONT_URL=https://YOUR-STORE-NAME.myshopify.com/api/2025-10/graphql.json
VITE_SHOPIFY_ADMIN_TOKEN=YOUR_ADMIN_TOKEN_HERE
VITE_RAZORPAY_KEY_ID=rzp_test_RbIQunOOOY9ChR
VITE_BACKEND_URL=https://korzi.toys
VITE_HYPGRAPH_TOKEN=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0...
```

#### File 2: `korzi/.env.production`
```env
VITE_HYPGRAPH_URL=https://ap-south-1.cdn.hygraph.com/content/cmfhrlzgy00sy07w98knv2z90/master
VITE_SHOPIFY_TOKEN=YOUR_STOREFRONT_TOKEN_HERE
VITE_SHOPIFY_STOREFRONT_URL=https://YOUR-STORE-NAME.myshopify.com/api/2025-10/graphql.json
VITE_SHOPIFY_ADMIN_TOKEN=YOUR_ADMIN_TOKEN_HERE
VITE_RAZORPAY_KEY_ID=rzp_test_RbIQunOOOY9ChR
VITE_BACKEND_URL=https://korzi.toys
VITE_HYPGRAPH_TOKEN=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0...
```

#### File 3: `korzi/backend/.env.local`
```env
VITE_SHOPIFY_ADMIN_TOKEN=YOUR_ADMIN_TOKEN_HERE
VITE_SHOPIFY_STOREFRONT_URL=https://YOUR-STORE-NAME.myshopify.com/api/2025-10/graphql.json
VITE_RAZORPAY_KEY_ID=rzp_test_RbIQunOOOY9ChR
VITE_RAZORPAY_SECRET=ad5Cvov2xjkOtLbZQY567m6l
BIGSHIP_ACCESS_KEY=780fa46aad02d25be9c4c7d60e88eb61eacdb7d875bf5a3cdbfe9e770a94171e
BIGSHIP_API_URL=https://api.bigship.in/
BIGSHIP_WAREHOUSE_NAME=Korzi Warehouse
BIGSHIP_EMAIL=team@korzi.toys
BIGSHIP_PASSWORD=Teamkorzi@468
BIGSHIP_WAREHOUSE_ID=199184
RAZORPAY_WEBHOOK_SECRET=korzi@toys123
```

**Replace:**
- `YOUR_STOREFRONT_TOKEN_HERE` → Your Storefront Access Token
- `YOUR_ADMIN_TOKEN_HERE` → Your Admin API Access Token (shpat_...)
- `YOUR-STORE-NAME` → Your actual store name

---

### **STEP 3: Install Backend Dependencies**

```bash
cd backend
npm install
```

---

### **STEP 4: Test Locally**

#### A. Start Backend Server
```bash
cd backend
npm run backend
```

Should see:
```
Backend server running on http://localhost:3001
```

#### B. Start Frontend (in new terminal)
```bash
cd korzi
npm run dev
```

Should see:
```
Local: http://localhost:5173
```

---

### **STEP 5: Test Order Flow**

1. **Add Product to Cart**
   - Go to http://localhost:5173
   - Add any product to cart

2. **Go to Checkout**
   - Click cart icon
   - Click "Proceed to Checkout"

3. **Fill Customer Details**
   - Enter test customer info:
     - Name: Test User
     - Email: test@example.com
     - Phone: 9999999999
     - Address: Test Address, Mumbai, Maharashtra, 400001

4. **Complete Payment**
   - Click "Place Order"
   - Razorpay test modal will open
   - Use test card: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date
   - Click "Pay"

5. **Verify Success**
   - Should redirect to Thank You page
   - Check console logs for:
     - ✅ "Payment verified successfully"
     - ✅ "Order completed and invoice sent"
   - Check your test email for invoice

6. **Check Shopify Admin**
   - Go to Shopify Admin → Orders
   - You should see the completed order
   - Status should be "Paid"
   - Customer should receive email invoice

---

## 🔄 COMPLETE ORDER FLOW

Here's what happens when customer places order:

```
1. Customer clicks "Place Order"
   ↓
2. Create Draft Order in Shopify
   ↓
3. Create Razorpay Order
   ↓
4. Open Razorpay Payment Modal
   ↓
5. Customer completes payment
   ↓
6. Verify Payment Signature (Frontend)
   ↓
7. Verify Payment with Razorpay API (Backend)
   ↓
8. Complete Draft Order (Backend)
   ↓
9. Mark Order as Paid (Backend)
   ↓
10. Shopify Sends Invoice Email Automatically ✅
   ↓
11. Create BigShip Shipment (Background)
   ↓
12. Update Order with Tracking Info
   ↓
13. Redirect to Thank You Page
```

---

## 📧 INVOICE EMAIL

**Shopify automatically sends invoice email when:**
- Draft order is completed
- Order is marked as paid

**Email contains:**
- Order number
- Items purchased
- Total amount
- Customer details
- Shipping address
- Payment method (Razorpay)

**No additional configuration needed!**

---

## 🧪 TESTING WITH RAZORPAY TEST MODE

### Test Cards
```
Success: 4111 1111 1111 1111
Failure: 4000 0000 0000 0002
```

### Test UPI
```
Success: success@razorpay
Failure: failure@razorpay
```

### Test Netbanking
- Select any bank
- Use credentials: `test` / `test`

---

## 🚀 DEPLOY TO PRODUCTION

### A. Deploy Backend
```bash
cd backend
# Upload to your VPS/server
# Make sure .env.local is on server
# Start with: node server.js
```

### B. Deploy Frontend
```bash
cd korzi
npm run build
# Upload dist/ folder to hosting
```

### C. Update Production URLs
In `.env.production`:
```env
VITE_BACKEND_URL=https://korzi.toys
```

---

## 🔐 SWITCH TO LIVE RAZORPAY

When ready for production:

1. **Get Live Credentials**
   - Go to Razorpay Dashboard
   - Switch to "Live Mode"
   - Get Live Key ID and Secret

2. **Update Environment Files**
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXX
   VITE_RAZORPAY_SECRET=LIVE_SECRET_HERE
   ```

3. **Update Webhook Secret**
   - Create webhook in Razorpay Dashboard
   - URL: `https://korzi.toys/api/razorpay/webhook`
   - Events: `payment.captured`, `payment.failed`
   - Copy webhook secret
   - Update `RAZORPAY_WEBHOOK_SECRET` in `.env.local`

---

## 🐛 TROUBLESHOOTING

### Issue: "Payment verification failed"
**Solution:**
- Check Razorpay credentials in backend/.env.local
- Verify payment was successful in Razorpay Dashboard
- Check backend console logs

### Issue: "Failed to complete order"
**Solution:**
- Verify Admin API token has correct scopes
- Check Shopify Admin API version (2025-10)
- Check backend console for detailed error

### Issue: "No invoice email received"
**Solution:**
- Check Shopify Admin → Settings → Notifications
- Verify "Order confirmation" email is enabled
- Check spam folder
- Verify customer email is correct

### Issue: "Draft order not found"
**Solution:**
- Check if draft order was created in Shopify Admin
- Verify Storefront API token is correct
- Check product variant IDs are valid

---

## 📊 MONITORING

### Check Order Status
1. Go to Shopify Admin → Orders
2. Click on order
3. Check:
   - ✅ Financial Status: "Paid"
   - ✅ Fulfillment Status: "Unfulfilled"
   - ✅ Tags: payment:razorpay_payment_id

### Check Payment Status
1. Go to Razorpay Dashboard
2. Click "Payments"
3. Find payment by order_id
4. Verify status: "Captured"

### Check Shipment Status
1. Go to BigShip Dashboard
2. Find shipment by LRN number
3. Check AWB number and tracking

---

## 🎉 SUCCESS CHECKLIST

After completing all steps, verify:

- ✅ New Shopify store credentials updated
- ✅ Backend server running
- ✅ Frontend connected to backend
- ✅ Test order placed successfully
- ✅ Payment verified
- ✅ Order completed in Shopify
- ✅ Invoice email received
- ✅ Order shows as "Paid" in Shopify Admin
- ✅ BigShip shipment created (if applicable)

---

## 📞 SUPPORT

If you encounter issues:

1. Check backend console logs
2. Check browser console logs
3. Check Shopify Admin → Orders for draft orders
4. Check Razorpay Dashboard for payment status
5. Verify all environment variables are correct

---

## 🔄 NEXT STEPS

After successful testing:

1. ✅ Switch to live Razorpay credentials
2. ✅ Deploy backend to production server
3. ✅ Deploy frontend to hosting
4. ✅ Test with real payment
5. ✅ Monitor first few orders closely
6. ✅ Set up order notifications
7. ✅ Configure shipping automation

---

**Last Updated:** January 2025
**Version:** 1.0
