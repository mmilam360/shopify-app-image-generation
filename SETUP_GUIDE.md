# 🚀 Shopify App Setup Guide

Congratulations! Your Shopify Image Generation App is now set up and running locally. Here's what we've accomplished and what you need to do next:

## ✅ What's Already Done

1. **Shopify CLI Installed** - You're authenticated with your Partners account
2. **App Structure Created** - All necessary files are in place
3. **Dependencies Installed** - All required packages are installed
4. **Server Running** - Your app is running on `http://localhost:3000`

## 🔧 Next Steps: Connect to Shopify Partners Dashboard

### Step 1: Create Your App in Partners Dashboard

1. Go to [partners.shopify.com](https://partners.shopify.com/)
2. Click **"Apps"** in the left sidebar
3. Click **"Create app"**
4. Choose **"Create app manually"**
5. Fill in the details:
   - **App name**: "Image Generation App" (or your preferred name)
   - **App URL**: We'll set this up with ngrok in the next step

### Step 2: Set Up ngrok for Local Development

Since Shopify needs to access your local app from the internet, we need to use ngrok:

1. **Install ngrok** (if not already installed):
   ```bash
   npm install -g ngrok
   ```

2. **Start ngrok** in a new terminal window:
   ```bash
   ngrok http 3000
   ```

3. **Copy the ngrok URL** (it will look like `https://abc123.ngrok.io`)

### Step 3: Configure Your App in Partners Dashboard

1. Go back to your app in the Partners Dashboard
2. In the **"App setup"** section, set:
   - **App URL**: `https://your-ngrok-url.ngrok.io`
   - **Allowed redirection URLs**: 
     - `https://your-ngrok-url.ngrok.io/api/auth/callback`
     - `https://your-ngrok-url.ngrok.io/auth/shopify/callback`

3. **Copy your credentials**:
   - **Client ID** (API key)
   - **Client secret** (API secret key)

### Step 4: Update Your Environment Variables

1. Create a `.env` file in your project root:
   ```bash
   # Copy from env.example and fill in your actual values
   SHOPIFY_API_KEY=your_actual_client_id_here
   SHOPIFY_API_SECRET=your_actual_client_secret_here
   SHOPIFY_APP_URL=https://your-ngrok-url.ngrok.io
   SCOPES=write_products,read_products
   SESSION_SECRET=your_random_session_secret_here
   ```

2. **Restart your server**:
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart:
   node server.js
   ```

### Step 5: Test Your App

1. **Install the app on a development store**:
   - In Partners Dashboard, go to **"Test on development store"**
   - Choose a development store or create one
   - Click **"Install app"**

2. **Verify the installation**:
   - Your app should open in the Shopify admin
   - You should see the "Image Generation App" interface

## 🎯 Current App Features

Your app currently has:
- ✅ **Home page** with app information
- ✅ **Admin panel** for app management
- ✅ **Health check endpoint** for monitoring
- ✅ **Shopify authentication** setup
- ✅ **Basic UI** with modern styling

## 🔮 Next Development Steps

Once your app is connected to Shopify, you can:

1. **Add image generation functionality**
2. **Create product integration features**
3. **Build bulk processing capabilities**
4. **Add custom styling options**

## 🆘 Troubleshooting

### Common Issues:

1. **"Cannot connect to server"**
   - Make sure ngrok is running
   - Check that your server is running on port 3000
   - Verify the ngrok URL in your Partners Dashboard

2. **"Invalid redirect URL"**
   - Double-check the redirect URLs in Partners Dashboard
   - Make sure they match your ngrok URL exactly

3. **"Missing API credentials"**
   - Verify your `.env` file has the correct API key and secret
   - Restart your server after updating `.env`

### Getting Help:

- Check the [Shopify App Development Documentation](https://shopify.dev/docs/apps)
- Visit the [Shopify Community Forums](https://community.shopify.com/)
- Review the [Shopify CLI Documentation](https://shopify.dev/docs/apps/tools/cli)

## 📞 Support

If you run into any issues, the most common problems are:
1. ngrok URL not matching Partners Dashboard settings
2. Missing or incorrect API credentials
3. Server not running or on wrong port

Your app is ready to go! The next step is connecting it to the Shopify Partners Dashboard and testing it with a development store.
