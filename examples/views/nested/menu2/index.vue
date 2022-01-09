<template>
  <div class="nested-box">
    <t-layout sectionTitle="Demo页面">
      <t-step-wizard
        :stepData="stepData"
        :active="active"
        :successTitle="successTitle"
        @complete="goback"
      >
        <template #first>
          <div class="content-main" style="margin-bottom: 80px;">
            <div class="list-group">
              <div class="list-group-item">
                <t-table
                  :table="table"
                  :columns="columns"
                  @selection-change="selectionChange"
                  @size-change="handlesSizeChange"
                  @page-change="handlesCurrentChange"
                />
              </div>
            </div>
            <div class="list-group t-margin-top-10">
              <div class="list-group-item">
                <t-table
                  :table="table1"
                  :columns="columns1"
                  @selection-change="selectionChange"
                  @size-change="handlesSizeChange"
                  @page-change="handlesCurrentChange"
                />
              </div>
            </div>
            <div class="list-group t-margin-top-20">
              <div class="list-group-item">
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="100px"
                  class="demo-ruleForm t-margin-top-20"
                >
                  <el-form-item label="活动名称" prop="name">
                    <el-input clearable v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="金额" prop="money">
                    <t-input placeholder="请输入金额" v-model="ruleForm.money"></t-input>
                  </el-form-item>
                  <el-form-item label="额度" prop="limit">
                    <el-input
                      placeholder="请输入额度"
                      v-only-number="{max:1000000,min:0,precision:2}"
                      clearable
                      v-model="ruleForm.limit"
                    ></el-input>
                    <el-button
                      v-clipboard:copy="ruleForm.limit"
                      v-clipboard:success="copySuccess"
                    >复制按钮</el-button>
                  </el-form-item>
                  <el-form-item label="活动区域" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="活动时间" required>
                    <el-col :span="11">
                      <el-form-item prop="date1">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model="ruleForm.date1"
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-form-item prop="date2">
                        <el-time-picker
                          placeholder="选择时间"
                          v-model="ruleForm.date2"
                          style="width: 100%;"
                        ></el-time-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="即时配送" prop="delivery">
                    <el-switch v-model="ruleForm.delivery"></el-switch>
                  </el-form-item>
                  <el-form-item label="活动性质" prop="type">
                    <el-checkbox-group v-model="ruleForm.type">
                      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                      <el-checkbox label="地推活动" name="type"></el-checkbox>
                      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="特殊资源" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                      <el-radio label="线上品牌商赞助"></el-radio>
                      <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="活动形式" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </template>
        <template #second>
          <div class="content-main">
            <div class="card-wrap">
              <div class="list-group">
                <div class="list-group-item no-tb-padding">
                  <div class="el-row">
                    <dl class="dl-horizontal el-col-24">
                      <dt>金单编号</dt>
                      <dd>￥1500</dd>
                    </dl>
                  </div>
                </div>
                <div class="list-group-item border-top-dashed">
                  <div class="el-row">
                    <dl class="dl-horizontal el-col-12">
                      <dt>金单金额</dt>
                      <dd>￥1500</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>收单企业</dt>
                      <dd>**********</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>金单金额</dt>
                      <dd>￥1500</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>收单企业</dt>
                      <dd>**********</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>金单金额</dt>
                      <dd>￥1500</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>收单企业</dt>
                      <dd>**********</dd>
                    </dl>
                  </div>
                </div>
                <div class="list-group-item no-tb-padding border-top-dashed">
                  <div class="el-row">
                    <dl class="dl-horizontal el-col-24">
                      <dt>备注</dt>
                      <dd>*********</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="list-group t-margin-top-20">
                <div class="list-group-item no-tb-padding">
                  <div class="el-row">
                    <dl class="dl-horizontal el-col-24">
                      <dt>金单编号</dt>
                      <dd>￥1500</dd>
                    </dl>
                  </div>
                </div>
                <div class="list-group-item border-top-dashed">
                  <div class="el-row">
                    <dl class="dl-horizontal el-col-12">
                      <dt>金单金额</dt>
                      <dd>￥1500</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>收单企业</dt>
                      <dd>**********</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>金单金额</dt>
                      <dd>￥1500</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>收单企业</dt>
                      <dd>**********</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>金单金额</dt>
                      <dd>￥1500</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>收单企业</dt>
                      <dd>**********</dd>
                    </dl>
                  </div>
                </div>
                <div class="list-group-item no-tb-padding border-top-dashed">
                  <div class="el-row">
                    <dl class="dl-horizontal el-col-24">
                      <dt>备注</dt>
                      <dd>*********</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="list-group t-margin-top-20">
                <div class="list-group-item no-tb-padding">
                  <div class="el-row">
                    <dl class="dl-horizontal el-col-24">
                      <dt>金单编号</dt>
                      <dd>￥1500</dd>
                    </dl>
                  </div>
                </div>
                <div class="list-group-item border-top-dashed">
                  <div class="el-row">
                    <dl class="dl-horizontal el-col-12">
                      <dt>金单金额</dt>
                      <dd>￥1500</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>收单企业</dt>
                      <dd>**********</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>金单金额</dt>
                      <dd>￥1500</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>收单企业</dt>
                      <dd>**********</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>金单金额</dt>
                      <dd>￥1500</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>收单企业</dt>
                      <dd>**********</dd>
                    </dl>
                  </div>
                </div>
                <div class="list-group-item no-tb-padding border-top-dashed">
                  <div class="el-row">
                    <dl class="dl-horizontal el-col-24">
                      <dt>备注</dt>
                      <dd>*********</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="list-group t-margin-top-20">
                <div class="list-group-item no-tb-padding">
                  <div class="el-row">
                    <dl class="dl-horizontal el-col-24">
                      <dt>金单编号</dt>
                      <dd>￥1500</dd>
                    </dl>
                  </div>
                </div>
                <div class="list-group-item border-top-dashed">
                  <div class="el-row">
                    <dl class="dl-horizontal el-col-12">
                      <dt>金单金额</dt>
                      <dd>￥1500</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>收单企业</dt>
                      <dd>**********</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>金单金额</dt>
                      <dd>￥1500</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>收单企业</dt>
                      <dd>**********</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>金单金额</dt>
                      <dd>￥1500</dd>
                    </dl>
                    <dl class="dl-horizontal el-col-12">
                      <dt>收单企业</dt>
                      <dd>**********</dd>
                    </dl>
                  </div>
                </div>
                <div class="list-group-item no-tb-padding border-top-dashed">
                  <div class="el-row">
                    <dl class="dl-horizontal el-col-24">
                      <dt>备注</dt>
                      <dd>*********</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </t-step-wizard>
    </t-layout>
  </div>
