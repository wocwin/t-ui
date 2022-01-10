import TSticky from './src'

/* istanbul ignore next */
TSticky.install = function (Vue) {
  Vue.component(TSticky.name, TSticky)
}

export default TSticky
