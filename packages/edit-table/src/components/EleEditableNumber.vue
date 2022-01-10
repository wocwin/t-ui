<template>
  <el-input-number
    :clearable="true"
    @input="handleChange"
    size="small"
    v-bind="attrs"
    v-model="newValue"
  />
</template>

<script>
import EleEditableMixin from '../EleEditableMixin'

export default {
  name: 'EleEditableNumber',
  mixins: [EleEditableMixin]
}
</script>
