import TTreeTable from './src'

/* istanbul ignore next */
TTreeTable.install = function (Vue) {
  Vue.component(TTreeTable.name, TTreeTable)
}

export default TTreeTable
