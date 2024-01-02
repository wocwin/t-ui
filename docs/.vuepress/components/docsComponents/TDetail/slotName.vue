<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-detail :descData="descData" :descColumn="2">
        <template #slotName>
          {{ `${dataList.stocktakePlanNo}--${dataList.planStocktakeUserName}` }}
        </template>
      </t-detail>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  name: "TDetailDemo",
  data() {
    return {
      descData: [
        {
          label: "盘点单编号",
          fieldName: "stocktakePlanNo",
          value: "",
        },
        {
          label: "盘点单状态",
          fieldName: "stocktakeJobStatusLabel",
          value: "",
        },
        {
          label: "盘点负责人",
          fieldName: "planStocktakeUserName",
          value: "",
        },
        {
          label: "插槽显示编号+负责人",
          slotName: "slotName",
          span: 4,
          value: "",
        },
        {
          label: "计划盘点日期",
          fieldName: "planStocktakeDate",
          value: "",
        },
        {
          label: "车间",
          fieldName: "workshopLabel",
          value: "",
        },
        {
          label: "仓库",
          fieldName: "warehouseName",
          value: "",
        },
        {
          label: "盘点所有物料",
          fieldName: "originTypeListLabel",
          value: "",
        },
        {
          label: "备注",
          fieldName: "createRemark",
          value: "",
          span: 4,
        },
      ],
      dataList: {
        id: "1498904492217241602",
        stocktakePlanNo: "PD-YX-20220302002",
        workshopId: 301,
        workshopLabel: "压型车间",
        planStocktakeDate: "2022-03-03",
        warehouseId: 1,
        warehouseName: "压型电极仓",
        stocktakeJobStatus: 4,
        stocktakeJobStatusLabel: "待盘点录入",
        stocktakeType: 2,
        stocktakeTypeLabel: "临时盘点",
        originTypeList: "[1, 3]",
        originTypeListLabel: "在制品,合格品",
        planStocktakeUserName: "张三",
        planStocktakeUserId: 0,
        createRemark: "测试",
      },
    };
  },
  created() {
    this.descData.map((item) => {
      item.value = this.dataList[item.fieldName];
    });
  },
};
</script>
