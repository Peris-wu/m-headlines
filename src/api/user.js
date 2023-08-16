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

// set user channel for id of channel
export const setUserChannelById = (data) => {
  return axios({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data
  })
}

// delete user channel for id of channel
export const deleteUserChannelById = (channelId) => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}

// get user search results
export const getUserSearchHistory = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/user/histories'
  })
}

// flowUserById
export const flowUserById = (autId) => {
  return axios({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: autId
    }
  })
}

// flowUserById
export const cancelFlowUserById = (autId) => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/user/followings/${autId}`
  })
}

// collect article by articleId

export const collectArticleById = (autId) => {
  return axios({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target: autId
    }
  })
}

// cancel collect article by articleId
export const cancelCollectArticleById = (autId) => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/article/collections/${autId}`
  })
}

// upvote article by articleId
export const upvoteArticleById = (autId) => {
  return axios({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: autId
    }
  })
}

// cancel upvote article by articleId
export const cancelUpvoteArticleById = (autId) => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/article/likings/${autId}`
  })
}
