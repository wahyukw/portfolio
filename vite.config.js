import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  assetsInclude: ['**/*.PNG'],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
