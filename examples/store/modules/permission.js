
import { asyncRouterMap, constantRoutes } from '@/router'
import { cloneDeep } from 'lodash'
/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */
export function recursionRouter (userRouter = [], allRouter = []) {
  const realRoutes = []
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
// 获取最终treeTable结构
export function formatTreeData (data) {
  data.forEach(item => {
    if (item.children && item.children.length > 0) {
      formatTreeData(item.children)
      item.children.forEach(e => {
        if (e.belong) {
          item.children.map(i => {
            if (i.resCode === e.belong) {
              i.children.push(e)
            }
          })
        }
      })
      item.children = item.children.filter(n => {
        return !n.belong
      })
    }
  })
  return data
}

const state = {
  routes: [],
  addRoutes: [],
  treeData: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
    state.addRoutes = constantRoutes.concat(routes)
  },
  SET_TREE_DATA: (state, treeData) => {
    state.treeData = treeData
  }
}

const actions = {
  generateRoutes ({ commit }, roles) {
    return new Promise(resolve => {
      const cloneDeepRoutes = cloneDeep(asyncRouterMap)
      const accessedRoutes = recursionRouter(roles, cloneDeepRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  getTreeData ({ commit }, roles) {
    return new Promise(resolve => {
      const treeData = formatTreeData(roles)
      commit('SET_TREE_DATA', treeData)
      resolve(treeData)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
