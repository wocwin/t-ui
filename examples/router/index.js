import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
/* Router 模块 */
// 动态加载的路由
const asyncRouterList = []
// 静态路由
const staticRouter = []
// demo路由
const demoRouter = []
// 自动加载路由
const modulesRouter = require.context('./modules', true, /\.js$/)
modulesRouter.keys().forEach(key => {
  // console.log(1111, modulesRouter(key).default.name)
  if (modulesRouter(key).default.name === 'Demo') {
    // demoRouter.push(modulesRouter(key).default)
  } else if (modulesRouter(key).default.isStatic) {
    staticRouter.push(modulesRouter(key).default)
  } else {
    asyncRouterList.push(modulesRouter(key).default)
  }
})

Vue.use(Router)
/**
 *
 * isShow: false                  是否显示菜单（默认为false,若不显示则设为true）——单个菜单
 * isStatic: false                是否是静态路由
 * redirect:                      重定向
 * meta : {
    title: 'title'               菜单名渲染————若不想显示菜单则无需设置title
    icon: 'icon-name'            字体图标
    noCache: true                如果设置为true，页面将不会被缓存(默认为false)
  }
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: '首页',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: '首页',
          name: 'index'
        }
      }
    ]
  },
  ...demoRouter,
  ...staticRouter
]
export const asyncRouterMap = [
  ...asyncRouterList
]
const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

// 解决动态加载路由报Duplicate named routes definition警告
const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
// 解决NavigationDuplicated（Unhandled promise rejection） 报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
export default router
