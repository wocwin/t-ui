<template>
  <div class="t-table" style="width:100%;">
    <t-table
      :table="table"
      :columns="columns"
      @selection-change="selectionChange"
      :row-key="getRowKey"
      isShowPagination
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      table: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        firstColumn: { type: 'selection', isPaging: true },
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
          }
        ]
      },
      columns: [
        { prop: 'name', label: '姓名', minWidth: '100', noShowColumn: true },
        { prop: 'date', label: '日期', minWidth: '180', noShowColumn: true },
        { prop: 'address', label: '地址', minWidth: '220', noShowColumn: true },
        { prop: 'date', label: '日期', minWidth: '180', noShowColumn: true },
        { prop: 'address', label: '地址', minWidth: '220', noShowColumn: true }
      ]
    }
  },
  methods: {
    // 翻页选中的唯一值
    getRowKey (row) {
      return row.id
    },
    // 复选框选中
    selectionChange (val) {
      const chosenIds = val.map(item => item.id)
      console.log('翻页选中的所有值', chosenIds)
    }
  }
}
</script>
