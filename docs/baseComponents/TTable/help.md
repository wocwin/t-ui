# 使用帮助
*新增行内操作按钮权限配置（参数配置请参考"具体操作"下4.8）*
## 配置参数（Table Attributes）

| 参数              | 说明                                       | 类型          | 是否必须 |
| ----------------- | ------------------------------------------ | ------------- | -------- |
| table             | 表格数据对象                               | Object        | 是       |
| ---data           | 展示数据                                   | Array         | 是       |
| ---column         | 表头信息                                   | Array         | 是       |
| -------sort       | 排序 （设置：sort:true）                   | Boolean        | 否       |
| -------noShowTip  | 是否换行 （设置：noShowTip:true）           | Boolean        | 否       |
| -------noShowColumn | 是否隐藏当前列（设置：noShowColumn:true） | Boolean        | 否       |
| -------filters    | filters转义（后台返回数字转中文，时间戳转时间）| Object    | 否       |
| ---toolbar        | 表格外操作栏选中表格某行，可以将其数据传出 | Array         | 否       |
| ---operator       | 表格内操作栏数据                           | Array         | 否       |
| -------show       | 表格内操作栏根据状态显示                   | Object        | 否       |
| -------noshow     | 表格内操作栏根据多种状态不显示             | Array         | 否       |
| -------resCode    | 表格内操作栏按钮权限资源（路由path）        | String        | 否       |
| ---operatorConfig | 操作栏样式                                 | Object        | 否       |
| ---changeColor    | 整行文字颜色样式控制                       | Object        | 否       |
| ---firstColumn    | 表格首列(序号 index,复选框 selection）排列 | object        | 否       |
| ---total          | 数据总条数                                 | Number        | 否       |
| ---pageSize       | 页数量                                     | Number        | 否       |
| ---currentPage    | 是否需要显示切换页条数                     | Number        | 否       |
| height            | 是否固定高度                               | Boolean       | 否       |
| fixHeight         | 走固定高度时候表格高度                     | String/Number | 否       |
| size              | 分页类型选项                               | Boolean       | 否       |
| isShowPagination  | 是否显示分页(默认显示分页)                 | Boolean       | 否       |
| isCopy            | 是否允许双击单元格复制                     | Boolean       | 否       |

## events 其他事件按照el-table直接使用（如sort-change排序事件）
|   事件名    | 说明     |     返回值     |
| :---------: | :------- | :------------: |
| page-change | 当前页码 | 当前选中的页码 |

## 具体操作

  ### 4.0 关于顶部工具栏
  使用插槽toolbar传入即可
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
  ### 4.1 若需要表格外操作栏(超过3个按钮，第4个按钮会以下拉的方式展示)
  配置toolbar即可（前提条件是，必须使用插槽toolbar）
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
  配置operator即可
  ```
  operator: [
    {
      text: '预览',
      type: 'primary',
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
   ### 4.5 关于表格状态filters方法使用（在表头column对象里添加如下字段）
  ```
  { prop: 'loanInterest', label: '利息', width: '120' , filters: { method: '%' }},
  filters: { method: '%' }：表显示百分比
  filters: { method: '￥' }：表显示金额
  filters: { param: 'REPAYMENT_STATES' } ：表状态对应的canstants对应的字段
  ```
   ### 4.6 新增翻页选中功能（2020-02-27添加）
   **页面代码新增：:row-key属性和selection-change复选框事件**
  ```
  <t-table
          :table="table"
          @size-change="handlesSizeChange"
          @page-change="handlesCurrentChange"
          :row-key="getRowKey"
          @selection-change="handlesSelectionChange"
        />
  ```
  **js代码**
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
  ### 4.7 新增隐藏某列及某单元格内容过长是否换行（还是隐藏并有tip提示）
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
## 关于element-ui el-table提供的一些方法，样式如何添加     
  按照el-table写法直接使用即可，无需其他配置
