import * as axios from 'axios'

async function addPost (token, data) {
  const result = await axios.request({
    url: 'https://localhost:3443/posts/',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data,
    method: 'post'
  })
  return result.data
}
export default addPost
