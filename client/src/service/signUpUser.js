import * as axios from 'axios'

async function signUpUser (username, nickname, password, userImage) {
  const data = { username, nickname, password, userImage }
  const result = await axios.request({
    url: 'https://localhost:3443/signup/',
    data,
    method: 'post'
  })
  return result.data
}
export default signUpUser
