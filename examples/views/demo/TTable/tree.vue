<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="菜单管理列表"
        :table="table"
        :columns="table.columns"
        row-key="menuId"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @selection-change="selectionChange"
        :isShowPagination="false"
        isShowTreeStyle
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
import TreeData from './treeData.json'
export default {
  data() {
    return {
      table: {
        firstColumn: { type: 'selection' },
        data: [],
        columns: [
          { prop: 'menuName', label: '菜单名称', minWidth: 180, align: 'left' },
          {
            prop: 'menuType',
            label: '菜单类型',
            minWidth: 100,
            align: 'left',
            render: (text) => {
              let txt = ''
              switch (text) {
                case 'M':
                  txt = '目录'
                  break
                case 'C':
                  txt = '菜单'
                  break
                case 'F':
                  txt = '按钮'
                  break
                default:
                  txt = '未知'
                  break
              }
              return (
                <span>{txt}</span>
              )
            }
          },
          { prop: 'perms', label: '权限标识', minWidth: 100, align: 'left' },
          { prop: 'createBy', label: '创建人', minWidth: 100, align: 'left' },
          { prop: 'createTime', label: '创建时间', minWidth: 180, align: 'left' },
          { prop: 'remark', label: '备注', minWidth: 180, align: 'left' }
        ],
        // 表格内操作列
        operator: [
          {
            text: '新增',
            fun: this.handleAdd
          },
          {
            text: '编辑',
            fun: this.edit
          },
          {
            text: '删除',
            fun: this.handleDelete
          }
        ],
        // 操作列样式
        operatorConfig: {
          align: 'left',
          width: '160',
          label: '操作'
        }
      },
      ids: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleAdd(row) {
      console.log('新增', row)
    },
    edit(row) {
      console.log('编辑', row)
    },
    handleDelete(row) {
      console.log('删除', row)
    },
    // 复选框选中
    selectionChange(data) {
      console.log('复选框选中', data)
      this.ids = data.map(item => item.menuId)
      // console.log(77, this.ids)
    },
    getList() {
      const res = TreeData
      if (res.success) {
        this.sourceMenuData = res.data
        this.table.data = this.handleTree(res.data, 'menuId')
        // console.log(777, this.table.data)
      }
    },
    /**
     * 构造树型结构数据
     * @param {*} data 数据源
     * @param {*} id id字段 默认 'id'
     * @param {*} parentId 父节点字段 默认 'parentId'
     * @param {*} children 孩子节点字段 默认 'children'
     * @param {*} rootId 根Id 默认 0
     */
    handleTree(data, id, parentId, children, rootId) {
      id = id || 'id'
      parentId = parentId || 'parentId'
      children = children || 'children'
      rootId = rootId || 0
      // 对源数据深度克隆
      const cloneData = JSON.parse(JSON.stringify(data))
      // 循环所有项
      const treeData = cloneData.filter(father => {
        let branchArr = cloneData.filter(child => {
          // 返回每一项的子级数组
          return father[id] === child[parentId]
        })
        // eslint-disable-next-line no-unused-expressions
        branchArr.length > 0 ? father.children = branchArr : ''
        // 返回第一层
        return father[parentId] === rootId
      })
      return treeData !== '' ? treeData : data
    }
  }
}
</script>
