<template>
  <div>{{displayValue}}</div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'EleCommonTime',
  props: {
    value: [Number, String, Date],
    format: {
      type: String,
      required: true
    }
  },
  computed: {
    displayValue () {
      const value = typeof this.value === 'number' ? this.value * 1000 : this.value

      if (dayjs(value).isValid()) {
        return dayjs(value).format(this.format)
      } else {
        return value
      }
    }
  }
}
</script>
