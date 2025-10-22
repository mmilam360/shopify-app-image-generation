# 🎨 Shopify Mockup Generator Theme App Extension

A Shopify Theme App Extension that provides an AI-powered product mockup generator for custom designs. This extension integrates with Google's Gemini AI via a Cloudflare Worker to generate custom product mockups based on user-uploaded images and design instructions.

## 🏗️ Project Structure

```
shopify-app-image-generation/
├── extensions/
│   └── mockup-generator-block/
│       ├── shopify.extension.toml    # Extension configuration
│       ├── package.json             # Extension dependencies
│       ├── vite.config.js           # Vite build configuration
│       ├── App.jsx                 # Main React component
│       └── src/
│           └── App.jsx             # Mockup generator component
├── shopify.app.toml                # Shopify app configuration
├── package.json                    # Main project dependencies
└── README.md                       # This file
```

## 🚀 Features

- **Image Upload**: Users can upload their logo or artwork
- **Design Instructions**: Text area for design requirements
- **AI Generation**: Integrates with Google Gemini AI via Cloudflare Worker
- **Real-time Communication**: Uses `window.parent.postMessage` to communicate with Shopify theme
- **Error Handling**: Comprehensive error handling and user feedback
- **Responsive Design**: Built with Shopify Polaris components

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Shopify App

1. **Go to Shopify Partners Dashboard**: https://partners.shopify.com/
2. **Create a new app**:
   - Click "Create app"
   - Choose "Create app manually"
   - Name: "Mockup Generator App"
   - App URL: We'll set this after deployment

3. **Get your credentials**:
   - Copy the Client ID (API key)
   - Copy the Client secret

4. **Update `shopify.app.toml`**:
   ```toml
   client_id = "your-actual-client-id-here"
   ```

### 3. Deploy to Railway (Recommended)

1. **Create GitHub repository**:
   - Go to https://github.com
   - Create a new repository
   - Upload all project files

2. **Deploy to Railway**:
   - Go to https://railway.app/
   - Sign up with GitHub
   - Create new project from GitHub repo
   - Railway will automatically deploy

3. **Get your app URL**:
   - Railway provides a URL like `https://your-app.railway.app`
   - Update `shopify.app.toml` with this URL

### 4. Configure Shopify Partners Dashboard

1. **Set App URL**: `https://your-app.railway.app`
2. **Set Redirect URLs**:
   - `https://your-app.railway.app/auth/callback`
   - `https://your-app.railway.app/auth/shopify/callback`

### 5. Install on Development Store

1. **In Partners Dashboard**: Click "Test on development store"
2. **Choose a development store**
3. **Install the app**

## 🎯 How It Works

### User Experience Flow

1. **Customer visits product page** with "Custom Design" option
2. **Extension loads** and displays the mockup generator interface
3. **User uploads image** (logo/artwork)
4. **User writes design instructions** in the text area
5. **User clicks "Generate Mockup"** button
6. **App shows loading state** while processing
7. **AI generates mockup** using Google Gemini
8. **Generated image displays** to the user
9. **App communicates result** to parent Shopify page via `postMessage`

### Technical Architecture

- **Frontend**: React with Shopify Polaris components
- **AI Backend**: Cloudflare Worker at `https://arotags-ai-mockup-generator.mmilam360.workers.dev/`
- **Communication**: `window.parent.postMessage` for Shopify integration
- **Image Processing**: Base64 encoding for API transmission

### API Communication

The extension sends data to the Cloudflare Worker:

```javascript
{
  image: "base64-encoded-image",
  note: "user design instructions",
  // Additional parameters as needed
}
```

The worker responds with:

```javascript
{
  success: true,
  mockupUrl: "https://generated-image-url.com/image.jpg"
}
```

### Shopify Integration

The extension communicates with the parent Shopify page:

**Success Message**:
```javascript
window.parent.postMessage({
  type: 'MOCKUP_GENERATED',
  mockupUrl: 'https://generated-image-url.com/image.jpg'
}, '*');
```

**Error Message**:
```javascript
window.parent.postMessage({
  type: 'MOCKUP_ERROR',
  error: 'Error message here'
}, '*');
```

## 🛠️ Development

### Local Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Shopify
npm run deploy
```

### Testing

1. **Install on development store**
2. **Add extension to product page**
3. **Test image upload and generation**
4. **Verify postMessage communication**

## 📱 Extension Configuration

The extension can be configured through Shopify's theme editor:

- **Title**: Customizable title for the generator
- **Button Text**: Text for the generate button
- **Placeholder Text**: Instructions placeholder text
- **Description**: Help text for users

## 🔗 Integration with Shopify Theme

To integrate this extension with your Shopify theme:

1. **Add the extension** to your product page
2. **Listen for postMessage events**:

```javascript
window.addEventListener('message', function(event) {
  if (event.data.type === 'MOCKUP_GENERATED') {
    // Enable "Add to Cart" button
    // Save mockup URL to order
    console.log('Mockup generated:', event.data.mockupUrl);
  } else if (event.data.type === 'MOCKUP_ERROR') {
    // Handle error
    console.error('Mockup generation failed:', event.data.error);
  }
});
```

## 🚀 Deployment Checklist

- [ ] Dependencies installed
- [ ] Shopify app created in Partners Dashboard
- [ ] App deployed to Railway/Heroku/Vercel
- [ ] App URL configured in Partners Dashboard
- [ ] Extension installed on development store
- [ ] Cloudflare Worker API endpoint working
- [ ] postMessage communication tested
- [ ] Error handling verified

## 🆘 Troubleshooting

### Common Issues

1. **"No app found"**: Check Client ID in `shopify.app.toml`
2. **"Invalid redirect URL"**: Verify URLs in Partners Dashboard
3. **"Extension not loading"**: Check deployment and app URL
4. **"API errors"**: Verify Cloudflare Worker endpoint
5. **"postMessage not working"**: Check parent page event listeners

### Getting Help

- [Shopify Theme App Extensions Documentation](https://shopify.dev/docs/apps/online-store/theme-app-extensions)
- [Shopify Polaris Components](https://polaris.shopify.com/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

## 📄 License

MIT License - feel free to use and modify as needed.