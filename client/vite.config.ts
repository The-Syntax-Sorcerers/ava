import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root, 'routeIndex', 'index.html'),
        dashboard: resolve(root, 'routeDashboard', 'index.html'),
        assignments: resolve(root, 'routeAssignments', 'index.html'),
      }
    }
  }
})
