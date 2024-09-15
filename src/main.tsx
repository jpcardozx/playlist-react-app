import React from 'react';
import ReactDOM from 'react-dom/client';  // Import createRoot from react-dom/client
import App from './App';
import './index.css';  // Or './app.css' based on your setup

// Get the root element from the HTML file (index.html)
const rootElement = document.getElementById('root') as HTMLElement;

// Create the root with createRoot and render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
