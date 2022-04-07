<template>
  <t-layout-page class="inventory_query">
    <t-layout-page-item>
      <t-query-condition
        labelWidth="110px"
        :loading="loading"
        :opts="opts"
        @submit="conditionEnter"
      />
    </t-layout-page-item>
    <t-layout-page-item>
      <t-table
        isCopy
        title="盘点单查询"
        :table="table"
        :columns="table.columns"
        @size-change="handlesSizeChange"
        @page-change="handlesCurrentChange"
      >
        <!-- 表格外按钮toolbar插槽 -->
        <template #toolbar>
          <el-button size="small" type="primary" @click="exportExcel">导出</el-button>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
import data from './data.json'
export default {
  name: 'InventoryListQuery',
  data () {
    return {
      loading: false,
      // 查询条件
      queryData: {
        workshopId: null, // 车间
        stocktakeType: null, // 盘点类型
        stocktakeJobStatus: null, // 状态
        warehouseCode: null, // 仓库编码
        warehouseName: null, // 仓库名称
        stocktakePlanNo: null, // 盘点编号
        planDate: null // 计划盘点日期
      },
      table: {
        total: 20,
        currentPage: 1,
        pageSize: 10,
        data: [

        ],
        // 表格内操作列
        operator: [
          {
            text: '查看',
            fun: this.viewDetail
          }
        ],
        // 操作列样式
        operatorConfig: {
          fixed: 'right', // 固定列表右边（left则固定在左边）
          width: 120,
          label: '操作'
        },
        columns: [
          { prop: 'stocktakePlanNo', label: '盘点单编号', minWidth: '140' },
          { prop: 'workshopWarehouse', label: '车间仓库', minWidth: '200' },
          { prop: 'stocktakeJobStatusLabel', label: '盘点单状态', minWidth: '160' },
          { prop: 'stocktakeDetailNum', label: '盘点物料个数', minWidth: '120' },
          { prop: 'planStocktakeDate', label: '计划盘点日期', minWidth: '150' },
          { prop: 'stocktakeTypeLabel', label: '盘点类型', minWidth: '140' },
          { prop: 'infoMessage', label: '发起信息', minWidth: '180' },
          { prop: 'planStocktakeUserName', label: '预设盘点负责人', minWidth: '150' },
          { prop: 'currentDealRemark', label: '备注', minWidth: '190' }
        ]
      },
      workshopList: [], // 车间
      stockTakeTypeList: [], // 盘点类型
      stockTakeJobStatusList: [], // 状态
    }
  },
  computed: {
    opts () {
      return {
        workshopId: {
          label: '车间',
          comp: 'el-select',
          changeEvent: 'change',
          // defaultVal: '',
          child: this.workshopList.reduce((acc, cur) => {
            acc.push({
              comp: 'el-option',
              value: cur.id,
              bind: {
                label: cur.label,
                key: cur.id
              }
            })
            return acc
          }, [])
        },
        stocktakeType: {
          label: '盘点类型',
          comp: 'el-select',
          changeEvent: 'change',
          // defaultVal: '',
          child: this.stockTakeTypeList.reduce((acc, cur) => {
            acc.push({
              comp: 'el-option',
              value: cur.id,
              bind: {
                label: cur.label,
                key: cur.id
              }
            })
            return acc
          }, [])
        },
        stocktakeJobStatus: {
          label: '状态',
          comp: 'el-select',
          changeEvent: 'change',
          // defaultVal: '',
          child: this.stockTakeJobStatusList.reduce((acc, cur) => {
            acc.push({
              comp: 'el-option',
              value: cur.id,
              bind: {
                label: cur.label,
                key: cur.id
              }
            })
            return acc
          }, [])
        },
        warehouseCode: {
          label: '仓库编码',
          comp: 'el-input'
        },
        warehouseName: {
          label: '仓库名称',
          comp: 'el-input'
        },
        stocktakePlanNo: {
          label: '盘点编号',
          comp: 'el-input'
        },
        planDate: {
          label: '计划盘点日期',
          comp: 'el-date-picker',
          span: 2,
          // changeEvent: 'change',
          bind: {
            type: 'daterange',
            rangeSeparator: '-',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            valueFormat: 'yyyy-MM-dd'
          }
        },
      }
    },
    // 查询条件所需参数
    getQueryData () {
      const { workshopId, stocktakeType, stocktakeJobStatus, warehouseCode, warehouseName, stocktakePlanNo, planDate } = this.queryData
      return {
        workshopId,
        stocktakeType,
        stocktakeJobStatus,
        warehouseCode,
        warehouseName,
        stocktakePlanNo,
        stocktakeStartTime: planDate && planDate[0] ? planDate[0] : null,
        stocktakeEndTime: planDate && planDate[1] ? planDate[1] : null,
        lookType: 1,
      }
    }
  },
  created () {
    this.getStockTakeList()
  },
  // 方法
  methods: {
    // 获取列表数据
    async getStockTakeList () {
      this.loading = true
      const params = {
        ...this.getQueryData,
        pageNum: this.table.currentPage,
        pageSize: this.table.pageSize,
      }
      // const res = await this.$api.getStockTakeList(params)
      const res = await data
      // console.log('获取列表数据', this.getQueryData, res)
      if (res.success) {
        this.table.data = res.data.records
        this.table.total = res.data.total
      }
      // console.log(3333, this.table)
      this.loading = false
    },
    // 点击查询按钮
    conditionEnter (data) {
      console.log('点击查询按钮', data)
      setTimeout(() => {
        console.log('最终查询参数', this.getQueryData)
      }, 1000)
    },
    // 选择当前展示的总页码
    handlesSizeChange (val) {
      console.log('选择当前展示的总页码', val)
    },
    // 选择当前页码
    handlesCurrentChange (val) {
      console.log('选择当前页码', val)
    },
    // 表格点击查看
    viewDetail (val) {
      console.log('查看', val)
    },
    // 导出
    async exportExcel () {
      console.log('导出')
    },
  }
}
</script>
