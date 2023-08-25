<template>
  <div class="query-data">
    <t-query-condition
      ref="queryCondition"
      labelWidth="140px"
      :opts="opts"
      @submit="conditionEnter"
    />
  </div>
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
      table: {
        data: [
          { id: 1, code: 1, name: '物料名称1', spec: '物料规格1', unitName: '吨' },
          { id: 2, code: 2, name: '物料名称2', spec: '物料规格2', unitName: '吨' },
          { id: 3, code: 3, name: '物料名称3', spec: '物料规格3', unitName: '吨' },
          { id: 4, code: 4, name: '物料名称4', spec: '物料规格4', unitName: '吨' },
          { id: 5, code: 5, name: '物料名称5', spec: '物料规格5', unitName: '吨' },
          { id: 6, code: 6, name: '物料名称6', spec: '物料规格6', unitName: '吨' },
          { id: 7, code: 7, name: '物料名称7', spec: '物料规格7', unitName: '吨' },
          { id: 8, code: 8, name: '物料名称8', spec: '物料规格8', unitName: '吨' },
          { id: 9, code: 9, name: '物料名称9', spec: '物料规格9', unitName: '吨' },
          { id: 10, code: 10, name: '物料名称10', spec: '物料规格10', unitName: '吨' },
          { id: 11, code: 11, name: '物料名称11', spec: '物料规格11', unitName: '吨' },
          { id: 12, code: 12, name: '物料名称12', spec: '物料规格12', unitName: '吨' },
          { id: 13, code: 13, name: '物料名称13', spec: '物料规格13', unitName: '吨' },
        ],
        columns: [
          { label: '物料编号', width: '100px', prop: 'code', align: 'left' },
          { label: '物料名称', width: '149px', prop: 'name' },
          { label: '规格', width: '149px', prop: 'spec' },
          { label: '单位', width: '110px', prop: 'unitName' },
          { label: '物料编号1', width: '149px', prop: 'code' },
          { label: '物料名称1', width: '149px', prop: 'name' },
          { label: '规格1', width: '149px', prop: 'spec' },
          { label: '单位1', width: '110px', prop: 'unitName' },
          { label: '物料编号11', width: '149px', prop: 'code' },
          { label: '物料名称11', width: '149px', prop: 'name' },
          { label: '规格11', width: '149px', prop: 'spec' },
          { label: '单位11', width: '110px', prop: 'unitName' },
          { label: '物料编号111', width: '149px', prop: 'code' },
          { label: '物料名称111', width: '149px', prop: 'name' },
          { label: '规格111', width: '149px', prop: 'spec' },
          { label: '单位111', width: '110px', prop: 'unitName' },
        ],
      },
      workshopNum2: '', // 下拉选择值
      queryData: {
        likeCargoNo: null,
        likeBookNo: null,
        likeTransportNo: null,
        likeCargoName: null,
        workshopNum: null,
        workshopNum1: null,
        workshopNum2: null,
        date1: null,
        date2: null,
        date: null
      }
    }
  },
  computed: {
    opts() {
      return {
        workshopNum2: {
          label: '下拉选择表格组件',
          comp: 't-select-table',
          span: 2,
          bind: {
            maxHeight: 400,
            keywords: { label: 'name', value: 'id' },
            table: this.table,
            columns: this.table.columns,
          },
          event: {
            radioChange: (val) => this.radioChange(val)
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
            labelKey: 'name',
          },
        },
        workshopNum1: {
          label: 't-select单选',
          comp: 't-select',
          defaultVal: 'W1',
          bind: {
            optionSource: ADDRESS_TYPES
          },
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
          comp: 'el-input',
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
          comp: 'el-input',
        },
      }
    },
    // 查询条件所需参数
    getQueryData() {
      const { likeCargoNo, likeBookNo, likeTransportNo, likeCargoName, workshopNum, workshopNum1, date1, date, workshopNum2 } = this.queryData
      return {
        likeCargoNo,
        likeBookNo,
        likeTransportNo,
        likeCargoName,
        workshopNum,
        workshopNum1,
        workshopNum2,
        date1,
        beginDate: date[0] ? date[0] : null,
        endDate: date[1] ? date[1] : null
      }
    }
  },
  // 方法
  methods: {
    radioChange(row) {
      console.log('下拉选择项', row)
      this.workshopNum2 = row.name
    },
    // 点击查询按钮
    conditionEnter(data) {
      console.log('查询条件', data)
      this.queryData = data
      this.queryData.workshopNum2 = this.workshopNum2
      console.log('最终条件', this.getQueryData)
    }
  }
}
</script>
