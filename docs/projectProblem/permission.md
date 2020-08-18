# Vue 项目 菜单权限及按钮级权限控制
### 实现思路
1.页面展示需要鉴权的所有按钮，需要先鉴权菜单权限的显示与隐藏。

2.勾选每个角色或者用户所能看的权限保存在数据库。该权限数据是一个权限字段的数组。

3.全局自定义指令（directive）控制按钮权限数据的方法，登入时获取后端传来的按钮权限数组。

4.在每个按钮中调用该指令，并传入该操作的权限字段和后端保存的权限字段进行匹配，能匹配则该操作按钮可显示

### 具体代码如下

 1. **获取登录用户所有权限**
 ```
 // 获取权限菜单(存在store下modules下user.js的actions中)
  getMenuTree ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getMenuTree(state.token).then(response => {
        const data = response.result
        if (!data) {
          reject('验证失败，请重新登录')
        }
        // 存菜单结构
        commit('SET_ROLES', data)
        // 重置按钮权限
        btns = []
        const btn = findAllBtn(data)
        // 存所有按钮权限
        commit('SET_BUTTONS', btn)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
 // 递归获取按钮list
let btns = []
export function findAllBtn (list) {
  list.forEach(val => {
  // 与后台协商所有菜单资源（resCode)下的type是1表菜单，2为按钮
    if (val.type === '1') {
      if (val.children && val.children.length > 0) {
        findAllBtn(val.children)
      }
    } else {
      btns.push(val.reCode)
    }
  })
}
 ```
 2. **对比菜单权限的方法**
 ```
在store下modules下新建一个permission.js(获取最终动态权限菜单）
 /**
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */
export function recursionRouter (userRouter = [], allRouter = []) {
  let realRoutes = []
  allRouter.forEach(val => {
    userRouter.forEach(item => {
      if (val.path.includes('/')) {
        if (item.resCode === val.path.split('/')[1]) {
          val.children = recursionRouter(item.children, val.children)
          realRoutes.push(val)
        }
      } else {
        if (item.resCode === val.path) {
          if (item.children && item.children.length > 0) {
            val.children = recursionRouter(item.children, val.children)
          }
          realRoutes.push(val)
        }
      }
    })
  })
  realRoutes.push({ path: '*', redirect: '/404', isShow: true })
  // console.log(222, realRoutes)
  return realRoutes
}
// asyncRouterMap本地配置好的所有动态路由的集合
const actions = {
  generateRoutes ({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = recursionRouter(roles, [...asyncRouterMap])
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}
 ```
 对比菜单权限需要在全局路由守卫中如下操作
 ```
 router.beforeEach(async (to, from, next) => {
  // 确定用户是否已登录
  const hasToken = getToken()
  // 判断是否有token
  if (hasToken) {
    // 运营端登录
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否已获得了他的权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        // 角色必须是对象数组
        const roles = await store.dispatch('user/getMenuTree')
          // 根据角色生成可访问路由映射
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 清空静态路由
          resetRouter()
          // 动态添加可访问路由
          router.addRoutes(accessRoutes)
          // hack 方法，以确保addRoutes是完整的
          // 设置replace: true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
      }
    }
  } else {
    // 在免登录白名单，直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 没有访问权限的其他页面被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
 ```
 3. **全局自定义指令**
```
// 需要全局注入（即在main.js引入）
import Vue from 'vue'
import store from '@/store'
/**
 * 使用：v-permission="'resCode'"
 *   resCode 按钮资源（即路由path）
 * **/
Vue.directive('permission', {
  inserted (el, vDir) {
    let btnPermission = store.getters.buttons
    if (vDir.value) {
      if (!btnPermission.includes(vDir.value)) {
        el.parentNode.removeChild(el)
      }
    }
  }
})
```
 4. **页面中使用**
 ```
 <el-button type="primary" @click="roleExport" v-permission="'ent-role-export'">导出</el-button>
 ```
 ### 如图
 初始![在这里插入图片描述](https://img-blog.csdnimg.cn/2020062411591456.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2N3aW44OTUx,size_16,color_FFFFFF,t_70)
 取消权限后
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200624120202117.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2N3aW44OTUx,size_16,color_FFFFFF,t_70)
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200624120249906.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2N3aW44OTUx,size_16,color_FFFFFF,t_70)
******
 ### 相关文章
 [基于elementUI中table组件二次封装（Vue项目）](https://blog.csdn.net/cwin8951/article/details/104479606)
 *************
[axios二次封装，接口统一存放,满足RESTful风格](https://blog.csdn.net/cwin8951/article/details/104415090)
******
[keep-alive不能缓存多层级路由(vue-router)菜单问题解决](https://blog.csdn.net/cwin8951/article/details/106644118)
****
[基于ElementUi再次封装基础组件文档](https://wocwin.github.io/blog/)
