<template>
  <el-select
    ref="select"
    v-model="defaultValue"
    popper-class="t-select-table"
    :multiple="multiple"
    :value-key="keywords.value"
    :filterable="filterable"
    :filter-method="filterMethod||filterMethodHandle"
    @visible-change="visibleChange"
    @remove-tag="removeTag"
    @clear="clear"
    @keyup.native="selectKeyup"
    v-bind="selectAttr"
    v-on="$listeners"
  >
    <template #empty>
      <div class="t-table-select__table" :style="{ width: `${tableWidth}px` }">
        <div class="table_query_condition" v-if="isShowQuery">
          <t-query-condition ref="t-query-condition" v-bind="$attrs" v-on="$listeners">
            <template v-for="(index, name) in $slots" v-slot:[name]>
              <slot :name="name" />
            </template>
            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
              <slot :name="name" v-bind="data"></slot>
            </template>
          </t-query-condition>
        </div>
        <el-table
          ref="el-table"
          :data="tableData"
          :class="{ radioStyle: !multiple, highlightCurrentRow: isRadio,keyUpStyle:isKeyup }"
          border
          :row-key="getRowKey"
          highlight-current-row
          @row-click="rowClick"
          @cell-dblclick="cellDblclick"
          @selection-change="handlesSelectionChange"
          v-bind="$attrs"
          v-on="$listeners"
        >
          <el-table-column
            v-if="multiple"
            type="selection"
            width="50"
            align="center"
            :reserve-selection="reserveSelection"
            fixed
          ></el-table-column>
          <el-table-column
            type="radio"
            width="50"
            :label="radioTxt"
            fixed
            align="center"
            v-if="!multiple && isShowFirstColumn"
          >
            <template slot-scope="scope">
              <el-radio
                v-model="radioVal"
                :label="scope.$index + 1"
                @click.native.prevent="radioChangeHandle(scope.row, scope.$index + 1)"
              ></el-radio>
            </template>
          </el-table-column>
          <template v-for="(item, index) in columns">
            <el-table-column
              :key="index + 'i'"
              :type="item.type"
              :label="item.label"
              :prop="item.prop"
              :min-width="item['min-width'] || item.minWidth || item.width"
              :align="item.align || 'center'"
              :fixed="item.fixed"
              :show-overflow-tooltip="item.noShowTip"
              v-bind="{ ...item.bind, ...$attrs }"
              v-on="$listeners"
            >
              <template slot-scope="scope">
                <!-- render方式 -->
                <template v-if="item.render">
                  <render-col
                    :column="item"
                    :row="scope.row"
                    :render="item.render"
                    :index="scope.$index"
                  />
                </template>
                <!-- 作用域插槽 -->
                <template v-if="item.slotName">
                  <slot :name="item.slotName" :scope="scope"></slot>
                </template>
                <div v-if="!item.render && !item.slotName">
                  <span>{{ scope.row[item.prop] }}</span>
                </div>
              </template>
            </el-table-column>
          </template>
          <slot></slot>
        </el-table>
        <div class="t-table-select__page">
          <el-pagination
            v-show="tableData && tableData.length && isShowPagination"
            :current-page="table.currentPage"
            @current-change="handlesCurrentChange"
            :page-sizes="[10, 20, 50, 100]"
            :pager-count="5"
            :page-size="table.pageSize"
            layout="total,  prev, pager, next, jumper"
            :total="table.total"
            v-bind="$attrs"
            v-on="$listeners"
            background
          ></el-pagination>
        </div>
      </div>
    </template>
  </el-select>
</template>

