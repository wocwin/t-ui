<template>
  <div class="t-table-single-edit-cell" style="width:100%;">
    <t-table
      :table="singleEditConfig.table"
      :columns="singleEditConfig.table.columns"
      :listTypeInfo="singleEditConfig.listTypeInfo"
      @handleEvent="handleEvent"
      @save="singleSave"
    >
      <!-- 自定义单元格编辑组件(多选下拉选择) -->
      <template #editHobby="{scope}">
        <el-select v-model="scope.row[scope.column.property]" multiple>
          <el-option
            v-for="item in singleEditConfig.listTypeInfo.hobbyList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
    </t-table>
  </div>
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
              name: null,
              hobby: null,
              hobby1: [],
              hobby2: [],
              year: null,
              time: null,
              remake: null,
              number: 12
            },
            {
              name: '李四',
              hobby: '2',
              hobby1: ['0', '2'],
              hobby2: ['0', '2'],
              year: '2021',
              time: '2022-01-19 16:58:58',
              remake: '备注李四',
              number: 15
            }
          ],
          columns: [
            {
              prop: 'name',
              label: '姓名',
              minWidth: '160',
              canEdit: true,
              configEdit: {
                label: '姓名',
                type: 'input',
                editComponent: 'el-input',
                eventHandle: {
                  focus: (val) => this.nameFocus(val),
                  clear: () => this.nameClear(),
                  blur: (val) => this.nameBlur(val)
                }
              }
            },
            {
              prop: 'remake',
              label: '输入框',
              minWidth: '220',
              canEdit: true,
              configEdit: {
                label: '备注',
                append: '吨',
                bind: { 'prefix-icon': 'el-icon-search' },
                editComponent: 'el-input'
              }
            },
            {
              prop: 'hobby',
              label: '爱好单选',
              minWidth: '180',
              headerRequired: true,
              canEdit: true,
              configEdit: {
                label: '爱好单选',
                type: 'select-arr',
                editComponent: 'el-select',
                list: 'hobbyList',
                event: 'hobbyList',
                arrLabel: 'label',
                arrKey: 'value'
              }
            },
            {
              prop: 'hobby1',
              label: '编辑组件插槽',
              minWidth: '180',
              renderHeader: (row) => {
                return (
                  <div>
                    <span>{row.label}</span>
                    <i class="el-icon-question" style="color:#409eff;margin-left:5px;font-size:15px;"></i>
                  </div>
                )
              },
              canEdit: true,
              configEdit: {
                label: '编辑组件插槽',
                type: 'el-select-multiple',
                editComponent: 'el-select',
                editSlotName: 'editHobby'
              }
            },
            {
              prop: 'year',
              label: '日期年',
              minWidth: '180',
              canEdit: true,
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
              canEdit: true,
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
              canEdit: true,
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
              canEdit: true,
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
    nameFocus(val) {
      console.log('姓名聚焦事件', val.type)
    },
    nameBlur(val) {
      console.log('姓名失焦事件', val.type)
    },
    nameClear() {
      console.log('姓名清空事件')
    },
    singleSave(data) {
      console.log('单个单元格编辑保存', data)
    },
    editDel(item, index, row) {
      row.splice(index, 1)
      console.log('删除', item, row, index)
    },
    // 编辑每一项的change事件
    handleEvent(type, val) {
      switch (type) {
        case 'hobbyList':
          console.log('爱好选择', type, val)
          break
      }
    }
  }
}
</script>
