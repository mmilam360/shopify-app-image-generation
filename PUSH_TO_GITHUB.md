# 🚀 Exact Commands to Push to GitHub

Your code is ready! Here are the exact commands to run:

## Step 1: Create GitHub Repository

1. **Go to**: https://github.com/new
2. **Repository name**: `shopify-mockup-generator`
3. **Description**: `AI-powered product mockup generator Shopify Theme App Extension`
4. **Make it Public** ✅
5. **Don't check** "Add a README file" ❌
6. **Click "Create repository"**

## Step 2: Run These Commands

After creating the repository, run these commands in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/shopify-mockup-generator.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## Step 3: If You Get Authentication Error

If you get an authentication error, you have two options:

### Option A: Use GitHub CLI (Recommended)
```bash
# Install GitHub CLI if you don't have it
# Then authenticate
gh auth login

# Push to GitHub
git push -u origin main
```

### Option B: Use Personal Access Token
1. **Go to**: https://github.com/settings/tokens
2. **Generate new token** with repo permissions
3. **Use token as password** when prompted

## Step 4: Verify Upload

1. **Go to your repository**: https://github.com/YOUR_USERNAME/shopify-mockup-generator
2. **Check that these files are there**:
   - `extensions/mockup-generator-block/` folder
   - `package.json` files
   - `shopify.app.toml`
   - All documentation files

## Step 5: Deploy to Railway

1. **Go to**: https://railway.app/
2. **Sign up** with GitHub
3. **Create new project** → "Deploy from GitHub repo"
4. **Select**: `shopify-mockup-generator`
5. **Railway will deploy automatically**
6. **Get your app URL**: `https://your-app.railway.app`

## Step 6: Configure Shopify Partners Dashboard

1. **Go to**: https://partners.shopify.com/
2. **Create new app**:
   - Name: "Mockup Generator App"
   - App URL: `https://your-app.railway.app`
3. **Set redirect URLs**:
   - `https://your-app.railway.app/auth/callback`
   - `https://your-app.railway.app/auth/shopify/callback`
4. **Copy Client ID and Secret**

## Step 7: Update Configuration

1. **Update `shopify.app.toml`**:
   ```toml
   client_id = "your-actual-client-id-here"
   application_url = "https://your-app.railway.app"
   ```

2. **Commit and push**:
   ```bash
   git add shopify.app.toml
   git commit -m "Update app configuration"
   git push
   ```

## 🎯 **What Happens Next:**

1. **Railway deploys** your app automatically
2. **You get a public URL** for your Shopify app
3. **Install the app** on your development store
4. **Add the extension** to product pages
5. **Test the mockup generator** with real images

## 🚀 **Your App Features:**

- ✅ **Image upload** with preview
- ✅ **Design instructions** text area
- ✅ **AI generation** via Cloudflare Worker
- ✅ **Shopify integration** via postMessage
- ✅ **Error handling** and loading states
- ✅ **Responsive design** with Polaris components

**Ready to push to GitHub!** Follow the steps above to get your app live.

