import Vue from 'vue'
import VueRouter from 'vue-router'

import MountHome from '../components/MountHome.vue'
import MountRead from '../components/MountRead.vue'
import MountNewPost from '../components/MountNewPost.vue'
import MountEdit from '../components/MountEdit.vue'
import MountOffensiveWords from '../components/MountOffensiveWords.vue'
import TheMainLogin from '../components/TheMainLogin.vue'
import TheMainSignup from '@/components/TheMainSignup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MountHome
  },
  {
    path: '/read/:id',
    name: 'read',
    props: true,
    component: MountRead
  },
  {
    path: '/edit/:id',
    name: 'edit',
    props: true,
    component: MountEdit
  },
  {
    path: '/new-post',
    name: 'newPost',
    props: true,
    component: MountNewPost
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
    component: MountOffensiveWords
  }
]

const router = new VueRouter({
  routes
})

export default router
