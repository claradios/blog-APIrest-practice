import * as axios from 'axios'
async function editComment (token, postId, commentId, body) {
  const data = body
  let result = await axios.request({
    url: `https://localhost:3443/posts/${postId}/comments/${commentId}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data,
    method: 'put'
  })
  return result.data
}

export default editComment
