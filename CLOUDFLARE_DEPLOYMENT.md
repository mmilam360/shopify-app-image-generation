# 🚀 Deploy to Cloudflare Pages

Perfect choice! Cloudflare Pages is excellent for Shopify Theme App Extensions. It's fast, reliable, and integrates seamlessly with your existing Cloudflare Worker.

## ✅ **Why Cloudflare Pages is Great:**

- **Fast global CDN** - Your app loads quickly worldwide
- **Free hosting** with generous limits
- **Automatic deployments** from GitHub
- **Custom domains** support
- **Integrates with Cloudflare Worker** (your AI backend)
- **Perfect for static React apps**

## 🚀 **Deployment Steps:**

### Step 1: Go to Cloudflare Pages

1. **Go to**: https://pages.cloudflare.com/
2. **Sign up/Login** with your Cloudflare account
3. **Click "Create a project"**

### Step 2: Connect GitHub Repository

1. **Click "Connect to Git"**
2. **Select GitHub** as your Git provider
3. **Choose repository**: `mmilam360/shopify-app-image-generation`
4. **Click "Begin setup"**

### Step 3: Configure Build Settings

**Framework preset**: `Vite`
**Build command**: `cd extensions/mockup-generator-block && npm run build`
**Build output directory**: `extensions/mockup-generator-block/dist`
**Root directory**: `/` (leave empty)

### Step 4: Environment Variables (Optional)

Add any environment variables you need:
- `NODE_VERSION`: `18`
- `VITE_API_URL`: `https://arotags-ai-mockup-generator.mmilam360.workers.dev/`

### Step 5: Deploy

1. **Click "Save and Deploy"**
2. **Cloudflare will build and deploy** your app
3. **Get your app URL**: `https://your-project-name.pages.dev`

## 🔧 **Configure Shopify Partners Dashboard**

1. **Go to**: https://partners.shopify.com/
2. **Create new app**:
   - Name: "Mockup Generator App"
   - App URL: `https://your-project-name.pages.dev`
3. **Set redirect URLs**:
   - `https://your-project-name.pages.dev/auth/callback`
   - `https://your-project-name.pages.dev/auth/shopify/callback`
4. **Copy Client ID and Secret**

## 📝 **Update App Configuration**

1. **Update `shopify.app.toml`**:
   ```toml
   client_id = "your-actual-client-id-here"
   application_url = "https://your-project-name.pages.dev"
   ```

2. **Commit and push changes**:
   ```bash
   git add shopify.app.toml
   git commit -m "Update app configuration for Cloudflare Pages"
   git push
   ```

3. **Cloudflare will automatically redeploy**

## 🎯 **What Happens Next:**

1. **Cloudflare builds** your React app
2. **Deploys to global CDN** for fast loading
3. **You get a public URL** for your Shopify app
4. **Install the app** on your development store
5. **Add the extension** to product pages
6. **Test the mockup generator**

## 🔗 **Integration Benefits:**

- **Same Cloudflare ecosystem** as your AI Worker
- **Fast loading** worldwide via CDN
- **Automatic deployments** on code changes
- **Free hosting** with generous limits
- **Custom domain** support if needed

## 🚀 **Your App Features:**

- ✅ **Image upload** with preview
- ✅ **Design instructions** text area
- ✅ **AI generation** via Cloudflare Worker
- ✅ **Shopify integration** via postMessage
- ✅ **Error handling** and loading states
- ✅ **Responsive design** with Polaris components

## 🆘 **Troubleshooting:**

### **Build Errors:**
- Check that all dependencies are in `package.json`
- Verify build command is correct
- Check Cloudflare Pages build logs

### **Deployment Issues:**
- Ensure GitHub repository is public
- Check that all files are committed
- Verify build output directory

### **App Not Loading:**
- Check that app URL is accessible
- Verify Shopify Partners Dashboard configuration
- Check browser console for errors

## 🎉 **Ready to Deploy!**

Your Shopify Theme App Extension is ready for Cloudflare Pages deployment. The setup is optimized for:

- **Fast global delivery**
- **Automatic deployments**
- **Integration with your Cloudflare Worker**
- **Seamless Shopify integration**

Follow the steps above to get your app live on Cloudflare Pages!

