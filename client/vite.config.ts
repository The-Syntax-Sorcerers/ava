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
    redirect({from: '/login', to: '/routeDashboard/'}),
    redirect({from: '/signup', to: '/routeDashboard/'}),
    redirect({from: '/subject', to: '/routeSubject/'}),
    redirect({from: '/assignments', to: '/routeAssignments/'}),
    redirect({from: '/logout', to: '/routeIndex/'}),
    redirect({from: '/profile', to: '/routeProfile/'}),
    redirect({from: '/privacy_policy', to: '/routePrivacyPolicy/'}),
    redirect({from: '/assignment', to: '/routeAssignment/'}),
  ],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'routeIndex', 'index.html'),
        dashboard: resolve(root, 'routeDashboard', 'index.html'),
        assignments: resolve(root, 'routeAssignments', 'index.html'),
        privacyPolicy: resolve(root, 'routePrivacyPolicy', 'index.html'),
        subject: resolve(root, 'routeSubject', 'index.html'),
        assignment: resolve(root, 'routeAssignment', 'index.html'),
        profile: resolve(root, 'routeProfile', 'index.html')
      }
    }
  },
})
