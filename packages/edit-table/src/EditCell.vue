<template>
  <component
    :is="configEdit.editComponent"
    v-model="record.row[prop]"
    :type="configEdit.type"
    :placeholder="configEdit.placeholder||getPlaceholder(configEdit)"
    @change="()=>$emit('handleEvent',configEdit.event, record.row[prop],configEdit.editComponent)"
    :class="[configEdit.className,'edit_cell']"
    v-bind="typeof this.configEdit.bind == 'function' ? this.configEdit.bind(record) : {clearable:true,filterable:true,...this.configEdit.bind}"
    :style="{width: configEdit.width||'100%'}"
    v-on="cEvent(configEdit)"
  >
    <!-- 遍历子组件非作用域插槽，并对父组件暴露 -->
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <!-- 遍历子组件作用域插槽，并对父组件暴露 -->
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <!-- 前置文本 -->
    <template #prepend v-if="configEdit.prepend">{{ configEdit.prepend }}</template>
    <!-- 后置文本 -->
    <template #append v-if="configEdit.append">{{ configEdit.append }}</template>
    <component
      :is="compChildName(configEdit)"
      v-for="(value, key, index) in listTypeInfo[configEdit.list]"
      :key="index"
      :disabled="value.disabled"
      :label="compChildLabel(configEdit,value)"
      :value="compChildValue(configEdit,value,key)"
    >{{compChildShowLabel(configEdit,value)}}</component>
  </component>
</template>

<script>
export default {
  name: 'EditCell',
  props: {
    /** 编辑配置项说明
     * label: '爱好', // placeholder显示
     * editComponent: 'el-select', // 组件
     * type: 'select-arr', // option显示
     * list: 'hobbyList', // 下拉选择数据源
     * arrLabel: 'label', // 下拉选择中文显示
     * arrKey: 'value' // 下拉选择number显示（最终传后台）
     * bind:{} // 组件衍生属性
     */
    configEdit: {
      type: Object,
      default: () => ({})
    },
    listTypeInfo: {
      type: Object,
      default: () => ({})
    },
    // 编辑的字段名
    prop: {
      type: String
    },
    // scope
    record: {
      type: Object,
      default: () => ({})
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
              event[v] && event[v](e, this.record, arguments)
            } else {
              event[v] && event[v](this.record, arguments)
            }
          }
        })
        return { ...changeEvent }
      }
    },
    // 子组件名称
    compChildName() {
      return ({ type }) => {
        switch (type) {
          case 'checkbox':
            return 'el-checkbox'
          case 'el-select-multiple':
          case 'select-arr':
          case 'select-obj':
            return 'el-option'
        }
      }
    },
    // 子组件label
    compChildLabel() {
      return ({ type, arrLabel }, value) => {
        switch (type) {
          case 'checkbox':
            return value.label
          case 'el-select-multiple':
          case 'select-arr':
            return value[arrLabel]
          case 'select-obj':
            return value
        }
      }
    },
    // 子组件value
    compChildValue() {
      return ({ type, arrKey }, value, key) => {
        switch (type) {
          case 'checkbox':
            return value.value
          case 'el-select-multiple':
          case 'select-arr':
            return value[arrKey]
          case 'select-obj':
            return key
        }
      }
    },
    // 子组件文字展示
    compChildShowLabel() {
      return ({ type, arrLabel }, value) => {
        switch (type) {
          case 'checkbox':
            return value.label
          case 'el-select-multiple':
          case 'select-arr':
            return value[arrLabel]
          case 'select-obj':
            return value
        }
      }
    }
  },
  methods: {
    // 得到placeholder的显示
    getPlaceholder(row) {
      let placeholder
      // 请输入type
      const inputArr = ['input', 'textarea', 'el-input-number']
      // 请选择type
      const selectArr = ['select-arr', 'time', 'select-obj', 'date']
      if (inputArr.includes(row.type)) {
        placeholder = '请输入' + row.label
      } else if (selectArr.includes(row.type)) {
        placeholder = '请选择' + row.label
      } else {
        placeholder = row.label
      }
      return placeholder
    }
  }
}
</script>

<style lang="scss">
.edit_cell {
  cursor: pointer;
}
</style>
