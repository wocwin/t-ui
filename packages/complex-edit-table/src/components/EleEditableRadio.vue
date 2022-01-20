<template>
  <el-radio-group
    @input="handleChange"
    size="small"
    v-bind="attrs"
    v-model="newValue"
  >
    <el-radio
      :key="item.value"
      :label="item.value"
      v-for="item in options"
    >{{item.text}}</el-radio>
  </el-radio-group>
</template>

<script>
import EleEditableMixin from '../EleEditableMixin'

export default {
  name: 'EleEditableRadio',
  mixins: [EleEditableMixin]
}
</script>
