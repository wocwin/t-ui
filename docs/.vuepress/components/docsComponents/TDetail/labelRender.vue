<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-detail :descData="descData" border />
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
          labelRender: () => {
            return <span style="color:red;">盘点单编号</span>
          },
          fieldName: "stocktakePlanNo",
          value: "",
        },
        {
          label: "盘点单状态",
          labelRender: () => {
            return <span style="color:blue;">盘点单状态</span>
          },
          fieldName: "stocktakeJobStatusLabel",
          value: "",
        },
        {
          label: "盘点负责人",
          labelRender: () => {
            return <span style="color:green;">盘点负责人</span>
          },
          fieldName: "planStocktakeUserName",
          value: "",
        },
        {
          label: "计划盘点日期",
          labelRender: () => {
            return <span style="color:orange;">计划盘点日期</span>
          },
          fieldName: "planStocktakeDate",
          value: "",
        }
      ],
    };
  },
  created() {
    const dataList = {
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
    };
    this.descData.map((item) => {
      item.value = dataList[item.fieldName];
    });
  },
};
</script>
