// enhanceApp.js
import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import ElementUI from 'element-ui'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import 'babel-polyfill'
// import Es6Promise from 'es6-promise'
// import Tui from '../../src/components/baseComponents/index.js'
import Tui from '../../packages'
import { message } from './public/utils/resetMessage' // 防止重复点击重复弹出message弹框
import vueClipboard from 'vue-clipboard2'
import * as filters from './public/utils/filters' // global filters
import './public/utils/directives' // 自定义指令
import 'element-ui/lib/theme-chalk/index.css'
import '../.vuepress/public/css/index.scss'
import moment from 'moment'
moment.suppressDeprecationWarnings = true // 去掉警告
// 解决低版本浏览器不支持es6
// Es6Promise.polyfill()

export default ({
  Vue,
}) => {
  Vue.use(VueHighlightJS),
    Vue.use(ElementUI),
    Vue.use(Antd),
    Vue.use(Tui),
    Vue.use(vueClipboard),
    Vue.prototype.$messageUpload = message,
    // 过滤器
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key])
    })
}
