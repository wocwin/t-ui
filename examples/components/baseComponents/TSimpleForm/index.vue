<template>
  <el-form
    class="t-form"
    ref="form"
    :class="className"
    :model="formData"
    :rules="rules"
    :label-width="labelWidth"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form-item
      v-for="(item, index) in getConfigList"
      :key="index"
      :prop="item.value"
      :label="item.label"
      :class="[item.className,{'render_label':item.labelRender},{'slot_label':item.slotName}]"
      :rules="item.rules"
      :style="{ width: `${100 / (item.widthSize || colSize)}%` }"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template #label v-if="item.labelRender">
        <render-comp :createElementFunc="item.labelRender" />
      </template>
      <template v-if="item.slotName">
        <slot :name="item.slotName"></slot>
      </template>
      <component
        v-else
        :is="item.comp"
        v-model="formData[item.value]"
        :type="item.type"
        :placeholder="getPlaceholder(item)"
        @change="handleEvent(item.event, formData[item.value])"
        v-bind="{clearable:true,filterable:true,...item.bind}"
        style="width: 100%"
      >
        <!-- 前置文本 -->
        <template #prepend v-if="item.prepend">{{ item.prepend }}</template>
        <!-- 后置文本 -->
        <template #append v-if="item.append">{{ item.append }}</template>
        <component
          :is="compChildName(item)"
          v-for="(value, key, index) in listTypeInfo[item.list]"
          :key="index"
          :disabled="value.disabled"
          :label="item.type === 'select-obj'? value: item.type === 'checkbox'? value.value: value[item.arrLabel]"
          :value="item.type === 'select-obj'? key : item.type === 'checkbox' ? value.value : value[item.arrKey]"
        >{{ item.type === 'checkbox' ? value.label : item.type === 'select-arr'?value[item.arrLabel]:item.type === 'select-obj' ? value :'' }}</component>
      </component>
    </el-form-item>
    <!-- 按钮 -->
    <div class="flex-box flex-ver t-margin-top-5" v-if="operatorList.length>0">
      <el-button
        v-for="val in getOperatorList"
        :key="val.label"
        @click="val.fun(val)"
        :type="val.type"
        :icon="val.icon"
        :size="val.size || 'medium'"
      >{{ val.label }}</el-button>
    </div>
  </el-form>
</template>

<script>
import RenderComp from './renderComp'
export default {
  name: 'TSimpleForm',
  components: {
    RenderComp
  },
  props: {
    // 自定义类名
    className: {
      type: String
    },
    // 表单提交数据
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 一行显示几个输入项;最大值4
    widthSize: {
      type: Number,
      default: 2,
      validator: (value) => {
        return value <= 4
      }
    },
    // 验证规则
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // label宽度
    labelWidth: {
      type: String,
      default: '120px'
    },
    // 表单渲染数据
    fieldList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 操作按钮list
    operatorList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // ref
    refObj: {
      type: Object
    },
    // 下拉选项数据
    listTypeInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
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
    },
    // 获取字段列表
    getConfigList () {
      return this.fieldList.filter(
        (item) =>
          !item.hasOwnProperty('show') ||
          (item.hasOwnProperty('show') && item.show)
      )
    },
    // 获取操作按钮
    getOperatorList () {
      return this.operatorList.filter(
        (item) =>
          !item.hasOwnProperty('show') ||
          (item.hasOwnProperty('show') && item.show)
      )
    }
  },
  data () {
    return {
      colSize: this.widthSize
    }
  },
  watch: {
    formData: {
      handler (val) {
        // 将form实例返回到父级
        this.$emit('update:refObj', this.$refs.form)
      },
      deep: true // 深度监听
    },
    widthSize (val) {
      if (val > 4) {
        this.$message.warning('widthSize值不能大于4！')
        this.colSize = 4
      } else {
        this.colSize = val
      }
    }
  },
  mounted () {
    // 将form实例返回到父级
    this.$emit('update:refObj', this.$refs.form)
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
      this.$emit('handleEvent', type, val)
    },
    // 重置表单
    resetFields () {
      return this.$refs.form.resetFields()
    },
    // 清空校验
    clearValidate () {
      return this.$refs.form.clearValidate()
    }
  }
}
</script>

<style lang="scss">
.t-form {
  .el-form-item {
    display: inline-block;
    width: 50%;
    .el-form-item__content {
      .el-input,
      .el-select,
      .el-date-editor,
      .el-textarea {
        width: 100%;
      }
      .el-input-number {
        .el-input {
          width: inherit;
        }
      }
    }
  }
  .t-margin-top-5 {
    margin-top: calc(5px);
  }
  .t-form-block {
    display: block;
    width: 100% !important;
    .el-form-item__content {
      .el-input,
      .el-select,
      .el-date-editor,
      .el-textarea {
        width: 100%;
      }
    }
  }
  .render_label {
    .el-form-item__label {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &::before {
        margin-top: 1px;
      }
    }
  }
  .label_render {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .slot_label {
    .el-form-item__content {
      // margin-left: 0 !important;
      label {
        min-width: 108px;
        color: #606266;
        text-align: right;
        margin-right: 12px;
      }
    }
  }
}
</style>
