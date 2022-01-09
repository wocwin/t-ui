<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-ant-layout-table
        isCustomScroll
        :columns="columns"
        :dataSource="sourceData"
        :tableOpt="{bordered:true,scroll: {x: '110%'}}"
      >
        <template #materialName="{text}">
          <a-button>{{text}}</a-button>
        </template>
      </t-ant-layout-table>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  name: 'baseTable',
  data () {
    return {
      // 表头
      columns: [
        {
          title: '取料地',
          width: 180,
          minWidth: 180,
          dataIndex: 'addrName',
          key: "addrName",
          customRender: (text) => {
            const fixInfo = {
              age: '年龄：',
              name: '姓名：',
              course: '学科：',
              sex: '性别：',
              grade: '分数：'
            }
            const flex = {
              display: 'flex'
            }
            return (
              <div>{
                text && Object.keys(fixInfo).map(item => {
                  return (
                    <div style={flex}>
                      <div style="color:#8C8C8C;">{fixInfo[item]}</div>
                      <div style="color:#000;">{text[item] === undefined ? '' : text[item]}</div>
                    </div>
                  )
                })
              }
              </div>
            )
          }
        },
        {
          title: '取料地',
          width: 180,
          minWidth: 180,
          dataIndex: 'addrName99',
          key: "addrName99",
          customRender: (text) => {
            const fixInfo = {
              age: '年龄：',
              name: '姓名：',
              course: '学科：',
              sex: '性别：',
              grade: '分数：'
            }
            const flex = {
              display: 'flex'
            }
            return (
              <div>{
                text && Object.keys(fixInfo).map(item => {
                  return (
                    <div style={flex}>
                      <div style="color:#8C8C8C;">{fixInfo[item]}</div>
                      <div style="color:#000;">{text[item] === undefined ? '' : text[item]}</div>
                    </div>
                  )
                })
              }
              </div>
            )
          }
        },
        {
          title: '取料地',
          width: 180,
          minWidth: 180,
          dataIndex: 'addrName29',
          key: "addrName29",
          customRender: (text) => {
            const fixInfo = {
              age: '年龄：',
              name: '姓名：',
              course: '学科：',
              sex: '性别：',
              grade: '分数：'
            }
            const flex = {
              display: 'flex'
            }
            return (
              <div>{
                text && Object.keys(fixInfo).map(item => {
                  return (
                    <div style={flex}>
                      <div style="color:#8C8C8C;">{fixInfo[item]}</div>
                      <div style="color:#000;">{text[item] === undefined ? '' : text[item]}</div>
                    </div>
                  )
                })
              }
              </div>
            )
          }
        },
        {
          title: '取料地',
          width: 180,
          minWidth: 180,
          dataIndex: 'addrName19',
          key: "addrName19",
          customRender: (text) => {
            const fixInfo = {
              age: '年龄：',
              name: '姓名：',
              course: '学科：',
              sex: '性别：',
              grade: '分数：'
            }
            const flex = {
              display: 'flex'
            }
            return (
              <div>{
                text && Object.keys(fixInfo).map(item => {
                  return (
                    <div style={flex}>
                      <div style="color:#8C8C8C;">{fixInfo[item]}</div>
                      <div style="color:#000;">{text[item] === undefined ? '' : text[item]}</div>
                    </div>
                  )
                })
              }
              </div>
            )
          }
        },
        {
          title: '取料地',
          width: 180,
          minWidth: 180,
          dataIndex: 'addrName59',
          key: "addrName59",
          customRender: (text) => {
            const fixInfo = {
              age: '年龄：',
              name: '姓名：',
              course: '学科：',
              sex: '性别：',
              grade: '分数：'
            }
            const flex = {
              display: 'flex'
            }
            return (
              <div>{
                text && Object.keys(fixInfo).map(item => {
                  return (
                    <div style={flex}>
                      <div style="color:#8C8C8C;">{fixInfo[item]}</div>
                      <div style="color:#000;">{text[item] === undefined ? '' : text[item]}</div>
                    </div>
                  )
                })
              }
              </div>
            )
          }
        },
        {
          title: '取料地',
          width: 180,
          minWidth: 180,
          dataIndex: 'addrName79',
          key: "addrName79",
          customRender: (text) => {
            const fixInfo = {
              age: '年龄：',
              name: '姓名：',
              course: '学科：',
              sex: '性别：',
              grade: '分数：'
            }
            const flex = {
              display: 'flex'
            }
            return (
              <div>{
                text && Object.keys(fixInfo).map(item => {
                  return (
                    <div style={flex}>
                      <div style="color:#8C8C8C;">{fixInfo[item]}</div>
                      <div style="color:#000;">{text[item] === undefined ? '' : text[item]}</div>
                    </div>
                  )
                })
              }
              </div>
            )
          }
        },
        {
          title: '物料名称',
          width: 100,
          dataIndex: 'materialName',
          scopedSlots: { customRender: 'materialName' }
        },
        {
          title: '产地',
          width: 100,
          dataIndex: 'materialProducingArea'
        },
        {
          title: '取样时间点',
          width: 100,
          dataIndex: 'timeNames'
        },
        {
          title: '接收机构',
          width: 280,
          dataIndex: 'usingDeptNames'
        },
        {
          title: '类型',
          width: 100,
          dataIndex: 'samplingType'
        },
        {
          title: '状态',
          width: 100,
          dataIndex: 'status'
        }
      ],
      // 数据源
      sourceData: [
        {
          id: 85,
          addrName: {
            age: 19,
            name: '张三',
            sex: '男',
            course: '数学',
            grade: 90
          },
          materialName: '卡粉-new',
          materialProducingArea: '京环-new',
          samplingType: 0,
          status: 1,
          timeNames: ['2点半'],
          usingDeptNames: ['BBQ煤炉', '总调度室', '球团3期', '竖炉']
        },
        {
          id: 80,
          addrName: {
            sex: '男',
            age: 19,
            name: '张三2',
            course: '语文',
            grade: 99
          },
          materialName: '测试物料',
          materialProducingArea: '测试场地',
          samplingType: 2,
          status: 1,
          timeNames: ['12点'],
          usingDeptNames: ['总调度室', '112烧结厂']
        },
        {
          id: 79,
          addrName: {
            age: 19,
            name: '张三3',
            sex: '男',
            course: '英语',
            grade: 90
          },
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
    onStatusChange (value, record) {
      console.log(value, record)
    }
  }
}
</script>
