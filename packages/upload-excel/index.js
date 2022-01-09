import TUploadExcel from './src'

/* istanbul ignore next */
TUploadExcel.install = function (Vue) {
  Vue.component(TUploadExcel.name, TUploadExcel)
}

export default TUploadExcel
