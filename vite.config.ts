import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Hỗ trợ code cũ dùng process.env
    'process.env': process.env 
  }
});
