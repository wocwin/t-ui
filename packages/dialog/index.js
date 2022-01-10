import TDialog from './src'

/* istanbul ignore next */
TDialog.install = function (Vue) {
  Vue.component(TDialog.name, TDialog)
}

export default TDialog
