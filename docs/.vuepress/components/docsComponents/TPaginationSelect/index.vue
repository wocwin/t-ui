<template>
  <div class="t-pagination-select-demo" style="width:100%;min-height:100px;padding:15px;">
    <el-form
      :model="addForm"
      :rules="addFormRules"
      ref="addForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="品名(原料)" prop="materialId">
        <t-pagination-select
          @page-change="pageChange"
          :optionSource="materialIdArr"
          v-model="addForm.materialId"
          labelKey="materialName"
          valueKey="id"
          :paginationOption="setSelectPage"
        />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitImportForm">提交</el-button>
  </div>
</template>
<script>
import data from './data.json'
import data2 from './data2.json'
export default {
  name: 'TPaginationSelectDemo',
  data () {
    return {
      addForm: {
        materialId: null, // 产出品名
      },
      addFormRules: {
        materialId: [
          { required: true, message: '请选择品名(原料)！', trigger: 'change' }
        ]
      },
      materialIdArr: [],
      setSelectPage: {
        pageSize: 6, // 每页显示条数
        currentPage: 1, // 当前页
        pagerCount: 7, // 按钮数，超过时会折叠
        total: 0 // 总条数
      }
    }
  },
  created () {
    this.selectMaterialList(1)
  },
  methods: {
    // 下拉选择分页
    pageChange (val) {
      this.setSelectPage.currentPage = val
      this.selectMaterialList(this.setSelectPage.currentPage)
    },
    // 获取品名下拉数据
    async selectMaterialList (pageNum) {
      // const params = {
      //   pageNum: pageNum || 1,
      //   pageSize: this.setSelectPage.pageSize,
      // }
      // const res = await Api.selectMaterialList(params)
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
    submitImportForm () {
      this.$refs.addForm.validate(async (valid) => {
        if (!valid) return
        console.log('提交', this.addForm)
      })
    },
  }
}
</script>
