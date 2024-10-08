<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form
        :ref-obj.sync="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="1"
        @handleEvent="handleEvent"
      >
        <template #btnSlot>
          <el-button type="primary" plain @click="resetForm"
            >自定义重置</el-button
          >
          <el-button type="danger" plain @click="submitForm"
            >自定义提交</el-button
          >
        </template>
      </t-form>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
export default {
  name: "eventHandledemo",
  data() {
    return {
      // form表单
      formOpts: {
        ref: null,
        btnSlotName: "btnSlot", // 提交按钮插槽名称
        formData: {
          account: null, // *用户账号
          name: null, // *用户昵称
          email: null, // 邮箱
          desc: null, // 描述
        },
        fieldList: [
          {
            label: "账号",
            value: "account",
            type: "input",
            comp: "el-input",
          },
          {
            label: "昵称",
            value: "name",
            type: "input",
            comp: "el-input",
          },
          { label: "邮箱", value: "email", type: "input", comp: "el-input" },
          { label: "描述", value: "desc", type: "textarea", comp: "el-input" },
        ],
      },
    };
  },
  // 方法
  methods: {
    // 触发事件
    handleEvent(type, val) {
      switch (type) {
        case "account":
          console.log("account--账号change事件", val, type);
          break;
      }
    },
    // 提交form表单
    submitForm() {
      this.formOpts.ref.validate((valid) => {
        console.log(77, this.formOpts.formData);
        if (!valid) return;
        console.log("最终数据", this.formOpts.formData);
      });
    },
    // 重置form表单
    resetForm() {
      Object.assign(
        this.$data.formOpts.formData,
        this.$options.data().formOpts.formData
      );
    },
  },
};
</script>
