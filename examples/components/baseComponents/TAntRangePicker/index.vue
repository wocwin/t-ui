<template>
  <div class="dh_range_picker">
    <component :is="startCompOpt.is" v-bind="startCompOpt.bind" v-on="startCompOpt.event" />
    <div class="icon">-</div>
    <component :is="endCompOpt.is" v-bind="endCompOpt.bind" v-on="endCompOpt.event" />
  </div>
</template>
<script>
import { DatePicker } from 'ant-design-vue'
import moment from 'moment'
export default {
  name: 'TAntRangePicker',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => [moment().startOf('days'), moment()]
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    },
    showTime: {
      type: [Boolean, Object],
      default: false
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    type: { // day 天、month 月、quarter 季度、year 年
      type: String,
      default: 'day'
    },
    langest: { // 最长范围限制，根据type分别限制天、月、季度、年
      type: [Boolean, Number],
      default: false
    },
    disabledRange: { // 日期初始可选范围
      type: Array,
      default: () => [false, false]
    },
    // 设置输入框为只读
    inputReadOnly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: [Array],
      default: () => ['开始时间', '结束时间']
    },
    getCalendarContainer: Function
  },
  data () {
    return {
      endOpen: false
    }
  },
  computed: {
    startCompOpt () {
      const { type, showTime, format, disabledStartDate, allowClear, value, handleStartOpenChange, dateStartChange, inputReadOnly, placeholder, getCalendarContainer } = this
      const opt = {
        bind: {
          format,
          disabledDate: disabledStartDate,
          allowClear,
          value: value[0],
          inputReadOnly,
          placeholder: placeholder[0],
          getCalendarContainer: getCalendarContainer || (() => document.body)
        },
        event: {
          openChange: handleStartOpenChange,
          change: dateStartChange
        }
      }
      switch (type) {
        case 'day':
          opt.is = DatePicker
          opt.bind.showTime = showTime
          break
        case 'month':
          opt.is = DatePicker.MonthPicker
          break
      }
      return opt
    },
    endCompOpt () {
      const { type, showTime, format, disabledEndDate, allowClear, value, handleEndOpenChange, dateEndChange, endOpen, inputReadOnly, placeholder, getCalendarContainer } = this
      const opt = {
        bind: {
          format,
          disabledDate: disabledEndDate,
          allowClear,
          value: value[1],
          open: endOpen,
          disabled: !value[0],
          inputReadOnly,
          placeholder: placeholder[1],
          getCalendarContainer: getCalendarContainer || (() => document.body)
        },
        event: {
          openChange: handleEndOpenChange,
          change: dateEndChange
        }
      }
      switch (type) {
        case 'day':
          opt.is = DatePicker
          opt.bind.showTime = showTime
          break
        case 'month':
          opt.is = DatePicker.MonthPicker
          break
      }
      return opt
    },
    lastOptionalDate () { // 结束日期可选的最后的时间
      return this.getLastOptionalDate()
    }
  },
  methods: {
    getLastOptionalDate (newVal = false) { // 获取可选的最后的时间
      const { disabledRange, langest, type, value } = this
      newVal = newVal || value
      let lastOptionalDate = false // 默认无限制
      if (langest && disabledRange[1]) { // 存在最长时长限制且存在结束日期禁用要求
        lastOptionalDate = moment(newVal[0]).add(langest - 1, type).valueOf() < moment(disabledRange[1]).endOf(type).valueOf() ? moment(newVal[0]).add(langest - 1, type) : disabledRange[1]
      } else if (langest && !disabledRange[1]) { // 存在最长时长限制且无结束日期禁用要求
        lastOptionalDate = moment(newVal[0]).add(langest - 1, type)
      } else if (!langest && disabledRange[1]) { // 不存在最长时长限制且有结束日期禁用要求
        lastOptionalDate = disabledRange[1]
      }
      return lastOptionalDate === false ? false : moment(lastOptionalDate).endOf(type)
    },
    disabledStartDate (current) {
      const { disabledRange, type } = this
      if (!current) {
        return false
      } else if ((!disabledRange[0] || current.valueOf() >= moment(disabledRange[0]).startOf(type).valueOf()) && (!disabledRange[1] || current.valueOf() <= moment(disabledRange[1]).endOf(type).valueOf())) {
        return false
      } else {
        return true
      }
    },
    disabledEndDate (current) {
      const { lastOptionalDate, type } = this
      if (!current) {
        return false
      } else if ((this.value[0] && current.valueOf() >= this.value[0].valueOf()) && (!lastOptionalDate || moment(current).startOf(type).valueOf() < lastOptionalDate.valueOf())) {
        return false
      } else {
        return true
      }
    },
    handleStartOpenChange (open) {
      this.$emit('openChange')
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange (open) {
      this.$emit('openChange')
      this.endOpen = open
    },
    dateStartChange (date) {
      const lastOptionalDate = this.getLastOptionalDate([date, this.value[1]])
      let endDate = this.value[1]
      if (this.value[1] && date.valueOf() > this.value[1].valueOf()) { // 选择开始时间大与当前结束时间
        endDate = date
      } else if (lastOptionalDate && endDate && endDate.valueOf() > lastOptionalDate.valueOf()) { // 选择开始时间大于可选的时间
        endDate = lastOptionalDate
      }
      this.$emit('change', this.getResult([
        date,
        endDate
      ]))
    },
    dateEndChange (date) {
      this.$emit('change', this.getResult([
        this.value[0],
        date
      ]))
    },
    getResult (val) { // 获取返回结果
      const { type, showTime } = this
      let result = [
        val[0] === null ? null : moment(val[0]),
        val[1] === null ? null : moment(val[1])
      ]
      if (type !== 'day' || !showTime) { // 只要不是天或不显示时间，则默认取当前类型的最开始和最后时间
        result = [
          val[0] === null ? null : moment(val[0]).startOf(type),
          val[1] === null ? null : moment(val[1]).endOf(type)
        ]
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
.dh_range_picker {
  display: flex;
  align-items: center;
  .icon {
    margin: 0 10px;
  }
}
</style>
