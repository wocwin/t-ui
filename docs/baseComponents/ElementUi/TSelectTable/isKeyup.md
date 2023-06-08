# 单选--开启键盘事件（上下选择高亮，回车选中）

---

<common-code-format>
  <docsComponents-TSelectTable-isKeyup slot="source"></docsComponents-TSelectTable-isKeyup>
  在组件中需配置：<br/>
`table` 数据源及表头信息<br/>
`keywords` 选项中的value（选项的值）,label(选项的标签)<br/>
`isKeyup` 是否开启键盘事件（默认不开启）上下选择高亮，回车选中<br/>
`@radioChange` 选中事件，传出当前选中对象

<<< @/docs/.vuepress/components/docsComponents/TSelectTable/isKeyup.vue
</common-code-format>