#!/usr/bin/env node
/**
 * Aggressive Image Optimization Script
 * 
 * Optimizes images to match rendered sizes with aggressive compression:
 * - Hero desktop: <200KB (target: 1920x1080 → 1400x788, quality 70)
 * - Hero mobile: <70KB (target: 640x360, quality 65)
 * - Destination cards: 800x600 max (rendered at ~400px wide)
 * - About image: 600x500 max (rendered at 50vw max)
 * - Logos: exact rendered sizes
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicAssetsDir = path.join(__dirname, '../public/assets');
const outAssetsDir = path.join(__dirname, '../out/assets');

// Aggressive optimization configs matching rendered sizes
const imageConfigs = {
  // Hero images - LCP critical
  'hero-petra.jpg': { 
    quality: 60, 
    maxWidth: 1400, 
    maxHeight: 788,
    targetSizeKB: 175 // Desktop <180KB (target 175KB for safety margin)
  },
  'hero-petra-mobile.jpg': { 
    quality: 55, 
    maxWidth: 640, 
    maxHeight: 360,
    targetSizeKB: 65 // Mobile <70KB (target 65KB for safety margin)
  },
  
  // Destination card images - rendered at ~400px wide (sm: 640px, lg: 33vw ~400px)
  // Grid: sm:2cols, lg:3cols, so max ~400px per image
  'petra-monastery.webp': { quality: 75, maxWidth: 800, maxHeight: 600 },
  'wadi-rum.webp': { quality: 75, maxWidth: 800, maxHeight: 600 },
  'dead-sea.webp': { quality: 75, maxWidth: 800, maxHeight: 600 },
  'jerash.webp': { quality: 75, maxWidth: 800, maxHeight: 600 },
  'amman.webp': { quality: 75, maxWidth: 800, maxHeight: 600 },
  
  // About section image - rendered at 50vw max (600px width specified)
  'petra-monastery.jpg': { quality: 75, maxWidth: 600, maxHeight: 500 },
  
  // Logos - exact rendered sizes, aggressive compression for <15KB
  'logo-header.png': { quality: 80, maxWidth: 400, maxHeight: 122, targetSizeKB: 12 }, // 400x122, <15KB
  'logo-footer.png': { quality: 75, maxWidth: 400, maxHeight: 400, targetSizeKB: 14 }, // 400x400, <15KB
  'logo.jpg': { quality: 80, maxWidth: 400, maxHeight: 490, targetSizeKB: 12 }, // 400x490, <15KB
  'badia-logo.png': { quality: 80, maxWidth: 192, maxHeight: 192 }, // PWA icon sizes, already small
};

async function optimizeImage(filename, config) {
  const inputPath = path.join(publicAssetsDir, filename);
  let outputPath = path.join(outAssetsDir, filename);
  
  // Ensure output directory exists
  if (!fs.existsSync(outAssetsDir)) {
    fs.mkdirSync(outAssetsDir, { recursive: true });
  }
  
  // Check if source exists, if not check WebP version
  let sourcePath = inputPath;
  if (!fs.existsSync(inputPath)) {
    const webpPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    if (fs.existsSync(webpPath)) {
      sourcePath = webpPath;
    } else {
      console.warn(`⚠️  Image not found: ${filename}`);
      return;
    }
  }
  
  try {
    const stats = fs.statSync(sourcePath);
    const originalSize = stats.size;
    
    // Get image metadata
    const metadata = await sharp(sourcePath).metadata();
    
    // Calculate target dimensions maintaining aspect ratio
    let targetWidth = Math.min(metadata.width, config.maxWidth);
    let targetHeight = Math.min(metadata.height, config.maxHeight);
    
    // Maintain aspect ratio
    const aspectRatio = metadata.height / metadata.width;
    if (targetHeight / targetWidth > aspectRatio) {
      targetHeight = Math.round(targetWidth * aspectRatio);
    } else {
      targetWidth = Math.round(targetHeight / aspectRatio);
    }
    
    // Convert to WebP
    const originalExt = path.extname(filename).toLowerCase();
    outputPath = outputPath.replace(/\.(jpg|jpeg|png|webp)$/i, '.webp');
    
    // For hero images, optimize until target size is reached
    let quality = config.quality;
    let result;
    
    if (config.targetSizeKB) {
      // Binary search for quality to hit target size
      let minQuality = 50;
      let maxQuality = 90;
      let bestQuality = quality;
      let bestSize = Infinity;
      
      while (minQuality <= maxQuality) {
        const testQuality = Math.floor((minQuality + maxQuality) / 2);
        const testBuffer = await sharp(sourcePath)
          .resize(targetWidth, targetHeight, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({ 
            quality: testQuality,
            effort: 6 // Maximum compression effort
          })
          .toBuffer();
        
        const testSizeKB = testBuffer.length / 1024;
        
        if (testSizeKB <= config.targetSizeKB) {
          bestQuality = testQuality;
          bestSize = testSizeKB;
          minQuality = testQuality + 1; // Try higher quality
        } else {
          maxQuality = testQuality - 1; // Try lower quality
        }
      }
      
      quality = bestQuality;
    }
    
    // Final optimization
    await sharp(sourcePath)
      .resize(targetWidth, targetHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ 
        quality: quality,
        effort: 6, // Maximum compression
        smartSubsample: true, // Better quality at lower file sizes
      })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const savings = originalSize - newSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
    
    const outputFilename = path.basename(outputPath);
    console.log(`✅ ${filename} → ${outputFilename}`);
    console.log(`   ${(originalSize / 1024).toFixed(1)} KiB → ${(newSize / 1024).toFixed(1)} KiB (${savingsPercent}% saved)`);
    console.log(`   Dimensions: ${metadata.width}x${metadata.height} → ${targetWidth}x${targetHeight}`);
    console.log(`   Quality: ${quality}, Effort: 6`);
    
    return { originalSize, newSize, savings };
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message);
    // Copy original if optimization fails
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, outputPath);
    }
    return null;
  }
}

async function optimizeAllImages() {
  console.log('🖼️  Starting aggressive image optimization...\n');
  
  let totalOriginal = 0;
  let totalNew = 0;
  
  for (const [filename, config] of Object.entries(imageConfigs)) {
    const result = await optimizeImage(filename, config);
    if (result) {
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`   Total original size: ${(totalOriginal / 1024).toFixed(1)} KiB`);
  console.log(`   Total optimized size: ${(totalNew / 1024).toFixed(1)} KiB`);
  console.log(`   Total savings: ${((totalOriginal - totalNew) / 1024).toFixed(1)} KiB (${(((totalOriginal - totalNew) / totalOriginal) * 100).toFixed(1)}%)`);
  console.log('\n✨ Aggressive image optimization complete!');
}

// Run optimization
optimizeAllImages().catch(console.error);

