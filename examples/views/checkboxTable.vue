<template>
  <div class="checkbox-table">
    <div class="content-main">
      <h3>复选框table页面</h3>
      <div class="table-content-wrap">
        <t-table
          :table="table"
          :columns="columns"
          @selection-change="selectionChange"
          @size-change="handlesSizeChange"
          @page-change="handlesCurrentChange"
          @sort-change="sortChange"
        >
          <template #toolbar></template>
        </t-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckboxTable',
  data () {
    return {
      table: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        // 是否显示复选框或序列号
        // firstColumn: { type: 'selection' },
        firstColumn: { type: 'index', label: '序列' },
        // 数据
        data: [
          {
            id: '1',
            date: '2019-09-25',
            name: '张三',
            status: '2',
            amount: 3000,
            address: '广东省广州市天河区'
          },
          {
            id: '2',
            date: '2019-09-26',
            name: '张三1',
            status: '2',
            amount: 2000,
            address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
          },
          {
            id: '3',
            date: '2019-09-27',
            name: '张三2',
            status: '3',
            amount: 4000,
            address: '广东省广州市天河区3'
          }
        ],
        // 表格外操作，选中表格某行，可以将其数据传出
        toolbar: [
          {
            text: '返回上一个页面',
            icon: 'el-icon-circle-plus-outline',
            type: 'danger',
            fun: this.getBack
          },
          {
            text: '返回上一个页面',
            icon: 'el-icon-circle-plus-outline',
            type: 'danger',
            fun: this.getBack
          },
          {
            text: '返回上一个页面',
            icon: 'el-icon-circle-plus-outline',
            type: 'danger',
            fun: this.getBack
          },
          {
            text: '返回上一个页面',
            icon: 'el-icon-circle-plus-outline',
            type: 'danger',
            fun: this.getBack
          }
        ],
        // 状态值为3时，文字变色
        changeColor: { key: 'status', val: '3', txtStyle: '#ef473a' },
        // 表格内操作列
        operator: [
          {
            text: '新增',
            type: 'primary',
            fun: this.add,
            // status为1或amount为2000时，不显示此按钮
            noshow: [{ key: 'status', val: ['1'] }, { key: 'amount', val: [2000] }]
          },
          {
            text: '编辑',
            type: 'danger',
            // status值为2时，展示此按钮
            show: { key: 'status', val: ['2'] },
            fun: this.edit
          },
          {
            text: '删除',
            fun: this.del
          }
        ],
        // 操作列样式
        operatorConfig: {
          fixed: 'right', // 固定列表右边（left则固定在左边）
          width: 280,
          label: '操作'
        }
      },
      // 标题
      columns: [
        { prop: 'name', label: '姓名', minWidth: '100', sort: true },
        { prop: 'date', label: '日期', minWidth: '160', sort: true },
        { prop: 'address', label: '地址', minWidth: '220', sort: true },
        { prop: 'status', label: '状态', minWidth: '100', sort: true, filters: { param: 'PROTOCOL_BUSS_TYPE' } },
        { prop: 'amount', label: '金额', minWidth: '160', sort: true, filters: { method: '￥' } },
        { prop: 'address', label: '地址', minWidth: '220' },
        { prop: 'name', label: '姓名', minWidth: '100' },
        { prop: 'date', label: '日期', minWidth: '180' },
        { prop: 'address', label: '地址', minWidth: '220' },
        { prop: 'name', label: '姓名', minWidth: '100' },
        { prop: 'date', label: '日期', minWidth: '180' },
        { prop: 'address', label: '地址', minWidth: '220' }
      ],
    }
  },
  created () {
    console.log('接收的参数', this.$route.query)
  },
  methods: {
    // 排序事件
    sortChange (val) {
      console.log(777, val)
    },
    // 复选框事件
    selectionChange (val) {
      console.log(11, val)
    },
    // 选择当前展示的总页码
    handlesSizeChange (val) {
      console.log('当前展示的总页码', val)
    },
    // 选择当前页码
    handlesCurrentChange (val) {
      console.log('当前展示的总页码', val)
    },
    // 返回上一个页面
    getBack (val) {
      console.log(333, val)
      this.$router.go(-1)
    },
    // 新增
    add (val) {
      console.log('新增', val)
    },
    // 编辑
    edit (val) {
      console.log('编辑', val)
    },
    // 删除
    del (val) {
      this.$confirm('是否永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除', val)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.checkbox-table {
  ::v-deep .toolbar {
    justify-content: flex-end;
  }
}
</style>
