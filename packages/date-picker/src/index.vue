<template>
  <div class="t-date-picker">
    <el-date-picker
      :type="type"
      v-model="time"
      :picker-options="dateOptions"
      @change="dateChange"
      v-bind="attrsBind"
    ></el-date-picker>
  </div>
</template>
<script>
export default {
  name: 'TDatePicker',
  data() {
    return {
      // time: this.value,
      dateOptions: this.pickerOptions
    }
  },
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    value: {
      type: [String, Date, Array]
    },
    // 日期范围是否显示00:00:00 23:59:59时分秒
    plusTime: {
      type: Boolean,
      default: false
    },
    // 时间类型
    /***
     * week周；month月；year年；dates多个日期；months多个月；years多个年；daterange日期范围；monthrange月份范围
     * datetime日期和时间点;datetimerange日期和时间点范围
     */
    type: {
      type: String,
      default: 'date'
    },
    // 快捷配置
    pickerOptions: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 是否开启快捷方式
    isPickerOptions: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    time: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    // 属性配置
    attrsBind() {
      const { type } = this
      let attrs = {}
      switch (type) {
        case 'date':
        case 'dates':
          attrs['value-format'] = 'yyyy-MM-dd'
          attrs['placeholder'] = '请选择日期'
          break
        case 'week':
          // attrs['value-format'] = 'yyyy - WW'
          attrs['format'] = 'yyyy 第 WW 周'
          attrs['placeholder'] = '请选择周'
          break
        case 'month':
        case 'months':
          attrs['value-format'] = 'yyyy-MM'
          attrs['format'] = 'yyyy-MM'
          attrs['placeholder'] = '请选择月'
          break
        case 'year':
        case 'years':
          attrs['value-format'] = 'yyyy'
          attrs['format'] = 'yyyy'
          attrs['placeholder'] = '请选择年'
          break
        /**
         * 日期范围
         */
        case 'daterange':
          attrs['value-format'] = 'yyyy-MM-dd'
          attrs['range-separator'] = '~'
          attrs['start-placeholder'] = '请选择开始日期'
          attrs['end-placeholder'] = '请选择结束日期'
          break
        case 'monthrange':
          attrs['value-format'] = 'yyyy-MM'
          attrs['range-separator'] = '~'
          attrs['start-placeholder'] = '请选择开始月份'
          attrs['end-placeholder'] = '请选择结束月份'
          break
        /**
         * 日期和时间点
         */
        case 'datetime':
          attrs['format'] = 'yyyy-MM-dd HH:mm:ss'
          attrs['value-format'] = 'yyyy-MM-dd HH:mm:ss'
          attrs['placeholder'] = '请选择日期时间'
          break
        case 'datetimerange':
          attrs['format'] = 'yyyy-MM-dd HH:mm:ss'
          attrs['value-format'] = 'yyyy-MM-dd HH:mm:ss'
          attrs['range-separator'] = '~'
          attrs['start-placeholder'] = '请选择开始日期'
          attrs['end-placeholder'] = '请选择结束日期'
          break
      }
      return {
        ...attrs,
        ...this.$attrs
      }
    }
  },
  watch: {
    value(val) {
      this.time = val
    },
    // 快捷配置
    pickerOptions(val) {
      const { type, isPickerOptions } = this
      if (isPickerOptions) {
        let shortcuts = this.getShortcuts(type)
        this.dateOptions = {
          shortcuts
        }
      } else {
        this.dateOptions = val
      }
    }
  },
  mounted() {
    const { type, isPickerOptions } = this
    if (isPickerOptions) {
      let shortcuts = this.getShortcuts(type)
      this.dateOptions = {
        shortcuts
      }
    }
  },
  methods: {
    // 获取快捷配置
    getShortcuts(type) {
      let shortcuts = []
      switch (type) {
        case 'date':
          shortcuts = [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
          break
        case 'daterange':
          shortcuts = [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
          break
        case 'monthrange':
          shortcuts = [{
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()])
            }
          }, {
            text: '今年至今',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().getFullYear(), 0)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setMonth(start.getMonth() - 6)
              picker.$emit('pick', [start, end])
            }
          }]
          break
        case 'datetime':
          shortcuts = [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
          break
        case 'datetimerange':
          shortcuts = [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
          break
      }
      return shortcuts
    },
    dateChange(val) {
      const { type } = this
      if (type === 'daterange' && val) {
        let startTime = val[0]
        let endTime = val[1]
        if (this.plusTime) {
          startTime = startTime + ' 00:00:00'
          endTime = endTime + ' 23:59:59'
        }
        this.time = [startTime, endTime]
        this.$emit('change', [startTime, endTime])
      } else {
        this.$emit('change', val)
      }
    }
  }
}
</script>
