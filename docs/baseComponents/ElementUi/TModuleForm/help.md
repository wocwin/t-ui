# TModuleForm 组件参数配置

### 1. 简介：基于 TForm 表单组件的再次封装，使页面可以分模块的方式（可以收缩）展示 form 表单或者详情页面

TModuleForm 模块表单/详情组件
**代码示例：**

```html
<!-- 第一种 表单形式 -->
<t-module-form
    title="基本使用"
    subTitle="基本使用副标题"
    ref="sourceForm"
    :formOpts="formOpts"
    :submit="submit"
/>
<!-- 第二种详情展示 根据handleType-->
<t-module-form
  title="模块详情--基本使用"
  subTitle="基本使用副标题"
  ref="sourceDetail"
  handleType="desc"
  :descData="descData"
      />
```

## 配置参数（Attributes）继承el-descriptions属性

| 参数             | 说明                                                                             | 类型        | 默认值       |
| :--------------- | :------------------------------------------------------------------------------- | :---------- | :----------- |
| title            | 头部返回按钮标题                                                                 | string      | 无           |
| titleSlot        | 是否使用插槽显示 title                                                           | Boolean     | false        |
| subTitle         | 头部副标题                                                                       | string      | 无           |
| extra            | 操作区，位于 title 行的行尾(右侧)                                                | slot        | 无           |
| footer           | 底部操作区（默认展示“取消/保存”按钮；使用插槽则隐藏）footer="null"时隐藏底部操作 | String/slot | 无           |
| isTabMargin      | tabs是否跟模块分离                                                               | Boolean     | false        |
| tabMarginNum     | tabs跟模块分离距离                                                               | Number      | 10           |
| tabs             | 页面展示是否需要页签（并且 tabs 的 key 是插槽）                                  | Array       | 无           |
| fontBold         | 详情字体是否加粗                                                                 | Boolean     | false        |
| isGoBackEvent    | 点击头部返回（默认返回上一页，设置此值可以自定义 back 事件）                     | Boolean     | false        |
| handleType       | 显示方式（edit 表 form 表单操作，desc 表详情页面）                               | string      | edit         |
| ----edit         | handleType=edit 表 form 表单操作的属性                                           | -           | -            |
| ------formOpts   | 表单配置描述，支持多分组表单                                                     | Object      | 无           |
| ------submit     | 保存时(调用 saveHandle 方法 )，返回 promise 可自动显示 loading                   | function    | 所有表单数据 |
| -----desc        | handleType=desc 表详情页面的属性                                                 | -           | -            |
| ------descColumn | 详情页面展示每行显示几列（handleType= desc 生效）                                | Number      | 4            |
| ------descData   | 详情页面配置描述，支持多分组表 （handleType= desc 生效）                         | Object      | 无           |

### descData 配置参数

| 参数         | 说明                                      | 类型            | 默认值 |
| :----------- | :---------------------------------------- | :-------------- | :----- |
| title        | 详情标题(是否显示控制折叠面板功能)        | String          | 无     |
| slotName     | 插槽(自定义详情数据)有插槽就无需配置 data | slot            | 无     |
| name         | 每组详情定义的名字（作用：是否默认展开）  | String          | 无     |
| disabled     | 禁用时取消收缩功能及隐藏 icon）           | Boolean         | false  |
| data         | 详情配置项                                | Object          | 无     |
| ----label    | 详情字段说明标题                          | String          | 无     |
| ----value    | 详情字段返回值                            | String          | 无     |
| ----slotName | 插槽（自定义 value）                      | slot            | 无     |
| ----span     | 占用的列宽，默认占用 1 列，最多 4 列      | Number          | 1      |
| ----tooltip  | value 值的提示语                          | String/function | 无     |

### formOpts 配置参数

