# Mobile Image Optimization - Setup Instructions

## 🎯 Quick Start: Optimize Hero Image for Mobile

### Step 1: Create Mobile Version of Hero Image

1. **Go to TinyPNG**: https://tinypng.com
2. **Upload**: `public/assets/hero-petra.jpg`
3. **Download** the compressed version
4. **Resize** the image to 768px width:
   - Use Squoosh: https://squoosh.app
   - Or ImageMagick: `convert hero-petra.jpg -resize 768x -quality 75 hero-petra-mobile.jpg`
5. **Save as**: `public/assets/hero-petra-mobile.jpg`
6. **Target size**: Under 150KB (ideally 100-120KB)

### Step 2: Verify File Structure

Your `public/assets/` folder should have:
```
public/assets/
├── hero-petra.jpg          (271KB - desktop)
├── hero-petra-mobile.jpg   (150KB - mobile) ← NEW
├── wadi-rum.jpg
├── dead-sea.jpg
└── ... (other images)
```

### Step 3: Rebuild and Test

```bash
npm run build
```

Upload to Hostinger and test mobile performance!

## 📊 Expected Results

After implementing mobile hero image:
- **Mobile LCP**: 5.5s → 2.5-3s
- **Mobile Performance**: 76 → 85-90
- **Data Saved**: ~120KB per mobile visit

## 🚀 Optional: Optimize All Images

### Priority Order:
1. ✅ Hero image (CRITICAL - biggest impact)
2. Destination images (wadi-rum, dead-sea, etc.)
3. About section image (petra-monastery)
4. Logo images (already small)

### For Each Image:
1. Create mobile version: `image-name-mobile.jpg`
2. Target: 768px width, 100-150KB
3. Update component to use picture element

## 🛠️ Tools for Image Optimization

### Online Tools (Free):
- **TinyPNG**: https://tinypng.com (easiest)
- **Squoosh**: https://squoosh.app (more control)
- **Compressor.io**: https://compressor.io

### Desktop Tools:
- **ImageOptim** (Mac): https://imageoptim.com
- **FileOptimizer** (Windows): https://nikkhokkho.sourceforge.io

### Command Line (ImageMagick):
```bash
# Install ImageMagick first
brew install imagemagick  # Mac
# or
apt-get install imagemagick  # Linux

# Resize and compress
convert hero-petra.jpg -resize 768x -quality 75 hero-petra-mobile.jpg
```

## 📝 Implementation Notes

The code now uses the `<picture>` element which:
- ✅ Serves `hero-petra-mobile.jpg` on mobile (≤768px)
- ✅ Serves `hero-petra.jpg` on tablet/desktop (>768px)
- ✅ Falls back to desktop image if mobile version missing
- ✅ Works with Next.js Image component

## ⚠️ Important

**If mobile image doesn't exist yet:**
- The code will fall back to the desktop image
- Site will still work, just won't be optimized
- Create the mobile version to see improvements

## ✅ Checklist

- [ ] Create `hero-petra-mobile.jpg` (150KB, 768px width)
- [ ] Place in `public/assets/` folder
- [ ] Rebuild: `npm run build`
- [ ] Upload to Hostinger
- [ ] Test mobile performance
- [ ] Verify mobile image loads (check Network tab)

