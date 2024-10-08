# TAdaptivePage 参数配置

**代码示例：**

```html
<t-adaptive-page
  title="用户管理列表"
  :table="state.table"
  :columns="state.table.columns"
  :opts="opts"
  @size-change="handlesSizeChange"
  @page-change="handlesCurrentChange"
  @submit="conditionEnter"
/>
```
### 2、配置参数（Attributes）继承 TTable 及 TQueryCondition 组件的所有属性、事件、插槽、方法

| 参数                | 说明                                                         | 类型          | 默认值 |
| :------------------ | :----------------------------------------------------------- | :------------ | :----- |
| leftWidth           | 左侧宽度                                                     | number,String | 260    |
| pageStyle           | t-layout-page 行内样式                                       | object        | -      |
| queryPageStyle      | 查询条件组件的 t-layout-page-item 行内样式                   | object        | -      |
| tablePageStyle      | table 组件的 t-layout-page-item 行内样式                     | object        | -      |
| isTTableSelfFilling | 一屏组件 TTable 自动撑满（即分页器显示最下，table 内容撑满） | Boolean       | false  |


### 3、Slots

| 插槽名                          | 说明                             |
| :------------------------------ | :------------------------------- |
| leftContent                     | 左侧具名插槽                     |
| content<el-tag>v1.4.13</el-tag> | 条件查询与TTable组件之间具名插槽 |
| -                               | 默认插槽                         |
