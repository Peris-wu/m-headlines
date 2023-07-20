import axios from '@/api/axios'

export const loginRequest = (loginInfo) => {
  return axios.post({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: loginInfo
  })
}

export const sendCode = (mobile) => {
  return axios.post({
    method: 'POST',
    url: ` /v1_0/sms/codes/${mobile}`
  })
}
