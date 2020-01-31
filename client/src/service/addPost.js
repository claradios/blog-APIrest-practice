import * as axios from 'axios'

async function addPost (token, body) {
  const { title, content, urlToImage, selectedFilter } = body
  const data = {
    title,
    content,
    urlToImage,
    filter: selectedFilter
  }
  const result = await axios.request({
    url: 'https://localhost:3443/posts/',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data,
    method: 'post'
  })
  return result.data
}
export default addPost
