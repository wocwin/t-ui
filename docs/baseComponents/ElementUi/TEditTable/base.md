# TEditTable 编辑 table 组件

---

<common-code-format>
  <docsComponents-TEditTable-index slot="source"></docsComponents-TEditTable-index>
  <<< @/docs/.vuepress/components/docsComponents/TEditTable/index.vue
</common-code-format>

# TEditTable 参数配置

### 1. 简介：基于 ElementUI table组件的二次封装，着重于数据层面，HTML 一行代码

TEditTable 表单组件
**代码示例：**

```html
<t-edit-table
  :table="table"
  :listTypeInfo="listTypeInfo"
  @add="add"
  @save="save"
/>
```

### 1. 配置参数

| 参数                    | 说明                                                                             | 类型   | 是否必须 |
| ----------------------- | -------------------------------------------------------------------------------- | ------ | -------- |
| table                   | 表格数据对象                                                                     | Object | 是       |
| ---data                 | 展示数据源                                                                       | Array  | 是       |
| ---btn                  | 表格头部左侧插槽                                                                 | slot   | 否       |
| ---footer               | 底部操作区（默认展示“保存”按钮；使用插槽则隐藏）footer="null"时隐藏底部操作      | slot   | 否       |
| ---operator             | 表格内操作栏数据                                                                 | Array  | 否       |
| ---operatorConfig       | 表格内操作栏样式                                                                 | Object | 否       |
| ---firstColumn          | 表格首列(序号 index,复选框 selection）排列                                       | Object | 否       |
| ---columns              | 表头信息                                                                         | Array  | 是       |
| ----configEdit          | 表格编辑配置                                                                     | Object | 是       |
| ----------label         | placeholder 显示                                                                 | String | 是       |
| ----------editComponent | 组件名称可直接指定全局注册的组件，也可引入'element/abtd'如：'a-button/el-button' | String | 否       |
| ----------bind          | 第三方 UI 的 Attributes，如 el-input 中的 clearable 清空功能                     | Object | 否       |
| ----------event         | 触发 handleEvent 事件的标志                                                      | String | 否       |
| ----------type          | 下拉或者复选框显示（select-arr/select-obj/checkbox）                             | String | 否       |
| ----------list          | 下拉选择数据源名称                                                               | String | 否       |
| ----------arrLabel      | type:select-arr 时对应显示的中文字段                                             | String | 否       |
| ----------arrKey        | type:select-arr 时对应显示的数字字段                                             | String | 否       |
| listTypeInfo            | 下拉选择数据源                                                                   | Object | 否       |

### 2. events

| 事件名      | 说明             | 返回值                                        |
| :---------- | :--------------- | :-------------------------------------------- |
| add         | 新增按钮         | -                                             |
| save        | 保存按钮         | 最终所有输入项                                |
| handleEvent | 单个输入触发事件 | configEdit 中的 event 值和对应输入的 value 值 |
