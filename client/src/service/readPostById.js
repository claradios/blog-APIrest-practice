import * as axios from 'axios'
async function readPostById (id) {
  let result = await axios.get('https://localhost:3443/posts/' + id)
  return result.data
}

export default readPostById
