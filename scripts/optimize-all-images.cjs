#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const OPTIMIZED_DIR = path.join(__dirname, '../optimized');

// WebP max dimension is 16383px - images larger than this stay as PNG
const WEBP_MAX_DIM = 16383;

function findAllPngs(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findAllPngs(fullPath));
    } else if (entry.isFile() && /\.png$/i.test(entry.name)) {
      results.push(path.relative(PUBLIC_DIR, fullPath));
    }
  }
  return results;
}

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
  console.log('🎨 Optimizing ALL PNG images...\n');

  const pngs = findAllPngs(PUBLIC_DIR);
  console.log(`Found ${pngs.length} PNG files\n`);

  const results = [];
  for (const png of pngs) {
    try {
      const result = await optimizeImage(png);
      if (result) results.push(result);
    } catch (err) {
      console.log(`❌ Failed: ${png} - ${err.message}`);
    }
  }

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
