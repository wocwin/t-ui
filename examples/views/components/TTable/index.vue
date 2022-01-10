<template>
  <div class="t_table_demo">
    <t-layout sectionTitle="TTable组件运用">
      <div class="content-main">
        <t-layout-page>
          <t-layout-page-item>
            <h1>简单操作</h1>
            <div class="base">
              <t-table title="常规表格" :table="baseData.table" :columns="baseData.columns" />
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
      baseData: {
        table: {
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
      }
    }
  },
  methods: {
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
