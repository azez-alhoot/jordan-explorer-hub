# 🚀 Quick Deployment Guide

## ✅ Build Status
**Build completed successfully!**
- Output directory: `out/` (3.5 MB)
- All files optimized and ready for deployment

---

## 📦 Deployment Steps

### Step 1: Prepare Files
Your build output is in the `out/` directory. You need to upload **ALL contents** from this folder.

### Step 2: Access Hostinger File Manager

1. Log in to **Hostinger hPanel**
2. Navigate to **File Manager**
3. Go to your domain's `public_html` folder (or `www` folder)

### Step 3: Clean Existing Files (Important!)

**Before uploading, delete:**
- ❌ Any existing `.htaccess` file (if causing 403 errors)
- ❌ `Index.html` (capital I) - keep only `index.html` (lowercase)
- ❌ Old `_next/` folder (if exists)
- ❌ Old `assets/` folder (if exists)

**Keep:**
- ✅ Any important files you need to preserve (backup first!)

### Step 4: Upload New Files

Upload **ALL contents** from the `out/` folder to `public_html`:

**Required Files & Folders:**
```
✅ index.html          (Main page - MUST be lowercase)
✅ 404.html            (Error page)
✅ favicon.ico         (Site icon)
✅ robots.txt          (SEO)
✅ sitemap.xml         (SEO)
✅ manifest.webmanifest (PWA)
✅ _next/              (JavaScript & CSS bundles - ENTIRE folder)
✅ assets/             (Images - ENTIRE folder)
```

**Important:** Upload the **contents** of `out/`, not the `out/` folder itself!

### Step 5: Set File Permissions (CRITICAL!)

**For ALL files:**
- Set permissions to **644** (rw-r--r--)
- Apply to: `index.html`, `404.html`, `favicon.ico`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`
- Apply to ALL files inside `_next/` folder
- Apply to ALL files inside `assets/` folder

**For ALL folders:**
- Set permissions to **755** (rwxr-xr-x)
- Apply to: `_next/`, `assets/`, and all subfolders

### Step 6: Create Minimal .htaccess (Optional but Recommended)

Create a new `.htaccess` file in `public_html` with:

```apache
# Set directory index
DirectoryIndex index.html

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

Set `.htaccess` permissions to **644**.

### Step 7: Test Your Site

Visit your domain:
- ✅ `https://northernbadiatours.com` → Should load homepage
- ✅ `https://northernbadiatours.com/index.html` → Should load
- ✅ `https://northernbadiatours.com/favicon.ico` → Should load icon
- ✅ `https://northernbadiatours.com/robots.txt` → Should show text

---

## 🔍 Troubleshooting

### If you get 403 Forbidden:

1. **Check file permissions:**
   - Files: 644
   - Folders: 755

2. **Delete `.htaccess` temporarily** and test

3. **Verify `index.html` exists** and is lowercase

4. **Check Hostinger Error Logs:**
   - hPanel → Advanced → Error Log

### If images don't load:

1. Verify `assets/` folder uploaded correctly
2. Check file paths in browser console (F12)
3. Verify image files have 644 permissions

### If styles don't load:

1. Verify `_next/` folder uploaded correctly
2. Check browser console for 404 errors
3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

---

## 📊 Build Summary

- **Total Size:** 3.5 MB
- **Pages:** 5 static pages generated
- **Images:** Optimized WebP format
- **JavaScript:** Code-split and optimized
- **Performance:** All optimizations applied ✅

---

## 🎯 Quick Checklist

- [ ] Deleted old `.htaccess` (if causing issues)
- [ ] Deleted `Index.html` (keep only `index.html`)
- [ ] Uploaded all files from `out/` to `public_html`
- [ ] Set all files to 644 permissions
- [ ] Set all folders to 755 permissions
- [ ] Created new `.htaccess` file
- [ ] Tested site loads correctly
- [ ] Verified images load
- [ ] Verified styles load

---

## 🚀 Your site is ready!

After deployment, your optimized Next.js site will be live with:
- ✅ Optimized images (WebP)
- ✅ Code-split JavaScript
- ✅ Lazy-loaded components
- ✅ SEO-friendly structure
- ✅ Fast loading times

**Need help?** Check Hostinger support or review the error logs.

