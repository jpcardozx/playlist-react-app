import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/playlist-react-app/', // O nome do repositório GitHub
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.spotify.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
