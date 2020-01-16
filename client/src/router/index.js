import Vue from 'vue'
import Router from 'vue-router'
import Blog from '../components'
import Offensivewords from '../components';

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    name: 'feed',
    component: Blog
  }, {
    path: '/by/:author',
    name: 'author',
    props: true,
    component: Blog
  }, {
    path: '/posts/',
    name: 'posts',
    props: true,
    component: Blog
  },{
    path: '/posts/:id',
    name: 'post',
    props: true,
    component: Blog
  },{
    path: '/offensivewords/',
    name: 'offensivewords',
    props: true,
    component: Offensivewords
  },
]
})