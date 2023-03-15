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
  name: 'eventHandledemo',
  data() {
    return {
      // form表单
      formOpts: {
        ref: null,
        formData: {
          account: null, // *用户账号
          name: null, // *用户昵称
          email: null, // 邮箱
          desc: null, // 描述
        },
        fieldList: [
          {
            label: '账号', value: 'account', type: 'input', comp: 'el-input',
            eventHandle: {
              focus: (val, scope) => this.accountFocus(val, scope),
              clear: (scope) => this.accountClear(scope),
              blur: (val, scope) => this.accountBlur(val, scope)
            }
          },
          {
            label: '昵称', value: 'name', type: 'input', comp: 'el-input',
            eventHandle: {
              blur: (val, scope) => this.nameBlur(val, scope)
            }
          },
          { label: '邮箱', value: 'email', type: 'input', comp: 'el-input' },
          { label: '描述', value: 'desc', type: 'textarea', comp: 'el-input' }
        ],
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm },
        ]
      }
    }
  },
  // 方法
  methods: {
    accountFocus(val, scope) {
      console.log('账号聚焦事件', val.type, scope)
    },
    accountBlur(val, scope) {
      console.log('账号失焦事件', val.type, scope)
    },
    accountClear(scope) {
      console.log('账号清空事件', scope)
    },
    nameBlur(val, scope) {
      console.log('昵称失焦事件', val.type, scope)
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
