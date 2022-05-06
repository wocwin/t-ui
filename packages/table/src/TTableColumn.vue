<template>
  <div class="t_table_column">
    <el-table-column
      :prop="item.prop"
      :label="item.label"
      :type="item.type"
      :align="item.align || 'center'"
    >
      <template v-for="(val, index) of item.children">
        <t-table-column v-if="val.children" :key="index" :item="val"></t-table-column>
        <el-table-column
          v-else
          :key="val.prop"
          :prop="val.prop"
          :label="val.label"
          :min-width="val['min-width'] || val.minWidth || val.width"
          :sortable="val.sort"
          :render-header="val.renderHeader||(val.headerRequired&&renderHeader)"
          :align="val.align || 'center'"
          :show-overflow-tooltip="val.noShowTip"
          v-bind="{...val.bind,...$attrs}"
          v-on="$listeners"
        >
          <template slot-scope="scope">
            <!-- render渲染 -->
            <template v-if="val.customRender">
              <OptComponent
                v-for="(comp, i) in val.customRender.comps"
                :key="scope.$index + i.toString()"
                v-bind="comp"
                :scope="scope"
              />
            </template>
            <!-- 自定义插槽 -->
            <template v-if="val.slotName">
              <slot :name="val.slotName" :param="scope"></slot>
            </template>
            <!-- 单个单元格编辑 -->
            <template v-if="val.canEdit">
              <single-edit-cell
                :canEdit="val.canEdit"
                :configEdit="val.configEdit"
                v-model="scope.row[scope.column.property]"
                :prop="val.prop"
                :record="scope"
                @handleEvent="(event,model) => $emit('handleEvent',event,model,scope.$index)"
                v-bind="$attrs"
                ref="editCell"
              >
                <slot
                  v-if="val.configEdit&&val.configEdit.editSlotName"
                  :name="val.configEdit.editSlotName"
                  :scope="scope"
                />
              </single-edit-cell>
            </template>
            <!-- filters渲染 -->
            <div v-if="val.filters">
              <span
                v-if="val.filters.param"
              >{{scope.row[val.prop] |constantKey2Value(val.filters.param)}}</span>
              <span
                v-if="!val.filters.param&&val.filters.method==='￥'"
              >{{scope.row[val.prop] |currencyFilter}}</span>
              <span
                v-if="!val.filters.param&&val.filters.method==='%'"
              >{{scope.row[val.prop] |percentFilter}}</span>
            </div>
            <div
              v-if="!val.filters&&!val.slotName&&!val.customRender&&!val.canEdit"
            >{{scope.row[val.prop]}}</div>
          </template>
        </el-table-column>
      </template>
    </el-table-column>
  </div>
</template>

<script>
import SingleEditCell from './singleEditCell.vue'
import OptComponent from './OptComponent.vue'
export default {
  name: 'TTableColumn',
  components: {
    SingleEditCell,
    OptComponent
  },
  props: {
    // 每列的数据
    item: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    }
  },
  methods: {
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
    }
  }
}
</script>
