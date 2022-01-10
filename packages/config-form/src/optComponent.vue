<template>
  <component :is="comp" v-bind="bind" v-on="cEvent" :value="value || undefined">
    <opt-component
      v-for="(cOpt, i) in child"
      :key="i"
      v-bind="{...cOpt, dataIndex: dataIndex}"
      @child-change="onChildChange"
      :value="cOpt.value"
    >{{cOpt.text}}</opt-component>
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
    text: {
      type: String,
      default: ''
    },
    event: {
      type: Object,
      default: () => ({})
    },
    comp: {
      type: [String, Object, Function],
      default: ''
    },
    child: {
      type: Array,
      default: () => ([])
    },
    value: {
      type: [String, Number, Array, Object],
      default: undefined
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
          let value = v !== undefined && v !== null ? (v.target ? v.target.value : v) : null // select与其他组件的value位置不一致
          event[this.changeEvent] && event[this.changeEvent](value, arguments)
          this.$emit('child-change', value, this.dataIndex, arguments)
        }
        changeEvent['blur'] = (v) => {
          event['blur'] && event['blur'](v, arguments)
          this.$emit('blur', v)
        }
      }
      return { ...event, ...changeEvent }
    }
  },
  methods: {
    onChildChange (v) { // 嵌套父子组件双向绑定时，子组件需要层层触发child-change通知config-form数据变更
      this.$emit('child-change', v, this.dataIndex)
    }
  }
}
</script>
