<template>
  <div @click="onFieldClick" class="single_edit_cell">
    <div class="cell-content" v-if="!editMode">
      <el-tooltip
        v-if="configEdit.isShowTips"
        class="item"
        v-bind="{
        effect:'light',
        content:'单击可编辑',
        placement:'top',
        ...configEdit.bind
        }"
      >
        <div v-if="childCom.includes(configEdit.type)">{{childVal}}&nbsp;</div>
        <div v-else>{{model}}&nbsp;</div>
        <slot name="content"></slot>
      </el-tooltip>
      <template v-else>
        <div v-if="childCom.includes(configEdit.type)">{{childVal}}&nbsp;</div>
        <div v-else>{{model}}&nbsp;</div>
        <slot name="content"></slot>
      </template>
    </div>
    <component
      v-if="editMode"
      :is="configEdit.editComponent||'el-input'"
      v-model="model"
      :type="configEdit.type"
      :placeholder="getPlaceholder(configEdit)"
      ref="parentCom"
      @change="handleEvent(configEdit.event, model,configEdit.editComponent)"
      @keyup.enter.native="onInputExit"
      @blur="onInputExit"
      v-bind="attrs"
      v-on="cEvent(configEdit)"
      style="width: 100%"
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
      <slot name="editChild" />
      <div v-if="!$slots.editChild">
        <component
          :is="compChildName(configEdit)"
          v-for="(value, key, index) in listTypeInfo[configEdit.list]"
          :key="index"
          :disabled="value.disabled"
          :label="compChildLabel(configEdit,value)"
          :value="compChildValue(configEdit,value,key)"
        >{{compChildShowLabel(configEdit,value)}}</component>
      </div>
    </component>
  </div>
</template>

<script>
export default {
  name: 'SingleEdit',
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
     * bind:{} // 组件衍生属性（即第三方组件属性）
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
    // 是否开启单击编辑
    isClickEdit: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Object, Array, Date]
    }
  },
  data() {
    return {
      childCom: ['select-arr', 'checkbox', 'select-obj', 'el-select-multiple'],
      editMode: false
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    attrs() {
      let attrObj = { clearable: true, filterable: true, ...this.configEdit.bind }
      if (this.configEdit.editComponent === 'el-input-number') {
        return { controls: false, ...attrObj }
      } else {
        return attrObj
      }
    },
    // 第三方组件事件
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
    // 有子组件的返回值
    childVal: {
      get() {
        let valLabel
        let checkboxVal = []
        let selcetMultiple = []
        this.listTypeInfo[this.configEdit.list] && this.listTypeInfo[this.configEdit.list].map((val, key) => {
          switch (this.configEdit.type) {
            case 'checkbox':
              if (this.model.join(',').includes(val.value)) {
                checkboxVal.push(val.label)
              }
              valLabel = checkboxVal.join(',')
              break
            case 'select-arr':
              // eslint-disable-next-line eqeqeq
              if (this.model == val[this.configEdit.arrKey]) {
                valLabel = val[this.configEdit.arrLabel]
              }
              break
            case 'el-select-multiple':
              // console.log('el-select-multiple', this.model)
              if (this.model && this.model.join(',').includes(val[this.configEdit.arrKey])) {
                selcetMultiple.push(val[this.configEdit.arrLabel])
              }
              valLabel = selcetMultiple.join(',')
              break
            case 'select-obj':
              valLabel = val
              break
          }
        })
        return valLabel
      },
      set(val) {
        console.log('computed set', val)
        return val
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
  watch: {
    childVal: {
      handler(val) {
        // console.log('9999--22', val, oldVal)
        this.childVal = val
      },
      deep: true
    }
  },
  methods: {
    // 点击外层开启编辑focus
    onFieldClick() {
      if (this.isClickEdit) {
        this.editMode = true
        this.$nextTick(() => {
          let parentRef = this.$refs.parentCom
          if (parentRef && parentRef.focus) {
            parentRef.focus()
          }
        })
      }
    },
    onInputExit() {
      if (this.configEdit?.type?.includes('multiple') || this.configEdit?.type?.includes('select')) {
        this.editMode = true
      } else {
        this.editMode = false
      }
    },
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
    // 绑定的相关事件
    handleEvent(type, val, editCom) {
      console.log('组件', type, val, editCom)
      let changeCom = ['el-select', 'el-date-picker']
      // select
      if (changeCom.includes(editCom)) {
        this.editMode = false
        this.$forceUpdate()
      }
      this.$emit('handleEvent', type, val)
    }
  }
}
</script>
<style lang="scss">
.single_edit_cell {
  cursor: pointer;
}
</style>
