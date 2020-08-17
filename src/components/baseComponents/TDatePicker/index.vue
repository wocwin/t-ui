<template>
  <div class="t-date-picker flex-box">
    <el-date-picker
      v-model="startTime"
      :type="pickerType"
      class="date-pick"
      size="large"
      value-format="yyyy-MM-dd"
      :picker-options="startTimeConf"
      placeholder="开始日期"
      @change="startTimeChange"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-date-picker>
    <div class="flex-box flex-ver" style="padding:0 5px;">-</div>
    <el-date-picker
      v-model="endTime"
      :type="pickerType"
      class="date-pick"
      size="large"
      value-format="yyyy-MM-dd"
      :picker-options="endTimeConf"
      placeholder="结束日期"
      v-bind="$attrs"
      v-on="$listeners"
      @change="endTimeChange"
    ></el-date-picker>
  </div>
</template>
<script>
export default {
  name: 'TDatePicker',
  data () {
    return {
      startTime: this.startDate,
      endTime: this.endDate,
      startTimeConf: this.startTimeConfig(), // 开始时间配置
      endTimeConf: this.endTimeConfig() // 结束时间配置
    }
  },
  props: {
    startDate: {
      type: [String, Date]
    },
    endDate: {
      type: [String, Date]
    },
    plusTime: { // 日期是否显示时分秒
      type: Boolean,
      default: false
    },
    pickerType: {
      type: String,
      default: 'date'
    }
  },
  watch: {
    startDate (val) {
      this.startTime = val
    },
    endDate (val) {
      this.endTime = val
    }
  },
  methods: {
    // 开始时间配置
    startTimeConfig () {
      const self = this
      return {
        disabledDate (time) {
          if (self.endTime) {
            return new Date(self.endTime).getTime() <= time.getTime()
          }
        }
      }
    },
    // 结束时间配置
    endTimeConfig () {
      const self = this
      return {
        disabledDate (time) {
          if (self.startTime) {
            return new Date(self.startTime).getTime() - 24 * 60 * 60 * 1000 >= time.getTime()
          }
        }
      }
    },
    startTimeChange (val) {
      this.startTime = val
      if (this.plusTime && this.startTime && this.startTime.length < 11) {
        this.startTime = this.startTime + ' 00:00:00'
      }
      this.$emit('startChange', this.startTime)
    },
    endTimeChange (val) {
      this.endTime = val
      if (this.plusTime && this.endTime && this.endTime.length < 11) {
        this.endTime = this.endTime + ' 23:59:59'
      }
      this.$emit('endChange', this.endTime)
    }
  }
}
</script>
<style lang="scss">
.t-date-picker {
  .el-date-editor--date {
    width: 170px;
  }
}
</style>
