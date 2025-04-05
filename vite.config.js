import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0', // This allows external access
    port: 3000,       // Default Vite port
    allowedHosts: ["2757-2405-201-1009-1014-c0f2-c5ed-9eed-473e.ngrok-free.app"]
  },
})
