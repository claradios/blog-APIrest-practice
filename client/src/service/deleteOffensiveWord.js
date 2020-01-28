import * as axios from 'axios'
async function deleteOffensiveWord (token, id) {
  let result = await axios.request({
    url: 'https://localhost:3443/offensivewords/' + id,
    headers: {
      Authorization: `Bearer ${token}`
    },

    method: 'delete'
  })
  return result.data
}

export default deleteOffensiveWord
