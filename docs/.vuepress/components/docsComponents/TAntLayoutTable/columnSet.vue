<template>
  <t-layout-page>
    <!-- <t-layout-page-item> -->
    <t-ant-layout-table
      :columns="columns"
      column-setting
      name="colWidth"
      :dataSource="sourceData"
      :tableOpt="{scroll: {x: '120%'},bordered:true}"
    />
    <!-- </t-layout-page-item> -->
  </t-layout-page>
</template>
<script>
import dataCol from './data.json'
export default {
  name: 'columnSet',
  data () {
    return {
      // 数据源
      sourceData: [],
      columns: [
        {
          title: '原车牌号码',
          dataIndex: 'originalPlateNum',
          width: 140,
          minWidth: '120px'
        },
        {
          title: '原车牌颜色',
          dataIndex: 'originalPlateColor',
          width: 100,
          minWidth: '100px',
          customRender: (text) => {
            return text === 0 ? "黄牌" : "蓝牌";
          },
        },
        {
          title: '原司机',
          dataIndex: 'originalDriverName',
          width: 120,
          minWidth: '120px'
        },
        {
          title: '原联系电话',
          dataIndex: 'originalTelephone',
          width: 130,
          minWidth: '130px'
        },
        {
          title: '更换后车牌号',
          dataIndex: 'plateNum',
          width: 120,
          minWidth: '120px'
        },
        {
          title: '更换后车牌颜色',
          dataIndex: 'plateColor',
          width: 140,
          minWidth: '140px',
          customRender: (text) => {
            return text === 0 ? "黄牌" : "蓝牌";
          },
        },
        {
          title: '更换后司机',
          dataIndex: 'driverName',
          width: 120,
          minWidth: '120px'
        },
        {
          title: '更换后联系电话',
          dataIndex: 'telephone',
          width: 140,
          minWidth: '140px'
        },
        {
          title: '物流公司',
          dataIndex: 'logisticsName',
          width: 120,
          minWidth: '120px'
        },
        {
          title: '采购合同',
          dataIndex: 'contractCode',
          width: 200,
          minWidth: '200px'
        },
        {
          title: '运单',
          dataIndex: 'waybillCode',
          width: 180,
          minWidth: '180px'
        },
        {
          title: '更换时间',
          dataIndex: 'createTime',
          width: 120,
          minWidth: '120px'
        },
        {
          title: '更换区段',
          dataIndex: 'section',
          width: 120,
          minWidth: '120px'
        },
        {
          title: '操作人员',
          dataIndex: 'creatorName',
          width: 120,
          minWidth: '120px'
        }
      ]
    }
  },
  mounted () {
    this.sourceData = dataCol.data.rows
  }
}
</script>
