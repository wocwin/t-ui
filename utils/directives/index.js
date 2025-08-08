import Vue from 'vue'

const modulesDirectives = require.context('./modules', true, /\.js$/)
const modules = modulesDirectives.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesDirectives(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
// console.log(33, modules)
const directives = {
  install (Vue) {
    Object.keys(modules).forEach(key => {
      // console.log(1212, key)
      Vue.directive(key, modules[key])
    })
  }
}
Vue.use(directives)
