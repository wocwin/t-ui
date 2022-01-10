import TRemark from './src'

/* istanbul ignore next */
TRemark.install = function (Vue) {
  Vue.component(TRemark.name, TRemark)
}

export default TRemark
