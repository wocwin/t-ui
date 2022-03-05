<template>
  <div class="t_table_demo">
    <t-layout sectionTitle="TTable组件运用">
      <div class="content-main">
        <t-layout-page>
          <t-layout-page-item>
            <h1>table单个单元格编辑操作</h1>
            <div class="edit_config">
              <t-table
                isShowFooterBtn
                :isShowTips="false"
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
            </div>
          </t-layout-page-item>
          <t-layout-page-item>
            <h1>table编辑操作</h1>
            <div class="edit_config">
              <t-table
                isEditCell
                isShowFooterBtn
                :table="editConfig.table"
                :columns="editConfig.table.columns"
                :listTypeInfo="editConfig.listTypeInfo"
                @handleEvent="handleEvent"
                @save="save"
                @add="editAdd"
              />
            </div>
          </t-layout-page-item>
          <t-layout-page-item>
            <h1>简单操作</h1>
            <div class="base">
              <t-table
                title="常规表格"
                :table="baseData.table"
                :columns="baseData.columns"
                @radioChange="radioChange"
              />
              <t-table title="双击单元格复制" :table="baseData.table" :columns="baseData.columns" isCopy />
              <t-table title="文字变色" :table="changeColor.table" :columns="changeColor.columns" />
              <t-table
                title="显示分页器"
                :table="baseData.table"
                :columns="baseData.columns"
                isShowPagination
              />
              <t-table
                title="显示复选框"
                :table="baseData.table2"
                @selection-change="selectionChange"
                :columns="baseData.columns"
                isShowPagination
              />
              <t-table
                title="显示序列"
                :table="baseData.table1"
                :columns="baseData.columns"
                isShowPagination
              />
              <t-table
                title="动态显示隐藏列"
                columnSetting
                name="TtableColumnSet"
                :table="columnSetData.table"
                :columns="columnSetData.columns"
              />
            </div>
          </t-layout-page-item>
          <t-layout-page-item>
            <h1>按钮操作</h1>
            <div class="operator">
              <t-table title="表格内操作" :table="operatorData.table" :columns="operatorData.columns" />
              <t-table
                title="表格外操作"
                highlightCurrentRow
                :table="operatorData.table1"
                :columns="operatorData.columns"
              >
                <!-- 必须要有toolbar插槽 -->
                <template #toolbar></template>
              </t-table>
            </div>
          </t-layout-page-item>
          <t-layout-page-item>
            <h1>过滤和插槽操作</h1>
            <div class="filters">
              <t-table
                title="过滤器和自定义插槽使用"
                :table="filtersData.table"
                :columns="filtersData.columns"
              >
                <!-- 自定义插槽 -->
                <template #amount="{param}">{{param.row.amount|currencyFilter}}</template>
              </t-table>
            </div>
          </t-layout-page-item>
        </t-layout-page>
      </div>
    </t-layout>
  </div>
</template>

