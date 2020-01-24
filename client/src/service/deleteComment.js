import * as axios from 'axios'

async function deleteComment (token, postId, commentId) {
  const result = await axios.request({
    url: `https://localhost:3443/posts/${postId}/${commentId}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'delete'
  })
  return result.data
}
export default deleteComment
