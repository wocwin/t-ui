# 弹窗组件
---

<common-code-format title="基本弹窗" description="在组件中需配置：属性visible是否显示弹窗；title：弹窗标题（默认：温馨提示）；@update:visible 右上删除或取消事件；新增v-dialogDrag指令可按头部拖拽弹窗；ElementUI中el-dialog的属性皆可用(如：close-on-click-modal属性——点击空白区域是否关闭弹窗)">
  <docsComponents-TDialog-index></docsComponents-TDialog-index>
  <highlight-code slot="codeText">
    <template>
       <div class="t-dialog-demo" style="width:100%;min-height:100px;">
        <el-button type="danger" @click="openDialog">点击打开弹窗</el-button>
        <t-dialog title="请选择企业" class="ent-choose" :visible="dialogSelectEnt" @update:visible="cancel">
          <div class="select-ent-box flex-box flex-col">
            <div
              style="width:100%;"
              v-for="item in entList"
              :key="item.id"
              class="radio-line-item t-overflow-hidden"
              :class="entSelectType===item.id?'radioSelected':''"
              @click="selectType(item)">
              <i v-if="entSelectType===item.id" class="el-icon-check icon-check"></i>
              上海某某电子商务有限公司
              <span style="color:#999;">`(企业编码:60003627)`</span>
            </div>
          </div>
        </t-dialog>
      </div>
    </template>
    <script>
        export default {
             data () {
            return {
              dialogSelectEnt: false,
              entSelectType: '',
              entList: [{ 'id': 107, 'entName': '上海某某电子商务有限公司', 'entCode': '60003627', 'entType': null, 'entIdPcloud': '717380413542105088' }]
            }
          },
          mounted () {
            this.entSelectType = this.entList[0].id
          },
          // 方法
          methods: {
            openDialog () {
              this.dialogSelectEnt = true
            },
            // 选择企业
            selectType (item) {
              this.entSelectType = item.id
              this.dialogSelectEnt = false
            },
            cancel () {
              this.dialogSelectEnt = false
            }
          }
        }
    </script>
  </highlight-code>
</common-code-format>

# 短信验证
---

<common-code-format title="短信验证弹窗" description="在组件中需配置：属性phoneVisible是否显示弹窗；legalPhone：展示的手机号码；personTxt：展示谁的手机号码；@update:visible 右上删除或取消事件；新增v-dialogDrag指令可按头部拖拽弹窗；ElementUI中el-dialog的属性皆可用(如：close-on-click-modal属性——点击空白区域是否关闭弹窗)">
  <docsComponents-TDialog-sms></docsComponents-TDialog-sms>
  <highlight-code slot="codeText">
    <template>
       <el-button type="danger" @click="openDialog">短信验证弹窗</el-button>
        <t-phone
          :phoneVisible="phoneVisible"
          :legalPhone="legalPhone"
          @update:visible="phoneHide"
          :personTxt="personTxt"
          @phoneConfirm="phoneConfirm"
        />
    </template>
    <script>
        export default {
            data () {
              return {
                phoneVisible: false,
                personTxt:'法人',
                legalPhone: '13888888888' // 法人手机号码
              }
          },
          methods: {
            openDialog () {
              this.phoneVisible = true
            },
            // 点击确定
            phoneConfirm (smsCode) {
              console.log('点击确定按钮', smsCode)
              this.phoneVisible = false
            },
            phoneHide () {
              this.phoneVisible = false
            }
          }
        }
    </script>
  </highlight-code>
</common-code-format>

# pdf文件预览
---

<common-code-format title="pdf文件预览弹窗" description="在组件中需配置：属性protocolVisible是否显示弹窗；protocolTitle：pdf文件名；@update:visible 右上删除或取消事件；新增v-dialogDrag指令可按头部拖拽弹窗；ElementUI中el-dialog的属性皆可用(如：close-on-click-modal属性——点击空白区域是否关闭弹窗)">
  <docsComponents-TDialog-protocol></docsComponents-TDialog-protocol>
  <highlight-code slot="codeText">
    <template>
       <div class="t-dialog-demo" style="width:100%;min-height:100px;padding:15px;">
        <el-button type="danger" @click="openDialog">PDF预览弹窗</el-button>
        <t-protocol
          :protocolVisible="protocolVisible"
          :protocolTitle="protocolTitle"
          :protocolSrc="protocolSrc"
          ref="pdf"
          @update:visible="protocolHide"
        />
      </div>
    </template>
    <script>
        export default {
           data () {
            return {
              protocolVisible: false,
              protocolTitle: '协议预览',
              protocolSrc: '' // 协议路径
            }
          },
          methods: {
            openDialog () {
              this.protocolVisible = true
            },
            protocolHide () {
              this.protocolVisible = false
            }
          }
        }
    </script>
  </highlight-code>
</common-code-format>
