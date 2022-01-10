<template>
  <div class="tree-table-demo">
    <t-layout sectionTitle="TreeTable组件">
      <div class="content-main t-margin20">
        <t-tree-table
          :columns="columns"
          :data-source="roleResList"
          :operator="operator"
          treeStructure
          ref="tree"
        />
      </div>
    </t-layout>
  </div>
</template>

<script>
export default {
  name: 'treeTableDemo',
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
  created () {
    const tree = [
      {
        id: 378,
        resName: '系统管理',
        resCode: 'system-manage',
        parentId: 0,
        children: [
          {
            id: 379,
            resName: '企业角色管理',
            resCode: 'ent-role-manage',
            parentId: 378,
            children: [
              {
                id: 464,
                resName: '企业角色导出操作',
                resCode: 'ent-role-export',
                parentId: 379,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              },
              {
                id: 465,
                resName: '企业角色新增操作',
                resCode: 'ent-role-add',
                parentId: 379,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              },
              {
                id: 466,
                resName: '企业角色编辑操作',
                resCode: 'ent-role-edit',
                parentId: 379,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              },
              {
                id: 467,
                resName: '企业角色禁用操作',
                resCode: 'ent-role-disabled',
                parentId: 379,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              },
              {
                id: 468,
                resName: '企业角色启用操作',
                resCode: 'ent-role-ensble',
                parentId: 379,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              },
              {
                id: 469,
                resName: '企业角色授权操作',
                resCode: 'ent-role-authorize',
                parentId: 379,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              }
            ],
            roleNames: '运营端管理员,运营端产品经理',
            check: true,
            terminalCode: 'mgt',
            type: '1',
            belong: null
          },
          {
            id: 380,
            resName: '运营角色管理',
            resCode: 'mgt-role-mange',
            parentId: 378,
            children: [
              {
                id: 470,
                resName: '运营角色导出操作',
                resCode: 'mgt-role-export',
                parentId: 380,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              },
              {
                id: 471,
                resName: '运营角色新增操作',
                resCode: 'mgt-role-add',
                parentId: 380,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              },
              {
                id: 472,
                resName: '运营角色编辑操作',
                resCode: 'mgt-role-edit',
                parentId: 380,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              },
              {
                id: 473,
                resName: '运营角色禁用操作',
                resCode: 'mgt-role-disabled',
                parentId: 380,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              },
              {
                id: 474,
                resName: '运营角色启用操作',
                resCode: 'mgt-role-ensble',
                parentId: 380,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              },
              {
                id: 475,
                resName: '运营角色授权操作',
                resCode: 'mgt-role-authorize',
                parentId: 380,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              }
            ],
            roleNames: '运营端管理员,运营端产品经理',
            check: true,
            terminalCode: 'mgt',
            type: '1',
            belong: null
          },
          {
            id: 381,
            resName: '运营用户管理',
            resCode: 'mgt-user-mange',
            parentId: 378,
            children: [
              {
                id: 476,
                resName: '运营用户导出操作',
                resCode: 'mgt-user-export',
                parentId: 381,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              },
              {
                id: 477,
                resName: '运营用户冻结操作',
                resCode: 'mgt-user-freeze',
                parentId: 381,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              },
              {
                id: 478,
                resName: '运营用户解冻操作',
                resCode: 'mgt-user-unfreeze',
                parentId: 381,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              },
              {
                id: 479,
                resName: '运营用户重置密码操作',
                resCode: 'mgt-user-reset',
                parentId: 381,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              },
              {
                id: 480,
                resName: '运营用户删除操作',
                resCode: 'mgt-user-del',
                parentId: 381,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              }
            ],
            roleNames: '运营端管理员,运营端产品经理',
            check: true,
            terminalCode: 'mgt',
            type: '1',
            belong: null
          },
          {
            id: 382,
            resName: '资源菜单管理',
            resCode: 'resource-manage',
            parentId: 378,
            children: [
              {
                id: 481,
                resName: '资源菜单编辑操作',
                resCode: 'resource-edit',
                parentId: 382,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: null
              }
            ],
            roleNames: '运营端管理员',
            check: true,
            terminalCode: 'mgt',
            type: '1',
            belong: null
          },
          {
            id: 412,
            resName: '运营用户详情',
            resCode: 'mgt-user-mange-det',
            parentId: 378,
            children: [],
            roleNames: '运营端管理员,运营端产品经理',
            check: true,
            terminalCode: 'mgt',
            type: '2',
            belong: 'mgt-user-mange'
          },
          {
            id: 413,
            resName: '运营用户新增',
            resCode: 'mgt-user-mange-add',
            parentId: 378,
            children: [],
            roleNames: '运营端管理员,运营端产品经理',
            check: true,
            terminalCode: 'mgt',
            type: '2',
            belong: 'mgt-user-mange'
          },
          {
            id: 414,
            resName: '运营用户授权',
            resCode: 'mgt-user-mange-authorize',
            parentId: 378,
            children: [],
            roleNames: '运营端管理员,运营端产品经理',
            check: true,
            terminalCode: 'mgt',
            type: '2',
            belong: 'mgt-user-mange'
          },
          {
            id: 435,
            resName: '节假日设置',
            resCode: 'holiday-setting',
            parentId: 378,
            children: [],
            roleNames: '运营端管理员,运营端产品经理',
            check: true,
            terminalCode: 'mgt',
            type: '1',
            belong: null
          }
        ],
        roleNames: '运营端管理员,运营端产品经理',
        check: true,
        terminalCode: 'mgt',
        type: '1',
        belong: null
      },
      {
        id: 393,
        resName: '工作台',
        resCode: 'workspaces',
        parentId: 0,
        children: [
          {
            id: 394,
            resName: '待办任务',
            resCode: 'todo-tasks',
            parentId: 393,
            children: [
              {
                id: 482,
                resName: '待办导出操作',
                resCode: 'todo-tasks-export',
                parentId: 394,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'ent,mgt',
                type: '2',
                belong: null
              }
            ],
            roleNames: '运营端管理员',
            check: true,
            terminalCode: 'ent,mgt',
            type: '1',
            belong: null
          },
          {
            id: 395,
            resName: '待办任务/详情',
            resCode: 'todo-tasks-detail',
            parentId: 393,
            children: [],
            roleNames: '运营端管理员',
            check: true,
            terminalCode: 'ent,mgt',
            type: '2',
            belong: 'todo-tasks'
          },
          {
            id: 396,
            resName: '任务查询',
            resCode: 'handled-tasks',
            parentId: 393,
            children: [
              {
                id: 483,
                resName: '任务导出操作',
                resCode: 'handled-tasks-export',
                parentId: 396,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'ent,mgt',
                type: '2',
                belong: null
              }
            ],
            roleNames: '运营端管理员',
            check: true,
            terminalCode: 'ent,mgt',
            type: '1',
            belong: null
          },
          {
            id: 397,
            resName: '任务查询/详情',
            resCode: 'handled-tasks-detail',
            parentId: 393,
            children: [],
            roleNames: '运营端管理员',
            check: true,
            terminalCode: 'ent,mgt',
            type: '2',
            belong: 'handled-tasks-process'
          },
          {
            id: 448,
            resName: '流程查看',
            resCode: 'handled-tasks-process',
            parentId: 393,
            children: [],
            roleNames: '运营端管理员',
            check: true,
            terminalCode: 'ent,mgt',
            type: '2',
            belong: 'handled-tasks'
          }
        ],
        roleNames: '运营端管理员',
        check: true,
        terminalCode: 'ent,mgt',
        type: '1',
        belong: null
      },
      {
        id: 436,
        resName: '风险管理',
        resCode: 'risk-manage',
        parentId: 0,
        children: [
          {
            id: 437,
            resName: '风控管理',
            resCode: 'risk-control-manage',
            parentId: 436,
            children: [
              {
                id: 438,
                resName: '风控报告/详情',
                resCode: 'risk-report-detail',
                parentId: 437,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'ent,mgt',
                type: '2',
                belong: 'risk-report-list'
              },
              {
                id: 439,
                resName: '风控报告',
                resCode: 'risk-report-list',
                parentId: 437,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'ent,mgt',
                type: '1',
                belong: null
              },
              {
                id: 440,
                resName: '风控报告/规则结果',
                resCode: 'risk-report-rule',
                parentId: 437,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: 'risk-report-list'
              },
              {
                id: 444,
                resName: '风控规则查询',
                resCode: 'risk-rule-list',
                parentId: 437,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '1',
                belong: null
              },
              {
                id: 445,
                resName: '风控规则查询/详情',
                resCode: 'risk-rule-detail',
                parentId: 437,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'mgt',
                type: '2',
                belong: 'risk-rule-list'
              }
            ],
            roleNames: '运营端管理员',
            check: true,
            terminalCode: 'ent,mgt',
            type: '1',
            belong: null
          },
          {
            id: 441,
            resName: '贷后预警',
            resCode: 'loan-warning',
            parentId: 436,
            children: [
              {
                id: 442,
                resName: '贷后监测',
                resCode: 'loan-monitoring',
                parentId: 441,
                children: [
                  {
                    id: 453,
                    resName: '人工执行操作',
                    resCode: 'loan-monitoring-manually',
                    parentId: 442,
                    children: [],
                    roleNames: '运营端管理员',
                    check: true,
                    terminalCode: 'ent,mgt',
                    type: '2',
                    belong: null
                  }
                ],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'ent,mgt',
                type: '1',
                belong: null
              },
              {
                id: 443,
                resName: '贷后监测/详情',
                resCode: 'loan-monitoring-detail',
                parentId: 441,
                children: [],
                roleNames: '运营端管理员',
                check: true,
                terminalCode: 'ent,mgt',
                type: '2',
                belong: 'loan-monitoring'
              }
            ],
            roleNames: '运营端管理员',
            check: true,
            terminalCode: 'ent,mgt',
            type: '1',
            belong: null
          },
          {
            id: 447,
            resName: '额度查询',
            resCode: 'quota-query',
            parentId: 436,
            children: [],
            roleNames: '运营端管理员',
            check: true,
            terminalCode: 'mgt',
            type: '1',
            belong: null
          }
        ],
        roleNames: '运营端管理员',
        check: true,
        terminalCode: 'ent,mgt',
        type: '1',
        belong: null
      }
    ]
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
