<template>
  <t-layout-page>
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
  name: 'bindFun',
  data() {
    return {
      statusList: [],
      formOpts: {
        ref: null,
        formData: {
          account: null, // *用户账号
          name: null, // *用户昵称
          email: null, // 邮箱
          status: null, // 邮箱
          desc: null, // 描述
        },
        fieldList: [
          {
            label: '账号', value: 'account', type: 'input', comp: 'el-input', placeholder: '输入账号开启状态选择禁用邮箱输入',
          },
          {
            label: '昵称', value: 'name', type: 'input', comp: 'el-input'

          },
          {
            label: '状态', value: 'status', placeholder: '请先输入账号', comp: 't-select', isSelfCom: true,
            bind: (fromData) => {
              return {
                disabled: fromData.account == null || fromData.account == '' ? true : false,
                optionSource: this.statusList
              }
            }
          },
          {
            label: '邮箱', value: 'email', type: 'input', comp: 'el-input', bind: (fromData) => {
              return {
                disabled: fromData.account == null || fromData.account == '' ? false : true,
              }
            }
          },
          { label: '描述', value: 'desc', type: 'textarea', comp: 'el-input' }
        ],
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm },
        ]
      },
    }
  },
  computed: {

  },
  created() {
    this.getStatus()
  },
  // 方法
  methods: {
    getStatus() {
      this.statusList = [
        { label: '启用', key: 1 },
        { label: '停用', key: 2 }
      ]
    },
    // 触发事件
    handleEvent(type, val) {
      switch (type) {
        case 'account':
          console.log('account--账号change事件', val, type)
          break
      }
    },
    // 提交form表单
    submitForm() {
      this.formOpts.ref.validate((valid) => {
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
    }
  }
}
</script>
