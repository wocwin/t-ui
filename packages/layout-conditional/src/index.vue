<template>
  <a-form-model
    label-width="100px"
    :form="form"
    layout="horizontal"
    class="dh_layout_conditional"
    :style="{'grid-template-areas': gridAreas, 'grid-template-columns': `repeat(${colLength}, minmax(220px, ${100 / colLength}%))`}"
  >
    <config-form-item
      v-for="(opt, i) in cOpts"
      :key="i"
      :opt="opt"
      :value="form[opt.dataIndex]"
      :style="{gridArea: i}"
      @change="change"
    />
    <a-form-model-item
      v-if="Object.keys(cOpts).length > 0"
      label-width="0"
      style="grid-area: submit_btn"
      :class="{'flex_end': cellLength % colLength === 0}"
    >
      <a-button type="primary" class="btn_check" @click="checkHandle" :loading="loading">查看</a-button>
      <a-button v-if="reset" class="btn_reset" @click="resetHandle">重置</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import ConfigFormItem from '../../config-form/src/configFormItem.vue'
export default {
  name: 'TAntLayoutConditional',
  components: {
    ConfigFormItem
  },
  props: {
    opts: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    reset: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      colLength: null,
      form: this.initForm(this.opts)
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
    cOpts () { // 二次封装配置
      return Object.keys(this.opts).reduce((acc, field) => {
        let opt = { ...this.opts[field] }
        opt.dataIndex = field
        if (opt.comp.name === 'ASelect' && opt.bind && opt.bind.showSearch && opt.event && opt.event.search) { // 对a-select对search做优化，在下拉回调后调用清空搜索项方法。处理场景：用户输入数据对下拉列表模糊搜索后，下次点击无法展开完整列表
          opt.event['dropdownVisibleChange'] = (open) => {
            !open && opt.event.search('')
          }
        }
        if (opt.comp.name === 'ASelect') { // 设置弹窗渲染父节点
          opt.bind = opt.bind || {}
          opt.bind['getPopupContainer'] = opt.bind['getPopupContainer'] || this.getEl
        }
        if (opt.comp.name === 'ADatePicker') { // 设置弹窗渲染父节点
          opt.bind = opt.bind || {}
          opt.bind['getCalendarContainer'] = opt.bind['getCalendarContainer'] || this.getEl
        }
        if (opt.comp === 'DhRangePicker' || opt.comp.name === 'ADatePicker') { // 设置弹窗渲染父节点
          opt.bind = opt.bind || {}
          opt.bind['getCalendarContainer'] = opt.bind['getCalendarContainer'] || this.getEl
        }
        acc[field] = opt
        return acc
      }, {})
    },
    gridAreas () { // grid布局按钮位置
      let template = "'. . . .'"
      let length = 1
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
          length++
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
    cellLength () { // 占用单元格长度
      let length = 0
      Object.keys(this.opts).forEach(key => {
        let span = this.opts[key].span || 1
        length += span
      })
      return length
    }
  },
  mounted () {
    this.colLength = this.getColLength()
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
    initForm (opts, keepVal = false) { // keepVal 保持当前用户选择的结果
      return Object.keys(opts).reduce((acc, field) => {
        acc[field] = (keepVal && this.form && this.form[field]) || opts[field].defaultVal || null
        return acc
      }, {})
    },
    resetHandle () {
      this.form = this.initForm(this.opts)
      this.$emit('reset', this.form)
      this.checkHandle()
    },
    change (v, dataIndex) {
      this.form[dataIndex] = v
      this.$emit('change', { ...this.form })
    },
    checkHandle () {
      this.$emit('submit', Object.keys(this.form).reduce((acc, field) => {
        if (typeof this.form[field] === 'string') { // 去除前后空格
          this.form[field] = this.form[field].trim()
        }
        acc[field] = this.form[field]
        return acc
      }, {}))
    },
    getEl () {
      return this.$el
    }
  }
}
</script>
<style lang="scss">
.dh_layout_conditional.ant-form {
  position: relative;
  display: grid;
  gap: 2px 8px;
  margin-bottom: -7px;
  text-align: left;
  .ant-calendar-picker {
    width: 100% !important;
  }
  .flex_end {
    grid-area: submit_btn;
    .ant-form-item-control {
      text-align: right !important;
    }
  }
  .ant-form-item {
    display: flex;
    margin-bottom: 6px;
    .ant-form-item-label {
      flex-shrink: 0;
      min-width: 60px;
      padding-left: 8px;
    }
    .ant-form-item-control-wrapper {
      flex-grow: 1;
      overflow: hidden;
      .ant-form-item-control {
        text-align: left;
      }
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
