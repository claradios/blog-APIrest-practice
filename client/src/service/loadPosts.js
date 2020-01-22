import * as axios from 'axios'
async function loadPosts () {
  const result = await axios.get(
    'https://localhost:3443/posts/'
  )
  return result.data
}

export default loadPosts
