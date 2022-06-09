<template>
  <div class="t-table">
    <div class="header_wrap">
      <div class="header_title">
        {{title}}
        <slot name="title" />
      </div>
      <div class="toolbar_top">
        <!-- 表格外操作 -->
        <div v-if="isShow('toolbar')">
          <slot name="toolbar"></slot>
          <div class="toolbar">
            <el-button
              v-for="(item, index) in getToolbarBtn"
              :key="index"
              @click="toolbarFun(item)"
              :icon="item.icon?item.icon:''"
              :type="item.type||'primary'"
              size="small"
            >{{item.text}}</el-button>
            <el-popover
              ref="popoverClose"
              popper-class="operator_popover operator_pop"
              class="operator_popover operator_pop"
              placement="bottom-start"
              trigger="hover"
              v-if="getToolbarDown.length"
            >
              <ul class="ulClose">
                <li
                  v-for="(item, index) in getToolbarDown"
                  :key="index"
                  @click="toolbarFun(item)"
                >{{item.text}}</li>
              </ul>
              <el-button size="small" type="primary" icon="el-icon-setting" slot="reference">
                操作
                <i class="el-icon-arrow-down"></i>
              </el-button>
            </el-popover>
          </div>
        </div>
        <!--列设置按钮-->
        <div class="header_right_wrap">
          <slot name="btn" />
          <column-set
            v-if="columnSetting"
            v-bind="$attrs"
            :columns="columns"
            @columnSetting="v => columnSet = v"
          />
        </div>
      </div>
    </div>
    <el-table
      ref="el-table"
      :data="tableData"
      :class="{'cursor':isCopy,'highlightCurrentRow':highlightCurrentRow,'radioStyle':(table.firstColumn&&table.firstColumn.type==='radio')}"
      v-bind="$attrs"
      v-on="$listeners"
      :highlight-current-row="highlightCurrentRow"
      :border="table.border||isTableBorder"
      :span-method="objectSpanMethod"
      @row-click="rowClick"
      @cell-dblclick="cellDblclick"
    >
      <!-- 首列之 序列号/单选框/复选框 -->
      <div v-if="table.firstColumn">
        <!-- 复选框 -->
        <el-table-column
          :type="table.firstColumn.type"
          :width="table.firstColumn.width||50"
          :label="table.firstColumn.label"
          :fixed="table.firstColumn.fixed"
          :align="table.firstColumn.align||'center'"
          v-if="table.firstColumn.type==='selection'"
        ></el-table-column>
        <!-- 单选框 -->
        <el-table-column
          :type="table.firstColumn.type"
          :width="table.firstColumn.width||50"
          :label="table.firstColumn.label"
          :fixed="table.firstColumn.fixed"
          :align="table.firstColumn.align||'center'"
          v-if="table.firstColumn.type==='radio'"
        >
          <template slot-scope="scope">
            <el-radio
              v-model="radioVal"
              :label="scope.$index"
              @click.native="radioChange(scope.row)"
            ></el-radio>
          </template>
        </el-table-column>
        <!-- 序列号 -->
        <el-table-column
          :type="table.firstColumn.type"
          :width="table.firstColumn.width||50"
          :reserve-selection="table.firstColumn.isPaging||false"
          :label="table.firstColumn.label"
          :fixed="table.firstColumn.fixed"
          :align="table.firstColumn.align||'center'"
          v-if="table.firstColumn.type==='index'"
        >
          <template slot-scope="scope">
            <span>{{isShowPagination?((table.currentPage - 1) * table.pageSize + scope.$index + 1):scope.$index + 1}}</span>
          </template>
        </el-table-column>
      </div>
      <!-- 主体内容 -->
      <template v-for="(item,index) in renderColumns">
        <!-- 常规表头-->
        <el-table-column
          v-if="!item.children"
          :key="index+'i'"
          :type="item.type"
          :label="item.label"
          :prop="item.prop"
          :min-width="item['min-width'] || item.minWidth || item.width"
          :sortable="item.sort"
          :render-header="item.renderHeader||(item.headerRequired&&renderHeader)"
          :align="item.align || 'center'"
          :show-overflow-tooltip="item.noShowTip"
          v-bind="{...item.bind,...$attrs}"
          v-on="$listeners"
        >
          <template slot-scope="scope">
            <template v-if="!isEditCell">
              <!-- render渲染 -->
              <template v-if="item.render">
                <render-col
                  :column="item"
                  :row="scope.row"
                  :render="item.render"
                  :index="scope.$index"
                />
              </template>
              <!-- customRender渲染 -->
              <template v-if="item.customRender">
                <OptComponent
                  v-for="(comp, i) in item.customRender.comps"
                  :key="scope.$index + i.toString()"
                  v-bind="comp"
                  :scope="scope"
                />
              </template>
              <!-- 自定义插槽 -->
              <template v-if="item.slotName">
                <slot :name="item.slotName" :param="scope"></slot>
              </template>
              <!-- 单个单元格编辑 -->
              <template v-if="item.canEdit">
                <single-edit-cell
                  :canEdit="item.canEdit"
                  :configEdit="item.configEdit"
                  v-model="scope.row[scope.column.property]"
                  :prop="item.prop"
                  :record="scope"
                  @handleEvent="(event,model) => $emit('handleEvent',event,model,scope.$index)"
                  v-bind="$attrs"
                  ref="editCell"
                >
                  <slot
                    v-if="item.configEdit&&item.configEdit.editSlotName"
                    :name="item.configEdit.editSlotName"
                    :scope="scope"
                  />
                </single-edit-cell>
              </template>
              <!-- filters渲染 -->
              <div v-if="item.filters" :style="{color:txtChangeColor(scope)}">
                <span
                  v-if="item.filters.param"
                >{{scope.row[item.prop] |constantKey2Value(item.filters.param)}}</span>
                <span
                  v-if="!item.filters.param&&item.filters.method==='￥'"
                >{{scope.row[item.prop] |currencyFilter}}</span>
                <span
                  v-if="!item.filters.param&&item.filters.method==='%'"
                >{{scope.row[item.prop] |percentFilter}}</span>
              </div>
              <div
                v-if="!item.render&&!item.filters&&!item.slotName&&!item.customRender&&!item.canEdit"
                :style="{color:txtChangeColor(scope)}"
              >
                <span
                  v-if="isObjShowProp"
                >{{item.prop.includes('.')?scope.row[item.prop.split('.')[0]][item.prop.split('.')[1]]:scope.row[item.prop]}}</span>
                <span v-else>{{scope.row[item.prop]}}</span>
              </div>
            </template>
            <template v-else>
              <!-- 整行编辑 -->
              <edit-cell
                :configEdit="item.configEdit"
                v-model="scope.row[scope.column.property]"
                v-bind="$attrs"
                v-on="$listeners"
                ref="editCell"
              >
                <template v-for="(index, name) in $slots" :slot="name">
                  <slot :name="name" />
                </template>
              </edit-cell>
            </template>
          </template>
        </el-table-column>
        <!-- 表头合并单元格 -->
        <t-table-column v-else :key="index+'i'" :item="item" />
      </template>
      <slot></slot>
      <!-- 操作按钮 -->
      <el-table-column
        v-if="table.operator"
        :fixed="table.operatorConfig && table.operatorConfig.fixed"
        :label="(table.operatorConfig && table.operatorConfig.label) || '操作'"
        :min-width="(table.operatorConfig && (table.operatorConfig.width || table.operatorConfig.minWidth)) || 100"
        :align="table.operatorConfig && table.operatorConfig.align||'center'"
        class-name="operator"
      >
        <template slot-scope="scope">
          <div class="operator_btn" :style="table.operatorConfig && table.operatorConfig.style">
            <el-button
              v-for="(item, index) in table.operator"
              :key="index"
              @click="item.fun&&item.fun(scope.row,scope.$index,tableData)"
              :type="item.type||'text'"
              :style="item.style"
              :icon="item.icon?item.icon:''"
              :disabled="item.disabled"
              size="small"
              v-show="checkIsShow(scope,item)"
            >
              <!-- customRender渲染 -->
              <template v-if="item.customRender">
                <OptComponent
                  v-for="(comp, i) in item.customRender.comps"
                  :key="scope.$index + i.toString()"
                  v-bind="comp"
                  :scope="scope"
                />
              </template>
              <!-- render渲染 -->
              <template v-if="item.render">
                <render-col
                  :column="item"
                  :row="scope.row"
                  :render="item.render"
                  :index="scope.$index"
                />
              </template>
              <span v-if="!item.render&&!item.customRender">{{item.text}}</span>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="isEdit" class="edit_cell">
      <el-button type="dashed" block size="small" @click="() => $emit('add')">添加</el-button>
    </div>
    <!-- 分页器 -->
    <el-pagination
      v-show="(tableData && tableData.length) && isShowPagination"
      :current-page="table.currentPage"
      @current-change="handlesCurrentChange"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="table.pageSize"
      :layout="size?'total, prev, pager, next':'total, sizes, prev, pager, next, jumper'"
      :total="table.total"
      v-bind="$attrs"
      v-on="$listeners"
      background
    ></el-pagination>
    <!-- 表格底部按钮 -->
    <footer class="handle_wrap" v-if="isShowFooterBtn&&(tableData&&tableData.length>0)">
      <slot name="footer" />
      <div v-if="!$slots.footer">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import EditCell from '../../edit-table/src/EditCell.vue'
