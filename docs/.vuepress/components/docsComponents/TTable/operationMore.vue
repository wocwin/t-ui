<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table :table="table" :columns="columns" />
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
        // 表格内操作列
        operator: [
          {
            text: '新增',
            fun: this.add,
          },
          {
            text: '编辑',
            fun: this.edit
          },
          {
            text: "查看",
            fun: this.viewDetail,
            isMore: true
          },
          {
            text: "作废",
            fun: this.nullify,
            isMore: true
          },
          {
            text: '删除',
            fun: this.del,
            isMore: true,
            itemBind: { divided: true },
            isDisabled: row => {
              return row.status == "2"
            }
          }
        ],
        // 操作列样式
        operatorConfig: {
          dropdownBind: { trigger: "click", btnBind: { type: "text" } }, // 下拉按钮样式
          fixed: 'right', // 固定列表右边（left则固定在左边）
          width: 180,
          label: '操作'
        }
      },
      columns: [
        { prop: 'name', label: '姓名', minWidth: '100' },
        { prop: 'date', label: '日期', minWidth: '180' },
        { prop: 'address', label: '地址', minWidth: '220' },
      ],
    }
  },
  methods: {
    // 新增
    add(val) {
      console.log('新增', val)
    },
    // 编辑
    edit(val) {
      console.log('编辑', val)
    },
    viewDetail(val) {
      console.log('查看详情', val)
    },
    nullify(val) {
      console.log('作废', val)
    },
    // 删除
    del(val) {
      this.$confirm('是否永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除', val)
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>
