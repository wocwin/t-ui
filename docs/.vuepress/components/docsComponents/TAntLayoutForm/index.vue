<template>
  <div class="dh-layout-form-demo" style="width:100%;">
    <a-button type="danger" @click="clickHandle">表单页面</a-button>
    <a-button type="danger" @click="clickHandle1">详情页面</a-button>
    <t-layout-page style="position: relative;width:100%;">
      <t-ant-layout-form
        :visible.sync="visible"
        title="单子表表单"
        ref="layoutForm"
        sub-title="弹窗无法支持的采用复杂表单"
        :wrapperCol="{span:24}"
        :formOpts="formOpts"
        :get-container="()=> $el"
        :submit="submit"
        :tabs="tabs"
        @validateError="validateError"
      >
        <template #user>
          <div>
            表单自定义插槽
            <a-button class="btn" @click="empty">清空表单</a-button>
          </div>
        </template>
        <template slot="tab1">tab切换</template>
        <template slot="tab2">tab2222切换</template>
      </t-ant-layout-form>
      <t-ant-layout-form
        :visible.sync="visible1"
        title="详情页面"
        sub-title="多块详情页面"
        handleType="desc"
        :descData="descData"
        :get-container="()=> $el"
        :tabs="tabs"
        @tabsChange="tabsChange1"
      >
        <!-- 自定义插槽 -->
        <template slot="desc2">
          <a-button>自定义插槽</a-button>
          <a-button>自定义插槽</a-button>
        </template>
        <template slot="extra">
          <a-button>按钮1</a-button>
          <a-button>按钮2</a-button>
        </template>
        <!-- value自定义插槽 -->
        <template #text>
          <div>value自定义插槽</div>
        </template>
        <template slot="tab1">tab切换</template>
        <template slot="tab2">tab2222切换</template>
      </t-ant-layout-form>
    </t-layout-page>
  </div>
