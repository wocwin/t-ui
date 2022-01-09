
<template>
  <div class="menu-demo-component">
    <t-layout sectionTitle="demo小组件运用">
      <div class="content-main">
        <div class="tool-bar">
          <div class="el-row form-horizontal">
            <div class="el-col-8">
              <div class="form-group">
                <label class="el-col-8 control-label">核心企业</label>
                <div class="el-col-16">
                  <div
                    style="width: 85px;"
                    v-for="item in contributeType"
                    :key="item.value"
                    class="radio-line-item t-overflow-hidden"
                    :class="projectType===item.value?'radioSelected':''"
                    @click="selectType(item.value)"
                  >
                    <i v-if="projectType===item.value" class="el-icon-check icon-check"></i>
                    {{item.text}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tool-bar">
          <div class="el-row form-horizontal">
            <t-search
              :searchValue="searchValue"
              :selectValue="selectValue"
              @click="search"
              :searchCondition="searchCondition"
            >
              <div slot="operate">
                <el-button type="danger" icon="el-icon-circle-plus-outline">新增</el-button>
                <el-button type="danger">修改</el-button>
                <el-button type="danger">删除</el-button>
              </div>
            </t-search>
          </div>
        </div>
        <div class="table-content-wrap">
          <div class="text-muted white-opacity-bg t-text-align-r" style="padding:5px;">
            查询到
            <span class="text-danger">20</span> 条额度信息，总额度 共计
            <span class="text-danger">50000</span>元
          </div>
          <t-table
            :table="table"
            :columns="columns"
            @selection-change="selectionChange"
            @size-change="handlesSizeChange"
            @page-change="handlesCurrentChange"
            @sort-change="sortChange"
          />
        </div>
      </div>
      <template #fixBtn>
        <el-button type="danger">审批通过</el-button>
        <el-button type="primary">驳回</el-button>
      </template>
    </t-layout>
  </div>
</template>
<script>
export default {
  name: 'demoComponent',
  data () {
    return {
      projectType: '1',
      contributeType: [{ value: '1', text: 'ABS' }, { value: '0', text: '再保理' }],
      searchValue: '', // 查询条件
      selectValue: 'code', // 初始化查询条件
      searchCondition: [
        {
          label: '环境名称',
          value: 'name'
        },
        {
          label: '金单编号',
          value: 'code'
        }
      ],
      columns: [
        { prop: 'name', label: '姓名', minWidth: '100', sort: true },
        { prop: 'date', label: '日期', minWidth: '180', sort: true },
        { prop: 'address', label: '地址', minWidth: '220', sort: true },
        { prop: 'name', label: '姓名', minWidth: '100', sort: true },
        { prop: 'date', label: '日期', minWidth: '180', sort: true },
        { prop: 'address', label: '地址', minWidth: '220' },
        { prop: 'name', label: '姓名', minWidth: '100' },
        { prop: 'date', label: '日期', minWidth: '180' },
        { prop: 'address', label: '地址', minWidth: '220' },
        { prop: 'name', label: '姓名', minWidth: '100' },
        { prop: 'date', label: '日期', minWidth: '180' },
        { prop: 'address', label: '地址', minWidth: '220' }
      ],
      table: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        firstColumn: { type: 'selection' },
        data: [
          {
            id: '1',
            date: '2019-09-25',
            name: '张三',
            status: '2',
            address: '广东省广州市天河区'
          },
          {
            id: '2',
            date: '2019-09-26',
            name: '张三1',
            status: '1',
            address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
          },
          {
            id: '3',
            date: '2019-09-27',
            name: '张三2',
            status: '3',
            address: '广东省广州市天河区3'
          }
        ],
        changeColor: { key: 'status', val: 3, txtStyle: '#ef473a' },
        operator: [
          {
            text: '新增',
            type: 'primary',
            fun: this.add
          },
          {
            text: '编辑',
            type: 'danger',
            show: { key: 'status', val: ['2'] },
            fun: this.edit
          },
          {
            text: '删除',
            fun: this.del
          }
        ],
        operatorConfig: {
          fixed: 'right',
          width: 220,
          label: '操作'
        }
      }
    }
  },
  created () {
  },
  methods: {
    // 新增
    add (val) {
      console.log(44, val)
    },
    // 编辑
    edit (val) {
      console.log(55, val)
    },
    // 删除
    del (val) {
      console.log(66, val)
    },
    // 排序事件
    sortChange (val) {
      console.log(777, val)
    },
    // 复选框事件
    selectionChange (val) {
      console.log(11, val)
    },
    // 选择当前展示的总页码
    handlesSizeChange (val) {
      console.log(22, val)
    },
    // 选择当前页码
    handlesCurrentChange (val) {
      console.log(33, val)
    },
    selectType (event) {
      this.projectType = event
    },
    search (val) {
      this.searchValue = val
      this.table.currentPage = 1
      console.log(11, this.selectValue, this.searchValue)
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-demo-component {
}
</style>
