<template>
  <el-date-picker
    :clearable="true"
    @input="handleTimeChange"
    size="small"
    style="max-width: 140px"
    v-bind="attrs"
    v-model="newValue"
  />
</template>

<script>
import EleEditableMixin from '../EleEditableMixin'

export default {
  name: 'EleEditableDate',
  mixins: [EleEditableMixin],
  data () {
    return {
      defaultAttrs: {
        format: 'yyyy-MM-dd'
      }
    }
  },
  methods: {
    setNewValue () {
      this.setTimeNewValue()
    }
  }
}
</script>
