# 显示查询条件

---

<common-code-format>
  <docsComponents-TSelectTable-isShowQuery slot="source"></docsComponents-TSelectTable-isShowQuery>
  在组件中需配置：<br/>
`table` 数据源及表头信息<br/>
`keywords` 选项中的value（选项的值）,label(选项的标签)<br/>
`@radioChange` 选中事件，传出当前选中对象<br/>
`isShowQuery` 是否开启查询条件配置，其配置继承查询条件组件（TQueryCondition组件）的所有属性、事件、插槽

<<< @/docs/.vuepress/components/docsComponents/TSelectTable/isShowQuery.vue
</common-code-format>


