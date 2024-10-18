import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Your App Name',
        short_name: 'App',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/path/to/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: '/path/to/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/path/to/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/path/to/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          // Add your logo.webp here if necessary
        ],
      },
    })
  ],
  server: {
    host: true 
  }
})
