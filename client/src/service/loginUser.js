import * as axios from 'axios'

async function loginUser (username, password) {
  const auth = {
    username,
    password
  }
  const result = await axios.request({
    url: 'https://localhost:3443/login/',
    auth,
    method: 'post'
  })
  return result.data
}
export default loginUser
