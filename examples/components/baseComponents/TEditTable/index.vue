<template>
  <div @click.stop class="ele-editable">
    <i class="el-icon-loading" v-show="isLoading"></i>
    <ele-editable-wrapper
      :customAttrs="customAttrs"
      :displayValue="displayValue"
      :emptyText="emptyText"
      :field="field"
      :inline="inline"
      :isEmpty="isEmpty"
      :newValue="newValue"
      :noWrapper="noWrapper"
      :rules="rulesWidthKey"
      :title="title"
      :type="type"
      @cancel="handleCancel"
      @submit="handleSubmit"
      v-show="!isLoading"
    >
      <component
        :computedValue="computedValue"
        :customAttrs="customAttrs"
        :displayValue="displayValue"
        :field="field"
        :is="componentName"
        :isError="isError"
        :noWrapper="noWrapper"
        :options="changedOptions"
        :title="title"
        :type="type"
        :value="value"
        @change="handleChange"
        @update="handleUpdate"
        ref="com"
      ></component>
    </ele-editable-wrapper>
  </div>
</template>

<script>
import EleEditableWrapper from './EleEditableWrapper'
import EleEditableUrl from './components/EleEditableUrl'
import EleEditableText from './components/EleEditableText'
import EleEditableTime from './components/EleEditableTime'
import EleEditableDate from './components/EleEditableDate'
import EleEditableInput from './components/EleEditableInput'
import EleEditableColor from './components/EleEditableColor'
import EleEditableRadio from './components/EleEditableRadio'
import EleEditableStatus from './components/EleEditableStatus'
import EleEditableSelect from './components/EleEditableSelect'
import EleEditableNumber from './components/EleEditableNumber'
import EleEditableSwitch from './components/EleEditableSwitch'
import EleEditableTimeText from './components/EleEditableTimeText'
import EleEditableDateText from './components/EleEditableDateText'
import EleEditableTextarea from './components/EleEditableTextarea'
import EleEditableDatetime from './components/EleEditableDatetime'
import EleEditableCheckbox from './components/EleEditableCheckbox'
// import EleEditableUploadImage from './components/EleEditableUploadImage'
import EleEditableDatetimeText from './components/EleEditableDatetimeText'
import Schema from 'async-validator'

