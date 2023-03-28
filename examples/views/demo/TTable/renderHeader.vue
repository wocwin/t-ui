<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table :table="table" :columns="columns" />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
export default {
  name: 'renderHeader',
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
        ]
      },
      columns: [
        {
          prop: 'name',
          label: '姓名',
          minWidth: '100',
          renderHeader: (row) => {
            return (
              <div>
                <span>姓名</span>
                <i class="el-icon-question" />
              </div>
            )
          }
        },
        { prop: 'date', label: '必选项', headerRequired: true, minWidth: '180' },
        {
          prop: 'address',
          label: '地址',
          minWidth: '220',
          renderHeader: (row) => {
            return (
              <div>
                <span>{row.label}</span>
                <el-tooltip class="tooltip" effect="dark" placement="right">
                  <ul slot="content">
                    <li>这是第一个提示</li>
                    <li>这是第二个提示</li>
                  </ul>
                  <i class="el-icon-question" />
                </el-tooltip>
              </div>
            )
          }
        },
        { prop: 'date', label: '日期', minWidth: '180' }
      ]
    }
  }
}
</script>
