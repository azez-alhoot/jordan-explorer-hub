# Performance Optimization Guide

## Current Performance Score: 64/100

### Issues Identified:
- **First Contentful Paint**: 3.3s (Red - Poor)
- **Largest Contentful Paint**: 7.2s (Pink - Poor)  
- **Speed Index**: 6.4s (Pink - Poor)
- **Cumulative Layout Shift**: 0 (Green - Good)
- **Total Blocking Time**: 60ms (Green - Good)

## Optimization Strategies

### 1. Image Optimization (CRITICAL - Will improve LCP significantly)

**Current Issue**: Images are unoptimized (Next.js image optimization disabled for static export)

**Solutions**:

#### Option A: Pre-optimize Images Before Build
1. Compress all images in `public/assets/`:
   - Use tools like: TinyPNG, Squoosh, or ImageOptim
   - Target: 70-80% quality for JPGs
   - Convert to WebP format (better compression)

#### Option B: Use CDN (Recommended)
- Enable Hostinger CDN (if available)
- Or use Cloudflare (free tier available)
- CDN will optimize and cache images automatically

#### Option C: Lazy Load Below-the-Fold Images
- Hero image: Keep `priority` (above fold)
- Other images: Remove `priority`, add `loading="lazy"`

### 2. Font Optimization

**Current**: Loading 3 Google Fonts (Playfair Display, Lato, Noto Sans Arabic)

**Optimizations**:
- ✅ Already using `display: 'swap'` (good!)
- Consider: Preload critical fonts
- Consider: Self-host fonts instead of Google Fonts

### 3. JavaScript Bundle Optimization

**Current**: Large JS bundles loading synchronously

**Optimizations**:
- ✅ Already using `optimizePackageImports` (good!)
- Add: Code splitting for heavy components
- Add: Defer non-critical scripts

### 4. Enable Compression

**Status**: ✅ Already configured in `.htaccess`

### 5. Browser Caching

**Status**: ✅ Already configured in `.htaccess`

### 6. Enable CDN (Hostinger)

If available in Hostinger:
1. Go to **Performance** → **CDN**
2. Enable CDN for your domain
3. This will cache static assets globally

## Quick Wins (Implement These First)

### 1. Optimize Hero Image (Biggest Impact)
- Compress `hero-petra.jpg` to under 200KB
- Use WebP format if possible
- This alone should improve LCP by 2-3 seconds

### 2. Add Resource Hints
- Preconnect to Google Fonts
- Preload critical fonts
- Prefetch DNS for external resources

### 3. Defer Non-Critical Scripts
- Move analytics to load after page load
- Defer third-party scripts

### 4. Enable Hostinger CDN
- Check if available in Performance section
- Enable for automatic optimization

## Expected Improvements

After implementing optimizations:
- **Performance Score**: 64 → 85-90
- **First Contentful Paint**: 3.3s → 1.5-2s
- **Largest Contentful Paint**: 7.2s → 2.5-3s
- **Speed Index**: 6.4s → 3-4s

## Priority Order

1. **Image Optimization** (Highest impact)
2. **Enable CDN** (If available)
3. **Font Preloading**
4. **Script Optimization**

