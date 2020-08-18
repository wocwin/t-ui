# TForm表单组件
---

<common-code-format description="">
  <docsComponents-TForm-index></docsComponents-TForm-index>
  <highlight-code slot="codeText">
    <template>
        <div class="form-data">
          <t-form
            :ref-obj.sync="formInfo.ref"
            :form-data="formInfo.formData"
            :field-list="formInfo.fieldList"
            :rules="formInfo.rules"
            :operator-list="formInfo.operatorList"
            :list-type-info="listTypeInfo"
            @handleClick="handleClick"
            @handleEvent="handleEvent"
          >
            <!-- 自定义插槽-选择头像 -->
            <template #form-avatar>
              <div
                class="slot-avatar"
                v-for="checkedItem in uploadFile.checkedList"
                :key="checkedItem.type"
              >
                <t-upload-file
                  :attachmentType="checkedItem.type"
                  @uploadSuccess="pushUploadItem"
                  @deleteSuccess="pushUploadItem"
                />
              </div>
            </template>
          </t-form>
        </div>
    </template>
    <script>
        export default {
            data () {
              const isEmail = (rule, value, callback) => {
                const reg = /^([a-z0-9A-Z]+[-|._]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/
                if (!reg.test(value)) {
                  callback(new Error('请输入正确格式的邮箱'))
                } else {
                  callback()
                }
              }
              return {
                // uploadFile上传图片
                uploadFile: {
                  fmFileList: [],
                  uploadObj: {},
                  checkedList: [
                    {
                      check: true,
                      type: '001'
                    }
                  ]
                },
                // form表单
                formInfo: {
                  ref: null,
                  formData: {
                    id: '', // *唯一ID
                    account: '', // *用户账号
                    password: '', // *用户密码
                    name: '', // *用户昵称
                    type: '', // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
                    sex: '', // *性别: 0:男 1:女
                    hobby: [], // *爱好: 0:男 1:女
                    avatar: '', // 头像
                    phone: '', // 手机号码
                    createDate: '', // 创建时间
                    startDate: '', // 开始日期
                    endDate: '', // 结束日期
                    wechat: '', // 微信
                    qq: '', // qq
                    email: '', // 邮箱
                    desc: '', // 描述
                    status: '' // *状态: 0：停用，1：启用(默认为1)',
                  },
                  fieldList: [
                    { label: '账号', value: 'account', type: 'input', event: 'account' },
                    { label: '密码', value: 'password', type: 'password' },
                    { label: '昵称', value: 'name', type: 'input' },
                    { label: '性别', value: 'sex', type: 'select', list: 'sexList' },
                    { label: '爱好', value: 'hobby', type: 'checkbox', list: 'hobbyList', event: 'checkbox' },
                    { label: '头像', value: 'avatar', type: 'slot' },
                    { label: '手机号码', value: 'phone', type: 'input' },
                    { label: '创建时间', value: 'createDate', type: 'date', event: 'date' },
                    { label: '时间范围', startDate: 'startDate', endDate: 'endDate', type: 't-date', event: 'date' },
                    { label: '微信', value: 'wechat', type: 'input' },
                    { label: 'QQ', value: 'qq', type: 'input' },
                    { label: '邮箱', value: 'email', type: 'input', rules: [{ required: true, message: '邮箱不能为空！' }, { validator: isEmail }] },
                    { label: '描述', value: 'desc', type: 'textarea' },
                    { label: '状态', value: 'status', type: 'select', list: 'statusList' }
                  ],
                  rules: {
                    account: [
                      { required: true, message: '请输入账号', trigger: 'blur' },
                      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                      { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    name: [
                      { required: true, message: '请输入昵称', trigger: 'blur' }
                    ],
                    phone: [
                      { required: true, message: '请输入手机号码', trigger: 'blur' }
                    ],
                    sex: [
                      { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    hobby: [
                      { type: 'array', required: true, message: '请至少选择一个爱好', trigger: 'change' }
                    ]
                  },
                  operatorList: [
                    { label: '提交', type: 'danger', fun: this.submitForm },
                    { label: '重置', type: 'primary', fun: this.resetForm }
                  ]
                },
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
                  accountTypeList: [
                    { key: '手机用户', value: 0 },
                    { key: '论坛用户', value: 1 },
                    { key: '平台用户', value: 2 }
                  ],
                  statusList: [
                    { key: '启用', value: 1 },
                    { key: '停用', value: 0 }
                  ]
                }
              }
            },
            // 方法
            methods: {
              // 上传头像
              pushUploadItem (val, attachmentType) {
                console.log(val, attachmentType)
                let attachmentNo = val.res
                this.uploadFile.uploadObj[attachmentType] = attachmentNo
                if (!this.uploadFile.uploadObj[attachmentType] || this.uploadFile.uploadObj[attachmentType].length === 0) {
                  delete this.uploadFile.uploadObj[attachmentType]
                }
                let tempFileList = []
                for (let key of Object.keys(this.uploadFile.uploadObj)) {
                  let uploadListItem = {
                    attachmentNo: this.uploadFile.uploadObj[key],
                    attachmentType: key
                  }
                  tempFileList.push(uploadListItem)
                }
                this.uploadFile.fmFileList = tempFileList
              },
              // 触发事件
              handleEvent (type, val, key) {
                switch (type) {
                  // 日期显示
                  case 'date':
                    console.log(1111111, val, type, key)
                    this.formInfo.formData[key] = val
                    break
                  case 'checkbox':
                    console.log(2222, val, type, key)
                    break
                }
              },
              // 提交form表单
              submitForm () {
                this.formInfo.ref.validate((valid) => {
                  console.log(88, valid)
                  if (!valid) return
                  console.log(77, this.formInfo.formData)
                })
              },
              // 重置form表单
              resetForm () {
                Object.assign(this.$data.formInfo.formData, this.$options.data().formInfo.formData)
              }
            }
        }
    </script>
  </highlight-code>
</common-code-format>

# TForm 参数配置

### 1. 简介：基于ElementUI Form表单组件的二次封装，着重于数据层面，HTML一行代码
 Form表单组件
**代码示例：**
```
     <t-form
      :ref-obj.sync="formInfo.ref"
      :form-data="formInfo.formData"
      :field-list="formInfo.fieldList"
      :rules="formInfo.rules"
      :operator-list="formInfo.operatorList"
      :label-width="formInfo.labelWidth"
      :list-type-info="listTypeInfo"
      @handleEvent="handleEvent"
    >
      <!-- 自定义插槽-选择头像 -->
      <template #form-avatar>
        <div
          class="slot-avatar"
          v-for="checkedItem in uploadFile.checkedList"
          :key="checkedItem.type"
        >
          <t-upload-file
            :attachmentType="checkedItem.type"
            @uploadSuccess="pushUploadItem"
            @deleteSuccess="pushUploadItem"
          />
        </div>
      </template>
    </t-form>
    //注意:ref-obj(form校验规则相当于ref)必须要‘.sync’修饰符
```
### 2. events

|     事件名     | 说明   |   返回值   |
| :---------: | :--- | :-----: |
| handleEvent| 单个查询条件触发事件 | fieldList中type/查询条件输入的值/fieldList中event值 |
### 3. 配置参数

| 参数          | 说明                             | 类型         | 是否必须 |
| ------------- | ------------------------------- | -------------| ------- |
| refObj      | form表单校验规则方法 （可以参考elementUI Form表单方法中的validate）| obj      | 是     |
| className      | 自定义类名                       | String      | 否     |
| listTypeInfo  | 下拉选择数据源（type:'select'有效） | Object     | 否      |
| fieldList     | form表单每项list                      | Array       | 是      |
| ---type       | form表单每一项类型（若值为slot——新增自定义插槽form-'value')| String  | 是      |
| ---label     | form表单每一项title                    | String       | 是      |
| ---value     | form表单每一项传给后台的参数              | String     | 是      |
| ---startDate  | 仅仅针对（type:'t-date'有效）与 endDate同时使用 | String     |  否      |
| ---endDate  | 仅仅针对（type:'t-date'有效）选择开始——结束日期  | String     |  否      |
| ---plusTime  | 仅仅针对（type:'t-date'有效）是否带后缀时分秒| Boolean     |  否      |
| ---valueFormat| type为date/t-date 日期返回值格式         | String        | 是      |
| ---rules     | 每一项输入框的表单校验规则            | Object/Array  | 否     |
| ---list     | 下拉选择数据源（仅仅对type:'select'有效）| String  | 否     |
| ---event     | 每个输入框事件标志                 | Array        | 是      |
| formData        | 参数       | Object      | 是    |
| labelWidth        | label宽度                  | String | 否    |
| rules        | 规则（可依据elementUI配置）      | Object/Array | 否    |
| operatorList        | 操作按钮list      | Array | 否    |
| isOperator        | 是否显示操作按钮      | Boolean | 否    |

### 4. 关于element-ui el-form提供的一些方法/属性可直接使用，无需其他配置
