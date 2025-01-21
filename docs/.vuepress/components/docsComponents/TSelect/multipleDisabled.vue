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
        { label: "开始", id: 1 },
        { label: "POSUI", id: 2 },
        { label: "11", id: 3 },
        { label: "GX123", id: 4 },
        { label: "烘干破碎", id: 5 },
        { label: "单选禁用项1", id: undefined },
        { label: "单选禁用项2", id: undefined },
        { label: "车间仓库", id: 6 },
        { label: "ui3333", id: 7 },
        { label: "hhh333", id: 8 }
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.stepList = [
        { label: "开始", id: 1 },
        { label: "POSUI", id: 2 },
        { label: "11", id: 3 },
        { label: "GX123", id: 4 },
        { label: "烘干破碎", id: 5 },
        { label: "单选禁用项1", id: undefined },
        { label: "单选禁用项2", id: undefined },
        { label: "车间仓库", id: 6 },
        { label: "ui3333", id: 7 },
        { label: "hhh333", id: 8 }
      ]
      this.stepList.map((item) => {
        if (item.id === undefined) {
          item.disabled = true
        }
      })
    },
    selectChange(val) {
      console.log('selectChange', val, this.selectVlaue)
    }
  }
}
</script>