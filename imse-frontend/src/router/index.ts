import store from '@/store'
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
    path: '/game/:id',
    name: 'GamePage',
    component: () =>
      import('../views/GamePage.vue')
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () =>
      import('../views/Reports.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import('../views/Register.vue')
  },
  { path: '*', component: () => import('../views/NotFound.vue') },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch("isAdmin");
  next();
})

export default router
