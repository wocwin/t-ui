<template>
  <div class="query-data">
    <t-query-condition ref="queryCondition" :opts="opts" isExpansion @submit="conditionEnter">
      <template #likeTransportNo="{param}">
        <el-input v-model="param.likeTransportNo" clearable placeholder="自定义插槽输入框" />
      </template>
      <template #likeTransportNo1="{param}">
        <el-checkbox-group v-model="param.likeTransportNo1">
          <el-checkbox label="显示禁用科目"></el-checkbox>
          <el-checkbox label="显示辅助核算"></el-checkbox>
          <el-checkbox label="显示无余额无发生科目"></el-checkbox>
        </el-checkbox-group>
      </template>
    </t-query-condition>
  </div>
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
        likeTransportNo1: [],
        likeCargoName: null,
      }
    }
  },
  computed: {
    opts() {
      return {
        likeCargoNo: {
          label: '货源编号',
          comp: 'el-input',
        },
        likeTransportNo: {
          label: '运单编号',
          comp: 'el-input',
          slotName: 'likeTransportNo',
        },
        likeBookNo: {
          label: '订单编号',
          comp: 'el-input'
        },
        likeCargoName: {
          label: '货品名称',
          comp: 'el-input',
        },
        likeTransportNo1: {
          label: '多选',
          defaultVal: [],
          span: 4,
          slotName: 'likeTransportNo1',
        },
      }
    },
    // 查询条件所需参数
    getQueryData() {
      const { likeCargoNo, likeBookNo, likeTransportNo, likeTransportNo1, likeCargoName } = this.queryData
      return {
        likeCargoNo,
        likeBookNo,
        likeTransportNo,
        likeTransportNo1,
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
