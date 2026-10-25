import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5174 },
  build: { rollupOptions: { output: { manualChunks(id) {
    if (/node_modules[\\/]@firebase[\\/]firestore/.test(id)) return 'firestore';
    if (/node_modules[\\/]@firebase[\\/]auth/.test(id)) return 'auth';
    if (/node_modules[\\/](@firebase|firebase)/.test(id)) return 'firebase';
  } } } },
});
