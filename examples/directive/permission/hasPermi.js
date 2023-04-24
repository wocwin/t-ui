/**
* 按钮操作权限处理
* Copyright (c) 2022
*/

import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    // eslint-disable-next-line camelcase
    const all_permission = '*:*:*'
    const permissions = store.getters && store.getters.permissions
    if (value) {
      const permissionFlag = value
      const hasPermissions = permissions.some(permission => {
        // eslint-disable-next-line camelcase
        return all_permission === permission || permission.includes(permissionFlag)
      })
      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
