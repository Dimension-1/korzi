#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../public/assets/Product/ProductTabs');
const OUTPUT_DIR = path.join(__dirname, '../optimized/assets/Product/ProductTabs');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(inputPath, outputPath) {
  const stats = fs.statSync(inputPath);
  const ext = path.extname(inputPath).toLowerCase();

  if (ext !== '.png') {
    fs.copyFileSync(inputPath, outputPath);
    return;
  }

  await sharp(inputPath)
    .png({ quality: 70, compressionLevel: 9, palette: true, effort: 10 })
    .toFile(outputPath);

  const originalSize = stats.size;
  const optimizedSize = fs.statSync(outputPath).size;
  const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

  console.log(`✅ ${path.basename(inputPath)} - ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(optimizedSize / 1024).toFixed(0)}KB (${savings}% smaller)`);
}

async function main() {
  console.log('🎨 Optimizing ProductTabs images...');

  const items = fs.readdirSync(INPUT_DIR).filter(f => !f.startsWith('.'));

  for (const item of items) {
    await optimizeImage(path.join(INPUT_DIR, item), path.join(OUTPUT_DIR, item));
  }

  console.log('\n✨ Done! Now upload with:');
  console.log('node scripts/upload-to-s3.js (or upload just the ProductTabs folder)');
}

main().catch(console.error);
