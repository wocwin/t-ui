# TSelectTable 参数配置

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

| 参数                                         | 说明                                                                              | 类型                      | 默认值     |
| :------------------------------------------- | :-------------------------------------------------------------------------------- | :------------------------ | :--------- |
| v-model                                      | 绑定值（输入框回显值）                                                            | boolean / string / number | -          |
| table                                        | 表格数据对象                                                                      | Object                    | {}         |
| ---data                                      | 展示下拉数据源                                                                    | Array                     | []         |
| ---total                                     | 数据总条数                                                                        | Number                    | -          |
| ---pageSize                                  | 每页显示条目个数                                                                  | Number                    | -          |
| ---currentPage                               | 当前页数                                                                          | Number                    | -          |
| columns                                      | 表头信息                                                                          | Array                     | []         |
| ----bind                                     | el-table-column Attributes                                                        | Object                    | -          |
| ----fixed                                    | 列是否固定( left, right)                                                          | string, boolean           | -          |
| ----align                                    | 对齐方式(left/center/right)                                                       | String                    | center     |
| ----render                                   | 返回三个参数(text：当前值,row：当前整条数据 ,index：当前行)                       | function                  | -          |
| ----slotName                                 | 插槽显示此列数据（其值是具名作用域插槽）                                          | String                    | -          |
| ------scope                                  | 具名插槽获取此行数据必须用解构接收{scope}                                         | Object                    | 当前行数据 |
| keywords                                     | 关键字配置（value-key 配置）                                                      | Object                    | 无         |
| ------label                                  | 选项的标签                                                                        | String                    | ‘label’    |
| ------value                                  | 选项的值                                                                          | String                    | ‘value’    |
| isShowFirstColumn                            | 是否显示首列                                                                      | boolean                   | true       |
| radioTxt                                     | 单选文案                                                                          | String                    | 单选       |
| defaultSelectVal                             | 设置第一页默认选中项--keywords.value 值                                           | Array                     | -          |
| multiple                                     | 是否开启多选                                                                      | Boolean                   | false      |
| isKeyup                                      | 是否开启回车事件选中第一行(仅支持单选)                                            | Boolean                   | false      |
| filterable                                   | 是否开启过滤(根据 keywords 的 label 值进行过滤) （开启虚拟列表不支持过滤）        | Boolean                   | true       |
| reserveSelection                             | 是否支持翻页选中                                                                  | Boolean                   | true       |
| isShowPagination                             | 开启分页                                                                          | Boolean                   | false      |
| tableWidth                                   | table 宽度(单位：px) 若设置0，宽度100%                                            | Number/String             | 550        |
| selectWidth                                  | select 宽度(单位：px) 若设置0，宽度100%                                           | Number/String             | 0          |
| isShowQuery                                  | 是否允许配置查询条件(继承TQueryCondition的所有属性、事件、插槽)                   | Boolean                   | false      |
| useVirtual                                   | 是否开启虚拟列表（可视高度显示10条数据）                                          | Boolean                   | false      |
| maxHeight                                    | Table 的最大高度。合法的值为数字或者单位为 px 的高度。（开启虚拟列表其默认值540） | String/Number             | false      |
| isShowInput                                  | 是否输入框显示                                                                    | Boolean                   | false      |
| inputWidth                                   | input输入框的宽度(单位：px) 若设置0，宽度100%                                     | Number/String             | 550        |
| inputAttr                                    | 继承所有el-input的属性                                                            | Object                    | -          |
| toolbar                                      | el-table 头部插槽（位置：查询条件下面）                                           | slot                      | -          |
| footer                                       | el-table 底部插槽（位置：分页器上面）                                             | slot                      | -          |
| rowClickRadio<el-tag>1.2.10</el-tag>         | 是否开启整行选中(单选)                                                            | Boolean                   | true       |
| multipleFixed<el-tag>1.2.10</el-tag>         | table 是否固定多选                                                                | Boolean                   | false      |
| radioFixed<el-tag>1.2.10</el-tag>            | table 是否固定单选                                                                | Boolean                   | false      |
| multipleDisableDelete<el-tag>1.2.10</el-tag> | 多选--之前选中的数据不在新数据源下，是否隐藏tag删除icon                           | Boolean                   | true       |
| border<el-tag>1.2.10</el-tag>                | 下拉表格是否显示边框                                                              | Boolean                   | true       |
| tableSize<el-tag>1.2.10</el-tag>             | 下拉表格大小可选值 `medium、small、mini`                                          | String                    | -          |
| radioSelectValLabel<el-tag>1.2.10</el-tag>   | 单选回显label需要动态配置defaultSelectVal 才有选中效果                            | String                    | -          |

### 3. 事件（events）继承 el-table 、el-select 、el-pagination事件

| 事件名          | 说明                                                 | 回调参数                                       |
| :-------------- | :--------------------------------------------------- | :--------------------------------------------- |
| page-change     | 页码改变事件(避免与el-table的current-change事件冲突) | 返回选中的页码                                 |
| selectionChange | 多选事件                                             | 返回选中的项数据及选中项的 keywords.value 集合 |
| radioChange     | 单选                                                 | 返回当前项所有数据                             |
| input-focus     | 输入框聚焦                                           | -                                              |
| input-blur      | 输入框失焦                                           | -                                              |
| input-click     | 输入框点击                                           | -                                              |
| input-clear     | 输入框清空                                           | -                                              |

### 4.方法（Methods）继承 el-table 及 el-select 方法

| 方法名 | 说明                            | 回调参数 |
| :----- | :------------------------------ | :------- |
| clear  | 清空选中项                      |          |
| focus  | 使 input 获取焦点               |          |
| blur   | 使 input 失去焦点，并隐藏下拉框 |          |