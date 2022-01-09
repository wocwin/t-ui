<template>
  <div class="t-table">
    <div class="content-main">
      <h3>dome页面</h3>
      <div class="table-content-wrap">
        <t-table
          :table="table"
          :columns="columns"
          @size-change="handlesSizeChange"
          @page-change="handlesCurrentChange"
          :row-key="getRowKey"
          @selection-change="handlesSelectionChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoTable',
  data () {
    return {
      table: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        // 是否显示复选框或序列号
        firstColumn: { type: 'selection', isPaging: true },
        // 表格数据
        data: [
        ],

        // entId值为18时，文字变色
        changeColor: { key: 'entId', val: '18', txtStyle: '#ef473a' },
        // 表格内操作列
        operator: [
          {
            text: '复选框table',
            type: 'primary',
            fun: this.checkboxTable
          },
          {
            text: '授权',
            type: 'danger',
            fun: this.goAuthorize
          }
        ],
        // 表格内操作列样式
        operatorConfig: {
          fixed: 'right',
          minWidth: 200,
          label: '操作'
        }
      },
      // 表格标题
      columns: [
        { prop: 'userName', label: '用户名', minWidth: '200', sort: true },
        { prop: 'loginName', label: '登录名', minWidth: '200', sort: true },
        { prop: 'dataStatus', label: '状态', minWidth: '160', sort: true, filters: { param: 'ROLE_STATUS' } },
        { prop: 'entName', label: '所属企业', minWidth: '200', sort: true }
      ],
      chosenIds: []
    }
  },
  created () {
    this.getEntUserInfo()
  },
  methods: {
    // 获取列表数据的唯一标识
    getRowKey (row) {
      return row.id
    },
    // 选中的数据
    handlesSelectionChange (val) {
      this.chosenIds = val.map(item => item.id)
      console.log(888, this.chosenIds)
    },
    // 请求接口
    async getEntUserInfo () {
      const tableParam = {
        cursor: this.table.currentPage,
        limit: this.table.pageSize,
        userName: this.searchValue
      }
      const res = await this.$http('getEntUserList', tableParam)
      if (res.status === 200) {
        this.table.total = res.result.total
        this.table.data = res.result.records
      }
    },
    checkboxTable (obj) {
      this.$router.push({ path: '/checkbox-table', query: { id: obj.id, entId: obj.entId } })
    },
    goAuthorize (obj) {
      console.log(222)
    },
    // 选择当前展示的总页码
    handlesSizeChange (val) {
      this.table.pageSize = val
      this.getEntUserInfo()
    },
    // 选择当前页码
    handlesCurrentChange (val) {
      this.table.currentPage = val
      this.getEntUserInfo()
    }
  }
}
</script>
