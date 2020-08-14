import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import './components/index.js'
import './assets/css/index.scss' // 全局样式
import './assets/css/iconfont/iconfont.css' // 字体图标样式
import './assets/css/fonts/fonts.css' // 文字字体
import './utils/directive'
import * as filters from './utils/filters' // global filters
import PromiseHttp from './api/apiPath/index'
import vueImgAlart from './utils/directive/imgAlart/index'// 图片弹窗指令
import VueClipboard from 'vue-clipboard2' // 复制插件
// import './permission' // 全局路由守卫
// 解决低版本浏览器不支持es6
Es6Promise.polyfill()

Vue.use(vueImgAlart)
Vue.use(VueClipboard)

Vue.prototype.$http = PromiseHttp
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
