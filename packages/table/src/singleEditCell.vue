<template>
  <div class="single_edit_cell" :class="{'edit-enabled-cell': canEdit}">
    <!-- 编辑组件自定义插槽 -->
    <template v-if="configEdit.editSlotName">
      <slot />
    </template>
    <component
      v-if="!configEdit.editSlotName"
      :is="configEdit.editComponent||'el-input'"
      v-model="model"
      :type="configEdit.type"
      :placeholder="getPlaceholder(configEdit)"
      ref="parentCom"
      @change="handleEvent(configEdit.event, model,configEdit.editComponent)"
      :style="{width: configEdit.width||'100%'}"
      v-bind="{ clearable: true, filterable: true, ...this.configEdit.bind }"
      v-on="$listeners"
    >
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
  </div>
</template>

<script>
export default {
  name: 'SingleEditCell',
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
    // 是否显示tip
    isShowTips: {
      type: Boolean,
      default: true
    },
    // 是否开启编辑
    canEdit: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Object, Array, Date]
    }
  },
  data () {
    return {
      childCom: ['select-arr', 'checkbox', 'select-obj', 'el-select-multiple'],
      editMode: false,
      model: this.value
    }
  },
  computed: {
    // model: {
    //   get () {
    //     return this.value
    //   },
    //   set (val) {
    //     // console.log('model', val)
    //     this.$emit('input', val)
    //   }
    // },
    // 有子组件的返回值
    childVal: {
      get () {
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
      set (val) {
        // console.log('computed set', val)
        return val
      }
    },
    // 子组件名称
    compChildName () {
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
    compChildLabel () {
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
    compChildValue () {
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
    compChildShowLabel () {
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
      handler (val) {
        this.childVal = val
      },
      deep: true
    },
    model: {
      handler (val) {
        // console.log('model', val)
        this.model = val
      },
      deep: true
    }
  },
  methods: {
    // 点击外层开启编辑focus
    onFieldClick () {
      if (this.canEdit) {
        this.editMode = true
        this.$nextTick(() => {
          let parentRef = this.$refs.parentCom
          if (parentRef && parentRef.focus) {
            parentRef.focus()
          }
        })
      }
    },
    // 失焦事件
    onInputExit () {
      const elementArr = ['el-input-number', 'el-select']
      if (!(this.configEdit.editComponent && (elementArr.includes(this.configEdit.editComponent)))) {
        this.editMode = false
      }
    },
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
    handleEvent (type, val, editCom) {
      // console.log('组件', type, val, editCom)
      let changeCom = ['el-select', 'el-date-picker', 'el-input-number']
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
.edit-enabled-cell {
  min-height: 40px;
  line-height: 40px;
  cursor: pointer;
}
</style>
