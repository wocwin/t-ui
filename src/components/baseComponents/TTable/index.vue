<template>
  <div class="t-table">
    <div class="toolbar_top" v-if="isShow('toolbar')">
      <slot name="toolbar"></slot>
      <div class="toolbar">
        <el-button
          v-for="(item, index) in getToolbarBtn"
          :key="index"
          @click="toolbarFun(item)"
          :icon="item.icon?item.icon:'el-icon-search'"
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
    <el-table
      ref="el-table"
      :data="table.data"
      :height="height? fixHeight? fixHeight: undefined: $store.getters.tableHeight - otherHeight"
      v-bind="$attrs"
      v-on="$listeners"
      border
      @row-click="rowClick"
      @cell-dblclick="cellDblclick"
    >
      <!-- 序列号/复选框 -->
      <div v-if="table.firstColumn">
        <el-table-column
          :type="table.firstColumn.type"
          width="50"
          :label="table.firstColumn.label"
          align="center"
          v-if="table.firstColumn.type!=='index'"
        ></el-table-column>
        <el-table-column
          :type="table.firstColumn.type"
          width="50"
          :reserve-selection="table.firstColumn.isPaging||false"
          :label="table.firstColumn.label"
          align="center"
          v-if="table.firstColumn.type==='index'"
        >
          <template slot-scope="scope">
            <span>{{isShowPagination?((table.currentPage - 1) * table.pageSize + scope.$index + 1):scope.$index + 1}}</span>
          </template>
        </el-table-column>
      </div>
      <slot name="begin"></slot>

      <el-table-column
        v-for="(item, index) in columnList"
        :key="index"
        :type="item.type"
        :label="item.label"
        :prop="item.prop"
        :min-width="item['min-width'] || item.minWidth || item.width"
        :sortable="item.sort"
        :align="item.align || 'center'"
        :show-overflow-tooltip="!item.noShowTip"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template slot-scope="scope">
          <template v-if="item.slotName">
            <slot :name="item.slotName" :param="scope"></slot>
          </template>
          <div
            v-if="!item.filters&&!item.slotName"
            :style="{color:txtChangeColor(scope)}"
          >{{scope.row[item.prop]}}</div>
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
        </template>
      </el-table-column>
      <slot></slot>

      <el-table-column
        v-if="table.operator"
        :fixed="table.operatorConfig && table.operatorConfig.fixed"
        :label="(table.operatorConfig && table.operatorConfig.label) || '操作'"
        :min-width="(table.operatorConfig && table.operatorConfig.width || table.operatorConfig.minWidth) || 100"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item, index) in table.operator"
            :key="index"
            @click="item.fun(scope.row)"
            :type="item.type"
            size="small"
            v-show="checkIsShow(scope,item)"
          >{{item.text}}</el-button>
        </template>
      </el-table-column>
      <slot name="end"></slot>
    </el-table>
    <el-pagination
      v-show="table.data && table.data.length && isShowPagination"
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
  </div>
</template>

<script>
export default {
  name: 'TTable',
  props: {
    // table所需数据
    table: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    },
    // 是否复制单元格
    isCopy: {
      type: Boolean,
      default: false
    },
    // 是否固定高度
    height: {
      type: Boolean,
      default: true
    },
    // 是否需要固定表头
    fixHeight: {
      type: String || Number,
      default: ''
    },
    // 是否需要显示切换页条数
    size: {
      type: Boolean,
      default: false
    },
    // 是否显示分页
    isShowPagination: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      otherHeight: 0,
      rowData: ''
    }
  },
  computed: {
    columnList () {
      return this.table.column.filter(item => {
        return !item.noShowColumn
      })
    },
    getToolbarBtn () {
      return this.table.toolbar ? this.table.toolbar.slice(0, 3) : []
    },
    getToolbarDown () {
      return this.getToolbarBtn.length === 3 ? this.table.toolbar.slice(3, this.table.toolbar.length) : []
    }
  },
  mounted () {
    const toolBarHeight = this.isShow('toolbar') ? 60 : 0
    const pageHeight = 60
    this.$nextTick(() => {
      this.otherHeight = toolBarHeight + pageHeight
    })
  },
  methods: {
    // 双击复制单元格内容
    cellDblclick (row, column) {
      if (!this.isCopy) {
        return false
      }
      this.$copyText(row[column.property]).then(() => {
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
    rowClick (row) {
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
        this.$message({
          type: 'warning',
          message: '请选中行'
        })
        return
      }
      if (!this.rowData.selectFlag) {
        this.$message({
          type: 'warning',
          message: '请选中行'
        })
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
<style lang="scss">
.t-table {
  z-index: 0;
  background-color: #fff;
  padding: 10px;
  // border-radius: 4px;
  .el-pagination {
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
  .el-table::before {
    // height: 0;
  }
  .el-table--group::after,
  .el-table--border::after {
    // width: 0;
  }
  .el-table--scrollable-y .el-table__fixed-right {
    right: 8px !important;
  }
  .toolbar_top {
    display: flex;
    padding: 10px 0;
    align-items: center;
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
  .el-table--scrollable-y .el-table__body-wrapper {
    overflow-x: auto;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      margin-top: 110px;
      width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
      // height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #b3b3b3;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #ededed;
    }
  }
}
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
</style>
