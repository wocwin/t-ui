<template>
  <el-tag
    :type="tagType"
    v-bind="attrs"
    v-if="displayValue"
  >{{displayValue}}</el-tag>
</template>

<script>
import EleEditableMixin from '../EleEditableMixin'

export default {
  name: 'EleEditableStatus',
  mixins: [EleEditableMixin],
  computed: {
    // 获取类型(primary, info, danger...)
    tagType () {
      const value = this.computedValue
      const option = this.options.find((item) => {
        return item.value === value
      })

      if (option && option.type) {
        return option.type
      } else {
        return 'primary'
      }
    }
  }
}
</script>
