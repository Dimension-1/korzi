# VPS Backend Deployment & Debugging Guide

## 🔍 WHAT WAS THE ISSUE?

**Problem:** Frontend calling `localhost:3001` in production instead of actual backend URL.

**Root Cause:** 
- GitHub variable `VITE_BACKEND_URL` was not set correctly
- CORS was blocking localhost requests
- No separation between dev and prod environments

---

## ✅ SOLUTION IMPLEMENTED

### 1. **Environment Files Created**
- `.env.development` → Uses `http://localhost:3001` for local dev
- `.env.production` → Uses `https://korzi.toys` for production
- `.env.local` → Your personal overrides (gitignored)

### 2. **Backend CORS Updated**
Now allows:
- `https://korzi.toys` (production)
- `https://www.korzi.toys` (production)
- `http://localhost:3000` (local dev)
- `http://localhost:5173` (Vite dev server)

### 3. **GitHub Workflow**
Already configured to use `VITE_BACKEND_URL` from GitHub variables.

---

## 🚀 HOW TO USE

### **Local Development:**
```bash
# Start backend
cd backend
npm start

# Start frontend (in another terminal)
npm run dev
```
Frontend will use `http://localhost:3001` automatically.

### **Production Build:**
```bash
npm run build
```
Will use `https://korzi.toys` from `.env.production`.

---

## 🔧 VPS BACKEND DEBUGGING COMMANDS

### **1. Check if Backend is Running**
```bash
ssh root@your-vps-ip

# Check PM2 status
pm2 status
pm2 list

# Check specific backend process
pm2 info backend
```

### **2. View Backend Logs**
```bash
# Real-time logs
pm2 logs backend

# Last 50 lines
pm2 logs backend --lines 50

# Only errors
pm2 logs backend --err

# Clear logs
pm2 flush
```

### **3. Check Backend Port**
```bash
# Check if port 3001 is listening
netstat -tulpn | grep 3001
# OR
lsof -i :3001

# Check all Node processes
ps aux | grep node
```

### **4. Test Backend Locally on VPS**
```bash
# Health check (if you have one)
curl http://localhost:3001/health

# Test Razorpay endpoint
curl -X POST http://localhost:3001/api/razorpay/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "currency": "INR"}'

# Test Shopify endpoint
curl -X POST http://localhost:3001/api/shopify/create-order \
  -H "Content-Type: application/json" \
  -d '{"orderData": {}, "paymentId": "test"}'
```

### **5. Check Backend Environment Variables**
```bash
# Go to backend directory
cd /path/to/backend

# Check if .env exists
ls -la .env*

# View .env (be careful with secrets!)
cat .env

# Check specific variable
grep RAZORPAY .env
```

### **6. Restart Backend**
```bash
# Restart
pm2 restart backend

# Stop and start fresh
pm2 stop backend
pm2 delete backend
pm2 start server.js --name backend

# Restart with logs
pm2 restart backend && pm2 logs backend
```

### **7. Check Nginx Configuration**
```bash
# Test nginx config
nginx -t

# View nginx config
cat /etc/nginx/sites-available/default

# Restart nginx
systemctl restart nginx

# Check nginx status
systemctl status nginx
```

### **8. Check Firewall**
```bash
# Check if port 3001 is open
ufw status

# Open port if needed
ufw allow 3001

# Check iptables
iptables -L -n
```

### **9. Monitor Backend in Real-time**
```bash
# Monitor with PM2
pm2 monit

# Check system resources
htop
# OR
top
```

### **10. Find Backend Directory**
```bash
# Find where backend is running
pm2 describe backend | grep cwd

# Find server.js
find / -name "server.js" 2>/dev/null

# Find backend folder
find / -type d -name "backend" 2>/dev/null
```

---

## 📋 BACKEND DEPLOYMENT CHECKLIST

### **On VPS:**

1. **Upload Backend Code**
```bash
# Create backend directory
mkdir -p /var/www/backend
cd /var/www/backend

# Upload files (from local)
scp -r backend/* root@your-vps:/var/www/backend/
```

2. **Install Dependencies**
```bash
cd /var/www/backend
npm install
```

