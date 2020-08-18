# axios二次封装，接口统一存放,满足RESTful风格

### 在新建项目目录src下utils文件夹新建fetch.js文件，此文件统一处理所有http请求和响应。
* 直接上代码
```
import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import { getToken } from './auth'
import { Message, MessageBox } from 'element-ui'

const BASE_URL = '/invoice'
const TIMEOUT_MILLISECONDS = 60000 // 超时链接

const instance = axios.create({
  withCredentials: false,
  baseURL: BASE_URL, // 基本url
  timeout: TIMEOUT_MILLISECONDS,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
```
#### axios请求拦截器
```
instance.interceptors.request.use((config) => {
  // 每个接口新增时间戳
  let timestamp = new Date().getTime()
  if (config.url && config.url.includes('?')) {
    config.url = `${config.url}&t=${timestamp}`
  } else {
    config.url = `${config.url}?t=${timestamp}`
  }
   //PUT POST DELETE方式提交的数据格式化
   if ((config.method === 'post'||config.method === 'put'||config.method === 'delete') && config.headers['Content-Type'] !== 'application/json') {
    config.data = qs.stringify(config.data)
  }
  // 在发送请求之前 判断是否存在token，如果存在的话，则每个http header都加上token
  if (getToken()) {
    // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
    config.headers['Authorization'] = getToken()
  }
  return config
},
(error) => Promise.reject(error)
)
```
#### axios响应拦截器(统一处理所有http响应)
```
instance.interceptors.response.use((response) => {
// 下载类型特殊处理文件名
const type = response.request.responseType || ''
  if (type.includes('blob')) {
    let disposition = response.headers['content-disposition']
    let filename = '默认文件名'
    if (disposition && disposition.indexOf('filename=') !== -1) {
      filename = decodeURI(disposition.substring(disposition.indexOf('filename=') + 9, disposition.length))
    }
    response.data.filename = filename
  }
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
       store.dispatch('user/resetToken').then(() => {
            router.push('/login')
          })
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
```
### 在src目录下新建api文件夹，在新建index.js/urlConst.js文件
* urlConst.js 存放api接口路径
```
const urlConst = {
  /**
   * 公共模块API
   **/
  // 发送短信校验码
  sendPhoneVerify: '/sms/send-phone-verify',
  // 校验短信验证码
  verifyCode: '/sms/verify-code',
  // 获取法人手机号码（1.3版本新增接口）
  getLegalPhone: '/enterprise/legal-phone',
  // 获取企业信息
  current: '/user/current'
  ......
}
export default urlConst
```
* index.js封装通用请求方法
```
import fetch from '@/utils/fetch'
import urlConst from './urlConst' // api路径定义文件
const urlConfig = {
  ...urlConst
}
/**
 * 通用请求方法
 * @param {methodType} 请求方式
 * @param {urlName} 接口名称
 * @param {dataParams} 正常传参
 * @param {urlParam} url参数restFul风格
 */
/* 通用请求方法 */
export function ajaxRequest (methodType, urlName, dataParams, urlParam) {
  methodType = methodType.toUpperCase()
  dataParams = dataParams || ''
  urlParam = urlParam || ''
  let requestConfig = {
    method: methodType
  }
  let url = urlConfig[urlName]
  requestConfig.url = urlParam ? (url + '/' + urlParam) : url
  switch (methodType) {
    case 'POST':
    case 'PUT':
    case 'DELETE':
      requestConfig.headers = { 'Content-Type': 'application/json' }
      requestConfig.data = dataParams
      break
    case 'GET':
      requestConfig.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
      requestConfig.params = dataParams
      break
    case 'UPLOAD':
      requestConfig.headers = { 'Content-Type': 'application/form-data' }
      requestConfig.method = 'POST'
      requestConfig.data = dataParams
      break
    // 下载excel zip
    case 'DOWNLOAD':
      requestConfig.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
      requestConfig.method = 'GET'
      requestConfig.params = dataParams
      requestConfig.responseType = 'blob'
      break
    // 下载回显图片
    case 'GETIMAGE':
      requestConfig.headers = { 'Content-Type': 'application/json' }
      requestConfig.method = 'GET'
      requestConfig.params = dataParams
      requestConfig.responseType = 'blob'
      break
    default:
      requestConfig.headers = { 'Content-Type': 'application/json' }
      requestConfig.method = 'POST'
      requestConfig.data = dataParams
      break
  }
  return fetch(requestConfig)
}
```
#### 将封装的axios挂载在main.js中，供全局使用

```
import { ajaxRequest } from '@/api'
Vue.prototype.$ajaxRequest = ajaxRequest
```

#### 在文件中直接使用this.$ajaxRequest()，例如
* 1、正常方式请求接口
```
// 修改密码
 async changePassword (params) {
      const res = await this.$ajaxRequest('put', 'changePassword', params)
      注释：
      put 是请求方式
      changePassword 是定义的接口名
      params 是接口所需要的参数
    }
```
* 2、RESTful风格请求接口
```
// 获取节假日
    async checkIsHoliday (date) {
      let dateValue = moment(date).format('YYYYMMDD')
      const res = await this.$ajaxRequest('get', 'getIsHoliday', '', dateValue)
       注释：
      get 是请求方式
      getIsHoliday 是定义的接口名
      '' 是正常接口所需要的参数
      dateValue 是restful风格需要的参数
    }
```
******  
#### 相关文章
[基于elementUI中table组件二次封装（Vue项目）](https://blog.csdn.net/cwin8951/article/details/104479606)
******
[keep-alive不能缓存多层级路由(vue-router)菜单问题解决](https://blog.csdn.net/cwin8951/article/details/106644118)
****
[基于ElementUi再次封装基础组件文档](https://wocwin.github.io/blog/)
