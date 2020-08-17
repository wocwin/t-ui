<template>
  <div class="t-input">
    <t-layout sectionTitle="input组件">
      <div class="content-main t-margin20">
        <div>默认方式显示金额</div>
        <t-input placeholder="请输入金额" @numblur="blurVal" v-model="money"></t-input>
        <div>显示金额tip（大写）控制isTip</div>
        <t-input placeholder="请输入金额" isTip v-model="money2"></t-input>
        <div>显示天数</div>
        <t-input
          placeholder="请输入天数"
          inputType="days"
          appendTitle="天"
          @numblur="blurVal1"
          v-model="day"
        ></t-input>
        <div>显示百分比</div>
        <t-input placeholder="请输入" inputType="percent" appendTitle="%" v-model="percent"></t-input>
        <div>显示电话号码</div>
        <t-input
          placeholder="请输入电话号码"
          :isShow="false"
          inputType="tel"
          @numblur="blurVal2"
          v-model="tel"
        ></t-input>
      </div>
    </t-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      money: null,
      day: null,
      money2: null,
      percent: null,
      tel: ''
    }
  },
  methods: {
    blurVal (val) {
      console.log('获取输入的值', val)
    },
    blurVal1 (val) {
      console.log('获取输入的值1', val)
    },
    blurVal2 (val) {
      console.log('获取输入的值2', val)
    }
  }
}
</script>
