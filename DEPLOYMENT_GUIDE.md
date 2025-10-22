# 🚀 Deployment Guide: Shopify Mockup Generator Extension

## Step 1: Prepare Your Code for GitHub

Your project is now ready! Here's what we've built:

### ✅ **What's Complete:**
- **Theme App Extension structure** with proper configuration
- **React-based mockup generator** with image upload and design instructions
- **Cloudflare Worker integration** for AI generation
- **Shopify postMessage communication** for theme integration
- **Error handling and loading states**
- **Responsive design** with Shopify Polaris components

### 📁 **Project Structure:**
```
shopify-app-image-generation/
├── extensions/
│   └── mockup-generator-block/
│       ├── shopify.extension.toml    # Extension config
│       ├── package.json              # Dependencies
│       ├── vite.config.js           # Build config
│       ├── App.jsx                  # Main component
│       └── src/App.jsx              # Mockup generator
├── shopify.app.toml                 # App configuration
├── package.json                     # Main dependencies
└── README.md                        # Documentation
```

## Step 2: Create GitHub Repository

1. **Go to GitHub**: https://github.com
2. **Create new repository**:
   - Name: `shopify-mockup-generator`
   - Description: "AI-powered product mockup generator for Shopify"
   - Make it public (for free Railway deployment)
3. **Upload your files**:
   - Upload all files from your project directory
   - Commit and push to GitHub

## Step 3: Deploy to Railway

1. **Go to Railway**: https://railway.app/
2. **Sign up** with GitHub
3. **Create new project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
4. **Railway will automatically deploy** your app
5. **Get your app URL**: Railway provides a URL like `https://your-app.railway.app`

## Step 4: Configure Shopify Partners Dashboard

1. **Go to Partners Dashboard**: https://partners.shopify.com/
2. **Create new app**:
   - Click "Create app"
   - Choose "Create app manually"
   - Name: "Mockup Generator App"
   - App URL: `https://your-app.railway.app`
3. **Set redirect URLs**:
   - `https://your-app.railway.app/auth/callback`
   - `https://your-app.railway.app/auth/shopify/callback`
4. **Copy your credentials**:
   - Client ID (API key)
   - Client secret

## Step 5: Update App Configuration

1. **Update `shopify.app.toml`**:
   ```toml
   client_id = "your-actual-client-id-here"
   application_url = "https://your-app.railway.app"
   ```

2. **Commit and push changes** to GitHub
3. **Railway will automatically redeploy**

## Step 6: Install on Development Store

1. **In Partners Dashboard**: Click "Test on development store"
2. **Choose a development store** (or create one)
3. **Install the app**
4. **The extension will be available** in your theme editor

## Step 7: Add Extension to Product Page

1. **Go to your development store admin**
2. **Navigate to Online Store → Themes**
3. **Click "Customize" on your active theme**
4. **Go to a product page**
5. **Add the "Mockup Generator" block**
6. **Save and preview**

## Step 8: Test the Extension

1. **Visit a product page** with the extension
2. **Upload an image** (logo/artwork)
3. **Write design instructions**
4. **Click "Generate Mockup"**
5. **Verify the AI generation works**
6. **Check that postMessage communication works**

## 🎯 **Key Features Implemented:**

### ✅ **User Interface:**
- Image upload with preview
- Design instructions text area
- Generate button with loading state
- Generated image display
- Error handling and user feedback

### ✅ **AI Integration:**
- Connects to Cloudflare Worker at `https://arotags-ai-mockup-generator.mmilam360.workers.dev/`
- Sends base64-encoded image and design notes
- Handles API responses and errors

### ✅ **Shopify Integration:**
- Uses `window.parent.postMessage` for communication
- Sends success messages with mockup URL
- Sends error messages for debugging
- Integrates with Shopify Polaris design system

### ✅ **Error Handling:**
- Validates image upload and design notes
- Handles API errors gracefully
- Provides user-friendly error messages
- Communicates errors to parent page

## 🔧 **Next Steps After Deployment:**

1. **Test thoroughly** with different images and instructions
2. **Customize the UI** to match your brand
3. **Add more features** like image editing or style presets
4. **Optimize performance** and loading times
5. **Add analytics** to track usage

## 🆘 **Troubleshooting:**

### **Railway Deployment Issues:**
- Check that all files are committed to GitHub
- Verify `package.json` has correct dependencies
- Check Railway logs for build errors

### **Shopify Integration Issues:**
- Verify Client ID in `shopify.app.toml`
- Check redirect URLs in Partners Dashboard
- Ensure app is installed on development store

### **Extension Not Loading:**
- Check that the extension is added to the product page
- Verify the app URL is accessible
- Check browser console for errors

### **API Errors:**
- Verify Cloudflare Worker endpoint is working
- Check network requests in browser dev tools
- Ensure image is properly encoded

## 🎉 **You're Ready to Deploy!**

Your Shopify Theme App Extension is complete and ready for deployment. The extension will:

1. **Load on product pages** with the "Custom Design" option
2. **Allow users to upload images** and write design instructions
3. **Generate AI-powered mockups** using Google Gemini
4. **Communicate results** back to the Shopify theme
5. **Enable the "Add to Cart" button** with the custom design

Follow the steps above to deploy and test your extension!

