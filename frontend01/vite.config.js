import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // TAMBAHKAN BAGIAN INI UNTUK MEMPERBAIKI ERROR
  optimizeDeps: {
    exclude: [
      'react-native-web',
      'react-native-web/dist/apis/StyleSheet/registry'
    ]
  }
})