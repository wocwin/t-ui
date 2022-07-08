<template>
  <div class="query-data">
    <t-query-condition ref="queryCondition" :opts="opts" @submit="conditionEnter">
      <template #likeTransportNo>
        <el-input v-model="queryData.likeTransportNo" clearable placeholder="自定义插槽输入框" />
      </template>
    </t-query-condition>
  </div>
</template>
<script>
import moment from 'moment'
const ADDRESS_TYPES = [
  {
    label: '前纺一车间',
    key: 'W1'
  },
  {
    label: '前纺二车间',
    key: 'W2'
  },
  {
    label: '前纺三车间',
    key: 'W3'
  }
]
export default {
  name: 'queryData',
  data () {
    return {
      queryData: {
        likeCargoNo: null,
        likeBookNo: null,
        likeTransportNo: null,
        likeCargoName: null,
        workshopNum: null,
        workshopNum1: null,
        date1: null,
        date2: null,
        date: null,
        beginTime: null, // 组件开始日期
        endTime: moment().format('yyyy-MM-DD 23:59:59'), // 组件结束日期
      }
    }
  },
  computed: {
    opts () {
      return {
        likeCargoNo: {
          label: '货源编号',
          comp: 'el-input',
          placeholder: '去除首尾空格',
          event: {
            change: (val) => this.change(val, 'likeCargoNo')
          }
        },
        likeBookNo: {
          labelRender: () => {
            return (
              <el-tooltip content={'自定义label'} placement="top">
                <div>订单编号</div>
              </el-tooltip>
            )
          },
          placeholder: '自定义label',
          comp: 'el-input'
        },
        likeTransportNo: {
          label: '运单编号',
          comp: 'el-input',
          slotName: 'likeTransportNo',
        },
        likeCargoName: {
          label: '货品名称',
          comp: 'el-input',
          bind: {
          }
        },
        workshopNum1: {
          label: '车间2',
          comp: 'el-select',
          changeEvent: 'change',
          // defaultVal: 'W1',
          bind: {
          },
          child: ADDRESS_TYPES.reduce((acc, cur) => {
            acc.push({
              comp: 'el-option',
              value: cur.key,
              bind: {
                label: cur.label,
                key: cur.key
              }
            })
            return acc
          }, [])
        },
        workshopNum: {
          label: '车间',
          comp: 'el-select',
          changeEvent: 'change',
          // defaultVal: 'W1',
          bind: {
          },
          child: [
            {
              comp: 'el-option',
              value: 'W1',
              bind: {
                label: '前纺一车间',
                key: 'W1'
              }
            },
            {
              comp: 'el-option',
              value: 'W2',
              bind: {
                label: '前纺二车间',
                key: 'W2'
              }
            },
            {
              comp: 'el-option',
              value: 'W3',
              bind: {
                label: '前纺三车间',
                key: 'W3'
              }
            }
          ]
        },
        date3: {
          label: '日期组件',
          comp: 'TDatePicker',
          span: 2,
          event: {
            startChange: (val) => this.startChange(val),
            endChange: (val) => this.endChange(val),
          },
          bind: {
            dispaysType: 'two',
            pickerType: 'datetime',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            endDate: moment().format('yyyy-MM-DD 23:59:59'),
            startDate: '',
          }
        },
        date1: {
          label: '日期',
          comp: 'el-date-picker',
          bind: {
            valueFormat: 'yyyy-MM-dd'
          }
        },
        date: {
          label: '日期范围',
          comp: 'el-date-picker',
          span: 2,
          defaultVal: [moment().add(-1, 'days').format('yyyy-MM-DD'), moment().format('yyyy-MM-DD')],
          bind: {
            type: 'daterange',
            rangeSeparator: '-',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            valueFormat: 'yyyy-MM-dd'
          }
        }
      }
    },
    // 查询条件所需参数
    getQueryData () {
      const { likeCargoNo, likeBookNo, likeTransportNo, likeCargoName, workshopNum, workshopNum1, date1, date, beginTime, endTime } = this.queryData
      return {
        likeCargoNo,
        likeBookNo,
        likeTransportNo,
        likeCargoName,
        workshopNum,
        workshopNum1,
        date1,
        beginDate: date[0] ? date[0] : null,
        endDate: date[1] ? date[1] : null,
        beginTime,
        endTime: endTime && endTime ? endTime : moment().format('yyyy-MM-DD 23:59:59'),
      }
    }
  },
  // 方法
  methods: {
    // 去除输入框首尾空格
    change (val, type) {
      const reg = /(^\s*)|(\s*$)/g
      const value = val.replace(reg, '')
      this.queryData[type] = value
      this.$refs.queryCondition._data.form[type] = value
    },
    // 开始日期
    startChange (val) {
      this.getQueryData.beginTime = val
    },
    // 结束日期
    endChange (val) {
      this.getQueryData.endTime = val
    },
    // 点击查询按钮
    conditionEnter (data) {
      console.log('查询条件', data)
      this.queryData = data
      console.log('最终条件', this.getQueryData)
    }
  }
}
</script>
