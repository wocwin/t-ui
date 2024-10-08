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
            render: () => {
              return (
                <el-button color="#626aef" onClick={() => this.resetForm()}>
                  重置
                </el-button>
              );
            },
          },
          {
            render: () => {
              return (
                <el-button type="danger" onClick={() => this.submitForm()}>
                  提交
                </el-button>
              );
            },
          },
          {
            render: () => {
              const slots = {
                reference: () => <el-button>作废</el-button>,
              };
              return (
                <el-popconfirm
                  title="你确定要删除吗？"
                  onConfirm={() => this.nullify()}
                >
                  {slots}
                </el-popconfirm>
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
    nullify() {
      console.log("作废");
    },
  },
};
</script>
