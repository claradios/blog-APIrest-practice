import * as axios from 'axios'
async function deletePostById (token, id) {
  let result = await axios.request({
    url: 'https://localhost:3443/posts/' + id,
    headers: {
      Authorization: `Bearer ${token}`
    },

    method: 'delete'
  })
  return result.data
}

export default deletePostById
