import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'babel-polyfill'
import Es6Promise from 'es6-promise'
// import './components/index.js' // 基础组件自动注册全局
import './assets/css/index.scss' // 全局样式
import './assets/css/iconfont/iconfont.css' // 字体图标样式
import './assets/css/fonts/fonts.css' // 文字字体
import './utils/directive'
import * as filters from './utils/filters' // global filters
import { message } from './utils/resetMessage' // 防止重复点击重复弹出message弹框
import PromiseHttp from './api/apiPath/index'
import vueImgAlart from './utils/directive/imgAlart/index'// 图片弹窗指令
import VueClipboard from 'vue-clipboard2' // 复制插件
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import { Message } from 'element-ui'
import Element from 'element-ui'
import '@/assets/css/element-variables.scss'
import Tui from '../packages' // 二次封装组件
Vue.use(Element)
Vue.use(Antd)
Vue.use(Tui)

// import './permission' // 全局路由守卫
// 解决低版本浏览器不支持es6
Es6Promise.polyfill()

Vue.use(vueImgAlart)
Vue.use(VueClipboard)

Vue.prototype.$http = PromiseHttp
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
