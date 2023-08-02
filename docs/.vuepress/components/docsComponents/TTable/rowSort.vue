<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="行拖拽排序示例"
        :table="table"
        :columns="table.columns"
        isRowSort
        row-key="id"
        @rowSort="rowSort"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
export default {
  name: 'TtableRowSort',
  data() {
    return {
      table: {
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
        columns: [
          { prop: 'name', label: '姓名', minWidth: '100' },
          { prop: 'date', label: '日期', minWidth: '160' },
          { prop: 'address', label: '地址', minWidth: '220' },
          { prop: 'status', label: '状态', minWidth: '100' },
          { prop: 'amount', label: '金额', minWidth: '160' },
        ]
      }
    }
  },
  methods: {
    rowSort(list) {
      console.log('行拖拽后的数据---', list)
    }
  },
}
</script>
