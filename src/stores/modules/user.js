import { defineStore } from 'pinia'
import { userInfoApi } from '@/api/user.js'
// 用户模块
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('') // 定义 token
    const setToken = (t) => (token.value = t) // 设置 token
    const removeToken = () => {
      token.value = ''
    }
    const userInfo = ref({})
    const setUserInfo = async () => {
      const res = await userInfoApi()
      userInfo.value = res.data
    }
    const removeUserInfo = () => {
      userInfo.value = {}
    }
    return {
      token,
      setToken,
      removeToken,
      userInfo,
      setUserInfo,
      removeUserInfo,
    }
  },
  {
    persist: true, // 持久化
  },
)
