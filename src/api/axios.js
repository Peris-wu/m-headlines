import axios from 'axios'
import baseURL from '@/api/baseURL'
import store from '@/store'
import { Toast } from 'vant'
import router from '@/router'
const request = axios.create({
  baseURL,
  timeout: 5000
})
const _refreshAxios = axios.create({
  baseURL
})

const toLoginPage = () => {
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

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
  async (error) => {
    const { user } = store.state
    const { status } = error.response
    if (status === 400) {
      // 请求地址/参数错误 -> 客户端的问题
      Toast.fail('访问参数不被识别，请正确输入参数')
    } else if (status === 401) {
      // 未授权访问，需要登录或者token过期了,需要刷新token

      // 未登录直接跳转到登录页
      if (!user || !user.data.token) {
        console.log(user)
        return toLoginPage()
      }
      try {
        // 已登录，token过期
        const { data } = await _refreshAxios({
          url: '/v1_0/authorizations',
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${user.data.refresh_token}`
          }
        })

        user.data.token = data.data.token
        store.commit('setUser', user)
        // 重新发请求
        return request(error.config)
      } catch (err) {
        // 直接去登录页
        toLoginPage()
      }
    } else if (status === 403) {
      // 无权访问该资源
      Toast.fail('用户无权访问该资源')
    } else if (status === 404) {
      // 访问的资源不存在
      Toast.fail('访问的资源不存在')
    } else {
      // 500 服务器端的错误
      Toast.fail('服务器发送错误，请稍后重试')
    }
    return Promise.reject(error)
  }
)

export default request
