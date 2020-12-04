<template>
  <div class="form-data">
    <dh-form
      :ref-obj.sync="formInfo.ref"
      :form-data="formInfo.formData"
      :field-list="formInfo.fieldList"
      :rules="formInfo.rules"
      :widthSize="1"
      :operator-list="formInfo.operatorList"
      :list-type-info="listTypeInfo"
      @handleEvent="handleEvent"
    />
  </div>
</template>
<script>
import DhForm from '../../../../../src/components/baseComponents/DhForm'
export default {
  name: 'formData',
  components: {
    DhForm
  },
  data () {
    const isEmail = (rule, value, callback) => {
      const reg = /^([a-z0-9A-Z]+[-|._]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确格式的邮箱'))
      } else {
        callback()
      }
    }
    return {
      // form表单
      formInfo: {
        ref: null,
        formData: {
          id: '', // *唯一ID
          account: '', // *用户账号
          password: '', // *用户密码
          name: '', // *用户昵称
          sex: '', // *性别: 0:男 1:女
          hobby: [], // *爱好: 0:男 1:女
          phone: '', // 手机号码
          createDate: '', // 创建时间
          startDate: '', // 开始日期
          endDate: '', // 结束日期
          wechat: '', // 微信
          qq: '', // qq
          accountType: '', // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
          email: '', // 邮箱
          desc: '', // 描述
          number: '', // 计算器
          status: '' // *状态: 0：停用，1：启用(默认为1)',
        },
        fieldList: [
          { label: '账号', value: 'account', type: 'input', comp: 'el-input', event: 'account' },
          { label: '密码', value: 'password', type: 'password', comp: 'el-input' },
          { label: '昵称', value: 'name', type: 'input', comp: 'el-input' },
          { label: '性别', value: 'sex', type: 'select-arr', comp: 'el-select', list: 'sexList', arrLabel: 'key', arrKey: 'value' },
          { label: '平台用户', value: 'accountType', type: 'select-obj', comp: 'el-select', list: 'accountTypeList' },
          { label: '状态', value: 'status', type: 'select-arr', list: 'statusList', comp: 'el-select', arrLabel: 'key', arrKey: 'value' },
          { label: '爱好', value: 'hobby', type: 'checkbox', comp: 'el-checkbox-group', list: 'hobbyList', event: 'checkbox' },
          { label: '手机号码', value: 'phone', type: 'input', comp: 'el-input' },
          { label: '创建时间', value: 'createDate', type: 'date', dateType: 'year', comp: 'el-date-picker', format: 'yyyy' },
          { label: '时间范围', startDate: 'startDate', endDate: 'endDate', type: 'date', comp: 't-date-picker', event: 'date' },
          { label: '微信', value: 'wechat', type: 'input', comp: 'el-input' },
          { label: 'QQ', value: 'qq', type: 'input', comp: 'el-input' },
          { label: '邮箱', value: 'email', type: 'input', comp: 'el-input' },
          { label: '计数器', value: 'number', type: 'inputNumber', bind: { controls: false }, comp: 'el-input-number' },
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
          name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
          ],
          sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
          hobby: [
            { type: 'array', required: true, message: '请至少选择一个爱好', trigger: 'change' }
          ]
        },
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm }
        ]
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
  // 方法
  methods: {
    // 触发事件
    handleEvent (type, val, key) {
      switch (type) {
        case 'date': // 日期显示
          console.log(1111111, val, type, key)
          this.formInfo.formData[key] = val
          break
        case 'checkbox':
          console.log(2222, val, type, key)
          break
      }
    },
    // 提交form表单
    submitForm () {
      this.formInfo.ref.validate((valid) => {
        console.log(88, valid)
        console.log(77, this.formInfo.formData)
        if (!valid) return
        console.log(999, this.formInfo.formData)
      })
    },
    // 重置form表单
    resetForm () {
      Object.assign(
        this.$data.formInfo.formData,
        this.$options.data().formInfo.formData
      )
    }
  }
}
</script>
<style lang="scss">
.form-data {
  margin: 0 auto;
  padding: 40px;
  width: 900px;
}
</style>
