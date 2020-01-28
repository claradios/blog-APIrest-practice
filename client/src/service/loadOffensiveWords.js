import * as axios from 'axios'
async function loadOffensivewords (token) {
  const result = await axios.request({
    url: 'https://localhost:3443/offensivewords/',
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'get'
  })
  return result.data
}

export default loadOffensivewords
