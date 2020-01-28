import * as axios from 'axios'

async function addOffensiveWord (token, word) {
  const data = {
    word
  }
  const result = await axios.request({
    url: 'https://localhost:3443/offensivewords/',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data,
    method: 'post'
  })
  return result.data
}
export default addOffensiveWord
