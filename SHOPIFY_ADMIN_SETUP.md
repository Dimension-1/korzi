# Shopify Admin API Integration Setup

## Required Environment Variables

Add these environment variables to your `.env.local` file:

```env
# Existing Shopify Storefront API (already configured)
VITE_SHOPIFY_STOREFRONT_URL=https://your-store.myshopify.com/api/2023-10/graphql.json
VITE_SHOPIFY_TOKEN=your_storefront_access_token

# NEW: Shopify Admin API (required for order creation)
VITE_SHOPIFY_ADMIN_TOKEN=your_admin_api_access_token
```

## How to Get Shopify Admin API Token

### Option 1: Private App (Recommended for development)
1. Go to your Shopify Admin → Settings → Apps and sales channels
2. Click "Develop apps" → "Create an app"
3. Give your app a name (e.g., "Order Management App")
4. Configure Admin API access scopes:
   - `write_orders` - Create and update orders
   - `read_orders` - Read order information
   - `write_customers` - Create and update customers
   - `read_customers` - Read customer information
5. Install the app and copy the Admin API access token

### Option 2: Custom App (For production)
1. Create a custom app in your Shopify Partner Dashboard
2. Configure OAuth scopes for the same permissions
3. Use the access token from OAuth flow

## API Scopes Required

Your Shopify Admin API token needs these scopes:
- `write_orders` - To create orders
- `read_orders` - To read order details
- `write_customers` - To create/update customers
- `read_customers` - To find existing customers

## Testing the Integration

1. **Set up environment variables** with your Admin API token
2. **Add items to cart** in your application
3. **Go through checkout** process
4. **Check Shopify Admin** → Orders to see the created order
5. **Check Shopify Admin** → Customers to see the created customer

## Order Flow

1. **Customer fills checkout form** → Order data prepared
2. **Find or create customer** → Search by email, create if not found
3. **Create order in Shopify** → Order created with PENDING status
4. **Process payment** → Razorpay integration (currently simulated)
5. **Update order status** → Financial status updated to PAID

## Troubleshooting

### Common Issues:

1. **"Access denied" errors**
   - Check that your Admin API token has the required scopes
   - Verify the token is correct and not expired

2. **"Customer not found" errors**
   - The system will automatically create customers if they don't exist
   - Check customer email format

3. **"Order creation failed" errors**
   - Verify product variant IDs are correct
   - Check that line items have valid variant IDs
   - Ensure shipping address is complete

### Debug Mode:
- Check browser console for detailed error messages
- All API calls are logged with success/error details

## Production Considerations

1. **Backend Integration**: Move API calls to your backend for security
2. **Payment Processing**: Integrate real Razorpay SDK
3. **Error Handling**: Add comprehensive error handling and retry logic
4. **Webhooks**: Set up Shopify webhooks for order updates
5. **Rate Limiting**: Implement rate limiting for API calls
