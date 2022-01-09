<template>
  <div class="warn-notice-detail">
    <t-layout sectionTitle="预警通知/详情" returnBtn @click="backBtn">
      <div class="content-main">
        <div class="content-hd">
          <div class="hd-title">机构基本详情</div>
        </div>
        <div class="card-wrap">
          <div class="list-group">
            <div class="list-group-item">
              <div class="el-row static-view">
                <dl class="dl-horizontal el-col-24">
                  <dt>金单编号</dt>
                  <dd>**************</dd>
                </dl>
              </div>
              <div class="el-row static-view">
                <dl class="dl-horizontal el-col-8">
                  <dt>机构编号</dt>
                  <dd>**************</dd>
                </dl>
                <dl class="dl-horizontal el-col-8">
                  <dt>机构编号</dt>
                  <dd>**************</dd>
                </dl>
                <dl class="dl-horizontal el-col-8">
                  <dt>机构编号</dt>
                  <dd>**************</dd>
                </dl>
                <dl class="dl-horizontal el-col-8">
                  <dt>机构编号</dt>
                  <dd>**************</dd>
                </dl>
                <dl class="dl-horizontal el-col-8">
                  <dt>机构编号</dt>
                  <dd>**************</dd>
                </dl>
                <dl class="dl-horizontal el-col-8">
                  <dt>机构编号</dt>
                  <dd>**************</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div class="content-hd">
          <div class="hd-title">银行账户信息</div>
        </div>
        <div class="card-wrap">
          <div class="list-group">
            <div class="list-group-item">
              <div class="el-row static-view">
                <dl class="dl-horizontal el-col-24">
                  <dt>金单编号</dt>
                  <dd>**************</dd>
                </dl>
              </div>
              <div class="el-row static-view">
                <dl class="dl-horizontal el-col-8">
                  <dt>机构编号</dt>
                  <dd>**************</dd>
                </dl>
                <dl class="dl-horizontal el-col-8">
                  <dt>机构编号</dt>
                  <dd>**************</dd>
                </dl>
                <dl class="dl-horizontal el-col-8">
                  <dt>机构编号</dt>
                  <dd>**************</dd>
                </dl>
                <dl class="dl-horizontal el-col-8">
                  <dt>机构编号</dt>
                  <dd>**************</dd>
                </dl>
                <dl class="dl-horizontal el-col-8">
                  <dt>机构编号</dt>
                  <dd>**************</dd>
                </dl>
                <dl class="dl-horizontal el-col-8">
                  <dt>机构编号</dt>
                  <dd>**************</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div class="content-hd">
          <div class="hd-title">企业用户信息</div>
        </div>
        <div class="card-wrap">
          <div class="list-group">
            <div class="list-group-item">
              <t-table
                :table="table"
                :columns="columns"
                @size-change="handlesSizeChange"
                @page-change="handlesCurrentChange"
                @sort-change="sortChange"
              />
            </div>
          </div>
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
  name: 'warnNoticeDetail',
  data () {
    return {
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
          }
        ],
        operatorConfig: {
          fixed: 'right',
          width: 100,
          label: '操作'
        }
      }
    }
  },
  mounted () {
    console.log('接收参数params', this.$route.params.id)
    console.log('接收参数query', this.$route.query.id)
  },
  methods: {
    // 选择当前展示的总页码
    handlesSizeChange (val) {
      console.log(22, val)
    },
    // 选择当前页码
    handlesCurrentChange (val) {
      console.log(33, val)
    },
    // 排序事件
    sortChange (val) {
      console.log(777, val)
    },
    // 返回
    backBtn () {
      this.$router.push({ path: '/nested/menu1/menu1-2/warnNotice' })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
