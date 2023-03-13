<template>
  <div class="t-table" style="width:100%;">
    <t-table
      :table="table"
      rowClickRadio
      :columns="columns"
      @radioChange="radioChange"
      :defaultRadioCol="1"
    />
  </div>
</template>

<script>
export default {
  name: 'redioDemo',
  data() {
    return {
      table: {
        firstColumn: { type: 'radio' }, // 显示单选框
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
        { prop: 'name', label: '姓名', minWidth: '100' },
        { prop: 'date', label: '日期', minWidth: '180' },
        { prop: 'address', label: '地址', minWidth: '220' },
        { prop: 'date', label: '日期', minWidth: '180' }
      ]
    }
  },
  methods: {
    radioChange(row) {
      console.log('单选传出数据', row)
      // this.baseData.radioVal = this.baseData.table.data.indexOf(row)
      // console.log('单选', row, this.baseData.radioVal)
    },
  }
}
</script>
