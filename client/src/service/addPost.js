import * as axios from 'axios'

async function addPost () {
  const token = localStorage.getItem('token')
  // const { title, content, urlToImage, filter } = body
  const data = {
    title: 'Gran Titulo',
    content: 'Mucho contenido blablabla',
    urlToImage: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjuoYvvnprnAhVP6RoKHVm_A0EQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.purina.es%2Fgatos%2Fetapas-clave-de-su-vida%2Fgatitos%2Fnuevo-gatito-en-casa&psig=AOvVaw1WXJ-qTMaA72JfZvkQRB-Q&ust=1579886734658542',
    filter: 'moon'
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
