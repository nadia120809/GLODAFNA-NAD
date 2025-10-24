// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
// Pastikan nama file 'App.jsx' Anda sudah benar
import App from './App.jsx' 

// Hapus import './index.css' jika Anda tidak menggunakannya.
// File App.css kita sudah di-import di dalam App.jsx

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)