export default {
  name: 'TEditTable',
  components: {
    EleEditableUrl,
    EleEditableText,
    EleEditableDate,
    EleEditableTime,
    EleEditableInput,
    EleEditableColor,
    EleEditableRadio,
    EleEditableSelect,
    EleEditableSwitch,
    EleEditableNumber,
    EleEditableStatus,
    EleEditableWrapper,
    EleEditableTimeText,
    EleEditableDateText,
    EleEditableTextarea,
    EleEditableDatetime,
    EleEditableCheckbox,
    // EleEditableUploadImage,
    EleEditableDatetimeText
  },
  props: {
    // 类型
    type: {
      type: String,
      default: 'text',
      required: true
    },
    // 字段
    field: {
      type: String,
      required: true
    },
    // 是否为行内
    inline: {
      type: Boolean,
      default: false
    },
    // 标题
    title: String,
    // 字段值
    value: [String, Number, Boolean, Array, Date],
    // 默认值
    defaultValue: {
      type: [String, Number, Boolean, Array, Date],
      default: null
    },
    // 选项
    options: {
      type: Array,
      default () {
        return []
      }
    },
    // 请求地址
    requestFn: Function,
    // 校检规则
    rules: [Array, Object],
    // 其他附带数据
    customData: Object,
    // 自定义属性
    customAttrs: Object,
    // 格式化显示数据
    displayFormatter: Function,
    // 对请求数据格式化
    valueFormatter: Function,
    // 组件是否需要包裹(用于自定义组件)
    isNoWrapper: {
      type: Boolean,
      default: false
    },
    // 值空时显示的文本
    emptyText: {
      type: String,
      default: '空'
    }
  },
  computed: {
    // 判断是否为空
    isEmpty () {
      return this.displayValue == null || this.displayValue === ''
    },
    // options 默认支持两种形式: ['xxx', 'xxx'] 和 [{ value: 'xxx', text: 'xxx' }]
    // 统一改为 [{ value: xxx, text: xxx }] 形式
    changedOptions () {
      return this.options.map(item => {
        if (typeof item === 'string') {
          return {
            text: item,
            value: item
          }
        } else {
          return item
        }
      })
    },
    // 子组件的名字
    childNames () {
      return this.$children.forEach((item) => item)
    },
    // 显示的值
    displayValue () {
      let value = this.computedValue
      // 自定义显示值
      if (this.displayFormatter) {
        value = this.displayFormatter(value)
      }

      if (this.options && this.options.length) {
        // 根据 value 从 option 中获取 text
        if (value instanceof Array) {
          const res = value.map(item => {
            return this.getTextFromOptions(item)
          })
          return res.join(',')
        } else {
          return this.getTextFromOptions(value)
        }
      } else {
        return value
      }
    },

    // 当值为空时, 看是否存在默认值
    computedValue () {
      return this.value == null || this.value === '' ? this.defaultValue : this.value
    },

    // 校检规则
    rulesWidthKey () {
      return { [this.field]: this.rules }
    },

    // 当前组件是否需要被包裹
    noWrapper () {
      return this.noWrapperNameArr.includes(this.type) || this.isNoWrapper === true
    },

    // 组件名称
    componentName () {
      if (this.builtInNames.includes(this.type)) {
        // 内置组件
        return 'ele-editable-' + this.type
      } else {
        // 外部组件
        return this.type
      }
    }
  },
  data () {
    return {
      // 请求是否出错
      isError: false,
      // 是否正在请求
      isLoading: false,
      // 新值
      newValue: '',
      // 不需要包裹的组件
      noWrapperNameArr: ['switch', 'status', 'date-text', 'time-text', 'datetime-text', 'text', 'url', 'image', 'color', 'upload-image'],
      // 所有内置组件
      builtInNames: ['text', 'image', 'url', 'time', 'date', 'datetime', 'input', 'select', 'radio', 'checkbox', 'textarea', 'switch', 'color', 'number', 'status', 'time-text', 'date-text', 'datetime-text', 'upload-image']
    }
  },
  methods: {
    // 从 options 中获取 value
    getTextFromOptions (value) {
      const options = this.changedOptions

      // 查找 value 对应的 option
      const option = options.find(option => option.value === value)

      // 判断是否查询到
      if (option && option.text) {
        return option.text
      } else {
        return value
      }
    },

    // 复制值
    cloneValue (value) {
      if (Object.prototype.toString.call(value) === '[object Object]') {
        // 对象格式
        return Object.assign({}, value)
      } else if (Array.isArray(value)) {
        // 数组形式
        return [...value]
      } else {
        // 其他值
        return value
      }
    },

    // 发送请求
    async handleChange (value) {
      if (!this.requestFn) {
        this.$notify.error({
          title: '参数错误',
          message: '未传递request-fn参数'
        })
        return
      }
      // 判断是否正在加载
      if (this.isLoading) return

      // 判断是否进行了更改
      if (value === this.value) return

      // 参数校检
      try {
        // 对值进行自定义处理
        value = this.cloneValue(value)
        if (this.valueFormatter) {
          value = this.valueFormatter(value)
        }

        // 参数校检
        await this.validateData(value, this.rules, this.field)
        try {
          // 发送请求
          const data = Object.assign({}, this.customData, { [this.field]: value })
          this.isLoading = true
          await this.requestFn(data)
          this.isError = false
          this.$message.success('更新成功')
          this.$emit('input', value)
        } catch (e) {
          this.isError = true
          this.$message.error('更新失败, 请重试')
        } finally {
          this.isLoading = false
        }
      } catch (errors) {
        // 验证规则校检结果展示
        errors.forEach(error => {
          this.$notify.error({
            title: '错误',
            message: error.message
          })
        })
      }
    },

    // 校检
    validateData (value, rules, field) {
      return new Promise((resolve, reject) => {
        if (rules) {
          // 添加上 key
          value = { [field]: value }

          const validator = new Schema(this.rulesWidthKey)
          validator.validate(value, (errors, fileds) => {
            if (errors) {
              reject(errors)
            } else {
              resolve()
            }
          })
        } else {
          resolve()
        }
      })
    },

    // 更新新值
    handleUpdate (value) {
      this.newValue = value
    },

    // 确认
    handleSubmit () {
      this.handleChange(this.newValue)
    },

    // 取消
    handleCancel () {
      this.$refs.com.setNewValue()
    }
  }
}
</script>

<style>
.ele-editable .el-form-item {
  margin-bottom: 0;
}

.ele-editable .el-icon-loading {
  font-size: 24px;
  color: #409eff;
  animation: rotating 1s linear infinite;
}

.ele-editable__empty {
  cursor: pointer;
  color: #f56c6c;
  font-style: italic;
  border-bottom: dashed 1px #409eff;
}

.ele-editable__edit {
  cursor: pointer;
  color: #409eff;
  border-bottom: dashed 1px #409eff;
}
</style>
