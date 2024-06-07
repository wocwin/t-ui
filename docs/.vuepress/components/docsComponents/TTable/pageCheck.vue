<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        :table="table"
        :columns="table.columns"
        @selection-change="selectionChange"
        @page-change="pageChange"
        :row-key="getRowKey"
        isShowPagination
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
import data from './data.json'
import data1 from './data1.json'
export default {
  data() {
    return {
      table: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        firstColumn: { type: 'selection', isPaging: true },
        data: [],
        columns: [
          { prop: 'factoryModelIdLabel', label: '工厂', minWidth: '180' },
          { prop: 'materialTypeLabel', label: '物料分类', minWidth: '80' },
          { prop: 'materialCode', label: '物料编码', minWidth: '100' },
          { prop: 'materialName', label: '物料名称', minWidth: '220' },
          { prop: 'materialSpecs', label: '规格', minWidth: '80' },
          { prop: 'power', label: '功率', minWidth: '80' },
          { prop: 'materialPropertyLabel', label: '物料属性', minWidth: '80' },
          { prop: 'baseUnit', label: '基本单位', minWidth: '80' },
          { prop: 'singleWeight', label: '单重', minWidth: '80' },
          { prop: 'shortRuleMore', label: '改余', minWidth: '80' },
          { prop: 'shortRuleLess', label: '改损', minWidth: '80' },
          { prop: 'materialSourceLabel', label: '数据来源', minWidth: '100' },
          { prop: 'updateTime', label: '最后更新日期', minWidth: '180' },
          { prop: 'updateBy', label: '最后更新人', minWidth: '100' }
        ],
      }
    }
  },
  created() {
    this.getList(1)
  },
  methods: {
    // 翻页选中的唯一值
    getRowKey(row) {
      return row.id
    },
    // 获取当前的页码
    pageChange(val) {
      console.log('获取当前的页码', val)
      this.table.currentPage = val
      this.getList(this.table.currentPage)
    },
    async getList(pageNum) {
      let res
      if (pageNum === 1) {
        res = await data
      } else {
        res = await data1
      }
      if (res.success) {
        // console.log('获取品名下拉数据', res.data)
        this.table.data = res.data.records
        this.table.total = res.data.total
      }
    },
    // 复选框选中
    selectionChange(val) {
      const chosenIds = val.map(item => item.id)
      console.log('翻页选中的所有值', chosenIds)
    }
  }
}
</script>
