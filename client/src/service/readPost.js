import * as axios from 'axios'
async function readPost (id) {
  let result = await axios.get('https://localhost:3443/posts/' + id)
  console.log(result.data)
  return result.data
}

export default readPost
