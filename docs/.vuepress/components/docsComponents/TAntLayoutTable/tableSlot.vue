<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-ant-layout-table
        title="table插槽，默认table将不渲染"
        @paginationChange="handleTableChange"
        :pagination="pageOpt"
      >
        <!-- 表格外操作| -->
        <template #btn>
          <a-button type="primary" icon="plus">新增</a-button>
          <a-button type="primary" :disabled="selectedRowKeys.length === 0 ">重新处理</a-button>
          <a-button type="primary" :disabled="selectedRowKeys.length === 0 ">作废</a-button>
        </template>
        <template #table>
          <t-table
            columnSetting
            name="AntTableSlot"
            :table="table"
            :columns="TtableColumns"
            @selection-change="selectionChange"
          >
            <template #amount="{param}">{{param.row.amount|currencyFilter}}</template>
          </t-table>
        </template>
      </t-ant-layout-table>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  name: 'tableSlot',
  data () {
    return {
      table: {
        firstColumn: { type: 'selection' },
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
        ]
      },
      TtableColumns: [
        { prop: 'name', label: '姓名', minWidth: '100' },
        { prop: 'date', label: '日期', minWidth: '160' },
        { prop: 'address', label: '地址', minWidth: '220' },
        { prop: 'status', label: '状态', minWidth: '100', filters: { param: 'PROTOCOL_BUSS_TYPE' } },
        { prop: 'amount', label: '金额', minWidth: '160', slotName: 'amount' },
        { prop: 'address77', label: '地址77', minWidth: '220' },
        { prop: 'name1', label: '姓名1', minWidth: '100' },
        { prop: 'date22', label: '日期22', minWidth: '180' },
        { prop: 'address33', label: '地址33', minWidth: '220' },
        { prop: 'name44', label: '姓名44', minWidth: '100' },
        { prop: 'date55', label: '日期55', minWidth: '180' },
        { prop: 'address66', label: '地址66', minWidth: '220' }
      ],
      // 复选框选中项
      selectedRowKeys: [],
      // 分页器参数
      pageOpt: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  // 方法
  methods: {
    // 获取当前选择页数
    handleTableChange (val) {
      console.log(1212, val)
    },
    // 复选框选中
    selectionChange (val) {
      console.log('复选框选中值', val)
      this.selectedRowKeys = val
    }
  }
}
</script>
<style lang="scss">
.dh_grid_table {
  th,
  td {
    border: none;
    padding: 0;
  }
}
</style>
