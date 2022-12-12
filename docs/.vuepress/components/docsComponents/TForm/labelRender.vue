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
        ref: null,
        formData: {
          account: '', // *用户账号
          name: '', // *用户昵称
          valDate: '', // el日期选择范围
          email: '', // 邮箱
          desc: '', // 描述
        },
        fieldList: [
          {
            labelRender: () => {
              return (
                <div style="color:red;">
                  账号
                </div>
              )
            }, label: '账号', value: 'account', type: 'input', comp: 'el-input', event: 'account'
          },
          {
            labelRender: () => {
              return (
                <div style="color:blue;">
                  昵称
                </div>
              )
            }, label: '昵称', value: 'name', type: 'input', comp: 'el-input'
          },
          {
            labelRender: () => {
              return (
                <div class="label_render">
                  <div>日期组件</div>
                  <el-tooltip >
                    <template slot="content">
                      <span>自定义label</span>
                    </template>
                    <i class="el-icon-warning-outline" style="cursor: pointer;margin-right:2px;" />
                  </el-tooltip>
                </div>
              )
            },
            value: 'valDate',
            comp: 't-date-picker',
            bind: { type: 'daterange', isPickerOptions: true }
          },
          {
            labelRender: () => {
              return (
                <div style="color:green;">
                  邮箱
                </div>
              )
            }, label: '邮箱', value: 'email', type: 'input', comp: 'el-input'
          },
          { label: '描述', value: 'desc', type: 'textarea', comp: 'el-input', className: 't-form-block' }
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
