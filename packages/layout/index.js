import TLayout from './src'

/* istanbul ignore next */
TLayout.install = function (Vue) {
  Vue.component(TLayout.name, TLayout)
}

export default TLayout
