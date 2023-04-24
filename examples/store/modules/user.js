import { getToken, setToken, removeToken } from '@/utils/auth'
import UserInfoData from './getData/userInfo.json'
import GetTokenData from './getData/token.json'
const user = {
  state: {
    token: getToken(),
    name: '',
    nickName: '',
    avatar: '',
    roles: [],
    permissions: [],
    dept: {},
    ssoControl: {},
    permBtn: [],
    permCode: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_NICK_NAME: (state, nickName) => {
      state.nickName = nickName
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_DEPT: (state, dept) => {
      state.dept = dept
    },
    SET_PERM_BTN: (state, permBtn) => {
      state.permBtn = permBtn
    },
    SET_PERM_CODE: (state, permCode) => {
      state.permCode = permCode
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const res = GetTokenData
        if (res.success) {
          setToken(res.data)
          commit('SET_TOKEN', res.data)
        }
        resolve(res)
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const res = UserInfoData
        if (res?.success) {
          const user = res.data
          // console.log('获取到的用户信息',user.roles,user.permissions)
          if (user.roles && user.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', user.roles)
            // commit('SET_PERMISSIONS', user.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.userName)
          commit('SET_NICK_NAME', user.nickName)
          commit('SET_USER_ID', user.userId)
          commit('SET_DEPT', user.dept)
          // 获取按钮权限
          // const btmRes = await getPermBtm()
          // // console.log('获取的按钮权限', btmRes)
          // if (btmRes.success && btmRes.data.length > 0) {
          //   const permBtn = btmRes.data.map((item) => item.menuId)
          //   const permCode = btmRes.data.map((item) => item.perms || null)
          //   commit('SET_PERM_BTN', permBtn)
          //   commit('SET_PERM_CODE', permCode)
          //   commit('SET_PERMISSIONS', permCode)
          // }
          resolve(res.data)
        }
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
