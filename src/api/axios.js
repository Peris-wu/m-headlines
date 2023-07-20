import axios from 'axios'
import baseURL from '@/api/baseURL'
const request = axios.create({
  baseURL,
  timeout: 5000
})

request.interceptors.request.use(
  (config) => {
    // 配置请求头携带token
    // config.headers[''] = `Bearer ${}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
