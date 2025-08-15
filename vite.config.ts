import path from 'path';
import checker from 'vite-plugin-checker';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const PORT = 3039;

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: false, // Disable TS checker if not using it here
      eslint: {
        useFlatConfig: true, // Important!
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
        dev: {
          logLevel: ['error'], // only show errors
        },
      },
      overlay: {
        position: 'tl',
        initialIsOpen: false,
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^src(.+)/,
        replacement: path.resolve(process.cwd(), 'src/$1'),
      },
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  server: { port: PORT, host: true },
  preview: { port: PORT, host: true },
});
