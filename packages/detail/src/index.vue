<template>
  <div class="t_detail">
    <el-descriptions size="middle" :column="descColumn">
      <el-descriptions-item
        v-for="(item, key) in descData"
        :key="key"
        :label="item.label"
        :span="item.span || 1"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName"></slot>
        </template>
        <div v-else>
          <el-tooltip v-bind="$attrs" v-if="item.tooltip">
            <span>
              {{ item.value }}
              <i
                :class="item.iconClass||'el-icon-warning-outline'"
                style="cursor: pointer;"
              />
            </span>
            <template #content v-if="item.tooltip">
              <span v-if="typeof item.tooltip === 'string'">{{item.tooltip}}</span>
              <template v-else-if="typeof item.tooltip === 'function'">
                <render-tooltip :createElementFunc="item.tooltip" />
              </template>
            </template>
          </el-tooltip>
          <span v-else>{{ item.value }}</span>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script>
import RenderTooltip from '../../module-form/src/renderTooltip.vue'
export default {
  name: 'TDetail',
  components: {
    RenderTooltip
  },
  props: {
    descColumn: {
      type: Number,
      default: 4
    },
    descData: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
