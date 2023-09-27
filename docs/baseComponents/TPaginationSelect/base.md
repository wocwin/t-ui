# 下拉选择分页组件

---

<common-code-format>
  <docsComponents-TPaginationSelect-index slot="source"></docsComponents-TPaginationSelect-index>
在组件中需配置：

`@page-change`：选择分页的事件；传回当前选中的页码<br/>
`@change`：下拉选择事件；传回当前选中的值<br/>

`optionSource` 下拉框组件数据源<br/>
`valueKey` 传入的 option 数组中，要作为最终选择项的键值名称<br/>
`labelKey` 传入的 option 数组中，要作为显示项的键值名称<br/>
`paginationOption` object 默认值<br/>

```js
pageSize: 6,//每页显示条数
currentPage: 1,//当前页
pagerCount: 5,//按钮数，超过时会折叠
total: 0 //总条数
```

<<< @/docs/.vuepress/components/docsComponents/TPaginationSelect/index.vue
</common-code-format>
