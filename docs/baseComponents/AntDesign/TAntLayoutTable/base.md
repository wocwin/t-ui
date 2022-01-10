# TAntLayoutTable 默认 table 布局组件

---

## 常规表格

<common-code-format>
  <docsComponents-TAntLayoutTable-index slot="source"></docsComponents-TAntLayoutTable-index>
   <<< @/docs/.vuepress/components/docsComponents/TAntLayoutTable/index.vue
</common-code-format>

## 自定义渲染列数据

<common-code-format>
  <docsComponents-TAntLayoutTable-customRender slot="source"></docsComponents-TAntLayoutTable-customRender>
   操作`customRender`属性,接收机构提示`tooltip`

<<< @/docs/.vuepress/components/docsComponents/TAntLayoutTable/customRender.vue
</common-code-format>

## 自定义列表左侧 title

<common-code-format>
  <docsComponents-TAntLayoutTable-titleTable slot="source"></docsComponents-TAntLayoutTable-titleTable>
    添加`title`属性

<<< @/docs/.vuepress/components/docsComponents/TAntLayoutTable/titleTable.vue
</common-code-format>

## table 插槽

<common-code-format>
  <docsComponents-TAntLayoutTable-tableSlot slot="source"></docsComponents-TAntLayoutTable-tableSlot>
  `table`插槽，默认`table`将不渲染

<<< @/docs/.vuepress/components/docsComponents/TAntLayoutTable/tableSlot.vue
</common-code-format>

## 显示分页器

<common-code-format>
  <docsComponents-TAntLayoutTable-pagination slot="source"></docsComponents-TAntLayoutTable-pagination>
  添加`pagination`属性

<<< @/docs/.vuepress/components/docsComponents/TAntLayoutTable/pagination.vue
</common-code-format>

## 显示表格内外操作按钮

<common-code-format>
  <docsComponents-TAntLayoutTable-operation slot="source"></docsComponents-TAntLayoutTable-operation>
  表格内操作使用`customRender`；表格外操作需要添加`slot=btn`

<<< @/docs/.vuepress/components/docsComponents/TAntLayoutTable/operation.vue
</common-code-format>

## 配置 ant-design-vue table 属性（复选框）

