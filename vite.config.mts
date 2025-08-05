import dns from 'dns';
import path from 'path';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
(dns as any).setDefaultResultOrder('verbatim');

export default () => {
  return defineConfig({
    plugins: [
      react(),
      basicSsl(),
      tsconfigPaths(),
      svgr(),
      nodePolyfills({
        globals: { Buffer: true, global: true, process: true }
      })
    ],
    resolve: {
      alias: {
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['legacy-js-api', 'import']
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
    }
  });
};
