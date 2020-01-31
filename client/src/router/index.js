import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/MountHome.vue'
import Read from '../components/MountRead.vue'
import NewPost from '../components/MountNewPost.vue'
import Edit from '../components/MountEdit.vue'
import OffensiveWords from '../components/MountOffensiveWords.vue'
import TheMainLogin from '../components/TheMainLogin.vue'
import TheMainSignup from '@/components/TheMainSignup.vue'

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
    component: TheMainSignup
  },
  {
    path: '/login',
    name: 'login',
    component: TheMainLogin
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
