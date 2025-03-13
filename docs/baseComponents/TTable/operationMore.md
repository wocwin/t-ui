# 操作列--显示更多按钮<el-tag>v1.3.1</el-tag>

---

<common-code-format title="操作列--按钮太多显示更多下拉显示操作" description="">
  <docsComponents-TTable-operationMore slot="source"></docsComponents-TTable-operationMore>
在`operator`操作列数组中设置`isMore`为true，即可显示更多按钮，默认鼠标移入显示下拉操作按钮，在`operatorConfig`中设置`dropdownBind`对象，可配置`btnBind`来配置更多按钮样式；`menuBind`来配置下拉菜单`el-dropdown-menu`样式。在`operator`每项中设置`itemBind`来配置`el-dropdown-item`样式

<<< @/docs/.vuepress/components/docsComponents/TTable/operationMore.vue

</common-code-format>
