import TCascader from './src'

/* istanbul ignore next */
TCascader.install = function (Vue) {
  Vue.component(TCascader.name, TCascader)
}

export default TCascader
