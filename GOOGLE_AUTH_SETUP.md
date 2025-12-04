# Google OAuth Authentication Setup Guide

## ✅ What's Been Done

### Frontend Changes:
1. ✅ Installed `@react-oauth/google` and `jwt-decode`
2. ✅ Created `src/services/googleAuth.ts` - Google auth service
3. ✅ Updated `src/stores/authStore.ts` - Added `loginWithGoogle` method
4. ✅ Updated `src/pages/LoginPage.tsx` - Added Google Sign-In button
5. ✅ Updated `.env.local` - Added `VITE_GOOGLE_CLIENT_ID`

### Backend Changes:
1. ✅ Installed `google-auth-library`
2. ✅ Updated `backend/server.js` - Added `/api/auth/google` endpoint
3. ✅ Updated `backend/.env.local` - Added Google OAuth credentials
4. ✅ Updated `.github/workflows/deploy.yml` - Added Google Client ID to build

---

## 🔧 Setup Steps

### 1. Install Dependencies

**Frontend:**
```bash
npm install @react-oauth/google jwt-decode
```

**Backend:**
```bash
cd backend
npm install google-auth-library
```

---

### 2. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing: **"Korzi"**
3. Enable APIs:
   - Google+ API
   - Google OAuth2 API

4. **Create OAuth 2.0 Credentials:**
   - Go to: **APIs & Services** → **Credentials**
   - Click: **Create Credentials** → **OAuth 2.0 Client ID**
   
5. **Configure OAuth Consent Screen:**
   - App name: `Korzi`
   - User support email: `team@korzi.toys`
   - Developer contact: `team@korzi.toys`
   - Authorized domains: 
     - `korzi.toys`
     - `localhost`

6. **Create OAuth Client ID:**
   - Application type: **Web application**
   - Name: `Korzi Web App`
   
   **Authorized JavaScript origins:**
   ```
   http://localhost:5173
   http://localhost:3000
   https://korzi.toys
   https://www.korzi.toys
   ```
   
   **Authorized redirect URIs:**
   ```
   http://localhost:5173/auth/google/callback
   http://localhost:3000/auth/google/callback
   https://korzi.toys/auth/google/callback
   https://www.korzi.toys/auth/google/callback
   ```

7. **Copy Credentials:**
   - Client ID: `YOUR_CLIENT_ID.apps.googleusercontent.com`
   - Client Secret: `YOUR_CLIENT_SECRET`

---

### 3. Update Environment Variables

**Frontend (`.env.local`):**
```env
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com
```

**Frontend (`.env.production`):**
```env
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com
```

**Backend (`backend/.env.local`):**
```env
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
SESSION_SECRET=generate_random_string_here
```

**Backend (`backend/.env.production`):**
```env
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
SESSION_SECRET=generate_random_string_here
```

**Generate Session Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### 4. GitHub Secrets Setup

Add these to your GitHub repository:

**Repository Variables (Settings → Secrets and variables → Actions → Variables):**
- `VITE_GOOGLE_CLIENT_ID` = Your Google Client ID

**Repository Secrets (Settings → Secrets and variables → Actions → Secrets):**
- `GOOGLE_CLIENT_SECRET` = Your Google Client Secret
- `SESSION_SECRET` = Your generated session secret

---

### 5. VPS Backend Environment

Update your VPS backend `.env.production`:

```bash
ssh your_vps_user@your_vps_host
cd /path/to/backend
nano .env.production
```

Add:
```env
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
SESSION_SECRET=your_session_secret_here
```

Restart backend:
```bash
pm2 restart backend
```

---

## 🧪 Testing

### Local Testing:

1. **Start Backend:**
```bash
cd backend
npm run backend
```

2. **Start Frontend:**
```bash
npm run dev
```

3. **Test Flow:**
   - Go to `http://localhost:5173/login`
   - Click "Sign in with Google" button
   - Select Google account
   - Should redirect to homepage with user logged in

### Production Testing:

1. Deploy to production
2. Go to `https://korzi.toys/login`
3. Test Google Sign-In
4. Verify user is created in Shopify Admin

---

## 🔍 How It Works

### Authentication Flow:

1. **User clicks "Sign in with Google"**
   - Google OAuth popup opens
   - User selects account and grants permission

2. **Google returns credential token**
   - Frontend receives JWT token from Google
   - Token sent to backend `/api/auth/google`

3. **Backend verifies token**
   - Validates token with Google OAuth2Client
   - Extracts user info (email, name, Google ID)

4. **Check/Create Shopify customer**
   - Search for customer by email in Shopify
   - If exists: Return customer data
   - If not: Create new customer with Google tag

5. **Return customer to frontend**
   - Frontend stores customer in auth store
   - User is logged in and redirected

---

## 📝 Important Notes

### Shopify Customer Token:
- Google OAuth creates/finds customer in Shopify
- However, Shopify Storefront API requires password for token generation
- Current implementation returns customer data without Shopify token
- For full Shopify integration, consider:
  - Using Shopify Plus (multipass)
  - Custom app with extended permissions
  - Hybrid approach (Google for auth, Shopify for orders)

### Security:
- Google tokens are verified server-side
- Never expose Client Secret in frontend
- Use HTTPS in production
- Session secrets should be strong and unique

### User Experience:
- One-tap sign-in enabled for returning users
- Seamless account creation for new users
- Email from Google auto-fills Shopify customer

---

## 🐛 Troubleshooting

### "Invalid Client ID" Error:
- Verify Client ID in `.env.local` matches Google Console
- Check authorized JavaScript origins include your domain
- Clear browser cache and cookies

### "Redirect URI Mismatch":
- Ensure all redirect URIs are added in Google Console
- Check for trailing slashes
- Verify protocol (http vs https)

### Backend Connection Failed:
- Check `VITE_BACKEND_URL` is correct
- Verify backend is running on correct port
- Check CORS settings allow your frontend domain

### Customer Not Created in Shopify:
- Verify `VITE_SHOPIFY_ADMIN_TOKEN` has correct permissions
- Check Shopify Admin API version matches
- Review backend logs for GraphQL errors

---

## 📚 Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React OAuth Google](https://www.npmjs.com/package/@react-oauth/google)
- [Shopify Admin API](https://shopify.dev/docs/api/admin-graphql)
- [Google Auth Library](https://www.npmjs.com/package/google-auth-library)

---

## ✨ Next Steps

1. Get Google OAuth credentials from Google Cloud Console
2. Update all environment variables
3. Test locally
4. Deploy to production
5. Test on live site
6. Monitor for any issues

---

**Need Help?** Contact the development team or refer to the documentation above.
