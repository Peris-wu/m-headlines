import axios from '@/api/axios'

// get all channels list
export const getAllChannels = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
