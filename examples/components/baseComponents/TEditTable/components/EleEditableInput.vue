<template>
  <el-input
    :clearable="true"
    @input="handleChange"
    size="small"
    v-bind="attrs"
    v-model="newValue"
  ></el-input>
</template>

<script>
import EleEditableMixin from '../EleEditableMixin'

export default {
  name: 'EleEditableInput',
  mixins: [EleEditableMixin]
}
</script>
