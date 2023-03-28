import request from '@/utils/request'

// 获取路由
export const getRouters = (menuId) => {
  return request({
    url: '/portal-user/getRouters',
    method: 'get',
    params: {
      menuId
    }
  })
}

// 获取子应用父级path
export const getRouterPrefix = (menuId) => {
  return request({
    url: '/portal-user/system/menu/router-prefix',
    method: 'get',
    params: {
      menuId
    }
  })
}
