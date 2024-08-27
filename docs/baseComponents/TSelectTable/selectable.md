# 多选--禁用

---

<common-code-format>
  <docsComponents-TSelectTable-selectable slot="source"></docsComponents-TSelectTable-selectable>
  在组件中需配置：<br/>
`multiple` 开启多选；设置`selectable`属性其类型：`Function(row: any, index: number)` 可根据返回值来决定 `CheckBox` 是否可以勾选.。

<<< @/docs/.vuepress/components/docsComponents/TSelectTable/selectable.vue
</common-code-format>


