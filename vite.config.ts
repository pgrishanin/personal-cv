import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    base: mode === 'production' ? 'personal-cv' : '/',
    plugins: [react(), tsconfigPaths()],
    css: {
        preprocessorOptions: {
            less: {
                math: 'always',
                relativeUrls: true,
                javascriptEnabled: true,
            },
        },
    },
}));
