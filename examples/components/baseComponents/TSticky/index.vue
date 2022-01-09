<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div
      :class="className"
      :style="{top:(isSticky ? stickyTop +'px' : '') , zIndex:zIndex, position:positions, width:width, height:height+'px'}"
      v-if="position === 'top'"
    >
      <slot>
        <div>sticky</div>
      </slot>
    </div>
    <div
      :class="className"
      :style="{bottom:(isSticky ? stickyTop +'px' : '') , zIndex:zIndex, position:positions, width:width, height:height+'px'}"
      v-if="position === 'bottom'"
    >
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TSticky',
  props: {
    stickyTop: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1
    },
    className: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'top'
    }
  },
  data () {
    return {
      active: false,
      positions: '',
      width: undefined,
      height: undefined,
      isSticky: false
    }
  },
  mounted () {
    // this.height = this.$el.getBoundingClientRect().height
    this.height = 42
    window.addEventListener('scroll', this.handleScroll, true)
    window.addEventListener('resize', this.handleResize, true)
    this.handleScroll()
  },
  activated () {
    this.handleScroll()
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    sticky () {
      if (this.active) {
        return
      }
      this.positions = 'fixed'
      this.active = true
      this.width = this.width + 'px'
      this.isSticky = true
    },
    handleReset () {
      if (!this.active) {
        return
      }
      this.reset()
    },
    reset () {
      this.positions = ''
      this.width = 'auto'
      this.active = false
      this.isSticky = false
    },
    handleScroll () {
      const width = this.$el.getBoundingClientRect().width
      this.width = width || 'auto'
      const offsetTop = this.$el.getBoundingClientRect().top
      const clientHeight = document.body.clientHeight
      if (this.position === 'top') {
        if (offsetTop < this.stickyTop) {
          this.sticky()
          return
        }
      } else {
        if (offsetTop - clientHeight + this.height > this.stickyTop) {
          this.sticky()
          return
        }
      }
      this.handleReset()
    },
    handleResize () {
      if (this.isSticky) {
        this.width = this.$el.getBoundingClientRect().width + 'px'
      }
    }
  }
}
</script>
