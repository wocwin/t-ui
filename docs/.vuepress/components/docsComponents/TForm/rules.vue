<template>
  <div class="dh-form-demo">
    <t-form
      :ref-obj.sync="formOpts.ref"
      :formOpts="formOpts"
      :widthSize="1"
      @handleEvent="handleEvent"
    />
  </div>
</template>

<script>
export default {
  name: 'dhFormDemo',
  data() {
    return {
      // form表单
      formOpts: {
        // labelPosition: 'top',
        ref: null,
        formData: {
          account: '', // *用户账号
          password: '', // *用户密码
          name: '', // *用户昵称
          sex: '', // *性别: 0:男 1:女
          hobby: [], // *爱好: 0:男 1:女
          phone: '', // 手机号码
          createDate: '', // 创建时间
          valDate: '', // el日期选择范围
          email: '', // 邮箱
          desc: '', // 描述
          status: '' // *状态: 0：停用，1：启用(默认为1)',
        },
        fieldList: [
          { label: '账号', value: 'account', type: 'input', comp: 'el-input', event: 'account' },
          { label: '密码', value: 'password', type: 'password', comp: 'el-input' },
          { label: '昵称', value: 'name', type: 'input', comp: 'el-input' },
          { label: '性别', value: 'sex', type: 'select-arr', comp: 'el-select', list: 'sexList', bind: { disabled: false }, arrLabel: 'key', arrKey: 'value' },
          { label: '状态', value: 'status', type: 'select-arr', list: 'statusList', comp: 'el-select', arrLabel: 'key', arrKey: 'value' },
          { label: '爱好', value: 'hobby', type: 'checkbox', comp: 'el-checkbox-group', list: 'hobbyList', event: 'checkbox' },
          { label: '手机号码', value: 'phone', type: 'input', comp: 'el-input', bind: { maxlength: 11 } },
          { label: '创建时间', value: 'createDate', type: 'year', bind: { valueFormat: 'yyyy' }, comp: 'el-date-picker' },
          { label: '日期', value: 'valDate', comp: 't-date-picker', rules: { required: true, message: '请选择element日期', trigger: 'change' }, bind: { type: 'daterange', isPickerOptions: true } },
          { label: '邮箱', value: 'email', type: 'input', comp: 'el-input' },
          { label: '描述', value: 'desc', type: 'textarea', comp: 'el-input', className: 't-form-block' }
        ],
        rules: {
          account: [{ required: true, message: '请输入账号', trigger: 'blur' },],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
          phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
          sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
          hobby: [{ required: true, message: '请至少选择一个爱好', trigger: 'change' }],
          email: [{ validator: this.validatorEmail, message: '自定义配置校验规则', trigger: 'blur' }
          ]
        },
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm },
          { label: '清除校验', type: 'danger', fun: this.clearValidate }
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
  },
  // 方法
  methods: {
    // 邮箱校验
    validatorEmail(rule, value, callback) {
      if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
        callback(new Error(rule.message))
      }
      callback()
    },
    // 触发事件
    handleEvent(type, val) {
      switch (type) {
        case 'checkbox':
          console.log('checkbox', val, type)
          break
      }
    },
    // 提交form表单
    submitForm() {
      this.formOpts.ref.validate((valid) => {
        console.log(88, valid)
        console.log(77, this.formOpts.formData)
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
      // 清空校验
      this.formOpts.ref.clearValidate()
    },
    // 清除校验
    clearValidate() {
      this.formOpts.ref.clearValidate()
    }
  }
}
</script>
