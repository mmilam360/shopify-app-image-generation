import React from 'react';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import MockupGenerator from './src/App';

function App() {
  return (
    <AppProvider>
      <MockupGenerator />
    </AppProvider>
  );
}

export default App;
