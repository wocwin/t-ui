<template>
  <el-date-picker
    :clearable="true"
    :format="format"
    @input="handleTimeChange"
    size="small"
    style="max-width: 200px"
    type="datetime"
    v-bind="attrs"
    v-model="newValue"
  />
</template>

<script>
import EleEditableMixin from '../EleEditableMixin'

export default {
  name: 'EleEditableDatetime',
  mixins: [EleEditableMixin],
  data () {
    return {
      defaultAttrs: {
        format: 'yyyy-MM-dd HH:mm'
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
