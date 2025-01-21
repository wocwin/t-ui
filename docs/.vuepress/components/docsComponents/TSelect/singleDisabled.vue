<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-select
        placeholder="请选择工序"
        v-model="selectVlaue"
        :optionSource="stepList"
        valueKey="label"
        @change="selectChange"
      ></t-select>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  data() {
    return {
      selectVlaue: null,
      stepList: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      let list = [
        { label: "开始", id: 1 },
        { label: "POSUI", id: 2 },
        { label: "11", id: 3 },
        { label: "GX123", id: 4 },
        { label: "烘干破碎", id: 5 },
        { label: "单选禁用项", id: undefined },
        { label: "车间仓库", id: 6 },
        { label: "ui3333", id: 7 },
        { label: "hhh333", id: 8 }
      ]
      list.map((item) => {
        if (item.id === undefined) {
          item.disabled = true
        }
      })
      this.stepList = list
    },
    selectChange(val) {
      console.log('selectChange', val, this.selectVlaue)
    }
  }
}
</script>