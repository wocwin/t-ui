<template>
  <div class="t-table" style="width:100%;">
    <t-table
      :table="table"
      :isShowPagination="false"
      isCopy
      isObjShowProp
      :columns="table.columns"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      table: {
        columns: [
          { prop: 'erpWarehouseInOrderVO.code', label: '单据编号', minWidth: '100' },
          { prop: 'erpWarehouseInOrderVO.date', label: '日期', minWidth: '100' },
          { prop: 'erpWarehouseInOrderVO.customerName', label: '客户', minWidth: '100' },
          { prop: 'erpWarehouseInOrderVO.manufacturer', label: '厂家', minWidth: '100' },
          { prop: 'erpWarehouseInOrderVO.productionName', label: '品名', minWidth: '100' },
          { prop: 'erpWarehouseInOrderVO.batchNum', label: '批号', minWidth: '60' },
          { prop: 'erpWarehouseInOrderVO.amount', label: '数量', minWidth: '60' },
          { prop: 'erpWarehouseInOrderVO.unitName', label: '单位', minWidth: '60' },
        ],
        data: [
          {
            createBy: "hzy1",
            createByName: "小黄1",
            createTime: "2022-05-18 18:16:46",
            erpWarehouseInOrderVO: {
              amount: null,
              batchNum: "FE2304LD",
              code: "STCLSL000001",
              createBy: null,
              createByName: null,
              createTime: null,
              customerCode: "01.000009",
              customerName: "广东凯金新能源科技股份有限公司",
              date: "2022-03-05",
              id: 3,
              isDeleted: null,
              manufacturer: null,
              materialCode: "01.10.04.0005",
              materialName: "GQ201",
              materialSpec: " ",
              productionName: "GQ201",
              remark: "34包",
              source: 0,
              status: 0,
              type: "标准受托加工材料收料单",
              unitCode: "38",
              unitName: "吨",
              updateBy: null,
              updateByName: null,
              updateTime: null,
            },
            id: 1,
            remark: null,
            source: 0,
            updateBy: "hzy1",
            updateByName: "小黄1",
            updateTime: "2022-05-18 18:16:46",
          }
        ],
      },
    }
  }
}
</script>
