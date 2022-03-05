<template>
  <el-form
    :label-width="labelWidth"
    :form="form"
    size="small"
    class="t-query-condition"
    :style="{'grid-template-areas': gridAreas, 'grid-template-columns': `repeat(${colLength}, minmax(220px, ${100 / colLength}%))`}"
  >
    <el-form-item v-for="(opt, i) in cOpts" :key="i" :label="opt.label" :style="{gridArea: i}">
      <OptComponent v-bind="opt" :opt="opt" :value="form[opt.dataIndex]" @change="change" />
    </el-form-item>
    <el-form-item
      v-if="Object.keys(cOpts).length > 0"
      label-width="0"
      style="grid-area: submit_btn"
      :class="{'flex_end': cellLength % colLength === 0}"
    >
      <el-button
        type="primary"
        size="small"
        class="btn_check"
        @click="checkHandle"
        :loading="loading"
      >查询</el-button>
      <el-button v-if="reset" class="btn_reset" size="small" @click="resetHandle">重置</el-button>
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
    // 配置项
    opts: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    loading: {
      type: Boolean,
      default: false
    },
    reset: {
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
      colLength: null,
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
    gridAreas () { // grid布局按钮位置
      let template = "'. . . .'"
      switch (this.colLength) {
        case 3:
          template = "'. . .'"
          break
        case 2:
          template = "'. .'"
          break
      }
      let areas = [template]
      Object.keys(this.opts).forEach(key => { // 根据控件描述注定占用多少列及顺序
        let span = 1
        if (this.opts[key].span > 1 || this.opts[key].span <= 2) { // 最多占用2列
          span = this.opts[key].span
        }
        // 计算剩余多少未占用的位置
        let count = 0
        let scrstr = areas[areas.length - 1]
        while (scrstr.indexOf('.') !== -1) {
          scrstr = scrstr.replace(/\./, '')
          count++
        }
        // 若剩余位置不足以放下下一个控件
        if (count < span) {
          areas.push(template)
        }
        let i = 0
        while (i < span) {
          areas[areas.length - 1] = areas[areas.length - 1].replace(/\./, key)
          i++
        }
      })
      // 若控件正好占满一行时，补充多一列放置btn
      if (areas[areas.length - 1].indexOf('.') === -1) {
        areas.push(template)
      }
      if (this.cellLength % this.colLength === 0) { // 正好占满一行
        areas[areas.length - 1] = areas[areas.length - 1].replace(/\.'$/, "submit_btn'")
      } else {
        areas[areas.length - 1] = areas[areas.length - 1].replace(/\./, 'submit_btn')
      }
      return (areas + '').replace(/,/g, '')
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
    getColLength () { // 行列数
      const width = window.innerWidth
      let colLength = 4
      if (width > 768 && width < 1280) {
        colLength = 3
      } else if (width <= 768) {
        colLength = 2
      }
      return colLength
    },
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
    // 更新defaultVal
    updateFields (keepVal = true) {
      this.form = this.initForm(this.opts, keepVal)
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
  mounted () {
    this.colLength = this.getColLength()
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
.t-query-condition.el-form {
  position: relative;
  display: grid;
  gap: 2px 8px;
  margin-bottom: -7px;
  text-align: left;
  .el-select,
  .el-date-editor,
  .ant-calendar-picker {
    width: 100%;
  }
  .flex_end {
    grid-area: submit_btn;
    margin-top: 2px;
    .el-form-item__content {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      overflow: visible !important;
    }
  }
  .el-form-item {
    display: flex;
    margin-bottom: 6px;
    .el-form-item__label {
      flex-shrink: 0;
      min-width: 60px;
      padding-left: 8px;
    }
    .el-form-item__content {
      flex-grow: 1;
      overflow: hidden;
      margin-left: 0 !important;
    }
  }
  .btn_check {
    position: relative;
    top: -1px;
  }
  .btn_reset {
    position: relative;
    top: -1px;
    margin-left: 8px;
  }
}
</style>
