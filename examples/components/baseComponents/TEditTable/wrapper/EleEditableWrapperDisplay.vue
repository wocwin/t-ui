<template>
  <a
    :class="{'ele-editable__empty': isEmpty, 'ele-editable__edit': !isEmpty}"
    @click="$emit('click')"
  >
    <!-- 为空时 -->
    <template v-if="isEmpty">{{emptyText}}</template>
    <!-- 不为空时 -->
    <template v-else>
      <template v-if="isTimeComponent">
        <ele-common-time :format="timeFormat" :value="displayValue" />
      </template>
      <template v-else>{{displayValue}}</template>
    </template>
  </a>
</template>

<script>
import EleCommonTime from '../components/EleCommonTime'

export default {
  name: 'EleEditableWrapperDisplay',
  components: { EleCommonTime },
  props: {
    type: String,
    isEmpty: Boolean,
    emptyText: String,
    displayValue: [String, Number, Boolean, Array, Date]
  },
  computed: {
    // 日期组件特殊处理: 判断是否为日期组件
    isTimeComponent () {
      return ['time', 'date', 'datetime'].includes(this.type)
    },
    // 日期特殊处理: 格式化
    timeFormat () {
      if (this.isTimeComponent) {
        let format = this.customAttrs && this.customAttrs.format ? this.customAttrs.format : this.timeDefaultAttrs[this.type]
        format = format.replace(/y/g, 'Y')
        format = format.replace(/d/g, 'D')
        return format
      } else {
        return null
      }
    }
  },
  data () {
    return {
      // 日期组件特殊处理: 日期显示格式
      timeDefaultAttrs: {
        time: 'HH:mm',
        date: 'YYYY-MM-DD',
        datetime: 'YYYY-MM-DD HH:mm'
      }
    }
  }
}
</script>
