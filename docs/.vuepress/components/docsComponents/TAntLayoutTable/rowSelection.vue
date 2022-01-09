<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-ant-layout-table
        title="样品列表"
        :pagination="pageOpt"
        @paginationChange="handleTableChange"
        :columns="columns"
        :dataSource="sourceData"
        :tableOpt="{rowSelection: {selectedRowKeys: selectedRowKeys, onChange: onSelectChange},bordered:true}"
      >
        <!-- 表格外操作| -->
        <template #btn>
          <a-button type="primary" icon="plus" @click="creat">新增</a-button>
          <a-button type="primary" @click="anew" :disabled="selectedRowKeys.length === 0 ">重新处理</a-button>
          <a-button type="primary" @click="toVoids" :disabled="selectedRowKeys.length === 0 ">作废</a-button>
        </template>
      </t-ant-layout-table>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  name: 'rowSelection',
  data () {
    return {
      // 复选框选中项
      selectedRowKeys: [],
      // 分页器参数
      pageOpt: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      // 表头
      columns: [
        {
          title: '取料地',
          dataIndex: 'addrName',
          width: 100
        },
        {
          title: '物料名称',
          dataIndex: 'materialName',
          width: 160
        },
        {
          title: '产地',
          dataIndex: 'materialProducingArea',
          width: 160
        },
        {
          title: '取样时间点',
          dataIndex: 'timeNames',
          width: 160,
          customRender: (text) => {
            return text.toString()
          }
        },
        {
          title: '接收机构',
          dataIndex: 'usingDeptNames',
          width: 160,
          customRender: (text, record) => {
            return {
              children: this.$createElement('div', {}, [
                this.$createElement(
                  'a-tooltip',
                  {
                    attrs: { title: text.toString() }
                  },
                  [
                    this.$createElement('span', {
                      domProps: { innerHTML: text.toString() },
                      style: {
                        maxWidth: 160,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                      }
                    })
                  ]
                )
              ])
            }
          }
        },
        {
          title: '类型',
          dataIndex: 'samplingType',
          width: 100,
          customRender: (text) => {
            if (text == 0) {
              return '常规'
            }
            if (text == 1) {
              return '非常规'
            }
            if (text == 2) {
              return '通用'
            }
          }
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: 100,
          isCustomRender: true,
          customRender: (text, record) => {
            return {
              children: this.$createElement('div', {}, [
                this.$createElement('a-switch', {
                  attrs: { checked: Boolean(record.status), size: 'small' },
                  on: {
                    change: (val) => {
                      this.onStatusChange(val, record)
                    }
                  }
                })
              ])
            }
          }
        },
        {
          title: '操作',
          dataIndex: 'handler',
          width: 120,
          isCustomRender: true,
          customRender: (text, record) => {
            return {
              children: this.$createElement('div', {}, [
                this.$createElement(
                  'a-popconfirm',
                  {
                    attrs: { title: '你确定要删除吗？' },
                    on: { confirm: this.del.bind(this, record) }
                  },
                  [
                    this.$createElement('a-button', {
                      domProps: { innerHTML: '删除' },
                      attrs: { type: 'link' },
                      style: { padding: '0 5px 0 0' }
                    })
                  ]
                ),
                this.$createElement('a-button', {
                  domProps: { innerHTML: '修改' },
                  attrs: { type: 'link' },
                  on: { click: this.edit.bind(this, record) },
                  style: { padding: '0 0 0 5px' }
                })
              ])
            }
          }
        }
      ],
      // 数据源
      sourceData: [
        {
          id: 85,
          addrName: '916料场',
          materialName: '卡粉-new',
          materialProducingArea: '京环-new',
          samplingType: 0,
          status: 1,
          timeNames: ['2点半'],
          usingDeptNames: ['BBQ煤炉', '总调度室', '球团3期', '竖炉']
        },
        {
          id: 80,
          addrName: '一号料场',
          materialName: '测试物料',
          materialProducingArea: '测试场地',
          samplingType: 2,
          status: 1,
          timeNames: ['12点'],
          usingDeptNames: ['总调度室', '112烧结厂']
        },
        {
          id: 79,
          addrName: '一号料场',
          materialName: '喷煤',
          materialProducingArea: '二期喷煤厂',
          samplingType: 0,
          status: 1,
          timeNames: ['20点', '08点'],
          usingDeptNames: ['总调度室', '112烧结厂']
        }
      ]
    }
  },
  // 方法
  methods: {
    // 复选框选中的项
    onSelectChange (val) {
      console.log(7878, val)
      this.selectedRowKeys = val
    },
    // switch 改变状态
    onStatusChange (value, record) {
      console.log(value, record)
    },
    // 获取当前选择页数
    handleTableChange (val) {
      console.log(1212, val)
    },
    /**
     * 表格外操作
     */
    // 新增
    creat () {
      console.log('新增操作')
    },
    // 重新处理操作
    anew () {
      console.log('重新处理操作')
    },
    // 作废操作
    toVoids () {
      console.log('作废操作')
    },
    /**
     * 表格内操作
     */
    // 删除
    del (row) {
      console.log('删除操作', row)
    },
    // 编辑
    edit (row) {
      console.log('编辑操作', row)
    }
  }
}
</script>
