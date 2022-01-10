<template>
  <el-color-picker
    @input="handleChange"
    size="small"
    v-bind="attrs"
    v-model="newValue"
  />
</template>

<script>
import EleEditableMixin from '../EleEditableMixin'

export default {
  name: 'EleEditableSwitch',
  mixins: [EleEditableMixin]
}
</script>
