# 多选（默认选中）

---

<common-code-format>
  <docsComponents-TSelectTable-multipleDefaultSelectVal slot="source"></docsComponents-TSelectTable-multipleDefaultSelectVal>
  在组件中需配置：<br/>
`table` 数据源及表头信息<br/>
`multiple` 开启多选<br/>
`defaultSelectVal` 设置`第一页`默认选中项（即`keywords.value`值）是`Array`类型（即：`keywords.value`是"id",那么需要默认选中哪项就输入该项`table.data`数据的`id`值即可）<br/>
`keywords` 选项中的value（选项的值）,label(选项的标签)<br/>
`@selectionChange` 多选事件，传出当前选中项，及选中项的keywords.value集合

<<< @/docs/.vuepress/components/docsComponents/TSelectTable/multipleDefaultSelectVal.vue
</common-code-format>