<script>
export default {
  name: 'TTableDemo',
  data () {
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
              renderHeader: (h, { column }) => {
                const style = {
                  color: '#F56C6C',
                  fontSize: '16px',
                  marginRight: '3px'
                }
                return (
                  <div>
                    <span style={style}>*</span>
                    <span>{column.label}</span>
                  </div>
                )
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
              renderHeader: (h, { column }) => {
                return (
                  <div>
                    <span>{column.label}</span>
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
      },
      baseData: {
        table: {
          border: true, // 可自动调整列宽
          firstColumn: { type: 'radio' }, // 显示单选框
          data: [
            {
              id: '1',
              date: '2019-09-25',
              name: '张三',
              status: '2',
              address: '广东省广州市天河区'
            },
            {
              id: '2',
              date: '2019-09-26',
              name: '张三1',
              status: '1',
              address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
            },
            {
              id: '3',
              date: '2019-09-27',
              name: '张三2',
              status: '3',
              address: '广东省广州市天河区3'
            }
          ]
        },
        table2: {
          total: 0,
          currentPage: 1,
          pageSize: 10,
          firstColumn: { type: 'selection' }, // 显示复选框
          border: true, // 可自动调整列宽
          data: [
            {
              id: '1',
              date: '2019-09-25',
              name: '张三',
              status: '2',
              address: '广东省广州市天河区'
            },
            {
              id: '2',
              date: '2019-09-26',
              name: '张三1',
              status: '1',
              address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
            },
            {
              id: '3',
              date: '2019-09-27',
              name: '张三2',
              status: '3',
              address: '广东省广州市天河区3'
            }
          ]
        },
        table1: {
          total: 0,
          currentPage: 1,
          pageSize: 10,
          firstColumn: { type: 'index', label: '序列' }, // 显示序列号
          border: true, // 可自动调整列宽
          data: [
            {
              id: '1',
              date: '2019-09-25',
              name: '张三',
              status: '2',
              address: '广东省广州市天河区'
            },
            {
              id: '2',
              date: '2019-09-26',
              name: '张三1',
              status: '1',
              address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
            },
            {
              id: '3',
              date: '2019-09-27',
              name: '张三2',
              status: '3',
              address: '广东省广州市天河区3'
            }
          ]
        },
        columns: [
          { prop: 'name', label: '姓名', minWidth: '100', sort: true },
          { prop: 'date', label: '日期', minWidth: '180', sort: true },
          { prop: 'date', label: '日期', minWidth: '180', sort: true },
          { prop: 'date', label: '日期', minWidth: '180', sort: true },
          { prop: 'address', label: '地址', minWidth: '220', sort: true }
        ]
      },
      // 文字变色
      changeColor: {
        table: {
          data: [
            {
              id: '1',
              date: '2019-09-25',
              name: '张三',
              status: '2',
              address: '广东省广州市天河区'
            },
            {
              id: '2',
              date: '2019-09-26',
              name: '张三1',
              status: '1',
              address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
            },
            {
              id: '3',
              date: '2019-09-27',
              name: '张三2',
              status: '3',
              address: '广东省广州市天河区3'
            }
          ],
          // 状态值为3时，文字变色
          changeColor: { key: 'status', val: '3', txtStyle: '#ef473a' }
        },
        columns: [
          { prop: 'name', label: '姓名', minWidth: '100', sort: true },
          { prop: 'date', label: '日期', minWidth: '180', sort: true },
          { prop: 'date', label: '日期', minWidth: '180', sort: true },
          { prop: 'date', label: '日期', minWidth: '180', sort: true },
          { prop: 'address', label: '地址', minWidth: '220', sort: true }
        ]
      },
      // 动态显示隐藏列
      columnSetData: {
        table: {
          data: [
            {
              id: '1',
              date: '2019-09-25',
              name: '张三',
              status: '2',
              amount: 3000,
              address: '广东省广州市天河区'
            },
            {
              id: '2',
              date: '2019-09-26',
              name: '张三1',
              status: '2',
              amount: 2000,
              address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
            },
            {
              id: '3',
              date: '2019-09-27',
              name: '张三2',
              status: '3',
              amount: 4000,
              address: '广东省广州市天河区3'
            }
          ]
        },
        columns: [
          { prop: 'name', label: '姓名', minWidth: '100' },
          { prop: 'date', label: '日期', minWidth: '160' },
          { prop: 'address', label: '地址', minWidth: '220' },
          { prop: 'status', label: '状态', minWidth: '100', filters: { param: 'PROTOCOL_BUSS_TYPE' } },
          { prop: 'amount', label: '金额', minWidth: '160', filters: { method: '￥' } },
          { prop: 'address77', label: '地址77', minWidth: '220' },
          { prop: 'name1', label: '姓名1', minWidth: '100' },
          { prop: 'date22', label: '日期22', minWidth: '180' },
          { prop: 'address33', label: '地址33', minWidth: '220' },
          { prop: 'name44', label: '姓名44', minWidth: '100' },
          { prop: 'date55', label: '日期55', minWidth: '180' },
          { prop: 'address66', label: '地址66', minWidth: '220' }
        ]
      },
      // 过滤器
      filtersData: {
        table: {
          // 数据
          data: [
            {
              id: '1',
              date: '2019-09-25',
              name: '张三',
              status: '2',
              amount: 3000,
              address: '广东省广州市天河区'
            },
            {
              id: '2',
              date: '2019-09-26',
              name: '张三1',
              status: '2',
              amount: 2000,
              address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
            },
            {
              id: '3',
              date: '2019-09-27',
              name: '张三2',
              status: '3',
              amount: 4000,
              address: '广东省广州市天河区3'
            }
          ]
        },
        columns: [
          { prop: 'name', label: '姓名', minWidth: '100' },
          { prop: 'date', label: '日期', minWidth: '160' },
          { prop: 'address', label: '地址', minWidth: '220' },
          { prop: 'status', label: '状态', minWidth: '100', filters: { param: 'PROTOCOL_BUSS_TYPE' } },
          { prop: 'amount', label: '金额', minWidth: '160', slotName: 'amount' },
          { prop: 'address', label: '地址', minWidth: '220' },
          { prop: 'name', label: '姓名', minWidth: '100' },
          { prop: 'date', label: '日期', minWidth: '180' },
          { prop: 'address', label: '地址', minWidth: '220' },
          { prop: 'name', label: '姓名', minWidth: '100' },
          { prop: 'date', label: '日期', minWidth: '180' },
          { prop: 'address', label: '地址', minWidth: '220' }
        ]
      },
      // 表格内操作
      operatorData: {
        table: {
          data: [
            {
              id: '1',
              date: '2019-09-25',
              name: '张三',
              status: '2',
              address: '广东省广州市天河区'
            },
            {
              id: '2',
              date: '2019-09-26',
              name: '张三1',
              status: '1',
              address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
            },
            {
              id: '3',
              date: '2019-09-27',
              name: '张三2',
              status: '3',
              address: '广东省广州市天河区3'
            }
          ],
          // 表格内操作列
          operator: [
            {
              text: '新增',
              type: 'text',
              fun: this.add,
              // status为1时，不显示此按钮
              noshow: [{ key: 'status', val: ['1'] }]
            },
            {
              text: '编辑',
              type: 'danger',
              // status值为2时，展示此按钮
              show: { key: 'status', val: ['2'] },
              fun: this.edit
            },
            {
              text: '删除',
              fun: this.del
            }
          ],
          // 操作列样式
          operatorConfig: {
            fixed: 'right', // 固定列表右边（left则固定在左边）
            width: 280,
            label: '操作'
          }
        },
        columns: [
          { prop: 'name', label: '姓名', minWidth: '100', noShowColumn: true },
          { prop: 'date', label: '日期', minWidth: '180', noShowColumn: true },
          { prop: 'address', label: '地址', minWidth: '220', noShowColumn: true },
          { prop: 'date', label: '日期', minWidth: '180', noShowColumn: true },
          { prop: 'address', label: '地址', minWidth: '220', noShowColumn: true }
        ],
        table1: {
          data: [
            {
              id: '1',
              date: '2019-09-25',
              name: '张三',
              status: '2',
              address: '广东省广州市天河区'
            },
            {
              id: '2',
              date: '2019-09-26',
              name: '张三1',
              status: '1',
              address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
            },
            {
              id: '3',
              date: '2019-09-27',
              name: '张三2',
              status: '3',
              address: '广东省广州市天河区3'
            }
          ],
          // 表格外操作，选中表格某行，可以将其数据传出
          toolbar: [
            {
              text: '返回上一个页面1',
              icon: 'el-icon-circle-plus-outline',
              type: 'danger',
              fun: this.getBack
            },
            {
              text: '返回上一个页面2',
              icon: 'el-icon-circle-plus-outline',
              type: 'danger',
              fun: this.getBack
            },
            {
              text: '返回上一个页面3',
              icon: 'el-icon-circle-plus-outline',
              type: 'danger',
              fun: this.getBack
            },
            {
              text: '返回上一个页面4',
              icon: 'el-icon-circle-plus-outline',
              type: 'danger',
              fun: this.getBack
            }
          ]
        }
      },
      // 编辑表格
      editConfig: {
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
    /**
    * 自动完成组件
    */
    querySearch (queryString, cb) {
      var restaurants = this.singleEditConfig.autoOption
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // clearable清除事件事件
    clearSelect () {
      // 主要代码
      // this.$refs.parentCom.activated = true
      // document.activeElement获得了DOM中被聚焦的元素；.blur()取消聚焦
      document.activeElement.blur()
      this.$forceUpdate()
    },
    singleSave (data) {
      console.log('单个单元格编辑保存', data)
    },
    radioChange (row) {
      console.log('单选传出数据', row)
    },
    /****
     * 编辑表格
     */
    editAdd () {
      console.log('新增')
      const objAdd = {
        name: '',
        hobby: '',
        checkbox: [],
        number: 0
      }
      this.editConfig.table.data.push(objAdd)
    },
    editDel (item, index, row) {
      row.splice(index, 1)
      console.log('删除', item, row, index)
    },
    // 编辑每一项的change事件
    handleEvent (type, val) {
      console.log('handleEvent', type, val)
      switch (type) {
        case 'hobbyList':
          console.log('hobbyList', val)
          break
      }
    },
    save (data) {
      const flag = data.some(item => item.hobby === '')
      if (flag) {
        this.$message.error('爱好不能为空')
        return
      }
      console.log('保存', data)
    },
    // 复选框选中
    selectionChange (val) {
      console.log('复选框选中值', val)
    },
    // 操作外按钮
    getBack (row) {
      console.log('选中行返回的数据', row)
    },
    // 新增
    add (val) {
      console.log('新增', val)
    },
    // 编辑
    edit (val) {
      console.log('编辑', val)
    },
    // 删除
    del (val) {
      this.$confirm('是否永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除', val)
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>
<style lang="scss">
.t_table_demo {
  display: flex;
  flex-direction: column;
  background-color: #eee;
  h1 {
    margin-left: 20px;
    color: #355db4;
    font-size: 20px;
  }
  .base,
  .filters,
  .operator {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .t-table {
      background-color: #eee;
      flex: 33.33%;
      overflow-x: auto;
      .el-pagination {
        margin-right: 0;
      }
    }
  }
}
</style>
