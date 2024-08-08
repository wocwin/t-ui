<template>
  <t-layout-page class="row_class_name">
    <t-layout-page-item>
      <t-table
        onlyIconSort
        title="此排序仅可点击图标才生效"
        :table="table"
        :columns="columns"
        :header-cell-style="{background: 'red',height: '50px'}"
        :row-style="{ height: '52px'}"
        size="mini"
        :rowClassName="rowClassName"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
export default {
  data() {
    let self = this;
    return {
      table: {
        data: [
          {
            id: "1",
            date: "2019-09-25",
            name: "张三",
            status: "2",
            address: "广东省广州市天河区",
          },
          {
            id: "2",
            date: "2019-09-26",
            name: "张三1",
            status: "1",
            address:
              "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2",
          },
          {
            id: "3",
            date: "2019-09-27",
            name: "张三2",
            status: "3",
            address: "广东省广州市天河区3",
          },
        ],
      },
      columns: [
        { prop: "name", label: "姓名", minWidth: "100", sort: true },
        { prop: "date", label: "日期", minWidth: "180", sort: true },
        {
          prop: "address",
          label: "地址",
          minWidth: "220",
          sort: true,
          noShowTip: true,
        },
        { prop: "date", label: "日期", minWidth: "180", sort: true },
        {
          prop: "address",
          label: "地址",
          minWidth: "220",
          customRender: {
            comps: [
              {
                comp: "el-link",
                text: "编辑",
                bind: {
                  type: "primary",
                },
                event(scope) {
                  return {
                    click() {
                      self.handleEditTable("编辑", scope.row);
                    },
                  };
                },
              },
              {
                comp: "el-popconfirm",
                bind: {
                  title: "确认删除该条数据？",
                },
                event(scope) {
                  return {
                    confirm() {
                      self.handledeleteTable(scope.row);
                    },
                  };
                },
                child: [
                  {
                    slot: "reference",
                    comp: "el-link",
                    text: "删除",
                    bind: {
                      type: "primary",
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    };
  },
  methods: {
    handleEditTable(val, type) {
      console.log("编辑", val, type);
    },
    handledeleteTable(val) {
      console.log("删除", val);
    },
    rowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row"
      } else {
        return "success-row"
      }
    },
  },
};
</script>
<style lang="scss">
.row_class_name {
  .el-table .warning-row {
    color: #b88230;
  }
  .el-table .success-row {
    color: #67c23a;
  }
}
</style>
