<template>
  <el-input
    :autosize="{ minRows: 2}"
    :clearable="true"
    @input="handleChange"
    size="small"
    type="textarea"
    v-bind="attrs"
    v-model="newValue"
  />
</template>

<script>
import EleEditableMixin from '../EleEditableMixin'

export default {
  name: 'EleEditableInput',
  mixins: [EleEditableMixin]
}
</script>
