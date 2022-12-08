<template>
  <el-form
    :label-width="labelWidth"
    :form="form"
    size="small"
    class="t-query-condition"
    :style="{'grid-template-areas': gridAreas, 'grid-template-columns': `repeat(${colLength}, minmax(220px, ${100 / colLength}%))`}"
    @submit.native.prevent
  >
    <el-form-item
      v-for="(opt, i) in cOpts"
      :key="i"
      :label="opt.label"
      :style="{gridArea: i}"
      :class="[opt.className,{'render_label':opt.labelRender}]"
    >
      <!-- 自定义label -->
      <template #label v-if="opt.labelRender">
        <render-comp :createElementFunc="opt.labelRender" />
      </template>
      <!-- 自定义输入框插槽 -->
      <template v-if="opt.slotName">
        <slot :name="opt.slotName" :param="form"></slot>
      </template>
      <OptComponent
        v-if="!opt.slotName"
        v-bind="opt"
        :opt="opt"
        :form="form"
        :value="form[opt.dataIndex]"
        @change="change"
      />
    </el-form-item>
    <el-form-item
      v-if="Object.keys(cOpts).length > 0"
      label-width="0"
      style="grid-area: submit_btn"
      :class="['btn',{'flex_end': cellLength % colLength === 0}]"
    >
      <el-button
        type="primary"
        size="small"
        class="btn_check"
        @click="checkHandle"
        :loading="loading"
      >查询</el-button>
      <el-button v-if="reset" class="btn_reset" size="small" @click="resetHandle">重置</el-button>
      <slot name="querybar"></slot>
      <el-button v-if="originCellLength > colLength&&isShowOpen" type="text" @click="openOrHide">
        {{ open ? '收起' : '展开'}}
        <i :class="open ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import OptComponent from './OptComponent'
