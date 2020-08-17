<template>
  <div class="t-search-demo">
    <t-layout sectionTitle="搜索组件">
      <div class="content-main t-margin20">
        <t-search
          tips="请输入用户名"
          :searchValue="searchValue"
          :selectValue="selectValue"
          @click="search"
          @change="typeChange"
          :searchCondition="searchCondition"
        ></t-search>
      </div>
    </t-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchValue: '', // 查询条件
      selectValue: '0', // 初始化查询条件
      searchCondition: [
        {
          label: '新增待审批',
          value: '0'
        },
        {
          label: '新增已通过',
          value: '1'
        },
        {
          label: '新增已驳回',
          value: '2'
        }
      ]
    }
  },
  methods: {
    search (val) {
      console.log('点击查询按钮', val)
    },
    typeChange (val) {
      this.searchValue = ''
      this.selectValue = val
    }
  }
}
</script>
