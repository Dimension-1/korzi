#!/bin/bash
# Quick backend deployment script

VPS_IP="72.61.172.54"
VPS_USER="root"

echo "🚀 Deploying backend to VPS..."

# Upload files
scp backend/server.js backend/bigship.js backend/package.json backend/.env.local $VPS_USER@$VPS_IP:/root/korzi-backend/

# Restart backend
ssh $VPS_USER@$VPS_IP "cd /root/korzi-backend && npm install --production && pm2 restart korzi-backend"

echo "✅ Backend deployed successfully!"
