#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const OPTIMIZED_DIR = path.join(__dirname, '../optimized');

// Images to optimize (all the heavy ones)
const TARGETS = [
  // ProductTabs
  'assets/Product/ProductTabs/Desc.png',
  'assets/Product/ProductTabs/CoreSpecs.png',
  'assets/Product/ProductTabs/builddim.png',
  'assets/Product/ProductTabs/performance.png',
  'assets/Product/ProductTabs/warranty.png',
  'assets/Product/ProductTabs/whatinbox.png',
  // Homepage heavy
  'assets/homepage/HOME.png',
  'assets/homepage/HOME-1.png',
  'assets/homepage/Group 48429.png',
  'assets/homepage/crashed_test.png',
  'assets/homepage/Korziteam.png',
  'assets/homepage/Parentkid.png',
  // Support
  'assets/Support/warranty.png',
  'assets/Support/repair.png',
  'assets/Support/safety.png',
  // AutoScroll
  'assets/About/AutoScroll/AutoScroll1.png',
  'assets/About/AutoScroll/AutoScroll2.png',
  'assets/About/AutoScroll/AutoScroll3.png',
  'assets/About/AutoScroll/AutoScroll4.png',
  'assets/About/AutoScroll/AutoScroll5.png',
  'assets/About/AutoScroll/AutoScroll6.png',
  'assets/About/AutoScroll/AutoScroll7.png',
  // About Hero
  'assets/About/Hero Section/Main.png',
  'assets/About/Hero Section/Main_mobile.png',
  // Other heavy homepage
  'assets/homepage/powermeetsprecision.png',
  'assets/homepage/Ellipse 81.png',
  'assets/homepage/Ellipse80.png',
  'assets/homepage/assembly2.png',
  'assets/homepage/IMG_4358 1.png',
  'assets/homepage/IMG_4957 1.png',
  'assets/homepage/services1.png',
  'assets/homepage/packaging2.png',
  'assets/homepage/testing1.png',
  'assets/homepage/network.png',
  'assets/homepage/manufacturing1.png',
];

// WebP max dimension is 16383px - images larger than this stay as PNG
const WEBP_MAX_DIM = 16383;

async function optimizeImage(relativePath) {
  const inputPath = path.join(PUBLIC_DIR, relativePath);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  Skipping (not found): ${relativePath}`);
    return;
  }

  const meta = await sharp(inputPath).metadata();
  const orig = fs.statSync(inputPath).size;
  const isOversized = meta.width > WEBP_MAX_DIM || meta.height > WEBP_MAX_DIM;

  let outputRelPath, outputPath;

  if (isOversized) {
    // Too large for WebP - use aggressive PNG
    outputRelPath = relativePath;
    outputPath = path.join(OPTIMIZED_DIR, outputRelPath);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    await sharp(inputPath)
      .png({ palette: true, quality: 80, compressionLevel: 9, effort: 10 })
      .toFile(outputPath);
  } else {
    // Convert to WebP
    outputRelPath = relativePath.replace(/\.png$/i, '.webp');
    outputPath = path.join(OPTIMIZED_DIR, outputRelPath);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);
  }

  const comp = fs.statSync(outputPath).size;
  const savings = ((orig - comp) / orig * 100).toFixed(0);
  const format = isOversized ? 'PNG(palette)' : 'WebP';
  console.log(`✅ ${relativePath} → ${format} | ${(orig/1024/1024).toFixed(2)}MB → ${(comp/1024).toFixed(0)}KB (${savings}% saved)`);

  return { original: relativePath, optimized: outputRelPath, isWebP: !isOversized };
}

async function main() {
  console.log('🎨 Optimizing heavy images...\n');

  const results = [];
  for (const target of TARGETS) {
    const result = await optimizeImage(target);
    if (result) results.push(result);
  }

  // Save mapping for code updates
  const webpFiles = results.filter(r => r.isWebP);
  console.log(`\n✨ Done! ${results.length} images optimized.`);
  console.log(`   ${webpFiles.length} converted to WebP (need code reference updates)`);
  console.log(`   ${results.length - webpFiles.length} kept as PNG (oversized)\n`);

  // Write mapping file for reference
  const mapping = {};
  webpFiles.forEach(r => { mapping[r.original] = r.optimized; });
  fs.writeFileSync(path.join(__dirname, '../webp-mapping.json'), JSON.stringify(mapping, null, 2));
  console.log('📄 Saved webp-mapping.json for code reference updates');
}

main().catch(console.error);
