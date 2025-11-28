# 🔧 CLEAR OLD CART DATA - COMPLETE FIX

## The Problem
Your Shopify cart cookie (`shopify_cart_id`) contains a cart with old product variant IDs from the previous store.

## ✅ SOLUTION

### Step 1: Open Browser Console
1. Press `F12` (or right-click → Inspect)
2. Go to **Console** tab

### Step 2: Run This Code
Copy and paste this into the console and press Enter:

```javascript
// Clear all cart-related data
localStorage.clear();
sessionStorage.clear();

// Clear Shopify cart cookie
document.cookie.split(";").forEach(function(c) { 
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
});

// Reload page
location.reload();
```

### Step 3: Verify
After page reloads, check console - you should see:
```
Cart ID from cookies: null
No cart ID found, creating new cart...
```

### Step 4: Test
1. Go to shop page
2. Add any product to cart
3. Go to checkout
4. Fill details and place order
5. Should work now! ✅

---

## Alternative: Manual Cookie Deletion

If the above doesn't work:

1. Press `F12`
2. Go to **Application** tab
3. Left sidebar → **Cookies** → `http://localhost:5173`
4. Find and delete: `shopify_cart_id`
5. Left sidebar → **Local Storage** → `http://localhost:5173`
6. Delete all items
7. Refresh page

---

## Why This Happens

- Old cart cookie points to cart with old store's product IDs
- New store has different product IDs
- Shopify rejects the old variant IDs
- Clearing cookies forces creation of new cart with new store's products

---

## After Clearing

The app will:
1. Create a fresh Shopify cart
2. Use new store's product IDs
3. Orders will complete successfully
