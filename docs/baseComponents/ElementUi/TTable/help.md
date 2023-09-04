# 使用帮助

## 配置参数（Table Attributes）继承 el-table 及 el-table-column 的属性

| 参数                    | 说明                                                                                | 类型           | 默认值                |
| :---------------------- | :---------------------------------------------------------------------------------- | :------------- | :-------------------- |
| table                   | 表格数据对象                                                                        | Object         | {}                    |
| ---rules                | 规则（可依据 elementUI el-form 配置————对应 columns 的 prop 值）                    | Object         | -                     |
| ---data                 | 展示数据                                                                            | Array          | []                    |
| ---toolbar              | 表格外操作栏选中表格某行，可以将其数据传出                                          | Array          | -                     |
| ---operator             | 表格内操作栏数据                                                                    | Array          | []                    |
| -------hasPermi         | 表格内操作栏按钮权限资源（结合 btnPermissions 属性使用）                            | String         | -                     |
| -------show             | 表格内操作栏根据状态显示                                                            | Object         | -                     |
| -------noshow           | 表格内操作栏根据多种状态不显示                                                      | Array          | -                     |
| -------type             | 基于 element button type                                                            | String         | text                  |
| ----size                | el-button的size                                                                     | String         | 'mini'                |
| -------render           | 自定义操作按钮 jsx 方式编写                                                         | function       | -                     |
| ---operatorConfig       | 表格内操作栏样式                                                                    | Object         | {}                    |
| ---changeColor          | 整行文字颜色样式控制                                                                | Object         | {}                    |
| ---firstColumn          | 表格首列(序号 index,复选框 selection,单选 radio）排列                               | object         | {}                    |
| ---total                | 数据总条数                                                                          | Number         | -                     |
| ---pageSize             | 页数量                                                                              | Number         | -                     |
| ---currentPage          | 是否需要显示切换页条数                                                              | Number         | -                     |
| columns                 | 表头信息                                                                            | Array          | []                    |
| ----sort                | 排序 （设置：sort:true）                                                            | Boolean        | false                 |
| ----headerRequired      | 是否显示表头必填'\*'                                                                | Boolean        | false                 |
| ----renderHeader        | 列标题 Label 区域渲染使用的可以用 jsx 方式                                          | Function       | -                     |
| ----bind                | el-table-column Attributes                                                          | Object         | -                     |
| ----noShowTip           | 是否换行 （设置：noShowTip:true）;开启虚拟列表不会换行                              | Boolean        | false                 |
| ----render              | 返回三个参数(text：当前值,row：当前整条数据 ,index：当前行)                         | function       | -                     |
| ----slotName            | 插槽显示此列数据（其值是具名作用域插槽）                                            | String         | -                     |
| ----slotNameMerge       | 合并表头插槽显示此列数据（其值是具名作用域插槽）                                    | String         | -                     |
| ----------param         | 具名插槽获取此行数据必须用解构接收{param}                                           | Object         | 当前行数据            |
| ----canEdit             | 是否开启单元格编辑功能                                                              | Boolean        | false                 |
| ----filters             | 字典过滤                                                                            | Object         | -                     |
| ----------list          | listTypeInfo 里面对应的下拉数据源命名                                               | String         | -                     |
| ----------key           | 数据源的 key 字段（默认：dictValue）                                                | String         | 'dictValue'           |
| ----------label         | 数据源的 label 字段（默认：dictLabel）                                              | String         | 'dictLabel'           |
| ----configEdit          | 表格编辑配置（开启编辑功能有效）                                                    | Object         | -                     |
| ----------rules         | 规则（可依据 elementUI el-form 配置————对应 columns 的 prop 值）                    | Object         | -                     |
| ----------label         | placeholder 显示                                                                    | String         | -                     |
| ----------editComponent | 组件名称可直接指定全局注册的组件，也可引入第三方组件                                | String         | input                 |
| ----------bind          | 第三方 UI 的 Attributes                                                             | Object         | -                     |
| ----------eventHandle   | 第三方 UI 的 事件（返回两个参数，第一个自己自带，第二个 scope）                     | Object         | -                     |
| ----------event         | 触发 handleEvent 事件的标志                                                         | String         | -                     |
| ----------type          | 下拉或者复选框显示（select-arr/select-obj/checkbox）                                | String         | -                     |
| ----------list          | 下拉选择数据源名称                                                                  | String         | -                     |
| ----------arrLabel      | type:select-arr 时对应显示的中文字段                                                | String         | -                     |
| ----------arrKey        | type:select-arr 时对应显示的数字字段                                                | String         | -                     |
| listTypeInfo            | 下拉选择数据源{单元格编辑时需要}                                                    | Object         | {}                    |
| title                   | 表格左上标题                                                                        | String /slot   | ''                    |
| toolbar                 | 表格外操作栏 (显示在 table 右侧)                                                    | slot           | -                     |
| footer                  | 底部操作区（默认隐藏，使用插槽展示“保存”按钮）                                      | slot           | -                     |
| isShowFooterBtn         | 是否显示保存按钮（一般整行编辑才会开启）                                            | Boolean        | false                 |
| isEditCell              | 是否开启编辑模式(整行编辑模式)                                                      | Boolean        | false                 |
| isEdit                  | 是否显示添加按钮（在 table 的下面）                                                 | Boolean        | false                 |
| highlightCurrentRow     | 是否高亮选中行                                                                      | Boolean        | false                 |
| isShowTips              | 开启单元格编辑时鼠标移入是否显示“单击可编辑”tips                                    | Boolean        | false                 |
| columnSetting           | 是否显示设置（隐藏/显示列）                                                         | Boolean        | false                 |
| isShowTreeStyle         | 是否开启 tree 树形结构样式                                                          | Boolean        | false                 |
| isMergedCell            | 是否开启合并单元格                                                                  | Boolean        | false                 |
| comparisonOperator      | 多列行合并比较运算符                                                                | String         | ==                    |
| mergeCol                | 第几列合并进行行合并（默认第一列）                                                  | Number         | 0                     |
| isObjShowProp           | 是否开启对象模式渲染数据 功能(适用于一层对象数据)                                   | Boolean        | false                 |
| isShowPagination        | 是否显示分页(默认显示分页)                                                          | Boolean        | false                 |
| pageSizes               | 每页显示个数选择器的选项设置                                                        | number[]       | [10, 20, 50, 100]     |
| isCopy                  | 是否允许双击单元格复制                                                              | Boolean        | false                 |
| spanMethod              | 是否自定义编写合并单元格方法(跟 element 一样)                                       | funtion        | -                     |
| rowClickRadio           | 是否开启点击整行选中单选框                                                          | Boolean        | false                 |
| isTableColumnHidden     | 是否开启合计行隐藏复选框/单选框/序列                                                | Boolean        | false                 |
| sortable                | 是否所有 table 列都开启排序 若值 'custom'，需要监听 Table 的 sort-change 事件       | Boolean/String | -                     |
| isSortable              | 是否开启组件排序功能（仅有升序和降序）                                              | Boolean        | false                 |
| notSortJudge            | 不排序条件判断规则                                                                  | String         | -                     |
| isKeyup                 | 单元格编辑是否开启键盘事件(向上、向下、回车横向的下一个输入框)                      | Boolean        | false                 |
| defaultRadioCol         | 设置默认选中项（单选）defaultRadioCol 值必须大于 0！                                | Number         | -                     |
| btnPermissions          | 按钮权限 store.getters 接收字段                                                     | String         | -                     |
| isRowSort               | 是否开启行拖拽（结合row-key配置）                                                   | Boolean        | false                 |
| columnSetBind           | 列设置按钮配置（继承el-button所有属性）                                             | Object         | -                     |
| ----btnTxt              | 按钮显示文字                                                                        | String         | '列设置'              |
| ----title               | 点击按钮下拉显示title                                                               | String         | '列设置'              |
| ----size                | el-button的size                                                                     | String         | 'small'               |
| ----icon                | el-button的icon                                                                     | String         | 'el-icon-s-operation' |
| onlyIconSort            | 是否开启仅点击排序图标才排序                                                        | Boolean        | false                 |
| useVirtual              | 是否开启虚拟列表                                                                    | Boolean        | false                 |
| maxHeight               | Table 的最大高度。合法的值为数字或者单位为 px 的高度。（开启虚拟列表是其值默认540） | String/Number  | false                 |

## Methods 方法（继承el-table的所有方法）

| 事件名        | 说明                                               | 参数 |
| :------------ | :------------------------------------------------- | :--- |
| save          | 保存方法（返回编辑后的所有数据）                   | -    |
| resetFields   | 对表单进行重置，并移除校验结果（单元格编辑时生效） | —    |
| clearValidate | 清空校验规则（单元格编辑时生效）                   | -    |

## events 其他事件按照 el-table 直接使用（如 sort-change 排序事件）

| 事件名        | 说明                                       | 返回值                                        |
| :------------ | :----------------------------------------- | :-------------------------------------------- |
| page-change   | 当前页码                                   | 当前选中的页码                                |
| radioChange   | 单选选中事件                               | 返回当前选中的整行数据                        |
| add           | 新增按钮                                   | -                                             |
| save          | 保存按钮                                   | 编辑后的所有数据                              |
| validateError | 单元格编辑保存校验不通过触发               | 返回校验不通过的 prop--label 集合             |
| handleEvent   | 单元格编辑时触发事件                       | configEdit 中的 event 值和对应输入的 value 值 |
| sort-change   | 当表格的排序条件发生变化的时候会触发该事件 | { column, prop, order }                       |
| rowSort       | 行拖拽排序后触发事件                       | 返回排序后的table数据                         |

## 具体操作

### 4.0 关于顶部工具栏

使用插槽 toolbar 传入即可

```html
<template #toolbar>
  <el-select
    v-model="optValue"
    placeholder="请选择"
    size="small"
    @change="optionChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>
```

### 4.1 若需要表格外操作栏(超过 3 个按钮，第 4 个按钮会以下拉的方式展示)

配置 toolbar 即可（前提条件是，必须使用插槽 toolbar）

```js
toolbar: [
  {
    text: '返回上一个页面',
    icon: 'el-icon-circle-plus-outline',
    type: 'danger',
    fun: this.getBack
  }
]
```

### 4.2 关于表格内操作栏

配置 operator 即可

```js
operator: [
  {
    text: '预览',
    type: 'primary',
    icon: 'el-icon-delete'
    fun: this.preview
  },
  {
    text: '编辑',
    type: 'danger',
    fun: this.edit,
    show: { key: 'status', val: [3,4] } // 表status值为3或者4时，显示此操作健 根据后台字段返回是数字还是字符串来显示
  },
  {
    text: '撤销',
    fun: this.revoke,
    show: { key: 'status', val: ['1'] }
  }
]
```

#### 补充说明：多种状态控制按钮的显示与隐藏

```js
operator: [
  {
    text: '预览',
    type: 'primary',
    fun: this.preview,
    noshow: [
      { key: 'fields', val: 'isHasVal' },
      { key: 'status', val: [0, 1, 99] },
      { key: 'channelCode', val: ['bank'] }
    ]
    // noshow中的key值(fields/status/channelCode)是表格后台返回的字段
    // 当val等于字符串'isHasVal'时,字段'fields'返回为空时，此行操作按钮隐藏
    // 以上综合：当'status'为0/1/99并且'channelCode'为'bank'及'fields'为空时,隐藏按钮
  }
]
```

### 4.3 关于表格操作栏样式，如固定右侧，宽度

```js
operatorConfig: {
  fixed: 'right',
  width: 200,
  label: '操作'
}
```

### 4.4 关于表格某行文字颜色

```js
changeColor: {
  key: 'status', // 状态
  val: '0',  // 状态值
  txtStyle: 'red' // 设置文字颜色也可以用“#ef473a”
}
```

### 4.6 新增翻页选中功能（2020-02-27 添加）

**页面代码新增：:row-key 属性和 selection-change 复选框事件**

```html
<t-table
  :table="table"
  @size-change="handlesSizeChange"
  @page-change="handlesCurrentChange"
  :row-key="getRowKey"
  @selection-change="handlesSelectionChange"
/>
```

**js 代码**

```js
// 获取列表数据的唯一标识
 getRowKey (row) {
   return row.id
 },
 // 选中的数据
 handlesSelectionChange (val) {
   this.chosenIds = val.map(item => item.id)
 },
```

==注意：==（参考配置参数）
firstColumn: { type: 'selection', isPaging: true },
type: 'selection' 表复选框
isPaging: true 表可以跨页勾选

### 4.7 新增隐藏某列及某单元格内容过长是否换行（还是隐藏并有 tip 提示）

```js
{ prop: 'name', label: '姓名', minWidth: '100', sort: true, noShowColumn: true },
// 设置noShowColumn为true时，表格隐藏当前列
{ prop: 'address', label: '地址', minWidth: '220', sort: true, noShowTip: true },
  // 设置noShowTip为true时，表单元格换行显示
```

### 4.8 新增行内操作按钮权限配置

```js
operator: [
        {
          text: '编辑',
          type: 'primary',
          resCode: 'ent-account-edit',
          fun: this.handleEdit
        }
      ],
// 解析：根据后台返回按钮资源中若无“ent-account-edit”资源，此按钮将不会显示
```

## 关于 element-ui el-table 提供的一些方法，样式如何添加

按照 el-table 写法直接使用即可，无需其他配置
