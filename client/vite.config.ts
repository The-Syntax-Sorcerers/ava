import { resolve } from 'path'
import { defineConfig } from 'vite'
import { redirect } from 'vite-plugin-url-redirect';
import react from '@vitejs/plugin-react'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [react(),
    redirect({from: '/', to: '/routeIndex/'}),
    redirect({from: '/dashboard', to: '/routeDashboard/'}),
    redirect({from: '/assignments', to: '/routeAssignments/'}),
    redirect({from: '/logout', to: '/routeIndex/'}),
    redirect({from: '/profile', to: '/routeProfile/'}),
  ],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'routeIndex', 'index.html'),
        dashboard: resolve(root, 'routeDashboard', 'index.html'),
        assignments: resolve(root, 'routeAssignments', 'index.html'),
      }
    }
  },
})
