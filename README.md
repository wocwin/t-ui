# t-table

## 项目启动

```
npm install
npm run serve
```

### 项目打包
```
npm run build
```


# TTable简单使用

## 1. 简介
 HTML一行代码，可以实现表格分页/表格内/外按钮操作/行内文字变色/动态字典展示/filters格式化数据/排序/显示隐藏表格内操作按钮等
  ==
 > **2020.6.8新增表格内操作按钮，可以多种状态控制按钮的显示与隐藏——详情查看4.2点补充说明**
**代码示例：**
```
     <t-table
          :table="table"
          @size-change="handlesSizeChange"
          @page-change="handlesCurrentChange"
        />
```
## 2. 结构
  ##### 2.1 顶部
    展示头部选项栏
  ```
    <div class="toolbar"
         v-if="isShow('toolbar')">
      <slot name="toolbar"></slot>
       <div class="toolbar">
        <el-button
          v-for="(item, index) in getToolbarBtn"
          :key="index"
          @click="toolbarFun(item)"
          :icon="item.icon?item.icon:'el-icon-search'"
          :type="item.type||'primary'"
          size="small"
        >{{item.text}}</el-button>
        <el-popover
          ref="popoverClose"
          popper-class="operator_popover operator_pop"
          class="operator_popover operator_pop"
          placement="bottom-start"
          trigger="hover"
          v-if="getToolbarDown.length"
        >
          <ul class="ulClose">
            <li
              v-for="(item, index) in getToolbarDown"
              :key="index"
              @click="toolbarFun(item)"
            >{{item.text}}</li>
          </ul>
          <el-button size="small" type="primary" icon="el-icon-setting" slot="reference">
            操作
            <i class="el-icon-arrow-down"></i>
          </el-button>
        </el-popover>
      </div>
    </div>
  ```
  ##### 2.2 中间
    展示表格数据
  ```
   <el-table
      ref="el-table"
      :data="table.data"
      :height="height? fixHeight? fixHeight: undefined: $store.getters.tableHeight - otherHeight"
      v-bind="$attrs"
      v-on="$listeners"
      border
      @row-click="rowClick"
    >
      ......
    </el-table>
  ```
  ##### 2.3 底部
    展示分页
  ```
   <el-pagination
      v-show="table.data && table.data.length && isShowPagination"
      :current-page="table.currentPage"
      @current-change="handlesCurrentChange"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="table.pageSize"
      :layout="size?'total, prev, pager, next':'total, sizes, prev, pager, next, jumper'"
      :total="table.total"
      v-bind="$attrs"
      v-on="$listeners"
      background
    ></el-pagination>
  ```
## events 其他事件按照el-table直接使用（如sort-change排序事件）

|   事件名    | 说明     |     返回值     |
| :---------: | :------- | :------------: |
| page-change | 当前页码 | 当前选中的页码 |
## 3. 配置参数

| 参数                | 说明                                       | 类型          | 是否必须 |
| ------------------- | ------------------------------------------ | ------------- | -------- |
| table               | 表格数据对象                               | Object        | 是       |
| ---data             | 展示数据                                   | Array         | 是       |
| ---column           | 表头信息                                   | Array         | 是       |
| ---isShowPagination | 是否显示分页(默认显示分页)                 | Boolean       | 否       |
| ---toolbar          | 表格外操作栏选中表格某行，可以将其数据传出 | Array         | 否       |
| ---operator         | 表格内操作栏数据                           | Array         | 否       |
| ---operatorConfig   | 操作栏样式                                 | Object        | 否       |
| ---changeColor      | 整行文字颜色样式控制                       | Object        | 否       |
| ---firstColumn      | 表格首列(序号 index,复选框 selection）排列 | object        | 否       |
| ---total            | 数据总条数                                 | Number        | 是       |
| ---pageSize         | 页数量                                     | Number        | 是       |
| ---currentPage      | 是否需要显示切换页条数                     | Number        | 是       |
| height              | 是否固定高度                               | Boolean       | 否       |
| fixHeight           | 走固定高度时候表格高度                     | String/Number | 否       |
| size                | 分页类型选项                               | Boolean       | 否       |

## 4. 使用帮助

  #### 4.1 关于顶部工具栏
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
  ##### 若需要表格外操作栏(超过3个按钮，第4个按钮会以下拉的方式展示)
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
  #### 4.2 关于表格内操作栏
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
  ###### 补充说明：多种状态控制按钮的显示与隐藏
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
  #### 4.3 关于表格操作栏样式，如固定右侧，宽度
  ```
  operatorConfig: {
    fixed: 'right',
    width: 200,
    label: '操作'
  }
  ```
  #### 4.4 关于表格某行文字颜色
  ```
  changeColor: {
    key: 'status', // 状态
    val: '0',  // 状态值
    txtStyle: 'red' // 设置文字颜色也可以用“#ef473a”
  }
  ```
   #### 4.5 关于表格状态filters方法使用（在表头column对象里添加如下字段）
  ```
  { prop: 'loanInterest', label: '利息', width: '120' , filters: { method: '%' }},
  filters: { method: '%' }：表显示百分比
  filters: { method: '￥' }：表显示金额
  filters: { param: 'REPAYMENT_STATES' } ：表状态对应的canstants对应的字段
  ```
  #### 4.6 新增翻页选中功能（2020-02-27添加）
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
     
   **组件代码新增了:reserve-selection属性**
```
 <!-- 序列号/复选框 -->
      <div v-if="table.firstColumn">
        <el-table-column
          :type="table.firstColumn.type"
          width="50"
          :label="table.firstColumn.label"
          align="center"
          v-if="table.firstColumn.type!=='index'"
        ></el-table-column>
        <el-table-column
          :type="table.firstColumn.type"
          width="50"
          :reserve-selection="table.firstColumn.isPaging||false"
          :label="table.firstColumn.label"
          align="center"
          v-if="table.firstColumn.type==='index'"
        >
          <template slot-scope="scope">
            <span>{{isShowPagination?((table.currentPage - 1) * table.pageSize + scope.$index + 1):scope.$index + 1}}</span>
          </template>
        </el-table-column>
      </div>
```
  #### 4.7 关于element-ui el-table提供的一些方法，样式如何添加
  按照el-table写法直接使用即可，无需其他配置

## 5. Dome
参考：demo页面
******
## 最后
[组件地址](https://github.com/wocwin/t-table)

## 相关文章
[axios二次封装，接口统一存放,满足RESTful风格](https://blog.csdn.net/cwin8951/article/details/104415090)
