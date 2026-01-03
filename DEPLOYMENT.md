# Deployment Guide for Hostinger

## Build Status
✅ Project has been successfully built for static hosting
📦 Output directory: `out/` (4.7 MB)

## Deployment Steps for Hostinger

### Option 1: Using File Manager (Easiest)

1. **Access Hostinger File Manager**
   - Log in to your Hostinger control panel (hPanel)
   - Navigate to **File Manager**
   - Go to your domain's `public_html` folder (or `www` folder)

2. **Upload Files**
   - Delete any existing files in `public_html` (backup first if needed)
   - Upload ALL contents from the `out/` folder to `public_html`
   - Make sure to upload:
     - `index.html` (main page)
     - `_next/` folder (JavaScript and CSS assets)
     - `assets/` folder (images)
     - `favicon.ico`
     - `robots.txt`
     - `sitemap.xml`
     - `manifest.webmanifest`
     - All other files

3. **Set Permissions** (if needed)
   - Files: 644
   - Folders: 755

4. **Test Your Site**
   - Visit your domain to verify everything works

### Option 2: Using FTP/SFTP

1. **Get FTP Credentials**
   - From Hostinger hPanel → **FTP Accounts**
   - Note your FTP host, username, and password

2. **Connect via FTP Client**
   - Use FileZilla, Cyberduck, or any FTP client
   - Connect to your server
   - Navigate to `public_html` folder

3. **Upload Files**
   - Upload all contents from the `out/` folder
   - Maintain folder structure

### Option 3: Using Git (If SSH Access Available)

1. **SSH into your server**
   ```bash
   ssh username@your-server-ip
   ```

2. **Navigate to public_html**
   ```bash
   cd public_html
   ```

3. **Clone or pull your repository**
   ```bash
   git clone your-repo-url .
   ```

4. **Build on server** (if Node.js is available)
   ```bash
   npm install
   npm run build
   ```

5. **Move files**
   ```bash
   cp -r out/* .
   ```

## Important Notes

### File Structure
After upload, your `public_html` should contain:
```
public_html/
├── index.html
├── Index.html (from old setup, can be removed)
├── 404.html
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── manifest.webmanifest
├── _next/          (JavaScript/CSS bundles)
├── assets/         (Images)
└── ... (other files)
```

### .htaccess Configuration (Optional but Recommended)

Create a `.htaccess` file in `public_html` with:

```apache
# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Redirect www to non-www (or vice versa - adjust as needed)
# RewriteEngine On
# RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
# RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Force HTTPS (if SSL is configured)
# RewriteEngine On
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Troubleshooting

**Issue: 404 errors on routes**
- Make sure all files from `out/` are uploaded
- Check that `_next/` folder is uploaded correctly

**Issue: Images not loading**
- Verify `assets/` folder is uploaded
- Check file paths in browser console

**Issue: Styles not loading**
- Ensure `_next/static/` folder is uploaded
- Clear browser cache

**Issue: Site shows blank page**
- Check browser console for errors
- Verify `index.html` is in the root of `public_html`
- Check file permissions

## Rebuilding After Changes

When you make changes to your site:

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Upload new files**
   - Upload updated files from `out/` folder
   - Or replace entire `public_html` contents

## Current Build Configuration

- **Framework**: Next.js 15.1.0
- **Output**: Static export (`output: 'export'`)
- **Images**: Unoptimized (for static hosting)
- **Build Size**: ~4.7 MB

## Support

If you encounter issues:
1. Check Hostinger documentation
2. Verify file permissions
3. Check browser console for errors
4. Ensure all files are uploaded correctly

