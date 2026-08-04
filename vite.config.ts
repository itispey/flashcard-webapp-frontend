import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), basicSsl()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Allows testing via Telegram's HTTPS-only WebView tunnels (e.g. ngrok/cloudflared)
    host: true,
    // Default 5173 falls in Windows Hyper-V reserved range 5146–5245 (EACCES)
    port: 3002,
    allowedHosts: true, // TODO: Remove this in production
  },
})
