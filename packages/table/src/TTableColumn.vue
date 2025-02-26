<template>
  <el-table-column
    :prop="item.prop"
    :label="item.label"
    :type="item.type"
    :align="item.align || align"
    :fixed="item.fixed"
    :min-width="item['min-width'] || item.minWidth"
    :width="item.width"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #header v-if="item.renderHeader">
      <render-header :column="item" :render="item.renderHeader" />
    </template>
    <template v-for="(val, index) of item.children">
      <t-table-column
        v-if="val.children"
        :key="index"
        :item="val"
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
      <el-table-column
        v-else
        :key="val.prop"
        :prop="val.prop"
        :label="val.label"
        :min-width="val['min-width'] || val.minWidth"
        :class-name="val.allShow?'flex_column_width':''"
        :width="val.allShow ? flexColumnWidth(val.prop,table.data,index,val['min-width'] || val.minWidth || val.width) : val.width"
        :sortable="val.sort"
        :align="val.align || align"
        :fixed="val.fixed"
        :show-overflow-tooltip="val.noShowTip"
        v-bind="{...val.bind,...$attrs}"
        v-on="$listeners"
      >
        <template #header v-if="val.renderHeader">
          <render-header :column="val" :render="val.renderHeader" />
        </template>
        <template slot-scope="scope">
          <!-- render渲染 -->
          <template v-if="val.render">
            <render-col :column="val" :row="scope.row" :render="val.render" :index="scope.$index" />
          </template>
          <!-- 自定义插槽 -->
          <template v-if="val.slotNameMerge">
            <slot :name="val.slotNameMerge" :param="scope" :scope="scope"></slot>
          </template>
          <!-- 单个单元格编辑 -->
          <template v-if="val.canEdit">
            <single-edit-cell
              :isShowRules="false"
              :configEdit="val.configEdit"
              :prop="val.prop"
              :record="scope"
              @handleEvent="(event,model) => $emit('handleEvent',event,model,scope.$index)"
              v-bind="$attrs"
              v-on="$listeners"
            >
              <template v-for="(index, name) in $slots" v-slot:[name]>
                <slot :name="name" />
              </template>
              <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
              </template>
            </single-edit-cell>
          </template>
          <div v-if="!val.render&&!val.canEdit&&!val.slotNameMerge">{{scope.row[val.prop]}}</div>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>

<script>
import SingleEditCell from './singleEditCell.vue'
import RenderCol from './renderCol.vue'
import RenderHeader from './renderHeader.vue'
export default {
  name: 'TTableColumn',
  components: {
    SingleEditCell,
    RenderCol,
    RenderHeader
  },
  props: {
    // 每列的数据
    item: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    },
    table: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tableRef: {
      type: Object,
      default: () => {
        return {}
      }
    },
    align: {
      type: String,
      default: 'center'
    }
  },
  methods: {
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
            // console.log('该列数据[0]:', arr1[0][str])
            columnContent = arr1[i][str]
            break
          }
        }
      } else {
        // 获取该列中最长的数据(内容)
        let index = 0
        for (let i = 0; i < arr1.length; i++) {
          if ((arr1[i][str] + '') != null) {
            const nowtemp = arr1[i][str] + ''
            const maxTemp = arr1[index][str] + ''
            if (this.getColumnWidth(nowtemp) > this.getColumnWidth(maxTemp)) {
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
      // console.log(flexWidth, minWidth, 999999);
      // if (flexWidth > 250) {
      //   // 设置最大宽度
      //   flexWidth = 250
      // }
      // 计算当前操作的列下标，index只是常规列下标，要多计算首列的长度
      let cellIndex = index + 1
      if (!Array.isArray(this.table.firstColumn) && this.table.firstColumn) {
        cellIndex = index + 1 + 1
      } else if (Array.isArray(this.table.firstColumn) && this.table.firstColumn.length) {
        cellIndex = index + 1 + this.table.firstColumn.length
      }
      setTimeout(() => {
        if (this.tableRef && this.tableRef.$el && this.tableRef.$el.querySelectorAll(` tr > td.el-table__cell:nth-child(` + cellIndex + `) > .cell`).length > 0) {
          this.tableRef.$el.querySelectorAll(` tr > td.el-table__cell:nth-child(` + cellIndex + `) > .cell`).forEach(el => {
            el.style.width = `${flexWidth + 20}px`
          })
        }
      }, 500)

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
    }
  }
}
</script>
<style lang="scss">
.flex_column_width {
  .el-tooltip {
    div {
      overflow: visible;
    }
  }
}
</style>