3. **Create .env File**
```bash
cat > .env << EOF
VITE_RAZORPAY_KEY_ID=your_key_id
VITE_RAZORPAY_SECRET=your_secret
BIGSHIP_API_URL=https://api.bigship.in/
BIGSHIP_EMAIL=your_email
BIGSHIP_PASSWORD=your_password
BIGSHIP_ACCESS_KEY=your_access_key
VITE_SHOPIFY_ADMIN_TOKEN=your_admin_token
VITE_SHOPIFY_STOREFRONT_URL=your_shopify_url
PORT=3001
EOF

chmod 600 .env
```

4. **Start with PM2**
```bash
pm2 start server.js --name backend
pm2 save
pm2 startup
```

5. **Configure Nginx (Optional - for /api proxy)**
```bash
nano /etc/nginx/sites-available/default

# Add this inside server block:
location /api {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_cache_bypass $http_upgrade;
}

# Test and restart
nginx -t
systemctl restart nginx
```

---

## 🐛 COMMON ISSUES & FIXES

### **Issue: "Cannot GET /api/..."**
**Cause:** Route doesn't exist or backend not running.
**Fix:** Check `pm2 logs backend` and verify routes in server.js.

### **Issue: "ERR_CONNECTION_REFUSED"**
**Cause:** Backend not running or wrong URL.
**Fix:** 
```bash
pm2 restart backend
netstat -tulpn | grep 3001
```

### **Issue: "CORS Error"**
**Cause:** Origin not allowed.
**Fix:** Backend now allows localhost. Restart backend:
```bash
pm2 restart backend
```

### **Issue: "Failed to fetch"**
**Cause:** Backend URL wrong or backend down.
**Fix:** Check browser console for actual URL being called.

### **Issue: Backend crashes on start**
**Cause:** Missing environment variables.
**Fix:** 
```bash
cd /var/www/backend
cat .env
pm2 logs backend --err
```

---

## 📊 MONITORING

### **Set up PM2 Monitoring**
```bash
# Enable monitoring
pm2 install pm2-logrotate

# Set log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### **Check Backend Health**
```bash
# Create a simple health check script
cat > check-backend.sh << 'EOF'
#!/bin/bash
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/razorpay/create-order)
if [ $response -eq 200 ] || [ $response -eq 400 ]; then
    echo "Backend is UP"
else
    echo "Backend is DOWN - Restarting..."
    pm2 restart backend
fi
EOF

chmod +x check-backend.sh

# Add to crontab (runs every 5 minutes)
crontab -e
# Add: */5 * * * * /path/to/check-backend.sh
```

---

## 🔐 SECURITY NOTES

1. **Never commit .env.local** - Contains secrets
2. **.env.development and .env.production** - Safe to commit (no secrets)
3. **VPS .env file** - Keep secure with `chmod 600`
4. **Rotate secrets regularly**
5. **Use HTTPS in production**

---

## 📞 QUICK REFERENCE

| Command | Purpose |
|---------|---------|
| `pm2 status` | Check all processes |
| `pm2 logs backend` | View logs |
| `pm2 restart backend` | Restart backend |
| `netstat -tulpn \| grep 3001` | Check port |
| `curl http://localhost:3001/api/...` | Test endpoint |
| `nginx -t` | Test nginx config |
| `systemctl restart nginx` | Restart nginx |

---

## ✅ VERIFICATION STEPS

After deployment, verify:

1. **Backend is running:**
   ```bash
   pm2 status
   ```

2. **Port is listening:**
   ```bash
   netstat -tulpn | grep 3001
   ```

3. **Logs are clean:**
   ```bash
   pm2 logs backend --lines 20
   ```

4. **Test from VPS:**
   ```bash
   curl http://localhost:3001/api/razorpay/create-order
   ```

5. **Test from browser:**
   Open: `https://korzi.toys` and try checkout

---

## 🎯 NEXT STEPS

1. Commit the changes:
   ```bash
   git add .env.development .env.production backend/server.js .gitignore
   git commit -m "Fix: Separate dev/prod environments and update CORS"
   git push origin release/prod
   ```

2. Verify GitHub variable:
   - Go to GitHub → Settings → Variables
   - Ensure `VITE_BACKEND_URL` = `https://korzi.toys`

3. Deploy and test!
