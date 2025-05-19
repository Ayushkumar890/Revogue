import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/admin/', // REQUIRED to serve admin from /admin
  plugins: [react()],
})
