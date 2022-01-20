<template>
  <a
    :href="computedValue"
    v-bind="attrs"
    v-if="computedValue"
  >{{displayValue}}</a>
</template>

<script>
import EleEditableMixin from '../EleEditableMixin'

export default {
  name: 'EleEditableUrl',
  mixins: [EleEditableMixin],
  data () {
    return {
      defaultAttrs: {
        target: '_blank'
      }
    }
  }
}
</script>