import SingleEditCell from './singleEditCell.vue'
import ColumnSet from './ColumnSet.vue'
import TTableColumn from './TTableColumn.vue'
import RenderCol from './renderCol.vue'
import OptComponent from './OptComponent.vue'
export default {
  name: 'TTable',
  components: {
    SingleEditCell,
    EditCell,
    ColumnSet,
    TTableColumn,
    RenderCol,
    OptComponent
  },
  props: {
    // table所需数据
    table: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    },
    // 表头数据
    columns: {
      type: Array,
      default: () => {
        return []
      }
      // required: true
    },
    // 表格标题
    title: {
      type: String,
      default: ''
    },
    // 是否开启编辑模式(整行编辑模式)
    isEditCell: {
      type: Boolean,
      default: false
    },
    // 是否开启编辑保存按钮
    isShowFooterBtn: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    // 是否显示设置（隐藏/显示列）
    columnSetting: {
      type: Boolean,
      default: false
    },
    // 是否复制单元格
    isCopy: {
      type: Boolean,
      default: false
    },
    // 是否高亮选中行
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    // 是否需要显示切换页条数
    size: {
      type: Boolean,
      default: false
    },
    // 是否显示分页
    isShowPagination: {
      type: Boolean,
      default: false
    },
    // 第几列合并
    mergeCol: {
      type: Number,
      default: 0
    },
    // 多列相连行比较运算符
    comparisonOperator: {
      type: String,
      default: '=='
    },
    // 是否开启合并单元格
    isMergedCell: {
      type: Boolean,
      default: false
    },
    // 是否开启对象模式渲染数据
    isObjShowProp: {
      type: Boolean,
      default: false
    },
    // 是否开启点击整行选中单选框
    rowClickRadio: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      radioVal: '',
      tableData: this.table.data,
      rowData: '',
      columnSet: []
    }
  },
  watch: {
    'table.data': {
      handler (val) {
        this.tableData = val
      },
      deep: true // 深度监听
    }
  },
  computed: {
    columnByProp () {
      return this.columns.reduce((acc, cur) => {
        acc[cur.prop] = cur
        return acc
      }, {})
    },
    renderColumns () {
      return this.columnSet.length > 0 ? this.columnSet.reduce((acc, cur) => {
        if (!cur.hidden) {
          acc.push(this.columnByProp[cur.prop])
        }
        return acc
      }, []) : this.columns
    },
    // 判断如果有表头合并就自动开启单元格缩放
    isTableBorder () {
      // console.log(789, this.renderColumns.some(item => item.children))
      return this.renderColumns.some(item => item.children)
    },
    getToolbarBtn () {
      return this.table.toolbar ? this.table.toolbar.slice(0, 3) : []
    },
    getToolbarDown () {
      return this.getToolbarBtn.length === 3 ? this.table.toolbar.slice(3, this.table.toolbar.length) : []
    }
  },
  methods: {
    // 合并单元格
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (!this.isMergedCell) {
        return false
      }
      // eslint-disable-next-line no-eval
      const falg = eval(`columnIndex${this.comparisonOperator}this.mergeCol`)
      // console.log(777, `columnIndex${this.comparisonOperator}this.mergeCol`)
      if (falg) {
        let spanArr = this.getSpanArr(this.tableData, column.property)
        const _row = spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    // 处理合并行的数据
    getSpanArr (data, spanKey) {
      let spanArr = []
      let pos = ''
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          spanArr.push(1)
          pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i][spanKey] === data[i - 1][spanKey]) {
            spanArr[pos] += 1
            spanArr.push(0)
          } else {
            spanArr.push(1)
            pos = i
          }
        }
      }
      return spanArr
    },
    // 取消某一项选中项
    toggleRowSelection (row) {
      this.$refs['el-table'].toggleRowSelection(row, false)
    },
    // 清空复选框
    clearSelection () {
      this.$refs['el-table'].clearSelection()
    },
    // 整行编辑返回数据
    save () {
      this.$emit('save', this.tableData)
      return this.tableData
    },
    // 头部标题是否需要加头部必填*符号
    renderHeader (h, { column }) {
      const style = {
        color: '#F56C6C',
        fontSize: '16px',
        marginRight: '3px'
      }
      // 头部标题是否需要加头部必填*符号
      return (
        <div style="display: inline">
          <span style={style}>*</span>
          <span>{column.label}</span>
        </div>
      )
    },
    // 双击复制单元格内容
    cellDblclick (row, column) {
      if (!this.isCopy) {
        return false
      }
      let label
      if (this.isObjShowProp) {
        label = column.property.includes('.') ? row[column.property.split('.')[0]][column.property.split('.')[1]] : row[column.property]
      } else {
        label = row[column.property]
      }
      this.$copyText(label).then(() => {
        this.$message.success('已复制')
      }, () => {
        this.$message.error('复制失败')
      })
    },
    // 是否显示表格操作按钮
    checkIsShow (scope, item) {
      let isNoShow = false
      if (item.noshow) {
        item.noshow.map(rs => {
          rs.isShow = typeof rs.val === 'string'
            ? (rs.val === 'isHadVal' ? (scope.row[rs.key] ? 'true' : 'false') : 'true')
            : (rs.val.includes(scope.row[rs.key]) ? 'false' : 'true')
        })
        isNoShow = item.noshow.every(key => {
          return key.isShow === 'true'
        })
      } else {
        isNoShow = true
      }
      return (!item.show || item.show.val.includes(scope.row[item.show.key])) && isNoShow
    },
    // 控制表格字体颜色
    txtChangeColor (scope) {
      if (this.table.changeColor && scope.row[this.table.changeColor.key] === this.table.changeColor.val) {
        return this.table.changeColor.txtStyle
      } else {
        return ''
      }
    },
    // 当前页码
    handlesCurrentChange (val) {
      this.$emit('page-change', val)
    },
    // 点击某个单元格触发事件
    radioChange (row) {
      // console.log('radioChange', row)
      this.radioVal = this.table.data.indexOf(row)
      this.$emit('radioChange', row, this.radioVal)
    },
    // 点击某行
    rowClick (row) {
      if (this.rowClickRadio) {
        this.radioVal = this.table.data.indexOf(row)
        this.$emit('radioChange', row, this.radioVal)
      }
      this.rowData = row
      row.selectFlag = !row.selectFlag
      if (row.selectFlag) {
        this.$refs['el-table'].setCurrentRow(row)
      } else {
        this.$refs['el-table'].setCurrentRow()
      }
    },
    // 表格头部按钮
    toolbarFun (item) {
      if (!this.rowData) {
        this.$message.warning('请选中行')
        return
      }
      if (!this.rowData.selectFlag) {
        this.$message.warning('请选中行')
        return
      }
      item.fun(this.rowData)
    },
    isShow (name) {
      return Object.keys(this.$slots).includes(name)
    }
  }
}
</script>
<style lang="scss" scoped>
.t-table {
  z-index: 0;
  background-color: #fff;
  // padding: 10px;
  // border-radius: 4px;
  ::v-deep .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    // margin-right: 60px;
    margin-right: calc(2% - 20px);
    background-color: #fff;
  }
  .el-table th,
  .el-table td {
    padding: 8px 0;
  }
  .el-table--border th:first-child .cell,
  .el-table--border td:first-child .cell {
    padding-left: 5px;
  }
  .el-table .cell {
    padding: 0 5px;
  }
  .el-table--scrollable-y .el-table__fixed-right {
    right: 8px !important;
  }
  .header_wrap {
    display: flex;
    align-items: center;
    .toolbar_top {
      flex: 0 70%;
      display: flex;
      padding: 10px 0;
      align-items: center;
      justify-content: flex-end;
      .toolbar {
        display: flex;
        justify-content: flex-end;
        width: 100%;
      }
      .el-button--small {
        height: 32px;
      }
      .el-button--success {
        background-color: #53a8ff;
        border: 1px solid #53a8ff;
      }
    }
    .header_title {
      display: flex;
      align-items: center;
      flex: 0 30%;
      padding: 10px 0;
      font-size: 16px;
      font-weight: bold;
      line-height: 35px;
      margin-left: 10px;
    }
  }
  .marginBttom {
    margin-bottom: -8px;
  }
  // 操作样式
  .operator_btn {
    // text-align: left;
    .el-button {
      margin: 0;
      margin-right: 10px;
      // &:last-child {
      //   margin-right: 0;
      // }
    }
  }
  // 复制功能样式
  .cursor {
    ::v-deep tbody {
      .el-table__row {
        cursor: pointer;
      }
    }
  }
  // 单选样式
  .radioStyle {
    ::v-deep .el-radio {
      .el-radio__label {
        display: none;
      }
      &:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner {
        box-shadow: none;
      }
    }
    ::v-deep tbody {
      .el-table__row {
        cursor: pointer;
      }
    }
  }
  // 选中行样式
  .highlightCurrentRow {
    ::v-deep tbody {
      .el-table__row {
        cursor: pointer;
      }
      .current-row td {
        cursor: pointer;
        color: #fff;
        background-color: #409eff !important;
      }
    }
  }
  .el-table--scrollable-y .el-table__body-wrapper {
    overflow-x: auto;
  }
  .handle_wrap {
    position: sticky;
    z-index: 10;
    right: 0;
    bottom: -8px;
    margin: 0 -8px -8px;
    padding: 12px 16px;
    background-color: #fff;
    border-top: 1px solid #ebeef5;
    text-align: right;
    .el-btn {
      margin-left: 8px;
    }
  }
  // 整行编辑按钮样式
  .edit_cell {
    width: 100%;
    text-align: center;
    margin-top: 10px;
    ::v-deep .el-button {
      border-color: #355db4;
      color: #355db4;
    }
  }
}
// 表格外操作样式
.operator_pop {
  margin-left: 10px;
  min-width: 70px;
  padding: 0;
  .ulClose {
    font-size: 14px;
    padding: 0;
    margin: 5px 0;
    li {
      padding: 0 10px;
      text-align: center !important;
      font-size: 12px !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 32px;
      cursor: pointer;
    }
    li:hover {
      color: #66b1ff;
      background: #ecf5ff;
    }
  }
  .el-popoverbtn {
    border: none;
    padding: 0 3px;
    padding-left: 6px;
  }
  .el-popoverbtn:hover {
    color: #66b1ff;
    background: #fff;
  }
}
.el-dropdown-menu {
  padding: 10px 20px 15px;
  font-size: 14px;
  .title {
    font-weight: bold;
  }
  ::v-deep .el-tree {
    .el-tree-node {
      .el-tree-node__content {
        .el-icon-caret-right {
          padding: 0 !important;
          &::before {
            content: '' !important;
          }
        }
      }
    }
  }
}
</style>
