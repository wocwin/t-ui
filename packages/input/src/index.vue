<template>
  <div class="t-input">
    <el-tooltip
      :disabled="!value"
      placement="bottom-start"
      effect="light"
      popper-class="tooltip-custom text-danger text-bold"
      v-if="isTip"
    >
      <div slot="content">
        {{value | currencyFilter}}
        <br />
        {{value | digitUppercase}}
      </div>
      <el-input
        type="text"
        :placeholder="placeholder"
        clearable
        @blur="projectAmounts"
        @clear="clearValue"
        :value="currentVal"
        @input="value=>$emit('input',value)"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template v-if="isShow" slot="append">{{appendTitle}}</template>
      </el-input>
    </el-tooltip>

    <el-input
      v-else
      type="text"
      :placeholder="placeholder"
      clearable
      @blur="projectAmounts"
      @clear="clearValue"
      :value="currentVal"
      @input="value=>$emit('input',value)"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-if="isShow" slot="append">{{appendTitle}}</template>
    </el-input>
  </div>
</template>
<script>
import { currencyFilter, digitUppercase } from '../../utils'
export default {
  name: 'TInput',
  data() {
    return {
      currentVal: this.value
    }
  },
  props: {
    isTip: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String,
      default: '请输入金额'
    },
    isShow: { // 是否显示尾缀
      type: Boolean,
      default: true
    },
    inputType: {
      type: String,
      default: 'currency'
    },
    appendTitle: {
      type: String,
      default: '元'
    }
  },
  // 过滤器
  filters: {
    currencyFilter,
    digitUppercase
  },
  watch: {
    value: {
      handler(val) {
        // console.log('组件watch', val)
        this.currentVal = val
      }
    }
  },
  methods: {
    projectAmounts() {
      if (this.inputType === 'currency') {
        // 货币金额类型输入
        if (isNaN(parseFloat(this.currentVal))) {
          if (this.currentVal !== '') {
            this.$message.error('输入金额的格式不正确')
            this.currentVal = ''
          }
        } else {
          this.currentVal = this.toThousandsNoZero(this.currentVal)
        }
      } else if (this.inputType === 'days') {
        // 天数输入
        if (this.currentVal !== '') {
          if (!/^[0-9]*$/.test(this.currentVal)) {
            this.$message.error('请输入正确的天数')
            this.currentVal = ''
          }
        }
      } else if (this.inputType === 'tel') {
        if (this.currentVal !== '') {
          if (!/^1[3|4|5|6|7|8][0-9]{9}$/.test(this.currentVal)) {
            this.$message.error('输入手机号的格式不正确')
            this.currentVal = ''
          }
        }
      } else if (this.inputType === 'percent') {
        if (this.currentVal !== '') {
          if (!/^\d+\.?\d{0,2}$/.test(this.currentVal)) {
            this.$message.error('输入百分比的格式不正确（最多2位小数）')
            this.currentVal = ''
          }
        }
      }
      // 触发事件
      this.$emit('numblur', this.currentVal)
    },
    clearValue() {
      this.$emit('clearInput', this.currentVal)
    },
    toThousandsNoZero(num) {
      return num ? ((isNaN(parseFloat(num.toString().replace(/,/g, ''))) ? 1 : parseFloat(num.toString().replace(/,/g, '')))).toFixed(2).toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
        return $1 + ','
      }) : ''
    }
  }
}
</script>
<style lang="scss">
.text-danger {
  color: #ef473a;
}
.text-bold {
  font-weight: bold;
}
</style>
