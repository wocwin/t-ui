# 下拉选择表格组件

---

## 单选

<common-code-format>
  <docsComponents-TSelectTable-index slot="source"></docsComponents-TSelectTable-index>
  在组件中需配置：<br/>
`table` 数据源及表头信息<br/>
`keywords` 选项中的value（选项的值）,label(选项的标签)<br/>
`@radioChange` 选中事件，传出当前选中对象

<<< @/docs/.vuepress/components/docsComponents/TSelectTable/index.vue
</common-code-format>

## 单选--开启键盘事件（上下选择高亮，回车选中）

<common-code-format>
  <docsComponents-TSelectTable-isKeyup slot="source"></docsComponents-TSelectTable-isKeyup>
  在组件中需配置：<br/>
`table` 数据源及表头信息<br/>
`keywords` 选项中的value（选项的值）,label(选项的标签)<br/>
`isKeyup` 是否开启键盘事件（默认不开启）上下选择高亮，回车选中<br/>
`@radioChange` 选中事件，传出当前选中对象

<<< @/docs/.vuepress/components/docsComponents/TSelectTable/isKeyup.vue
</common-code-format>

## 单选（默认选中）

<common-code-format>
  <docsComponents-TSelectTable-radioDefaultSelectVal slot="source"></docsComponents-TSelectTable-radioDefaultSelectVal>
  在组件中需配置：<br/>
`table` 数据源及表头信息<br/>
`defaultSelectVal` 设置`第一页`默认选中项（即`keywords.value`值）是`String, Number`类型（即：keywords.value是"id",那么需要默认选中哪项就输入该项table.data数据的id值即可）<br/>
`keywords` 选项中的value（选项的值）,label(选项的标签)<br/>
`@radioChange` 选中事件，传出当前选中对象

<<< @/docs/.vuepress/components/docsComponents/TSelectTable/radioDefaultSelectVal.vue
</common-code-format>

## 多选（默认选中）

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

## 不显示首列

<common-code-format>
  <docsComponents-TSelectTable-isShowFirstColumn slot="source"></docsComponents-TSelectTable-isShowFirstColumn>
  在组件中需配置：<br/>
  `isShowFirstColumn` 是否显示首列 （默认`true`） <br/>
`table` 数据源及表头信息<br/>
`keywords` 选项中的value（选项的值）,label(选项的标签)<br/>
`@radioChange` 选中事件，传出当前选中对象

<<< @/docs/.vuepress/components/docsComponents/TSelectTable/isShowFirstColumn.vue
</common-code-format>

## 多选

<common-code-format>
  <docsComponents-TSelectTable-multiple slot="source"></docsComponents-TSelectTable-multiple>
在组件中需配置：<br/>
`multiple` 开启多选<br/>
`table` 数据源及表头信息<br/>
`keywords` 选项中的value（选项的值）,label(选项的标签)<br/>
`@selectionChange` 多选事件，传出当前选中项，及选中项的keywords.value集合

<<< @/docs/.vuepress/components/docsComponents/TSelectTable/multiple.vue
</common-code-format>

## 单选开启分页功能

<common-code-format>
  <docsComponents-TSelectTable-radioPagination slot="source"></docsComponents-TSelectTable-radioPagination>

`isShowPagination` 开启分页功能 <br/>
`@page-change`页码改变事件;传出当前选中的页码<br/>
`table` 数据源及表头信息<br/>
`keywords` 选项中的 value（选项的值）,label(选项的标签)<br/>
`@radioChange="radioChange""`事件返回选中的数据

<<< @/docs/.vuepress/components/docsComponents/TSelectTable/radioPagination.vue
</common-code-format>

## 多选开启分页功能（支持翻页选中）

<common-code-format>
  <docsComponents-TSelectTable-showPagination slot="source"></docsComponents-TSelectTable-showPagination>

`isShowPagination` 开启分页功能 <br/>
`reserveSelection` 开启翻页选中功能，默认开启 <br/>
`@page-change`页码改变事件;传出当前选中的页码<br/>
`table` 数据源及表头信息<br/>
`keywords` 选项中的 value（选项的值）,label(选项的标签)<br/>
`@selectionChange="selectionChange"`事件返回选中的数据及 `id`

<<< @/docs/.vuepress/components/docsComponents/TSelectTable/showPagination.vue
</common-code-format>

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
| ----noShowTip     | 是否换行 （设置：noShowTip:true）                                                   | Boolean                   | false      |
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
| filterable        | 是否开启过滤(根据 keywords 的 label 值进行过滤)                                     | Boolean                   | true       |
| reserveSelection  | 是否支持翻页选中                                                                    | Boolean                   | true       |
| isShowPagination  | 开启分页                                                                            | Boolean                   | false      |
| tableWidth        | table 宽度                                                                          | Number                    | 550        |

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
