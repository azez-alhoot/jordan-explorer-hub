# Fix 403 Error - Step by Step Guide

## ⚠️ CRITICAL: Case Sensitivity Issue Found!

Your build has **BOTH** `Index.html` and `index.html`. On Linux servers (Hostinger), this causes conflicts.

## Immediate Fix Steps:

### Step 1: Remove .htaccess Completely
1. In Hostinger File Manager, go to `public_html`
2. **DELETE** or **RENAME** `.htaccess` to `.htaccess.old`
3. This will test if `.htaccess` is causing the issue

### Step 2: Fix File Names (CRITICAL)
In your `public_html` folder on Hostinger:

1. **DELETE** `Index.html` (capital I)
2. **KEEP ONLY** `index.html` (lowercase)
3. Verify `index.html` exists and is readable

### Step 3: Set Correct Permissions
In Hostinger File Manager:

**For ALL files:**
- Right-click → Change Permissions → Set to **644**

**For ALL folders:**
- Right-click → Change Permissions → Set to **755**

**Specifically check:**
- `index.html` = 644
- `.htaccess` = 644 (if you keep it)
- `_next/` folder = 755
- `assets/` folder = 755
- All files inside `_next/` = 644
- All files inside `assets/` = 644

### Step 4: Verify File Structure
Your `public_html` should have EXACTLY this:

```
public_html/
├── index.html          ← lowercase, 644 permissions
├── 404.html           ← 644 permissions
├── favicon.ico         ← 644 permissions
├── robots.txt          ← 644 permissions
├── sitemap.xml         ← 644 permissions
├── manifest.webmanifest ← 644 permissions
├── _next/              ← 755 permissions
│   └── static/         ← 755 permissions
│       └── (files)     ← 644 permissions
└── assets/             ← 755 permissions
    └── (images)        ← 644 permissions
```

**DO NOT HAVE:**
- ❌ `Index.html` (capital I)
- ❌ `INDEX.HTML`
- ❌ Any other case variations

### Step 5: Test Without .htaccess
1. Make sure `.htaccess` is deleted or renamed
2. Try accessing: `https://northernbadiatours.com`
3. If it works → Add minimal `.htaccess` back (see Step 6)
4. If it still fails → Check error logs (Step 7)

### Step 6: Add Minimal .htaccess (Only if Step 5 works)
Create a NEW `.htaccess` with ONLY this:

```apache
DirectoryIndex index.html
```

Upload it and test again.

### Step 7: Check Error Logs
If still not working:

1. Go to Hostinger hPanel
2. **Advanced** → **Error Log**
3. Look for your domain's errors
4. Copy the exact error message
5. Common errors:
   - "Directory index forbidden" → Add `DirectoryIndex index.html`
   - "Permission denied" → Fix permissions (644/755)
   - "File does not exist" → Verify index.html exists

### Step 8: Test Direct File Access
Try accessing these URLs directly:

- `https://northernbadiatours.com/index.html`
- `https://northernbadiatours.com/favicon.ico`
- `https://northernbadiatours.com/robots.txt`

**Results:**
- ✅ If these load → Issue is routing/rewrite
- ❌ If these don't load → Issue is permissions or files don't exist

## Quick Checklist:

- [ ] Deleted `.htaccess` (test without it)
- [ ] Deleted `Index.html` (capital I)
- [ ] Verified `index.html` exists (lowercase)
- [ ] Set all files to 644
- [ ] Set all folders to 755
- [ ] Tested site access
- [ ] Checked error logs
- [ ] Tested direct file access

## If Still Not Working:

### Contact Hostinger Support with this info:

1. **Domain**: northernbadiatours.com
2. **Error**: 403 Forbidden
3. **What you've done**:
   - Removed .htaccess
   - Fixed file permissions (644/755)
   - Verified index.html exists
   - Deleted Index.html (capital I)
4. **Request**: Check server error logs and verify:
   - Directory index is set to `index.html`
   - File permissions are correct
   - No server-side restrictions

## Emergency: Rebuild and Re-upload

If nothing works, rebuild and ensure only lowercase files:

1. **Rebuild locally**:
   ```bash
   npm run build
   ```

2. **Check output**:
   ```bash
   ls -la out/*.html
   ```
   Should show only `index.html` (lowercase)

3. **Delete everything** in `public_html` on Hostinger

4. **Upload fresh** from `out/` folder:
   - Upload ALL files and folders
   - Set permissions (644/755)
   - NO `.htaccess` initially
   - Test site

5. **If it works**, add minimal `.htaccess`:
   ```apache
   DirectoryIndex index.html
   ```

