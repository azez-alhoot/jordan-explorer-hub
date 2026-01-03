# How to Diagnose 403 Error on Hostinger

## Step 1: Check Error Logs

### Method 1: Via hPanel (Easiest)
1. Log in to **Hostinger hPanel**
2. Go to **Advanced** → **Error Log**
3. Look for recent errors related to your domain
4. Check for specific error messages like:
   - "Options not allowed here"
   - "mod_rewrite not enabled"
   - "Permission denied"
   - "Directory index forbidden"

### Method 2: Via File Manager
1. Go to **File Manager** in hPanel
2. Navigate to your domain's root directory (`public_html`)
3. Look for files like:
   - `error_log`
   - `error.log`
   - `.error_log`
4. Open and read the most recent entries

### Method 3: Via FTP/SSH
1. Connect via FTP or SSH
2. Check these locations:
   - `/public_html/error_log`
   - `/logs/error_log`
   - `/var/log/apache2/error.log` (if SSH access)

## Step 2: Check File Permissions

### Via File Manager:
1. Go to **File Manager** → **public_html**
2. Right-click on `index.html` → **Change Permissions**
3. Should be: **644** (rw-r--r--)
4. Right-click on folders (`_next`, `assets`) → **Change Permissions**
5. Should be: **755** (rwxr-xr-x)
6. Right-click on `.htaccess` → **Change Permissions**
7. Should be: **644** (rw-r--r--)

### Via FTP Client:
1. Connect via FileZilla or similar
2. Right-click file → **File Permissions**
3. Set:
   - Files: `644`
   - Folders: `755`

### Via SSH (if available):
```bash
cd public_html
chmod 644 index.html
chmod 644 .htaccess
chmod -R 755 _next
chmod -R 755 assets
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
```

## Step 3: Verify File Structure

### Check if index.html exists:
1. Go to **File Manager** → **public_html**
2. Look for `index.html` (case-sensitive!)
3. Make sure it's NOT `Index.html` or `INDEX.HTML`
4. Verify the file is not empty

### Check file structure:
Your `public_html` should contain:
```
public_html/
├── index.html          ← MUST exist!
├── .htaccess          ← Should exist
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── manifest.webmanifest
├── _next/
│   └── static/
│       └── (JS/CSS files)
├── assets/
│   └── (image files)
└── 404.html
```

## Step 4: Test .htaccess

### Temporarily disable .htaccess:
1. In File Manager, rename `.htaccess` to `.htaccess.backup`
2. Try accessing your site
3. **If site loads**: The issue is in `.htaccess`
4. **If still 403**: The issue is permissions or missing files

### Test minimal .htaccess:
Create a new `.htaccess` with ONLY this:
```apache
DirectoryIndex index.html
```
If this works, gradually add rules back.

## Step 5: Check Apache Modules

### Contact Hostinger Support:
Ask them:
1. Is `mod_rewrite` enabled?
2. Are `.htaccess` files allowed?
3. What Apache modules are available?
4. Are there any server restrictions?

### Check via .htaccess test:
Create a test file `test.php`:
```php
<?php
phpinfo();
?>
```
Upload and check if `mod_rewrite` is listed.

## Step 6: Check Directory Index Settings

### Via hPanel:
1. Go to **Advanced** → **Index Manager**
2. Make sure **index.html** is listed as a directory index
3. Priority should be: `index.html, index.php, index.htm`

### Via .htaccess:
Add this line at the top:
```apache
DirectoryIndex index.html index.php index.htm
```

## Step 7: Check File Ownership

### Via SSH (if available):
```bash
cd public_html
ls -la
```
Check if files are owned by your user account.

### Via File Manager:
1. Check file properties
2. Ensure files are owned by your account (not root)

## Step 8: Test Direct File Access

### Test if files are accessible:
1. Try accessing: `https://northernbadiatours.com/index.html` directly
2. Try accessing: `https://northernbadiatours.com/favicon.ico`
3. Try accessing: `https://northernbadiatours.com/_next/static/...` (any file)

**Results:**
- ✅ If files load directly → Issue is routing/rewrite
- ❌ If files don't load → Issue is permissions or file doesn't exist

## Step 9: Check Browser Console

### Open Developer Tools:
1. Press `F12` or `Right-click` → **Inspect**
2. Go to **Console** tab
3. Look for errors
4. Go to **Network** tab
5. Check the failed request
6. Look at **Response Headers** for clues

## Step 10: Contact Hostinger Support

### What to tell them:
1. **Error**: 403 Forbidden on root domain
2. **What you've checked**:
   - File permissions (644/755)
   - index.html exists
   - .htaccess tested
   - Error logs checked
3. **Request**:
   - Check server error logs
   - Verify mod_rewrite is enabled
   - Check if .htaccess is being read
   - Verify directory index settings

### Provide them:
- Your domain: `northernbadiatours.com`
- Error message from logs
- What you see in File Manager
- Screenshot of file permissions

## Quick Diagnostic Checklist

- [ ] Checked error logs in hPanel
- [ ] Verified `index.html` exists and is readable
- [ ] Set file permissions to 644 (files) and 755 (folders)
- [ ] Tested with `.htaccess` disabled
- [ ] Verified file structure is correct
- [ ] Tested direct file access
- [ ] Checked browser console for errors
- [ ] Contacted Hostinger support if needed

## Common Error Messages & Solutions

| Error Message | Solution |
|--------------|----------|
| "Options not allowed here" | Remove `Options -Indexes` from .htaccess |
| "mod_rewrite not enabled" | Contact Hostinger to enable it |
| "Permission denied" | Fix file permissions (644/755) |
| "Directory index forbidden" | Add `DirectoryIndex index.html` |
| "File does not exist" | Verify index.html is uploaded |

## Emergency Fix: Minimal Setup

If nothing works, try this absolute minimal setup:

1. **Delete** `.htaccess` completely
2. **Verify** `index.html` exists and is 644
3. **Set** all folders to 755
4. **Test** site access

If this works, gradually add `.htaccess` rules back one at a time.

