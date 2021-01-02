import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/games',
    name: 'Games',
    component: () =>
      import('../views/Games.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import('../views/Register.vue')
  },
  {
    path: '/helloworld',
    name: 'HelloWorld',
    component: () =>
      import('../views/HelloWorld.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
