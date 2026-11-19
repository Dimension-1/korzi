#!/usr/bin/env node

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

// Configure AWS
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'korzi-assets';
const OPTIMIZED_DIR = path.join(__dirname, '../optimized');

async function uploadFile(filePath, s3Key) {
  const fileContent = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath) || 'application/octet-stream';
  
  const params = {
    Bucket: BUCKET_NAME,
    Key: s3Key,
    Body: fileContent,
    ContentType: contentType,
    CacheControl: 'max-age=31536000', // 1 year cache
  };

  try {
    const result = await s3.upload(params).promise();
    console.log(`✅ Uploaded: ${s3Key}`);
    return result.Location;
  } catch (error) {
    console.error(`❌ Failed to upload ${s3Key}:`, error.message);
  }
}

async function uploadDirectory(dirPath, s3Prefix = '') {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const s3Key = path.join(s3Prefix, item).replace(/\\/g, '/');
    
    if (fs.statSync(fullPath).isDirectory()) {
      await uploadDirectory(fullPath, s3Key);
    } else {
      await uploadFile(fullPath, s3Key);
    }
  }
}

async function main() {
  console.log('🚀 Starting S3 upload...');
  console.log(`📦 Bucket: ${BUCKET_NAME}`);
  console.log(`📁 Source: ${OPTIMIZED_DIR}`);
  
  // Check if optimized directory exists
  if (!fs.existsSync(OPTIMIZED_DIR)) {
    console.log('⚠️  Optimized directory not found. Run npm run optimize-images first.');
    process.exit(1);
  }
  
  await uploadDirectory(OPTIMIZED_DIR);
  
  console.log('✨ Upload complete!');
}

main().catch(console.error);