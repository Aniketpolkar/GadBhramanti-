import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import './index.css'
import App from './App.jsx'
// main.jsx or App.jsx
import '@fontsource/tiro-devanagari-marathi'; // headers
import '@fontsource/anek-devanagari'; // body

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
