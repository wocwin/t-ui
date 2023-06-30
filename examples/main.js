import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'babel-polyfill'
import Element from 'element-ui'
// import './components/index.js' // 基础组件自动注册全局
import '@/assets/styles/element-variables.scss'
import '@/assets/styles/index.scss' // global css
import './assets/icons' // icon

import '@/directive'
import * as filters from './utils/filters' // global filters
import { message } from './utils/resetMessage' // 防止重复点击重复弹出message弹框
import api from '@/api' // 接口api
import VueClipboard from 'vue-clipboard2' // 复制插件
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import { Message } from 'element-ui'

import Tui from '../packages' // 二次封装组件
import vueSeamlessScroll from 'vue-seamless-scroll'

import './permission' // 全局路由守卫
Vue.use(vueSeamlessScroll)
Vue.use(Element)
Vue.use(Antd)
Vue.use(Tui)

Vue.use(VueClipboard)

Vue.prototype.$http = api
Vue.prototype.$messageUpload = message
Vue.prototype.$message = Element.Message
Vue.prototype.$loading = Element.Loading.service
Vue.prototype.$msgbox = Element.MessageBox
Vue.prototype.$alert = Element.MessageBox.alert
Vue.prototype.$confirm = Element.MessageBox.confirm
Vue.prototype.$prompt = Element.MessageBox.prompt
Vue.prototype.$notify = Notification
// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
