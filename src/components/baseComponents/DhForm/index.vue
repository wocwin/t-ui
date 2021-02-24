<template>
  <el-form
    class="dh-form"
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
      :class="item.className"
      :rules="item.rules"
      :style="{ width: `${100 / (item.widthSize || widthSize)}%` }"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <component
        :is="item.comp"
        v-model="formData[item.value]"
        :type="item.type === 'date' ? item.dateType : item.type"
        :disabled="item.disabled"
        :clearable="item.clearable === false ? item.clearable : true"
        :filterable="item.filterable === false ? item.filterable : true"
        :picker-options="item.TimePickerOptions"
        :value-format="item.format || 'yyyy-MM-dd'"
        :startDate="formData[item.startDate]"
        :endDate="formData[item.endDate]"
        :plusTime="item.plusTime === false ? item.plusTime : true"
        @focus="(e) => e.target.select()"
        @startChange="handleEvent(item.event, $event, item.startDate)"
        @endChange="handleEvent(item.event, $event, item.endDate)"
        :placeholder="getPlaceholder(item)"
        :autosize="item.autosize || { minRows: 2, maxRows: 10 }"
        :min="item.min"
        :max="item.max"
        @change="handleEvent(item.event, formData[item.value])"
        v-bind="item.bind"
        style="width: 100%"
      >
        <!-- v-on="cEvent" -->
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
        >{{ item.type === 'checkbox' ? value.label : '' }}</component>
      </component>
    </el-form-item>
    <!-- 按钮 -->
    <div class="flex-box flex-ver t-margin-top-5" v-if="isOperator">
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
import TDatePicker from '../TDatePicker'
export default {
  name: 'DhForm',
  components: {
    TDatePicker
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
    // 一行显示几个输入项
    widthSize: {
      type: Number,
      default: 2
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
    // 是否显示操作按钮
    isOperator: {
      type: Boolean,
      default: true
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
    compChildName() {
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
    getConfigList() {
      return this.fieldList.filter(
        (item) =>
          !item.hasOwnProperty('show') ||
          (item.hasOwnProperty('show') && item.show)
      )
    },
    // 获取操作按钮
    getOperatorList() {
      return this.operatorList.filter(
        (item) =>
          !item.hasOwnProperty('show') ||
          (item.hasOwnProperty('show') && item.show)
      )
    }
  },
  data() {
    return {}
  },
  watch: {
    formData: {
      handler(val) {
        // 将form实例返回到父级
        this.$emit('update:refObj', this.$refs.form)
      },
      deep: true // 深度监听
    }
  },
  mounted() {
    // 将form实例返回到父级
    this.$emit('update:refObj', this.$refs.form)
  },
  methods: {
    // 得到placeholder的显示
    getPlaceholder(row) {
      let placeholder
      // 请输入type
      const inputArr = ['input', 'textarea']
      // 请选择type
      const selectArr = ['select-arr', 'time', 'select-obj', 'date', 't-date']
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
    handleEvent(type, val, key) {
      this.$emit('handleEvent', type, val, key)
    }
  }
}
</script>

<style lang="scss">
.dh-form {
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
}
</style>
