<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-select
        v-model="materialId"
        :optionSource="materialIdArr"
        labelKey="materialName"
        valueKey="id"
        multiple
        isShowPagination
        placeholder="请选择（多选分页）"
        :paginationOption="setSelectPage"
        @current-change="pageChange"
        @change="selectChange"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
import data from './data.json'
import data2 from './data2.json'
export default {
  name: 'TSelectDemo',
  data() {
    return {
      materialId: null,
      materialIdArr: [],
      setSelectPage: {
        pageSize: 6, // 每页显示条数
        currentPage: 1, // 当前页
        pagerCount: 7, // 按钮数，超过时会折叠
        total: 0 // 总条数
      }
    }
  },
  created() {
    this.selectMaterialList(1)
  },
  methods: {
    // 下拉选择分页
    pageChange(val) {
      this.setSelectPage.currentPage = val
      this.selectMaterialList(this.setSelectPage.currentPage)
    },
    // 获取品名下拉数据
    async selectMaterialList(pageNum) {
      let res
      if (pageNum === 1) {
        res = await data
      } else {
        res = await data2
      }
      if (res.success) {
        // console.log('获取品名下拉数据', res.data)
        this.materialIdArr = res.data.records
        this.setSelectPage.total = res.data.total
      }
    },
    selectChange(val) {
      console.log('selectChange', val, this.materialId)
    }
  }
}
</script>