</template>
<script>
import { Input, Select, Slider, DatePicker, Radio, Checkbox, Switch } from 'ant-design-vue'
export default {
  name: 'dh-layout-form-demo',
  data () {
    return {
      visible: false,
      visible1: false,
      tabs: [
        {
          key: 'tab1',
          title: '物料管理'
        },
        {
          key: 'tab2',
          title: '物料管理22'
        }
      ],
      formOpts: {
        form1: {
          title: '基础信息',
          opts: {
            data1: {
              label: '姓名',
              gutter: 4,
              rules: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 3, max: 5, message: '长度3到5个字符', trigger: 'blur' },
              ],
              bind: {
                allowClear: true
              },
              comp: Input
            },
            data2: {
              label: '性别',
              comp: Select,
              changeEvent: 'change',
              bind: {
                placeholder: '请选择'
              },
              child: [
                {
                  comp: Select.Option,
                  text: '男',
                  value: '0'
                },
                {
                  comp: Select.Option,
                  text: '女',
                  value: '1'
                }
              ]
            },
            data3: {
              label: '地址',
              comp: Input
            },
            data4: {
              label: '滑动输入',
              comp: Slider,
              changeEvent: 'change',
            },
            data5: {
              label: '日期选择',
              comp: DatePicker,
              changeEvent: 'change',
            },
            data6: {
              label: '单选',
              comp: Radio.Group,
              changeEvent: 'change',
              bind: {
                options: [
                  {
                    label: '选型1',
                    value: 1
                  },
                  {
                    label: '选型2',
                    value: 2
                  },
                  {
                    label: '选型3',
                    value: 3
                  }
                ]
              }
            },
            data7: {
              label: '多选',
              comp: Checkbox.Group,
              changeEvent: 'change',
              bind: {
                options: [
                  {
                    label: '选型1',
                    value: 1
                  },
                  {
                    label: '选型2',
                    value: 2
                  },
                  {
                    label: '选型3',
                    value: 3
                  }
                ]
              }
            },
            data8: {
              label: '开关',
              comp: Switch,
              changeEvent: 'change'
            }
          }
        },
        form2: {
          title: '附属信息',
          opts: {
            data1: {
              label: '姓名',
              comp: Input,
              // rules: [
              //   { required: true, message: '请输入姓名', trigger: 'blur' },
              //   { min: 3, max: 5, message: '长度3到5个字符', trigger: 'blur' },
              // ],
            },
            data2: {
              label: () => {
                return (
                  <div style="display:flex;align-items: center;">
                    <div class="form-required">性别</div>
                    <a-popover>
                      <template slot="content">
                        <span>总质量4.5吨及以下普通货运车辆的，可填“车籍地6位行政区域代码+000000”。</span>
                      </template>
                      <a-icon type="exclamation-circle" style="cursor: pointer;margin-left:3px;" />
                    </a-popover>
                  </div>
                )
              },
              comp: Select,
              changeEvent: 'change',
              bind: {
                placeholder: '请选择'
              },
              child: [
                {
                  comp: Select.Option,
                  text: '男',
                  value: '0'
                },
                {
                  comp: Select.Option,
                  text: '女',
                  value: '1'
                }
              ]
            },
            data3: {
              label: '地址',
              comp: Input
            },
            data4: {
              label: '滑动输入',
              comp: Slider,
              changeEvent: 'change',
            },
            text: {
              label: '日期选择',
              comp: DatePicker,
              changeEvent: 'change',
              rules: [
                { required: true, message: '请选择日期选择', trigger: 'change' }
              ]
            },
            data6: {
              label: '单选',
              comp: Radio.Group,
              changeEvent: 'change',
              bind: {
                options: [
                  {
                    label: '选型1',
                    value: 1
                  },
                  {
                    label: '选型2',
                    value: 2
                  },
                  {
                    label: '选型3',
                    value: 3
                  }
                ]
              }
            },
            data7: {
              label: '多选',
              comp: Checkbox.Group,
              changeEvent: 'change',
              bind: {
                options: [
                  {
                    label: '选型1',
                    value: 1
                  },
                  {
                    label: '选型2',
                    value: 2
                  },
                  {
                    label: '选型3',
                    value: 3
                  }
                ]
              }
            },
            data8: {
              label: '开关',
              comp: Switch,
              changeEvent: 'change'
            }
          }
        },
        form3: {
          title: '自定义插槽',
          slotName: 'user'
        }
      },
      descData: {
        desc: {
          // title: '随便一个',
          data: [
            {
              label: '字段1',
              slotName: 'text',
              value: '内容1'
            },
            {
              label: '字段2',
              value: '内容2'
            },
            {
              label: '字段3',
              value: '内容3',
            },
            {
              label: '字段4',
              value: '内容4'
            },
            {
              label: '字段5',
              value: '内容5'
            },
            {
              label: '字段6',
              value: '666666',
              tooltip () {
                return (<div>666666</div>)
              }
            },
            {
              label: '字段7',
              value: '内容7'
            },
            {
              label: '字段8',
              value: '内容8'
            },
            {
              label: '字段9',
              value: '内容9'
            }
          ]
        },
        desc1: {
          title: '随便一个22',
          data: [
            {
              label: '字段1',
              value: '内容1'
            },
            {
              label: '字段2',
              value: '内容2'
            },
            {
              label: '字段3',
              value: '内容3',
            },
            {
              label: '字段4',
              value: '内容4'
            },
            {
              label: '字段5',
              value: '内容5'
            },
            {
              label: '字段6',
              value: '内容6'
            }
          ]
        },
        desc2: {
          title: '自定义插槽',
          slotName: 'desc2'
        }
      }
    }
  },
  methods: {
    // 错误校验
    validateError (form) {
      console.log('错误校验', form)
    },
    // tabs切换
    tabsChange1 (val) {
      console.log('tabs切换', val)
    },
    // 清空表单
    empty () {
      this.$refs.layoutForm.resetFormFields()
    },
    clickHandle () {
      this.visible = true
    },
    clickHandle1 () {
      this.visible1 = true
    },
    submit (form) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
          console.log('form', form)
        }, 3000)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.complex_form_table {
  padding: 0;
  ::v-deep .dh_layout_page_item {
    margin: 0;
    padding: 0;
  }
}
</style>
