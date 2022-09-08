import TButton from './src'

/* istanbul ignore next */
TButton.install = function (Vue) {
  Vue.component(TButton.name, TButton)
}

export default TButton
