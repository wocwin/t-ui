<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        ref="queryCondition"
        :isShowOpen="false"
        :opts="opts"
        @submit="conditionEnter"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  name: 'queryData',
  data() {
    return {
      queryData: {
        likeCargoNo: null,
        likeBookNo: null,
        likeTransportNo: null,
        likeCargoName: null,
        workshopNum: null,
        workshopNum1: null,
        date1: null,
        date2: null,
        date3: null,
        date: null
      }
    }
  },
  computed: {
    opts() {
      return {
        workshopNum1: {
          label: '日期选择',
          comp: 't-date-picker',
          defaultVal: '2022-12-09'
        },
        likeCargoNo: {
          label: '周选择',
          comp: 't-date-picker',
          bind: {
            type: 'week'
          }
        },
        workshopNum: {
          label: '月份选择',
          comp: 't-date-picker',
          bind: {
            type: 'month'
          }
        },
        date1: {
          label: '年份选择',
          comp: 't-date-picker',
          bind: {
            type: 'year'
          }
        },
        date: {
          label: '日期范围',
          comp: 't-date-picker',
          span: 2,
          bind: {
            type: 'daterange'
          }
        },
        likeBookNo: {
          label: '日期范围时分秒',
          comp: 't-date-picker',
          span: 2,
          bind: {
            type: 'daterange',
            plusTime: true
          }
        },
        likeTransportNo: {
          label: '月份-快捷方式',
          comp: 't-date-picker',
          span: 2,
          bind: {
            type: 'monthrange',
            isPickerOptions: true
          }
        },
        likeCargoName: {
          label: '选择时间-快捷',
          comp: 't-date-picker',
          span: 2,
          bind: {
            type: 'datetime',
            isPickerOptions: true
          }
        },
        date2: {
          label: '时间范围-快捷',
          comp: 't-date-picker',
          span: 2,
          bind: {
            type: 'datetimerange',
            isPickerOptions: true
          }
        },
        date3: {
          label: '默认时间',
          comp: 't-date-picker',
          span: 2,
          bind: {
            type: 'datetimerange',
            isPickerOptions: true,
            'default-time': ['12:00:00', '08:00:00']
          }
        }
      }
    },
    // 查询条件所需参数
    getQueryData() {
      const { likeCargoNo, likeBookNo, likeTransportNo, likeCargoName, workshopNum, workshopNum1, date1, date, date2, date3 } = this.queryData
      return {
        likeCargoNo,
        likeBookNo,
        likeTransportNo,
        likeCargoName,
        workshopNum,
        workshopNum1,
        date1,
        date,
        date2,
        date3
      }
    }
  },
  // 方法
  methods: {
    // 点击查询按钮
    conditionEnter(data) {
      console.log('查询条件', data)
      this.queryData = data
      console.log('最终条件', this.getQueryData)
    }
  }
}
</script>
