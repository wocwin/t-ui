import TTreeSelect from './src'

/* istanbul ignore next */
TTreeSelect.install = function (Vue) {
  Vue.component(TTreeSelect.name, TTreeSelect)
}

export default TTreeSelect
