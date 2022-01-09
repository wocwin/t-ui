import TTable from './src'

/* istanbul ignore next */
TTable.install = function (Vue) {
  Vue.component(TTable.name, TTable)
}

export default TTable
