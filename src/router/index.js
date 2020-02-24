import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TTable',
    component: () => import('@/views/demo.vue')
  },
  {
    path: '/checkbox-table',
    name: 'checkboxTable',
    component: () => import('@/views/checkboxTable.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
