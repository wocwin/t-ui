<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table :table="table" :columns="table.columns" />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
import TVHtml from './com/TVHtml.vue'
export default {
  components: {
    TVHtml
  },
  data() {
    return {
      table: {
        data: [
          {
            id: '1',
            date: '2019-09-25',
            name: '张三',
            status: '2',
            vhtml: '<span style="color:red">红色</span>',
            address: '广东省广州市天河区'
          },
          {
            id: '2',
            date: '2019-09-26',
            name: '张三1',
            status: '1',
            vhtml: '<span style="color:green">绿色</span>',
            address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
          },
          {
            id: '3',
            date: '2019-09-27',
            name: '张三2',
            vhtml: '<span style="color:blue">蓝色</span>',
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
            prop: 'vhtml', label: '自定义组件渲染', minWidth: '220',
            render: (text) => {
              return (
                <t-v-html html={text} />
              )
            }
          },
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
