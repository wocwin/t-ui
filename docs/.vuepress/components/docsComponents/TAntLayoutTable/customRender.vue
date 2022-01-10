<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-ant-layout-table :columns="columns" :dataSource="sourceData" />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  name: 'customRender',
  data() {
    return {
      // 表头
      columns: [
        {
          title: '取料地',
          dataIndex: 'addrName'
        },
        {
          title: '物料名称',
          dataIndex: 'materialName'
        },
        {
          title: '产地',
          dataIndex: 'materialProducingArea'
        },
        {
          title: '取样时间点',
          dataIndex: 'timeNames',
          customRender: (text) => {
            return text.toString()
          }
        },
        {
          title: '接收机构',
          dataIndex: 'usingDeptNames',
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
    // switch 改变状态
    onStatusChange(value, record) {
      console.log(value, record)
    }
  }
}
</script>
