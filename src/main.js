import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import './components/index.js'
import './assets/css/index.scss'
import * as filters from './utils/filters' // global filters
import PromiseHttp from './api/apiPath/index'

Es6Promise.polyfill()
Vue.config.productionTip = false

Vue.prototype.$http = PromiseHttp
// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
