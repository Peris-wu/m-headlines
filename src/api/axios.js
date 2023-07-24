import axios from 'axios'
import baseURL from '@/api/baseURL'
import store from '@/store'
const request = axios.create({
  baseURL,
  timeout: 5000
})

request.interceptors.request.use(
  (config) => {
    // 配置请求头携带token
    const { user } = store.state
    if (user) {
      config.headers.Authorization = `Bearer ${user.data.token}`
    }
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
