<template>
  <el-form
    :label-width="labelWidth"
    :form="form"
    size="small"
    id="t_query_condition"
    class="t-query-condition"
    :style="{
    'grid-template-areas': gridAreas,
    'grid-template-columns': `repeat(${colLength}, minmax(0px, ${100 / colLength
      }%))`,
  }"
    @submit.native.prevent
  >
    <el-form-item
      v-for="(opt, i) in cOpts"
      :key="i"
      :label="opt.label"
      :style="{ gridArea: i }"
      :class="[opt.className, { render_label: opt.labelRender }]"
    >
      <!-- 自定义label -->
      <template #label v-if="opt.labelRender">
        <render-comp :createElementFunc="opt.labelRender" />
      </template>
      <!-- 自定义输入框插槽 -->
      <template v-if="opt.slotName">
        <slot :name="opt.slotName" :param="form" :scope="form"></slot>
      </template>
      <!-- <OptComponent
        v-if="!opt.slotName"
        v-bind="opt"
        :opt="opt"
        :ref="opt.comp === 't-select-table' ? `tselecttableref-${i}` : ''"
        :form="form"
        :value="form[opt.dataIndex]"
        @change="change"
      />-->
      <template v-if="opt.isSelfCom">
        <component
          :is="opt.comp"
          :ref="refArr.includes(opt.comp) ? `${opt.comp}-${i}` : ''"
          v-model="form[opt.dataIndex]"
          :placeholder="opt.placeholder || getPlaceholder(opt)"
          v-bind="
            typeof opt.bind == 'function'
              ? opt.bind(form)
              : { clearable: true, filterable: true, ...$attrs, ...opt.bind }
          "
          :style="{ width: opt.width || '100%' }"
          @change="handleEvent({ type: opt.eventFlag, val: form[opt.dataIndex] })"
          v-on="cEvent(opt)"
        />
      </template>
      <component
        v-if="!opt.isSelfCom && !opt.slotName"
        :is="opt.comp"
        v-bind="
          typeof opt.bind == 'function'
            ? opt.bind(form)
            : { clearable: true, filterable: true, ...$attrs, ...opt.bind }
        "
        :ref="opt.ref"
        :placeholder="opt.placeholder || getPlaceholder(opt)"
        @change="handleEvent({ type: opt.eventFlag, val: form[opt.dataIndex] })"
        v-on="cEvent(opt)"
        v-model="form[opt.dataIndex]"
      >
        <component
          :is="compChildName(opt)"
          v-for="(value, key, index) in selectListType(opt)"
          :key="index"
          :disabled="value.disabled"
          :label="compChildLabel(opt, value)"
          :value="compChildValue(opt, value, key)"
        >{{ compChildShowLabel(opt, value) }}</component>
      </component>
    </el-form-item>
    <el-form-item
      v-if="Object.keys(cOpts).length > 0"
      label-width="0"
      style="grid-area: submit_btn"
      :class="['btn', { flex_end: cellLength % colLength === 0 }]"
    >
      <template v-if="isFooter">
        <template v-if="!isShow('footerBtn')&&!isSlotFooterBtn">
          <el-button
            class="btn_check"
            @click="checkHandle"
            :loading="loading"
            v-bind="queryAttrs"
          >{{ queryAttrs.btnTitle }}</el-button>
          <el-button
            v-if="reset"
            class="btn_reset"
            v-bind="resetAttrs"
            @click="resetHandle"
          >{{ resetAttrs.btnTitle }}</el-button>
          <slot name="querybar"></slot>
          <el-button
            v-if="originCellLength > (maxVisibleRows*colLength) && showOpen"
            type="text"
            @click="openCilck"
          >
            {{ controlText }}
            <i :class="open ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
          </el-button>
          <more-choose
            :isDropDownSelectMore="isDropDownSelectMore"
            v-bind="$attrs"
            @getCheckList="(event) =>$emit('getCheckList', event)"
          />
        </template>
        <slot name="footerBtn" />
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
import OptComponent from './OptComponent'
import RenderComp from './renderComp.vue'
import MoreChoose from './moreChoose'

