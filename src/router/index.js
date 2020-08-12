import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const TableDemo = () => import('@/views/demo.vue')
const CheckboxTable = () => import('@/views/checkboxTable.vue')
const QueryData = () => import('@/views/query.vue')
const FormData = () => import('@/views/form.vue')
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
    name: '筛选条件查询',
    component: QueryData
  },
  {
    path: '/form',
    name: 'form表单',
    component: FormData
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
