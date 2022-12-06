<template>
  <div class="query-data">
    <t-query-condition ref="queryCondition" :opts="opts" @submit="conditionEnter" />
  </div>
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
      likeBookNoList: []
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
          bind: (row) => {
            return {
              disabled: row.likeCargoNo == null || row.likeCargoNo == '' ? true : false,
              optionSource: this.likeBookNoList
            }
          }
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
  // 方法
  methods: {
    // 货源编号
    handleBranchCode(val) {
      console.log('货源编号事件', val)
      this.recordStepsList()

    },
    //获取t-select单选数据
    recordStepsList(workOrderNo) {
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
