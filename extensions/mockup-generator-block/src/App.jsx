import React, { useState, useRef } from 'react';
import { Button, Card, TextField, Banner, Spinner, Image, BlockStack } from '@shopify/polaris';

const MockupGenerator = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [designNote, setDesignNote] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleGenerateMockup = async () => {
    if (!imageFile || !designNote.trim()) {
      setError('Please upload an image and provide design instructions.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Convert image to base64
      const base64Image = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(imageFile);
      });

      console.log('Sending request to Cloudflare Worker...');
      console.log('Image size:', base64Image.length);
      console.log('Design note:', designNote);

      // Call the Cloudflare Worker with proper headers
      const response = await fetch('https://arotags-ai-mockup-generator.mmilam360.workers.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({
          image: base64Image,
          note: designNote,
          // Add reference image if needed
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log('Response result:', result);
      
      if (result.success && result.mockupUrl) {
        setGeneratedImage(result.mockupUrl);
        
        // Send success message to parent Shopify page
        window.parent.postMessage({
          type: 'MOCKUP_GENERATED',
          mockupUrl: result.mockupUrl
        }, '*');
      } else {
        throw new Error(result.error || 'Failed to generate mockup');
      }
    } catch (err) {
      console.error('Error generating mockup:', err);
      setError(`Error: ${err.message}. Please check the browser console for more details.`);
      
      // Send error message to parent Shopify page
      window.parent.postMessage({
        type: 'MOCKUP_ERROR',
        error: err.message || 'Failed to generate mockup'
      }, '*');
    } finally {
      setIsGenerating(false);
    }
  };

  const testConnection = async () => {
    try {
      console.log('Testing connection to Cloudflare Worker...');
      const response = await fetch('https://arotags-ai-mockup-generator.mmilam360.workers.dev/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Test response status:', response.status);
      const text = await response.text();
      console.log('Test response text:', text);
      
      if (response.ok) {
        setError('✅ Connection test successful! Worker is accessible.');
      } else {
        setError(`❌ Connection test failed: ${response.status} - ${text}`);
      }
    } catch (err) {
      console.error('Connection test error:', err);
      setError(`❌ Connection test failed: ${err.message}`);
    }
  };

  const isGenerateDisabled = !imageFile || !designNote.trim() || isGenerating;

  return (
    <Card>
      <BlockStack gap="400">
        <div>
          <h2>Create Your Custom Design</h2>
          <p>Upload your logo and describe your design ideas to generate a custom mockup.</p>
        </div>

        {error && (
          <Banner status="critical">
            <p>{error}</p>
          </Banner>
        )}

        {/* Image Upload Section */}
        <div>
          <h3>Upload Your Logo/Artwork</h3>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <Button onClick={() => fileInputRef.current?.click()}>
            {imageFile ? 'Change Image' : 'Upload Image'}
          </Button>
          {imagePreview && (
            <div style={{ marginTop: '10px' }}>
              <Image
                source={imagePreview}
                alt="Uploaded image"
                width={200}
                height={200}
              />
            </div>
          )}
        </div>

        {/* Design Instructions */}
        <div>
          <TextField
            label="Design Instructions"
            value={designNote}
            onChange={setDesignNote}
            placeholder="Describe your design ideas, colors, or any specific requirements..."
            multiline={4}
          />
        </div>

        {/* Test Connection Button */}
        <Button
          onClick={testConnection}
          disabled={isGenerating}
        >
          Test Connection to Worker
        </Button>

        {/* Generate Button */}
        <Button
          primary
          onClick={handleGenerateMockup}
          disabled={isGenerateDisabled}
          loading={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Mockup'}
        </Button>

        {/* Generated Image Display */}
        {generatedImage && (
          <div>
            <h3>Your Custom Mockup</h3>
            <Image
              source={generatedImage}
              alt="Generated mockup"
              width={400}
              height={400}
            />
            <div style={{ marginTop: '10px' }}>
              <Button
                onClick={() => {
                  // Send the mockup URL to parent page
                  window.parent.postMessage({
                    type: 'MOCKUP_GENERATED',
                    mockupUrl: generatedImage
                  }, '*');
                }}
              >
                Use This Design
              </Button>
            </div>
          </div>
        )}
      </BlockStack>
    </Card>
  );
};

export default MockupGenerator;

