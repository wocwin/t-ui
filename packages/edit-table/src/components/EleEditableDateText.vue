<template>
  <ele-common-time
    :format="showFormat"
    :value="displayValue"
    v-bind="attrs"
  />
</template>

<script>
import EleCommonTime from './EleCommonTime'
import EleEditableMixin from '../EleEditableMixin'

export default {
  name: 'EleEditableDateText',
  mixins: [EleEditableMixin],
  components: {
    EleCommonTime
  },
  computed: {
    showFormat () {
      return this.attrs.format.replace(/y/g, 'Y')
    }
  },
  data () {
    return {
      defaultAttrs: {
        format: 'YYYY-MM-DD'
      }
    }
  }
}
</script>