<common-code-format>
  <docsComponents-TAntLayoutTable-rowSelection slot="source"></docsComponents-TAntLayoutTable-rowSelection>
  配置`tableOpt`属性，[参考Antd table组件文档](https://www.antdv.com/components/table-cn/#API)"

<<< @/docs/.vuepress/components/docsComponents/TAntLayoutTable/rowSelection.vue
</common-code-format>

## 手动调整表格列宽

<common-code-format>
  <docsComponents-TAntLayoutTable-colWidth slot="source"></docsComponents-TAntLayoutTable-colWidth>
 配置`tableOpt`属性，`bordered:true`，可手动调整表格列宽

<<< @/docs/.vuepress/components/docsComponents/TAntLayoutTable/colWidth.vue
</common-code-format>

## 手动显示/隐藏或拖动排序列

<common-code-format>
  <docsComponents-TAntLayoutTable-columnSet slot="source"></docsComponents-TAntLayoutTable-columnSet>
 配置`column-setting`属性，`column-setting:true`，可显示列设置按钮
 table新增`name`属性（唯一值）区分不同表格显示隐藏的数据

<<< @/docs/.vuepress/components/docsComponents/TAntLayoutTable/columnSet.vue
</common-code-format>

## Table 组件某列插槽显示

<common-code-format>
  <docsComponents-TAntLayoutTable-columnSlot slot="source"></docsComponents-TAntLayoutTable-columnSlot>
 配置columns中`scopedSlots`属性
 例如`scopedSlots：{customRender：'插槽名'}`并是作用域插槽

<<< @/docs/.vuepress/components/docsComponents/TAntLayoutTable/columnSlot.vue
</common-code-format>

## 参数配置

---

### TAntLayoutTable 默认 table 布局组件

> **代码示例：**

```html
  <t-layout-page> // 页面容器
    <t-layout-page-item> // 页面视图功能块容器
      <t-ant-layout-table
        title="样品列表"  // 列表title（在表格左侧）
        isCustomScroll // 开启自定义横向滚动条
        columnSetting // 显示设置（隐藏/显示列）
        name="columnSetting" // 隐藏/显示列唯一性
        :pagination="pageOpt" // 分页器
        @paginationChange="handleTableChange" // 获取当前选择页
        @showSizeChange="showSizeChange" // 每页显示总条数时触发
        :columns="columns"  // 表头
        :dataSource="sourceData" // 数据源
        :tableOpt="{rowSelection: {selectedRowKeys: selectedRowKeys, onChange: onSelectChange}}" // 添加Antd table属性
      >
        <!-- 表格外操作————在表格右侧 -->
        <template #btn>
          <a-button type="primary" icon="plus" @click="creat">新增</a-button>
          <a-button type="primary" @click="anew" :disabled="selectedRowKeys.length === 0 ">重新处理</a-button>
          <a-button type="primary" @click="toVoids" :disabled="selectedRowKeys.length === 0 ">作废</a-button>
        </template>
      </t-ant-layout-table>
    </t-layout-page-item>
  </t-layout-page>
```

### 配置参数（Attributes）

| 参数           | 说明                                                                                              | 类型        | 默认值 |
| -------------- | :------------------------------------------------------------------------------------------------ | :---------- | -----: |
| title          | 左上侧标题                                                                                        | string,slot |     无 |
| btn            | 右上侧按钮组插槽                                                                                  | slot        |     无 |
| columns        | table 列描述，详细见下方配置说明。                                                                | array       |     无 |
| dataSource     | table 数据源                                                                                      | array       |     无 |
| tableOpt       | antd table 配置                                                                                   | {}          |     无 |
| pagination     | 分页器配置{current: number, pageSize: number, total: number,paginationOpt:{antd pagination 配置}} | object      |     无 |
| table          | 报表内容插槽，当使用该插槽时，默认 table 将不渲染                                                 | slot        |     无 |
| isCustomScroll | 是否开启自定义横向滚动条                                                                          | Boolean     |  false |
| columnSetting  | 是否显示设置（隐藏/显示列）                                                                       | Boolean     |  false |
| name           | 组件唯一标记，类似 Key 值，用于缓存表头数据                                                       | String      |     无 |

### columns 配置参数（columns Attributes）

| 参数         | 说明                       | 类型                         |            默认值 |
| ------------ | :------------------------- | :--------------------------- | ----------------: |
| title        | 列头显示文字               | string                       |                无 |
| dataIndex    | 列数据在数据项中对应的 key | string                       |                无 |
| width        | 列宽度                     | number                       |                无 |
| scopedSlots  | 某列插槽显示               | {customRender：'自定义插槽'} | 当前 dataIndex 值 |
| customRender | 自定义渲染                 | {comps: comp[]}              |                无 |

### comp 配置参数（customRender Attributes）

| 参数   | 说明                                                                                                    | 类型                                           | 默认值 |
| ------ | :------------------------------------------------------------------------------------------------------ | :--------------------------------------------- | -----: |
| isShow | 组件渲染条件，返回 true 渲染，反之不渲染                                                                | (scope) => {return true}                       |     无 |
| comp   | 组件名称，可直接指定 element 或其他全局注册的组件如：'el-input'，也可引入非全局组件后直接指向如：Button | string ,component                              |     无 |
| text   | 渲染时组件设置组件文本                                                                                  | string                                         |     无 |
| bind   | 渲染时组件会调用 v-text 指定设置该配置更新元素的属性                                                    | object                                         |     无 |
| event  | 设置组件监听的事件，渲染时组件会调用 v-event 指定设置该配置更新元素的事件                               | (scope) => ({[propName: eventName]: () => {}}) |     无 |
| slot   | 指定插入的插槽                                                                                          | string                                         |     无 |
| child  | 支持子组件配置，参数与上方一致                                                                          | array                                          |     无 |

### pagination 配置参数（pagination Attributes）

| 参数          | 说明                             | 类型   | 默认值 |
| ------------- | :------------------------------- | :----- | -----: |
| current       | 分页器当前页                     | number |      1 |
| total         | 数据量总数，用于计算分页器总页数 | number |      0 |
| pageSize      | 每一页的数据量                   | number |     10 |
| paginationOpt | antd pagination 属性配置         | object |     无 |

### 事件（events）

|      事件名      | 说明                           | 回调参数                                  |
| :--------------: | :----------------------------- | :---------------------------------------- |
| paginationChange | 分页器页码发生变化时触发       | Function(current: number)                 |
|  showSizeChange  | 分页器选择每页显示总条数时触发 | Function(current: number,pageSize:number) |
