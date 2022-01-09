<template>
  <div v-bind="attrs">{{displayValue}}</div>
</template>

<script>
import EleEditableMixin from '../EleEditableMixin'

export default {
  name: 'EleEditableText',
  mixins: [EleEditableMixin]
}
</script>
