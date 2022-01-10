<template>
  <div class="step-wizard">
    <t-layout sectionTitle="步骤组件">
      <div class="content-main t-margin20">
        步骤组件
        <t-step-wizard
          style="min-height:400px;"
          :stepData="stepData"
          :lastBtnTitle="lastBtnTitle"
          :active="active"
          :successTitle="successTitle"
          @complete="complete"
        >
          <template #first>第一步</template>
          <template #second>第二步骤</template>
          <template #third>第三步骤</template>
        </t-step-wizard>
      </div>
    </t-layout>
  </div>
</template>

<script>
export default {
  name: 'stepWizard',
  data () {
    return {
      active: 0,
      stepData: [
        {
          id: 1,
          title: '创建账户',
          slotName: 'first',
          btnArr: [
            {
              btnTitle: '下一步',
              params: 1,
              fn: this.next
            }
          ]
        },
        {
          id: 2,
          title: '填写基础信息',
          slotName: 'second',
          btnArr: [
            {
              btnTitle: '上一步',
              params: 2,
              fn: this.back
            },
            {
              btnTitle: '下一步',
              params: 2,
              fn: this.next
            }
          ]
        },
        {
          id: 3,
          title: '填写用户信息',
          slotName: 'third',
          btnArr: [
            {
              btnTitle: '上一步',
              params: 3,
              fn: this.back
            },
            {
              btnTitle: '下一步',
              params: 3,
              fn: this.next
            }
          ]
        },
        {
          id: 4,
          title: '注册成功'
        }
      ],
      lastBtnTitle: '提交资料',
      successTitle: '企业信息填写完成，等待提交认证资料，经*****平台审核通过后即可办理业务'
    }
  },
  methods: {
    // 下一步
    next (val) {
      switch (val.params) {
        case 1:
          this.active += 1
          break
        case 2:
          this.active += 1
          break
        case 3:
          this.active += 2
          break
        case 4:
          console.log(22222222222)
          break
      }
    },
    // 上一步
    back (val) {
      switch (val.params) {
        case 2:
          this.active -= 1
          break
        case 3:
          this.active -= 1
          break
        case 4:
          console.log(111111111)
          break
      }
    },
    // 完成
    complete () {
      this.active = 0
    }
  }
}
</script>
