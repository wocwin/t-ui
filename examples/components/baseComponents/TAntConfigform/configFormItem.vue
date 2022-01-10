<template>
  <a-form-model-item
    :label="typeof opt.label === 'string' && opt.label"
    :prop="opt.dataIndex"
    :ref="opt.dataIndex"
    :label-align="opt.labelAlign||'left'"
  >
    <template>
      <component v-if="typeof opt.label === 'object'" :is="opt.label" />
      <template v-else-if="typeof opt.label === 'function'">
        <render-comp :createElementFunc="opt.label" />
      </template>
    </template>
    <opt-component v-bind="opt" :value="value" @child-change="change" />
  </a-form-model-item>
</template>
<script>
import OptComponent from './optComponent'
import RenderComp from './renderComp'
export default {
  name: 'ConfigFormItem',
  components: {
    OptComponent,
    RenderComp
  },
  props: {
    opt: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: [String, Number, Array, Object],
      default: null
    }
  },
  methods: {
    change (v, dataIndex) {
      this.$emit('change', v, dataIndex)
    }
  }
}
</script>
