import axios from 'axios'
import qs from 'qs'
// import { getToken } from './auth'
import { Message, MessageBox } from 'element-ui'

const BASE_URL = '/api/'
const TIMEOUT_MILLISECONDS = 8000 // 超时链接

const instance = axios.create({
  withCredentials: false,
  baseURL: BASE_URL, // 基本url
  timeout: TIMEOUT_MILLISECONDS,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// axios请求拦截器
instance.interceptors.request.use((config) => {
  // 每个接口新增时间戳
  const timestamp = new Date().getTime()
  if (config.url && config.url.includes('?')) {
    config.url = `${config.url}&t=${timestamp}`
  } else {
    config.url = `${config.url}?t=${timestamp}`
  }
  if (config.method === 'post' && config.headers['Content-Type'] !== 'application/json') {
    config.data = qs.stringify(config.data) // stringify POST方式提交的数据
  }

  // 在发送请求之前
  // if (getToken()) {
  //   // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
  //   config.headers.Authorization = getToken()
  // }
  return config
},
(error) => Promise.reject(error)
)
// axios响应拦截器
instance.interceptors.response.use((response) => {
  // console.log('axios响应拦截器', response)
  return response.data
}, (error) => {
  switch (error.response && error.response.status) {
    case 400:
      error.message = '请求错误(400)'
      Message.error({
        message: error.response.data.msg || error.message
      })
      break
    case 401:
      error.message = '登录信息已过期，请重新登录'// (401)
      MessageBox.confirm(error.response.data.msg || error.message, {
        title: '提示',
        confirmButtonText: '确定',
        showCancelButton: false,
        showClose: false,
        type: 'warning'
      }).then(() => {
        // 清除token 跳登录页
      })
      break
    case 403:
      error.message = '拒绝访问(403)'
      break
    case 404:
      error.message = '请求出错(404)'
      break
    case 408:
      error.message = '请求超时(408)'
      Message.error({
        message: error.response.data.msg || error.message
      })
      break
    case 500:
      error.message = '服务器错误(500)'
      Message.error({
        message: error.response.data.msg || error.message
      })
      break
    case 501:
      error.message = '服务未实现(501)'
      break
    case 502:
      error.message = '网络错误(502)'
      break
    case 503:
      error.message = '服务不可用(503)'
      break
    case 504:
      error.message = '网络超时(504)'
      break
    case 505:
      error.message = 'HTTP版本不受支持(505)'
      break
  }
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    Message.error({
      message: '网络异常'
    })
  }
  return Promise.reject(error)
})
export default instance
