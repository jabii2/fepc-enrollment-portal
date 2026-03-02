# CSS Overhaul & Caching Guide - FEPC Enrollment Portal

## Overview
This document provides a complete guide to the CSS overhaul, configuration changes, and caching solutions for the FEPC Enrollment Portal.

---

## What Changed

### 1. **Configuration Files (NEW)**
- ✅ **`tailwind.config.js`** - Custom theme configuration with school colors
- ✅ **`postcss.config.js`** - PostCSS plugin configuration for Tailwind processing

### 2. **CSS Files (UPDATED)**
- ✅ **`src/index.css`** - Tailwind output (auto-generated)
- ✅ **`src/styles/custom.css`** - Simplified, removed `!important` overrides
- ✅ **`src/styles/globals.css`** - Kept as-is (shadcn compatibility)

### 3. **Components (UPDATED)**
- ✅ **`src/components/layout/Header.jsx`** - Modern styling with primary color scheme
- ✅ **`src/components/views/HomePage.jsx`** - Hero section with feature cards
- ✅ **`src/components/EnrollmentForm.jsx`** - Enhanced form styling & progress indicator

---

## Color Palette Reference

### Primary Colors (School Brand)
```
Primary Blue:
- primary-50: #f0f7ff (Light background)
- primary-500: #0ea5e9 (Main brand color)
- primary-600: #0284c7
- primary-700: #0369a1 (Dark variant)

Secondary Purple:
- secondary-500: #a855f7 (Accent)
- secondary-600: #9333ea
```

### Usage in Tailwind
```jsx
// Background
className="bg-primary-50"

// Text
className="text-primary-700"

// Borders
className="border-primary-200"

// Gradients
className="bg-gradient-to-r from-primary-500 to-primary-600"
```

---

## Clearing Caches

### **Option 1: Hard Refresh (Quickest)**
1. **In Browser (All Platforms):**
   - **Chrome/Edge/Brave:** Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - **Firefox:** Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - **Safari:** Cmd+Option+E (requires enabling dev tools first)
   - Or manually clear from Settings → Privacy & Security → Clear Browsing Data

2. **Vite Dev Server (Recommended):**
   - Press `Ctrl+C` to stop the dev server
   - Delete the `.vite` cache folder (if it exists)
   - Restart: `npm run dev`

### **Option 2: Developer Tools Hard Refresh**
1. Open DevTools (`F12` or `Ctrl+Shift+I`)
2. Right-click the refresh button in the browser bar
3. Select **"Empty cache and hard refresh"**

### **Option 3: Complete Cache Clear**

```bash
# Windows
del /s /q node_modules\.vite
rmdir /s /q dist

# macOS/Linux
rm -rf node_modules/.vite
rm -rf dist
```

Then restart:
```bash
npm run dev
```

---

## Vite Configuration for Cache Busting

Your **`vite.config.js`** doesn't need changes, but here's what happens automatically:

- ✅ Vite automatically invalidates build cache when config changes
- ✅ CSS files are hash-busted in production builds
- ✅ Dev server hot-reloads CSS changes automatically

### If Still Having Issues:

Edit `vite.config.js` and add explicit cache control:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,  // Enable Hot Module Replacement
    middlewareMode: false,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,  // Let Vite handle chunks
      },
    },
    // Cache invalidation
    emptyOutDir: true,
  },
  // ... rest of config
});
```

---

## Browser-Specific Cache Clearing

### **Chrome/Brave/Edge**
```bash
# Windows - Delete Vite cache
%LOCALAPPDATA%\path\to\project\node_modules\.vite

# macOS
~/Library/Caches/path-to-project/.vite

# Linux
~/.cache/path-to-project/.vite
```

### **Firefox**
- Clear via `Ctrl+Shift+Delete` → "All time" → Clear Now

### **Safari**
- Develop → Empty Web Caches
- (Must enable Develop menu: Preferences → Advanced → "Show Develop menu")

---

## Production Build Cache Busting

### **Build for Production:**
```bash
npm run build
```

This creates versioned files in `dist/`:
- `assets/index-abc123.js`
- `assets/index-def456.css`

### **Deploy with Cache Headers:**

If using a server, set these headers:

```
# .htaccess (Apache)
<FilesMatch "\.js$|\.css$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>

