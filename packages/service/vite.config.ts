import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ entryRoot: 'lib', rollupTypes: true })],
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'Service',
      fileName: 'main',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['axios'],
    },
  },
});
