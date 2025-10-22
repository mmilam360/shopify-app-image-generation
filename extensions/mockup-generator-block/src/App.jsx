import React, { useState, useRef } from 'react';
import { Button, Card, TextField, Stack, Banner, Spinner, Image } from '@shopify/polaris';

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

      // Call the Cloudflare Worker
      const response = await fetch('https://arotags-ai-mockup-generator.mmilam360.workers.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
          note: designNote,
          // Add reference image if needed
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
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
      setError(err.message || 'Failed to generate mockup. Please try again.');
      
      // Send error message to parent Shopify page
      window.parent.postMessage({
        type: 'MOCKUP_ERROR',
        error: err.message || 'Failed to generate mockup'
      }, '*');
    } finally {
      setIsGenerating(false);
    }
  };

  const isGenerateDisabled = !imageFile || !designNote.trim() || isGenerating;

  return (
    <Card>
      <Stack vertical spacing="loose">
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
      </Stack>
    </Card>
  );
};

export default MockupGenerator;
