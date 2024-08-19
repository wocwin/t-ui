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
      <div :class="prop" @keyup="(event) => $emit('Keyup',event,record.$index, prop)">
        <slot :name="configEdit.editSlotName" :scope="record" />
      </div>
    </template>
    <template v-if="configEdit.isSelfCom">
      <component
        v-if="configEdit.editComponent === 't-select-table'"
        :ref="`tselecttableRef-${record.$index}-${prop}`"
        :is="configEdit.editComponent"
        :placeholder="configEdit.placeholder || getPlaceholder(configEdit)"
        v-bind="
          typeof configEdit.bind == 'function'
            ? configEdit.bind(record)
            : { clearable: true, filterable: true, ...configEdit.bind }
        "
        :style="{ width: configEdit.width || '100%' }"
        v-on="cEvent(configEdit, 't-select-table')"
      />
      <component
        v-else
        :is="configEdit.editComponent"
        v-model="record.row[prop]"
        :placeholder="configEdit.placeholder || getPlaceholder(configEdit)"
        v-bind="
          typeof configEdit.bind == 'function'
            ? configEdit.bind(record)
            : { clearable: true, filterable: true, ...configEdit.bind }
        "
        @change="()=>$emit('handleEvent',configEdit.event, record.row[prop],configEdit.editComponent)"
        :style="{ width: configEdit.width || '100%' }"
        v-on="cEvent(configEdit)"
      />
    </template>
    <component
      v-if="!configEdit.editSlotName && !configEdit.isSelfCom"
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
      return ({ eventHandle }, type = '') => {
        let event = { ...eventHandle }
        let changeEvent = {}
        Object.keys(event).forEach(v => {
          changeEvent[v] = (e, ids) => {
            if (type === 't-select-table') {
              const argument = {
                row: e,
                ids: ids,
                prop: this.prop,
                scope: this.record
              }
              event[v] && event[v](argument)
            } else {
              if (e) {
                event[v] && event[v](e, this.record, arguments)
              } else {
                event[v] && event[v](this.record, arguments)
              }
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
    },
    // 重置t-select-table
    resetTselectTableFields() {
      // 获取所有的t-select-table ref
      const refList = Object.keys(this.$refs).filter((item) =>
        item.includes('tselecttableRef')
      )
      if (refList.length > 0) {
        refList.forEach((item) => {
          this.$refs[item].clear()
        })
      }
    }
  }
}
</script>
<style lang="scss">
.single_edit_cell {
  cursor: pointer;
  .el-form-item__error {
    position: relative;
    text-align: left;
  }
}
</style>
