<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        :table="table"
        use-virtual
        :maxHeight="400"
        row-key="id"
        :columns="table.columns"
        @selection-change="selectionChange"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
export default {
  data() {
    return {
      table: {
        firstColumn: { type: 'selection', isPaging: true },
        data: [],
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
            text: '删除',
            render: (text, row) => {
              return (
                <el-popconfirm
                  title="你确定要删除吗？"
                  onConfirm={() => this.del(row)}
                >
                  <div slot="reference" type="link">
                    删除
                  </div>
                </el-popconfirm>
              )
            }
          }
        ],
        operatorConfig: {
          fixed: 'right',
          width: 280,
          label: '操作'
        },
        columns: [
          { prop: 'name', label: '姓名', minWidth: 120 },
          { prop: 'code', label: 'code', minWidth: 80 },
          { prop: 'address', label: '地址', minWidth: 240 },
          { prop: 'status', label: '状态', minWidth: 120 },
        ]
      },
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      for (let i = 0; i < 10000; i++) {
        this.table.data.push({
          id: i + 1,
          code: i + 1,
          status: '待维修' + i,
          name: '张三' + i,
          address: '广东省广东省广州市白云广东省广州市白云广州市白云区' + i,
        })
      }
    },
    selectionChange(selection) {
      console.log('选中数据', selection)
    },
    // 新增
    add(val) {
      console.log('新增', val)
    },
    // 编辑
    edit(val) {
      console.log('编辑', val)
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
