# Hostinger Upload Checklist - Fix 403 Error

## ⚠️ CRITICAL STEPS (Do These First!)

### 1. DELETE .htaccess on Hostinger
- Go to File Manager → `public_html`
- **DELETE** `.htaccess` completely
- Test site: `https://northernbadiatours.com`
- **If site loads**: The issue was `.htaccess`
- **If still 403**: Continue to step 2

### 2. Delete Duplicate Files
In `public_html` on Hostinger:
- **DELETE** `Index.html` (capital I) if it exists
- **KEEP ONLY** `index.html` (lowercase)
- Verify `index.html` exists and is not empty

### 3. Set File Permissions (CRITICAL!)
In Hostinger File Manager:

**For EVERY file:**
1. Right-click → Change Permissions
2. Set to: **644** (rw-r--r--)
3. Apply to: `index.html`, `404.html`, `favicon.ico`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`
4. Apply to ALL files in `_next/` folder
5. Apply to ALL files in `assets/` folder

**For EVERY folder:**
1. Right-click → Change Permissions  
2. Set to: **755** (rwxr-xr-x)
3. Apply to: `_next/`, `assets/`, and all subfolders

### 4. Verify File Structure
Your `public_html` should have:

```
public_html/
├── index.html          ← lowercase, 644, NOT empty
├── 404.html           ← 644
├── favicon.ico         ← 644
├── robots.txt          ← 644
├── sitemap.xml         ← 644
├── manifest.webmanifest ← 644
├── _next/              ← 755
│   └── static/         ← 755
│       └── (all files) ← 644
└── assets/             ← 755
    └── (all images)     ← 644
```

### 5. Test Direct File Access
Try these URLs in your browser:

- ✅ `https://northernbadiatours.com/index.html` → Should load
- ✅ `https://northernbadiatours.com/favicon.ico` → Should load
- ✅ `https://northernbadiatours.com/robots.txt` → Should show text

**If these work but root doesn't**: Issue is directory index configuration

### 6. Add Minimal .htaccess (Only if Step 1 worked)
If site loaded after deleting `.htaccess`, create NEW `.htaccess`:

```apache
DirectoryIndex index.html
```

Upload and test again.

### 7. Check Hostinger Error Logs
1. hPanel → **Advanced** → **Error Log**
2. Look for errors related to your domain
3. Common errors:
   - "Directory index forbidden" → Need `DirectoryIndex index.html`
   - "Permission denied" → Fix permissions (644/755)
   - "File does not exist" → Verify files uploaded correctly

## Quick Test Procedure:

1. ✅ Delete `.htaccess`
2. ✅ Delete `Index.html` (if exists)
3. ✅ Set all files to 644
4. ✅ Set all folders to 755
5. ✅ Test site
6. ✅ Check error logs
7. ✅ Add minimal `.htaccess` if needed

## If Still Not Working:

### Contact Hostinger Support:

**Tell them:**
- Domain: `northernbadiatours.com`
- Error: 403 Forbidden
- What you've done: Deleted .htaccess, fixed permissions, verified files
- Request: Check server error logs and directory index settings

**Ask them:**
- Is `mod_rewrite` enabled?
- What is the directory index setting?
- Are there any server-side restrictions?
- Can you check the error logs for this domain?

## Most Common Causes:

1. **File Permissions** (90% of cases) → Fix: Set 644/755
2. **.htaccess Issues** (5% of cases) → Fix: Delete and test
3. **Missing index.html** (3% of cases) → Fix: Verify file exists
4. **Case Sensitivity** (2% of cases) → Fix: Delete Index.html, keep index.html

