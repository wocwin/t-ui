(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{854:function(t,e,a){"use strict";a.r(e);var o={name:"dhFormDemo",data:function(){return{formOpts:{ref:null,formData:{accountType:"",wechat:"",desc:"",status:""},fieldList:[{label:"平台用户",placeholder:"对象自定义option插槽",value:"accountType",type:"select-obj",comp:"el-select",childSlotName:"accountType"},{label:"状态",placeholder:"数组自定义option插槽",value:"status",type:"select-arr",comp:"el-select",childSlotName:"status"},{label:"微信",value:"wechat",slotName:"wechat"},{label:"描述",value:"desc",type:"textarea",comp:"el-input",widthSize:1}],operatorList:[{label:"提交",type:"danger",fun:this.submitForm},{label:"重置",type:"primary",fun:this.resetForm}],listTypeInfo:{statusList:[{key:"启用",value:1},{key:"停用",value:0}],accountTypeList:{0:"手机用户",1:"论坛用户",2:"平台用户"}}}}},methods:{submitForm:function(){var t=this;this.formOpts.ref.validate((function(e){e&&console.log("最终数据",t.formOpts.formData)}))},resetForm:function(){Object.assign(this.$data.formOpts.formData,this.$options.data().formOpts.formData)}}},r=a(2),s=Object(r.a)(o,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("t-layout-page",[a("t-layout-page-item",[a("t-form",{attrs:{"ref-obj":t.formOpts.ref,formOpts:t.formOpts,widthSize:1},on:{"update:refObj":function(e){return t.$set(t.formOpts,"ref",e)},"update:ref-obj":function(e){return t.$set(t.formOpts,"ref",e)}},scopedSlots:t._u([{key:"wechat",fn:function(){return[a("div",{staticStyle:{display:"flex"}},[a("el-input",{attrs:{placeholder:"自定义输入框插槽"},model:{value:t.formOpts.formData.wechat,callback:function(e){t.$set(t.formOpts.formData,"wechat",e)},expression:"formOpts.formData.wechat"}})],1)]},proxy:!0},{key:"accountType",fn:function(){return t._l(t.formOpts.listTypeInfo.accountTypeList,(function(t,e){return a("el-option",{key:e,attrs:{label:t,value:e}})}))},proxy:!0},{key:"status",fn:function(){return t._l(t.formOpts.listTypeInfo.statusList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.key,value:t.value}})}))},proxy:!0}])})],1)],1)}),[],!1,null,null,null);e.default=s.exports}}]);