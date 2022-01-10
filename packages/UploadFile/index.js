import UploadFile from './src'

/* istanbul ignore next */
UploadFile.install = function (Vue) {
  Vue.component(UploadFile.name, UploadFile)
}

export default UploadFile
