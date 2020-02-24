import request from '../index'
const config = {
  // 获取企业用户列表
  getEntUserList: {
    url: '/getEntUserList.json',
    method: 'get'
  }
}

export default function req (funcName, data) {
  return request(config, funcName, data)
}
