import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    return {
        base: process.env.VITE_PUBLIC_BASE,
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
    };
});
