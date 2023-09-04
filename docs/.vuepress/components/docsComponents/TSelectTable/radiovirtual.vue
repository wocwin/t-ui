<template>
  <t-select-table
    :table="table"
    :columns="table.columns"
    use-virtual
    :keywords="{label:'name',value:'id'}"
    @radioChange="radioChange"
  ></t-select-table>
</template>

<script>
export default {
  data() {
    return {
      table: {
        data: [],
        columns: [
          { label: '物料编号', width: '100px', prop: 'code' },
          { label: '物料名称', width: '149px', prop: 'name' },
          { label: '规格', width: '149px', prop: 'spec' },
          { label: '单位', width: '110px', prop: 'unitName' },
        ],
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      for (let i = 0; i < 10000; i++) {
        this.table.data.push({
          id: i,
          code: i,
          name: '物料名称' + i,
          spec: '物料名称物料名物料名物料名物料名物料名物料名物料名物料名物料名物料名物料名物料名称' + i,
          unitName: '吨',
        })
      }
    },
    // 单选
    radioChange(row) {
      console.log('传给后台的值', row)
    }
  }
}
</script>

<style>
</style>