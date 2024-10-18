import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext'
  },
  server: {
    host: true 
  },
  resolve: {
    alias: [{find: '@', replacement: '/src'}]
  }
})
