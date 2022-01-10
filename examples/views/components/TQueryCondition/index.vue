<template>
  <div class="query-data">
    <t-layout sectionTitle="查询条件置顶组件">
      <div class="content-main t-margin-top-20">
        <t-query-condition :opts="opts" @submit="conditionEnter" :loading="loading" />
      </div>
    </t-layout>
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
      loading: false,
      queryData: {
        likeCargoNo: '',
        likeBookNo: '',
        likeTransportNo: '',
        likeCargoName: '',
        workshopNum: '',
        workshopNum1: '',
        date1: '',
        date2: '',
        date: ''
      }
    }
  },
  computed: {
    opts () {
      return {
        likeCargoNo: {
          label: '货源编号',
          comp: 'el-input',
          // span: 2,
          bind: {
            // clearable: true,
            placeholder: '请输入货源编号'
          }
        },
        likeBookNo: {
          label: '订单编号',
          comp: 'el-input',
          bind: {
          }
        },
        likeTransportNo: {
          label: '运单编号',
          comp: 'el-input',
          bind: {
          }
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
          // defaultVal: [moment().add(-1, 'days').format('yyyy-MM-DD'), moment().format('yyyy-MM-DD')],
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
      const { likeCargoNo, likeBookNo, likeTransportNo, likeCargoName, workshopNum, workshopNum1, date1, date } = this.queryData
      return {
        likeCargoNo,
        likeBookNo,
        likeTransportNo,
        likeCargoName,
        workshopNum,
        workshopNum1,
        date1,
        beginDate: date ? date[0] : null,
        endDate: date ? date[1] : null
      }
    }
  },
  // 方法
  methods: {
    // 点击查询按钮
    conditionEnter (data) {
      console.log('查询条件', data)
      this.loading = true
      this.queryData = data
      setTimeout(() => {
        this.loading = false
        console.log('最终条件', this.getQueryData)
      }, 1000)
    }
  }
}
</script>
