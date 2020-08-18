# TreeTable组件
---

<common-code-format>
  <docsComponents-TTable-tree></docsComponents-TTable-tree>
  <highlight-code slot="codeText">
    <template>
        <div class="tree-table" style="width:100%;">
          <t-tree-table
            :columns="columns"
            :data-source="roleResList"
            :operator="operator"
            treeStructure
            ref="tree"
          />
        </div>
    </template>
    <script>
        export default {
            data () {
              return {
                columns: [
                  {
                    text: '资源名称',
                    dataIndex: 'resName'
                  },
                  {
                    text: '资源代码',
                    dataIndex: 'resCode'
                  },
                  {
                    text: '资源类型',
                    dataIndex: 'type',
                    filters: { param: 'MENU_TYPE' }
                  },
                  {
                    text: '所属角色',
                    dataIndex: 'roleNames'
                  }
                ],
                operator: [
                  {
                    text: '编辑',
                    resCode: 'resource-edit',
                    fun: this.goEdit
                  }
                ],
                roleResList: []
              }
            },
            mounted () {
              const tree = ['后台返回的数据结构']
              this.roleResList = this.formatTreeData(tree)
            },
            methods: {
              // 获取想要的数据结构
              formatTreeData (data) {
                data.forEach(item => {
                  if (item.children && item.children.length > 0) {
                    this.formatTreeData(item.children)
                    item.children.forEach(e => {
                      if (e.belong) {
                        item.children.map(i => {
                          if (i.resCode === e.belong) {
                            i.children.push(e)
                          }
                        })
                      }
                    })
                    item.children = item.children.filter(n => {
                      return !n.belong
                    })
                  }
                })
                return data
              },
              goEdit (val) {
                console.log('点击了按钮', val)
              }
            }
        }
    </script>
  </highlight-code>
</common-code-format>

## 配置参数（TreeTable Attributes）

| 参数              | 说明                                       | 类型          | 是否必须 |
| ----------------- | ------------------------------------------ | ------------- | -------- |
| dataSource        | 数据源                                     | Array        | 是       |
| columns           | 表头信息                                   | Array         | 是       |
| -------filters    | filters转义（后台返回数字转中文，时间戳转时间）| Object    | 否       |
| operator          | 表格内操作栏数据                            | Array         | 否       |
| -------show       | 表格内操作栏根据状态显示                    | Object        | 否       |
| showCheckBox      | 是否显示复选框                              | Boolean       | 否       |
| defaultExpandAll  | 是否默认展开所有树                          | Boolean       | 否       |
| treeStructure     | 父组件传过来的数据是否标准格式；默认否，对其进行树形格式化,并添加标识类的属性| Boolean       | 否       |
