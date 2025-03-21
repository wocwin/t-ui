<template>
  <el-form
    class="t-form"
    ref="form"
    :class="className"
    :model="formOpts.formData"
    :rules="formOpts.rules"
    :label-width="formOpts.labelWidth || '120px'"
    :label-position="formOpts.labelPosition || 'right'"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="(item, index) in fieldList">
      <el-form-item
        v-if="
          typeof item.isHideItem == 'function'
            ? item.isHideItem(formOpts.formData)
            : !item.isHideItem
        "
        :key="index"
        :prop="item.value"
        :label="item.label"
        :class="[
          item.className,
          { render_label: item.labelRender },
          { slot_label: item.slotName },
          { render_laber_position: formOpts.labelPosition },
          { is_dynamic: isDynamic },
        ]"
        :rules="item.rules"
        :style="getChildWidth(item)"
        v-bind="{ ...item.formItemBind }"
      >
        <!-- 自定义label -->
        <template #label v-if="item.labelRender">
          <render-comp :createElementFunc="item.labelRender" />
        </template>
        <!-- 自定义输入框插槽 -->
        <template v-if="item.slotName">
          <slot :name="item.slotName"></slot>
        </template>
        <!-- 文本展示值 -->
        <template v-if="item.textShow">
          <span>{{ item.textValue || formOpts.formData[item.value] }}</span>
        </template>
        <template v-if="item.isSelfCom">
          <component
            v-if="item.comp === 't-select-table'"
            :is="item.comp"
            :ref="`selectTableRef-${item.value}`"
            :placeholder="item.placeholder || getPlaceholder(item)"
            v-bind="
              typeof item.bind == 'function'
                ? item.bind(formOpts.formData)
                : { clearable: true, filterable: true, ...item.bind }
            "
            :style="{ width: item.width || '100%' }"
            v-on="cEvent(item, 't-select-table')"
          />
          <component
            v-else
            :is="item.comp"
            v-model="formOpts.formData[item.value]"
            :placeholder="item.placeholder || getPlaceholder(item)"
            :ref="item.ref"
            v-bind="
              typeof item.bind == 'function'
                ? item.bind(formOpts.formData)
                : { clearable: true, filterable: true, ...item.bind }
            "
            :style="{ width: item.width || '100%' }"
            v-on="cEvent(item)"
          />
        </template>
        <component
          v-if="!item.slotName && !item.textShow && !item.isSelfCom"
          :is="item.comp"
          v-removeAriaHidden
          v-model="formOpts.formData[item.value]"
          :ref="item.ref"
          :type="
            item.comp === 'el-input'
              ? item.type || 'input'
              : item.type || item.bind.type
          "
          :placeholder="item.placeholder || getPlaceholder(item)"
          @change="handleEvent(item.event, formOpts.formData[item.value], item)"
          v-bind="
            typeof item.bind == 'function'
              ? item.bind(formOpts.formData)
              : { clearable: true, filterable: true, ...item.bind }
          "
          :style="{ width: item.width || '100%' }"
          v-on="cEvent(item)"
        >
          <template #prepend v-if="item.prepend">{{ item.prepend }}</template>
          <template #append v-if="item.append">{{ item.append }}</template>
          <template v-if="item.childSlotName">
            <slot :name="item.childSlotName"></slot>
          </template>
          <component
            v-else
            :is="compChildName(item)"
            v-for="(value, key, index) in selectListType(item)"
            :key="index"
            :disabled="value.disabled"
            :label="compChildLabel(item, value)"
            :value="compChildValue(item, value, key)"
          >{{ compChildShowLabel(item, value) }}</component>
        </component>
        <i :key="index + 'icon'" v-if="isDynamic" class="el-icon-delete" @click="dynamicDel(index)"></i>
      </el-form-item>
    </template>
    <!-- 按钮 -->
    <div class="footer_btn flex-box flex-ver" :style="formOpts.footerStyle">
      <template v-if="formOpts.btnSlotName">
        <slot :name="formOpts.btnSlotName"></slot>
      </template>
      <template
        v-if="
          !formOpts.btnSlotName &&
          formOpts.operatorList &&
          formOpts.operatorList.length > 0
        "
      >
        <template v-for="(val, index) in formOpts.operatorList">
          <template v-if="val.render">
            <render-btn :key="index" :createElementFunc="val.render" />
          </template>
          <template v-else>
            <el-button
              :key="index + 'j'"
              @click="val.fun(val)"
              v-bind="{
                type: 'primary',
                size: 'small',
                ...val.bind,
              }"
              v-if="!val.isHideBtn"
            >{{ val.label }}</el-button>
          </template>
        </template>
      </template>
    </div>
  </el-form>
