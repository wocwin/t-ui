<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        isCopy
        title="指定姓名是'张三2'的行不需要排序"
        :table="table"
        :columns="table.columns"
        sortable="custom"
        isSortable
        notSortJudge="item.name == '张三2'"
        :isShowPagination="false"
      ></t-table>
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
            type: 'primary',
            fun: this.add,
            icon: 'el-icon-delete',
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
            // fun: this.del,
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
        // 操作列样式
        operatorConfig: {
          fixed: 'right', // 固定列表右边（left则固定在左边）
          width: 280,
          label: '操作'
        },
        columns: [
          { prop: 'name', label: '姓名', minWidth: '100' },
          { prop: 'date', label: '日期', minWidth: '180' },
          { prop: 'address', label: '地址', minWidth: '220' },
          { prop: 'date', label: '日期', minWidth: '180' },
          { prop: 'address', label: '地址', minWidth: '220' }
        ]
      }

    }
  }
}
</script>
