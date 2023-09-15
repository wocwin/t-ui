<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-module-form
        title="自定义返回事件"
        ref="sourceForm"
        :formOpts="formOpts"
        isGoBackEvent
        :submit="submit"
        @back="back"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  name: 'TModuleFormDemoBase',
  data() {
    return {
      formOpts: {
        goodsInformation: {
          title: '货品信息',
          name: 'goodsInformation',
          ref: null,
          opts: {
            formData: {
              id: `${Math.floor(Math.random() * 10 + 1)}`, // *唯一ID
              account: '', // *用户账号
              password: '', // *用户密码
              name: '', // *用户昵称
              sex: '', // *性别: 0:男 1:女
              hobby: [], // *爱好: 0:男 1:女
              accountType: '', // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
              status: '' // *状态: 0：停用，1：启用(默认为1)',
            },
            fieldList: [
              { label: '账号', value: 'account', type: 'input', comp: 'el-input', event: 'account' },
              { label: '密码', value: 'password', type: 'password', comp: 'el-input' },
              { label: '昵称', value: 'name', type: 'input', comp: 'el-input' },
              { label: '性别', value: 'sex', type: 'select-arr', comp: 'el-select', list: 'sexList', bind: { disabled: false }, arrLabel: 'key', arrKey: 'value' },
              { label: '平台用户', value: 'accountType', type: 'select-obj', comp: 'el-select', list: 'accountTypeList' },
              { label: '状态', value: 'status', type: 'select-arr', list: 'statusList', comp: 'el-select', arrLabel: 'key', arrKey: 'value' },
              { label: '爱好', value: 'hobby', type: 'checkbox', comp: 'el-checkbox-group', list: 'hobbyList', event: 'checkbox', widthSize: 1 },
            ],
            // 相关列表
            listTypeInfo: {
              hobbyList: [
                { label: '吉他', value: '0' },
                { label: '看书', value: '1' },
                { label: '美剧', value: '2' },
                { label: '旅游', value: '3' },
                { label: '音乐', value: '4' }
              ],
              sexList: [
                { key: '女', value: 1 },
                { key: '男', value: 0 }
              ],
              accountTypeList: {
                0: '手机用户',
                1: '论坛用户',
                2: '平台用户'
              },
              statusList: [
                { key: '启用', value: 1 },
                { key: '停用', value: 0 }
              ]
            }
          }
        },
        freight: {
          title: '运费信息',
          name: 'freight',
          opts: {
            formData: {
              phone: '', // 手机号码
              createDate: '', // 创建时间
              valDate: '', // el日期选择范围
              wechat: '', // 微信
              qq: '', // qq
              email: '', // 邮箱
              desc: '', // 描述
              number: '', // 计算器
            },
            fieldList: [
              { label: '手机号码', value: 'phone', type: 'input', comp: 'el-input', bind: { maxlength: 11 } },
              { label: '创建时间', value: 'createDate', type: 'year', bind: { valueFormat: 'yyyy' }, comp: 'el-date-picker' },
              { label: 'element日期', value: 'valDate', type: 'daterange', comp: 'el-date-picker', bind: { rangeSeparator: '-', startPlaceholder: '开始日期', endPlaceholder: '结束日期', valueFormat: 'yyyy-MM-dd' } },
              { label: '微信', value: 'wechat', type: 'input', comp: 'el-input' },
              { label: 'QQ', value: 'qq', type: 'input', comp: 'el-input' },
              { label: '邮箱', value: 'email', type: 'input', comp: 'el-input' },
              { label: '计数器', value: 'number', type: 'inputNumber', bind: { controls: false, min: 2, max: 99 }, comp: 'el-input-number' },
              { label: '描述', value: 'desc', type: 'textarea', comp: 'el-input', widthSize: 1 }
            ]
          }
        },
        loadingDate: {
          name: 'loadingDate',
          title: '承运信息',
          ref: null,
          opts: {
            formData: {
              id: `${Math.floor(Math.random() * 10 + 1)}`, // *唯一ID
              createDate: '', // 创建时间
              valDate: '', // el日期选择范围
              qq: '', // qq
              accountType: '', // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
              email: '', // 邮箱
              desc: '', // 描述
              number: '', // 计算器
              status: '' // *状态: 0：停用，1：启用(默认为1)',
            },
            fieldList: [
              { label: '创建时间', value: 'createDate', type: 'year', bind: { valueFormat: 'yyyy' }, comp: 'el-date-picker' },
              {
                labelRender: () => {
                  return (
                    <div class="label_render">
                      <div>element日期</div>
                      <el-tooltip >
                        <template slot="content">
                          <span>总质量4.5吨及以下普通货运车辆的，可填“车籍地6位行政区域代码+000000”。</span>
                        </template>
                        <i class="el-icon-warning-outline" style="cursor: pointer;margin-right:2px;" />
                      </el-tooltip>
                    </div>
                  )
                },
                value: 'valDate',
                type: 'daterange',
                comp: 'el-date-picker',
                bind: { rangeSeparator: '-', startPlaceholder: '开始日期', endPlaceholder: '结束日期', valueFormat: 'yyyy-MM-dd' }
              },
              { label: 'QQ', value: 'qq', type: 'input', comp: 'el-input' },
              { label: '邮箱', value: 'email', type: 'input', comp: 'el-input' },
              { label: '计数器', value: 'number', type: 'inputNumber', bind: { controls: false, min: 2, max: 99 }, comp: 'el-input-number' },
              { label: '描述', value: 'desc', type: 'textarea', comp: 'el-input', widthSize: 1 }
            ],
            // 相关列表
            listTypeInfo: {
              sexList: [
                { key: '女', value: 1 },
                { key: '男', value: 0 }
              ],
              accountTypeList: {
                0: '手机用户',
                1: '论坛用户',
                2: '平台用户'
              },
              statusList: [
                { key: '启用', value: 1 },
                { key: '停用', value: 0 }
              ]
            }
          }
        }
      }
    }
  },
  // 方法
  methods: {
    back() {
      console.log('自定义返回事件')
    },
    // 提交form表单
    submit(data) {
      console.log('最终提交数据', data)
    }
  }
}
</script>
