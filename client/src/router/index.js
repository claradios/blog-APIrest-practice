import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Read from '../views/Read.vue'
import NewPost from '../views/NewPost.vue'
import Signup from '../views/Signup.vue'
import Edit from '../views/Edit.vue'
import OffensiveWords from '../views/OffensiveWords.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/read/:id',
    name: 'read',
    props: true,
    component: Read
  },
  {
    path: '/edit/:id',
    name: 'edit',
    props: true,
    component: Edit
  },
  {
    path: '/new-post',
    name: 'newPost',
    props: true,
    component: NewPost
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin/settings/offensivewords',
    name: 'offensivewords',
    component: OffensiveWords
  }
]

const router = new VueRouter({
  routes
})

export default router
