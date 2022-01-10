import TPhone from './src'

/* istanbul ignore next */
TPhone.install = function (Vue) {
  Vue.component(TPhone.name, TPhone)
}

export default TPhone
