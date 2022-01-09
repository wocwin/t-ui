<template>
  <div class="t-date-picker">
    <div class="flex-box" v-if="dispaysType === 'two'">
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
      <div class="flex-box flex-ver" style="padding: 0 5px">-</div>
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
    <div v-if="dispaysType === 'one'">
      <el-date-picker
        :type="mergeType"
        range-separator="至"
        :value-format="valueFormat"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        v-bind="$attrs"
        v-on="$listeners"
        v-model="time"
        @change="timeChange"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TDatePicker',
  data () {
    return {
      time: this.dateVal,
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
    dateVal: {
      type: [String, Date, Array]
    },
    plusTime: { // 日期是否显示时分秒
      type: Boolean,
      default: false
    },
    pickerType: {
      type: String,
      default: 'date'
    },
    // 合并类型
    mergeType: {
      type: String,
      default: 'daterange'
    },
    dispaysType: {
      type: String,
      default: 'one'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    pickerOptions: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    startDate (val) {
      this.startTime = val
      if (!val) this.time = ''
    },
    endDate (val) {
      this.endTime = val
      if (!val) this.time = ''
    },
    dateVal (val) {
      this.time = val
    }
  },
  computed: {
    // initTime () {
    //   let arry = []
    //   arry[0] = this.startTime
    //   arry[1] = this.endTime
    //   return arry
    // }
  },
  mounted () {
    // let arry = []
    // arry[0] = this.startTime
    // arry[1] = this.endTime
    // this.time = arry
  },
  methods: {
    // 开始时间配置
    startTimeConfig () {
      let self = this
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
      let self = this
      return {
        disabledDate (time) {
          if (self.startTime) {
            return new Date(self.startTime).getTime() - 24 * 60 * 60 * 1000 >= time.getTime()
          }
        }
      }
    },
    startTimeChange (val) {
      let startTime = val
      if (this.plusTime && startTime && startTime.length < 11) {
        startTime = startTime + ' 00:00:00'
      }
      this.$emit('startChange', startTime)
    },
    endTimeChange (val) {
      let endTime = val
      if (this.plusTime && endTime && endTime.length < 11) {
        endTime = endTime + ' 23:59:59'
      }
      this.$emit('endChange', endTime)
    },
    timeChange (val) {
      if (val) {
        let startTime = val[0]
        if (this.plusTime && startTime.length < 11) {
          startTime = startTime + ' 00:00:00'
        }
        this.time[0] = startTime
        this.$emit('startChange', startTime)
        let endTime = val[1]
        if (this.plusTime && endTime.length < 11) {
          endTime = endTime + ' 23:59:59'
        }
        this.time[1] = endTime
        this.$emit('endChange', endTime)
      } else {
        this.$emit('startChange', '')
        this.$emit('endChange', '')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.t-date-picker {
  // line-height: 36px;
  .el-date-editor--date {
    width: 170px;
    // ::v-deep .el-input__inner {
    //   height: 36px;
    //   line-height: 36px;
    // }
  }
  .flex-ver {
    align-items: center;
    justify-content: center;
  }
}
.flex-box {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
</style>
