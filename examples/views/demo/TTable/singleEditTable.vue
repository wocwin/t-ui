<template>
  <t-layout-page>
    <t-layout-page-item>
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
        <!-- 自定义单元格编辑组件（自动完成） -->
        <template #autocomplete="{scope}">
          <el-autocomplete
            clearable
            :debounce="0"
            class="inline-input"
            v-model="scope.row[scope.column.property]"
            :fetch-suggestions="querySearch"
            @clear="clearSelect"
            placeholder="请输入内容"
          ></el-autocomplete>
        </template>
      </t-table>
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
              hobby2: ['1', '2'],
              autocomplete: '三全鲜食（北新泾店）',
              year: '2022',
              time: '2022-01-18 16:58:58',
              remake: '备注张三',
              number: 12
            },
            {
              name: '李四',
              hobby: '2',
              hobby1: ['0', '2'],
              hobby2: ['0', '2'],
              autocomplete: '三全鲜食（北新泾店）',
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
              minWidth: '100',
              canEdit: true,
              renderHeader: (row) => {
                const style = {
                  color: '#F56C6C',
                  fontSize: '16px',
                  marginRight: '3px'
                }
                return (
                  <div>
                    <span style={style}>*</span>
                    <span>{row.label}</span>
                  </div>
                )
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
              prop: 'autocomplete',
              label: '自动完成',
              minWidth: '180',
              canEdit: true,
              configEdit: {
                label: '自动输入完成',
                // type: 'el-select-multiple',
                editComponent: 'el-autocomplete',
                editSlotName: 'autocomplete'
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
        },
        autoOption: [
          { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
          { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
          { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
          { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
          { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
          { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
          { 'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号' },
          { 'value': '茶芝兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号' },
          { 'value': '十二泷町', 'address': '上海市北翟路1444弄81号B幢-107' }
        ]
      }
    }
  },
  methods: {
    /**
    * 自动完成组件
    */
    querySearch(queryString, cb) {
      var restaurants = this.singleEditConfig.autoOption
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // clearable清除事件事件
    clearSelect() {
      // 主要代码
      // this.$refs.parentCom.activated = true
      // document.activeElement获得了DOM中被聚焦的元素；.blur()取消聚焦
      document.activeElement.blur()
      this.$forceUpdate()
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
      console.log('handleEvent', type, val)
    }
  }
}
</script>