<script>
import TQueryCondition from '../../query-condition/src/index.vue'
import RenderCol from './renderCol.vue'
export default {
  name: 'TSelectTable',
  components: {
    RenderCol,
    TQueryCondition
  },
  props: {
    // 选择值
    value: {
      type: [String, Number, Array]
    },
    // table所需数据
    table: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 表头数据
    columns: {
      type: Array,
      default: () => []
    },
    // 单选文案
    radioTxt: {
      type: String,
      default: '单选'
    },
    // 是否显示搜索条件
    isShowQuery: {
      type: Boolean,
      default: false
    },
    // 是否显示首列
    isShowFirstColumn: {
      type: Boolean,
      default: true
    },
    // 是否显示分页
    isShowPagination: {
      type: Boolean,
      default: false
    },
    // 是否支持翻页选中
    reserveSelection: {
      type: Boolean,
      default: true
    },
    // 是否过滤
    filterable: {
      type: Boolean,
      default: true
    },
    // 是否开启自动过滤
    filterMethod: {
      type: Function
    },
    // 设置默认选中项--keywords.value值（单选是String, Number类型；多选时是数组）
    defaultSelectVal: {
      type: [String, Number, Array]
    },
    // 下拉数据指向的label/value
    keywords: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value'
        }
      }
    },
    // 多选
    multiple: {
      type: Boolean,
      default: false
    },
    // table宽度
    tableWidth: {
      type: Number,
      default: 550
    },
    // 单选是否开启键盘事件
    isKeyup: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selectAttr() {
      return {
        clearable: true,
        ...this.$attrs
      }
    }
  },
  data() {
    return {
      nowIndex: -1, // 当前选择行的index
      radioVal: '',
      defaultSelectValue: this.defaultSelectVal, // 默认选中
      isDefaultSelectVal: true, // 是否已经重新选择了
      isRadio: false,
      forbidden: true, // 判断单选选中及取消选中
      tableData: this.table?.data, // table数据
      defaultValue: this.value,
      ids: [], // 多选id集合
      tabularMap: {} // 存储下拉tale的所有name
    }
  },
  mounted() {
    // 设置默认选中项（单选）
    if (this.defaultSelectValue && this.isDefaultSelectVal) {
      this.defaultSelect(this.defaultSelectValue)
    }
    // 获取查询条件组件的项
    this.$refs['t-query-condition'] && Object.values(this.$refs['t-query-condition'].opts).map(val => {
      if (val.comp.includes('select')) {
        val.event = {
          'visible-change': (val) => this.selectVisibleChange(val)
        }
      }
    })
  },
  watch: {
    value: {
      handler() {
        this.$nextTick(() => {
          // 多选
          if (this.multiple) {
            this.defaultValue = Array.isArray(this.value)
              ? this.value
              : this.value
                ? this.value.split(',')
                : []
            this.defaultValue = (this.defaultValue || []).map((item) => {
              return item
            })
          } else {
            this.defaultValue = this.value
              ? { [this.keywords.value]: this.value }
              : ''
          }
          this.findLabel()
        })
      },
      deep: true,
      immediate: true
    },
    'table.data': {
      handler(val) {
        this.tableData = val
        this.$nextTick(() => {
          this.tableData &&
            this.tableData.length > 0 &&
            this.tableData.forEach((item) => {
              this.tabularMap[item[this.keywords.value]] =
                item[this.keywords.label]
            })
          // this.findLabel()
        })
      },
      deep: true,
      immediate: true
    },
    // 默认选中
    defaultSelectVal: {
      handler(val) {
        this.defaultSelectValue = val
        if (val && this.isDefaultSelectVal) {
          this.defaultSelect(val)
        }
      },
      deep: true
    }
  },
  methods: {
    // 解决内嵌select选中后外层下拉框消失问题
    selectVisibleChange(value) {
      if (value) {
        this.documentHandler = this.$refs.select.$el['@@clickoutsideContext'].documentHandler
        this.$refs.select.$el['@@clickoutsideContext'].documentHandler = (mouseup = {}, mousedown = {}) => { }
      } else {
        this.$refs.select.$el['@@clickoutsideContext'].documentHandler = this.documentHandler
      }
    },
    // 单选键盘事件
    selectKeyup(e) {
      if (!this.multiple) {
        if (!this.isKeyup) return
        if (this.tableData.length === 0) return
        let refsElTable = this.$refs['el-table']
        switch (e.keyCode) {
          case 40: // 下键
            if (this.tableData[this.nowIndex * 1 + 1] !== undefined) {
              refsElTable.setCurrentRow(this.tableData[this.nowIndex * 1 + 1])
              this.nowIndex = this.nowIndex * 1 + 1
            } else {
              this.nowIndex = 0
              refsElTable.setCurrentRow(this.tableData[0])
            }
            break
          case 38: // 上键
            if (this.tableData[this.nowIndex * 1 - 1] !== undefined && this.nowIndex > 0) {
              refsElTable.setCurrentRow(this.tableData[this.nowIndex * 1 - 1])
              this.nowIndex = this.nowIndex * 1 - 1
            } else {
              this.nowIndex = 0
              refsElTable.setCurrentRow(this.tableData[0])
            }
            break
          case 13: // 回车
            this.tableData[this.nowIndex] && this.rowClick(this.tableData[this.nowIndex])
            break
        }
      }
    },
    // 搜索过滤
    filterMethodHandle(val) {
      if (!this.filterable) return
      const tableData = JSON.parse(JSON.stringify(this.table?.data))
      if (tableData && tableData.length > 0) {
        if (!this.multiple) {
          if (val) {
            this.radioVal = ''
          } else {
            tableData.map((item, index) => {
              if (item.id === this.defaultValue?.id) {
                this.radioVal = index + 1
              }
            })
          }
        }
        this.tableData = tableData.filter((item) => {
          if (item[this.keywords.label].includes(val)) {
            return item
          }
        })
      }
    },
    // 搜索后表格勾选不取消
    getRowKey(row) {
      return row[this.keywords.value]
    },
    // 当前页码
    handlesCurrentChange(val) {
      // this.clear()
      if (this.multiple) {
        if (!this.reserveSelection) {
          this.clear()
        }
      } else {
        this.clear()
      }
      this.$emit('page-change', val)
    },
    // 表格显示隐藏回调
    visibleChange(visible) {
      if (visible) {
        if (this.defaultSelectVal && this.isDefaultSelectVal) {
          this.defaultSelect(this.defaultSelectVal)
        }
        this.initTableData()
      } else {
        this.findLabel()
        this.filterMethodHandle('')
      }
    },
    handlesSelectionChange(val) {
      this.isDefaultSelectVal = false
      this.defaultValue = val.map((item) => item[this.keywords.label])
      this.ids = val.map((item) => item[this.keywords.value])
      this.$emit('selectionChange', val, this.ids)
    },
    // 获取表格数据
    initTableData() {
      // 表格默认赋值
      this.$nextTick(() => {
        if (this.multiple) {
          this.defaultValue.forEach((row) => {
            const arr = this.tableData.filter(
              (item) => item[this.keywords.value] === row[this.keywords.value]
            )
            if (arr.length > 0) {
              this.$refs['el-table'].toggleRowSelection(arr[0], true)
            }
          })
        } else {
          const arr = this.tableData.filter(
            (item) =>
              item[this.keywords.value] ===
              this.defaultValue[this.keywords.value]
          )
          if (arr.length > 0) {
            this.$refs['el-table'].setCurrentRow(arr[0])
          }
        }
      })
    },
    // 赋值
    findLabel() {
      this.$nextTick(() => {
        if (this.multiple) {
          if (this.$refs.select) {
            this.$refs.select.selected.forEach((item) => {
              item.currentLabel = item.value
            })
          }
        } else {
          if (this.$refs.select) {
            // console.log('this.defaultValue---findLabel', this.defaultValue)
            this.$refs.select.selectedLabel =
              this.defaultValue[this.keywords.label] || ''
          }
        }
      })
    },
    // 双击复制单元格内容
    cellDblclick(row, column) {
      let label = row[column.property]
      this.$copyText(label).then(
        () => {
          this.$message.success('已复制')
        },
        () => {
          this.$message.error('复制失败')
        }
      )
    },
    // 默认选中（且只能默认选中第一页的数据）
    defaultSelect(defaultSelectVal) {
      if (typeof defaultSelectVal === 'object' && this.multiple) {
        let multipleList = []
        defaultSelectVal.map((val) => {
          this.tableData.forEach((row) => {
            if (val === row[this.keywords.value]) {
              multipleList.push(row)
            }
          })
        })
        setTimeout(() => {
          this.defaultValue = multipleList.map(
            (item) => item[this.keywords.label]
          )
          multipleList.forEach((row) => {
            const arr = this.tableData.filter(
              (item) => item[this.keywords.value] === row[this.keywords.value]
            )
            if (arr.length > 0) {
              this.$refs['el-table'].toggleRowSelection(arr[0], true)
            }
          })
          this.$refs.select.selected.forEach((item) => {
            item.currentLabel = item.value
          })
        }, 0)
      } else {
        let row, index
        this.tableData.map((val, i) => {
          if (val[this.keywords.value] === defaultSelectVal) {
            row = val
            index = i
          }
        })
        this.radioVal = index + 1
        this.defaultValue = row
        setTimeout(() => {
          this.$refs.select.selectedLabel = row[this.keywords.label]
        }, 0)
      }
    },
    // 点击单选框单元格触发事件
    radioChangeHandle(row, index) {
      console.log('不是单选框事件，而是rowClick事件')
      this.isDefaultSelectVal = false
      // this.radioClick(row, index)
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
          this.defaultValue = {}
          this.$emit('radioChange', {}, null) // 取消勾选就把回传数据清除
          this.blur()
        } else {
          this.isForbidden()
          this.radioVal = index
          this.defaultValue = row
          this.$emit('radioChange', row, row[this.keywords.value])
          this.blur()
        }
      } else {
        this.isForbidden()
        this.radioVal = index
        this.defaultValue = row
        this.$emit('radioChange', row, row[this.keywords.value])
        this.blur()
      }
    },
    // 单击行
    async rowClick(row) {
      if (!this.multiple) {
        let rowIndex
        // eslint-disable-next-line no-unused-expressions
        this.table?.data.forEach((item, index) => {
          if (item[this.keywords.value] === row[this.keywords.value]) {
            // console.log('index', index)
            rowIndex = index
          }
        })
        this.isDefaultSelectVal = false
        await this.radioClick(row, rowIndex + 1)
        // console.log('rowClick---', row, rowIndex)
        if (this.radioVal) {
          this.isRadio = true
        } else {
          this.isRadio = false
        }
      }
    },
    // tags删除后回调
    removeTag(tag) {
      const row = this.tableData.find(
        (item) => item[this.keywords.label] === tag
      )
      this.$refs['el-table'].toggleRowSelection(row, false)
    },
    // 清空后的回调
    clear() {
      if (this.multiple) {
        this.$refs['el-table'].clearSelection()
      } else {
        // 取消高亮
        this.$refs['el-table'].setCurrentRow(-1)
        this.nowIndex = -1
        this.radioVal = ''
        this.forbidden = false
      }
    },
    // 触发select隐藏
    blur() {
      this.$refs.select.blur()
    },
    // 触发select显示
    focus() {
      this.$refs.select.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.t-select-table {
  // 单选样式
  .radioStyle {
    ::v-deep .el-table__cell {
      .cell {
        // text-align: center;
      }
    }

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
        color: #409eff;
      }
    }
  }
  // 键盘事件开启选择高亮
  .keyUpStyle {
    ::v-deep tbody {
      .el-table__row {
        cursor: pointer;
      }
      .current-row td {
        cursor: pointer;
        color: #409eff;
      }
    }
  }

  .t-table-select__table {
    ::v-deep tbody {
      .keyup-hover-row {
        color: red;
      }
    }
  }

  .t-table-select__table {
    padding: 10px;
    .table_query_condition {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 10px;
    }
  }

  .t-table-select__page {
    padding-top: 5px;

    ::v-deep .el-pagination {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: calc(2% - 20px);
      background-color: #fff;
    }
  }
}
</style>
