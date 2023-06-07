<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-select
        placeholder="请选择工序"
        v-model="selectVlaue"
        multiple
        :optionSource="stepList"
        valueKey="label"
        @change="selectChange"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  data() {
    return {
      selectVlaue: null,
      stepList: [
        { label: '开始' }, { label: 'POSUI' }, { label: '11' }, { label: 'GX123' }, { label: '烘干破碎' }, { label: '车间仓库' }, { label: 'ui3333' }, { label: 'hhh333' }]
    }
  },
  methods: {
    selectChange(val) {
      console.log('selectChange', val, this.selectVlaue)
    }
  }
}
</script>