import dayjs from 'dayjs'

export default {
  // 不继承父组件隐式绑定的属性
  inheritAttrs: false,
  props: {
    // 类型
    type: {
      type: String,
      required: true
    },
    // 用于还原失败后newValue的值
    isError: Boolean,
    // 选项 (select, checkbox, radio)
    options: Array,
    // 弹窗标题
    title: String,
    // 自定义属性
    customAttrs: Object,
    // 原始值
    value: [String, Number, Boolean, Array, Date],
    // 计算后的值
    computedValue: [String, Number, Boolean, Array, Date],
    // 显示的值
    displayValue: [String, Number, Boolean, Array, Date],
    // 是否不需要包裹
    noWrapper: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    // 全局参数
    globalEditableParams () {
      return this.$EleEditableParams || {}
    },
    // 组件属性: 默认属性和自定义属性的融合
    attrs () {
      return Object.assign(
        {},
        this.globalEditableParams[this.type] || {},
        this.defaultAttrs || {},
        this.customAttrs
      )
    },
    format () {
      let format =
        this.attrs && this.attrs.format ? this.attrs.format : 'yyyy-MM-dd'
      format = format.replace(/Y/g, 'y')
      format = format.replace(/D/g, 'd')
      return format
    },
    showFormat () {
      let format =
        this.attrs && this.attrs.format ? this.attrs.format : 'yyyy-MM-dd'
      format = format.replace(/y/g, 'Y')
      format = format.replace(/d/g, 'D')
      return format
    }
  },
  data () {
    return {
      // 用于组件 v-model 绑定值
      newValue: this.computedValue
    }
  },
  watch: {
    // 检测是否出错, 出错后进行还原值
    isError (value) {
      if (value) {
        this.setNewValue()
      }
    },
    // 当检测到值变化时, 进行设置新值
    computedValue () {
      this.setNewValue()
    }
  },
  methods: {
    // 设置新值
    setNewValue () {
      this.newValue = this.computedValue
    },
    // 提交
    handleChange (value) {
      if (this.noWrapper) {
        this.$emit('change', value)
      } else {
        this.$emit('update', value)
      }
    },
    // 取消(还原值)
    handleCancel () {
      this.setNewValue()
    },
    // 日期和时间特殊处理
    setTimeNewValue () {
      const value =
        typeof this.computedValue === 'number'
          ? this.computedValue * 1000
          : this.computedValue
      if (dayjs(value).isValid()) {
        this.newValue = dayjs(value).format(this.showFormat)
      } else {
        this.newValue = value
      }
    },
    // 日期和时间特殊处理
    handleTimeChange (value) {
      if (value) {
        if (typeof this.value === 'number') {
          value = dayjs(value).unix()
        } else {
          if (dayjs(value).isValid()) {
            value = dayjs(value).format(this.showFormat)
          }
        }
      }
      this.handleChange(value)
    }
  },
  mounted () {
    // 初始化
    this.setNewValue()
  }
}
