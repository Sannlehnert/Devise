import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animation: ['framer-motion'],
          utils: ['emailjs-com']
        }
      }
    },
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion']
  }
})