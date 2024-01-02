<template>
  <component
    :is="comp"
    v-bind="typeof bind == 'function' ? bind(form) : {clearable:true,filterable:true,...bind}"
    :placeholder="placeholder||getPlaceholder(opt)"
    :ref="comp === 't-select-table' ? `tselecttableref-${dataIndex}` : ''"
    v-on="cEvent"
    :value="value"
  >
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
    form: {
      type: Object,
      default: () => ({})
    },
    opt: {
      type: Object,
      default: () => ({})
    },
    bind: {
      type: [Object, Function]
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
    placeholder: {
      type: String
    },
    value: {
      type: [String, Number, Array, Date, Boolean],
      default: ''
    },
    changeEvent: {
      type: String,
      default: 'input'
    }
  },
  computed: {
    cEvent() {
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
  },
  methods: {
    // 清除下拉选择表格组件
    clearSelectTable() {
      // 获取所有的tselecttable ref
      const refList = Object.keys(this.$refs).filter((item) =>
        item.includes('tselecttableref')
      )
      if (refList.length > 0) {
        refList.map((val) => {
          this.$refs[val].clear()
        })
      }
    },
    // 得到placeholder的显示
    getPlaceholder(row) {
      // console.log(222, row, form)
      let placeholder
      if (typeof row.comp === 'string' && row.comp) {
        if (row.comp.includes('input')) {
          placeholder = '请输入' + row.label
        } else if (row.comp.includes('select') || row.comp.includes('date')) {
          placeholder = '请选择' + row.label
        } else {
          placeholder = row.label
        }
      }
      return placeholder
    }
  }
}
</script>
