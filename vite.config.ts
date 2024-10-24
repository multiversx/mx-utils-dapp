import dns from 'dns';
import svgr from '@svgr/rollup';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    basicSsl(),
    tsconfigPaths(),
    nodePolyfills({
      globals: { Buffer: true, global: true, process: true },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['/src/tests/setup.ts'],
  },
  build: {
    outDir: 'build',
  },
  server: {
    port: 3001,
    strictPort: true,
    https: true,
    host: 'localhost',
    hmr: {
      overlay: false,
    },
    watch: {
      usePolling: false,
      useFsEvents: false,
    },
  },
  preview: {
    port: 3001,
    strictPort: true,
    https: true,
    host: 'localhost',
  },
});
