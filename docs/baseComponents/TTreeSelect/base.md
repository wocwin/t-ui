# TTreeSelect 下拉树形结构组件

---

## 单选

<common-code-format>
  <docsComponents-TTreeSelect-index slot="source"></docsComponents-TTreeSelect-index>
  在组件中需配置：<br/>
`defaultData` 默认值显示；类型Object且必须是{id:**,label:***}<br/>
`@handleNodeClick` 获取当前选中项；类型Object

<<< @/docs/.vuepress/components/docsComponents/TTreeSelect/index.vue
</common-code-format>

## 多选

<common-code-format>
  <docsComponents-TTreeSelect-multiple slot="source"></docsComponents-TTreeSelect-multiple>
  在组件中需配置：<br/>
`multiple` 开启多选<br/>
`defaultValue` 默认值显示；类型Array<br/>
`@handleNodeClick` 获取当前选中项集合；类型Array

<<< @/docs/.vuepress/components/docsComponents/TTreeSelect/multiple.vue
</common-code-format>

### t-tree-select——下拉树形结构组件

**代码示例：**

```html
<t-tree-select
  :options="treeList"
  placeholder="请选择tree结构"
  width="50%"
  :defaultData="defaultValue"
  :treeProps="treeProps"
  @handleNodeClick="selectDrop"
/>
```

### 配置参数（Attributes）继承 el-select 和 el-tree Attributes

| 参数         | 说明                                       | 类型    | 默认值                   |
| :----------- | :----------------------------------------- | :------ | :----------------------- |
| options      | tree 原始数据源                            | Array   | 无                       |
| treeProps    | tree 配置                                  | Object  | el-tree props 默认值一样 |
| checkBoxBtn  | 是否显示全选、反选、清空操作(多选的情况下) | Boolean | true                     |
| multiple     | 是否开启多选                               | Boolean | false                    |
| width        | 选择宽度（可以设置 px 或者%）              | String  | 100%                     |
| defaultData  | 单选默认值                                 | Object  | {}                       |
| defaultValue | 多选默认值                                 | Array   | []                       |

### 继承 el-select 和 el-tree events

| 事件名          | 说明           | 返回值                                   |
| :-------------- | :------------- | :--------------------------------------- |
| handleNodeClick | 选中 tree 节点 | 单选传出当前选择项；多选传出选中的集合。 |
