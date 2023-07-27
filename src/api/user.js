import axios from '@/api/axios'

// login
export const loginRequest = (loginInfo) => {
  return axios({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: loginInfo
  })
}
// get code
export const sendCode = (mobile) => {
  return axios({
    method: 'POST',
    url: ` /v1_0/sms/codes/${mobile}`
  })
}

// get user info
export const getUserInfo = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/user'
  })
}

// get user channels

export const getUserChannels = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// get user channels for id of channel
export const getUserChannelById = (params) => {
  return axios({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