import RenderComp from './renderComp.vue'
export default {
  name: 'TQueryCondition',
  components: {
    OptComponent,
    RenderComp
  },
  props: {
    // 配置项
    opts: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: String,
      default: '120px'
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
    },
    // 最大展示数，默认4个
    maxShow: {
      type: Number,
      default: 4
    },
    // 是否显示收起和展开
    isShowOpen: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      open: false,
      colLength: null,
      form: Object.keys(this.opts).reduce((acc, field) => {
        acc[field] = this.opts[field].defaultVal || null
        return acc
      }, {})
    }
  },
  watch: {
    opts: {
      handler(opts) {
        this.form = this.initForm(opts, true)
      },
      deep: true
    }
  },
  computed: {
    cOpts() {
      return Object.keys(this.opts).reduce((acc, field) => {
        let opt = {
          ...this.opts[field]
        }
        opt.dataIndex = field
        acc[field] = opt
        return acc
      }, {})
    },
    gridAreas() { // grid布局按钮位置
      const { colLength, cOpts } = this
      const fields = Object.keys(cOpts)
      let rowIndex = 0
      let rowSpan = 0
      const areas = [[]]
      for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
        const field = fields[fieldIndex]
        const opt = cOpts[field]
        const span = Math.min(opt.span ?? 1, 4) // 最大4
        if (rowSpan + span > colLength) {
          if (rowSpan < colLength) {
            areas[rowIndex].push('.')
          }
          rowSpan = 0
          areas[++rowIndex] = []
        }
        rowSpan += span
        for (let index = 0; index < span; index++) {
          areas[rowIndex].push(field)
        }
      }
      if (areas[rowIndex].length === colLength) {
        areas.push(['submit_btn', 'submit_btn', 'submit_btn', 'submit_btn'])
      } else {
        while (areas[rowIndex].length < colLength) {
          areas[rowIndex].push('submit_btn')
        }
      }
      return areas.reduce((acc, cur) => {
        acc += `'${cur.join(' ')}'\n`
        return acc
      }, '')
    },
    // 占用单元格长度
    span() {
      let span = 1
      Object.keys(this.opts).forEach(key => {
        span = this.opts[key].span > 4 ? 4 : this.opts[key].span || 1
      })
      return span
    },
    cellLength() { // 占用单元格长度
      let length = 0
      Object.keys(this.opts).forEach(key => {
        let span = this.opts[key].span > 4 ? 4 : this.opts[key].span || 1
        length += span
      })
      return length
    },
    originCellLength() {
      const { colLength } = this
      let length = 0
      Object.keys(this.opts).forEach(key => {
        let span = this.opts[key].span || 1
        if (length % colLength + span > colLength) {
          length += colLength - (length % colLength)
        }
        length += span
      })
      return length
    }
  },
  methods: {
    getColLength() { // 行列数
      const width = window.innerWidth
      let colLength = 4
      if (width > 768 && width < 1280) {
        colLength = 3
      } else if (width <= 768) {
        colLength = 2
      }
      return colLength
    },
    openOrHide() {
      this.open = !this.open
      this.minShowCtrol()
    },
    // 通过maxShow控制元素显示/折叠
    minShowCtrol() {
      const group = window.document.querySelectorAll(`.t-query-condition .el-form-item.el-form-item--small`)
      const len = group?.length ? group?.length - 1 : 0
      let j = 0
      let k = 0
      let g = 0
      if (Object.keys(this.opts).length > 4) {
        Object.keys(this.opts).splice(0, 4).forEach(key => {
          let span = this.opts[key].span || 1
          switch (span) {
            case 2:
              j = 1
              break
            case 3:
              k = 1
              break
            case 4:
              g = 2
              break
          }
        })
      }
      if (this.maxShow < len) {
        group.forEach((item, index) => {
          if (index > (this.maxShow - 1 - j - k - g) && index < len) {
            item.hidden = !this.open
          }
        })
      }
    },
    initForm(opts, keepVal = false) {
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
    updateFields(keepVal = true) {
      this.form = this.initForm(this.opts, keepVal)
    },
    resetHandle() {
      this.form = this.initForm(this.opts)
      this.checkHandle('reset')
      this.$emit('reset', this.form)
    },
    change(v, dataIndex) {
      this.form[dataIndex] = v
      this.$emit('change', {
        ...this.form
      })
    },
    checkHandle(flagText) {
      const formData = Object.keys(this.form).reduce((acc, field) => {
        if (typeof this.form[field] === 'string') { // 去除前后空格
          this.form[field] = this.form[field].trim()
        }
        acc[field] = this.form[field]
        return acc
      }, {})
      this.$emit('submit', formData, flagText)
    },
    // 键盘事件
    keyEvent() {
      if (this.boolEnter) {
        let lett = this
        document.onkeyup = function (e) {
          let key = window.event.keyCode
          let pagination = document.querySelectorAll('.el-pagination')
          let isPaginationInputFocus = false
          if (pagination) {
            pagination.forEach(ele => {
              let paginationInputList = ele.getElementsByTagName('input')
              let paginationInput = paginationInputList[paginationInputList.length - 1]
              // 判断是否有分页器筛选输入框获取焦点
              if (paginationInput === document.activeElement) {
                isPaginationInputFocus = true
              }
            })
          }
          if (isPaginationInputFocus) {
            return
          }
          if (key === 13) {
            lett.checkHandle()
          }
        }
      }
    }
  },
  activated() {
    this.keyEvent()
  },
  mounted() {
    this.colLength = this.getColLength()
    if (this.maxShow >= 4 && this.isShowOpen) {
      this.minShowCtrol()
    }
    this.keyEvent()
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
  .btn {
    text-align: end;
  }
  .render_label {
    .el-form-item__label {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &::before {
        margin-top: 1px;
      }
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
      // overflow: hidden;
      // display: flex;
      // align-items: center;
      // justify-content: flex-end;
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
  [hidden] {
    display: none !important;
  }
}
</style>
