<template>
  <el-form label-width="100px" :form="form" size="small" class="t-query-condition">
    <el-form-item
      v-for="(opt, i) in cOpts"
      :key="i"
      :label="opt.label"
      :style="{'flex': `${opt.span?(100 / colLength)*span:(100 / colLength)}%`}"
    >
      <OptComponent v-bind="opt" :value="form[opt.dataIndex]" @change="change" />
    </el-form-item>
    <el-form-item
      v-if="Object.keys(cOpts).length > 0"
      label-width="0"
      :class="{'flex_end': cellLength % colLength === 0}"
    >
      <el-button type="primary" size="small" class="btn_check" @click="checkHandle">查询</el-button>
      <el-button v-if="resetBtn" class="btn_reset" size="small" @click="resetHandle">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import OptComponent from './OptComponent'
export default {
  name: 'TQueryCondition',
  components: {
    OptComponent
  },
  props: {
    opts: {
      type: Object,
      default: () => ({})
    },
    resetBtn: {
      type: Boolean,
      default: true
    },
    boolEnter: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: Object.keys(this.opts).reduce((acc, field) => {
        acc[field] = this.opts[field].defaultVal || null
        return acc
      }, {})
    }
  },
  watch: {
    opts: {
      handler (opts) {
        this.form = this.initForm(opts, true)
      },
      deep: true
    }
  },
  computed: {
    cOpts () {
      return Object.keys(this.opts).reduce((acc, field) => {
        let opt = {
          ...this.opts[field]
        }
        opt.dataIndex = field
        acc[field] = opt
        return acc
      }, {})
    },
    colLength () { // 行列数
      const width = window.innerWidth
      let colLength = 4
      if (width > 768 && width < 1280) {
        colLength = 3
      } else if (width <= 768) {
        colLength = 2
      }
      return colLength
    },
    // 占用单元格长度
    span () {
      let span = 1
      Object.keys(this.opts).forEach(key => {
        span = this.opts[key].span > 4 ? 4 : this.opts[key].span || 1
      })
      return span
    },
    cellLength () { // 占用单元格长度
      let length = 0
      Object.keys(this.opts).forEach(key => {
        let span = this.opts[key].span > 4 ? 4 : this.opts[key].span || 1
        length += span
      })
      return length
    }
  },
  methods: {
    initForm (opts, keepVal = false) {
      return Object.keys(opts).reduce((acc, field) => {
        if (keepVal && this.form) {
          acc[field] = this.form[field]
        } else if (opts[field].defaultVal) {
          acc[field] = opts[field].defaultVal
        } else {
          acc[field] = null
        }
        return acc
      }, {})
    },
    resetHandle () {
      this.form = this.initForm(this.opts)
      this.checkHandle()
    },
    change (v, dataIndex) {
      this.form[dataIndex] = v
      this.$emit('change', {
        ...this.form
      })
    },
    checkHandle () {
      this.$emit('submit', this.form)
    }
  },
  created () {
    if (this.boolEnter) {
      var lett = this
      document.onkeydown = function (e) {
        var key = window.event.keyCode
        if (key === 13) {
          lett.checkHandle()
        }
      }
    }
  }
}
</script>

<style lang="scss">
.t-query-condition {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: -7px;
  text-align: left;
  .el-date-editor,
  .el-input.el-input--suffix,
  .el-select {
    width: 100%;
  }

  .flex_end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    .el-form-item__content {
      text-align: right;
    }
  }
  .btn_check {
    position: relative;
    top: 0px;
    margin-left: 16px;
  }

  .btn_reset {
    position: relative;
    margin-left: 8px;
  }
}
</style>
