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
// 获取原型对象push函数
const originalPush = Router.prototype.push

// 获取原型对象replace函数
const originalReplace = Router.prototype.replace

// 修改原型对象中的push函数
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 修改原型对象中的replace函数
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

export default router
