import dns from 'dns';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
// import svgr from 'vite-plugin-svgr';
import svgr from '@svgr/rollup';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
dns.setDefaultResultOrder('verbatim');

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
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
    define: {
      'process.env': process.env,
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
};
