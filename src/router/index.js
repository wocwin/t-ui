import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const TableDemo = () => import('@/views/demo.vue')
const CheckboxTable = () => import('@/views/demo.vue')
const routes = [
  {
    path: '/',
    name: 'TTable',
    component: TableDemo
  },
  {
    path: '/checkbox-table',
    name: 'checkboxTable',
    component: CheckboxTable
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
