import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  // Load env variables based on the mode (development/production)
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    build:{
       rollupOptions: {
      external: ["react-chartjs-2", "chart.js"],
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL, // ✅ Loaded from .env file
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})
