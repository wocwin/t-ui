import TModuleForm from './src'

/* istanbul ignore next */
TModuleForm.install = function (Vue) {
  Vue.component(TModuleForm.name, TModuleForm)
}

export default TModuleForm
