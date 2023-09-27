# 单选（默认选中）

---

<common-code-format>
  <docsComponents-TSelectTable-radioDefaultSelectVal slot="source"></docsComponents-TSelectTable-radioDefaultSelectVal>
  在组件中需配置：<br/>
`table` 数据源及表头信息<br/>
`defaultSelectVal` 设置`第一页`默认选中项（即`keywords.value`值）是`String, Number`类型（即：keywords.value是"id",那么需要默认选中哪项就输入该项table.data数据的id值即可）<br/>
`keywords` 选项中的value（选项的值）,label(选项的标签)<br/>
`@radioChange` 选中事件，传出当前选中对象

<<< @/docs/.vuepress/components/docsComponents/TSelectTable/radioDefaultSelectVal.vue
</common-code-format>