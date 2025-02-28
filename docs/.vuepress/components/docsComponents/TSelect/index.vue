<template>
  <t-layout-page>
    <t-layout-page-item style="display: flex; justify-content: space-between;">
      <t-select
        placeholder="请选择工序"
        ref="selectRef"
        v-model="selectVlaue"
        :optionSource="stepList"
        valueKey="label"
        @change="selectChange"
      />
      <el-button style="margin-left: 20px" type="primary" @click="$refs.selectRef.clear()">清空选中</el-button>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  data() {
    return {
      selectVlaue: null,
      stepList: [
        { label: '开始', id: 1 },
        { label: 'POSUI', id: 2 },
        { label: '11', id: 3 },
        { label: 'GX123', id: 4 },
        { label: '烘干破碎', id: 5 },
        { label: '车间仓库', id: 6 },
        { label: 'ui3333', id: 7 },
        { label: 'hhh333', id: 8 }]
    }
  },
  methods: {
    selectChange(val) {
      console.log('selectChange', val, this.selectVlaue)
    }
  }
}
</script>