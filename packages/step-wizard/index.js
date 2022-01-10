import TStepWizard from './src'

/* istanbul ignore next */
TStepWizard.install = function (Vue) {
  Vue.component(TStepWizard.name, TStepWizard)
}

export default TStepWizard
