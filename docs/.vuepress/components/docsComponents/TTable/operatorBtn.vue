<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="自定义操作按钮样式"
        ref="selectionTable"
        :table="table"
        :columns="table.columns"
        @selection-change="selectionChange"
        :isShowPagination="false"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  data() {
    return {
      table: {
        firstColumn: { type: 'selection', fixed: true },
        data: [
          {
            id: '1',
            date: '2019-09-25',
            date1: '2019-09-26',
            name: '张三',
            status: '2',
            address: '广东省广州市天河区'
          },
          {
            id: '2',
            date: '2019-09-26',
            date1: '2019-09-27',
            name: '张三1',
            status: '1',
            address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
          },
          {
            id: '3',
            date: '2019-09-26',
            date1: '2019-09-28',
            name: '张三1',
            status: '1',
            address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
          },
          {
            id: '4',
            date: '2019-09-26',
            date1: '2019-09-29',
            name: '张三1',
            status: '1',
            address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
          }
        ],
        // 表头数据
        columns: [
          { prop: 'name', label: '姓名', minWidth: '100' },
          { prop: 'date', label: '日期', minWidth: '180' },
          { prop: 'status', label: '状态', minWidth: '80' },
          { prop: 'date1', label: '日期22', minWidth: '180' },
          { prop: 'address', label: '地址', minWidth: '220' }
        ],
        // 表格内操作列
        operator: [
          {
            text: '查看',
            bind: {
              type: 'primary',
              icon: 'el-icon-edit'
            }
          },
          {
            text: '编辑',
            bind: {
              type: 'danger',
              icon: 'el-icon-search'
            }
          },
          {
            text: '作废',
            bind: {
              circle: true,
              icon: 'el-icon-edit'
            }
          }
        ],
        // 操作列样式
        operatorConfig: {
          fixed: 'right', // 固定列表右边（left则固定在左边）
          width: 300,
          label: '操作'
        }
      },
      ids: []
    }
  },
  methods: {
    selectionChange(val) {
      this.ids = val
    }
  },
}
</script>
