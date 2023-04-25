<template>
  <t-adaptive-page
    :opts="opts"
    @submit="conditionEnter"
    title="工厂物料清单管理"
    isCopy
    :table="table"
    :columns="table.columns"
    :isShowPagination="isShowPagination"
    height="100%"
  >
    <!-- <template #querybar>
      <el-button>导出</el-button>
    </template>
    <template #toolbar>
      <el-button>新增</el-button>
    </template>-->
  </t-adaptive-page>
</template>
<script>
import tableData from './tableData.json'
export default {
  name: 'TTableMix',
  data() {
    return {
      queryData: {
        likeCargoNo: null,
        likeBookNo: null,
        likeTransportNo: null,
        likeCargoName: null,
        workshopNum: null,
        workshopNum1: null,
        date: null
      },
      isShowPagination: true, // 是否显示分页
      table: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        firstColumn: { type: 'index', label: '序列' },
        data: [],
        columns: [
          { prop: 'factoryModelIdLabel', label: '工厂', minWidth: '100' },
          { prop: 'materialTypeLabel', label: '物料分类', minWidth: '80' },
          { prop: 'erpCodeJoin', label: 'ERP物料编码', minWidth: '100' },
          { prop: 'materialCode', label: '物料编码', minWidth: '100' },
          { prop: 'materialName', label: '物料名称', minWidth: '160' },
          { prop: 'materialSpecs', label: '规格', minWidth: '80' },
          { prop: 'power', label: '功率', minWidth: '80' },
          {
            prop: 'enableStatusLabel',
            label: '状态',
            minWidth: '80',
            render: (text, record) => {
              return (
                <el-switch
                  active-value={1}
                  inactive-value={2}
                  v-model={record.enableStatus}
                  onChange={() => this.handleStatusChange(record)}
                >
                  {text}
                </el-switch>
              )
            }
          },
          { prop: 'materialPropertyLabel', label: '物料属性', minWidth: '80' },
          { prop: 'baseUnit', label: '基本单位', minWidth: '80' },
          { prop: 'singleWeight', label: '单重', minWidth: '80' },
          { prop: 'shortRuleMore', label: '改余', minWidth: '80' },
          { prop: 'shortRuleLess', label: '改损', minWidth: '80' },
          { prop: 'materialSourceLabel', label: '数据来源', minWidth: '100' },
          { prop: 'updateTime', label: '最后更新日期', minWidth: '100' },
          { prop: 'updateBy', label: '最后更新人', minWidth: '100' },
          { prop: 'shortRuleLess', label: '改损', minWidth: '80' },
          { prop: 'materialSourceLabel', label: '数据来源', minWidth: '100' },
          { prop: 'updateTime', label: '最后更新日期', minWidth: '100' },
          { prop: 'updateBy', label: '最后更新人', minWidth: '100' }
        ],
        operator: [
          {
            text: '查看',
            fun: this.viewDetail
          },
          {
            text: '编辑',
            fun: this.edit
          }
        ],
        // 操作列样式
        operatorConfig: {
          fixed: 'right', // 固定列表右边（left则固定在左边）
          width: 160,
          label: '操作'
        }
      },
      ADDRESS_TYPES: [
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
      ],
      ADDRESS_TYPES1: [
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
    }
  },
  computed: {
    opts() {
      return {
        workshopNum1: {
          label: 't-select单选',
          comp: 't-select',
          bind: {
            optionSource: this.ADDRESS_TYPES
          }
        },
        workshopNum: {
          label: 't-select多选',
          comp: 't-select',
          span: 2,
          bind: {
            multiple: true,
            optionSource: this.ADDRESS_TYPES1,
            valueKey: 'id',
            labelKey: 'name'
          }
        },
        date: {
          label: '日期范围',
          comp: 'el-date-picker',
          span: 2,
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
          // span: 2,
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
      const { likeCargoNo, likeBookNo, likeTransportNo, likeCargoName, workshopNum, workshopNum1, date } = this.queryData
      return {
        likeCargoNo,
        likeBookNo,
        likeTransportNo,
        likeCargoName,
        workshopNum,
        workshopNum1,
        beginDate: date[0] ? date[0] : null,
        endDate: date[1] ? date[1] : null
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取table数据
    async getData() {
      const res = await tableData
      if (res.success) {
        this.table.data = res.data.records
        this.table.total = res.data.total
      }
    },
    viewDetail(row) {
      console.log('点击table查看', row)
    },
    edit(row) {
      console.log('点击table编辑', row)
    },
    // 点击查询按钮
    conditionEnter(data) {
      console.log('查询条件', data)
      this.queryData = data
      console.log('最终条件', this.getQueryData)
    }
  }
}
</script>

