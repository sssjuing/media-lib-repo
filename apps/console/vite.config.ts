import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log({ mode });
  return {
    plugins: [react()],
    resolve: {
      alias: { '@': resolve(__dirname, 'src') },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:1323',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
        },
      },
    },
  };
});
