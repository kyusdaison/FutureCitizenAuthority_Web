import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'react-vendor': ['react', 'react-dom'],
          'charts': ['recharts'],
          'motion': ['framer-motion'],
        },
      },
    },
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['framer-motion', 'lucide-react', 'recharts'],
  },
  // 路径别名
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@sections': '/src/sections',
      '@pages': '/src/pages',
    },
  },
})
