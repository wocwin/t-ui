<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="部门管理列表"
        :table="table"
        :columns="table.columns"
        row-key="deptId"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :isShowPagination="false"
        isShowTreeStyle
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
import TreeList from './treeList.json'
export default {
  data() {
    return {
      table: {
        data: [],
        columns: [
          { prop: 'deptName', label: '部门名称', minWidth: 180, align: 'left' },
          { prop: 'deptNum', label: '部门编码', minWidth: 100, align: 'left' },
          { prop: 'erpDeptNum', label: 'ERP部门编码', minWidth: 100, align: 'left' },
          { prop: 'orderNum', label: '排序', minWidth: 80, align: 'left' },
          { prop: 'createTime', label: '创建时间', minWidth: 180, align: 'left' },
          {
            prop: 'status', label: '状态', minWidth: 80,
            render: (text, record) => {
              return (
                <el-switch
                  active-value={true}
                  inactive-value={false}
                  v-model={record.status}
                  onChange={() => this.handleStatusChange(record)}
                >
                  {text}
                </el-switch>
              )
            },
            align: 'left'
          }
        ],
        // 表格内操作列
        operator: [
          {
            text: '新增',
            fun: this.handleAdd,
          },
          {
            text: '编辑',
            fun: this.edit,
          },
          {
            text: '删除',
            fun: this.handleDelete,
          },
        ],
        // 操作列样式
        operatorConfig: {
          align: 'left',
          width: '160',
          label: '操作'
        }
      }
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
    // 部门状态修改
    handleStatusChange(row) {
      const text = row.status === true ? '启用' : '停用'
      this.$confirm(`确认要${text}${row.deptName}部门吗?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).then(() => {
        console.log('点击了确定')
      }).catch(() => {
        row.status = row.status !== true
      })
    },
    getList() {
      const res = TreeList
      if (res.success) {
        this.table.data = this.handleTree(res.data, 'deptId')
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
        const branchArr = cloneData.filter(child => {
          // 返回每一项的子级数组
          return father[id] === child[parentId]
        })
        branchArr.length > 0 ? father.children = branchArr : ''
        // 返回第一层
        return father[parentId] === rootId
      })
      return treeData !== '' ? treeData : data
    }
  }
}
</script>
