# 🚀 Google OAuth Quick Start Guide

## ✅ What's Already Done

All code changes are complete! Here's what was implemented:

### Frontend:
- ✅ Google OAuth service (`src/services/googleAuth.ts`)
- ✅ Auth store updated with Google login
- ✅ Login page with Google Sign-In button
- ✅ Dependencies installed (`@react-oauth/google`, `jwt-decode`)

### Backend:
- ✅ Google auth endpoint (`/api/auth/google`)
- ✅ Dependencies installed (`google-auth-library`)
- ✅ Shopify customer creation/lookup

---

## 🎯 What You Need To Do

### Step 1: Get Google OAuth Credentials (5 minutes)

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/

2. **Create/Select Project:**
   - Create new project: "Korzi" (or use existing)

3. **Enable APIs:**
   - Go to: **APIs & Services** → **Library**
   - Search and enable: **Google+ API**

4. **Configure OAuth Consent Screen:**
   - Go to: **APIs & Services** → **OAuth consent screen**
   - User Type: **External**
   - App name: `Korzi`
   - User support email: `team@korzi.toys`
   - Developer email: `team@korzi.toys`
   - Authorized domains: Add `korzi.toys`
   - Click **Save and Continue**

5. **Create OAuth Client ID:**
   - Go to: **APIs & Services** → **Credentials**
   - Click: **+ CREATE CREDENTIALS** → **OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Name: `Korzi Web App`
   
   **Authorized JavaScript origins:**
   ```
   http://localhost:5173
   https://korzi.toys
   https://www.korzi.toys
   ```
   
   **Authorized redirect URIs:**
   ```
   http://localhost:5173
   https://korzi.toys
   https://www.korzi.toys
   ```
   
   - Click **CREATE**

6. **Copy Your Credentials:**
   ```
   Client ID: 123456789-abcdefg.apps.googleusercontent.com
   Client Secret: GOCSPX-abc123def456
   ```

---

### Step 2: Update Environment Variables

**Frontend `.env.local`:**
```bash
# Replace with your actual Client ID
VITE_GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
```

**Backend `backend/.env.local`:**
```bash
# Replace with your actual credentials
GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123def456
SESSION_SECRET=your_random_secret_here
```

**Generate Session Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### Step 3: Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

---

### Step 4: Test Locally

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run backend
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

**Test:**
1. Open: http://localhost:5173/login
2. Click "Sign in with Google" button
3. Select your Google account
4. Should redirect to homepage logged in
5. Check Shopify Admin → Customers (new customer created)

---

### Step 5: Deploy to Production

**Update GitHub Secrets:**
1. Go to: GitHub Repository → Settings → Secrets and variables → Actions
2. Add **Repository Variable**:
   - Name: `VITE_GOOGLE_CLIENT_ID`
   - Value: Your Google Client ID

**Update VPS Backend:**
```bash
ssh your_user@your_vps
cd /path/to/backend
nano .env.production
```

Add:
```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
SESSION_SECRET=your_session_secret
```

**Restart Backend:**
```bash
pm2 restart backend
```

**Deploy Frontend:**
```bash
git add .
git commit -m "Add Google OAuth authentication"
git push origin release/prod
```

---

## 🎨 What Users Will See

### Login Page:
- Email/Password form (existing)
- **"Or continue with"** divider
- **Google Sign-In button** (with Google logo)
- One-tap sign-in for returning users

### Sign Up Page:
- Registration form (existing)
- **"Or continue with"** divider
- **Google Sign-Up button**

---

## 🔍 How It Works

1. User clicks Google button
2. Google OAuth popup opens
3. User selects account
4. Google returns JWT token
5. Frontend sends token to backend
6. Backend verifies with Google
7. Backend checks/creates Shopify customer
8. User logged in automatically

---

## 📋 Checklist

- [ ] Get Google OAuth credentials from Google Cloud Console
- [ ] Update `.env.local` with `VITE_GOOGLE_CLIENT_ID`
- [ ] Update `backend/.env.local` with Google credentials
- [ ] Test locally (login with Google)
- [ ] Verify customer created in Shopify
- [ ] Add GitHub secret `VITE_GOOGLE_CLIENT_ID`
- [ ] Update VPS backend `.env.production`
- [ ] Deploy to production
- [ ] Test on live site

---

## 🐛 Common Issues

**"Invalid Client ID":**
- Check Client ID is correct in `.env.local`
- Verify authorized origins include your domain

**"Redirect URI Mismatch":**
- Add all redirect URIs in Google Console
- Include both http://localhost:5173 and https://korzi.toys

**Backend Error:**
- Check `VITE_BACKEND_URL` is correct
- Verify backend is running
- Check backend logs for errors

**Customer Not Created:**
- Verify Shopify Admin token has permissions
- Check backend logs for GraphQL errors

---

## 📞 Need Help?

Refer to the detailed guide: `GOOGLE_AUTH_SETUP.md`

---

**That's it! Google OAuth is ready to use once you add your credentials.**
