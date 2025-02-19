import router from '@/router/index.js'
import { useUserStore } from '@/stores/index.js'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 100000,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()
    const token = userStore.token

    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (err) => Promise.reject(err),
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败，比如 token 存在，但是余额不够了
    if (res.data.code !== 0) {
      const errorMessage = res.data.message || '服务异常'
      ElMessage.error(errorMessage)
      return Promise.reject(errorMessage)
    }
    // TODO 4. 处理业务成功
    return res.data
  },
  (err) => {
    // TODO 5. 处理401错误，比如 token 过期了
    const errorMessage = err.response.data.message || '服务异常'
    ElMessage.error(errorMessage)

    if (err.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(errorMessage)
  },
)

export default instance
export { baseURL }
