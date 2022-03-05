<template>
  <div class="t-module-form-demo">
    <t-layout sectionTitle="模块表单组件运用" :isShowTitle="false">
      <div class="content-main">
        <t-module-form
          title="模块表单组件运用"
          subTitle="模块表单222"
          ref="sourceForm"
          isGoBackEvent
          :formOpts="formOpts"
          :submit="submit"
          :tabs="tabs"
          @handleEvent="handleEvent"
          @validateError="validateError"
          @tabsChange="tabsChange"
          @back="back"
        >
          <!-- tabs插槽 -->
          <template #tab1>
            <t-module-form
              ref="sourceForm1"
              :formOpts="formOpts"
              :footer="null"
              @handleEvent="handleEvent"
            >
              <template #wechat>
                <div style="display:flex;">
                  <el-input v-model="formOpts.goodsInformation.opts.formData.wechat"></el-input>
                </div>
              </template>
              <template #wechat1>
                <div style="display:flex;">
                  <el-input v-model="formOpts.loadingDate.opts.formData.wechat1"></el-input>
                </div>
              </template>
            </t-module-form>
          </template>
          <template #tab2>
            <div>指派明细</div>
          </template>
          <template #tab3>
            <div>承运明细</div>
          </template>
          <!-- 标题右侧按钮 -->
          <template #extra>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="danger">信息按钮</el-button>
          </template>
          <!-- 表单自定义输入框插槽 -->
          <template #wechat>
            <div style="display:flex;">
              <el-input v-model="formOpts.goodsInformation.opts.formData.wechat"></el-input>
            </div>
          </template>
          <template #wechat1>
            <div style="display:flex;">
              <el-input v-model="formOpts.loadingDate.opts.formData.wechat1"></el-input>
            </div>
          </template>
          <!-- 模块form表单插槽 -->
          <template #freight>
            <el-button type="danger">运费信息</el-button>
            <el-button type="primary" @click="clearValidate">清除校验</el-button>
          </template>
          <template #lineMessage>
            <el-button type="danger">线路信息</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
          </template>
        </t-module-form>
      </div>
    </t-layout>
  </div>
