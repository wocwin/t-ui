<template>
  <div class="t-edit-table-demo">
    <t-layout sectionTitle="编辑table">
      <div class="content-main">
        <div class="card-wrap">
          <t-edit-table
            :table="table"
            :listTypeInfo="listTypeInfo"
            @add="add"
            @save="save"
            @handleEvent="handleEvent"
          />
        </div>
      </div>
    </t-layout>
  </div>
</template>
<script>
export default {
  name: 'TEditTableDemo',
  data () {
    return {
      table: {
        border: true,
        firstColumn: { type: 'index', label: '序列' }, // 显示序列号
        data: [],
        columns: [
          { prop: 'name', label: '姓名', minWidth: '100', configEdit: { label: '姓名', type: 'input', editComponent: 'el-input' } },
          {
            prop: 'hobby',
            label: '爱好',
            minWidth: '180',
            configEdit: {
              label: '爱好',
              type: 'select-arr',
              editComponent: 'el-select',
              list: 'hobbyList',
              event: 'hobbyList',
              arrLabel: 'label',
              arrKey: 'value'
            }
          },
          {
            prop: 'number',
            label: '计数器',
            minWidth: '220',
            configEdit: {
              label: '计数器',
              type: 'inputNumber',
              bind: { controls: true, min: 0, max: 99 },
              editComponent: 'el-input-number'
            }
          },
          {
            prop: 'checkbox',
            label: '复选框',
            minWidth: '220',
            configEdit: {
              label: '复选框',
              type: 'checkbox',
              list: 'hobbyList',
              editComponent: 'el-checkbox-group'
            }
          }
        ],
        // 表格内操作列
        operator: [
          {
            type: 'danger',
            text: '删除',
            fun: this.del
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
  },
  methods: {
    add () {
      console.log('新增')
      const objAdd = {
        name: '',
        hobby: '',
        checkbox: [],
        number: 0
      }
      this.table.data.push(objAdd)
    },
    del (index, row) {
      row.splice(index, 1)
      console.log('删除', row, index)
    },
    // 编辑每一项的change事件
    handleEvent (type, val) {
      console.log('handleEvent', type, val)
    },
    save (data) {
      const flag = data.some(item => item.hobby === '')
      if (flag) {
        this.$message.error('爱好不能为空')
        return
      }
      console.log('保存', data)
    }
  }
}
</script>
