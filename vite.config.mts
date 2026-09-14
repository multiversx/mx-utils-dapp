import dns from 'dns';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
(dns as any).setDefaultResultOrder('verbatim');

export default () => {
  return defineConfig({
    plugins: [
      react(),
      basicSsl(),
      svgr(),
      nodePolyfills({
        globals: { Buffer: true, global: true, process: true }
      })
    ],
    resolve: {
      tsconfigPaths: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          quietDeps: true,
          silenceDeprecations: [
            'import',
            'global-builtin',
            'abs-percent',
            'color-functions'
          ]
        }
      }
    },
    build: {
      outDir: 'build',
      cssMinify: true,
      minify: true
    },
    server: {
      port: 3001,
      strictPort: true,
      host: true,
      hmr: {
        overlay: false
      },
      watch: {
        usePolling: false,
        useFsEvents: false
      }
    },
    preview: {
      port: 3001,
      strictPort: true,
      host: 'localhost'
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['src/tests/setup.ts'],
      server: {
        deps: {
          inline: [/@multiversx\//]
        }
      }
    }
  });
};
