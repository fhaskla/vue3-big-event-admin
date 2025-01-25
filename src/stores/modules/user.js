import { defineStore } from 'pinia'
// 用户模块
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('') // 定义 token
    const setToken = t => (token.value = t) // 设置 token

    return { token, setToken }
  },
  {
    persist: true, // 持久化
  },
)
