import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const TableDemo = () => import('@/views/demo.vue')
const CheckboxTable = () => import('@/views/checkboxTable.vue')
const QueryData = () => import('@/views/query.vue')
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
  },
  {
    path: '/query',
    name: 'query表单',
    component: QueryData
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
