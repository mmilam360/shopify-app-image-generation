import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import MockupGenerator from './src/App';

const App = () => {
  return (
    <AppProvider>
      <MockupGenerator />
    </AppProvider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
