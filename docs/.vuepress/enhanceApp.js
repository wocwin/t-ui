// enhanceApp.js
import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import ElementUI from 'element-ui'
// import 'babel-polyfill'
// import Es6Promise from 'es6-promise'
import vueClipboard from 'vue-clipboard2'
import * as filters from './public/utils/filters' // global filters
import './public/utils/directive' // 自定义指令（拖拽）
import 'element-ui/lib/theme-chalk/index.css'
import '../.vuepress/public/css/index.scss'
// 解决低版本浏览器不支持es6
// Es6Promise.polyfill()

export default ({
  Vue,
}) => {
  Vue.use(VueHighlightJS),
    Vue.use(ElementUI),
    Vue.use(vueClipboard),
    // 过滤器
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key])
    })
}
