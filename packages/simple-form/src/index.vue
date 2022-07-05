<template>
  <el-form
    class="t-form"
    ref="form"
    :class="className"
    :model="formOpts.formData"
    :rules="formOpts.rules"
    :label-width="formOpts.labelWidth||'120px'"
    :label-position="formOpts.labelPosition||'right'"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form-item
      v-for="(item, index) in formOpts.fieldList"
      :key="index"
      :prop="item.value"
      :label="item.label"
      :class="[item.className,{'render_label':item.labelRender},{'slot_label':item.slotName},{'render_laber_position':formOpts.labelPosition}]"
      :rules="item.rules"
      :style="getChildWidth(item)"
      v-bind="$attrs"
      v-on="$listeners"
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
        <span>{{item.textValue||formOpts.formData[item.value]}}</span>
      </template>
      <component
        v-if="!item.slotName&&!item.textShow"
        :is="item.comp"
        v-model="formOpts.formData[item.value]"
        :type="item.type"
        :placeholder="item.placeholder||getPlaceholder(item)"
        @change="handleEvent(item.event, formOpts.formData[item.value])"
        v-bind="{clearable:true,filterable:true,...item.bind}"
        :style="{width: item.width||'100%'}"
      >
        <!-- 前置文本 -->
        <template #prepend v-if="item.prepend">{{ item.prepend }}</template>
        <!-- 后置文本 -->
        <template #append v-if="item.append">{{ item.append }}</template>
        <!-- 子组件自定义插槽 -->
        <template v-if="item.childSlotName">
          <slot :name="item.childSlotName"></slot>
        </template>
        <component
          v-else
          :is="compChildName(item)"
          v-for="(value, key, index) in selectListType(item)"
          :key="index"
          :disabled="value.disabled"
          :label="compChildLabel(item,value)"
          :value="compChildValue(item,value,key)"
        >{{compChildShowLabel(item,value)}}</component>
      </component>
    </el-form-item>
    <!-- 按钮 -->
    <div class="footer_btn flex-box flex-ver t-margin-top-5">
      <template v-if="formOpts.btnSlotName">
        <slot :name="formOpts.btnSlotName"></slot>
      </template>
      <template v-if="!formOpts.btnSlotName&&formOpts.operatorList&&formOpts.operatorList.length>0">
        <el-button
          v-for="(val,index) in formOpts.operatorList"
          :key="index"
          @click="val.fun(val)"
          :type="val.type||'primary'"
          :icon="val.icon"
          :size="val.size || 'small'"
          :disabled="val.disabled"
        >{{ val.label }}</el-button>
      </template>
    </div>
  </el-form>
</template>
<script>
import RenderComp from './renderComp'
export default {
  name: 'TSimpleForm',
  components: {
    RenderComp
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
    // 一行显示几个输入项;最大值4
    widthSize: {
      type: Number,
      default: 2,
      validator: (value) => {
        return value <= 4
      }
    },
    // ref
    refObj: {
      type: Object
    }
  },
  computed: {
    selectListType () {
      return ({ list }) => {
        if (this.formOpts.listTypeInfo) {
          return this.formOpts.listTypeInfo[list]
        } else {
          return []
        }
      }
    },
    // 子组件名称
    compChildName () {
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
    compChildLabel () {
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
    compChildValue () {
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
    compChildShowLabel () {
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
  data () {
    return {
      colSize: this.widthSize
    }
  },
  watch: {
    'formOpts.formData': {
      handler (val) {
        // 将form实例返回到父级
        this.$emit('update:refObj', this.$refs.form)
      },
      deep: true // 深度监听
    },
    widthSize (val) {
      if (val > 4) {
        this.$message.warning('widthSize值不能大于4！')
        this.colSize = 4
      } else {
        this.colSize = val
      }
    }
  },
  mounted () {
    // 将form实例返回到父级
    this.$emit('update:refObj', this.$refs.form)
  },
  methods: {
    // label与输入框的布局方式
    getChildWidth (item) {
      if (this.formOpts.labelPosition === 'top') {
        return `flex: 0 1 calc((${100 / (item.widthSize || this.colSize)}% - 10px));margin-right:10px;`
      } else {
        return `flex: 0 1 ${100 / (item.widthSize || this.colSize)}%;`
      }
    },
    // 得到placeholder的显示
    getPlaceholder (row) {
      let placeholder
      // 请输入type
      const inputArr = ['input', 'textarea', 'inputNumber']
      // 请选择type
      const selectArr = ['select-arr', 'time', 'select-obj', 'date']
      if (inputArr.includes(row.type)) {
        placeholder = '请输入' + row.label
      } else if (selectArr.includes(row.type)) {
        placeholder = '请选择' + row.label
      } else {
        placeholder = row.label
      }
      return placeholder
    },
    // 绑定的相关事件
    handleEvent (type, val) {
      // console.log('组件', type, val)
      this.$emit('handleEvent', type, val)
    },
    // 校验
    validate () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
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
    resetFields () {
      return this.$refs.form.resetFields()
    },
    // 清空校验
    clearValidate () {
      return this.$refs.form.clearValidate()
    }
  }
}
</script>

<style lang="scss">
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
  .t-form-block {
    display: block;
    width: 100% !important;
    .el-form-item__content {
      .el-input,
      .el-select,
      .el-date-editor,
      .el-textarea {
        width: 100%;
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
        min-width: 108px;
        color: #606266;
        text-align: right;
        margin-right: 12px;
      }
    }
  }
  .footer_btn {
    width: 100%;
  }
}
</style>
