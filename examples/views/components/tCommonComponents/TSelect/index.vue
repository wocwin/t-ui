<template>
  <div class="t-select-demo">
    <t-layout sectionTitle="下拉选择组件">
      <div class="content-main t-margin20">
        <div>常规用法</div>
        <t-select
          placeholder="请选择爱好"
          v-model="selectValue"
          @selChange="selChange"
          :options="optionsList"
        />
        <div>多选</div>
        <t-select
          multiple
          placeholder="请选择爱好"
          v-model="multipleValue"
          @selChange="multipleChange"
          :options="optionsList"
        />
        <div>允许用户创建新条目</div>
        <t-select
          allowCreate
          multiple
          placeholder="请选择爱好"
          v-model="allowCreateValue"
          @selChange="allowCreateeChange"
          :options="optionsList"
        />
      </div>
    </t-layout>
  </div>
</template>

<script>
export default {
  name: 't-select-demo',
  data () {
    return {
      selectValue: '',
      multipleValue: '', // 多选
      allowCreateValue: '', // 允许用户创建新条目
      optionsList: [
        { label: '吉他', value: '0' },
        { label: '看书', value: '1' },
        { label: '美剧', value: '2' },
        { label: '旅游', value: '3' },
        { label: '音乐', value: '4' }
      ]
    }
  },
  methods: {
    selChange (item) {
      console.log('常规', item)
    },
    multipleChange (item) {
      console.log('多选', item)
    },
    allowCreateeChange (item) {
      console.log('允许用户创建新条目', item)
    }
  }
}
</script>