| 参数      | 说明                                      | 类型    | 默认值 |
| :-------- | :---------------------------------------- | :------ | :----- |
| title     | 表单标题(是否显示控制折叠面板功能)        | String  | 无     |
| slotName  | 插槽(自定义表单数据)有插槽就无需配置 opts | slot    | 无     |
| name      | 每组表单定义的名字（作用：是否默认展开）  | String  | 无     |
| widthSize | 每行显示几个输入项（默认两项） 最大值 4   | Number  | 3      |
| disabled  | 禁用时取消收缩功能及隐藏 icon）           | Boolean | false  |
| opts      | 表单配置项                                | Object  | 无     |

#### opts 配置参数（继承TForm的所有属性）

| 参数            | 说明                                                                                                    | 类型         | 是否必须 |
| :-------------- | :------------------------------------------------------------------------------------------------------ | :----------- | :------- |
| rules           | 规则（可依据 elementUI el-form 配置————对应 formData 的值）                                             | Object/Array | 否       |
| operatorList    | 操作按钮 list                                                                                           | Array        | 否       |
| listTypeInfo    | 下拉选择数据源（type:'select'有效）                                                                     | Object       | 否       |
| labelPosition   | 改变表单项 label 与输入框的布局方式(默认：right) /top                                                   | String       | 否       |
| labelWidth      | label 宽度(默认值 120px)                                                                                | String       | 否       |
| formData        | 表单提交数据(对应 fieldList 每一项的 value 值)                                                          | Object       | 是       |
| fieldList       | form 表单每项 list                                                                                      | Array        | 是       |
| ----slotName    | 自定义表单某一项输入框                                                                                  | slot         | 否       |
| ----comp        | form 表单每一项组件是输入框还是下拉选择等（可使用第三方 UI 如 el-select/el-input 也可以使用自定义组件） | String       | 是       |
| ----bind        | 表单每一项属性（继承第三方 UI 的 Attributes，如 el-input 中的 clearable 清空功能）默认清空及下拉过滤    | Object       | 否       |
| ----type        | form 表单每一项类型                                                                                     | String       | 是       |
| ----widthSize   | form 表单某一项所占比例(如果一行展示可以设值：1)                                                        | Number       | 否       |
| ----width       | form 表单某一项所占实际宽度                                                                             | String       | 否       |
| ----arrLabel    | type=select-arr 时，每个下拉显示的中文                                                                  | String       | 否       |
| ----arrKey      | type=select-arr 时，每个下拉显示的中文传后台的数字                                                      | String       | 否       |
| ----label       | form 表单每一项 title                                                                                   | String       | 是       |
| ----labelRender | 自定义某一项 title                                                                                      | function     | 是       |
| ----value       | form 表单每一项传给后台的参数                                                                           | String       | 是       |
| ----rules       | 每一项输入框的表单校验规则                                                                              | Object/Array | 否       |
| ----list        | 下拉选择数据源（仅仅对 type:'select'有效）                                                              | String       | 否       |
| ----event       | 表单每一项事件标志（handleEvent 事件）                                                                  | String       | 否       |
| ----className   | 如果某一项需要一行显示则设置：className:'t-form-block'                                                  | String       | 否       |

## events

| 事件名        | 说明                 | 返回值                                       |
| :------------ | :------------------- | :------------------------------------------- |
| handleEvent   | 单个查询条件触发事件 | fieldList 中的 event 值和对应输入的 value 值 |
| tabsChange    | 点击 tab 切换触发    | 被选中的标签 tab 实例                        |
| validateError | 校验失败抛出事件     | obj——每个收缩块的对象                        |
| back          | 头部标题点击返回事件 | -                                            |

## Methods

| 事件名          | 说明                                                                     | 参数                |
| :-------------- | :----------------------------------------------------------------------- | :------------------ |
| resetFormFields | 重置表单                                                                 | -                   |
| clearValidate   | 清空校验                                                                 | -                   |
| setSelectedTab  | 默认选中 tab                                                             | 默认选中 tab 插槽名 |
| saveHandle      | 异步 form 表单校验，生成 submit 属性（是个 function 并返回所有表单数据） | -                   |
