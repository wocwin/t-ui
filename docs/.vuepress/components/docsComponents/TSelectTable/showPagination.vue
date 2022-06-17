<template>
  <t-select-table 
  isShowPagination 
  v-model="value" 
  :configure="configure" 
  :list="list"
  @size-change="handleSizeChange" 
  @current-change="handleCurrentChange" 
  ></t-select-table>
</template>

<script>
export default {
  data () {
    return {
      value: null,
      configure: {
        columns: [
          { title: '物料编号', width: '149px', prop: 'code' },
          { title: '物料名称', width: '149px', prop: 'name' },
          { title: '规格', width: '149px', prop: 'spec' },
          { title: '单位', width: '110px', prop: 'unitName' },
        ],
        keywords: {
          label: 'name',
          value: 'id',
        },
        tablePagination: {
          total: 100,
          currentPage: 1,
          pageSize: 10,
        }
      },
      list: [
        { id: 1, code: 1, name: '物料名称1', spec: '物料规格1', unitName: '吨' },
        { id: 2, code: 2, name: '物料名称2', spec: '物料规格2', unitName: '吨' },
        { id: 3, code: 3, name: '物料名称3', spec: '物料规格3', unitName: '吨' },
        { id: 4, code: 4, name: '物料名称4', spec: '物料规格4', unitName: '吨' },
        { id: 5, code: 5, name: '物料名称5', spec: '物料规格5', unitName: '吨' },
        { id: 6, code: 6, name: '物料名称6', spec: '物料规格6', unitName: '吨' },
        { id: 7, code: 7, name: '物料名称7', spec: '物料规格7', unitName: '吨' },
        { id: 8, code: 8, name: '物料名称8', spec: '物料规格8', unitName: '吨' },
        { id: 9, code: 9, name: '物料名称9', spec: '物料规格9', unitName: '吨' },
        { id: 10, code: 10, name: '物料名称10', spec: '物料规格10', unitName: '吨' },
        { id: 11, code: 11, name: '物料名称11', spec: '物料规格11', unitName: '吨' },
        { id: 12, code: 12, name: '物料名称12', spec: '物料规格12', unitName: '吨' },
        { id: 13, code: 13, name: '物料名称13', spec: '物料规格13', unitName: '吨' },
      ]
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log('页面大小改变', val);
      // 调接口，为list赋值
    },
    handleCurrentChange (val) {
      console.log('页码改变', val);
      // 调接口，为list赋值
    },
  },
  watch: {
    'value': {
      handler (val) {
        console.log('value的值:', val);
      }
    }
  },
}
</script>

<style>
</style>