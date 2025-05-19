import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // this is default, just being explicit
  plugins: [react()],
})
