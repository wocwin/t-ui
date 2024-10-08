# TForm 参数配置

### 1. 代码示例

```html
<t-form
  :ref-obj.sync="formOpts.ref"
  :formOpts="formOpts"
  :widthSize="1"
  @handleEvent="handleEvent"
/>
//注意:ref-obj(form校验规则相当于ref)必须要‘.sync’修饰符
```
### 2. 配置参数

| 参数                                 | 说明                                                                                                    | 类型             | 默认值      |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------ | :--------------- | :---------- |
| refObj                               | form 表单校验规则方法 （可以参考 elementUI Form 表单方法中的 validate）                                 | obj              | -           |
| className                            | 自定义类名                                                                                              | String           | -           |
| labelPosition                        | 改变表单项 label 与输入框的布局方式(默认：right) /top                                                   | String           | 'right'     |
| widthSize                            | 每行显示几个输入项（默认两项）                                                                          | Number           | 2           |
| isTrim                               | 全局是否开启清除前后空格(comp 为 el-input 且 type 不等于'password')                                     | Boolean          | true        |
| formOpts                             | 表单配置项                                                                                              | Object           | {}          |
| ---listTypeInfo                      | 下拉选择数据源（type:'select'有效）                                                                     | Object           | {}          |
| ---fieldList                         | form 表单每项 list                                                                                      | Array            | []          |
| ------isHideItem                     | 动态显示隐藏某一项(function传出formData)                                                                | Boolean/Function | false       |
| ------slotName                       | 自定义表单某一项输入框                                                                                  | slot             | -           |
| ------childSlotName                  | 自定义表单某一下拉选择项子组件插槽（el-option）                                                         | slot             | -           |
| ------comp                           | form 表单每一项组件是输入框还是下拉选择等（可使用第三方 UI 如 el-select/el-input 也可以使用自定义组件） | String/component | -           |
| ------formItemBind                   | 表单每一项属性（继承el-form-item的 Attributes）                                                         | Object           | -           |
| ------bind                           | 继承第三方 UI 的 Attributes）默认清空及下拉过滤;`function`时返回值`formData`                            | Object/Function  | -           |
| ------isTrim                         | 是否不清除前后空格(comp 为 el-input 且 type 不等于'password')                                           | Boolean          | false       |
| ------type                           | form 表单每一项类型                                                                                     | String           | 是          |
| ------widthSize                      | form 表单某一项所占比例(如果占一整行则设置 1)                                                           | Number           | 2           |
| ------width                          | form 表单某一项所占实际宽度                                                                             | String           | 100%        |
| ------arrLabel                       | type=select-arr 时，每个下拉显示的中文                                                                  | String           | 'dictLabel' |
| ------arrKey                         | type=select-arr 时，每个下拉显示的中文传后台的数字                                                      | String           | 'dictValue' |
| ------label                          | form 表单每一项 title                                                                                   | String           | -           |
| ------labelRender                    | 自定义某一项 title                                                                                      | function         | -           |
| ------value                          | form 表单每一项传给后台的参数                                                                           | String           | -           |
| ------rules                          | 每一项输入框的表单校验规则                                                                              | Object/Array     | -           |
| ------list                           | 下拉选择数据源（仅仅对 type:'select'有效）                                                              | String           | -           |
| ------event                          | 表单每一项事件标志（handleEvent 事件）                                                                  | String           | -           |
| ------eventHandle                    | 继承 comp 组件的事件（返回两个参数，第一个自己自带，第二个 formOpts）                                   | Object           | -           |
| ------isSelfCom                      | 是否使用自己封装的组件（TSelect等---含有下拉框）                                                        | Boolean          | false       |
| ---formData                          | 表单提交数据(对应 fieldList 每一项的 value 值)                                                          | Object           | -           |
| ---labelWidth                        | label 宽度                                                                                              | String           | 120px       |
| ---rules                             | 规则（可依据 elementUI el-form 配置————对应 formData 的值）                                             | Object/Array     | -           |
| ---operatorList                      | 操作按钮 list                                                                                           | Array            | -           |
| -------bind                          | 继承el-button所有Attributes(默认值{ type:'primary',size:'small',})                                      | Object           | -           |
| -------fun                           | 事件名                                                                                                  | function         | -           |
| -----isHideBtn<el-tag>1.2.9</el-tag> | 是否隐藏按钮                                                                                            | Boolean          | false       |
| -----render<el-tag>1.2.9</el-tag>    | render函数---不允跟bind、fun、isHideBtn同时使用                                                         | function         | -           |

### 3. events

| 事件名      | 说明                 | 返回值                                                   |
| :---------- | :------------------- | :------------------------------------------------------- |
| handleEvent | 单个查询条件触发事件 | fieldList 中 type/查询条件输入的值/fieldList 中 event 值 |

### 4. Methods

| 事件名          | 说明                         | 参数 |
| :-------------- | :--------------------------- | :--- |
| resetFieldsSelf | 重置表单(含下拉选择表格组件) | -    |
| clearValidate   | 清空校验                     | -    |


### 5. 关于 element-ui el-form/el-form-item 提供的一些属性可直接使用，无需其他配置