</template>
<script>
import RenderComp from './renderComp'
import RenderBtn from './renderBtn'
export default {
  name: 'TForm',
  components: {
    RenderComp,
    RenderBtn
  },
  props: {
    // 自定义类名
    className: {
      type: String
    },
    /** 表单配置项说明
     * formData object 表单提交数据
     * rules object 验证规则
     * fieldList Array 表单渲染数据
     * operatorList Array 操作按钮list
     * listTypeInfo object 下拉选项数据
     * labelWidth  String label宽度
     */
    formOpts: {
      type: Object,
      default: () => ({})
    },
    // 一行显示几个输入项;
    widthSize: {
      type: Number,
      default: 2
    },
    // 是否开启动态新增表单项
    isDynamic: {
      type: Boolean,
      default: false
    },
    // 全局是否开启清除前后空格
    isTrim: {
      type: Boolean,
      default: true
    },
    // ref
    refObj: {
      type: Object
    },
    allRef: {
      type: Object
    }
  },
  directives: {
    removeAriaHidden: {
      bind(el) {
        let ariaEls = el.querySelectorAll('.el-radio__original')
        ariaEls.forEach((item) => {
          item.removeAttribute('aria-hidden')
        })
      }
    }
  },
  computed: {
    cEvent() {
      return ({ eventHandle }, type) => {
        let event = { ...eventHandle }
        let changeEvent = {}
        Object.keys(event).forEach((v) => {
          changeEvent[v] = (e, ids) => {
            if (type === 't-select-table') {
              event[v] && event[v](e, ids, arguments)
            } else {
              if ((typeof e === 'number' && e === 0) || e) {
                event[v] && event[v](e, this.formOpts, arguments)
              } else {
                event[v] && event[v](this.formOpts, arguments)
              }
            }
          }
        })
        return { ...changeEvent }
      }
    },
    selectListType() {
      return ({ list }) => {
        if (this.formOpts.listTypeInfo) {
          return this.formOpts.listTypeInfo[list]
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
    }
  },
  data() {
    return {
      colSize: this.widthSize,
      fieldList: this.formOpts.fieldList
    }
  },
  watch: {
    'formOpts.formData': {
      handler(val) {
        // 将form实例返回到父级
        this.$emit('update:refObj', this.$refs.form)
      },
      deep: true // 深度监听
    },
    widthSize(val) {
      this.colSize = val
    }
  },
  activated() {
    // 将form实例返回到父级
    this.$emit('update:refObj', this.$refs.form)
    this.$emit('update:allRef', this.$refs)
  },
  mounted() {
    // 将form实例返回到父级
    this.$emit('update:refObj', this.$refs.form)
    this.$emit('update:allRef', this.$refs)
  },
  methods: {
    // label与输入框的布局方式
    getChildWidth(item) {
      if (this.formOpts.labelPosition === 'top') {
        return `flex: 0 1 calc((${100 / (item.widthSize || this.colSize)}% - 10px));margin-right:10px`
      } else {
        return `flex: 0 1 ${100 / (item.widthSize || this.colSize)}%`
      }
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
    dynamicDel(index) {
      this.$emit('del', index)
    },
    // 绑定的相关事件
    handleEvent(type, val, item) {
      // console.log('组件', type, val, item)
      // 去除前后空格
      if (
        this.isTrim &&
        !item.isTrim &&
        item.comp.includes('el-input') &&
        item?.bind?.type !== 'number' &&
        item.type !== 'password' &&
        item.type !== 'inputNumber'
      ) {
        this.formOpts.formData[item.value] =
          this.formOpts.formData[item.value].trim()
      }
      this.$emit('handleEvent', type, val)
    },
    // 校验
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve({
              valid,
              formData: this.formOpts.formData
            })
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              valid,
              formData: null
            })
          }
        })
      })
    },
    // 重置表单
    resetFieldsSelf() {
      // 获取所有的下拉表格组件 ref
      const refList = Object.keys(this.$refs).filter((item) =>
        item.includes('selectTableRef')
      )
      // 重置下拉表格组件
      if (refList.length > 0) {
        refList.map((val) => {
          this.$refs[val][0].clear()
        })
      }
      return this.$refs.form.resetFields()
    },
    // 清空校验
    clearValidate() {
      return this.$refs.form.clearValidate()
    }
  }
}
</script>

<style lang='scss'>
.t-form {
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    display: inline-block;
    width: 50%;
    .el-form-item__content {
      .el-input,
      .el-select,
      .el-date-editor,
      .el-textarea {
        width: 100%;
      }
      .el-input-number {
        .el-input {
          width: inherit;
        }
      }
    }
  }
  .is_dynamic {
    .el-form-item__content {
      display: flex;
      align-items: center;
      .el-icon-delete {
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
  .t-margin-top-5 {
    margin-top: calc(5px);
  }
  .el-input-number {
    .el-input {
      .el-input__inner {
        text-align: left;
      }
    }
  }
  .render_label {
    .el-form-item__label {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &::before {
        margin-top: 1px;
      }
    }
  }
  .render_laber_position {
    .el-form-item__label {
      justify-content: flex-start;
    }
  }
  .label_render {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .slot_label {
    // margin-bottom: 0 !important;
    .el-form-item__content {
      // margin-left: 0 !important;
      label {
        // min-width: 108px;
        color: #606266;
        text-align: right;
        margin-right: 12px;
      }
    }
  }
  .footer_btn {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>
