<template>
  <component
    :is="configEdit.editComponent"
    v-model="model"
    :type="configEdit.type"
    :placeholder="getPlaceholder(configEdit)"
    @change="handleEvent(configEdit.event, model)"
    v-bind="{clearable:true,filterable:true,...configEdit.bind}"
    style="width: 100%"
  >
    <!-- 前置文本 -->
    <template #prepend v-if="configEdit.prepend">{{ configEdit.prepend }}</template>
    <!-- 后置文本 -->
    <template #append v-if="configEdit.append">{{ configEdit.append }}</template>
    <component
      :is="compChildName(configEdit)"
      v-for="(value, key, index) in listTypeInfo[configEdit.list]"
      :key="index"
      :disabled="value.disabled"
      :label="configEdit.type === 'select-obj'? value: configEdit.type === 'checkbox'? value.value: value[configEdit.arrLabel]"
      :value="configEdit.type === 'select-obj'? key : configEdit.type === 'checkbox' ? value.value : value[configEdit.arrKey]"
    >{{ configEdit.type === 'checkbox' ? value.label : configEdit.type === 'select-arr'?value[configEdit.arrLabel]:configEdit.type === 'select-obj' ? value :'' }}</component>
  </component>
</template>

<script>
export default {
  name: 'EditCell',
  components: {
  },
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
    value: {
      type: [String, Number, Object, Array]
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    // 子组件名称
    compChildName () {
      return ({ type }) => {
        switch (type) {
          case 'checkbox':
            return 'el-checkbox'
          case 'select-arr':
          case 'select-obj':
            return 'el-option'
        }
      }
    }
  },
  methods: {
    // 得到placeholder的显示
    getPlaceholder (row) {
      let placeholder
      // 请输入type
      const inputArr = ['input', 'textarea']
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
    },
    // 绑定的相关事件
    handleEvent (type, val) {
      // console.log('组件', type, val)
      this.$emit('handleEvent', type, val)
    }
  }
}
</script>
