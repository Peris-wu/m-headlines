import axios from '@/api/axios'

// commentUpvote
export const commentUpvote = (comId) => {
  return axios({
    method: 'POST',
    url: 'v1_0/comment/likings',
    data: {
      target: comId
    }
  })
}

// cancelCommentUpvote
export const cancelCommentUpvote = (comId) => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${comId}`
  })
}

//
export const commentByArticleId = ({ articleId, content, commenterId }) => {
  return axios({
    method: 'POST',
    url: '/v1_0/comments',
    data: {
      target: articleId,
      content,
      art_id: commenterId
    }
  })
}
