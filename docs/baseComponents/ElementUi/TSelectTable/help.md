# TSelectTable 参数配置

### 1. 简介：基于 ElementUI el-table和el-select组件的二次封装，着重于数据层面，HTML 一行代码

TForm 表单组件
**代码示例：**

```html
<!-- 单选 -->
<t-select-table
    :table="table"
    :columns="table.columns"
    :max-height="400"
    :keywords="{label:'name',value:'id'}"
    @radioChange="radioChange"
  />

  <!-- 多选 -->
  <t-select-table
    :table="table"
    :columns="table.columns"
    :max-height="400"
    :keywords="{label:'name',value:'id'}"
    multiple
    @selectionChange="selectionChange"
  >

```

### 2. 配置参数（Attributes）继承 el-table 及 el-select 属性

| 参数              | 说明                                                                                | 类型                      | 默认值     |
| :---------------- | :---------------------------------------------------------------------------------- | :------------------------ | :--------- |
| v-model           | 绑定值                                                                              | boolean / string / number | 仅显示     |
| table             | 表格数据对象                                                                        | Object                    | {}         |
| ---data           | 展示下拉数据源                                                                      | Array                     | []         |
| ---total          | 数据总条数                                                                          | Number                    | -          |
| ---pageSize       | 每页显示条目个数                                                                    | Number                    | -          |
| ---currentPage    | 当前页数                                                                            | Number                    | -          |
| columns           | 表头信息                                                                            | Array                     | []         |
| ----bind          | el-table-column Attributes                                                          | Object                    | -          |
| ----noShowTip     | 是否换行 （设置：noShowTip:true）;开启虚拟列表不会换行                              | Boolean                   | false      |
| ----fixed         | 列是否固定( left, right)                                                            | string, boolean           | -          |
| ----align         | 对齐方式(left/center/right)                                                         | String                    | center     |
| ----render        | 返回三个参数(text：当前值,row：当前整条数据 ,index：当前行)                         | function                  | -          |
| ----slotName      | 插槽显示此列数据（其值是具名作用域插槽）                                            | String                    | -          |
| ------scope       | 具名插槽获取此行数据必须用解构接收{scope}                                           | Object                    | 当前行数据 |
| keywords          | 关键字配置（value-key 配置）                                                        | Object                    | 无         |
| ------label       | 选项的标签                                                                          | String                    | ‘label’    |
| ------value       | 选项的值                                                                            | String                    | ‘value’    |
| isShowFirstColumn | 是否显示首列                                                                        | boolean                   | true       |
| radioTxt          | 单选文案                                                                            | String                    | 单选       |
| defaultSelectVal  | 设置第一页默认选中项--keywords.value 值（单选是 String, Number 类型；多选时是数组） | Number / string / Array   | -          |
| multiple          | 是否开启多选                                                                        | Boolean                   | false      |
| isKeyup           | 是否开启回车事件选中第一行(仅支持单选)                                              | Boolean                   | false      |
| filterable        | 是否开启过滤(根据 keywords 的 label 值进行过滤) （开启虚拟列表不支持过滤）          | Boolean                   | true       |
| reserveSelection  | 是否支持翻页选中                                                                    | Boolean                   | true       |
| isShowPagination  | 开启分页                                                                            | Boolean                   | false      |
| tableWidth        | table 宽度                                                                          | Number                    | 550        |
| isShowQuery       | 是否允许配置查询条件(继承TQueryCondition的所有属性、事件、插槽)                     | Boolean                   | false      |
| useVirtual        | 是否开启虚拟列表（可视高度显示10条数据）                                            | Boolean                   | false      |
| maxHeight         | Table 的最大高度。合法的值为数字或者单位为 px 的高度。（开启虚拟列表其默认值540）   | String/Number             | false      |

### 3. 事件（events）继承 el-table 及 el-select 属性

| 事件名          | 说明         | 回调参数                                       |
| :-------------- | :----------- | :--------------------------------------------- |
| page-change     | 页码改变事件 | 返回选中的页码                                 |
| selectionChange | 多选事件     | 返回选中的项数据及选中项的 keywords.value 集合 |
| radioChange     | 单选         | 返回当前项所有数据                             |

### 4.方法（Methods）继承 el-table 及 el-select 属性

| 方法名 | 说明                            | 回调参数 |
| :----- | :------------------------------ | :------- |
| focus  | 使 input 获取焦点               |          |
| blur   | 使 input 失去焦点，并隐藏下拉框 |          |