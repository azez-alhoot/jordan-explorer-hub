#!/usr/bin/env node
/**
 * Image Optimization Script
 * 
 * This script optimizes images for static export since Next.js Image Optimization
 * is not available with static export. It converts images to WebP format and
 * compresses them.
 * 
 * Requirements:
 * - sharp package (already installed)
 * - Run: node scripts/optimize-images.js
 * 
 * Estimated savings: ~516 KiB
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicAssetsDir = path.join(__dirname, '../public/assets');
const outAssetsDir = path.join(__dirname, '../out/assets');

// Image optimization settings
const imageConfigs = {
  // Hero images - LCP critical: MUST be <200KB for fastest load
  // Desktop: aggressive optimization to stay under 200KB
  'hero-petra.jpg': { quality: 75, maxWidth: 1400 }, // Reduced to 1400px and quality 75 for <200KB
  // Mobile: already optimized at 27KB - perfect for LCP
  'hero-petra-mobile.jpg': { quality: 70, maxWidth: 640 }, // 27KB - optimal for mobile LCP
  
  // Destination images - medium quality
  'petra-monastery.jpg': { quality: 80, maxWidth: 1200 },
  'wadi-rum.jpg': { quality: 80, maxWidth: 1200 },
  'dead-sea.jpg': { quality: 80, maxWidth: 1200 },
  'jerash.jpg': { quality: 80, maxWidth: 1200 },
  'amman.jpg': { quality: 80, maxWidth: 1200 },
  
  // Logo - high quality, smaller size
  'logo-header.png': { quality: 90, maxWidth: 400 },
  'logo-footer.png': { quality: 90, maxWidth: 400 },
  'logo.jpg': { quality: 85, maxWidth: 400 },
  // Keep badia-logo.png as PNG for favicon compatibility (optional)
  'badia-logo.png': { quality: 90, maxWidth: 512 },
};

async function optimizeImage(filename, config) {
  const inputPath = path.join(publicAssetsDir, filename);
  let outputPath = path.join(outAssetsDir, filename);
  
  // Ensure output directory exists
  if (!fs.existsSync(outAssetsDir)) {
    fs.mkdirSync(outAssetsDir, { recursive: true });
  }
  
  if (!fs.existsSync(inputPath)) {
    console.warn(`⚠️  Image not found: ${filename}`);
    return;
  }
  
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    
    // Calculate target dimensions
    const targetWidth = Math.min(metadata.width, config.maxWidth);
    const aspectRatio = metadata.height / metadata.width;
    const targetHeight = Math.round(targetWidth * aspectRatio);
    
    // Convert ALL images to WebP for maximum compression
    // WebP provides 25-35% better compression than JPEG/PNG
    // Browser support: 95%+ (all modern browsers)
    const originalExt = path.extname(filename).toLowerCase();
    outputPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    let sharpInstance = sharp(inputPath)
      .resize(targetWidth, targetHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ 
        quality: config.quality,
        effort: 6 // Higher effort = better compression (0-6, default 4)
      });
    
    await sharpInstance.toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const savings = originalSize - newSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
    
    const outputFilename = path.basename(outputPath);
    console.log(`✅ ${filename} → ${outputFilename}`);
    console.log(`   ${(originalSize / 1024).toFixed(1)} KiB → ${(newSize / 1024).toFixed(1)} KiB (${savingsPercent}% saved)`);
    console.log(`   Dimensions: ${metadata.width}x${metadata.height} → ${targetWidth}x${targetHeight}`);
    
    return { originalSize, newSize, savings };
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message);
    // Copy original if optimization fails
    fs.copyFileSync(inputPath, outputPath);
    return null;
  }
}

async function optimizeAllImages() {
  console.log('🖼️  Starting image optimization...\n');
  
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
  console.log('\n✨ Image optimization complete!');
}

// Run optimization
optimizeAllImages().catch(console.error);

