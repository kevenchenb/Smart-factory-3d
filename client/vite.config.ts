import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(), 
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173, // 前端默认端口
    proxy: {
      // 拦截以 /api 开头的请求
      '/api': {
        target: 'http://localhost:3000', // 后端服务地址
        changeOrigin: true,              // 允许跨域（修改请求头中的 Origin）
        // rewrite: (path) => path.replace(/^\/api/, '') // 可选：按需决定是否去掉 /api 前缀
      }
    }
  }
})
