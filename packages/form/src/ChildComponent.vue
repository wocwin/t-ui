<template>
  <component
    :is="item.comp"
    v-bind="typeof item.bind == 'function' ? bind(form.formData) : {clearable:true,filterable:true,...item.bind}"
    :placeholder="item.placeholder||getPlaceholder(item)"
    :type="item.comp==='el-input'?item.type||'input':item.type||item.bind.type"
    @change="handleEvent(item.event, form.formData[item.value],item)"
    v-on="cEvent(item)"
    v-model="form.formData[item.value]"
  >
    <!-- 前置文本 -->
    <template #prepend v-if="item.prepend">{{ item.prepend }}</template>
    <!-- 后置文本 -->
    <template #append v-if="item.append">{{ item.append }}</template>
    <!-- 子组件自定义插槽 -->
    <template v-if="item.childSlotName">
      <slot :name="item.childSlotName"></slot>
    </template>
    <!-- <child-component v-for="(cOpt, i) in child" :key="i" v-bind="cOpt" :value="cOpt.value" /> -->
    <child-component
      v-else
      :is="compChildName(item)"
      v-for="(value, key, index) in selectListType(item)"
      :key="index"
      :disabled="value.disabled"
      :label="compChildLabel(item,value)"
      :value="compChildValue(item,value,key)"
    >{{compChildShowLabel(item,value)}}</child-component>
  </component>
</template>
<script>
export default {
  name: 'ChildComponent',
  props: {
    dataIndex: {
      type: String,
      default: ''
    },
    form: {
      type: Object,
      default: () => ({})
    },
    item: {
      type: Object,
      default: () => ({})
    },
    bind: {
      type: [Object, Function]
    },
    comp: {
      type: [String, Object],
      default: ''
    },
    childList: {
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
      return ({ eventHandle }) => {
        let event = { ...eventHandle }
        let changeEvent = {}
        Object.keys(event).forEach(v => {
          changeEvent[v] = (e) => {
            if (e) {
              event[v] && event[v](e, this.form, arguments)
            } else {
              event[v] && event[v](this.form, arguments)
            }
          }
        })
        return { ...changeEvent }
      }
    },
    selectListType() {
      return ({ list }) => {
        if (this.form.listTypeInfo) {
          return this.form.listTypeInfo[list]
        } else {
          return []
        }
      }
    },
    // 子组件名称
    compChildName() {
      return ({ type }) => {
        switch (type) {
          case 'checkbox':
            return 'el-checkbox'
          case 'radio':
            return 'el-radio'
          case 'select-arr':
          case 'select-obj':
            return 'el-option'
        }
      }
    },
    // 子子组件label
    compChildLabel() {
      return ({ type, arrLabel }, value) => {
        switch (type) {
          case 'radio':
          case 'checkbox':
            return value.value
          case 'el-select-multiple':
          case 'select-arr':
            return value[arrLabel || 'dictLabel']
          case 'select-obj':
            return value
        }
      }
    },
    // 子子组件value
    compChildValue() {
      return ({ type, arrKey }, value, key) => {
        switch (type) {
          case 'radio':
          case 'checkbox':
            return value.value
          case 'el-select-multiple':
          case 'select-arr':
            return value[arrKey || 'dictValue']
          case 'select-obj':
            return key
        }
      }
    },
    // 子子组件文字展示
    compChildShowLabel() {
      return ({ type, arrLabel }, value) => {
        switch (type) {
          case 'radio':
          case 'checkbox':
            return value.label
          case 'el-select-multiple':
          case 'select-arr':
            return value[arrLabel || 'dictLabel']
          case 'select-obj':
            return value
        }
      }
    }
    // cEvent() {
    //   let event = { ...this.event }
    //   let changeEvent = {}
    //   if (this.changeEvent) {
    //     changeEvent[this.changeEvent] = (v) => {
    //       event[this.changeEvent] && event[this.changeEvent](v, arguments)
    //       this.$emit('change', v, this.dataIndex, arguments)
    //     }
    //   }
    //   return { ...event, ...changeEvent }
    // }
  },
  methods: {
    // 得到placeholder的显示
    getPlaceholder(row) {
      // console.log(222, row, form)
      let placeholder
      if (typeof row.comp === 'string' && row.comp) {
        if (row.comp.includes('input')) {
          placeholder = '请输入' + row.label
        } else if (row.comp.includes('select') || row.comp.includes('date') || row.comp.includes('cascader')) {
          placeholder = '请选择' + row.label
        } else {
          placeholder = row.label
        }
      }
      return placeholder
    },
    // 绑定的相关事件
    handleEvent(type, val, item) {
      // console.log('组件', type, val, item)
      this.$emit('handleEvent', type, val, item)
    }
  }
}
</script>
