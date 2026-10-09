import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      // Deux pages : le site (React) et l'outil Ulti-Tactics (HTML/JS autonome, servi sur /ulti-tactics/).
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        ultiTactics: fileURLToPath(new URL('./ulti-tactics/index.html', import.meta.url)),
      },
    },
  },
})
