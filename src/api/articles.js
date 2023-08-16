import axios from '@/api/axios'

// get user info
export const getNewDetailById = (id) => {
  return axios({
    method: 'GET',
    url: `/v1_0/articles/${id}`
  })
}

// get article comments

export const getCommentByArtId = (params) => {
  return axios({
    methods: 'GET',
    url: '/v1_0/comments',
    params
  })
}
