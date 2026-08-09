import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Screenshots are large; keep them as files rather than inlining any of them.
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        // Framer Motion is the only heavyweight runtime dependency — splitting it
        // out lets the app shell and the animation runtime cache independently.
        manualChunks(id) {
          if (/node_modules[\\/](framer-)?motion/.test(id)) return 'motion';
          return null;
        },
      },
    },
  },
});
