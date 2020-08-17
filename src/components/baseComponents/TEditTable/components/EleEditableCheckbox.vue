<template>
  <el-checkbox-group
    @input="handleChange"
    size="small"
    v-bind="attrs"
    v-model="newValue"
  >
    <el-checkbox
      :key="item.value"
      :label="item.value"
      v-for="item in options"
    >{{item.text}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
import EleEditableMixin from '../EleEditableMixin'

export default {
  name: 'EleEditableCheckbox',
  mixins: [EleEditableMixin]
}
</script>
