<template>
  <div class="timer-btn">
    <button
      class="sendSmsBtn"
      :class="disabled?'dissendSmsBtn':''"
      type="button"
      @click="run"
      :disabled="disabled || time > 0"
    >{{ text }}</button>
  </div>
</template>

<script>
export default {
  name: 'TTimerBtn',
  props: {
    second: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      time: 0,
      disabled: false
    }
  },
  computed: {
    text() {
      return this.time > 0 ? `${this.time}s 后重获取` : '获取验证码'
    }
  },
  methods: {
    run() {
      this.$emit('click')
      this.start()
    },
    start() {
      this.time = this.second
      this.disabled = true
      this.timer()
    },
    timer() {
      if (this.time > 0) {
        this.time--
        setTimeout(this.timer, 1000)
      } else {
        this.disabled = false
      }
    }

  }
}
</script>
<style lang="scss" scoped>
.timer-btn {
  position: relative;
  .sendSmsBtn {
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    background: #ef473a;
    border: none;
    padding: 0 6px;
    color: #fff;
    display: inline-block;
    min-width: 92px;
    cursor: pointer;
  }
  .dissendSmsBtn {
    opacity: 0.5;
    cursor: auto;
  }
}
</style>
