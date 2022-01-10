<template>
  <ele-common-time
    :value="displayValue"
    v-bind="attrs"
  />
</template>

<script>
import EleCommonTime from './EleCommonTime'
import EleEditableMixin from '../EleEditableMixin'

export default {
  name: 'EleEditableTimeText',
  mixins: [EleEditableMixin],
  components: {
    EleCommonTime
  },
  data () {
    return {
      defaultAttrs: {
        format: 'HH:mm'
      }
    }
  }
}
</script>
