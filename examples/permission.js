import router from './router'
// import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/redirect']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    next()
    // if (store.getters.permission_sysMenu.length === 0) {
    //   store.dispatch('GetInfo').then(res => {
    //     // 拉取user_info
    //     const roles = res.roles
    //     store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
    //       router.addRoutes(accessRoutes) // 动态添加可访问路由表
    //       // console.log('我看看路由表', accessRoutes)
    //       next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    //     })
    //   }).catch(err => {
    //     store.dispatch('FedLogOut').then(() => {
    //       Message.error(err.message || err.msg || "出现错误，请稍后再试")
    //       next({ path: '/' })
    //     })
    //   })
    // } else {
    // 如果是微应用则延迟渲染避免与主应用拦截器冲突
    // if (!window.__POWERED_BY_QIANKUN__) {
    //   // setTimeout(next, 100)
    //   // 子应用单独运行，直接进入该系统
    //   let add_routes = store.getters.permission_sysMenu
    //   if (to.path === '/index') {
    //     let lastChild = add_routes[0]?.children[0]
    //     if (to.path === lastChild.path) return false
    //     next(lastChild)
    //     NProgress.done()
    //   } else {
    //     console.log('子项目的next')
    //     next()
    //     NProgress.done()
    //   }
    // } else {
    //   console.log('主项目的next', to, store.getters.permission_sysMenu)
    //   next()
    // }
    // }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})
router.afterEach((to, from, next) => {
  NProgress.done()
})
