import TQueryCondition from './src'

/* istanbul ignore next */
TQueryCondition.install = function (Vue) {
  Vue.component(TQueryCondition.name, TQueryCondition)
}

export default TQueryCondition
