<template>
  <div class="t-table" style="width:100%;">
    <t-table
      ref="tableCheckbox"
      columnSetting
      :table="table"
      :columns="columns"
      @selection-change="selectionChange"
      isShowPagination
    />
    <el-button type="danger" @click="cancelCheck">取消选中</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        firstColumn: { type: 'selection' },
        data: [
          {
            id: '1',
            date: '2019-09-25',
            name: '张三',
            status: '2',
            address: '广东省广州市天河区'
          },
          {
            id: '2',
            date: '2019-09-26',
            name: '张三1',
            status: '1',
            address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
          },
          {
            id: '2',
            date: '2019-09-26',
            name: '张三1',
            status: '1',
            address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
            canBatchAudit: false
          },
          {
            id: '2',
            date: '2019-09-26',
            name: '张三1',
            status: '1',
            address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
          }
        ]
      },
      columns: [
        { prop: 'name', label: '姓名', minWidth: '100', noShowColumn: true },
        { prop: 'date', label: '日期', minWidth: '180', noShowColumn: true },
        { prop: 'address', label: '地址', minWidth: '220', noShowColumn: true },
        { prop: 'date1', label: '日期', minWidth: '180', noShowColumn: true },
        { prop: 'address2', label: '地址', minWidth: '220', noShowColumn: true }
      ]
    }
  },
  mounted() {
    console.log('TTable实例的方法', this.$refs.tableCheckbox)
  },
  methods: {
    // 复选框选中
    selectionChange(val) {
      console.log('复选框选中值', val)
    },
    // 取消选中
    cancelCheck() {
      this.$refs.tableCheckbox.clearSelection()
    }
  }
}
</script>
