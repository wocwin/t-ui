<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        ref="queryCondition"
        :opts="opts"
        @submit="conditionEnter"
        :listTypeInfo="listTypeInfo"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  name: 'linkageDemo',
  data() {
    return {
      queryData: {
        likeCargoNo: null,
        likeBookNo: null,
        likeTransportNo: null,
        likeCargoName: null
      },
      likeBookNoList: [],
      listTypeInfo: {
        likeBookNoList: [],
      }
    }
  },
  computed: {
    opts() {
      return {
        likeCargoNo: {
          label: '货源编号',
          comp: 'el-input',
          event: {
            change: (val) => this.handleBranchCode(val)
          },
        },
        likeBookNo: {
          label: 't-select单选',
          comp: 't-select',
          // defaultVal: 'W1',
          placeholder: '请先输入货源编号',
          bind: {
            optionSource: this.likeBookNoList
          },
          event: {
            'visible-change': (val) => this.visibleChange(val)
          },
        },
        likeBookNo1: {
          label: 'el-select单选',
          comp: 'el-select',
          type: 'select-arr',
          list: 'likeBookNoList',
          arrLabel: 'label',
          arrKey: 'key',
          event: {
            'visible-change': (val) => this.visibleChange1(val)
          },
        },
        likeTransportNo: {
          label: '运单编号',
          comp: 'el-input',
        },
        likeCargoName: {
          label: '货品名称',
          comp: 'el-input',
        }
      }
    },
    // 查询条件所需参数
    getQueryData() {
      const { likeCargoNo, likeBookNo, likeTransportNo, likeCargoName } = this.queryData
      return {
        likeCargoNo,
        likeBookNo,
        likeTransportNo,
        likeCargoName
      }
    }
  },
  mounted() {
    this.recordStepsList()
  },
  methods: {
    // 货源编号
    handleBranchCode(val) {
      console.log('货源编号事件', val)
    },
    //获取t-select单选数据
    recordStepsList() {
      // const res = await this.$api.recordStepsList(workOrderNo)
      this.likeBookNoList = [
        {
          label: '前纺一车间',
          key: 'W1'
        },
        {
          label: '前纺二车间',
          key: 'W2'
        },
        {
          label: '前纺三车间',
          key: 'W3'
        }
      ]
      this.listTypeInfo.likeBookNoList = this.likeBookNoList
    },
    // Tselect 下拉框是否显示
    visibleChange(val) {
      console.log('Tselect-下拉框是否显示', val)
    },
    visibleChange1(val) {
      console.log('el-select下拉框是否显示', val)
    },
    // 点击查询按钮
    conditionEnter(data) {
      console.log('查询条件', data)
      this.queryData = data
      console.log('最终条件', this.getQueryData)
    }
  }
}
</script>
