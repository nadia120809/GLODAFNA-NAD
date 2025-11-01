import React from 'react';
// 1. Import GradualBlur dari react-bits
import { GradualBlur } from 'react-bits';
// 2. Import CSS yang sudah kita buat
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Ini adalah card responsif kita */}
      <div className="responsive-card">
        
        {/* 3. Ini dia implementasinya!
          Kita bungkus <div> gambar dengan <GradualBlur>
          Semua elemen di dalamnya (children) akan mendapatkan efek blur-in.
        */}
        <GradualBlur>
          <div className="card-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Workspace"
              className="card-image"
            />
          </div>
        </GradualBlur>

        {/* Ini adalah bagian konten teks */}
        <div className="card-content">
          <h2>Website Responsif dengan Gradual Blur</h2>
          <p>
            Efek blur ini diimplementasikan menggunakan library `react-bits`. 
            Sementara itu, layout-nya diatur agar responsif di desktop, tablet, 
            dan handphone menggunakan CSS Media Queries.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;