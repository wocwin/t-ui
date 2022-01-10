<template>
  <div>
    <!-- 不需要包裹 -->
    <template v-if="noWrapper">
      <slot/>
    </template>

    <!-- 需要包裹 -->
    <template v-else>
      <!-- 是否正在被编辑 -->
      <template v-if="isEditing">
        <!-- 行内形态 -->
        <ele-editable-wrapper-form
          :field="field"
          :inline="inline"
          :newValue="newValue"
          :rules="rules"
          v-if="inline"
        >
          <slot/>
          <template v-slot:action>
            <el-button
              @click="handleChange"
              icon="el-icon-check"
              size="small"
              type="primary"
            ></el-button>
            <el-button
              @click="handleHideEditing"
              icon="el-icon-close"
              size="small"
            ></el-button>
          </template>
        </ele-editable-wrapper-form>

        <!-- 弹窗形态 -->
        <template v-else>
          <el-popover
            :title="title"
            trigger="manual"
            v-model="visible"
          >
            <!-- 弹窗内容区 -->
            <ele-editable-wrapper-form
              :field="field"
              :inline="inline"
              :newValue="newValue"
              :rules="rules"
            >
              <slot/>
              <template v-slot:action>
                <div style="text-align: right; margin: 0">
                  <el-button
                    @click="handleHideEditing"
                    size="small"
                  >取消</el-button>
                  <el-button
                    @click="handleChange"
                    size="small"
                    type="primary"
                  >确定</el-button>
                </div>
              </template>
            </ele-editable-wrapper-form>

            <!-- 弹窗展示区 -->
            <ele-editable-wrapper-display
              :displayValue="displayValue"
              :emptyText="emptyText"
              :isEmpty="isEmpty"
              :type="type"
              @click="handleHideEditing"
              slot="reference"
            />
          </el-popover>
        </template>
      </template>

      <!-- 没有正在编辑 -->
      <template v-else>
        <ele-editable-wrapper-display
          :displayValue="displayValue"
          :emptyText="emptyText"
          :isEmpty="isEmpty"
          :type="type"
          @click="handleShowEditing"
        />
      </template>
    </template>
  </div>
</template>

<script>
import { on, off } from 'element-ui/src/utils/dom'
import EleEditableWrapperDisplay from './wrapper/EleEditableWrapperDisplay'
import EleEditableWrapperForm from './wrapper/EleEditableWrapperForm'

export default {
  name: 'EleEditableWrapper',
  components: {
    EleEditableWrapperDisplay,
    EleEditableWrapperForm
  },
  props: {
    // 弹窗标题
    title: String,
    // 用于校检
    field: {
      type: String,
      required: true
    },
    // 是否弹窗
    inline: {
      type: Boolean,
      default: false
    },
    // 用于判断是否需要包裹
    type: {
      type: String,
      required: true
    },
    // 自定义属性
    customAttrs: {
      type: Object,
      default () {
        return {}
      }
    },
    // 是否为空
    isEmpty: {
      type: Boolean,
      required: true
    },
    // 是否被包裹
    noWrapper: Boolean,
    // 空值时显示的文字
    emptyText: {
      type: String,
      required: true
    },
    // 校检规则
    rules: [Object, Array],
    // 新值(用于校检)
    newValue: [String, Number, Boolean, Array, Date],
    // 显示的值(用于显示)
    displayValue: [String, Number, Boolean, Array, Date]
  },
  data () {
    return {
      // 显示
      visible: false,
      // 是否正在被编辑
      isEditing: false
    }
  },
  methods: {
    // 提交
    handleChange () {
      this.visible = false
      this.$nextTick(() => {
        this.isEditing = false
      })
      this.$emit('submit')
    },
    // 隐藏编辑
    handleHideEditing () {
      if (this.visible === false) return
      this.visible = false
      this.$nextTick(() => {
        this.isEditing = false
      })
      this.$emit('cancel')
    },
    // 显示编辑
    handleShowEditing () {
      this.hideOthers()
      this.isEditing = true
      this.$nextTick(() => {
        this.visible = true
      })
    },
    // 隐藏其他
    hideOthers () {
      const components = this.findComponentsDownward(this.$root, 'EleEditableWrapper')
      components.forEach((component) => component.handleHideEditing())
    },
    // 在上下文下, 根据组件名进行组件查找
    findComponentsDownward (context, componentName) {
      return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child)
        const foundChilds = this.findComponentsDownward(child, componentName)
        return components.concat(foundChilds)
      }, [])
    }
  },

  mounted () {
    // 其他地方关闭弹窗
    on(document, 'click', this.handleHideEditing, false)
  },
  destroyed () {
    off(document, 'click', this.handleHideEditing, false)
  }
}
</script>
