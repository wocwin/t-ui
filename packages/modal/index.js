import TAntModal from './src'
import TAntProtocol from './src/protocol.vue'

/* istanbul ignore next */
TAntModal.install = function (Vue) {
  Vue.component(TAntModal.name, TAntModal)
}

export {
  TAntModal,
  TAntProtocol
}
