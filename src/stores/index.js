import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist) // pinia 使用持久化插件

export default pinia

export * from './modules/user'
