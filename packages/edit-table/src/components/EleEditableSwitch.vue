<template>
  <el-switch
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
  mixins: [EleEditableMixin],
  data () {
    return {
      newValue: Boolean(this.computedValue)
    }
  },
  methods: {
    // 将 switch 的值转为 boolean 值
    setNewValue () {
      this.newValue = Boolean(this.displayValue)
    },
    handleChange (value) {
      if (typeof this.value === 'number') {
        value = Number(value)
      }

      this.$emit('change', value)
    }
  }
}
</script>
