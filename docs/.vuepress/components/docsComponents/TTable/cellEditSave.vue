<template>
  <div class="t-table" style="width:100%;">
    <t-table
      :isShowPagination="false"
      :table="table"
      :columns="table.columns"
      :listTypeInfo="table.listTypeInfo"
    />
  </div>
</template>

<script>
import cellEditData from "./cellEditData.json"
export default {
  data() {
    return {
      table: {
        data: [],
        operator: [
          {
            text: '编辑',
            disabled: false,
            fun: this.edit,
            noshow: [{ key: 'isPrint', val: [false] }, { key: 'isEdit', val: [true] }]
          },
          {
            text: '保存',
            fun: this.creatTag,
            disabled: false,
            show: { key: 'isEdit', val: [true] }
          },
          {
            text: '取消',
            disabled: false,
            fun: this.cancelEdit,
            show: { key: 'isEdit', val: [true] }
          }
        ],
        // 操作列样式
        operatorConfig: {
          fixed: 'right', // 固定列表右边（left则固定在左边）
          width: 120,
          label: '操作'
        },
        columns: [
          {
            prop: 'area', label: '装炉位置', minWidth: '120', canEdit: true,
            configEdit: {
              label: '装炉位置',
              type: 'select-arr',
              editComponent: 'el-select',
              list: 'furnaceAreaList',
              arrLabel: 'dictLabel',
              arrKey: 'dictValue',
              bind: (scope) => {
                return {
                  disabled: scope.row.isDisabled ? false : true,
                }
              }
            },
          },
          {
            prop: 'layer', label: '装炉层', minWidth: '120', canEdit: true, configEdit: {
              label: '装炉层',
              type: 'select-arr',
              editComponent: 'el-select',
              list: 'furnaceLayerList',
              arrLabel: 'dictLabel',
              arrKey: 'dictValue',
              bind: (scope) => {
                return {
                  disabled: scope.row.isDisabled ? false : true,
                }
              }
            }
          },
          {
            prop: 'isTail', label: '是否尾包', minWidth: '100', canEdit: true,
            configEdit: {
              label: '是否尾包',
              type: 'checkbox',
              editComponent: 'el-checkbox',
              bind: (scope) => {
                return {
                  disabled: scope.row.isDisabled ? false : true,
                }
              }
            }
          },
          {
            prop: 'packageNumStart', label: '开始编号', minWidth: '100', canEdit: true,
            configEdit: {
              label: '开始编号',
              type: 'input',
              editComponent: 'el-input',
              bind: (scope) => {
                return {
                  disabled: scope.row.isDisabled ? false : true,
                }
              }
            }
          },
          {
            prop: 'packageNumEnd', label: '结束编号', minWidth: '100', canEdit: true,
            configEdit: {
              label: '结束编号',
              type: 'input',
              editComponent: 'el-input',
              bind: (scope) => {
                return {
                  disabled: scope.row.isDisabled ? false : true,
                }
              }
            }
          },
          { prop: 'startDate', label: '生产日期', minWidth: '100' },
          { prop: 'endDate', label: '出炉日期', minWidth: '100' },
          {
            prop: 'singleWeight', label: '单包重量（吨）', minWidth: '100', canEdit: true,
            configEdit: {
              label: '单包重量（吨）',
              type: 'input',
              editComponent: 'el-input-number',
              event: 'singleWeight',
              bind: (scope) => {
                return {
                  controls: false,
                  disabled: scope.row.isDisabled ? false : true,
                  min: 1,
                  max: 9999,
                  precision: 2
                }
              }
            }
          }
        ],
        listTypeInfo: {
          furnaceAreaList: [
            {
              dictLabel: '炉头',
              dictValue: '1'
            },
            {
              dictLabel: '炉中',
              dictValue: '2'
            },
            {
              dictLabel: '炉尾',
              dictValue: '3'
            },
          ],
          furnaceLayerList: [
            {
              dictLabel: '上层',
              dictValue: '1'
            },
            {
              dictLabel: '中层',
              dictValue: '2'
            },
            {
              dictLabel: '下层',
              dictValue: '3'
            },
          ],
        },
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      let res = cellEditData
      if (res.success) {
        this.table.data = res.data
      }
    },
    // 生成标签明细
    creatTag(item) {
      console.log('保存', item)
      this.$set(item, 'isEdit', false)
      this.$set(item, 'isDisabled', false)
      item.isPrint = true
      this.table.operator.map((val) => {
        if (val.text == '编辑') {
          val.disabled = false
        }
      })
    },
    // 编辑
    edit(row) {
      this.table.data.map((item) => {
        this.$set(item, 'isEdit', false)
      })
      // 禁用操作按钮
      this.table.operator.map((item) => {
        if (item.text == '编辑') {
          item.disabled = true
        }
      })
      this.$set(row, 'isEdit', true)
      this.$set(row, 'isDisabled', true)
    },
    // 取消
    cancelEdit(row) {
      // 取消操作按钮禁用
      this.table.operator.map((item) => {
        if (item.text == '编辑') {
          item.disabled = false
        }
      })
      this.$set(row, 'isEdit', false)
      this.$set(row, 'isDisabled', false)
    },
  }
}
</script>