<FilesMatch "index.html">
  Header set Cache-Control "public, max-age=0, must-revalidate"
</FilesMatch>
```

```nginx
# nginx.conf
location ~* \.(js|css)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

location ~* \.html$ {
  expires -1;
  add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

---

## Troubleshooting CSS Issues

### **Styles Still Not Appearing?**

1. ✅ **Check Dev Tools Console** (`F12`)
   - Look for CSS errors or warnings
   - Verify Tailwind classes are being loaded

2. ✅ **Verify CSS Import Chain:**
   ```
   main.jsx → index.css (Tailwind)
              → globals.css (theme variables)
              → custom.css (optional overrides)
   ```

3. ✅ **Check Specificity:**
   - Tailwind utilities should prevail
   - Remove any conflicting `!important` rules
   - Use `@layer` directive if adding custom styles

4. ✅ **Restart Dev Server:**
   ```bash
   npm run dev
   ```

5. ✅ **Check for Typos:**
   - Verify Tailwind class names are correct
   - Use `className` (not `class`) in JSX

### **Colors Not Showing?**

Verify in DevTools that these CSS variables are defined:
```css
--color-primary: var(--primary);
--color-secondary: var(--secondary);
```

Or ensure Tailwind config colors are applied:
```javascript
// tailwind.config.js should have:
colors: {
  primary: { ... },
  secondary: { ... }
}
```

---

## CSS Class Naming Convention

Going forward, follow these patterns:

### **Spacing & Layout**
```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
```

### **Colors**
```jsx
<div className="bg-primary-50 text-primary-900 border-primary-200">
<div className="bg-secondary-100 hover:bg-secondary-200">
```

### **Cards**
```jsx
<div className="rounded-xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow p-6">
```

### **Buttons**
```jsx
<button className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
```

### **Responsive**
```jsx
<div className="text-sm sm:text-base lg:text-lg flex flex-col sm:flex-row">
```

---

## Quick Reference: Before vs After

### **Before (Old CSS)**
```jsx
<div className="bg-blue-50 border border-blue-200 p-4">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
</div>
```

### **After (Modern Tailwind + Config)**
```jsx
<div className="bg-primary-50 border border-primary-200 rounded-lg shadow-sm p-6">
  <h1 className="text-3xl font-bold text-gray-900 mb-2">Title</h1>
</div>
```

---

## Files Summary

| File | Purpose | Status |
|------|---------|--------|
| `tailwind.config.js` | Custom theme + colors | ✅ NEW |
| `postcss.config.js` | PostCSS plugins | ✅ NEW |
| `src/index.css` | Tailwind output | ✅ CLEAN |
| `src/styles/custom.css` | Custom utilities | ✅ LEAN |
| `src/styles/globals.css` | Theme variables | ⚠️ KEPT |
| Vite config | Build settings | ✅ NO CHANGE NEEDED |

---

## Next Steps

1. ✅ **Clear browser cache** (use Option 1 above)
2. ✅ **Restart dev server** (`npm run dev`)
3. ✅ **Test in incognito/private window** to avoid cache
4. ✅ **Check mobile view** (`F12` → Toggle device toolbar)
5. ✅ **Verify colors** match your school branding

---

## Support Notes

- **Tailwind v4 supports zero-config**, but custom config is recommended for brand colors
- **PostCSS config** ensures proper CSS processing
- **No `!important` usage** in new CSS - Tailwind utilities should take precedence
- **Component-based approach** - Update components incrementally

---

## Quick Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Clear caches and restart
rm -rf node_modules/.vite dist
npm run dev

# Check for CSS errors
npm run dev -- --debug
```

---

Last Updated: 2026-03-02
Portal Version: 0.1.0
