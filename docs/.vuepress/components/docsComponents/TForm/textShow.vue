<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form :ref-obj.sync="formOpts.ref" :formOpts="formOpts" :widthSize="4" />
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
          account: '张三', // *用户账号
          password: '123456', // *用户密码
          name: '三丫子', // *用户昵称
          sex: '男', // *性别: 0:男 1:女
        },
        fieldList: [
          { label: '账号：', value: 'account', textShow: true },
          { label: '密码：', value: 'password', textShow: true },
          { label: '昵称：', value: 'name', textShow: true },
          { label: '性别：', value: 'sex', textShow: true, textValue: '男' }
        ]
      }
    }
  }
}
</script>
