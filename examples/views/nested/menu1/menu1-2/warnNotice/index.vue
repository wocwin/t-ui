<template>
  <div class="warn-notice">
    <t-layout sectionTitle="预警通知">
      <div class="content-main">
        <div class="tool-bar">
          <div class="el-row form-horizontal">
            <div class="el-col-8">
              <div class="form-group">
                <label class="el-col-8 control-label">核心企业</label>
                <div class="el-col-16">
                  <el-input
                    type="text"
                    class="form-control"
                    placeholder="请输入核心企业名称"
                    v-model="formDate.entName"
                  ></el-input>
                </div>
              </div>
            </div>
            <div class="el-col-8">
              <div class="form-group">
                <label class="el-col-8 control-label">预警层级</label>
                <div class="el-col-16 form-control">
                  <el-select
                    v-model="formDate.valueOption"
                    filterable
                    clearable
                    placeholder="全部"
                    style="width:100%;"
                  >
                    <el-option
                      v-for="(val,index) in options"
                      :key="index"
                      :label="val.label"
                      :value="val.id"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="el-col-8">
              <div class="form-group">
                <label class="el-col-8 control-label">预警指标</label>
                <div class="el-col-16 form-control">
                  <el-select
                    v-model="formDate.valueOption2"
                    filterable
                    clearable
                    placeholder="全部"
                    style="width:100%;"
                  >
                    <el-option
                      v-for="(item,index) in options2"
                      :key="index"
                      :label="item.label"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="el-col-8">
              <div class="form-group">
                <label class="el-col-8 control-label">预警日期</label>
                <div class="el-col-16 form-control">
                  <!-- <el-date-picker
                    v-model="formDate.warnDate.startDate"
                    type="date"
                    class="date-pick"
                    size="large"
                    format="yyyy-MM-dd"
                    picker-options="startTimeConf"
                    placeholder="开始日期"
                  ></el-date-picker>
                  <span style="padding:0 5px;">至</span>
                  <el-date-picker
                    v-model="formDate.warnDate.endDate"
                    type="date"
                    class="date-pick"
                    size="large"
                    format="yyyy-MM-dd"
                    picker-options="endTimeConf"
                    placeholder="结束日期"
                  ></el-date-picker>-->
                  <!-- TDatePicker -->
                  <t-date-picker
                    :startDate="formDate.warnStartDate"
                    :endDate="formDate.warnEndDate"
                    @startChange="startChange"
                    @endChange="endChange"
                  ></t-date-picker>
                </div>
              </div>
            </div>
            <div class="el-col-8">
              <div class="form-group">
                <label class="el-col-8 control-label">额度编号</label>
                <div class="el-col-16">
                  <el-input
                    type="text"
                    class="form-control"
                    placeholder="请输入额度编号"
                    v-model="formDate.code"
                  ></el-input>
                </div>
              </div>
            </div>
            <div class="el-col-8">
              <div class="form-group">
                <label class="el-col-8 control-label">额度范围</label>
                <div class="el-col-16">
                  <div class="input-group flex-box">
                    <el-input
                      type="number"
                      class="form-control"
                      placeholder="最小额度"
                      v-model="formDate.minMoney"
                    ></el-input>
                    <div class="flex-box flex-ver">-</div>
                    <el-input
                      type="number"
                      class="form-control"
                      placeholder="最大额度"
                      v-model="formDate.maxMoney"
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="el-row form-horizontal">
            <div class="el-col-24 flex-box flex-ver">
              <el-button type="danger" @click="query">查询</el-button>
            </div>
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
  name: 'warnNotice',
  data () {
    return {
      formDate: {
        entName: '',
        warnDate: { startDate: '', endDate: '' },
        warnStartDate: '',
        warnEndDate: '',
        valueOption: '',
        valueOption2: '',
        minMoney: '',
        maxMoney: '',
        code: ''
      },
      options: [
        { id: '1', label: '广州' },
        { id: '2', label: '深圳' },
        { id: '3', label: '上海' },
        { id: '4', label: '北京' }
      ],
      options2: [
        { id: '1', label: '苹果' },
        { id: '2', label: '梨子' },
        { id: '3', label: '桃子' },
        { id: '4', label: '香蕉' }
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
            text: '详情',
            type: 'primary',
            fun: this.handleEdit
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
          minWidth: 200,
          label: '操作'
        }
      }
    }
  },
  methods: {
    // 开始时间
    startChange (val) {
      console.log(111, val)
      this.formDate.warnStartDate = val
    },
    // 结束时间
    endChange (val) {
      this.formDate.warnEndDate = val
    },
    query () {
      this.table.currentPage = 1
      console.log(111, this.formDate)
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
    // 详情
    handleEdit (val) {
      console.log(333, val.id)
      this.$router.push({ path: '/nested/menu1/menu1-2/warnNotice/warnNoticeDetail', query: { id: val.id } })
      // this.$router.push({ name: '预警通知/详情', params: { id: val.id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.warn-notice {
  .form-group {
    .date-pick {
      width: 140px;
      .el-input__inner {
        width: 140px;
      }
    }
  }
}
</style>
