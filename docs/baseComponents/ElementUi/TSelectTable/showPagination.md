# 多选开启分页功能（支持翻页选中）

---

<common-code-format>
  <docsComponents-TSelectTable-showPagination slot="source"></docsComponents-TSelectTable-showPagination>

`isShowPagination` 开启分页功能 <br/>
`reserveSelection` 开启翻页选中功能，默认开启 <br/>
`@page-change`页码改变事件;传出当前选中的页码<br/>
`table` 数据源及表头信息<br/>
`keywords` 选项中的 value（选项的值）,label(选项的标签)<br/>
`@selectionChange="selectionChange"`事件返回选中的数据及 `id`

<<< @/docs/.vuepress/components/docsComponents/TSelectTable/showPagination.vue
</common-code-format>