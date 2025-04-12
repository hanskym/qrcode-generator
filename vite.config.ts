import { defineConfig } from 'vite';

import { reactRouter } from '@react-router/dev/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import babel from 'vite-plugin-babel';
import checker from 'vite-plugin-checker';
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  manifest: {
    name: 'QR Code Generator',
    short_name: 'QR Code Generator',
    description: 'Create customizable QR Codes and export them directly from the browser.',
    lang: 'en',
    dir: 'ltr',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    prefer_related_applications: false,
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    babel({
      filter: /\.(ts|tsx)$/,
      babelConfig: {
        presets: ['@babel/preset-typescript'],
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    reactRouter(),
    checker({
      typescript: true,
      // ! Incompatible with eslint@9 - https://github.com/fi3ework/vite-plugin-checker/issues/320
      //   eslint: {
      //     useFlatConfig: true,
      //     lintCommand: 'eslint .',
      //   },
    }),
    tsconfigPaths(),
    VitePWA(pwaOptions),
    visualizer(),
  ],
});
