<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table :table="table" highlight-current-row :columns="columns" />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
export default {
  data() {
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
        ],
        // 表格外操作，选中表格某行，可以将其数据传出
        toolbar: [
          {
            text: '返回上一个页面1',
            icon: 'el-icon-circle-plus-outline',
            type: 'danger',
            fun: this.getBack
          },
          {
            text: '返回上一个页面2',
            icon: 'el-icon-circle-plus-outline',
            type: 'danger',
            fun: this.getBack
          },
          {
            text: '返回上一个页面3',
            icon: 'el-icon-circle-plus-outline',
            type: 'danger',
            fun: this.getBack
          },
          {
            text: '返回上一个页面4',
            icon: 'el-icon-circle-plus-outline',
            type: 'danger',
            fun: this.getBack
          }
        ]
      },
      columns: [
        { prop: 'name', label: '姓名', minWidth: '100' },
        { prop: 'date', label: '日期', minWidth: '180' },
        { prop: 'address', label: '地址', minWidth: '220' },
        { prop: 'date', label: '日期', minWidth: '180' },
        { prop: 'address', label: '地址', minWidth: '220' }
      ]
    }
  },
  methods: {
    getBack(row) {
      console.log('选中行返回的数据', row)
    }
  }
}
</script>
