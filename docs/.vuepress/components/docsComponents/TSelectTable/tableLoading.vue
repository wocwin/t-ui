<template>
  <t-layout-page>
    <t-layout-page-item style="display:flex;flex-direction: row;">
      <t-select-table
        :table="table"
        :columns="table.columns"
        :max-height="400"
        :keywords="{label:'materialCode',value:'id'}"
        @page-change="pageChange"
        @radioChange="radioChange"
        isShowPagination
        :tableLoading="tableLoading"
        loadingTxt="努力加载中..."
      >
        <template #toolbar>
          <el-button size="small" type="primary" @click="refresh">刷新</el-button>
        </template>
      </t-select-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
import data from './data.json'
import data1 from './data1.json'
export default {
  data() {
    return {
      tableLoading: false,
      table: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        data: [],
        columns: [
          { prop: 'factoryModelIdLabel', label: '工厂', minWidth: '100' },
          { prop: 'materialTypeLabel', label: '物料分类', minWidth: '80' },
          { prop: 'materialCode', label: '物料编码', minWidth: '100' },
          { prop: 'materialName', label: '物料名称', minWidth: '160' },
          { prop: 'materialSpecs', label: '规格', minWidth: '80' },
          { prop: 'power', label: '功率', minWidth: '80' },
          { prop: 'materialPropertyLabel', label: '物料属性', minWidth: '80' },
          { prop: 'baseUnit', label: '基本单位', minWidth: '80' },
          { prop: 'singleWeight', label: '单重', minWidth: '80' },
          { prop: 'shortRuleMore', label: '改余', minWidth: '80' },
          { prop: 'shortRuleLess', label: '改损', minWidth: '80' },
          { prop: 'materialSourceLabel', label: '数据来源', minWidth: '100' },
          { prop: 'updateTime', label: '最后更新日期', minWidth: '100' },
          { prop: 'updateBy', label: '最后更新人', minWidth: '100' }
        ],
      }
    };
  },
  created() {
    this.getList(1)
  },
  methods: {
    // 单选框
    radioChange(val) {
      console.log('单选--返回选中的数据', val)
    },
    // 获取当前的页码
    pageChange(val) {
      console.log('获取当前的页码', val)
      this.table.currentPage = val
      this.getList(this.table.currentPage)
    },
    async getList(pageNum) {
      this.tableLoading = true
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
      setTimeout(() => {
        this.tableLoading = false
      }, 3000)
    },
    // 刷新
    refresh() {
      this.getList(1)
    }
  }
}
</script>

<style></style>
