<template>
  <component
    :is="show ? comp : ''"
    v-bind="typeof bind === 'function' ? bind(scope) : bind"
    v-on="event(scope)"
  >
    {{text}}
    <OptComponent
      v-for="(cOpt, i) in childOpt"
      :key="i"
      :slot="cOpt.slot"
      v-bind="cOpt"
      :scope="scope"
    />
  </component>
</template>
<script>
export default {
  name: 'OptComponent',
  props: {
    isShow: {
      type: [Function, Boolean],
      default: true
    },
    bind: {
      type: [Object, Function],
      default: () => ({})
    },
    text: {
      type: String,
      default: ''
    },
    event: {
      type: Function,
      default: () => { }
    },
    comp: {
      type: [String, Object],
      default: ''
    },
    scope: {
      type: Object,
      default: () => ({})
    },
    child: {
      type: [Array, Function],
      default: () => ([])
    }
  },
  computed: {
    show () {
      switch (typeof this.isShow) {
        case 'boolean':
          return this.isShow
        case 'function':
          return this.isShow(this.scope)
        default:
          return true
      }
    },
    childOpt () {
      return typeof this.child === 'function' ? this.child(this.scope) : this.child
    }
  }
}
</script>
