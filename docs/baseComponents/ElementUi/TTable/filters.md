# 字典过滤

---

<common-code-format>
  <docsComponents-TTable-filters slot="source"></docsComponents-TTable-filters>
  若需要配置`filters`（下拉选择转中文）<br/>
`columns`每项中配置`filters`有三个参数

```js
filters: {
      list: 'stockTakeTypeList', // listTypeInfo里面对应的下拉数据源命名
      key: 'id', // key  数据源的key字段（默认：dictValue）
      label: 'label' // 数据源的label字段（默认：dictLabel）
    }
```

还需要在`table`中配置`listTypeInfo`下拉数据源；类型 Object<br/>

<<<@/docs/.vuepress/components/docsComponents/TTable/filters.vue
</common-code-format>