</template>
<script>
export default {
  name: 'TModuleFormDemo',
  data () {
    return {
      tabs: [
        {
          key: 'tab1',
          title: '基础信息'
        },
        {
          key: 'tab2',
          title: '指派明细'
        },
        {
          key: 'tab3',
          title: '承运明细'
        }
      ],
      // 表单配置
      formOpts: {
        goodsInformation: {
          title: '货品信息',
          name: 'goodsInformation',
          disabled: true,
          opts: {
            labelPosition: 'top',
            formData: {
              id: `${Math.floor(Math.random() * 10 + 1)}`, // *唯一ID
              account: '', // *用户账号
              password: '', // *用户密码
              name: '', // *用户昵称
              sex: '', // *性别: 0:男 1:女
              hobby: [], // *爱好: 0:男 1:女
              phone: '', // 手机号码
              createDate: '', // 创建时间
              valDate: '', // el日期选择范围
              wechat: '', // 微信
              qq: '', // qq
              accountType: '', // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
              email: '', // 邮箱
              desc: '', // 描述
              number: '', // 计算器
              status: '' // *状态: 0：停用，1：启用(默认为1)',
            },
            fieldList: [
              { label: '账号', value: 'account', type: 'input', comp: 'el-input', event: 'account', widthSize: 1, width: '33%' },
              { label: '密码', value: 'password', type: 'password', comp: 'el-input' },
              { label: '昵称', value: 'name', type: 'input', comp: 'el-input' },
              { label: '性别', value: 'sex', type: 'select-arr', comp: 'el-select', list: 'sexList', bind: { disabled: false }, arrLabel: 'key', arrKey: 'value' },
              { label: '平台用户', value: 'accountType', type: 'select-obj', comp: 'el-select', list: 'accountTypeList' },
              { label: '状态', value: 'status', type: 'select-arr', list: 'statusList', comp: 'el-select', arrLabel: 'key', arrKey: 'value' },
              { label: '爱好', value: 'hobby', type: 'checkbox', comp: 'el-checkbox-group', list: 'hobbyList', event: 'checkbox' },
              { label: '手机号码', value: 'phone', type: 'input', comp: 'el-input', bind: { maxlength: 11 } },
              { label: '创建时间', value: 'createDate', type: 'year', bind: { valueFormat: 'yyyy' }, comp: 'el-date-picker' },
              {
                labelRender: () => {
                  return (
                    <div class="label_render">
                      <div>element日期</div>
                      <el-tooltip >
                        <template slot="content">
                          <span>总质量4.5吨及以下普通货运车辆的，可填“车籍地6位行政区域代码+000000”。</span>
                        </template>
                        <i class="el-icon-warning-outline" style="cursor: pointer;margin-right:2px;" />
                      </el-tooltip>
                    </div>
                  )
                },
                rules: { required: true, message: '请选择element日期', trigger: 'change' },
                value: 'valDate',
                type: 'daterange',
                comp: 'el-date-picker',
                bind: { rangeSeparator: '-', startPlaceholder: '开始日期', endPlaceholder: '结束日期', valueFormat: 'yyyy-MM-dd' }
              },
              { label: '微信', value: 'wechat', slotName: 'wechat', rules: { required: true, message: '请输入微信', trigger: 'blur' } },
              { label: 'QQ', value: 'qq', type: 'input', comp: 'el-input' },
              { label: '邮箱', value: 'email', type: 'input', comp: 'el-input' },
              { label: '计数器', value: 'number', type: 'inputNumber', bind: { controls: false, min: 2, max: 99 }, comp: 'el-input-number' },
              { label: '描述', value: 'desc', type: 'textarea', comp: 'el-input', className: 't-form-block' }
            ],
            rules: {
              account: [
                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
              ],
              name: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
              // phone: [
              //   { required: true, message: '请输入手机号码', trigger: 'blur' }
              // ],
              // sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
              // hobby: [
              //   { type: 'array', required: true, message: '请至少选择一个爱好', trigger: 'change' }
              // ]
            },
            // 相关列表
            listTypeInfo: {
              hobbyList: [
                { label: '吉他', value: '0' },
                { label: '看书', value: '1' },
                { label: '美剧', value: '2' },
                { label: '旅游', value: '3' },
                { label: '音乐', value: '4' }
              ],
              sexList: [
                { key: '女', value: 1 },
                { key: '男', value: 0 }
              ],
              accountTypeList: {
                0: '手机用户',
                1: '论坛用户',
                2: '平台用户'
              },
              statusList: [
                { key: '启用', value: 1 },
                { key: '停用', value: 0 }
              ]
            }
          }
        },
        freight: {
          title: '运费信息',
          name: 'freight',
          slotName: 'freight'
        },
        lineMessage: {
          title: '线路信息',
          name: 'lineMessage',
          slotName: 'lineMessage'
        },
        loadingDate: {
          name: 'loadingDate',
          title: '承运信息',
          ref: null,
          opts: {
            formData: {
              id: `${Math.floor(Math.random() * 10 + 1)}`, // *唯一ID
              createDate: '', // 创建时间
              valDate: '', // el日期选择范围
              wechat1: '', // 微信
              qq: '', // qq
              accountType: '', // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
              email: '', // 邮箱
              desc: '', // 描述
              number: '', // 计算器
              status: '' // *状态: 0：停用，1：启用(默认为1)',
            },
            fieldList: [
              { label: '创建时间', value: 'createDate', type: 'year', bind: { valueFormat: 'yyyy' }, comp: 'el-date-picker' },
              {
                labelRender: () => {
                  return (
                    <div class="label_render">
                      <div>element日期</div>
                      <el-tooltip >
                        <template slot="content">
                          <span>总质量4.5吨及以下普通货运车辆的，可填“车籍地6位行政区域代码+000000”。</span>
                        </template>
                        <i class="el-icon-warning-outline" style="cursor: pointer;margin-right:2px;" />
                      </el-tooltip>
                    </div>
                  )
                },
                rules: { required: true, message: '请选择element日期', trigger: 'change' },
                value: 'valDate',
                type: 'daterange',
                comp: 'el-date-picker',
                bind: { rangeSeparator: '-', startPlaceholder: '开始日期', endPlaceholder: '结束日期', valueFormat: 'yyyy-MM-dd' }
              },
              { label: '微信', value: 'wechat1', slotName: 'wechat1', rules: { required: true, message: '请输入微信', trigger: 'blur' } },
              { label: 'QQ', value: 'qq', type: 'input', comp: 'el-input' },
              { label: '邮箱', value: 'email', type: 'input', comp: 'el-input' },
              { label: '计数器', value: 'number', type: 'inputNumber', bind: { controls: false, min: 2, max: 99 }, comp: 'el-input-number' },
              { label: '描述', value: 'desc', type: 'textarea', comp: 'el-input', className: 't-form-block' }
            ],
            // 相关列表
            listTypeInfo: {
              sexList: [
                { key: '女', value: 1 },
                { key: '男', value: 0 }
              ],
              accountTypeList: {
                0: '手机用户',
                1: '论坛用户',
                2: '平台用户'
              },
              statusList: [
                { key: '启用', value: 1 },
                { key: '停用', value: 0 }
              ]
            }
          }
        }
      }
    }
  },
  mounted () {
    // 默认选中tab2
    // this.$refs.sourceForm.setSelectedTab('tab2')
  },
  // 方法
  methods: {
    back () {
      console.log('头部标题点击返回事件')
    },
    // 校验失败抛出事件
    validateError (e) {
      for (let n in e) {
        this.$message.error(
          `${this.formOpts[n].title}存在错误,请检查输入是否正确`
        )
      }
    },
    // tabs切换
    tabsChange (val) {
      console.log('tabs切换', val.name)
    },
    // 重置表单
    resetForm () {
      console.log('重置表单')
      this.$refs.sourceForm.resetFormFields()
    },
    // 清除校验
    clearValidate () {
      console.log('清除校验')
      this.$refs.sourceForm.clearValidate()
    },
    // 触发事件
    handleEvent (type, val) {
      console.log(333333, type, val)
      switch (type) {
        case 'checkbox':
          console.log('checkbox', val, type)
          break
      }
    },
    // 提交form表单
    submit (data) {
      console.log('最终提交数据', data)
    }
  }
}
</script>
