<template>
  <div>
    <el-time-select
      :clearable="true"
      :picker-options="{
        start: '00:00',
        end: '24:00'
      }"
      @input="handleTimeChange"
      size="small"
      style="max-width: 110px"
      v-bind="attrs"
      v-model="newValue"
    />
  </div>
</template>

<script>
import EleEditableMixin from '../EleEditableMixin'

export default {
  name: 'EleEditableTime',
  mixins: [EleEditableMixin],
  data () {
    return {
      defaultAttrs: {
        format: 'HH:mm'
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
