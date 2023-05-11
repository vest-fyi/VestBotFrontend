/// <reference types="vitest" />
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // in development, amplifyjs relies on webpack or similar somewhere so we need to add this for now
    global: "global",
  },
  // there's an issue with vite and amplifyjs that requires the following below (https://github.com/aws-amplify/amplify-js/issues/9639)
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
  plugins: [
    react(),
    legacy()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