export default {
  name: 'TQueryCondition',
  components: {
    OptComponent,
    RenderComp,
    MoreChoose
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
    // 查询按钮配置
    btnCheckBind: {
      type: [Object]
    },
    // 重置按钮配置
    btnResetBind: {
      type: [Object]
    },
    reset: {
      type: Boolean,
      default: true
    },
    boolEnter: {
      type: Boolean,
      default: true
    },
    // 是否显示收起和展开
    isShowOpen: {
      type: Boolean,
      default: true
    },
    // 是否默认展开
    isExpansion: {
      type: Boolean,
      default: false
    },
    isExpansionTxt: {
      type: String,
      default: '展开'
    },
    // 收起
    isPackupTxt: {
      type: String,
      default: '收起'
    },
    // 是否开启一行显示几个查询条件
    isShowWidthSize: {
      type: Boolean,
      default: false
    },
    // 一行显示几个查询条件(默认4,最小值2)
    widthSize: {
      type: Number,
      default: 4
    },
    configChangedReset: {
      type: Boolean,
      default: false
    },
    // 收起时设置默认展示行数
    maxVisibleRows: {
      type: Number,
      default: 1
    },
    // 是否以下拉方式展示更多条件
    isDropDownSelectMore: {
      type: Boolean,
      default: false
    },
    // 是否显示底部操作按钮
    isFooter: {
      type: Boolean,
      default: true
    },
    // 下拉数据源，使用el-select
    listTypeInfo: {
      type: Object,
      default: () => ({})
    },
    isSlotFooterBtn: Boolean, // TAdaptivePage组件是否使用了footerBtn插槽
    allRef: {
      type: Object
    }
  },
  data() {
    return {
      refArr: ['t-select-table', 't-tree-select'],
      showOpen: this.isShowOpen,
      open: !!this.isExpansion,
      colLength: null,
      form: Object.keys(this.opts).reduce((acc, field) => {
        acc[field] = this.opts[field].defaultVal ?? null
        return acc
      }, {})
    }
  },
  watch: {
    opts: {
      handler(opts) {
        this.form = this.initForm(opts, !this.configChangedReset)
      },
      deep: true
    },
    widthSize(val) {
      this.colLength = val
    }
  },
  computed: {
    cEvent() {
      return ({ event }, type) => {
        let eventHandle = { ...event }
        let changeEvent = {}
        Object.keys(eventHandle).forEach((v) => {
          changeEvent[v] = (e, ids) => {
            if (type === 't-select-table') {
              eventHandle[v] && eventHandle[v](e, ids, arguments)
            } else {
              eventHandle[v] && eventHandle[v](e, this.form, arguments)
            }
          }
        })
        return { ...changeEvent }
      }
    },
    selectListType() {
      return ({ list }) => {
        if (this.listTypeInfo) {
          return this.listTypeInfo[list]
        } else {
          return []
        }
      }
    },
    // 子组件名称
    compChildName() {
      return ({ type }) => {
        switch (type) {
          case 'checkbox':
            return 'el-checkbox'
          case 'radio':
            return 'el-radio'
          case 'select-arr':
          case 'select-obj':
            return 'el-option'
        }
      }
    },
    // 子子组件label
    compChildLabel() {
      return ({ type, arrLabel }, value) => {
        switch (type) {
          case 'radio':
          case 'checkbox':
            return value.value
          case 'el-select-multiple':
          case 'select-arr':
            return value[arrLabel || 'dictLabel']
          case 'select-obj':
            return value
        }
      }
    },
    // 子子组件value
    compChildValue() {
      return ({ type, arrKey }, value, key) => {
        switch (type) {
          case 'radio':
          case 'checkbox':
            return value.value
          case 'el-select-multiple':
          case 'select-arr':
            return value[arrKey || 'dictValue']
          case 'select-obj':
            return key
        }
      }
    },
    // 子子组件文字展示
    compChildShowLabel() {
      return ({ type, arrLabel }, value) => {
        switch (type) {
          case 'radio':
          case 'checkbox':
            return value.label
          case 'el-select-multiple':
          case 'select-arr':
            return value[arrLabel || 'dictLabel']
          case 'select-obj':
            return value
        }
      }
    },
    // 以下拉方式展示更多条件--属性
    popoverAttrsBind() {
      const popoverAttrs = { showTxt: '更多', title: '所有条件', allTxt: '全选', reverseTxt: '反选', clearTxt: '清空', ...this.popoverAttrs }
      return { placement: 'bottom', width: 220, trigger: 'click', ...popoverAttrs }
    },
    // 是否展开
    controlText() {
      return this.open ? this.isPackupTxt : this.isExpansionTxt
    },
    // 查询按钮配置
    queryAttrs() {
      return { type: 'primary', size: 'small', btnTitle: '查询', ...this.btnCheckBind }
    },
    // 重置按钮配置
    resetAttrs() {
      return { size: 'small', btnTitle: '重置', ...this.btnResetBind }
    },
    cOpts() {
      const { open, opts, colLength, maxVisibleRows, showOpen } = this
      let renderSpan = 0
      return Object.keys(opts).reduce((acc, field) => {
        let opt = {
          ...opts[field]
        }
        // 收起、展开操作
        if (showOpen) {
          renderSpan += opt.span ?? 1
          // if (!open && renderSpan - 1 >= colLength) return acc
          if (!open && renderSpan - 1 >= (maxVisibleRows * colLength)) return acc
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
        const span = Math.min(opt.span ?? 1, Math.min(this.colLength, 4)) // 最大4
        if (rowSpan + span > colLength) {
          while (rowSpan < colLength) {
            areas[rowIndex].push('.')
            rowSpan += 1
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
        areas.push(Array(colLength).fill('submit_btn'))
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
      Object.keys(this.opts).forEach((key) => {
        span = this.opts[key].span > 4 ? 4 : this.opts[key].span || 1
      })
      return span
    },
    cellLength() {
      // 占用单元格长度
      let length = 0
      Object.keys(this.opts).forEach((key) => {
        let span = this.opts[key].span > 4 ? 4 : this.opts[key].span || 1
        length += span
      })
      return length
    },
    originCellLength() {
      const { colLength } = this
      let length = 0
      Object.keys(this.opts).forEach((key) => {
        let span = this.opts[key].span || 1
        if ((length % colLength) + span > colLength) {
          length += colLength - (length % colLength)
        }
        length += span
      })
      return length
    }
  },
  methods: {

    openCilck() {
      this.open = !this.open
      this.$emit('openCilck')
    },
    getColLength() {
      // 行列数
      const width = window.innerWidth
      let colLength = 4
      if (width > 1000 && width < 1280) {
        colLength = 3
      } else if (width > 768 && width <= 1000) {
        colLength = 2
      } else if (width <= 768) {
        colLength = 1
      }
      return colLength
    },
    initForm(opts, keepVal = false) {
      return Object.keys(opts).reduce((acc, field) => {
        if (keepVal && this.form) {
          acc[field] = this.form[field] ?? opts[field].defaultVal ?? null
        } else {
          acc[field] = opts[field].defaultVal ?? null
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
      // 获取所有的tselecttable
      this.refArr.reduce((acc, item) => {
        const refs = Object.keys(this.$refs).filter(refKey => refKey.includes(item))
        if (refs.length > 0) {
          acc[item] = refs
          refs.forEach(refKey => {
            const refInstance = this.$refs[refKey][0]
            if (refKey.includes('t-select-table')) {
              refInstance?.clear?.()
            } else {
              refInstance?.handleReset?.()
            }
          })
        }
        return acc
      }, {})
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
        if (typeof this.form[field] === 'string') {
          // 去除前后空格
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
            pagination.forEach((ele) => {
              let paginationInputList = ele.getElementsByTagName('input')
              let paginationInput =
                paginationInputList[paginationInputList.length - 1]
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
    },
    isShow(name) {
      return Object.keys(this.$slots).includes(name)
    },
    // 得到placeholder的显示
    getPlaceholder(row) {
      let placeholder
      if (typeof row.comp === 'string' && row.comp) {
        if (row.comp.includes('input')) {
          placeholder = '请输入' + row.label
        } else if (
          row.comp.includes('select') ||
          row.comp.includes('date') ||
          row.comp.includes('cascader')
        ) {
          placeholder = '请选择' + row.label
        } else {
          placeholder = row.label
        }
      } else {
        placeholder = row.label
      }
      return placeholder
    },
    handleEvent(type, val) {
      this.$emit('handleEvent', type, val)
    }
  },
  activated() {
    this.keyEvent()
    this.$emit('update:allRef', this.$refs)
  },
  mounted() {
    this.$emit('update:allRef', this.$refs)
    if (this.isShowWidthSize) {
      this.colLength = this.widthSize
    } else {
      this.colLength = this.getColLength()
    }
    this.keyEvent()
    // 使用自定义按钮插槽默认展开所有查询条件
    if (this.isShow('footerBtn') || !this.isFooter) {
      this.open = true
    }
    // 以下拉方式展示更多条件禁用展开&收起功能
    if (this.isDropDownSelectMore) {
      this.open = true
      this.showOpen = false
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

  .btn {
    text-align: end;
    .more_dropdown_icon {
      margin-left: 8px;
      cursor: pointer;
      .out_box {
        color: #409eff;
        font-size: 12px;
      }
      .el-icon-arrow-down {
        color: #409eff;
      }
    }
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
