import TSearch from './src'

/* istanbul ignore next */
TSearch.install = function (Vue) {
  Vue.component(TSearch.name, TSearch)
}

export default TSearch
