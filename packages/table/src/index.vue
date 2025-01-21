<template>
  <div
    class="t-table"
    id="t_table"
    ref="ttable"
    @scroll="handleScroll"
    v-loading="tableLoading"
    :element-loading-text="loadingTxt"
  >
    <div
      class="header_wrap"
      :style="{padding: (tableTitle||title||$slots.title||isSlotTitle||isShow('toolbar')||isSlotToolbar||columnSetting||getToolbarBtn.length>0) ? '10px 0' : 0 }"
    >
      <div class="header_title" v-if="tableTitle||title||$slots.title||isSlotTitle">
        <template v-if="$slots.title||isSlotTitle">
          <slot name="title" />
        </template>
        <template v-else>
          <span v-if="tableTitle">{{tableTitle}}</span>
          <span v-else>{{ title }}</span>
        </template>
      </div>
      <div class="toolbar_top">
        <!-- 表格外操作 -->
        <div class="toolbar">
          <el-button
            v-for="(item, index) in getToolbarBtn"
            :key="index"
            @click="toolbarFun(item)"
            v-bind="{
              type: 'primary',
              size: 'small',
              ...item.bind,
            }"
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
              {{toolbarTxt}}
              <i class="el-icon-arrow-down"></i>
            </el-button>
          </el-popover>
        </div>
        <slot name="toolbar"></slot>
        <!--列设置按钮-->
        <div
          class="header_right_wrap"
          :style="{ marginLeft: isShow('toolbar')||isSlotToolbar ? '12px' : 0 }"
        >
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
    <div class="title-tip" v-if="$slots.titleTip">
      <slot name="titleTip" />
    </div>
    <div v-if="isShowGoTopButton" class="backToTop" style="bottom: 100px" @click="backToTop">
      <div>
        <i class="el-icon-caret-top" style="color:#5cb6ff;"></i>
      </div>
    </div>
    <el-table
      ref="el-table"
      :data="tableData"
      :class="{
        cursor: isCopy,
        row_sort: isRowSort,
        highlightCurrentRow: highlightCurrentRow,
        radioStyle: radioStyleClass,
        treeProps: isShowTreeStyle,
        is_sort_icon: onlyIconSort,
        t_edit_cell:isEditCell
      }"
      :max-height="useVirtual ? maxHeight || 540 : maxHeight"
      v-bind="$attrs"
      v-on="$listeners"
      :highlight-current-row="highlightCurrentRow"
      :border="table.border || isTableBorder"
      :span-method="spanMethod || objectSpanMethod"
      :cell-class-name="cellClassNameFuc"
      :row-class-name="rowClassName || rowClassNameFuc"
      @sort-change="soltHandle"
      @row-click="rowClick"
      @cell-dblclick="cellDblclick"
    >
      <!-- 首列之 序列号/单选框/复选框 -->

      <div v-if="!Array.isArray(table.firstColumn)&&table.firstColumn">
        <el-table-column
          v-bind="{
            type: 'selection',
            width: table.firstColumn.width || 55,
            label: table.firstColumn.label,
            fixed: table.firstColumn.fixed,
            align: table.firstColumn.align || align,
            'reserve-selection': table.firstColumn.isPaging || false,
            selectable: table.firstColumn.selectable || selectable,
            ...table.firstColumn.bind,
            ...$attrs,
          }"
          v-if="table.firstColumn.type === 'selection'"
        />
        <el-table-column
          v-else
          v-bind="{
            type: table.firstColumn.type,
            width: table.firstColumn.width || 55,
            label:
              table.firstColumn.label ||
              (table.firstColumn.type === 'radio' && '单选') ||
              (table.firstColumn.type === 'index' && '序列') ||
              (table.firstColumn.type === 'expand' && '') ||
              '',
            fixed: table.firstColumn.fixed,
            align: table.firstColumn.align || align,
            ...table.firstColumn.bind,
            ...$attrs,
          }"
        >
          <template slot-scope="scope" v-if="table.firstColumn.type !== 'selection'">
            <el-radio
              v-if="table.firstColumn.type === 'radio'"
              v-model="radioVal"
              :label="scope.$index + 1"
              @click.native.prevent="radioChange(scope.row, scope.$index + 1)"
            ></el-radio>
            <template v-if="table.firstColumn.type === 'index'">
              <span v-if="isPaginationCumulative && isShowPagination">
                {{
                (table.currentPage - 1) * table.pageSize + scope.$index + 1
                }}
              </span>
              <span v-else>{{ scope.$index + 1 }}</span>
            </template>
            <template v-if="table.firstColumn.type === 'expand'">
              <slot name="expand" :scope="scope"></slot>
            </template>
          </template>
        </el-table-column>
      </div>
      <template v-if="Array.isArray(table.firstColumn)">
        <template v-for="(item, index) in table.firstColumn">
          <el-table-column
            :key="index + 1"
            v-bind="{
          type: 'selection',
          width: item.width || 55,
          label: item.label,
          fixed: item.fixed,
          align: item.align || align,
          'reserve-selection': item.isPaging || false,
          selectable: item.selectable || selectable,
          ...item.bind,
          ...$attrs,
          }"
            v-if="item.type === 'selection'"
          />
          <el-table-column
            v-else
            :key="index + 'k'"
            v-bind="{
            type: item.type,
            width: item.width || 55,
            label:
              item.label ||
              (item.type === 'radio' && '单选') ||
              (item.type === 'index' && '序列') ||
              (item.type === 'expand' && '') ||
              '',
            fixed: item.fixed,
            align: item.align || align,
            ...item.bind,
            ...$attrs,
          }"
          >
            <template slot-scope="scope" v-if="item.type !== 'selection'">
              <el-radio
                v-if="item.type === 'radio'"
                v-model="radioVal"
                :label="scope.$index + 1"
                @click.native.prevent="radioChange(scope.row, scope.$index + 1)"
              ></el-radio>
              <template v-if="item.type === 'index'">
                <span v-if="isPaginationCumulative && isShowPagination">
                  {{
                  (table.currentPage - 1) * table.pageSize + scope.$index + 1
                  }}
                </span>
                <span v-else>{{ scope.$index + 1 }}</span>
              </template>
              <template v-if="item.type === 'expand'">
                <slot name="expand" :scope="scope"></slot>
              </template>
            </template>
          </el-table-column>
        </template>
      </template>
      <!-- 主体内容 -->
      <template v-for="(item, index) in renderColumns">
        <template v-if="!item.children">
          <!-- 常规表头-->
          <el-table-column
            v-if="typeof item.isShowCol == 'function' ? item.isShowCol(item) : !item.isShowCol"
            :key="index + 'i'"
            :type="item.type"
            :label="item.label"
            :prop="item.prop"
            :min-width="item['min-width'] || item.minWidth"
            :class-name="item.allShow&&!isEditCell?'flex_column_width':''"
            :width="item.allShow&&!isEditCell ? flexColumnWidth(item.prop,table.data,index,item['min-width'] || item.minWidth || item.width) : item.width"
            :sortable="item.sort || sortable"
            :align="item.align || align"
            :fixed="item.fixed"
            :show-overflow-tooltip="isShowOverflowTooltip(item)"
            v-bind="{ ...item.bind, ...$attrs }"
            v-on="$listeners"
          >
            <template #header v-if="item.headerRequired || item.renderHeader||item.isClickEdit">
              <render-header v-if="item.renderHeader" :column="item" :render="item.renderHeader" />
              <div style="display: inline" v-if="item.headerRequired">
                <span style="color: #f56c6c; fontsize: 16px; marginright: 3px">*</span>
                <span>{{ item.label }}</span>
              </div>
              <div v-if="item.isClickEdit">
                <span>{{ item.label }}</span>
                <i v-if="!item.isShowEditIcon" class="el-icon-edit"></i>
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
                  <slot :name="item.slotName" :param="scope" :scope="scope"></slot>
                </template>
                <!-- 单个单元格编辑 -->
                <template v-if="item.canEdit">
                  <el-form
                    :model="tableData[scope.$index]"
                    :rules="isEditRules ? table.rules : {}"
                    class="t_edit_cell_form"
                    :class="{
                        t_edit_cell_form_rules: isEditRules,
                      }"
                    :ref="`formRef-${scope.$index}-${
                      item.prop || scope.column.property
                    }`"
                    @submit.native.prevent
                  >
                    <single-edit-cell
                      :configEdit="item.configEdit"
                      v-model="scope.row[scope.column.property]"
                      :prop="item.prop"
                      :ref="`singleEditRef-${scope.$index}-${
                      item.prop || scope.column.property
                    }`"
                      :record="scope"
                      @handleEvent="
                        (event, model) =>
                          $emit('handleEvent', event, model, scope.$index)
                      "
                      @Keyup="handleKeyup"
                      v-on="$listeners"
                      v-bind="$attrs"
                    >
                      <template v-for="(index, name) in $slots" v-slot:[name]>
                        <slot :name="name" />
                      </template>
                      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                        <slot :name="name" v-bind="data"></slot>
                      </template>
                    </single-edit-cell>
                  </el-form>
                </template>
                <!-- 单击单元格编辑 -->
                <template v-if="item.isClickEdit">
                  <single-edit
                    :isClickEdit="item.isClickEdit"
                    :configEdit="item.configEdit"
                    v-model="scope.row[scope.column.property]"
                    v-on="$listeners"
                    v-bind="$attrs"
                    ref="editClickCell"
                  >
                    <template v-for="(index, name) in $slots" v-slot:[name]>
                      <slot :name="name" />
                    </template>
                    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                      <slot :name="name" v-bind="data"></slot>
                    </template>
                  </single-edit>
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
                    !item.isClickEdit &&
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
                  :record="scope"
                  :prop="item.prop"
                  v-bind="$attrs"
                  v-on="$listeners"
                  ref="editCell"
                >
                  <template v-for="(index, name) in $slots" :slot="name">
                    <slot :name="name" />
                  </template>
                  <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                    <slot :name="name" v-bind="data"></slot>
                  </template>
                </edit-cell>
              </template>
            </template>
          </el-table-column>
        </template>
        <!-- 表头合并单元格 -->
        <t-table-column
          v-else
          :key="index + 'i'"
          :item="item"
          :table="table"
          :align="align"
          :tableRef="$refs['el-table']"
          v-bind="$attrs"
          v-on="$listeners"
        >
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
        :min-width="table.operatorConfig && table.operatorConfig.minWidth"
        :width="table.operatorConfig && table.operatorConfig.width"
        :align="
          (table.operatorConfig && table.operatorConfig.align) || align
        "
        v-bind="{
          ...(table.operatorConfig && table.operatorConfig.bind),
          ...$attrs,
        }"
        class-name="operator"
      >
        <template slot-scope="scope">
          <div class="operator_btn" :style="table.operatorConfig && table.operatorConfig.style">
            <el-button
              v-for="(item, index) in table.operator"
              :key="index"
              @click="item.fun && item.fun(scope.row, scope.$index, tableData)"
              v-bind="{
                type: 'text',
                size: 'mini',
                ...item.bind,
              }"
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
        <el-button type="primary" @click="save">{{saveTxt}}</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import EditCell from '../../edit-table/src/EditCell.vue'
import SingleEditCell from './singleEditCell.vue'
import SingleEdit from './singleEdit.vue'
import ColumnSet from './ColumnSet.vue'
import TTableColumn from './TTableColumn.vue'
import RenderCol from './renderCol.vue'
import RenderHeader from './renderHeader.vue'
import OptComponent from './OptComponent.vue'
import { constantEscape } from '../../utils'
import UseVirtualMixin from './mixins/useVirtualMixin.js'
import Sortable from 'sortablejs'
export default {
  name: 'TTable',
  components: {
    SingleEdit,
    SingleEditCell,
    EditCell,
    ColumnSet,
    TTableColumn,
    RenderCol,
    RenderHeader,
    OptComponent
  },
  mixins: [UseVirtualMixin],
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
    toolbarTxt: {
      type: String,
      default: '操作'
    },
    saveTxt: {
      type: String,
      default: '保存'
    },
    // table 全局对齐方式，可选项'left' | 'center' | 'right'
    align: {
      type: String,
      default: 'center'
    },
    // 是否开启tree树形结构样式
    isShowTreeStyle: Boolean,
    // 表格标题
    title: String,
    tableTitle: String,
    // 是否开启编辑模式(整行编辑模式)
    isEditCell: Boolean,
    // 是否开启编辑保存按钮(整行编辑)
    isShowFooterBtn: Boolean,
    // 整行编辑按钮文案
    cellEditBtnTxt: {
      type: String,
      default: '添加'
    },
    // 是否显示添加按钮
    isEdit: Boolean,
    // 是否显示设置（隐藏/显示列）
    columnSetting: Boolean,
    // 是否复制单元格
    isCopy: Boolean,
    // 是否高亮选中行
    highlightCurrentRow: Boolean,
    // 是否需要显示切换页条数
    layoutSize: Boolean,
    // 是否显示分页
    isShowPagination: Boolean,
    // 序列号显示是否分页累加
    isPaginationCumulative: Boolean,
    // 单元格编辑是否开启键盘事件
    isKeyup: Boolean,
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
    spanMethod: Function,
    // 是否开启合并单元格
    isMergedCell: Boolean,
    // 是否开启对象模式渲染数据
    isObjShowProp: Boolean,
    // 是否开启行拖拽
    isRowSort: Boolean,
    // 是否开启点击整行选中单选框
    rowClickRadio: Boolean,
    // 是否开启合计行隐藏复选框/单选框/序列
    isTableColumnHidden: Boolean,
    // 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
    sortable: [Boolean, String],
    // 是否开启仅点击排序图标才排序
    onlyIconSort: Boolean,
    // 是否开启组件sort-change 事件
    isSortable: Boolean,
    // 不排序条件判断规则
    notSortJudge: String,
    // 设置默认选中项（单选）defaultRadioCol值必须大于0！
    defaultRadioCol: Number,
    // 按钮权限store.getters接收字段
    btnPermissions: String,
    // 每页显示个数选择器的选项设置
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 50, 100]
      }
    },
    // Table最大高度
    maxHeight: [String, Number],
    // 是否开启虚拟列表
    useVirtual: Boolean,
    // 判断某值在数据中不存在则不显示第一列复选框/单选框/序列号
    isShowFirstColumn: String,
    // 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
    rowClassName: [Function, String],
    // TAdaptivePage组件是否使用了Toolbar插槽
    isSlotToolbar: Boolean,
    // TAdaptivePage组件是否使用了title插槽
    isSlotTitle: Boolean,
    tableLoading: Boolean,
    loadingTxt: {
      type: String,
      default: '加载中...'
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
      isShowFirstColumnIndex: [], // 需要禁用项的index
      isShowGoTopButton: false,
      scrollTop: 0
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
        this.isShowFirstColumnIndex = []
        // 获取需要禁用
        this.tableData.map((item, index) => {
          if (!item[this.isShowFirstColumn]) {
            this.isShowFirstColumnIndex.push(index)
          }
        })
        // console.log('table.data--this.isShowFirstColumn---watch', this.tableData, this.isShowFirstColumnIndex)
      },
      deep: true // 深度监听
    },
    tableList: {
      handler(val) {
        this.tableData = val
      },
      deep: true // 深度监听
    },
    isShowFirstColumn(val) {
      this.tableData.map((item, index) => {
        if (!item[val]) {
          this.isShowFirstColumnIndex.push(index)
        }
      })
      // console.log('isShowFirstColumn---watch', val, this.isShowFirstColumnIndex, [...new Set(this.isShowFirstColumnIndex)])
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
    // 第一列单选显示类
    radioStyleClass() {
      if (Array.isArray(this.table.firstColumn)) {
        return this.table.firstColumn.some((item) => item.type === 'radio')
      } else {
        return this.table.firstColumn && this.table.firstColumn.type === 'radio'
      }
    },
    // 单元格编辑是否存在校验
    isEditRules() {
      return (
        (this.table.rules && Object.keys(this.table.rules).length > 0) ||
        this.columns.some((item) => item?.configEdit?.rules)
      )
    },
    // 文字过长是否显示省略号
    isShowOverflowTooltip() {
      return (item) => {
        return this.useVirtual ? true : item.noShowTip ? false : !this.isShowFirstColumn
      }
    }
  },
  // 过滤器
  filters: {
    constantEscape
  },
  mounted() {
    // 设置默认选中项（单选）
    if (this.defaultRadioCol) {
      this.defaultRadioSelect(this.defaultRadioCol)
    }
    // 假数据时，不显示首列序号/单选/复现框
    this.tableData.map((item, index) => {
      if (!item[this.isShowFirstColumn]) {
        this.isShowFirstColumnIndex.push(index)
      }
    })
    this.extendMethod()
    this.initSort()
    // 修复table抖动
    this.$on('hook:updated', this.doLayout)
  },
  methods: {
    // 行的 className 的回调方法--不显示首列序号/单选/复现框
    rowClassNameFuc({ row, rowIndex }) {
      // console.log('9999', [...new Set(this.isShowFirstColumnIndex)])
      if (this.isShowFirstColumn && [...new Set(this.isShowFirstColumnIndex)].includes(rowIndex)) {
        return 'is_show_first_column'
      } else {
        return ''
      }
    },
    // 禁用无数据的复选框
    selectable(row) {
      if (this.isShowFirstColumn) {
        return row[this.isShowFirstColumn]
      } else {
        return true
      }
    },
    // 点击按钮时调用该函数，将页面滚动到顶部
    backToTop() {
      this.$refs.ttable.scrollTop = 0
    },
    handleScroll(e) {
      let scrollTop = e.target.scrollTop
      if (scrollTop > 100) { // 当滚动超过100px时显示“返回顶部”按钮
        this.isShowGoTopButton = true
      } else {
        this.isShowGoTopButton = false
      }
    },
    // 自适应表格列宽
    flexColumnWidth(str, arr1, index, minWidth, flag = 'max') {
      // str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
      // flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
      // flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
      // index 为当前常规列的索引
      str = str + ''
      let columnContent = ''
      if (!arr1 || !arr1.length || arr1.length === 0 || arr1 === undefined) {
        return 'auto'
      }
      if (!str || !str.length || str.length === 0 || str === undefined) {
        return 'auto'
      }
      if (flag === 'equal') {
        // 获取该列中第一个不为空的数据(内容)
        for (let i = 0; i < arr1.length; i++) {
          if ((arr1[i][str] + '').length > 0) {
            columnContent = arr1[i][str]
            break
          }
        }
      } else {
        // 获取该列中最长的数据(内容)
        let index = 0
        for (let i = 0; i < arr1.length; i++) {
          if ((arr1[i][str] + '') != null) {
            const nowTemp = arr1[i][str] + ''
            const maxtemp = arr1[index][str] + ''
            if (this.getColumnWidth(nowTemp) > this.getColumnWidth(maxtemp)) {
              index = i
            }
          }
        }
        columnContent = arr1[index][str]
      }
      // console.log('该列数据[i]:', columnContent)
      let flexWidth = 0
      flexWidth = this.getColumnWidth(columnContent)
      // console.log('列宽',str,flexWidth,minWidth);
      // 之所以要加20是因为有个padding左右各10px,所以要加上20来抵消padding的值
      if ((flexWidth + 20) < minWidth) {
        // 设置最小宽度
        return 'auto'
      }
      // console.log(flexWidth, minWidth, 'flexWidth---99');
      // 计算当前操作的列下标，index只是常规列下标，要多计算首列的长度
      let cellIndex = index + 1
      if (!Array.isArray(this.table.firstColumn) && this.table.firstColumn) {
        cellIndex = index + 1 + 1
      } else if (Array.isArray(this.table.firstColumn) && this.table.firstColumn.length) {
        cellIndex = index + 1 + this.table.firstColumn.length
      }
      setTimeout(() => {
        if (this.$refs['el-table'] && this.$refs['el-table'].$el && this.$refs['el-table'].$el.querySelectorAll(` tr > td.el-table__cell:nth-child(` + cellIndex + `) > .cell`).length > 0) {
          this.$refs['el-table'].$el.querySelectorAll(` tr > td.el-table__cell:nth-child(` + cellIndex + `) > .cell`).forEach(el => {
            el.style.width = `${flexWidth + 20}px`
          })
        }
      }, 300)

      return flexWidth + 20 + 'px'
    },
    getColumnWidth(temp) {
      // 以下分配的单位长度可根据实际需求进行调整
      let flexWidth = 0
      if (temp) {
        for (const char of temp) {
          if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
            // 如果是英文字符，为字符分配8个单位宽度
            flexWidth += 8
          } else if (char >= '\u4e00' && char <= '\u9fa5') {
            // 如果是中文字符，为字符分配15个单位宽度
            flexWidth += 14
          } else {
            // 其他种类字符，为字符分配8个单位宽度
            flexWidth += 9
          }
        }
      }
      return flexWidth
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
    // 单行编辑&整行编辑返回数据--事件返回
    save() {
      if (!this.isEditRules) {
        this.$emit('save', this.tableData)
        return
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
              const isFixedParent =
                item.$parent.$el.offsetParent.className ===
                'el-table__fixed-body-wrapper' ||
                item.$parent.$parent.$el.offsetParent.className ===
                'el-table__fixed-body-wrapper'
              if (!isFixedParent) {
                successLength = successLength + 1
              }
            } else {
              rulesError.push(val)
            }
          })
        })
      })
      setTimeout(() => {
        console.log('successLength--', successLength, rulesList.length)
        // 所有表单都校验成功
        if (successLength === rulesList.length) {
          if (this.isEditRules) {
            this.$emit('save', this.tableData)
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
      }, 300)
    },
    // 单行编辑&整行编辑返回数据---方法
    async saveMethod(callback) {
      if (!this.isEditRules) {
        callback && await callback(this.tableData)
        return
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
              const isFixedParent =
                item.$parent.$el.offsetParent.className ===
                'el-table__fixed-body-wrapper' ||
                item.$parent.$parent.$el.offsetParent.className ===
                'el-table__fixed-body-wrapper'
              if (!isFixedParent) {
                successLength = successLength + 1
              }
            } else {
              rulesError.push(val)
            }
          })
        })
      })
      // setTimeout(() => {
      console.log('successLength--方法', successLength, rulesList.length)
      // 所有表单都校验成功
      if (successLength === rulesList.length) {
        if (this.isEditRules) {
          callback && await callback(this.tableData)
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
      // }, 300)
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
      // 重置表单
      refList.length > 0 &&
        refList.map((val) => {
          this.$refs[val].map((item) => {
            item.resetFields()
          })
        })
      // 重置下拉表格
      const refEditList = Object.keys(this.$refs).filter((item) =>
        item.includes('singleEditRef')
      )
      if (refEditList.length > 0) {
        refEditList.map((val) => {
          this.$refs[val].map((item) => {
            item.resetTselectTableFields()
          })
        })
      }
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
    // 复制内容
    copyDomText(val) {
      // 获取需要复制的元素以及元素内的文本内容
      const text = val
      // 添加一个input元素放置需要的文本内容
      const input = document.createElement('input')
      input.value = text
      document.body.appendChild(input)
      // 选中并复制文本到剪切板
      input.select()
      document.execCommand('copy')
      // 移除input元素
      document.body.removeChild(input)
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
      try {
        this.copyDomText(label)
        this.$message.success('已复制')
      } catch (e) {
        this.$message.error('复制失败')
      }
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
      let isPermission =
        item.hasPermi && this.btnPermissions
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
      // 如果第一列是单选框
      if (this.table?.firstColumn?.type === 'radio') {
        // 将单选框的值置空
        this.radioVal = ''
      }
      this.$emit('page-change', val)
    },
    // 默认选中（单选项）---index必须是大于等于1（且只能默认选中第一页的数据）
    defaultRadioSelect(index) {
      this.radioVal = index
      this.$emit('radioChange', this.tableData[index - 1], this.radioVal)
    },
    // 点击单选框单元格触发事件
    radioChange(row, index) {
      if (this.rowClickRadio) {
        return
      }
      // console.log('radioChange----', row, index)
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
      this.rowData = row
      row.selectFlag = !row.selectFlag
      if (row.selectFlag) {
        this.$refs['el-table'].setCurrentRow(row)
      } else {
        this.$refs['el-table'].setCurrentRow()
      }
      if (!this.rowClickRadio) {
        return
        // console.log('点击某行--333333', this.table.data.indexOf(row) + 1)
      }
      this.radioClick(row, this.table.data.indexOf(row) + 1)
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
    },
    doLayout() {
      this.$nextTick(() => {
        this.$refs['el-table'].doLayout()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.t-table {
  z-index: 0;
  background-color: #fff;
  ::v-deep .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    margin-right: calc(2% - 20px);
    background-color: #fff;
  }
  // style：ttable单元格内容过长省略号
  .el-table {
    .el-table__cell {
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
    // 设置了allShow样式修改
    .flex_column_width {
      .el-tooltip {
        div {
          overflow: visible;
        }
      }
    }
  }
  ::v-deep .el-table {
    // 是否隐藏复选框/单选/序列
    .is_show_first_column {
      div {
        display: none;
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
      flex: 1;
      display: flex;
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
      flex: 1;
      font-size: 16px;
      font-weight: bold;
      line-height: 35px;
      margin-left: 10px;
    }
  }
  .title-tip {
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-size: 14px;
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
  // 单元格编辑有规则校验
  .el-table {
    .cell {
      .t_edit_cell_form_rules {
        .single_edit_cell {
          margin-bottom: 15px;
        }
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
  // 返回顶部icon
  .backToTop {
    position: fixed;
    right: 10px;
    bottom: 150px;
    z-index: 100;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    background: #fff;
    border-radius: 5px;
    opacity: 0.6;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    > div {
      border-top: 1px solid #eee;
      padding: 10px;

      &:first-child {
        border-bottom: none;
      }
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
