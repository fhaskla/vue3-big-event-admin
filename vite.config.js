import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/vue3-big-event-admin', // 设置路由的基础路径
  plugins: [
    vue(), // Vite 可以识别和处理 .vue文件
    // 只解析脚本，我试过在模板里写 ElMessage 方法，没有自动引入
    AutoImport({
      // 自动导入 Vue 和 vue-router 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', 'vue-router'],
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver(),
      ],
    }),
    // 只解析模板
    Components({
      // 自动导入 components 静态组件
      resolvers: [
        // 自动导入 Element Plus 组件 和 自动注册自定义指令
        ElementPlusResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
