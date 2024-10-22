import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        { src: '_redirects', dest: 'dist' }
      ],
      hook: 'writeBundle',
    })
  ],
  define: {
    'window.jQuery': 'jQuery',
    'window.$': 'jQuery',  
  },
  optimizeDeps: {
    include: ['jquery'], 
  },
});
