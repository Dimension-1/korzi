#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const DIMENSIONS_FILE = path.join(__dirname, '../src/utils/imageDimensions.ts');

async function getImageDimensions(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      aspectRatio: `${((metadata.height / metadata.width) * 100).toFixed(2)}%`
    };
  } catch (error) {
    console.error(`Failed to get dimensions for ${imagePath}:`, error.message);
    return null;
  }
}

async function scanDirectory(dirPath, basePath = '') {
  const dimensions = {};
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const relativePath = path.join(basePath, item).replace(/\\/g, '/');
    
    if (fs.statSync(fullPath).isDirectory()) {
      const subDimensions = await scanDirectory(fullPath, relativePath);
      Object.assign(dimensions, subDimensions);
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) {
        const dims = await getImageDimensions(fullPath);
        if (dims) {
          dimensions[`/${relativePath}`] = dims;
          console.log(`📏 ${relativePath}: ${dims.width}x${dims.height} (${dims.aspectRatio})`);
        }
      }
    }
  }
  
  return dimensions;
}

async function generateDimensionsFile(dimensions) {
  const content = `// Image dimension mapping to preserve exact layouts
export const imageDimensions: Record<string, { width: number; height: number; aspectRatio: string }> = ${JSON.stringify(dimensions, null, 2)};`;
  
  fs.writeFileSync(DIMENSIONS_FILE, content);
  console.log(`✅ Generated ${DIMENSIONS_FILE}`);
}

async function main() {
  console.log('📐 Scanning images for dimensions...');
  
  const dimensions = await scanDirectory(PUBLIC_DIR);
  await generateDimensionsFile(dimensions);
  
  console.log(`✨ Found ${Object.keys(dimensions).length} images`);
  console.log('🎯 Dimensions mapped for layout preservation');
}

main().catch(console.error);