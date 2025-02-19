// 网络图片地址转换为 File 对象
import axios from 'axios'

export async function urlToFile(url, fileName) {
  try {
    // 独立axios实例避免拦截器影响
    // responseType: 'blob' 告诉axios将响应数据解析为Blob对象
    const instance = axios.create({ responseType: 'blob' })

    const response = await instance.get(url, {
      headers: {
        // 确保跨域请求正常
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    })

    const blob = response.data
    return new File([blob], fileName, {
      type: response?.headers['content-type'] || 'image/jpeg', // 类型回退
    })
  } catch (error) {
    console.error('图片转换失败:', error)
    return null
  }
}
