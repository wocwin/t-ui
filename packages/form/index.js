import TForm from './src'

/* istanbul ignore next */
TForm.install = function (Vue) {
  Vue.component(TForm.name, TForm)
}

export default TForm
