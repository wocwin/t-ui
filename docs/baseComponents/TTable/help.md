# 使用帮助

## 配置参数（Table Attributes）继承 el-table 及 el-table-column 的属性

| 参数                    | 说明                                                                                  | 类型             | 默认值                |
| :---------------------- | :------------------------------------------------------------------------------------ | :--------------- | :-------------------- |
| table                   | 表格数据对象                                                                          | Object           | {}                    |
| ---rules                | 规则（可依据 elementUI el-form 配置————对应 columns 的 prop 值）                      | Object           | -                     |
| ---data                 | 展示数据                                                                              | Array            | []                    |
| ---toolbar              | 表格外操作栏选中表格某行，可以将其数据传出                                            | Array            | -                     |
| ---operator             | 表格内操作栏数据                                                                      | Array            | []                    |
| -------hasPermi         | 表格内操作栏按钮权限资源（结合 btnPermissions 属性使用）                              | String           | -                     |
| -------show             | 表格内操作栏根据状态显示                                                              | Object           | -                     |
| -------noshow           | 表格内操作栏根据多种状态不显示                                                        | Array            | -                     |
| -------render           | render函数渲染使用的 Function(val) 可以用 jsx 方式                                    | Function         | -                     |
| -------bind             | 继承el-button所有Attributes(默认值{ type:'text',size:'mini',})                        | Object           | -                     |
| -------fun              | 事件名                                                                                | function         | -                     |
| ---operatorConfig       | 表格内操作栏样式                                                                      | Object           | {}                    |
| --------fixed           | 列是否固定在左侧或者右侧。 true 表示固定在左侧(true / 'left' / 'right')               | string / boolean | -                     |
| --------label           | 显示的标题                                                                            | string           | '操作'                |
| --------width           | 对应列的宽度(固定的)                                                                  | string / number  | -                     |
| --------minWidth        | 对应列的最小宽度(会把剩余宽度按比例分配给设置了 min-width 的列)                       | string / number  | -                     |
| --------align           | 对齐方式 （left / center / right）                                                    | string           | 'center'              |
| --------bind            | el-table-column Attributes                                                            | Object           | -                     |
| ---changeColor          | 整行文字颜色样式控制                                                                  | Object           | {}                    |
| ---firstColumn          | 表格首列(序号 index,复选框 selection,单选 radio）排列                                 | object /Array    | -                     |
| -------type             | selection/radio/index/expand                                                          | String           | -                     |
| -------width            | 表格首列宽度                                                                          | string / number  | -                     |
| -------fixed            | 表格首列固定                                                                          | string/boolean   | -                     |
| -------label            | 表格首列表头文字                                                                      | String           | -                     |
| -------bind             | 继承el-table-column所有Attributes                                                     | Object           | -                     |
| ---total                | 数据总条数                                                                            | Number           | -                     |
| ---pageSize             | 页数量                                                                                | Number           | -                     |
| ---currentPage          | 是否需要显示切换页条数                                                                | Number           | -                     |
| columns                 | 表头信息                                                                              | Array            | []                    |
| ----sort                | 排序 （设置：sort:true）                                                              | Boolean          | false                 |
| ----headerRequired      | 是否显示表头必填'\*'                                                                  | Boolean          | false                 |
| ----renderHeader        | 列标题 Label 区域渲染使用的可以用 jsx 方式                                            | Function         | -                     |
| ----allShow             | 自动根据内容撑满列宽(默认取自己设置的minWidth,设置allShow:true，自动根据内容撑满列宽) | Boolean          | -                     |
| ----bind                | el-table-column Attributes                                                            | Object           | -                     |
| ----width               | 对应列的宽度(固定的)                                                                  | string / number  | -                     |
| ----minWidth            | 对应列的最小宽度(会把剩余宽度按比例分配给设置了 min-width 的列)                       | string / number  | -                     |
| ----noShowTip           | 是否换行 （设置：noShowTip:true）;开启虚拟列表不会换行                                | Boolean          | false                 |
| ----isShowHidden        | 是否动态显示隐藏列设置（隐藏/显示列）                                                 | Boolean          | false                 |
| ----render              | 返回三个参数(text：当前值,row：当前整条数据 ,index：当前行)                           | function         | -                     |
| ----slotName            | 插槽显示此列数据（其值是具名作用域插槽）                                              | String           | -                     |
| ----------param/scope   | 具名插槽获取此行数据必须用解构接收{param或者scope}                                    | Object           | 当前行数据            |
| ----slotNameMerge       | 合并表头插槽显示此列数据（其值是具名作用域插槽）                                      | String           | -                     |
| ----------param/scope   | 具名插槽获取此行数据必须用解构接收{param或者scope}                                    | Object           | 当前行数据            |
| ----isClickEdit         | 是否单击开启单元格编辑功能                                                            | Boolean          | false                 |
| ----isShowEditIcon      | 表头是否显示编辑icon(默认显示，设置true:不显示)                                       | Boolean          | -                     |
| ----canEdit             | 是否开启单元格编辑功能                                                                | Boolean          | false                 |
| ----filters             | 字典过滤                                                                              | Object           | -                     |
| ----------list          | listTypeInfo 里面对应的下拉数据源命名                                                 | String           | -                     |
| ----------key           | 数据源的 key 字段（默认：dictValue）                                                  | String           | 'dictValue'           |
| ----------label         | 数据源的 label 字段（默认：dictLabel）                                                | String           | 'dictLabel'           |
| ----configEdit          | 表格编辑配置（开启编辑功能有效）                                                      | Object           | -                     |
| ----------rules         | 规则（可依据 elementUI el-form 配置————对应 columns 的 prop 值）                      | Object           | -                     |
| ----------label         | placeholder 显示                                                                      | String           | -                     |
| ----------editComponent | 组件名称可直接指定全局注册的组件，也可引入第三方组件                                  | String           | input                 |
| ----------bind          | 第三方 UI 的 Attributes及tooltip的Attributes                                          | Object           | -                     |
| ----------eventHandle   | 第三方 UI 的 事件（返回两个参数，第一个自己自带，第二个 scope）                       | Object           | -                     |
| ----------event         | 触发 handleEvent 事件的标志                                                           | String           | -                     |
| ----------type          | 下拉或者复选框显示（select-arr/select-obj/checkbox）                                  | String           | -                     |
| ----------list          | 下拉选择数据源名称                                                                    | String           | -                     |
| ----------arrLabel      | type:select-arr 时对应显示的中文字段                                                  | String           | -                     |
| ----------arrKey        | type:select-arr 时对应显示的数字字段                                                  | String           | -                     |
| listTypeInfo            | 下拉选择数据源{单元格编辑时需要}                                                      | Object           | {}                    |
| title                   | 表格左上标题                                                                          | String /slot     | ''                    |
| toolbar                 | 表格外操作栏 (显示在 table 右侧)                                                      | slot             | -                     |
| footer                  | 底部操作区（默认隐藏，使用插槽展示“保存”按钮）                                        | slot             | -                     |
| isShowFooterBtn         | 是否显示保存按钮（一般整行编辑才会开启）                                              | Boolean          | false                 |
| isEditCell              | 是否开启编辑模式(整行编辑模式)                                                        | Boolean          | false                 |
| isEdit                  | 是否显示添加按钮（在 table 的下面）                                                   | Boolean          | false                 |
| highlightCurrentRow     | 是否高亮选中行                                                                        | Boolean          | false                 |
| isShowTips              | 开启单元格编辑时鼠标移入是否显示“单击可编辑”tips                                      | Boolean          | false                 |
| columnSetting           | 是否显示设置（隐藏/显示列）                                                           | Boolean          | false                 |
| isShowTreeStyle         | 是否开启 tree 树形结构样式                                                            | Boolean          | false                 |
| isMergedCell            | 是否开启合并单元格                                                                    | Boolean          | false                 |
| comparisonOperator      | 多列行合并比较运算符                                                                  | String           | ==                    |
| mergeCol                | 第几列合并进行行合并（默认第一列）                                                    | Number           | 0                     |
| isObjShowProp           | 是否开启对象模式渲染数据 功能(适用于一层对象数据)                                     | Boolean          | false                 |
| isShowPagination        | 是否显示分页(默认显示分页)                                                            | Boolean          | false                 |
| pageSizes               | 每页显示个数选择器的选项设置                                                          | number[]         | [10, 20, 50, 100]     |
| isCopy                  | 是否允许双击单元格复制                                                                | Boolean          | false                 |
| spanMethod              | 是否自定义编写合并单元格方法(跟 element 一样)                                         | funtion          | -                     |
| rowClickRadio           | 是否开启点击整行选中单选框                                                            | Boolean          | false                 |
| isTableColumnHidden     | 是否开启合计行隐藏复选框/单选框/序列                                                  | Boolean          | false                 |
| sortable                | 是否所有 table 列都开启排序 若值 'custom'，需要监听 Table 的 sort-change 事件         | Boolean/String   | -                     |
| isSortable              | 是否开启组件排序功能（仅有升序和降序）                                                | Boolean          | false                 |
| notSortJudge            | 不排序条件判断规则                                                                    | String           | -                     |
| isKeyup                 | 单元格编辑是否开启键盘事件(向上、向下、回车横向的下一个输入框)                        | Boolean          | false                 |
| defaultRadioCol         | 设置默认选中项（单选）defaultRadioCol 值必须大于 0！                                  | Number           | -                     |
| btnPermissions          | 按钮权限 store.getters 接收字段                                                       | String           | -                     |
| isRowSort               | 是否开启行拖拽（结合row-key配置）                                                     | Boolean          | false                 |
| columnSetBind           | 列设置按钮配置（继承el-button所有属性）                                               | Object           | -                     |
| ----btnTxt              | 按钮显示文字                                                                          | String           | '列设置'              |
| ----title               | 点击按钮下拉显示title                                                                 | String           | '列设置'              |
| ----size                | el-button的size                                                                       | String           | 'small'               |
| ----icon                | el-button的icon                                                                       | String           | 'el-icon-s-operation' |
| onlyIconSort            | 是否开启仅点击排序图标才排序                                                          | Boolean          | false                 |
| useVirtual              | 是否开启虚拟列表                                                                      | Boolean          | false                 |
| maxHeight               | Table 的最大高度。合法的值为数字或者单位为 px 的高度。（开启虚拟列表是其值默认540）   | String/Number    | false                 |
| isPaginationCumulative  | 序列号显示是否分页累加                                                                | Boolean          | false                 |

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


## Slots插槽

| 插槽名  | 说明                                              | 参数  |
| :------ | :------------------------------------------------ | :---- |
| title   | TTable 左侧Title                                  | -     |
| toolbar | TTable 右侧toolbar                                | -     |
| expand  | table.firstColumn.type：`expand` 展开行插槽       | scope |
| -       | el-table-column某列自定义插槽（slotName命名）     | scope |
| -       | el-table-column单元格编辑插槽（editSlotName命名） | scope |
| -       | el-table-column表头合并插槽（slotNameMerge命名）  | scope |
| -       | 操作列前一列自定义默认内容插槽                    | -     |
| footer  | 底部操作区（默认隐藏，使用插槽展示“保存”按钮）    | -     |
