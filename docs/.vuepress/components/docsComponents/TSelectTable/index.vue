<template>
  <t-layout-page style="flex-direction: row;">
    <t-select-table
      ref="selectTable"
      :table="table"
      :columns="table.columns"
      :max-height="540"
      :keywords="{ label: 'name', value: 'id' }"
      style="width: 50%;"
      @radioChange="radioChange"
    />
    <el-button style="margin-left: 15px" type="primary" @click="clear"
      >清空选中</el-button
    >
  </t-layout-page>
</template>

<script>
export default {
  data() {
    return {
      table: {
        data: [],
        columns: [
          { label: "物料编号", width: "100px", prop: "code" },
          { label: "物料名称", width: "149px", prop: "name", noShowTip: true },
          { label: "规格", width: "149px", prop: "spec" },
          { label: "单位", width: "110px", prop: "unitName" },
        ],
      },
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      for (let i = 0; i < 10; i++) {
        this.table.data.push({
          id: i + 1,
          code: i + 1,
          name:
            "物料名物料名物料名物料名物料名物料名物料名物料名物料名物料名物料名物料名物料名称1" +
            i,
          spec: "物料名称1" + i,
          unitName: "吨",
        });
      }
    },
    // 单选
    radioChange(row) {
      console.log("传给后台的值", row);
    },
    clear() {
      this.$refs.selectTable.clear();
    },
  },
};
</script>

<style></style>
