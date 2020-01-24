import * as axios from 'axios'

async function addComment (token, postId, body) {
  const { text } = body
  const data = {
    text
  }
  const result = await axios.request({
    url: `https://localhost:3443/posts/${postId}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data,
    method: 'post'
  })
  return result.data
}
export default addComment
