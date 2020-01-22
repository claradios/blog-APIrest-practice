import * as axios from 'axios'
async function loadPosts () {
  const result = await axios.get(
    'https://localhost:3443/posts/'
  )
  const info = result.data.reverse()
  return info
}

export default loadPosts
