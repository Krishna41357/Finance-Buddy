import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    base: './', // ✅ Important for Vercel / relative paths
    build: {
      rollupOptions: {
        external: ["react-chartjs-2", "chart.js"],
      },
      chunkSizeWarningLimit: 2000, // optional, to avoid large chunk warnings
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
});
