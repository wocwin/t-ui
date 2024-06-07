<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table :table="table" :columns="table.columns" />
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
            tags: [{ type: 'success', name: '标签1' }, { type: 'info', name: '标签2' }, { type: 'warning', name: '标签3' }],
            address: '广东省广州市天河区'
          },
          {
            id: '2',
            date: '2019-09-26',
            name: '张三1',
            status: '1',
            tags: [{ type: 'danger', name: '标签4' }, { type: 'info', name: '标签5' }],
            address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
          },
          {
            id: '3',
            date: '2019-09-27',
            name: '张三2',
            tags: [{ type: 'warning', name: '标签6' }, { type: 'success', name: '标签7' }],
            status: '3',
            address: '广东省广州市天河区3'
          }
        ],
        columns: [
          { prop: 'name', label: '姓名', minWidth: '100' },
          {
            prop: 'status',
            label: 'render渲染1',
            minWidth: '180',
            render: (text, row, index) => {
              // console.log(777, text, row, index)
              let type = ''
              let val = ''
              switch (text) {
                case '1':
                  type = ''
                  val = '待处理'
                  break
                case '2':
                  type = 'warning'
                  val = '进行中'
                  break
                case '3':
                  type = 'success'
                  val = '已完成'
                  break
              }
              return (
                <el-tag type={type}>
                  {val}
                </el-tag>
              )
            }
          },
          {
            prop: 'status',
            label: 'render渲染2',
            minWidth: '180',
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
          {
            prop: 'tags',
            label: 'render for循环渲染',
            minWidth: '180',
            render: (text, record) => {
              return (
                <div>
                  {
                    record.tags.map((item) => {
                      return (
                        <el-tag style="margin:0 2px;" type={item.type}>{item.name}</el-tag>
                      )
                    })
                  }
                </div>
              )
            },
          },
          { prop: 'address', label: '地址', minWidth: '220' },
          { prop: 'date', label: '日期', minWidth: '180' },
          { prop: 'address', label: '地址', minWidth: '220' }
        ],
      },
    }
  },
  methods: {
    // 状态修改
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
    handleDelete(val) {
      console.log('删除', val)
    }
  }
}
</script>
