// import Vue from 'vue'
// import Router from 'vue-router'
// import Blog from '../components'
// import Offensivewords from '../components';

// Vue.use(Router)

// export default new Router({
//   mode: 'history',
//   linkActiveClass: 'active',
//   routes: [{
//     path: '/',
//     name: 'feed',
//     component: Blog
//   }, {
//     path: '/by/:author',
//     name: 'author',
//     props: true,
//     component: Blog
//   }, {
//     path: '/posts/',
//     name: 'posts',
//     props: true,
//     component: Blog
//   },{
//     path: '/posts/:id',
//     name: 'post',
//     props: true,
//     component: Blog
//   },{
//     path: '/offensivewords/',
//     name: 'offensivewords',
//     props: true,
//     component: Offensivewords
//   },
// ]
// })

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
