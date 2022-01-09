<template>
  <el-form
    :inline="inline"
    :model="{ [field]: newValue }"
    :rules="rules"
    :show-message="false"
    onsubmit="return false"
    style="max-width: 280px"
  >
    <!-- 内容 -->
    <el-form-item
      :prop="field"
      :style="{
        'margin-bottom': inline ? '0' : '8px'
      }"
    >
      <slot/>
    </el-form-item>

    <!-- 操作区 -->
    <el-form-item style="margin-bottom: 0px">
      <slot name="action"/>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  name: 'EleEditableWrapperForm',
  props: {
    // 行内
    inline: Boolean,
    // 用于校检
    field: {
      type: String,
      required: true
    },
    // 校检规则
    rules: [Object, Array],
    // 新值(用于校检)
    newValue: [String, Number, Boolean, Array, Date]
  }
}
</script>
