import * as axios from 'axios'

async function addComment (token, postId, text) {
  const data = {
    text
  }
  const result = await axios.request({
    url: `https://localhost:3443/posts/${postId}/comments/`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data,
    method: 'post'
  })
  return result.data
}
export default addComment
