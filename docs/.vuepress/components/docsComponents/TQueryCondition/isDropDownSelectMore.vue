<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        ref="queryCondition"
        :opts="opts"
        isDropDownSelectMore
        :loading="loading"
        @submit="conditionEnter"
        :moreCheckList="moreCheckList"
        @getCheckList="getChildCheck"
      >
        <template #likeTransportNo="{param}">
          <el-input v-model="param.likeTransportNo" clearable placeholder="自定义插槽输入框" />
        </template>
      </t-query-condition>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
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
  data() {
    return {
      loading: false,
      queryData: {
        likeCargoNo: null,
        likeBookNo: null,
        likeTransportNo: null,
        likeCargoName: null,
        workshopNum: null,
        workshopNum1: null,
        date1: null,
        // date: null,
      },
      sexList: [],
      hobbyList: [],
      opts: {
        likeCargoNo: {
          label: '货源编号',
          comp: 'el-input'
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
      },
      checkQuery: {}
    }
  },
  computed: {
    moreCheckList() {
      return [
        { label: '姓名', comp: 'el-input', prop: 'name' },
        { label: '年龄', comp: 'el-input', prop: 'age' },
        { label: '性别', comp: 'el-select', prop: 'sex', valueKey: "value", list: this.sexList },
        {
          label: "爱好", comp: "t-select", prop: 'hobby', span: 2, bind: { multiple: true, optionSource: this.hobbyList, valueKey: "value", },
        },
        { label: '合同号', comp: 'el-input', prop: 'contractNo' },
        { label: '供应商', comp: 'el-input', prop: 'supplier' },
        { label: '磅单号', comp: 'el-input', prop: 'balanceCode' },
        { label: '车牌号', comp: 'el-input', prop: 'license' },
        { label: '备注', comp: 'el-input', prop: 'remark' },
        { label: '检验员', comp: 'el-input', prop: 'inspector' },
        { label: '取样人', comp: 'el-input', prop: 'sampler' },
        { label: '审核人', comp: 'el-input', prop: 'reviewer' },
        { label: '其他检验项', comp: 'el-input', prop: 'physicsInspection' },
        { label: '实际数量', comp: 'el-input', prop: 'factQuantity' }
      ]
    }
  },
  watch: {
    checkQuery: {
      handler(nval, oval) {
        for (let i = 0; i < Object.keys(oval).length; i++) {
          this.$delete(this.opts, Object.keys(oval)[i])
        }
        this.opts = Object.assign({}, this.opts, nval)
        for (let i = 0; i < Object.keys(this.opts).length; i++) {
          this.queryData[Object.keys(this.opts)[i]] = null
        }
      },
      deep: true
    }
  },
  created() {
    this.getList()
  },
  // 方法
  methods: {
    getList() {
      this.sexList = [{ label: '男', value: '1' }, { label: '女', value: '2' }]
      this.hobbyList = [
        { label: '吉他', value: '0' },
        { label: '看书', value: '1' },
        { label: '美剧', value: '2' },
        { label: '旅游', value: '3' },
        { label: '音乐', value: '4' }
      ]
    },
    getChildCheck(val) {
      this.checkQuery = val
    },
    // 点击查询按钮
    conditionEnter(data) {
      this.loading = true
      this.queryData = data
      console.log('最终条件', this.queryData)
      setTimeout(() => {
        this.loading = false
      }, 2000)
    }
  }
}
</script>
