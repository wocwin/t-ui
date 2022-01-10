# TreeTable 组件

---

<common-code-format>
  <docsComponents-TTable-tree slot="source"></docsComponents-TTable-tree>
  <<< @/docs/.vuepress/components/docsComponents/TTable/tree.vue
</common-code-format>

## 配置参数（TreeTable Attributes）

| 参数             | 说明                                                                          | 类型    | 是否必须 |
| ---------------- | ----------------------------------------------------------------------------- | ------- | -------- |
| dataSource       | 数据源                                                                        | Array   | 是       |
| columns          | 表头信息                                                                      | Array   | 是       |
| -------filters   | filters 转义（后台返回数字转中文，时间戳转时间）                              | Object  | 否       |
| operator         | 表格内操作栏数据                                                              | Array   | 否       |
| -------show      | 表格内操作栏根据状态显示                                                      | Object  | 否       |
| showCheckBox     | 是否显示复选框                                                                | Boolean | 否       |
| defaultExpandAll | 是否默认展开所有树                                                            | Boolean | 否       |
| treeStructure    | 父组件传过来的数据是否标准格式；默认否，对其进行树形格式化,并添加标识类的属性 | Boolean | 否       |
