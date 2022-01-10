<template>
  <div class="t-table" style="width:100%;">
    <t-table :table="table" :columns="columns" isCopy />
  </div>
</template>

<script>
export default {
  data () {
    return {
      table: {
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
            id: '3',
            date: '2019-09-27',
            name: '张三2',
            status: '3',
            address: '广东省广州市天河区3'
          }
        ]
      },
      columns: [
        { prop: 'name', label: '姓名', minWidth: '100', sort: true, noShowColumn: true },
        { prop: 'date', label: '日期', minWidth: '180', sort: true, noShowColumn: true },
        { prop: 'address', label: '地址', minWidth: '220', sort: true, noShowColumn: true },
        { prop: 'date', label: '日期', minWidth: '180', sort: true, noShowColumn: true },
        { prop: 'address', label: '地址', minWidth: '220', noShowColumn: true }
      ]
    }
  }
}
</script>
