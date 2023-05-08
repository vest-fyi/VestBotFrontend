/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // in development, amplifyjs relies on webpack or similar somewhere so we need to add this for now
    global: {},
  },
  // there's an issue with vite and amplifyjs that requires the following below (https://github.com/aws-amplify/amplify-js/issues/9639)
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
