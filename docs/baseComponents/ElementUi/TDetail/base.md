# 详情组件

---

<common-code-format>
  <docsComponents-TDetail-index slot="source"></docsComponents-TDetail-index>
在组件中需配置：

`descColumn`：布局一行显示几列（默认：一行显示 4 列）

`descData` 显示数据源<br/>

若需要配置`filters`（下拉选择转中文）<br/>
`descData`每项中配置`filters`有三个参数

```js
filters: {
      list: 'stockTakeTypeList', // listTypeInfo里面对应的值
      key: 'id', // key  数据源的key字段（默认：dictValue）
      label: 'label' // 数据源的label字段（默认：dictLabel）
    }
```

还需要配置`listTypeInfo`下拉数据源；类型 Object<br/>

`dataList`后台返回的详情接口数据

<<< @/docs/.vuepress/components/docsComponents/TDetail/index.vue
</common-code-format>

### 配置参数（Attributes）

| 参数          | 说明                                               | 类型            | 默认值      |
| :------------ | :------------------------------------------------- | :-------------- | :---------- |
| descData      | 详情页面数据源                                     | Array           | 无          |
| ----label     | 详情字段说明标题                                   | String          | 无          |
| ----value     | 详情字段返回值                                     | String          | 无          |
| ----fieldName | value 返回值的字段                                 | String          | 无          |
| ----slotName  | 插槽（自定义 value）                               | slot            | 无          |
| ----span      | 占用的列宽，默认占用 1 列，最多 4 列               | Number          | 1           |
| ----tooltip   | value 值的提示语                                   | String/function | 无          |
| ----filters   | 字典类型（即后台返回的是数字类型）过滤转成中文     | Object          | 无          |
| -------list   | 字典 list 定义的数据名即 listTypeInfo 里面对应的值 | String          | 无          |
| -------key    | 下拉数据源的 key 字段                              | String          | 'dictValue' |
| -------label  | 下拉数据源的 label 字段                            | String          | 'dictLabel' |
| dataList      | 开启 filters 时详情接口返回的数据                  | Object          | {}          |
| listTypeInfo  | 开启 filters 时下拉数据源                          | Object          | {}          |
