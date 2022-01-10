<template>
  <el-form
    ref="form"
    class="t-form"
    :class="className"
    :model="formData"
    :rules="rules"
    :label-width="labelWidth"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form-item
      v-for="(item, index) in getConfigList()"
      :key="index"
      :prop="item.value"
      :label="item.label"
      :class="item.className"
      :rules="item.rules"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- solt -->
      <template v-if="item.type === 'slot'">
        <slot :name="'form-' + item.value" />
      </template>
      <!-- 普通输入框 -->
      <el-input
        v-if="item.type === 'input' || item.type === 'password'"
        v-model="formData[item.value]"
        :type="item.type"
        :disabled="item.disabled"
        :clearable="item.clearable === false ? item.clearable : true"
        :placeholder="getPlaceholder(item)"
        @change="handleEvent(item.event, formData[item.value])"
      >
        <!-- 前置文本 -->
        <template #prepend v-if="item.prepend">{{item.prepend}}</template>
        <!-- 后置文本 -->
        <template #append v-if="item.append">{{item.append}}</template>
      </el-input>
      <!-- 文本输入框 -->
      <el-input
        v-if="item.type === 'textarea'"
        v-model.trim="formData[item.value]"
        :type="item.type"
        :disabled="item.disabled"
        :placeholder="getPlaceholder(item)"
        :autosize="item.autosize || {minRows: 2, maxRows: 10}"
        @change="handleEvent(item.event, formData[item.value])"
      />
      <!-- 计数器 -->
      <el-input-number
        v-if="item.type === 'inputNumber'"
        v-model="formData[item.value]"
        size="small"
        :clearable="item.clearable === false ? item.clearable : true"
        :min="item.min"
        :max="item.max"
        @change="handleEvent(item.event, formData[item.value])"
      />
      <!-- 复选框 -->
      <el-checkbox-group
        class="flex-box"
        v-if="item.type === 'checkbox'"
        v-model="formData[item.value]"
        @change="handleEvent(item.event, formData[item.value])"
      >
        <el-checkbox
          v-for="val in listTypeInfo[item.list]"
          :key="val.value"
          :label="val.value"
          :disabled="val.disabled"
        >{{val.label}}</el-checkbox>
      </el-checkbox-group>
      <!-- 选择框数组 -->
      <el-select
        v-if="item.type === 'select'"
        v-model="formData[item.value]"
        :disabled="item.disabled"
        :clearable="item.clearable === false ? item.clearable : true"
        :filterable="item.filterable === false ? item.filterable : true"
        :placeholder="getPlaceholder(item)"
        @change="handleEvent(item.event, formData[item.value])"
        style="width:100%;"
      >
        <el-option
          v-for="(childItem, childIndex) in listTypeInfo[item.list]"
          :key="childIndex"
          :label="childItem[item.arrLabel]"
          :value="childItem[item.arrKey]"
        />
      </el-select>
      <!-- 选择框 对象-->
      <el-select
        v-if="item.type === 'select-obj'"
        v-model="formData[item.value]"
        :disabled="item.disabled"
        :clearable="item.clearable === false ? item.clearable : true"
        :filterable="item.filterable === false ? item.filterable : true"
        :placeholder="getPlaceholder(item)"
        @change="handleEvent(item.event, formData[item.value])"
        style="width:100%;"
      >
        <el-option
          v-for="(value, key ,index) in listTypeInfo[item.list]"
          :key="index"
          :label="value"
          :value="key"
        ></el-option>
      </el-select>
      <!-- 单个日期选择框 -->
      <el-date-picker
        v-if="item.type === 'date'"
        v-model="formData[item.value]"
        :type="item.dateType"
        :picker-options="item.TimePickerOptions"
        :clearable="item.clearable === false ? item.clearable : true"
        :disabled="item.disabled"
        :value-format="item.format||'yyyy-MM-dd'"
        :placeholder="getPlaceholder(item)"
        @change="handleEvent(item.event,$event,item.value)"
      />
      <!-- 开始——结束日期选择框 -->
      <t-date-picker
        v-if="item.type === 't-date'"
        :plusTime="item.plusTime === true ? item.plusTime : false"
        :clearable="item.clearable === false ? item.clearable : true"
        :dispaysType="item.dispaysType === 'two' ? item.dispaysType : 'one'"
        :startDate="formData[item.startDate]"
        :endDate="formData[item.endDate]"
        @startChange="handleEvent(item.event,$event,item.startDate)"
        @endChange="handleEvent(item.event,$event,item.endDate)"
      />
    </el-form-item>
    <!-- 按钮 -->
    <div class="flex-box flex-ver t-margin-top-5" v-if="isOperator">
      <el-button
        v-for="val in getOperatorList()"
        :key="val.label"
        @click="val.fun(val)"
        :type="val.type"
        :icon="val.icon"
        :size="val.size||'medium'"
      >{{val.label}}</el-button>
    </div>
  </el-form>
</template>

<script>
import TDatePicker from '../TDatePicker'
export default {
  name: 'TForm',
  components: { TDatePicker },
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
    // 表单渲染数据
    fieldList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 验证规则
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 操作按钮list
    operatorList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 下拉选项数据
    listTypeInfo: {
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
    // ref
    refObj: {
      type: Object
    },
    // 是否显示操作按钮
    isOperator: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  watch: {
    formData: {
      handler (val) {
        // 将form实例返回到父级
        this.$emit('update:refObj', this.$refs.form)
      },
      deep: true // 深度监听
    }
  },
  mounted () {
    // 将form实例返回到父级
    this.$emit('update:refObj', this.$refs.form)
  },
  methods: {
    // 获取字段列表
    getConfigList () {
      // eslint-disable-next-line no-prototype-builtins
      return this.fieldList.filter(item => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show))
    },
    // 获取操作按钮
    getOperatorList () {
      // eslint-disable-next-line no-prototype-builtins
      return this.operatorList.filter(item => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show))
    },
    // 得到placeholder的显示
    getPlaceholder (row) {
      let placeholder
      // 请输入type
      const inputArr = ['input', 'textarea']
      // 请选择type
      const selectArr = ['select', 'time', 'select-obj', 'date', 't-date']
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
    handleEvent (type, val, key) {
      this.$emit('handleEvent', type, val, key)
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
<style lang="scss" scoped>
// 自定义form相关
.t-form {
  .el-form-item {
    display: inline-block;
    width: 48%;
    .el-form-item__content {
      .el-input,
      .el-select,
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
    width: 100%;
    .el-form-item__content {
      .el-textarea {
        width: 100%;
      }
    }
  }
}
.t-form-block {
  .el-form-item {
    display: block;
    .el-form-item__content {
      .el-input,
      .el-select,
      .el-textarea {
        width: inherit;
      }
      .el-input-number {
        .el-input {
          width: inherit;
        }
      }
    }
  }
  .el-form-block {
    display: block;
    width: 100%;
    .el-form-item__content {
      .el-textarea {
        width: 100%;
      }
    }
  }
}
</style>
