<template>
  <div class="t-table" style="width:100%;">
    <t-table :table="table" />
  </div>
</template>

<script>
import TTable from '../../../../../src/components/baseComponents/TTable'
export default {
  components: {
    TTable
  },
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
        ],
        column: [
          { prop: 'name', label: '姓名', minWidth: '100' },
          { prop: 'date', label: '日期', minWidth: '180' },
          { prop: 'address', label: '地址', minWidth: '220' },
          { prop: 'date', label: '日期', minWidth: '180' },
          { prop: 'address', label: '地址', minWidth: '220' }
        ],
        // 表格内操作列
        operator: [
          {
            text: '新增',
            type: 'primary',
            fun: this.add,
            // status为1时，不显示此按钮
            noshow: [{ key: 'status', val: ['1'] }]
          },
          {
            text: '编辑',
            type: 'danger',
            // status值为2时，展示此按钮
            show: { key: 'status', val: ['2'] },
            fun: this.edit
          },
          {
            text: '删除',
            fun: this.del
          }
        ],
        // 操作列样式
        operatorConfig: {
          fixed: 'right', // 固定列表右边（left则固定在左边）
          width: 280,
          label: '操作'
        }
      }
    }
  },
  methods: {
    // 新增
    add (val) {
      console.log('新增', val)
    },
    // 编辑
    edit (val) {
      console.log('编辑', val)
    },
    // 删除
    del (val) {
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
