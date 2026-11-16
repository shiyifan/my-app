import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const isProd = process.env.NODE_ENV === 'production';
const profiling = isProd && {
  'react-dom/client': 'react-dom/profiling',
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: { alias: { ...profiling } },
});
