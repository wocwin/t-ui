<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table columnSetting title="显示隐藏列" :table="table" :columns="columns">
        <template #amount="{param}">{{param.row.amount|currencyFilter}}</template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
export default {
  name: 'TtableColumnSet',
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
        ]
      },
      columns: [
        { prop: 'name', label: '姓名', minWidth: '100', fixed: true },
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
      ]
    }
  }
}
</script>