</template>
<script>
export default {
  name: 'menu2',
  components: {
  },
  data () {
    return {
      successTitle: '提款申请成功，等待资金方审核放款...',
      stepData: [
        {
          id: 1,
          title: '用款申请',
          slotName: 'first',
          btnArr: [
            {
              btnTitle: '下一步',
              params: 1,
              fn: this.next
            }
          ]
        },
        {
          id: 2,
          title: '核对信息',
          slotName: 'second',
          btnArr: [
            {
              btnTitle: '上一步',
              params: 2,
              fn: this.stepBack
            },
            {
              btnTitle: '提交',
              params: 2,
              fn: this.submitBtn
            }
          ]
        },
        {
          id: 3,
          title: '经办完成'
        }
      ],
      moneyFlag: false,
      active: 0,
      columns: [
        { prop: 'id', label: '节点标识', minWidth: '100' },
        { prop: 'name', label: '节点名称', minWidth: '220' }
      ],
      table: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        firstColumn: { type: 'selection' },
        data: [
          { id: 100000, name: 'SIT2-配置中心重启SIT2-配置中心重启SIT2-配置中心重启SIT2-配置中心重启', works: null, nodeDetail: null },
          { id: 2, name: 'SIT2-业务微服务', works: null, nodeDetail: null }
        ],
        operator: [
          {
            text: '查看',
            type: 'primary',
            fun: this.handleEdit
          },
          {
            text: '删除',
            type: 'danger',
            fun: this.nodeDel
          },
          {
            text: '创建部署单',
            type: 'danger',
            fun: this.createPublish
          }
        ],
        operatorConfig: {
          minWidth: 220,
          label: '操作'
        }
      },
      columns1: [
        { prop: 'id', label: '节点标识', minWidth: '100' },
        { prop: 'name', label: '节点名称', minWidth: '220' }
      ],
      table1: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        firstColumn: { type: 'selection' },
        data: [
          { id: 100000, name: 'SIT2-配置中心重启SIT2-配置中心重启SIT2-配置中心重启SIT2-配置中心重启', works: null, nodeDetail: null },
          { id: 2, name: 'SIT2-业务微服务', works: null, nodeDetail: null }
        ],

        operator: [
          {
            text: '详情',
            type: 'primary',
            fun: this.handleEdit
          }
        ],
        operatorConfig: {
          width: 120,
          label: '操作'
        }
      },
      ruleForm: {
        name: '',
        money: '',
        region: '',
        date1: '',
        date2: '',
        limit: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        limit: [
          { required: true, message: '请输入额度', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    copySuccess (event) {
      this.$message.success('复制成功')
    },
    // 调用接口模式
    async getUser () {
      const res = await this.$http('getUser', { loginName: 'admin', userName: 'admin' })
      console.log(88, res)
    },
    submitBtn (val) {
      console.log(777, val)
      this.active += 2
      console.log(88, this.active)
    },
    next () {
      this.$refs.ruleForm.validate((valid) => {
        console.log(88, this.ruleForm)
        // if (!valid) return
        this.active += 1
      })
    },
    stepBack () {
      this.active -= 1
    },
    goback () {
      console.log(1212121)
      this.active = 0
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
    }
  }
}
</script>
