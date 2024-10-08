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
  name: "btnisHide",
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
        operatorList: [
          {
            label: "提交",
            bind: { type: "danger" },
            fun: this.submitForm,
            isHideBtn: false,
          },
          {
            label: "重置",
            bind: { type: "primary" },
            fun: this.resetForm,
            isHideBtn: false,
          },
          {
            render: () => {
              return (
                <el-button color="#626aef" onClick={() => this.hideReset()}>
                  隐藏显示重置按钮
                </el-button>
              );
            },
          },
          {
            render: () => {
              return (
                <el-button type="danger" onClick={() => this.hideSubmit()}>
                  隐藏显示提交按钮
                </el-button>
              );
            },
          },
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
    hideReset() {
      this.formOpts.operatorList.forEach((item) => {
        if (item.label === "重置" && !item.isHideBtn) {
          item.isHideBtn = true;
        } else {
          if (item.label === "重置") item.isHideBtn = false;
        }
      });
    },
    hideSubmit() {
      this.formOpts.operatorList.forEach((item) => {
        if (item.label === "提交" && !item.isHideBtn) {
          item.isHideBtn = true;
        } else {
          if (item.label === "提交") item.isHideBtn = false;
        }
      });
    },
  },
};
</script>
