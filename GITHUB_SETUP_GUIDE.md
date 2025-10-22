# 🚀 GitHub Repository Setup Guide

Your code is ready to push to GitHub! Follow these steps:

## Step 1: Create GitHub Repository

1. **Go to GitHub**: https://github.com
2. **Click "New repository"** (green button)
3. **Fill in the details**:
   - **Repository name**: `shopify-mockup-generator`
   - **Description**: `AI-powered product mockup generator Shopify Theme App Extension`
   - **Make it Public** (required for free Railway deployment)
   - **Don't initialize** with README, .gitignore, or license (we already have these)
4. **Click "Create repository"**

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/shopify-mockup-generator.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 3: Verify Upload

1. **Go to your GitHub repository**
2. **Check that all files are there**:
   - `extensions/mockup-generator-block/` folder
   - `package.json` files
   - `shopify.app.toml`
   - All documentation files
   - `.gitignore`

## Step 4: Deploy to Railway

Now that your code is on GitHub:

1. **Go to Railway**: https://railway.app/
2. **Sign up** with GitHub
3. **Create new project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `shopify-mockup-generator`
4. **Railway will automatically deploy** your app
5. **Get your app URL**: Railway provides a URL like `https://your-app.railway.app`

## Step 5: Configure Shopify Partners Dashboard

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

## Step 6: Update App Configuration

1. **Update `shopify.app.toml`** with your real Client ID:
   ```toml
   client_id = "your-actual-client-id-here"
   application_url = "https://your-app.railway.app"
   ```

2. **Commit and push changes**:
   ```bash
   git add shopify.app.toml
   git commit -m "Update app configuration with real credentials"
   git push
   ```

3. **Railway will automatically redeploy**

## Step 7: Install on Development Store

1. **In Partners Dashboard**: Click "Test on development store"
2. **Choose a development store** (or create one)
3. **Install the app**
4. **The extension will be available** in your theme editor

## 🎯 **What You're Deploying:**

### ✅ **Complete Theme App Extension:**
- **React-based mockup generator** with image upload
- **Design instructions** text area
- **AI integration** with Cloudflare Worker
- **Shopify postMessage communication**
- **Error handling and loading states**
- **Responsive design** with Shopify Polaris

### ✅ **Key Features:**
- Image upload with preview
- Generate button with loading state
- Generated image display
- Communication with parent Shopify page
- Error handling and user feedback

### ✅ **Technical Integration:**
- Connects to `https://arotags-ai-mockup-generator.mmilam360.workers.dev/`
- Uses `window.parent.postMessage` for Shopify communication
- Sends success/error messages to parent page
- Enables "Add to Cart" functionality with custom designs

## 🚀 **Ready to Deploy!**

Your Shopify Theme App Extension is complete and ready for deployment. Once you push to GitHub and deploy to Railway, you'll have:

1. **A working Shopify app** accessible via Railway URL
2. **A Theme App Extension** that can be added to product pages
3. **AI-powered mockup generation** using your Cloudflare Worker
4. **Complete integration** with Shopify themes via postMessage

Follow the steps above to get your app live and working!

