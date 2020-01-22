import * as axios from 'axios'

async function loginUser (username, password) {
  const auth = {
    username,
    password
  }
  console.log(auth)
  const result = await axios.request({
    url: 'https://localhost:3443/login/',
    auth,
    method: 'post'
  })
  console.log(result.data)
  return result.data
}
export default loginUser
