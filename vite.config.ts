import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const SHOPIFY_STORE = 'https://ujivar-cd.myshopify.com'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          shopify: ['@shopify/storefront-api-client', 'graphql', 'graphql-request']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Flexype SDK needs these Shopify endpoints to initialize and sync cart
      '/browsing_context_suggestions.json': { target: SHOPIFY_STORE, changeOrigin: true, secure: true, cookieDomainRewrite: 'localhost' },
      '/cart.js': { target: SHOPIFY_STORE, changeOrigin: true, secure: true, cookieDomainRewrite: 'localhost' },
      '/cart/add.js': { target: SHOPIFY_STORE, changeOrigin: true, secure: true, cookieDomainRewrite: 'localhost' },
      '/cart/change.js': { target: SHOPIFY_STORE, changeOrigin: true, secure: true, cookieDomainRewrite: 'localhost' },
      '/cart/clear.js': { target: SHOPIFY_STORE, changeOrigin: true, secure: true, cookieDomainRewrite: 'localhost' },
      '/cart/update.js': { target: SHOPIFY_STORE, changeOrigin: true, secure: true, cookieDomainRewrite: 'localhost' },
    }
  }
})
