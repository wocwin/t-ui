<template>
  <div class="dh-form-demo">
    <t-form :ref-obj.sync="formOpts.ref" :formOpts="formOpts" :widthSize="1">
      <template #wechat>
        <div style="display:flex;">
          <el-input v-model="formOpts.formData.wechat" placeholder="自定义输入框插槽"></el-input>
        </div>
      </template>
      <!-- 平台用户下拉子组件自定义插槽 -->
      <template #accountType>
        <el-option
          v-for="(item,key) in formOpts.listTypeInfo.accountTypeList"
          :key="key"
          :label="item"
          :value="key"
        ></el-option>
      </template>
      <!-- 状态子组件自定义插槽 -->
      <template #status>
        <el-option
          v-for="(item,key) in formOpts.listTypeInfo.statusList"
          :key="key"
          :label="item.key"
          :value="item.value"
        ></el-option>
      </template>
    </t-form>
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
          accountType: '', // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
          wechat: '', // 微信
          desc: '', // 描述
          status: '', // 状态
        },
        fieldList: [
          { label: '平台用户', placeholder: '对象自定义option插槽', value: 'accountType', type: 'select-obj', comp: 'el-select', childSlotName: 'accountType' },
          { label: '状态', placeholder: '数组自定义option插槽', value: 'status', type: 'select-arr', comp: 'el-select', childSlotName: 'status' },
          { label: '微信', value: 'wechat', slotName: 'wechat' },
          { label: '描述', value: 'desc', type: 'textarea', comp: 'el-input', widthSize: 1 }
        ],
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm },
        ],
        // 相关列表
        listTypeInfo: {
          statusList: [
            { key: '启用', value: 1 },
            { key: '停用', value: 0 }
          ],
          accountTypeList: {
            0: '手机用户',
            1: '论坛用户',
            2: '平台用户'
          }
        }
      }
    }
  },
  // 方法
  methods: {
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
