<template>
  <component :is="comp" v-bind="bind" v-on="cEvent" :value="value">
    <OptComponent v-for="(cOpt, i) in child" :key="i" v-bind="cOpt" :value="cOpt.value" />
  </component>
</template>
<script>
export default {
  name: 'OptComponent',
  props: {
    dataIndex: {
      type: String,
      default: ''
    },
    bind: {
      type: Object,
      default: () => ({})
    },
    event: {
      type: Object,
      default: () => ({})
    },
    comp: {
      type: [String, Object],
      default: ''
    },
    child: {
      type: Array,
      default: () => ([])
    },
    value: {
      type: [String, Number, Array, Date],
      default: ''
    },
    changeEvent: {
      type: String,
      default: 'input'
    }
  },
  computed: {
    cEvent () {
      let event = { ...this.event }
      let changeEvent = {}
      if (this.changeEvent) {
        changeEvent[this.changeEvent] = (v) => {
          event[this.changeEvent] && event[this.changeEvent](v, arguments)
          this.$emit('change', v, this.dataIndex, arguments)
        }
      }
      return { ...event, ...changeEvent }
    }
  }
}
</script>
