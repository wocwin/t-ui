<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="操作按钮插槽方式"
        ref="selectionTable"
        :table="table"
        :columns="table.columns"
        @selection-change="selectionChange"
        :isShowPagination="false"
      >
        <template #toolbar>
          <el-button
            size="default"
            type="primary"
            :disabled="ids.length < 1"
            @click="cancelSelect"
          >取消选中</el-button>
          <el-button size="default" type="primary" @click="add">新增</el-button>
          <el-button size="default" type="danger" :disabled="ids.length < 1" @click="del">删除</el-button>
        </template>
        <template #operator="{scope}">
          <el-button icon="el-icon-delete" @click="viewDetail(scope.row)">查看</el-button>
          <el-button type="danger" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
          <el-button icon="el-icon-share" type="primary" @click="nullify(scope.row)">作废</el-button>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
export default {
  data() {
    return {
      table: {
        firstColumn: { type: 'selection', fixed: true },
        // 接口返回数据
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
          { prop: 'address', label: '地址', minWidth: '220' },
          { prop: 'address', label: '地址', minWidth: '220' },
          { prop: 'address', label: '地址', minWidth: '220' },
          {
            prop: 'operator',
            label: '操作',
            minWidth: '320',
            fixed: 'right',
            slotName: 'operator'
          }
        ]
      },
      ids: []
    }
  },
  methods: {
    viewDetail(val) {
      console.log('viewDetail', val)
    },
    edit(val) {
      console.log('edit', val)
    },
    nullify(val) {
      console.log('nullify', val)
    },
    // 选择复选框
    selectionChange(val) {
      console.log('选择复选框', val)
      this.ids = val
    },
    // 取消选中
    cancelSelect() {
      console.log('取消选中', this.$refs.selectionTable)
      if (this.ids.length > 0) {
        console.log('取消选中222', this.$refs.selectionTable)
        this.$refs.selectionTable.clearSelection()
      }
    },
    // 新增按钮
    add() {
      console.log('add按钮')
    },
    // 删除按钮
    del() {
      console.log('del按钮')
    }
  }
}

</script>
