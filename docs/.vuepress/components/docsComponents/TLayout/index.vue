<template>
  <t-layout-page style="background: #eee">
    <t-layout-page-item isNoBottomMargin>
      <t-query-condition ref="queryCondition" :opts="opts" @submit="conditionEnter" />
    </t-layout-page-item>
    <t-layout-page-item>
      <t-form
        :ref-obj.sync="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="1"
        @handleEvent="handleEvent"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
export default {
  name: 'dhFormDemo',
  data() {
    return {
      // form表单
      formOpts: {
        ref: null,
        formData: {
          account: null, // *用户账号
          password: null, // *用户密码
          name: null, // *用户昵称
          sex: null, // *性别: 0:男 1:女
          sex1: 1, // *性别: 0:男 1:女
          hobby: [], // *爱好: 0:男 1:女
          phone: null, // 手机号码
          qq: null, // qq
          accountType: null, // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
          email: null, // 邮箱
          desc: null, // 描述
          number: null, // 计算器
          status: null // *状态: 0：停用，1：启用(默认为1)',
        },
        fieldList: [
          { label: '账号', value: 'account', type: 'input', comp: 'el-input', prepend: '测试' },
          { label: '密码', value: 'password', type: 'password', comp: 'el-input' },
          { label: '昵称', value: 'name', type: 'input', comp: 'el-input', isTrim: true },
          { label: '性别', value: 'sex', type: 'select-arr', comp: 'el-select', list: 'sexList', bind: { disabled: false }, arrLabel: 'key', arrKey: 'value' },
          { label: '性别1', value: 'sex1', type: 'radio', comp: 'el-radio-group', list: 'sexList1', bind: { disabled: false } },
          { label: '平台用户', value: 'accountType', type: 'select-obj', comp: 'el-select', list: 'accountTypeList' },
          { label: '状态', value: 'status', type: 'select-arr', list: 'statusList', comp: 'el-select', arrLabel: 'key', arrKey: 'value' },
          { label: '爱好', value: 'hobby', type: 'checkbox', comp: 'el-checkbox-group', list: 'hobbyList', event: 'checkbox' },
          { label: '手机号码', value: 'phone', type: 'input', comp: 'el-input', bind: { maxlength: 11 } },
          { label: 'QQ', value: 'qq', type: 'input', comp: 'el-input' },
          { label: '邮箱', value: 'email', type: 'input', comp: 'el-input' },
          { label: '计数器', value: 'number', type: 'inputNumber', bind: { controls: false, min: 2, max: 99 }, comp: 'el-input-number' },
          { label: '描述', value: 'desc', type: 'textarea', comp: 'el-input', widthSize: 1 }
        ],
        operatorList: [
          { label: '提交', bind: { type: 'danger' }, fun: this.submitForm },
          { label: '重置', bind: { type: 'primary' }, fun: this.resetForm },
        ],
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
          sexList1: [
            { label: '女', value: 1 },
            { label: '男', value: 0 }
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
      },
      queryData: {
        likeCargoNo: null,
        likeBookNo: null,
        likeTransportNo: null,
        likeCargoName: null
      },
      likeBookNoList: []
    }
  },
  computed: {
    opts() {
      return {
        likeCargoNo: {
          label: '货源编号',
          comp: 'el-input',
          event: {
            change: (val) => this.handleBranchCode(val)
          },
        },
        likeBookNo: {
          label: 't-select单选',
          comp: 't-select',
          // defaultVal: 'W1',
          placeholder: '请先输入货源编号',
          bind: (row) => {
            return {
              disabled: row.likeCargoNo == null || row.likeCargoNo == '' ? true : false,
              optionSource: this.likeBookNoList
            }
          }
        },
        likeTransportNo: {
          label: '运单编号',
          comp: 'el-input',
        },
        likeCargoName: {
          label: '货品名称',
          comp: 'el-input',
        }
      }
    },
    // 查询条件所需参数
    getQueryData() {
      const { likeCargoNo, likeBookNo, likeTransportNo, likeCargoName } = this.queryData
      return {
        likeCargoNo,
        likeBookNo,
        likeTransportNo,
        likeCargoName
      }
    }
  },
  methods: {
    // 货源编号
    handleBranchCode(val) {
      console.log('货源编号事件', val)
      this.recordStepsList()

    },
    //获取t-select单选数据
    recordStepsList(workOrderNo) {
      // const res = await this.$api.recordStepsList(workOrderNo)
      this.likeBookNoList = [
        {
          label: '前纺一车间',
          key: 'W1'
        },
        {
          label: '前纺二车间',
          key: 'W2'
        },
        {
          label: '前纺三车间',
          key: 'W3'
        }
      ]
    },
    // 点击查询按钮
    conditionEnter(data) {
      console.log('查询条件', data)
      this.queryData = data
      console.log('最终条件', this.getQueryData)
    },
    // 触发事件
    handleEvent(type, val) {
      switch (type) {
        case 'checkbox':
          console.log(`handleEvent事件监听${type}：`, val, type)
          break
      }
    },
    // 提交form表单
    submitForm() {
      this.formOpts.ref.validate((valid) => {
        if (!valid) return
        console.log('最终数据', this.formOpts.formData)
      })
    },
    // 重置form表单
    resetForm() {
      Object.assign(
        this.$data.formOpts.formData,
        this.$options.data().formOpts.formData
      )
    }
  }
}
</script>
