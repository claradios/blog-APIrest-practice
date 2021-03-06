import * as axios from 'axios'
async function editOffensiveWord (token, id, offensiveWord) {
  const { word, level } = offensiveWord
  const data = {
    word,
    level: parseInt(level)
  }

  let result = await axios.request({
    url: 'https://localhost:3443/offensivewords/' + id,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data,
    method: 'put'
  })
  return result.data
}

export default editOffensiveWord
