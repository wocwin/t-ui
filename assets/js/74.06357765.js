(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{845:function(t,e,n){"use strict";n.r(e);n(6),n(21);var o={name:"btnisHide",data:function(){var t=this,e=this.$createElement;return{formOpts:{ref:null,formData:{account:null,name:null,email:null,desc:null},fieldList:[{label:"账号",value:"account",type:"input",comp:"el-input"},{label:"昵称",value:"name",type:"input",comp:"el-input"},{label:"邮箱",value:"email",type:"input",comp:"el-input"},{label:"描述",value:"desc",type:"textarea",comp:"el-input"}],operatorList:[{label:"提交",bind:{type:"danger"},fun:this.submitForm,isHideBtn:!1},{label:"重置",bind:{type:"primary"},fun:this.resetForm,isHideBtn:!1},{render:function(){return e("el-button",{attrs:{color:"#626aef"},on:{click:function(){return t.hideReset()}}},["隐藏显示重置按钮"])}},{render:function(){return e("el-button",{attrs:{type:"danger"},on:{click:function(){return t.hideSubmit()}}},["隐藏显示提交按钮"])}}]}}},methods:{handleEvent:function(t,e){switch(t){case"account":console.log("account--账号change事件",e,t)}},submitForm:function(){var t=this;this.formOpts.ref.validate((function(e){console.log(77,t.formOpts.formData),e&&console.log("最终数据",t.formOpts.formData)}))},resetForm:function(){Object.assign(this.$data.formOpts.formData,this.$options.data().formOpts.formData)},hideReset:function(){this.formOpts.operatorList.forEach((function(t){"重置"!==t.label||t.isHideBtn?"重置"===t.label&&(t.isHideBtn=!1):t.isHideBtn=!0}))},hideSubmit:function(){this.formOpts.operatorList.forEach((function(t){"提交"!==t.label||t.isHideBtn?"提交"===t.label&&(t.isHideBtn=!1):t.isHideBtn=!0}))}}},i=n(2),r=Object(i.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("t-layout-page",[n("t-layout-page-item",[n("t-form",{attrs:{"ref-obj":t.formOpts.ref,formOpts:t.formOpts,widthSize:1},on:{"update:refObj":function(e){return t.$set(t.formOpts,"ref",e)},"update:ref-obj":function(e){return t.$set(t.formOpts,"ref",e)},handleEvent:t.handleEvent}})],1)],1)}),[],!1,null,null,null);e.default=r.exports}}]);