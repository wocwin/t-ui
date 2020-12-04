# DhForm 参数配置

### 1. 简介：基于ElementUI Form表单组件的二次封装，着重于数据层面，HTML一行代码
 DhForm表单组件
**代码示例：**
```
     <dh-form
      :ref-obj.sync="formInfo.ref"
      :form-data="formInfo.formData"
      :field-list="formInfo.fieldList"
      :rules="formInfo.rules"
      :operator-list="formInfo.operatorList"
      :list-type-info="listTypeInfo"
      @handleEvent="handleEvent"
    />
    //注意:ref-obj(form校验规则相当于ref)必须要‘.sync’修饰符
```
### 2. events

|   事件名    | 说明                 |                       返回值                        |
|:-----------:|:---------------------|:---------------------------------------------------:|
| handleEvent | 单个查询条件触发事件 | fieldList中type/查询条件输入的值/fieldList中event值 |
### 3. 配置参数

| 参数           | 说明                                                                | 类型         | 是否必须 |
|----------------|---------------------------------------------------------------------|--------------|----------|
| refObj         | form表单校验规则方法 （可以参考elementUI Form表单方法中的validate） | obj          | 是       |
| className      | 自定义类名                                                          | String       | 否       |
| widthSize      | 每行显示几个输入项（默认两项）                                      | Number       | 否       |
| listTypeInfo   | 下拉选择数据源（type:'select'有效）                                 | Object       | 否       |
| fieldList      | form表单每项list                                                    | Array        | 是       |
| ---comp        | form表单每一项类型（el-select/el-input等）                          | String       | 是       |
| ---bind        | form表单每一项新增属性（是否清除/是否允许筛选）                     | Object       | 否       |
| ---type        | form表单每一项类型                                                  | String       | 是       |
| ------arrLabel | type=select-arr时，每个下拉显示的中文                               | String       | 是       |
| ------arrKey   | type=select-arr时，每个下拉显示的中文传后台的数字                   | String       | 是       |
| ---label       | form表单每一项title                                                 | String       | 是       |
| ---value       | form表单每一项传给后台的参数                                        | String       | 是       |
| ---startDate   | 仅仅针对（type:'t-date'有效）与 endDate同时使用                     | String       | 否       |
| ---endDate     | 仅仅针对（type:'t-date'有效）选择开始——结束日期                     | String       | 否       |
| ---plusTime    | 仅仅针对（type:'t-date'有效）是否带后缀时分秒                       | Boolean      | 否       |
| ---valueFormat | type为date/t-date 日期返回值格式                                    | String       | 是       |
| ---rules       | 每一项输入框的表单校验规则                                          | Object/Array | 否       |
| ---list        | 下拉选择数据源（仅仅对type:'select'有效）                           | String       | 否       |
| ---event       | 每个输入框事件标志                                                  | Array        | 是       |
| ---className   | 如果一行显示则值：‘t-form-block’                                    | String       | 否       |
| formData       | 表单提交数据                                                        | Object       | 是       |
| labelWidth     | label宽度                                                           | String       | 否       |
| rules          | 规则（可依据elementUI配置）                                         | Object/Array | 否       |
| operatorList   | 操作按钮list                                                        | Array        | 否       |
| isOperator     | 是否显示操作按钮                                                    | Boolean      | 否       |

### 4. 关于element-ui el-form/el-form-item提供的一些方法/属性可直接使用，无需其他配置
