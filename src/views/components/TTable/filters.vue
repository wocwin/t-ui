<template>
  <div class="t-table" style="width:100%;">
    <t-table :table="table" isCopy />
  </div>
</template>

<script>
export default {
  data () {
    return {
      table: {
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
        // 标题
        column: [
          { prop: 'name', label: '姓名', minWidth: '100' },
          { prop: 'date', label: '日期', minWidth: '160' },
          { prop: 'address', label: '地址', minWidth: '220' },
          { prop: 'status', label: '状态', minWidth: '100', filters: { param: 'PROTOCOL_BUSS_TYPE' } },
          { prop: 'amount', label: '金额', minWidth: '160', filters: { method: '￥' } },
          { prop: 'address', label: '地址', minWidth: '220' },
          { prop: 'name', label: '姓名', minWidth: '100' },
          { prop: 'date', label: '日期', minWidth: '180' },
          { prop: 'address', label: '地址', minWidth: '220' },
          { prop: 'name', label: '姓名', minWidth: '100' },
          { prop: 'date', label: '日期', minWidth: '180' },
          { prop: 'address', label: '地址', minWidth: '220' }
        ]
      }
    }
  }
}
</script>
