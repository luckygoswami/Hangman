import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'favicon.svg'],
      manifest: {
        name: 'Hangman 12+',
        short_name: 'Hangman',
        description:
          'A fun and challenging Hangman game with a unique hand-drawn, sketchy UI. Guess the word before the Hangman is fully drawn!',
        theme_color: '#2d2d2d',
        background_color: '#f4f1de',
        display: 'standalone',
        start_url: '/Hangman/',
        scope: '/Hangman/',
        orientation: 'portrait',
        icons: [
          {
            src: 'favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'web-app-manifest-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any',
          },

          {
            src: 'web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'screenshot-desktop.png',
            sizes: '1366x679',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Homepage on Desktop',
          },
          {
            src: 'screenshot-mobile.png',
            sizes: '413x600',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Homepage on Mobile',
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
    }),
  ],
  base: '/Hangman',
});
