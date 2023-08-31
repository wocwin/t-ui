<template>
  <component
    :is="isShowRules?'el-form-item':'div'"
    :prop="record.column.property"
    :rules="configEdit.rules"
    :class="[configEdit.className,'single_edit_cell']"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- 编辑组件自定义插槽 -->
    <template v-if="configEdit.editSlotName">
      <!-- <slot /> -->
      <slot :name="configEdit.editSlotName" :scope="record" />
    </template>
    <component
      v-if="!configEdit.editSlotName"
      :is="configEdit.editComponent||'el-input'"
      v-model="record.row[prop]"
      :type="configEdit.type"
      :placeholder="configEdit.placeholder||getPlaceholder(configEdit)"
      ref="parentCom"
      :class="prop"
      @change="()=>$emit('handleEvent',configEdit.event, record.row[prop],configEdit.editComponent)"
      @keyup.native="(event) => $emit('Keyup',event,record.$index, prop)"
      :style="{width: configEdit.width||'100%'}"
      v-bind="typeof this.configEdit.bind == 'function' ? this.configEdit.bind(record) : {clearable:true,filterable:true,...this.configEdit.bind}"
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
      <!-- 子组件自定义插槽 -->
      <!-- <template v-if="configEdit.childSlotName">
        <slot />
      </template>-->
      <component
        :is="compChildName(configEdit)"
        v-for="(value, key, index) in listTypeInfo[configEdit.list]"
        :key="index"
        :disabled="value.disabled"
        :label="compChildLabel(configEdit,value)"
        :value="compChildValue(configEdit,value,key)"
      >{{compChildShowLabel(configEdit,value)}}</component>
    </component>
  </component>
</template>

<script>
export default {
  name: 'SingleEditCell',
  props: {
    /** 编辑配置项说明
     * label: '爱好', // placeholder显示
     * editComponent: 'el-select', // 组件
     * type: 'select-arr', // option显示
     * list: 'hobbyList', // 下拉选择数据源
     * arrLabel: 'label', // 下拉选择中文显示
     * arrKey: 'value' // 下拉选择number显示（最终传后台）
     * bind:{} // 组件衍生属性（即第三方组件属性）
     * eventHandle:{} // 第三方组件事件
     */
    configEdit: {
      type: Object,
      default: () => ({})
    },
    // 下拉选择数据源
    listTypeInfo: {
      type: Object,
      default: () => ({})
    },
    // scope
    record: {
      type: Object,
      default: () => ({})
    },
    // 是否走表单验证（表头合并不校验）
    isShowRules: {
      type: Boolean,
      default: true
    },
    // 编辑的字段名
    prop: {
      type: String
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
.single_edit_cell {
  // min-height: 40px;
  // line-height: 40px;
  cursor: pointer;
}
</style>
