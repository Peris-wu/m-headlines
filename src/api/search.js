import axios from '@/api/axios'

// search for suggestions
export const searchSuggestions = (q) => {
  return axios({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const searchResult = (params) => {
  return axios({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
