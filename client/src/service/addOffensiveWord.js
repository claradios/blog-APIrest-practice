import * as axios from 'axios'

async function addOffensiveWord (token, offensiveWord) {
  const { word, level } = offensiveWord
  const data = {
    word,
    level: parseInt(level)
  }

  const result = await axios.request({
    url: 'https://localhost:3443/offensivewords/',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data,
    method: 'post'
  })
  console.log(result.data)
  return result.data
}
export default addOffensiveWord
