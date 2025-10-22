# 🔧 Fix Cloudflare Pages Deployment

The 404 error is because Cloudflare Pages needs the correct build configuration. Here's how to fix it:

## ✅ **Updated Build Settings for Cloudflare Pages:**

1. **Go to your Cloudflare Pages project**
2. **Click "Settings" → "Builds & deployments"**
3. **Update these settings**:

### **Build Configuration:**
- **Framework preset**: `Vite`
- **Build command**: `cd extensions/mockup-generator-block && npm run build`
- **Build output directory**: `dist` (not `extensions/mockup-generator-block/dist`)
- **Root directory**: `/` (leave empty)

### **Environment Variables:**
- `NODE_VERSION`: `18`

## 🚀 **Alternative: Use Root Directory Build**

If the above doesn't work, try this configuration:

### **Build Configuration:**
- **Framework preset**: `Vite`
- **Build command**: `npm run pages:build`
- **Build output directory**: `dist`
- **Root directory**: `/`

## 📁 **What's Fixed:**

1. **Build Output**: Now outputs to `dist/` in the root directory
2. **HTML Entry Point**: Created proper `index.html` with React mounting
3. **Main Entry**: Created `main.jsx` that renders the React app
4. **Vite Config**: Updated to build to root `dist/` directory

## 🔄 **Redeploy:**

1. **Update the build settings** in Cloudflare Pages
2. **Click "Retry deployment"** or push a new commit
3. **The app should now load properly**

## 🎯 **Expected Result:**

After the fix, your app should load at:
`https://a6a3aa46.shopify-app-image-generation.pages.dev/`

And show the mockup generator interface with:
- Image upload functionality
- Design instructions text area
- Generate button
- Integration with your Cloudflare Worker

## 🆘 **If Still Not Working:**

Try this alternative approach:

1. **Create a simple redirect** in the root directory
2. **Or use a different build output directory**
3. **Check the Cloudflare Pages build logs** for errors

The key issue was that Cloudflare Pages was looking for files in the root directory, but our build was outputting to a subdirectory. Now it builds directly to `dist/` in the root.
