import * as axios from 'axios'
async function editPostById (token, id, body) {
  const data = body
  let result = await axios.request({
    url: 'https://localhost:3443/posts/' + id,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data,
    method: 'put'
  })
  return result.data
}

export default editPostById
