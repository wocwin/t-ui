(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{762:function(module,__webpack_exports__,__webpack_require__){"use strict";var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(454),core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(17),core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1__),core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(63),core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2__),core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(33),core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_3__),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(55),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_4__);__webpack_exports__.a={name:"dhFormDemo",data:function(){var e=this;return{dialogSelectEnt:!1,formAdd:{ref:null,formData:{label:null,value:null,comp:null,type:null,rules:null,bind:null,list:null,arrLabel:null,arrKey:null},fieldList:[{label:"显示名称",value:"label",type:"input",comp:"el-input"},{label:"定义字段",value:"value",type:"input",comp:"el-input"},{label:"组件名称",value:"comp",type:"input",comp:"el-input",eventHandle:{blur:function(_,t){return e.compBlur(_,t)}}},{label:"组件类型",value:"type",type:"input",comp:"el-input"},{label:"校验规则",value:"rules",type:"input",comp:"el-input"},{label:"自定义属性",value:"bind",type:"input",comp:"el-input"}],rules:{label:[{required:!0,message:"请输入显示名称",trigger:"blur"}],value:[{required:!0,message:"请输入定义字段",trigger:"blur"}],comp:[{required:!0,message:"请输入组件名称",trigger:"blur"}],type:[{required:!0,message:"请输入组件类型",trigger:"blur"}]}},formOpts:{ref:null,formData:{account:null},fieldList:[{label:"账号",value:"account",type:"input",comp:"el-input",event:"account"}],operatorList:[{label:"提交",type:"danger",fun:this.submitForm},{label:"新增项",type:"primary",fun:this.add},{label:"重置",type:"primary",fun:this.resetForm}],listTypeInfo:{hobbyList:[{label:"吉他",value:"0"},{label:"看书",value:"1"},{label:"美剧",value:"2"},{label:"旅游",value:"3"},{label:"音乐",value:"4"}],sexList:[{key:"女",value:1},{key:"男",value:0}],accountTypeList:{0:"手机用户",1:"论坛用户",2:"平台用户"},statusList:[{key:"启用",value:1},{key:"停用",value:0}]}}}},methods:{add:function(){this.dialogSelectEnt=!0},del:function(e){console.log("删除项--idex",e),this.formOpts.fieldList.splice(e,1)},submit:function submit(){var _this2=this;this.formAdd.ref.validate((function(valid){if(valid){console.log("最终数据",_this2.formAdd.formData);var formData=JSON.parse(JSON.stringify(_this2.formAdd.formData));formData.bind=eval("("+formData.bind+")"),formData.rules=eval("("+formData.rules+")"),_this2.$set(_this2.formOpts.formData,formData.value,null),_this2.formOpts.fieldList.push(formData),console.log("最终数据---22",formData,_this2.formOpts.fieldList),_this2.cancel()}}))},cancel:function(){this.dialogSelectEnt=!1,this.formAdd.ref.resetFields()},compBlur:function(e,_){var t=e.type,l=_.formData;if(console.log("compBlur事件监听".concat(t,"："),t,l.comp),"el-select"===l.comp){var r;(r=this.formAdd.fieldList).splice.apply(r,[6,0].concat([{label:"下拉list",value:"list",type:"input",comp:"el-input"},{label:"arrLabel",value:"arrLabel",type:"input",comp:"el-input"},{label:"arrKey",value:"arrKey",type:"input",comp:"el-input"}])),console.log("this.formAdd",this.formAdd)}else this.formAdd.fieldList.splice(6,3)},handleEvent:function(e,_){e},submitForm:function(){var e=this;this.formOpts.ref.validate((function(_){_&&console.log("最终数据",e.formOpts.formData)}))},resetForm:function(){Object.assign(this.$data.formOpts.formData,this.$options.data().formOpts.formData)}}}},975:function(e,_,t){"use strict";t.r(_);var l=t(762).a,r=t(2),a=Object(r.a)(l,(function(){var e=this,_=e.$createElement,t=e._self._c||_;return t("t-layout-page",[t("t-layout-page-item",[t("t-form",{attrs:{"ref-obj":e.formOpts.ref,formOpts:e.formOpts,widthSize:1,isDynamic:""},on:{"update:refObj":function(_){return e.$set(e.formOpts,"ref",_)},"update:ref-obj":function(_){return e.$set(e.formOpts,"ref",_)},handleEvent:e.handleEvent,del:e.del}})],1),e._v(" "),t("t-dialog",{attrs:{title:"请输入新增项",width:"40%",visible:e.dialogSelectEnt},on:{"update:visible":e.cancel}},[t("t-form",{attrs:{"ref-obj":e.formAdd.ref,formOpts:e.formAdd,widthSize:1},on:{"update:refObj":function(_){return e.$set(e.formAdd,"ref",_)},"update:ref-obj":function(_){return e.$set(e.formAdd,"ref",_)},handleEvent:e.handleEvent}}),e._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(_){e.dialogSelectEnt=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("确 定")])],1)],1)],1)}),[],!1,null,null,null);_.default=a.exports}}]);