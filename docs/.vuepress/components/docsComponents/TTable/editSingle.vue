<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        isShowFooterBtn
        :table="singleEditConfig.table"
        :columns="singleEditConfig.table.columns"
        :listTypeInfo="singleEditConfig.listTypeInfo"
        @handleEvent="handleEvent"
        @save="singleSave"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
export default {
  name: 'TtableSingleEditCell',
  data() {
    return {
      // 编辑某个单元格
      singleEditConfig: {
        table: {
          border: true,
          firstColumn: { type: 'index', label: '序列' }, // 显示序列号
          data: [
            {
              name: '张三',
              hobby: '1',
              hobby1: ['1', '2'],
              date: '2022-01-18',
              year: '2022',
              time: '2022-01-18 16:58:58',
              remake: '备注张三',
              number: 12
            },
            {
              name: '李四',
              hobby: '2',
              hobby1: ['0', '2'],
              date: '2022-01-19',
              year: '2021',
              time: '2022-01-19 16:58:58',
              remake: '备注李四',
              number: 15
            }
          ],
          columns: [
            { prop: 'name', label: '姓名', minWidth: '180', isClickEdit: true },
            {
              prop: 'hobby',
              label: '爱好单选',
              minWidth: '180',
              isClickEdit: true,
              isShowEditIcon: true,
              configEdit: {
                label: '爱好单选',
                type: 'select-arr',
                editComponent: 'el-select',
                list: 'hobbyList',
                event: 'hobbyList',
                arrLabel: 'label',
                arrKey: 'value',
                isShowTips: true
              }
            },
            {
              prop: 'hobby1',
              label: '爱好多选',
              minWidth: '180',
              isClickEdit: true,
              configEdit: {
                label: '爱好多选',
                type: 'el-select-multiple',
                editComponent: 'el-select',
                list: 'hobbyList',
                event: 'hobbyList1',
                bind: { multiple: true },
                arrLabel: 'label',
                arrKey: 'value'
              }
            },
            {
              prop: 'date',
              label: '日期',
              minWidth: '180'
            },
            {
              prop: 'year',
              label: '日期年',
              minWidth: '180',
              isClickEdit: true,
              configEdit: {
                label: '日期年',
                type: 'year',
                editComponent: 'el-date-picker',
                bind: { valueFormat: 'yyyy' }
              }
            },
            {
              prop: 'time',
              label: '日期时间',
              minWidth: '180',
              isClickEdit: true,
              configEdit: {
                label: '日期时间',
                type: 'datetime',
                editComponent: 'el-date-picker',
                bind: {
                  valueFormat: 'yyyy-MM-dd hh:mm:ss'
                }
              }
            },
            {
              prop: 'number',
              label: '计数器',
              minWidth: '220',
              isClickEdit: true,
              configEdit: {
                label: '计数器',
                type: 'inputNumber',
                bind: { min: 0, max: 99 },
                editComponent: 'el-input-number'
              }
            },
            {
              prop: 'remake',
              label: '备注',
              minWidth: '220',
              isClickEdit: true,
              configEdit: {
                label: '备注',
                type: 'textarea',
                bind: { type: 'textarea' },
                editComponent: 'el-input'
              }
            }
          ],
          // 表格内操作列
          operator: [
            {
              type: 'danger',
              text: '删除',
              fun: this.editDel
            }
          ]
        },
        // 下拉选择项
        listTypeInfo: {
          hobbyList: [
            { label: '吉他', value: '0' },
            { label: '看书', value: '1' },
            { label: '美剧', value: '2' },
            { label: '旅游', value: '3' },
            { label: '音乐', value: '4' }
          ]
        }
      }
    }
  },
  methods: {
    singleSave(data) {
      console.log('单个单元格编辑保存', data)
    },
    editDel(item, index, row) {
      row.splice(index, 1)
      console.log('删除', item, row, index)
    },
    // 编辑每一项的change事件
    handleEvent(type, val) {
      console.log('handleEvent', type, val)
    }
  }
}
</script>
