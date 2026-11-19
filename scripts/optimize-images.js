#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const OPTIMIZED_DIR = path.join(__dirname, '../optimized');

// Ensure optimized directory exists
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const ext = path.extname(inputPath).toLowerCase();
    
    if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
      // Copy non-image files as-is
      fs.copyFileSync(inputPath, outputPath);
      return;
    }

    await sharp(inputPath)
      .png({ quality: 90, compressionLevel: 6 })
      .jpeg({ quality: 90, progressive: true })
      .webp({ quality: 90 })
      .toFile(outputPath);
      
    const originalSize = stats.size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} - ${savings}% smaller`);
  } catch (error) {
    console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
    // Fallback: copy original file
    fs.copyFileSync(inputPath, outputPath);
  }
}

async function optimizeDirectory(inputDir, outputDir) {
  const items = fs.readdirSync(inputDir);
  
  for (const item of items) {
    const inputPath = path.join(inputDir, item);
    const outputPath = path.join(outputDir, item);
    
    if (fs.statSync(inputPath).isDirectory()) {
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }
      await optimizeDirectory(inputPath, outputPath);
    } else {
      await optimizeImage(inputPath, outputPath);
    }
  }
}

async function main() {
  console.log('🎨 Optimizing images for S3...');
  console.log(`📁 Input: ${PUBLIC_DIR}`);
  console.log(`📁 Output: ${OPTIMIZED_DIR}`);
  
  await optimizeDirectory(PUBLIC_DIR, OPTIMIZED_DIR);
  
  console.log('✨ Optimization complete!');
  console.log('📤 Ready to upload optimized images to S3');
}

main().catch(console.error);