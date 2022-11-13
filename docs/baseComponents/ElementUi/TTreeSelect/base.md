# TTreeSelect 下拉树形结构组件

---

<common-code-format>
  <docsComponents-TTreeSelect-index slot="source"></docsComponents-TTreeSelect-index>
   <<< @/docs/.vuepress/components/docsComponents/TTreeSelect/index.vue
</common-code-format>

### t-tree-select——下拉树形结构组件

**代码示例：**

```html
<t-tree-select
  :treeList="treeList"
  placeholder="请选择tree结构"
  width="50%"
  :treeProps="treeProps"
  @handleNodeClick="selectDrop"
/>
```

### 配置参数（Attributes）继承 el-select(不支持多选) 和 el-tree Attributes

| 参数        | 说明                          | 类型   | 默认值         |
| :---------- | :---------------------------- | :----- | :------------- |
| treeList    | tree 原始数据                 | Array  | 无             |
| treeProps   | tree 配置                     | Object | el-tree 默认值 |
| nodeKey     | 树形唯一键值                  | String | 'id'           |
| width       | 选择宽度（可以设置 px 或者%） | String | 100%           |
| defaultData | 是否展示默认值                | Object | 'label'        |

### 继承 el-select 和 el-tree events

| 事件名          | 说明           | 返回值                                                                             |
| :-------------- | :------------- | :--------------------------------------------------------------------------------- |
| handleNodeClick | 选中 tree 节点 | 共 2 个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node。 |
