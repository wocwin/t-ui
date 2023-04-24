import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

/**
 * 静态模块路由
 */
import demoRouter from './modules/demo' // 测试页面
import commonRouter from './modules/common' // 常用组件
import TTableRouter from './modules/TTable' // TTable组件
import TFormRouter from './modules/TForm' // TForm组件
import TQueryConditionRouter from './modules/TQuery' // 条件查询组件
Vue.use(Router)

// 公共路由
export const constantRoutes =
  [
    {
      path: '/redirect',
      component: Layout,
      hidden: true,
      children: [{
        path: '/redirect/:path(.*)',
        component: () =>
          import('@/views/redirect')
      }]
    },
    {
      path: '/login',
      component: () =>
        import('@/views/login'),
      hidden: true
    },
    {
      path: '/404',
      component: () =>
        import('@/views/error/404'),
      hidden: true
    },
    {
      path: '/401',
      component: () =>
        import('@/views/error/401'),
      hidden: true
    },
    demoRouter,
    commonRouter,
    TTableRouter,
    TFormRouter,
    TQueryConditionRouter
  ]

const router = new Router({
  // base: '/',
  routes: constantRoutes,
  mode: 'history'
})
export default router
