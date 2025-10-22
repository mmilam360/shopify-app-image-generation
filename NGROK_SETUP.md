# 🔗 Manual ngrok Setup Guide

Since Windows Defender is blocking the automated ngrok installation, here's how to set it up manually:

## Step 1: Download ngrok Manually

1. **Go to ngrok website**: https://ngrok.com/download
2. **Download the Windows version**: Click "Download for Windows"
3. **Extract the file**: You'll get `ngrok.exe`

## Step 2: Add ngrok to Windows Defender Exclusions

1. **Open Windows Security**:
   - Press `Windows + I` to open Settings
   - Go to "Update & Security" → "Windows Security"
   - Click "Virus & threat protection"

2. **Add exclusion**:
   - Click "Manage settings" under "Virus & threat protection settings"
   - Click "Add or remove exclusions"
   - Click "Add an exclusion" → "File"
   - Navigate to where you saved `ngrok.exe` and select it

## Step 3: Create ngrok Account (Free)

1. **Sign up**: Go to https://dashboard.ngrok.com/signup
2. **Get your authtoken**: After signing up, go to https://dashboard.ngrok.com/get-started/your-authtoken
3. **Copy your authtoken** (you'll need this in the next step)

## Step 4: Configure ngrok

1. **Open Command Prompt as Administrator**
2. **Navigate to where you saved ngrok.exe**
3. **Authenticate ngrok**:
   ```cmd
   ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
   ```

## Step 5: Start ngrok Tunnel

1. **In a new Command Prompt window**, navigate to your ngrok.exe location
2. **Start the tunnel**:
   ```cmd
   ngrok http 3000
   ```

3. **Copy the HTTPS URL**: You'll see something like:
   ```
   Forwarding    https://abc123.ngrok.io -> http://localhost:3000
   ```

## Step 6: Update Your App Configuration

1. **Copy the ngrok URL** (e.g., `https://abc123.ngrok.io`)
2. **Update your environment variables**:
   - Create a `.env` file in your project root
   - Add: `SHOPIFY_APP_URL=https://abc123.ngrok.io`

## Step 7: Configure Shopify Partners Dashboard

1. **Go to**: https://partners.shopify.com/
2. **Create a new app** (if you haven't already)
3. **Set these URLs**:
   - **App URL**: `https://abc123.ngrok.io`
   - **Allowed redirection URLs**:
     - `https://abc123.ngrok.io/api/auth/callback`
     - `https://abc123.ngrok.io/auth/shopify/callback`

## Alternative: Use Shopify CLI Tunnel

If ngrok continues to be problematic, you can also try:

```bash
shopify app dev --tunnel-url https://your-custom-tunnel-url.com
```

## Quick Test

Once ngrok is running, test your app:
1. **Visit**: `https://your-ngrok-url.ngrok.io`
2. **You should see**: Your Image Generation App homepage
3. **Test health**: `https://your-ngrok-url.ngrok.io/health`

## Troubleshooting

- **"ngrok not found"**: Make sure you're in the directory with ngrok.exe
- **"Tunnel not working"**: Check that your server is running on port 3000
- **"Invalid URL"**: Make sure you're using the HTTPS URL, not HTTP

Your server is currently running on `http://localhost:3000` - once you get ngrok working, you'll have a public URL to use with Shopify!
