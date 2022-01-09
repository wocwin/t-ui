import TUploadFile from './src'

/* istanbul ignore next */
TUploadFile.install = function (Vue) {
  Vue.component(TUploadFile.name, TUploadFile)
}

export default TUploadFile
