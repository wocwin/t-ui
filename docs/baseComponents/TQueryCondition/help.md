# TQueryCondition 参数配置

### 1. 简介：可以让多种查询条件在输入值后置顶并且按钮显示在右侧

查询条件组件
**代码示例：**

```html
<t-query-condition :opts="conditionParams" @submit="conditionEnter" />
```

### 2. 配置参数（Attributes）

| 参数                 | 说明                                            | 类型    | 默认值                                            |
| :------------------- | :---------------------------------------------- | :------ | :------------------------------------------------ |
| opts                 | 接收筛选器组件配置                              | object  | 无                                                |
| loading              | 查询按钮 loading 状态，请求数据时需要体现       | Boolean | false                                             |
| reset                | 是否显示“重置”按钮                              | Boolean | true                                              |
| boolEnter            | 是否敲回车查询                                  | Boolean | true                                              |
| labelWidth           | labelWidth 宽度                                 | String  | '120px'                                           |
| isPackupTxt          | 收起文案                                        | String  | '收起'                                            |
| isExpansionTxt       | 展开文案                                        | String  | '展开'                                            |
| isShowOpen           | 是否显示收起和展开(若查询条件少于 4 个自动隐藏) | Boolean | true                                              |
| isExpansion          | 是否默认展开                                    | Boolean | false                                             |
| btnCheckBind         | 查询按钮配置                                    | object  | {type: 'primary', size: 'small',btnTitle: '查询'} |
| btnResetBind         | 重置按钮配置                                    | object  | { size: 'small',btnTitle: '重置'}                 |
| isFooter             | 不显示按钮                                      | Boolean | true                                              |
| footerBtn            | 按钮插槽                                        | slot    | -                                                 |
| configChangedReset   | 更新opts是否重置（默认重置）                    | Boolean | false                                             |
| isShowWidthSize      | 是否开启动态设置每行显示数                      | Boolean | false                                             |
| widthSize            | 每行显示多少项，最小值2最大值8                  | Number  | 4                                                 |
| maxVisibleRows       | 收起时设置默认展示行数                          | Number  | 1                                                 |
| isDropDownSelectMore | 是否以下拉方式展示更多条件                      | Boolean | false                                             |


### 2-1 以下拉方式展示更多条件--配置参数（Attributes）
| 参数            | 说明                                               | 类型             | 默认值     |
| :-------------- | :------------------------------------------------- | :--------------- | :--------- |
| popoverAttrs    | el-popover配置及中文文案                           | object           | 具体看源码 |
| moreCheckList   | 数据源                                             | Array            | -          |
| -----label      | 标题                                               | string           | -          |
| -----comp       | 组件名称，可直接指定全局注册的组件                 | string,component | -          |
| -----prop       | 接收字段（即后台接收字段）                         | string           | -          |
| -----bind       | 组件配置参数（Attributes）                         | object           | -          |
| -----slotName   | 自定义输入框插槽                                   | string           | -          |
| -----span       | 控件占用的列宽，默认占用 1 列，最大值 4 (独占一行) | number           | 1          |
| -----defaultVal | 默认值                                             | string           | -          |
| -----list       | el-select 组件options 数据                         | Array            | -          |


### 3. opts 配置参数（opts Attributes）

| 参数        | 说明                                                                       | 类型             | 默认值  |
| :---------- | :------------------------------------------------------------------------- | :--------------- | :------ |
| label       | 表单字段说明标题                                                           | string           | -       |
| className   | 自定义 class                                                               | string           | -       |
| labelRender | 自定义 label（render 函数 jsx 方式编写）                                   | function         | -       |
| slotName    | 自定义输入框插槽(作用域插槽解构接收{param或者scope}返回当前所有表单初始值) | string           | -       |
| comp        | 组件名称，可直接指定全局注册的组件                                         | string,component | -       |
| defaultVal  | 默认值                                                                     | -                | -       |
| span        | 控件占用的列宽，默认占用 1 列，最多 4 列 (独占一行)                        | number           | 1       |
| changeEvent | 默认事件为@input，可指定其他事件（下拉选择和日期需要指定“change 事件”）    | string           | 'input' |
| bind        | 继承第三方组件Attributes;`function`时返回值`form`                          | object，function | -       |
| event       | 配置组件事件，与写组件时@change 等同理                                     | object           | -       |
| child       | 子组件列表，类似 select 组件存在 options 子组件的则需要用到                | Array            | -       |

### 4. 事件（events）

| 事件名       | 说明                     | 回调参数                                     |
| :----------- | :----------------------- | :------------------------------------------- |
| change       | 筛选器数据发生变化时触发 | Function(form: {[propName: dataIndex]: any}) |
| submit       | 点击筛选器查询按钮时触发 | Function(form: {[propName: dataIndex]: any}) |
| reset        | 点击筛选器重置按钮时触发 | Function(form: {[propName: dataIndex]: any}) |
| getCheckList | 下拉动态添加条件         | 返回选中的条件项                             |
