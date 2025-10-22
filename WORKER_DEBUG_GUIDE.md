# 🔍 Debugging Cloudflare Worker Connection

The NetworkError suggests either:
1. **CORS issues** between Cloudflare Pages and your Worker
2. **Cloudflare Worker not properly configured** for Google Gemini API
3. **Missing API key** or incorrect configuration

## 🧪 **Let's Test the Connection**

I've added debugging to your React app. Try this:

1. **Open your live app**: `https://a6a3aa46.shopify-app-image-generation.pages.dev/`
2. **Open browser console** (F12 → Console tab)
3. **Upload an image and add a note**
4. **Click "Generate Mockup"**
5. **Check the console logs** - you should see detailed error information

## 🔧 **Cloudflare Worker Configuration**

Your Cloudflare Worker at `https://arotags-ai-mockup-generator.mmilam360.workers.dev/` needs to:

### **1. Handle CORS Properly**
```javascript
// Add this to your Cloudflare Worker
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  }

  // Your existing code here...
  
  // Add CORS headers to response
  const response = new Response(JSON.stringify(result), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  })
  
  return response
}
```

### **2. Connect to Google Gemini API**
```javascript
// In your Cloudflare Worker
const GEMINI_API_KEY = 'your-gemini-api-key-here'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent'

async function generateMockup(imageBase64, designNote) {
  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: `Generate a product mockup based on this image and design instructions: ${designNote}` },
          { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } }
        ]
      }]
    })
  })
  
  const result = await response.json()
  return result
}
```

## 🚨 **Common Issues:**

### **1. Missing CORS Headers**
- Cloudflare Worker must return CORS headers
- Handle OPTIONS preflight requests

### **2. Google API Key Not Set**
- Check if `GEMINI_API_KEY` is set in Worker environment variables
- Verify the API key has proper permissions

### **3. Wrong API Endpoint**
- Ensure you're using the correct Gemini API endpoint
- Check if the model name is correct (`gemini-pro-vision`)

### **4. Request Format**
- Verify the request body format matches Gemini API requirements
- Check if image is properly base64 encoded

## 🔍 **Debug Steps:**

1. **Test Worker directly**: Visit `https://arotags-ai-mockup-generator.mmilam360.workers.dev/` in browser
2. **Check Worker logs**: Go to Cloudflare Dashboard → Workers → Your Worker → Logs
3. **Test with curl**: 
   ```bash
   curl -X POST https://arotags-ai-mockup-generator.mmilam360.workers.dev/ \
     -H "Content-Type: application/json" \
     -d '{"image":"test","note":"test"}'
   ```

## 🎯 **Next Steps:**

1. **Check the browser console** for detailed error messages
2. **Verify your Cloudflare Worker** has the correct CORS headers
3. **Ensure Google API key** is properly configured
4. **Test the Worker endpoint** directly

Let me know what you see in the browser console, and I can help you fix the specific issue!
