<template>
  <div class="t-date-picker-demo">
    <t-layout sectionTitle="日期组件">
      <div class="content-main t-margin20">
        <div>基本模式</div>
        <t-date-picker
          :startDate="formDate.warnStartDate"
          :endDate="formDate.warnEndDate"
          @startChange="startChange"
          @endChange="endChange"
        ></t-date-picker>
        <div>含时分秒：需要配置plusTime</div>
        <t-date-picker
          plusTime
          :startDate="warnStartDate"
          :endDate="warnEndDate"
          @startChange="startChange1"
          @endChange="endChange2"
        ></t-date-picker>
        <div>默认显示日期</div>
        <t-date-picker
          :startDate="startDate"
          :endDate="endDate"
          @startChange="startChange3"
          @endChange="endChange4"
        ></t-date-picker>
      </div>
    </t-layout>
  </div>
</template>

<script>
import { dateFormatFilter } from '@/utils/filters'
export default {
  data () {
    return {
      formDate: {
        warnStartDate: '',
        warnEndDate: ''
      },
      warnStartDate: '',
      warnEndDate: '',
      startDate: dateFormatFilter(new Date((new Date().getTime() - 3600 * 1000 * 24 * 90))),
      endDate: dateFormatFilter(new Date())
    }
  },
  // 方法
  methods: {
    // 开始时间
    startChange (val) {
      console.log(111, val)
      this.formDate.warnStartDate = val
    },
    // 结束时间
    endChange (val) {
      this.formDate.warnEndDate = val
    },
    // 开始时间
    startChange1 (val) {
      console.log(111, val)
      this.warnStartDate = val
    },
    // 结束时间
    endChange2 (val) {
      this.warnEndDate = val
    },
    // 开始时间
    startChange3 (val) {
      console.log(111, val)
      this.startDate = val
    },
    // 结束时间
    endChange4 (val) {
      this.endDate = val
    }
  }
}
</script>
