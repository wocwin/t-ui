<template>
  <t-adaptive-page
    class="t-adaptive-page_virtual"
    :opts="opts"
    @submit="conditionEnter"
    title="虚拟列表demo"
    isCopy
    :table="table"
    use-virtual
    :maxHeight="400"
    :columns="table.columns"
  />
</template>
<script>
export default {
  name: 'TTableMix',
  data() {
    return {
      queryData: {
        likeCargoNo: null,
        likeBookNo: null,
        likeTransportNo: null,
        likeCargoName: null,
        workshopNum: null,
        workshopNum1: null,
        date: null
      },
      table: {
        data: [],
        // 表格内操作列
        operator: [
          {
            text: '新增',
            fun: this.add,
          },
          {
            text: '编辑',
            fun: this.edit
          },
          {
            text: '删除',
            render: (text, row) => {
              return (
                <el-popconfirm
                  title="你确定要删除吗？"
                  onConfirm={() => this.del(row)}
                >
                  <div slot="reference" type="link">
                    删除
                  </div>
                </el-popconfirm>
              )
            }
          }
        ],
        // 操作列样式
        operatorConfig: {
          fixed: 'right', // 固定列表右边（left则固定在左边）
          width: 280,
          label: '操作'
        },
        columns: [
          { prop: 'id', label: '序列', minWidth: 80, fixed: true },
          { prop: 'name', label: '姓名', minWidth: 120 },
          { prop: 'code', label: 'code', minWidth: 80 },
          { prop: 'address', label: '地址', minWidth: 240 },
          { prop: 'address', label: '地址', minWidth: 240 },
          { prop: 'address', label: '地址', minWidth: 240 },
          { prop: 'status', label: '状态', minWidth: 120 },
        ]
      },
      ADDRESS_TYPES: [
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
      ],
      ADDRESS_TYPES1: [
        {
          name: '前纺一车间',
          id: 'W1'
        },
        {
          name: '前纺二车间',
          id: 'W2'
        },
        {
          name: '前纺三车间',
          id: 'W3'
        },
        {
          name: '前纺四车间',
          id: 'W4'
        }
      ]
    }
  },
  computed: {
    opts() {
      return {
        workshopNum1: {
          label: 't-select单选',
          comp: 't-select',
          bind: {
            optionSource: this.ADDRESS_TYPES
          }
        },
        workshopNum: {
          label: 't-select多选',
          comp: 't-select',
          span: 2,
          bind: {
            multiple: true,
            optionSource: this.ADDRESS_TYPES1,
            valueKey: 'id',
            labelKey: 'name'
          }
        },
        date: {
          label: '日期范围',
          comp: 'el-date-picker',
          span: 2,
          bind: {
            type: 'daterange',
            rangeSeparator: '-',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            valueFormat: 'yyyy-MM-dd'
          }
        },
        likeCargoNo: {
          label: '货源编号',
          // span: 2,
          comp: 'el-input'
        },
        likeBookNo: {
          label: '订单编号',
          comp: 'el-input'
        },
        likeTransportNo: {
          label: '运单编号',
          comp: 'el-input'
        },
        likeCargoName: {
          label: '货品名称',
          comp: 'el-input'
        }
      }
    },
    // 查询条件所需参数
    getQueryData() {
      const { likeCargoNo, likeBookNo, likeTransportNo, likeCargoName, workshopNum, workshopNum1, date } = this.queryData
      return {
        likeCargoNo,
        likeBookNo,
        likeTransportNo,
        likeCargoName,
        workshopNum,
        workshopNum1,
        beginDate: date && date[0] ? date[0] : null,
        endDate: date && date[1] ? date[1] : null
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取table数据
    getData() {
      // setTimeout(() => {
      this.table.data = Array.from({ length: 10000 }).map((_, idx) => ({
        id: idx + 1,
        code: idx + 1,
        status: '待维修' + idx,
        name: '张三' + idx,
        address: '广东省广东省广州市白云广东省广州市白云广州市白云区' + idx,
      }))
      // }, 500);
    },
    // 新增
    add(val) {
      console.log('新增', val)
    },
    // 删除
    del(val) {
      this.$confirm('是否永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除', val)
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    edit(row) {
      console.log('点击table编辑', row)
    },
    // 点击查询按钮
    conditionEnter(data) {
      console.log('查询条件', data)
      this.queryData = data
      console.log('最终条件', this.getQueryData)
    }
  }
}
</script>
<style lang="scss">
.t-adaptive-page_virtual {
  .right_content {
    .table_main {
      .t-table {
        .el-table {
          overflow: hidden !important;
        }
      }
    }
  }
}
</style>

