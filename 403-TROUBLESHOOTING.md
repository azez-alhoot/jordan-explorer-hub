# 403 Forbidden Error - Troubleshooting Guide

## Quick Fixes

### 1. **Simplified .htaccess** (Most Common Fix)
The `.htaccess` file has been simplified. Try uploading the new version.

### 2. **Check File Permissions**
In Hostinger File Manager:
- **Files**: Set permissions to `644`
- **Folders**: Set permissions to `755`
- **index.html**: Must be `644` and readable

### 3. **Verify index.html Exists**
Make sure `index.html` exists in your `public_html` root directory.

### 4. **Temporary .htaccess Fix**
If the error persists, try this minimal `.htaccess`:

```apache
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
DirectoryIndex index.html
```

### 5. **Disable .htaccess Temporarily**
To test if `.htaccess` is the issue:
1. Rename `.htaccess` to `.htaccess.backup`
2. Check if site loads
3. If it loads, the issue is in `.htaccess`
4. Add rules back one by one

### 6. **Check Hostinger Settings**
In Hostinger hPanel:
- Go to **File Manager**
- Check if **Directory Index** is set correctly
- Verify **PHP Version** (if applicable)
- Check **Error Logs** for specific errors

### 7. **Verify File Structure**
Your `public_html` should have:
```
public_html/
├── index.html          ← Must exist!
├── .htaccess
├── _next/
│   └── static/
├── assets/
└── ... (other files)
```

### 8. **Check Error Logs**
In Hostinger:
1. Go to **Advanced** → **Error Log**
2. Look for specific error messages
3. Common errors:
   - "Options not allowed here" → Remove `Options -Indexes`
   - "RewriteEngine not allowed" → Contact Hostinger support
   - "mod_headers not available" → Remove Header directives

### 9. **Contact Hostinger Support**
If nothing works:
- Ask if `mod_rewrite` is enabled
- Ask if `.htaccess` files are allowed
- Request error log details
- Ask about server configuration

## Step-by-Step Resolution

1. **Upload minimal .htaccess** (see option 4 above)
2. **Set correct permissions** (644 for files, 755 for folders)
3. **Verify index.html exists** and is readable
4. **Check Hostinger error logs**
5. **Contact support** if issue persists

## Common Causes

- ❌ `.htaccess` syntax errors
- ❌ Missing `index.html` file
- ❌ Incorrect file permissions
- ❌ Apache modules not enabled (mod_rewrite, mod_headers)
- ❌ Server configuration restrictions
- ❌ Directory index disabled

