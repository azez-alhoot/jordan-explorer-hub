# Mobile Image Optimization Guide

## 🎯 Goal: Reduce image sizes for mobile devices

Mobile devices need smaller images because:
- Slower network connections (3G/4G)
- Limited data plans
- Smaller screens (don't need full resolution)

## 📋 Step-by-Step Guide

### Step 1: Create Mobile-Optimized Versions

For each large image, create a mobile version:

**Example: Hero Image**
- Original: `hero-petra.jpg` (271KB, 1920px wide)
- Mobile: `hero-petra-mobile.jpg` (150KB, 768px wide)

**Tools to Use:**
1. **TinyPNG** (https://tinypng.com)
   - Upload original image
   - Download compressed version
   - Resize to 768px width for mobile

2. **Squoosh** (https://squoosh.app)
   - More control over quality
   - Can resize and compress
   - Best for fine-tuning

3. **ImageMagick** (Command line)
   ```bash
   convert hero-petra.jpg -resize 768x -quality 75 hero-petra-mobile.jpg
   ```

### Step 2: Implement Responsive Images

#### Option A: Using Next.js Image with srcset (Recommended)

Since images are unoptimized, we'll use the `picture` element or conditional loading.

#### Option B: Using Picture Element (Best for Mobile Optimization)

This allows different images for different screen sizes.

### Step 3: Optimize All Images

**Priority Images to Optimize:**
1. ✅ `hero-petra.jpg` → `hero-petra-mobile.jpg` (CRITICAL)
2. `petra-monastery.jpg` → `petra-monastery-mobile.jpg`
3. `wadi-rum.jpg` → `wadi-rum-mobile.jpg`
4. `dead-sea.jpg` → `dead-sea-mobile.jpg`
5. `jerash.jpg` → `jerash-mobile.jpg`
6. `amman.jpg` → `amman-mobile.jpg`

## 🛠️ Implementation

### Method 1: Picture Element (Best Control)

Allows different images for mobile vs desktop.

### Method 2: Conditional Loading (Simpler)

Use JavaScript to load different images based on screen size.

### Method 3: CSS Media Queries with Background Images

For background images, use CSS to load different sizes.

## 📊 Expected Results

After optimization:
- **Mobile LCP**: 5.5s → 2-3s
- **Mobile Performance**: 76 → 85-90
- **Data Usage**: Reduced by 40-60% on mobile

## 🎯 Quick Win: Hero Image Only

Start with just the hero image:
1. Create `hero-petra-mobile.jpg` (150KB, 768px)
2. Implement responsive loading
3. Test mobile performance
4. If good results, optimize other images

