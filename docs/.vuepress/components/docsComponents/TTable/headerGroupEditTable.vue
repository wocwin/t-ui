<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        ref="singleHeaderEdit"
        :table="table"
        :columns="table.columns"
        isShowFooterBtn
        @handleEvent="handleEvent"
        @save="save"
      >
        <template #toolbar>
          <el-button type="primary" @click="singleSave">另一种获取table数据</el-button>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
export default {
  name: 'HeaderGroupEditTable',
  data() {
    return {
      // 编辑某个单元格
      table: {
        data: [
          {
            name: '张三',
            hobby: null,
            hobby1: null,
            year: '2021',
            time: null,
            remake: '',
            number: 12
          },
          {
            name: '李四',
            hobby: null,
            hobby1: null,
            year: '2021',
            time: null,
            remake: '',
            number: 15
          }
        ],
        columns: [
          {
            prop: 'name',
            label: '姓名',
            minWidth: '100',
          },
          {
            prop: 'firstEditor',
            label: '一级编辑列',
            minWidth: '180',
            children: [
              {
                prop: 'remake',
                label: '输入框',
                minWidth: '220',
                canEdit: true,
                configEdit: {
                  label: '备注',
                  append: '吨',
                  rules: { required: true, message: '请输入备注', trigger: 'blur' },
                  bind: { 'prefix-icon': 'el-icon-search' },
                  editComponent: 'el-input'
                }
              },
              {
                prop: 'hobby',
                label: '爱好单选',
                minWidth: '180',
                canEdit: true,
                configEdit: {
                  label: '爱好单选',
                  editComponent: 't-select',
                  isSelfCom: true,
                  bind: { optionSource: [], valueKey: 'value' }
                }
              },
              {
                prop: 'hobby1',
                label: '爱好多选',
                minWidth: '180',
                canEdit: true,
                configEdit: {
                  label: '爱好多选',
                  editComponent: 't-select',
                  isSelfCom: true,
                  bind: { optionSource: [], valueKey: 'value', multiple: true }
                }
              },
            ]
          },
          {
            label: '一级表头',
            minWidth: '180',
            children: [
              {
                label: '二级表头',
                minWidth: '180',
                children: [
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
                ]
              },
            ]
          },

          {
            prop: '',
            label: '不编辑列',
            minWidth: '180',
            children: [
              {
                prop: 'year',
                label: '日期年',
                minWidth: '180',
              },
              {
                prop: 'number',
                label: '计数器',
                minWidth: '220',
              }
            ]
          },

        ],
        // 表格内操作列
        operator: [
          {
            type: 'danger',
            text: '删除',
            fun: this.editDel
          }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const hobbyList = [
        { label: '吉他', value: '0' },
        { label: '看书', value: '1' },
        { label: '美剧', value: '2' },
        { label: '旅游', value: '3' },
        { label: '音乐', value: '4' }
      ]
      this.table.columns.map(val => {
        if (val.prop === 'firstEditor') {
          val.children.map(v => {
            switch (v.prop) {
              case 'hobby':
              case 'hobby1':
                v.configEdit.bind.optionSource = hobbyList
                break
            }
          })
        }
      })
    },
    save(data) {
      console.log('获取的table数据--save', data)
    },
    singleSave() {
      this.$refs.singleHeaderEdit.saveMethod((data) => {
        console.log('另一种获取的table数据--saveMethod', data)
      })
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
