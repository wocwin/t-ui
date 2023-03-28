<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition ref="queryCondition" :opts="opts" @submit="conditionEnter">
        <template #likeTransportNo="{param}">
          <el-input v-model="param.likeTransportNo" clearable placeholder="自定义插槽输入框" />
        </template>
      </t-query-condition>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  name: 'queryData-slot',
  data() {
    return {
      queryData: {
        likeCargoNo: null,
        likeBookNo: null,
        likeTransportNo: null,
        likeCargoName: null
      }
    }
  },
  computed: {
    opts() {
      return {
        likeCargoNo: {
          label: '货源编号',
          comp: 'el-input'
        },
        likeBookNo: {
          label: '订单编号',
          comp: 'el-input'
        },
        likeTransportNo: {
          label: '运单编号',
          comp: 'el-input',
          slotName: 'likeTransportNo'
        },
        likeCargoName: {
          label: '货品名称',
          comp: 'el-input'
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
  methods: {
    // 点击查询按钮
    conditionEnter(data) {
      console.log('查询条件', data)
      this.queryData = data
      console.log('最终条件', this.getQueryData)
    }
  }
}
</script>
