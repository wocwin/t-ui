<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition ref="queryCondition" :opts="opts" @submit="conditionEnter" />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
import moment from 'moment'
const ADDRESS_TYPES = [
  {
    label: '前纺一车间',
    key: 'W1'
  },
  {
    label: '前纺二车间',
    key: 'W2'
  },
  {
    label: '前纺三车间',
    key: 'W3'
  }
]
const ADDRESS_TYPES1 = [
  {
    name: '前纺一车间',
    id: 'W1'
  },
  {
    name: '前纺二车间',
    id: 'W2'
  },
  {
    name: '前纺三车间',
    id: 'W3'
  },
  {
    name: '前纺四车间',
    id: 'W4'
  }
]
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
        date: null
      }
    }
  },
  computed: {
    opts() {
      return {
        workshopNum1: {
          label: 't-select单选',
          comp: 't-select',
          defaultVal: 'W1',
          bind: {
            optionSource: ADDRESS_TYPES
          }
        },
        workshopNum: {
          label: 't-select多选',
          comp: 't-select',
          span: 2,
          bind: {
            multiple: true,
            optionSource: ADDRESS_TYPES1,
            valueKey: 'id',
            labelKey: 'name'
          }
        },
        date1: {
          label: '日期',
          comp: 'el-date-picker',
          bind: {
            valueFormat: 'yyyy-MM-dd'
          }
        },
        date: {
          label: '日期范围',
          comp: 'el-date-picker',
          span: 2,
          defaultVal: [moment().add(-1, 'days').format('yyyy-MM-DD'), moment().format('yyyy-MM-DD')],
          bind: {
            type: 'daterange',
            rangeSeparator: '-',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            valueFormat: 'yyyy-MM-dd'
          }
        },
        likeCargoNo: {
          label: '货源编号',
          comp: 'el-input'
        },
        likeBookNo: {
          label: '订单编号',
          comp: 'el-input'
        },
        likeTransportNo: {
          label: '运单编号',
          comp: 'el-input'
        },
        likeCargoName: {
          label: '货品名称',
          comp: 'el-input'
        }
      }
    },
    // 查询条件所需参数
    getQueryData() {
      const { likeCargoNo, likeBookNo, likeTransportNo, likeCargoName, workshopNum, workshopNum1, date1, date } = this.queryData
      return {
        likeCargoNo,
        likeBookNo,
        likeTransportNo,
        likeCargoName,
        workshopNum,
        workshopNum1,
        date1,
        beginDate: date[0] ? date[0] : null,
        endDate: date[1] ? date[1] : null
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
