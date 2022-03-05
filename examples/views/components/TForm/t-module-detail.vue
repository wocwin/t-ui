<template>
  <div class="t-module-detail-demo">
    <t-layout sectionTitle="模块详情组件运用" :isShowTitle="false">
      <div class="content-main">
        <t-module-form
          title="模块详情组件运用"
          subTitle="模块详情222"
          ref="sourceDetail"
          handleType="desc"
          :descData="descData"
          :tabs="tabs"
        >
          <!-- tabs插槽 -->
          <template #tab1>
            <t-table title="常规表格" :table="baseData.table" :columns="baseData.columns" />
          </template>
          <template #tab2>
            <div>指派明细</div>
          </template>
          <template #tab3>
            <div>承运明细</div>
          </template>
          <!-- 标题右侧按钮 -->
          <template #extra>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="danger">信息按钮</el-button>
          </template>
          <!-- 模块detail详情插槽 -->
          <template #line>
            <el-button type="danger">自定义模块detail插槽</el-button>
          </template>
          <!-- value自定义插槽 -->
          <template #loadKgPerCar>
            <div class="text-danger">value自定义插槽</div>
          </template>
        </t-module-form>
      </div>
    </t-layout>
  </div>
</template>
<script>
export default {
  name: 'TModuleDetailDemo',
  data () {
    return {
      baseData: {
        table: {
          border: true, // 可自动调整列宽
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
          { prop: 'name', label: '姓名', minWidth: '100', sort: true },
          { prop: 'date', label: '日期', minWidth: '180', sort: true },
          { prop: 'date', label: '日期', minWidth: '180', sort: true },
          { prop: 'date', label: '日期', minWidth: '180', sort: true },
          { prop: 'address', label: '地址', minWidth: '220', sort: true }
        ]
      },
      tabs: [
        {
          key: 'tab1',
          title: '基础信息'
        },
        {
          key: 'tab2',
          title: '指派明细'
        },
        {
          key: 'tab3',
          title: '承运明细'
        }
      ],
      descData: {
        goods: {
          name: 'goods',
          title: '货品信息',
          disabled: true,
          data: [
            {
              label: '货品名称',
              fieldName: 'cargoName',
              value: ''
            },
            {
              label: '货品类别',
              fieldName: 'cargoType',
              value: ''
            },
            {
              label: '货品价值',
              fieldName: 'cargoMoneyCentPerTon',
              value: ''
            },
            {
              label: '总重量',
              fieldName: 'cargoWeightKg',
              value: ''
            },
            {
              label: '总体积',
              fieldName: 'cargoVolumeDm3',
              value: ''
            },
            {
              label: '总件数',
              fieldName: 'cargoQty',
              value: ''
            },
            {
              label: '易碎品',
              fieldName: 'isBreakable',
              value: '3333',
              span: 2
            },
            {
              label: '备注',
              fieldName: 'cargoRemark',
              value: '占位一整行777777777777777777777777777777',
              span: 4
            }
          ]
        },
        freight: {
          name: 'freight',
          title: '运费信息',
          data: [
            {
              label: '计费模式',
              fieldName: 'calFeeType',
              value: ''
            },
            {
              label: '运费单价',
              value: ''
            },

            {
              label: '路损类型',
              fieldName: 'roadLossType',
              value: '定率',
              tooltip: '测试字符串提示'
            },
            {
              label: '路耗定额',
              fieldName: 'roadLossKg',
              value: ''
            },
            {
              label: '整车承载',
              fieldName: 'loadKgPerCar',
              slotName: 'loadKgPerCar',
              value: ''
            },
            {
              label: '保险购买',
              fieldName: 'buyInsurance',
              value: '是',
              tooltip: () => (
                <div>
                  <div>测试函数方式提示</div>
                </div>
              )
            }
          ]
        },
        line: {
          name: 'line',
          title: '线路信息',
          slotName: 'line'
        }
      }
    }
  },
  mounted () {
    // 默认选中tab2
    // this.$refs.sourceDetail.setSelectedTab('tab2')
  }
}
</script>
