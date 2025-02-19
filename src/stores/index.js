import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist) // pinia 使用持久化插件

export default pinia

// 相当于 import { useUserStore } from './modules/user'
// 然后再 export 出去
export * from './modules/user'
