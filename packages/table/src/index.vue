<template>
  <div class="t-table" id="t_table">
    <div class="header_wrap">
      <div class="header_title">
        {{ title }}
        <slot name="title" />
      </div>
      <div class="toolbar_top">
        <!-- 表格外操作 -->
        <div class="toolbar">
          <el-button
            v-for="(item, index) in getToolbarBtn"
            :key="index"
            @click="toolbarFun(item)"
            :icon="item.icon ? item.icon : ''"
            :type="item.type || 'primary'"
            size="small"
          >{{ item.text }}</el-button>
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
              >{{ item.text }}</li>
            </ul>
            <el-button size="small" type="primary" icon="el-icon-setting" slot="reference">
              操作
              <i class="el-icon-arrow-down"></i>
            </el-button>
          </el-popover>
        </div>
        <slot name="toolbar"></slot>
        <!--列设置按钮-->
        <div class="header_right_wrap" :style="{ marginLeft: isShow('toolbar') ? '12px' : 0 }">
          <slot name="btn" />
          <column-set
            v-if="columnSetting"
            v-bind="$attrs"
            :columns="columns"
            @columnSetting="(v) => (columnSet = v)"
          />
        </div>
      </div>
    </div>
    <el-table
      ref="el-table"
      :data="tableData"
      :class="{
        cursor: isCopy,
        row_sort: isRowSort,
        highlightCurrentRow: highlightCurrentRow,
        radioStyle: table.firstColumn && table.firstColumn.type === 'radio',
        treeProps: isShowTreeStyle,
        is_sort_icon:onlyIconSort
      }"
      :max-height="useVirtual?maxHeight||540:maxHeight"
      v-bind="$attrs"
      v-on="$listeners"
      :highlight-current-row="highlightCurrentRow"
      :border="table.border || isTableBorder"
      :span-method="spanMethod || objectSpanMethod"
      :cell-class-name="cellClassNameFuc"
      @sort-change="soltHandle"
      @row-click="rowClick"
      @cell-dblclick="cellDblclick"
    >
      <!-- 首列之 序列号/单选框/复选框 -->
      <div v-if="table.firstColumn">
        <!-- 复选框 -->
        <el-table-column
          :selectable="table.firstColumn.selectable"
          :type="table.firstColumn.type"
          :width="table.firstColumn.width || 50"
          :label="table.firstColumn.label"
          :fixed="table.firstColumn.fixed"
          :reserve-selection="table.firstColumn.isPaging || false"
          :align="table.firstColumn.align || 'center'"
          v-if="table.firstColumn.type === 'selection'"
        ></el-table-column>
        <!-- 单选框 -->
        <el-table-column
          :type="table.firstColumn.type"
          :width="table.firstColumn.width || 50"
          :label="table.firstColumn.label"
          :fixed="table.firstColumn.fixed"
          :align="table.firstColumn.align || 'center'"
          v-if="table.firstColumn.type === 'radio'"
        >
          <template slot-scope="scope">
            <el-radio
              v-model="radioVal"
              :label="scope.$index + 1"
              @click.native.prevent="radioChange(scope.row, scope.$index + 1)"
            ></el-radio>
          </template>
        </el-table-column>
        <!-- 序列号 -->
        <el-table-column
          :type="table.firstColumn.type"
          :width="table.firstColumn.width || 50"
          :label="table.firstColumn.label"
          :fixed="table.firstColumn.fixed"
          :align="table.firstColumn.align || 'center'"
          v-if="table.firstColumn.type === 'index'"
        >
          <template slot-scope="scope">
            <span>
              {{
              isShowPagination
              ? (table.currentPage - 1) * table.pageSize + scope.$index + 1
              : scope.$index + 1
              }}
            </span>
          </template>
        </el-table-column>
      </div>
      <!-- 主体内容 -->
      <template v-for="(item, index) in renderColumns">
        <template v-if="!item.children">
          <!-- 常规表头-->
          <el-table-column
            v-if="item.isShowCol === false ? item.isShowCol : true"
            :key="index + 'i'"
            :type="item.type"
            :label="item.label"
            :prop="item.prop"
            :min-width="item['min-width'] || item.minWidth || item.width"
            :sortable="item.sort || sortable"
            :align="item.align || 'center'"
            :fixed="item.fixed"
            :show-overflow-tooltip="useVirtual?true:item.noShowTip?false:true"
            v-bind="{ ...item.bind, ...$attrs }"
            v-on="$listeners"
          >
            <template #header v-if="item.headerRequired || item.renderHeader">
              <render-header v-if="item.renderHeader" :column="item" :render="item.renderHeader" />
              <div style="display: inline" v-if="item.headerRequired">
                <span style="color: #f56c6c; fontsize: 16px; marginright: 3px">*</span>
                <span>{{ item.label }}</span>
              </div>
            </template>
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
                  <el-form
                    :model="tableData[scope.$index]"
                    :rules="isEditRules ? table.rules : {}"
                    class="t_edit_cell_form"
                    :ref="`formRef-${scope.$index}-${
                      item.prop || scope.column.property
                    }`"
                    @submit.native.prevent
                  >
                    <single-edit-cell
                      :configEdit="item.configEdit"
                      v-model="scope.row[scope.column.property]"
                      :prop="item.prop"
                      :record="scope"
                      @handleEvent="
                        (event, model) =>
                          $emit('handleEvent', event, model, scope.$index)
                      "
                      @Keyup="handleKeyup"
                      v-on="$listeners"
                      v-bind="$attrs"
                      ref="editCell"
                    >
                      <!-- 遍历子组件非作用域插槽，并对父组件暴露 -->
                      <template v-for="(index, name) in $slots" v-slot:[name]>
                        <slot :name="name" />
                      </template>
                      <!-- 遍历子组件作用域插槽，并对父组件暴露 -->
                      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                        <slot :name="name" v-bind="data"></slot>
                      </template>
                    </single-edit-cell>
                  </el-form>
                </template>
                <!-- 字典过滤 -->
                <template v-if="item.filters && item.filters.list">
                  {{
                  scope.row[item.prop]
                  | constantEscape(
                  table.listTypeInfo[item.filters.list],
                  item.filters.key || "dictValue",
                  item.filters.label || "dictLabel"
                  )
                  }}
                </template>
                <div
                  v-if="
                    !item.render &&
                    !item.slotName &&
                    !item.customRender &&
                    !item.canEdit &&
                    !item.filters
                  "
                  :style="{ color: txtChangeColor(scope) }"
                >
                  <span v-if="isObjShowProp">
                    {{
                    item.prop.includes(".")
                    ? scope.row[item.prop.split(".")[0]][
                    item.prop.split(".")[1]
                    ]
                    : scope.row[item.prop]
                    }}
                  </span>
                  <span v-else>{{ scope.row[item.prop] }}</span>
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
        </template>
        <!-- 表头合并单元格 -->
        <t-table-column v-else :key="index + 'i'" :item="item">
          <template v-for="(index, name) in $slots" v-slot:[name]>
            <slot :name="name" />
          </template>
          <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
          </template>
        </t-table-column>
      </template>
      <slot></slot>
      <!-- 操作按钮 -->
      <el-table-column
        v-if="table.operator"
        :fixed="table.operatorConfig && table.operatorConfig.fixed"
        :label="(table.operatorConfig && table.operatorConfig.label) || '操作'"
        :min-width="
          (table.operatorConfig &&
            (table.operatorConfig.width || table.operatorConfig.minWidth)) ||
          100
        "
        :align="
          (table.operatorConfig && table.operatorConfig.align) || 'center'
        "
        class-name="operator"
      >
        <template slot-scope="scope">
          <div class="operator_btn" :style="table.operatorConfig && table.operatorConfig.style">
            <el-button
              v-for="(item, index) in table.operator"
              :key="index"
              @click="item.fun && item.fun(scope.row, scope.$index, tableData)"
              :type="item.type || 'text'"
              :style="item.style"
              :icon="item.icon ? item.icon : ''"
              :disabled="item.disabled"
              :size="item.size||'mini'"
              v-show="checkIsShow(scope, item)"
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
              <span v-if="!item.render && !item.customRender">
                {{
                item.text
                }}
              </span>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="isEdit" class="edit_cell">
      <el-button type="dashed" block size="small" @click="() => $emit('add')">
        {{
        cellEditBtnTxt
        }}
      </el-button>
    </div>
    <!-- 分页器 -->
    <el-pagination
      v-show="tableData && tableData.length && isShowPagination"
      :current-page="table.currentPage"
      @current-change="handlesCurrentChange"
      :page-sizes="pageSizes"
      :page-size="table.pageSize"
      :layout="
        layoutSize
          ? 'total, prev, pager, next'
          : 'total, sizes, prev, pager, next, jumper'
      "
      :total="table.total"
      v-bind="$attrs"
      v-on="$listeners"
      background
    ></el-pagination>
    <!-- 表格底部按钮 -->
    <footer class="handle_wrap" v-if="isShowFooterBtn && tableData && tableData.length > 0">
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
import RenderHeader from './renderHeader.vue'
import OptComponent from './OptComponent.vue'
import { constantEscape } from '../../utils'
import Sortable from 'sortablejs'
export default {
  name: 'TTable',
  components: {
    SingleEditCell,
    EditCell,
    ColumnSet,
    TTableColumn,
    RenderCol,
    RenderHeader,
    OptComponent
  },
  props: {
    // table所需数据
    table: {
      type: Object,
      default: () => {
        return {}
      }
      // required: true
    },
    // 表格数据
    tableList: {
      type: Array,
      default: () => {
        return []
      }
      // required: true
    },
    // 表头数据
    columns: {
      type: Array,
      default: () => {
        return []
      }
      // required: true
    },
    // 是否开启tree树形结构样式
    isShowTreeStyle: {
      type: Boolean,
      default: false
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
    // 是否开启编辑保存按钮(整行编辑)
    isShowFooterBtn: {
      type: Boolean,
      default: false
    },
    // 整行编辑按钮文案
    cellEditBtnTxt: {
      type: String,
      default: '添加'
    },
    // 是否显示添加按钮
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
    layoutSize: {
      type: Boolean,
      default: false
    },
    // 是否显示分页
    isShowPagination: {
      type: Boolean,
      default: false
    },
    // 单元格编辑是否开启键盘事件
    isKeyup: {
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
    // 是否自定义合并单元格
    spanMethod: {
      type: Function
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
    // 是否开启行拖拽
    isRowSort: {
      type: Boolean,
      default: false
    },
    // 是否开启点击整行选中单选框
    rowClickRadio: {
      type: Boolean,
      default: false
    },
    // 是否开启合计行隐藏复选框/单选框/序列
    isTableColumnHidden: {
      type: Boolean,
      default: false
    },
    // 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
    sortable: {
      type: [Boolean, String]
    },
    // 是否开启仅点击排序图标才排序
    onlyIconSort: {
      type: Boolean,
      default: false
    },
    // 是否开启组件sort-change 事件
    isSortable: {
      type: Boolean,
      default: false
    },
    // 不排序条件判断规则
    notSortJudge: {
      type: String
    },
    // 设置默认选中项（单选）defaultRadioCol值必须大于0！
    defaultRadioCol: {
      type: Number
    },
    // 按钮权限store.getters接收字段
    btnPermissions: {
      type: String
    },
    // 每页显示个数选择器的选项设置
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 50, 100]
      }
    },
    // Table最大高度
    maxHeight: {
      type: [String, Number]
    },
    // 是否开启虚拟列表
    useVirtual: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      radioVal: '',
      forbidden: true, // 判断单选选中及取消选中
      tableData: this.table?.data || this.tableList,
      rowData: '',
      copyTableData: [], // 键盘事件
      columnSet: [],
      /**
       * 虚拟列表
       */
      saveDATA: [], // 所有数据
      tableRef: null, // 设置了滚动的那个盒子
      tableWarp: null, // 被设置的transform元素
      fixLeft: null, // 固定左侧--设置的transform元素
      fixRight: null, // 固定右侧--设置的transform元素
      tableFixedLeft: null, // 左侧固定列所在的盒子
      tableFixedRight: null, // 右侧固定列所在的盒子
      scrollTop: 0,
      scrollNum: 0, // scrollTop / (itemHeight * pageList)
      start: 0,
      end: 30, // 3倍的pageList
      starts: 0, // 备份
      ends: 30, // 备份
      pageList: 10, // 一屏显示
      itemHeight: 48 // 每一行高度
    }
  },
  watch: {
    'table.data': {
      handler(val) {
        if (this.useVirtual) {
          this.saveDATA = val
          this.tableData = this.saveDATA.slice(this.start, this.end)
        } else {
          this.tableData = val
        }
      },
      deep: true // 深度监听
    },
    tableList: {
      handler(val) {
        this.tableData = val
      },
      deep: true // 深度监听
    },
    scrollNum(newV) {
      // 因为初始化时已经添加了3屏的数据，所以只有当滚动到第3屏时才计算位移量
      if (newV > 1) {
        this.start = (newV - 1) * this.pageList
        this.end = (newV + 2) * this.pageList
        requestAnimationFrame(() => {
          // 计算偏移量
          this.tableWarp.style.transform = `translateY(${this.start *
            this.itemHeight}px)`
          if (this.fixLeft) {
            this.fixLeft.style.transform = `translateY(${this.start *
              this.itemHeight}px)`
          }
          if (this.fixRight) {
            this.fixRight.style.transform = `translateY(${this.start *
              this.itemHeight}px)`
          }
          this.tableData = this.saveDATA.slice(this.start, this.end)
        })
      } else {
        requestAnimationFrame(() => {
          this.tableData = this.saveDATA.slice(this.starts, this.ends)
          this.tableWarp.style.transform = `translateY(0px)`
          if (this.fixLeft) {
            this.fixLeft.style.transform = `translateY(0px)`
          }
          if (this.fixRight) {
            this.fixRight.style.transform = `translateY(0px)`
          }
        })
      }
    }
  },
  activated() {
    // 缓存激活时可能出现冻结列行高不一致问题，强制刷新
    this.$refs['el-table'] && this.$refs['el-table'].$forceUpdate()
    this.extendMethod()
  },
  computed: {
    columnByProp() {
      return this.columns.reduce((acc, cur) => {
        acc[cur.prop] = cur
        return acc
      }, {})
    },
    renderColumns() {
      return this.columnSet.length > 0
        ? this.columnSet.reduce((acc, cur) => {
          if (!cur.hidden) {
            acc.push(this.columnByProp[cur.prop])
          }
          return acc
        }, [])
        : this.columns
    },
    // 按钮权限数组
    btnPremList() {
      return this.$store.getters[this.btnPermissions]
    },
    // 判断如果有表头合并就自动开启单元格缩放
    isTableBorder() {
      // console.log(789, this.renderColumns.some(item => item.children))
      return this.renderColumns.some((item) => item.children)
    },
    getToolbarBtn() {
      return this.table.toolbar ? this.table.toolbar.slice(0, 3) : []
    },
    getToolbarDown() {
      return this.getToolbarBtn.length === 3
        ? this.table.toolbar.slice(3, this.table.toolbar.length)
        : []
    },
    // 单元格编辑是否存在校验
    isEditRules() {
      return (
        (this.table.rules && Object.keys(this.table.rules).length > 0) ||
        this.columns.some((item) => item?.configEdit?.rules)
      )
    }
  },
  // 过滤器
  filters: {
    constantEscape
  },
  created() {
    // 是否开启虚拟列表
    if (this.useVirtual) {
      this.init()
    }
  },
  mounted() {
    // 设置默认选中项（单选）
    if (this.defaultRadioCol) {
      this.defaultRadioSelect(this.defaultRadioCol)
    }
    this.extendMethod()
    this.initSort()
    // 是否开启虚拟列表
    if (this.useVirtual) {
      this.initMounted()
    }
  },
  methods: {
    initMounted() {
      this.$nextTick(() => {
        // 设置了滚动的盒子
        this.tableRef = this.$refs['el-table'].bodyWrapper
        // 左侧固定列所在的盒子
        this.tableFixedLeft = document.querySelector(
          '.el-table .el-table__fixed .el-table__fixed-body-wrapper'
        )
        // 右侧固定列所在的盒子
        this.tableFixedRight = document.querySelector(
          '.el-table .el-table__fixed-right .el-table__fixed-body-wrapper'
        )
        /**
         * fixed-left | 主体 | fixed-right
         */
        // 主体改造
        // 创建内容盒子divWarpPar并且高度设置为所有数据所需要的总高度
        let divWarpPar = document.createElement('div')
        // 如果这里还没获取到saveDATA数据就渲染会导致内容盒子高度为0，可以通过监听saveDATA的长度后再设置一次高度
        divWarpPar.style.height = this.saveDATA.length * this.itemHeight + 'px'
        // 新创建的盒子divWarpChild
        let divWarpChild = document.createElement('div')
        divWarpChild.className = 'fix-warp'
        // 把tableRef的第一个子元素移动到新创建的盒子divWarpChild中
        divWarpChild.append(this.tableRef.children[0])
        // 把divWarpChild添加到divWarpPar中，最把divWarpPar添加到tableRef中
        divWarpPar.append(divWarpChild)
        this.tableRef.append(divWarpPar)
        // left改造
        let divLeftPar = document.createElement('div')
        divLeftPar.style.height = this.saveDATA.length * this.itemHeight + 'px'
        let divLeftChild = document.createElement('div')
        divLeftChild.className = 'fix-left'
        this.tableFixedLeft &&
          divLeftChild.append(this.tableFixedLeft.children[0])
        divLeftPar.append(divLeftChild)
        this.tableFixedLeft && this.tableFixedLeft.append(divLeftPar)
        // right改造
        let divRightPar = document.createElement('div')
        divRightPar.style.height = this.saveDATA.length * this.itemHeight + 'px'
        let divRightChild = document.createElement('div')
        divRightChild.className = 'fix-right'
        this.tableFixedRight &&
          divRightChild.append(this.tableFixedRight.children[0])
        divRightPar.append(divRightChild)
        this.tableFixedRight && this.tableFixedRight.append(divRightPar)
        // 被设置的transform元素
        this.tableWarp = document.querySelector(
          '.el-table .el-table__body-wrapper .fix-warp'
        )
        this.fixLeft = document.querySelector(
          '.el-table .el-table__fixed .el-table__fixed-body-wrapper .fix-left'
        )
        this.fixRight = document.querySelector(
          '.el-table .el-table__fixed-right .el-table__fixed-body-wrapper .fix-right'
        )
        this.tableRef.addEventListener('scroll', this.onScroll)
      })
    },
    init() {
      this.saveDATA = this.table?.data
      this.tableData = this.saveDATA.slice(this.start, this.end)
    },
    onScroll() {
      this.scrollTop = this.tableRef.scrollTop
      this.scrollNum = Math.floor(this.scrollTop / (this.itemHeight * this.pageList))
    },
    // 行拖拽
    initSort() {
      if (!this.isRowSort) return
      const el = this.$refs['el-table'].$el.querySelector(
        '.el-table__body-wrapper > table > tbody'
      )
      // eslint-disable-next-line no-new
      new Sortable(el, {
        animation: 150, // 动画
        onEnd: (evt) => {
          const curRow = this.tableData.splice(evt.oldIndex, 1)[0]
          this.tableData.splice(evt.newIndex, 0, curRow)
          this.$emit('rowSort', this.tableData)
        }
      })
    },
    // 继承el-table的Method
    extendMethod() {
      const refMethod = Object.entries(this.$refs['el-table'])
      for (const [key, value] of refMethod) {
        if (!(key.includes('$') || key.includes('_'))) {
          this[key] = value
        }
      }
    },
    // 单元格编辑键盘事件
    handleKeyup(event, index, key) {
      if (!this.isKeyup) return
      this.copyTableData = JSON.parse(JSON.stringify(this.tableData))
      // 向上键
      if (event.keyCode === 38) {
        let doms = document.getElementsByClassName(key)
        if (!index) {
          index = this.copyTableData.length
        }
        if (doms.length) {
          let dom
          if (doms[index - 1].getElementsByTagName('input')[0]) {
            dom = doms[index - 1].getElementsByTagName('input')[0]
          } else {
            dom = doms[index - 1].getElementsByTagName('textarea')[0]
          }
          dom.focus()
          // dom.select()
        }
      }
      // 向下键
      if (event.keyCode === 40) {
        let doms = document.getElementsByClassName(key)
        if (+index === this.copyTableData.length - 1) {
          index = -1
        }
        if (doms.length) {
          let dom
          if (doms[index + 1].getElementsByTagName('input')[0]) {
            dom = doms[index + 1].getElementsByTagName('input')[0]
          } else {
            dom = doms[index + 1].getElementsByTagName('textarea')[0]
          }
          dom.focus()
          // dom.select()
        }
      }
      // 回车横向 向右移动
      if (event.keyCode === 13) {
        let keyName = this.columns.map((val) => val.prop)
        let num = 0
        if (key === keyName[keyName.length - 1]) {
          if (index === this.copyTableData.length - 1) {
            index = 0
          } else {
            ++index
          }
        } else {
          keyName.map((v, i) => {
            if (v === key) {
              num = i + 1
            }
          })
        }
        let doms = document.getElementsByClassName(keyName[num])
        if (doms.length) {
          let dom
          if (doms[index].getElementsByTagName('input')[0]) {
            dom = doms[index].getElementsByTagName('input')[0]
          } else {
            dom = doms[index].getElementsByTagName('textarea')[0]
          }
          dom.focus()
          // dom.select()
        }
      }
    },
    // 合并行隐藏复选框/单选框
    cellClassNameFuc({ row, column, rowIndex, columnIndex }) {
      // row.index = rowIndex
      // column.index = columnIndex
      if (!this.isTableColumnHidden) {
        return false
      }
      if (
        this.tableData.length -
        (this.tableData.length - this.table.pageSize < 0
          ? 1
          : this.tableData.length - this.table.pageSize) <=
        rowIndex
      ) {
        return 'table_column_hidden'
      }
    },
    // 合并单元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
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
    getSpanArr(data, spanKey) {
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
    // 排序事件
    soltHandle(column) {
      this.$emit('sort-change', column)
      if (!this.isSortable) {
        return
      }
      // 不参与排序的数组
      let freeGood = []
      // 参与排序的数组
      let elseFree = []
      // fieldName 为对应列的prop
      let fieldName = column.prop
      let sortingType = column.order
      // 降序
      if (sortingType === 'descending') {
        this.tableData.forEach((item) => {
          // 在整个tableData中找到不参与排序的所有数据
          // eslint-disable-next-line no-eval
          if (eval(this.notSortJudge)) {
            // 不参与排序的所有数据加到数组中
            freeGood.push(item)
          } else {
            // 参与排序的数据
            elseFree.push(item)
          }
        })
        this.tableData = elseFree.sort((a, b) => {
          // console.log(555, typeof a[fieldName])
          if (typeof a[fieldName] === 'string') {
            return b[fieldName].localeCompare(a[fieldName])
          } else if (typeof a[fieldName] === 'number') {
            return b[fieldName] - a[fieldName]
          }
        })
        this.tableData = [...this.tableData, ...freeGood]
      } else {
        this.tableData.forEach((item) => {
          // eslint-disable-next-line no-eval
          if (eval(this.notSortJudge)) {
            freeGood.push(item)
          } else {
            elseFree.push(item)
          }
        })
        this.tableData = elseFree.sort((a, b) => {
          if (typeof a[fieldName] === 'string') {
            return a[fieldName].localeCompare(b[fieldName])
          } else if (typeof a[fieldName] === 'number') {
            return a[fieldName] - b[fieldName]
          }
        })
        this.tableData = [...this.tableData, ...freeGood]
      }
    },
    // 单行编辑&整行编辑返回数据
    save() {
      if (!this.isEditRules) {
        this.$emit('save', this.tableData)
        return this.tableData
      }
      // 表单规则校验
      let successLength = 0
      let rulesList = []
      let rulesError = []
      let propError = []
      let propLabelError = []
      // 获取所有的form ref
      const refList = Object.keys(this.$refs).filter((item) =>
        item.includes('formRef')
      )
      // 获取单独设置规则项
      const arr = this.renderColumns
        .filter((val) => {
          if (val.configEdit?.rules) {
            return val
          }
        })
        .map((item) => item.prop)
      // 获取整体设置规则
      const arr1 = this.table.rules && Object.keys(this.table.rules)
      // 获取最终设置了哪些规则（其值是设置的--prop）
      const newArr = [...arr, ...arr1]
      // 最终需要校验的ref
      newArr.map((val) => {
        refList.map((item) => {
          if (item.includes(val)) {
            rulesList.push(item)
          }
        })
      })
      console.log('最终需要校验的数据', rulesList)
      // 表单都校验
      rulesList.map((val) => {
        this.$refs[val].map((item) => {
          item.validate((valid) => {
            if (valid) {
              // 解决 <el-table-column> 加上fixed 属性后<el-table-body>重复渲染问题
              // 两个判断是为了兼容 elementui@2.15.7前后 el-table 不同的实现
              const isFixedParent = item.$parent.$el.offsetParent.className === 'el-table__fixed-body-wrapper' || item.$parent.$parent.$el.offsetParent.className === 'el-table__fixed-body-wrapper'
              if (!isFixedParent) {
                successLength = successLength + 1
              }
            } else {
              rulesError.push(val)
            }
          })
        })
      })
      // 所有表单都校验成功
      if (successLength === rulesList.length) {
        if (this.isEditRules) {
          this.$emit('save', this.tableData)
          return this.tableData
        }
      } else {
        // 校验未通过的prop
        rulesError.map((item) => {
          newArr.map((val) => {
            if (item.includes(val)) {
              propError.push(val)
            }
          })
        })
        // 去重获取校验未通过的prop--label
        Array.from(new Set(propError)).map((item) => {
          this.renderColumns.map((val) => {
            if (item === val.prop) {
              propLabelError.push(val.label)
            }
          })
        })
        console.log('校验未通过的prop--label', propLabelError)
        this.$emit('validateError', propLabelError)
      }
    },
    // 清空校验规则
    clearValidate() {
      const refList = Object.keys(this.$refs).filter((item) =>
        item.includes('formRef')
      )
      refList.map((val) => {
        this.$refs[val].map((item) => {
          item.clearValidate()
        })
      })
    },
    // 表单进行重置并移除校验结果
    resetFields() {
      const refList = Object.keys(this.$refs).filter((item) =>
        item.includes('formRef')
      )
      refList.map((val) => {
        this.$refs[val].map((item) => {
          item.resetFields()
        })
      })
    },
    // 头部标题是否需要加头部必填*符号
    renderHeader(h, { column }) {
      const style = {
        color: '#F56C6C',
        fontSize: '16px',
        marginRight: '3px'
      }
      // 头部标题是否需要加头部必填*符号
      return (
        <div style="display: inline">
          <span style="color: '#F56C6C',fontSize: '16px',marginRight: '3px'">
            *
          </span>
          <span>{column.label}</span>
        </div>
      )
    },
    // 双击复制单元格内容
    cellDblclick(row, column) {
      if (!this.isCopy) {
        return false
      }
      let label
      if (this.isObjShowProp) {
        label = column.property.includes('.')
          ? row[column.property.split('.')[0]][column.property.split('.')[1]]
          : row[column.property]
      } else {
        label = row[column.property]
      }
      this.$copyText(label).then(
        () => {
          this.$message.success('已复制')
        },
        () => {
          this.$message.error('复制失败')
        }
      )
    },
    // 是否显示表格操作按钮
    checkIsShow(scope, item) {
      let isNoShow = false
      if (item.noshow) {
        item.noshow.map((rs) => {
          rs.isShow =
            typeof rs.val === 'string'
              ? rs.val === 'isHadVal'
                ? scope.row[rs.key]
                  ? 'true'
                  : 'false'
                : 'true'
              : rs?.val?.includes(scope.row[rs.key])
                ? 'false'
                : 'true'
        })
        isNoShow = item.noshow.every((key) => {
          return key.isShow === 'true'
        })
      } else {
        isNoShow = true
      }
      // 单独判断
      let isShow =
        !item.show || item?.show?.val?.includes(scope.row[item.show.key])
      // 按钮权限
      let isPermission = (item.hasPermi && this.btnPermissions)
        ? this.btnPremList?.includes(item.hasPermi)
        : true
      // table页面合计
      let totalTxt = Object.values(scope.row).every((key) => {
        return key !== '当页合计'
      })
      // table全部合计
      let totalTxt1 = Object.values(scope.row).every((key) => {
        return key !== '全部合计'
      })
      return isShow && isNoShow && isPermission && totalTxt && totalTxt1
    },
    // 控制表格字体颜色
    txtChangeColor(scope) {
      if (
        this.table.changeColor &&
        scope.row[this.table.changeColor.key] === this.table.changeColor.val
      ) {
        return this.table.changeColor.txtStyle
      } else {
        return ''
      }
    },
    // 当前页码
    handlesCurrentChange(val) {
      this.$emit('page-change', val)
    },
    // 默认选中（单选项）---index必须是大于等于1（且只能默认选中第一页的数据）
    defaultRadioSelect(index) {
      this.radioVal = index
      this.$emit('radioChange', this.tableData[index - 1], this.radioVal)
    },
    // 点击单选框单元格触发事件
    radioChange(row, index) {
      // console.log('radioChange', row)
      // this.radioVal = this.table.data.indexOf(row)
      // this.$emit('radioChange', row, this.radioVal)
      this.radioClick(row, index)
    },
    // forbidden取值
    isForbidden() {
      this.forbidden = false
      setTimeout(() => {
        this.forbidden = true
      }, 0)
    },
    // 单选抛出事件radioChange
    radioClick(row, index) {
      this.forbidden = !!this.forbidden
      if (this.radioVal) {
        if (this.radioVal === index) {
          this.radioVal = ''
          this.isForbidden()
          this.$emit('radioChange', {}, this.radioVal) // 取消勾选就把回传数据清除
        } else {
          this.isForbidden()
          this.radioVal = index
          this.$emit('radioChange', row, this.radioVal)
        }
      } else {
        this.isForbidden()
        this.radioVal = index
        this.$emit('radioChange', row, this.radioVal)
      }
    },
    // 点击某行
    rowClick(row, column) {
      if (this.rowClickRadio) {
        this.radioClick(row, this.table.data.indexOf(row) + 1)
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
    toolbarFun(item) {
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
    isShow(name) {
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
  // style：ttable单元格内容过长省略号
  .el-table {
    .el-tooltip {
      div {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        line-height: 23px;
        padding-left: 10px;
        padding-right: 10px;
      }
      .el-form-item {
        overflow: visible;
      }
    }
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

  // 表头背景颜色
  ::v-deep .el-table {
    .el-table__header-wrapper {
      th {
        word-break: break-word;
        background-color: #f8f8f9;
        color: #515a6e;
        height: 40px;
        font-size: 13px;
      }
    }
  }
  // 树形结构样式
  ::v-deep .treeProps {
    .el-table__body-wrapper {
      .el-table__body {
        .cell {
          display: flex;
        }
      }
    }
    .el-table__cell > .cell {
      padding-left: 14px;
      padding-right: 20px;
    }
  }
  // 开启点击图标排序
  .is_sort_icon {
    ::v-deep .el-table__header-wrapper {
      th {
        pointer-events: none;

        i {
          pointer-events: auto;
        }
      }
    }
  }
  // 合并行隐藏复选框/单选框
  ::v-deep .el-table {
    .el-table__row {
      .table_column_hidden {
        .cell {
          .el-radio__input,
          .el-checkbox__input {
            display: none;
          }

          & > span {
            display: none;
          }
        }
      }
    }
  }

  // 操作样式
  ::v-deep .el-table {
    .operator {
      .operator_btn {
        .el-button {
          margin: 0;
          margin-right: 10px;
        }
      }
      div.cell {
        visibility: visible;
      }
    }
  }
  // 固定列--表头样式修改
  ::v-deep .el-table {
    .el-table__fixed,
    .el-table__fixed-right {
      .el-table__fixed-header-wrapper {
        height: 46px;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-table__header {
          th.el-table__cell {
            padding: 0;
          }
          th.el-table__cell {
            border-bottom: none;
            background-color: #f8f8f9;
          }
        }
      }
    }
  }
  // 页面缓存时，表格内操作栏每行高度撑满
  ::v-deep .el-table__fixed-right {
    height: 100% !important;
  }
  // 行拖动
  .row_sort {
    ::v-deep tbody {
      .el-table__row {
        cursor: move;
      }
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
  // 单元格编辑表单错误提示样式
  .t_edit_cell_form {
    ::v-deep .el-form-item {
      margin-bottom: 0;
      .el-form-item__content {
        line-height: 12px;
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
            content: "" !important;
          }
        }
      }
    }
  }
}
</style>
