<template>
  <div class="t_detail">
    <el-descriptions v-bind="{ size: 'middle', ...$attrs }" v-on="$listeners" :column="descColumn">
      <el-descriptions-item
        v-for="(item, key) in descData"
        :key="key"
        :label="item.label"
        :span="item.span || 1"
        v-bind="{ ...item.bind, ...$attrs }"
      >
        <template slot="label">
          <render-label v-if="item.labelRender" :render="item.labelRender" :item="item" />
          <span v-else :style="{ fontWeight: isLabelBold ? 'bold' : '' }">{{ item.label }}</span>
        </template>
        <template v-if="item.slotName">
          <slot :name="item.slotName"></slot>
        </template>
        <div v-else>
          <el-tooltip v-bind="$attrs" v-if="item.tooltip">
            <span>
              <span v-if="item.filters && item.filters.list">
                {{
                dataList[item.fieldName]
                | constantEscape(
                listTypeInfo[item.filters.list],
                item.filters.key || "dictValue",
                item.filters.label || "dictLabel"
                )
                }}
              </span>
              <span v-else>{{ item.value }}</span>
              <i :class="item.iconClass || 'el-icon-warning-outline'" style="cursor: pointer" />
            </span>
            <template #content v-if="item.tooltip">
              <span v-if="typeof item.tooltip === 'string'">
                {{
                item.tooltip
                }}
              </span>
              <template v-else-if="typeof item.tooltip === 'function'">
                <render-tooltip :createElementFunc="item.tooltip" />
              </template>
            </template>
          </el-tooltip>
          <span v-else>
            <span v-if="item.filters && item.filters.list">
              {{
              dataList[item.fieldName]
              | constantEscape(
              listTypeInfo[item.filters.list],
              item.filters.key || "dictValue",
              item.filters.label || "dictLabel"
              )
              }}
            </span>
            <span v-else>
              {{ item.value }}
              <span v-if="item.unit&&item.value">{{item.unit}}</span>
            </span>
          </span>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script>
import RenderTooltip from '../../module-form/src/renderTooltip.vue'
import { constantEscape } from '../../utils'
import RenderLabel from './renderLabel.vue'
export default {
  name: 'TDetail',
  components: {
    RenderTooltip,
    RenderLabel
  },
  // 过滤器
  filters: {
    constantEscape
  },
  props: {
    descColumn: {
      type: Number,
      default: 4
    },
    // 后台数据源
    dataList: {
      type: Object,
      default: () => ({})
    },
    // 需要解析的下拉数据
    listTypeInfo: {
      type: Object,
      default: () => ({})
    },
    descData: {
      type: Array,
      default: () => []
    },
    // label是否加粗显示
    isLabelBold: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss" scoped>
.t_detail {
  .el-descriptions {
    ::v-deep.el-descriptions-item__label {
      font-weight: bold;
      min-width: 65px;
    }
  }
}
</style>
