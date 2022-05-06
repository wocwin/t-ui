# 使用帮助

_新增自定义插槽显示某列数据_

## 配置参数（Table Attributes）

| 参数                    | 说明                                                                           | 类型         | 是否必须 |
| :---------------------- | :----------------------------------------------------------------------------- | :----------- | :------- |
| table                   | 表格数据对象                                                                   | Object       | 是       |
| ---data                 | 展示数据                                                                       | Array        | 是       |
| ---toolbar              | 表格外操作栏选中表格某行，可以将其数据传出                                     | Array        | 否       |
| ---operator             | 表格内操作栏数据                                                               | Array        | 否       |
| -------show             | 表格内操作栏根据状态显示                                                       | Object       | 否       |
| -------noshow           | 表格内操作栏根据多种状态不显示                                                 | Array        | 否       |
| -------resCode          | 表格内操作栏按钮权限资源（路由 path）                                          | String       | 否       |
| ---operatorConfig       | 表格内操作栏样式                                                               | Object       | 否       |
| ---changeColor          | 整行文字颜色样式控制                                                           | Object       | 否       |
| ---firstColumn          | 表格首列(序号 index,复选框 selection,单选 radio）排列                          | object       | 否       |
| ---total                | 数据总条数                                                                     | Number       | 否       |
| ---pageSize             | 页数量                                                                         | Number       | 否       |
| ---currentPage          | 是否需要显示切换页条数                                                         | Number       | 否       |
| columns                 | 表头信息                                                                       | Array        | 是       |
| ----sort                | 排序 （设置：sort:true）                                                       | Boolean      | 否       |
| ----headerRequired      | 是否显示表头必填'\*'                                                           | Boolean      | 否       |
| ----renderHeader        | 列标题 Label 区域渲染使用的 Function(h, { column, $index }) 可以用 jsx 方式    | Function     | 否       |
| ----bind                | el-table-column Attributes                                                     | Object       | 否       |
| ----noShowTip           | 是否换行 （设置：noShowTip:true）                                              | Boolean      | 否       |
| ----filters             | filters 转义（后台返回数字转中文，时间戳转时间）                               | Object       | 否       |
| ----customRender        | 配置 render                                                                    | Object       | 否       |
| --------comps           | 配置 customRender                                                              | Array        | 否       |
| ----------- comp        | 组件标签                                                                       | String       | 否       |
| ----------- text        | 组件标签文案                                                                   | String       | 否       |
| ----------- bind        | 标签属性                                                                       | Object       | 否       |
| ----------- event       | 标签事件，参数为点击 当前行数据                                                | Function     | 否       |
| ----------- child       | 标签里面标签                                                                   | Array        | 否       |
| ----slotName            | 插槽显示此列数据（其值是具名作用域插槽）                                       | String       | 否       |
| ----------param         | 具名插槽获取此行数据必须用解构接收{param}                                      | Object       | 否       |
| ----canEdit             | 是否开启单元格编辑功能                                                         | Boolean      | 否       |
| ----configEdit          | 表格编辑配置（开启编辑功能有效）                                               | Object       | 否       |
| ----------label         | placeholder 显示                                                               | String       | 否       |
| ----------editComponent | 组件名称可直接指定全局注册的组件，也可引入'element/abtd'如：'a-input/el-input' | String       | 否       |
| ----------bind          | 第三方 UI 的 Attributes，如 el-input 中的 clearable 清空功能                   | Object       | 否       |
| ----------event         | 触发 handleEvent 事件的标志                                                    | String       | 否       |
| ----------type          | 下拉或者复选框显示（select-arr/select-obj/checkbox）                           | String       | 否       |
| ----------list          | 下拉选择数据源名称                                                             | String       | 否       |
| ----------arrLabel      | type:select-arr 时对应显示的中文字段                                           | String       | 否       |
| ----------arrKey        | type:select-arr 时对应显示的数字字段                                           | String       | 否       |
| listTypeInfo            | 下拉选择数据源                                                                 | Object       | 否       |
| footer                  | 底部操作区（默认隐藏，使用插槽展示“保存”按钮）                                 | slot         | 否       |
| isShowFooterBtn         | 是否显示保存按钮                                                               | Boolean      | 否       |
| isEditCell              | 是否开启编辑模式 开启 add 事件激活                                             | Boolean      | 否       |
| isShowTips              | 开启单元格编辑时鼠标移入是否显示“单击可编辑”tips                               | Boolean      | 否       |
| columnSetting           | 是否显示设置（隐藏/显示列）                                                    | Boolean      | 否       |
| name                    | 组件唯一标记，类似 Key 值，用于缓存组件数据                                    | String       | 否       |
| title                   | 表格左上标题                                                                   | String /slot | 否       |
| isMergedCell            | 是否开启合并单元格                                                             | Boolean      | 否       |
| mergeCol                | 第几列合并进行行合并（默认第一列）                                             | Number       | 否       |
| isShowPagination        | 是否显示分页(默认显示分页)                                                     | Boolean      | 否       |
| isCopy                  | 是否允许双击单元格复制                                                         | Boolean      | 否       |

## Methods 方法

| 事件名         | 说明                             | 参数 |
| :------------- | :------------------------------- | :--- |
| clearSelection | 用于多选表格，清空用户的选择     | -    |
| save           | 保存方法（返回编辑后的所有数据） | -    |

## events 其他事件按照 el-table 直接使用（如 sort-change 排序事件）

| 事件名      | 说明             | 返回值                                        |
| :---------- | :--------------- | :-------------------------------------------- |
| page-change | 当前页码         | 当前选中的页码                                |
| add         | 新增按钮         | -                                             |
| save        | 保存按钮         | 编辑后的所有数据                              |
| handleEvent | 单个输入触发事件 | configEdit 中的 event 值和对应输入的 value 值 |

## 具体操作

### 4.0 关于顶部工具栏

使用插槽 toolbar 传入即可

```
<template #toolbar>
  <el-select v-model="optValue"
              placeholder="请选择"
              size="small"
              @change="optionChange">
    <el-option v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
    </el-option>
  </el-select>
</template>
```

### 4.1 若需要表格外操作栏(超过 3 个按钮，第 4 个按钮会以下拉的方式展示)

配置 toolbar 即可（前提条件是，必须使用插槽 toolbar）

```
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

```
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

```
operator: [
  {
    text: '预览',
    type: 'primary',
    fun: this.preview,
    noshow:[{key:'fields',val:'isHasVal'},{key:'status',val:[0,1,99]},{key:'channelCode',val:['bank']}]
    // noshow中的key值(fields/status/channelCode)是表格后台返回的字段
    // 当val等于字符串'isHasVal'时,字段'fields'返回为空时，此行操作按钮隐藏
    // 以上综合：当'status'为0/1/99并且'channelCode'为'bank'及'fields'为空时,隐藏按钮
  }
]
```

### 4.3 关于表格操作栏样式，如固定右侧，宽度

```
operatorConfig: {
  fixed: 'right',
  width: 200,
  label: '操作'
}
```

### 4.4 关于表格某行文字颜色

```
changeColor: {
  key: 'status', // 状态
  val: '0',  // 状态值
  txtStyle: 'red' // 设置文字颜色也可以用“#ef473a”
}
```

### 4.5 关于表格状态 filters 方法使用（在表头 column 对象里添加如下字段）

```
{ prop: 'loanInterest', label: '利息', width: '120' , filters: { method: '%' }},
filters: { method: '%' }：表显示百分比
filters: { method: '￥' }：表显示金额
filters: { param: 'REPAYMENT_STATES' } ：表状态对应的canstants对应的字段
```

### 4.6 新增翻页选中功能（2020-02-27 添加）

**页面代码新增：:row-key 属性和 selection-change 复选框事件**

```
<t-table
        :table="table"
        @size-change="handlesSizeChange"
        @page-change="handlesCurrentChange"
        :row-key="getRowKey"
        @selection-change="handlesSelectionChange"
      />
```

**js 代码**

```
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

```
{ prop: 'name', label: '姓名', minWidth: '100', sort: true, noShowColumn: true },
// 设置noShowColumn为true时，表格隐藏当前列
{ prop: 'address', label: '地址', minWidth: '220', sort: true, noShowTip: true },
  // 设置noShowTip为true时，表单元格换行显示
```

### 4.8 新增行内操作按钮权限配置

```
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
