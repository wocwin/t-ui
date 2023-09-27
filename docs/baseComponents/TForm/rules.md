# 表单校验规则

---

<common-code-format>
  <docsComponents-TForm-rules slot="source"></docsComponents-TForm-rules>

`TForm` 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 `Form-Item` 的 `prop` 属性设置为需校验的字段名即可。校验规则参见 [async-validator](https://github.com/yiminghe/async-validator);

可以`自定义校验规则`可以参考`email`方式来写

<<< @/docs/.vuepress/components/docsComponents/TForm/rules.vue
</common-code-format>
