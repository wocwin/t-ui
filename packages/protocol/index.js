import TProtocol from './src'

/* istanbul ignore next */
TProtocol.install = function (Vue) {
  Vue.component(TProtocol.name, TProtocol)
}

export default TProtocol
