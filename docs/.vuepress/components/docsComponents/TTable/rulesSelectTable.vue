<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="单元格编辑TSelectTable--rules"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
        ref="singleEditTSelectTable"
        :listTypeInfo="listTypeInfo"
        @handleEvent="handleEvent"
        @save="singleSave"
        @validateError="validateError"
        isShowFooterBtn
      >
        <template #toolbar>
          <div class="add_data" style="display: flex;margin-right: 10px">
            <el-input-number size="small" v-model="num" clearable placeholder="请输入追加条数"></el-input-number>
            <el-button size="small" type="primary" @click="add">追加{{ num ? num : "" }}条数据</el-button>
          </div>
          <el-button size="small" type="primary" @click="save">另一种获取table数据</el-button>
          <el-button size="small" @click="clearValidate">清除校验规则</el-button>
          <el-button size="small" type="primary" @click="reset">重置表单</el-button>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
import tselectData from './tselecttabledata.json'
export default {
  name: 'TtableSingleEditRules',
  data() {
    return {
      num: 2,
      tableData: [],
      // 编辑某个单元格
      table: {
        rules: {
          hobby: [
            { required: true, message: '请至少选择一个爱好', trigger: 'change' },
          ],
          deptCode: [
            { required: true, message: '请选择用户名称', trigger: 'change' },
          ],
          year: [{ required: true, message: '请选择年份', trigger: 'change' }],
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        },
        firstColumn: { type: 'index', label: '序列' }, // 显示序列号
        data: [],
        columns: [
          {
            prop: 'name',
            label: '姓名',
            minWidth: '160',
            canEdit: true,
            headerRequired: true,
            configEdit: {
              label: '姓名',
              type: 'input',
              editComponent: 'el-input',
            },
          },
          {
            prop: 'deptCode',
            label: 't-select-table使用',
            minWidth: '280',
            headerRequired: true,
            canEdit: true,
            configEdit: {
              label: '用户名称',
              editComponent: 't-select-table',
              isSelfCom: true,
              bind: {
                isKeyup: true,
                maxHeight: 400,
                selectWidth: 240,
                defaultSelectVal: [],
                keywords: { label: 'userName', value: 'userId' },
                table: { data: [] },
                columns: [
                  { prop: 'userName', label: '登录名', minWidth: '120' },
                  { prop: 'nickName', label: '插槽使用', minWidth: '120' },
                  { prop: 'deptName', label: '部门', minWidth: '120' },
                  { prop: 'roleName', label: '角色', minWidth: '120' },
                  { prop: 'descript', label: '描述', minWidth: '180' },
                  { prop: 'createTime', label: '创建时间', minWidth: '180' },
                ],
              },
              eventHandle: {
                radioChange: ({ row, scope }) => this.radioChange(row, scope),
              },
            },
          },
          {
            prop: 'unit',
            label: '单位',
            minWidth: '220',
            canEdit: true,
            headerRequired: true,
            configEdit: {
              label: '单位',
              append: '吨',
              rules: { required: true, message: '请输入单位', trigger: 'blur' },
              bind: { 'prefix-icon': 'el-icon-search' },
              editComponent: 'el-input',
            },
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
              arrKey: 'value',
            },
          },
          {
            prop: 'year',
            label: '日期年',
            minWidth: '180',
            canEdit: true,
            headerRequired: true,
            configEdit: {
              label: '日期年',
              type: 'year',
              editComponent: 'el-date-picker',
              bind: { valueFormat: 'YYYY' },
            },
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
                valueFormat: 'yyyy-MM-dd hh:mm:ss',
              },
            },
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
              editComponent: 'el-input-number',
            },
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
              editComponent: 'el-input',
            },
          },
        ],
        // 表格内操作列
        operator: [
          {
            type: 'danger',
            text: '删除',
            fun: this.editDel,
          },
        ],
        operatorConfig: {
          fixed: 'right',
        },
      },
      // 下拉选择项
      listTypeInfo: {
        hobbyList: [
          { label: '吉他', value: '0' },
          { label: '看书', value: '1' },
          { label: '美剧', value: '2' },
          { label: '旅游', value: '3' },
          { label: '音乐', value: '4' },
        ],
      },
    }
  },
  created() {
    this.getSelectTableList()
  },
  methods: {
    // 获取下来数据
    getSelectTableList() {
      const res = tselectData
      if (res.success) {
        this.tableData = res?.data.rows
        this.table.columns.map(item => {
          if (item.prop === 'deptCode') {
            item.configEdit.bind.table.data = this.tableData
          }
        })
      }
    },
    // 添加数据
    add() {
      if (this.num > 0) {
        for (let i = 0; i < this.num; i++) {
          this.table.data.push({ deptCode: null })
        }
        setTimeout(() => {
          this.$refs.singleEditTSelectTable.clearValidate()
        }, 100);
      }
    },
    // 下拉选择表格选中
    radioChange(row, scope) {
      this.table.data[scope.$index].deptCode = row.userId
    },
    // 点击保存获取table数据
    singleSave(data) {
      console.log('单个单元格编辑保存', data)
    },
    // 错误校验提示
    validateError(list) {
      list.map(val => {
        setTimeout(() => {
          this.$message.error(`${val}是必填项！`)
        }, 100);
      })
    },
    // 另一种获取的table数据
    save() {
      console.log('另一种获取的table数据--save', this.$refs.singleEditTSelectTable)
      this.$refs.singleEditTSelectTable.saveMethod((data) => {
        console.log('另一种获取的table数据--saveMethod', data)
      })
    },
    // 清除校验规则
    clearValidate() {
      this.$refs.singleEditTSelectTable.clearValidate()
    },
    // 重置表单
    reset() {
      this.$refs.singleEditTSelectTable.resetFields()
    },
    editDel(item, index, row) {
      // console.log('9966--', this.$refs.singleEditTSelectTable.save())
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
