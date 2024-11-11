// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para la API de Spring Boot
      '/api': {
        target: 'http://localhost:8009',
        changeOrigin: true,
        secure: false,
        // No reescribir la ruta para que coincida con el backend
        // Elimina la línea de 'rewrite'
      },
    },
  },
});
