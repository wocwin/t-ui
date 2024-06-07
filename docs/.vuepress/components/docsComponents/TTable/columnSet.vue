<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        columnSetting
        title="列显示隐藏及拖拽排序"
        :table="table"
        :columns="columns"
        :columnSetBind="{btnTxt:'列设置',title:'随便取一个title',type:'primary',icon:'el-icon-plus'}"
      >
        <template #amount="{param}">{{param.row.amount}}</template>
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
            status: '1',
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
            id: '2',
            date: '2019-09-27',
            name: '张三2',
            status: '3',
            amount: 4000,
            address: '广东省广州市天河区3'
          }
        ]
      },
      columns: [
        { prop: 'name', label: '姓名', minWidth: '100', fixed: true, },
        { prop: 'date', label: '日期', minWidth: '160', },
        { prop: 'address', label: '地址', minWidth: '220', isShowHidden: true, },
        {
          prop: 'status', label: '状态', minWidth: '100', isShowHidden: true,
          render: (text, record) => {
            return (
              <el-switch
                active-value={'1'}
                inactive-value={'2'}
                v-model={record.enableStatus}
                onChange={() => this.handleStatusChange(record)}
              >
                {text}
              </el-switch>
            )
          },
        },
        { prop: 'amount', label: '金额', minWidth: '160', slotName: 'amount' },
      ]
    }
  },
  methods: {
    handleStatusChange(row) {
      let text = row.status === '1' ? '启用' : '废止'
      this.$confirm(`确认要${text}这条数据吗？`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success(`点击确定`)
      }).catch(() => {
        console.log('取消')
        row.status = row.status === '1' ? '2' : '1'
      })
    }
  }
}
</script>
