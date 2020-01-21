import * as axios from 'axios'
async function loadPosts () {
  console.log('hola soy la peticion')
  const result = await axios.get(
    'https://localhost:3443/posts/'
  )
  let posts = []
  for (let post of result.data) {
    posts.push(post)
  }
  return posts
}

export default loadPosts
