(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{853:function(e,t,a){"use strict";a.r(t);a(25),a(20),a(61),a(44);var l={name:"dhFormDemo",data:function(){var e=this;return{formOpts:{ref:null,formData:{account:"",password:"",name:"",sex:"",hobby:[],phone:"",createDate:"",valDate:"",email:"",desc:"",status:"",status1:null},fieldList:[{label:"账号",value:"account",type:"input",comp:"el-input",event:"account"},{label:"密码",value:"password",type:"password",comp:"el-input"},{label:"昵称",value:"name",type:"input",comp:"el-input"},{label:"性别",value:"sex",type:"select-arr",comp:"el-select",list:"sexList",bind:{disabled:!1},arrLabel:"key",arrKey:"value"},{label:"状态",value:"status",type:"select-arr",list:"statusList",comp:"el-select",arrLabel:"key",arrKey:"value"},{label:"爱好",value:"hobby",type:"checkbox",comp:"el-checkbox-group",list:"hobbyList",event:"checkbox"},{label:"手机号码",value:"phone",type:"input",comp:"el-input",bind:{maxlength:11}},{label:"创建时间",value:"createDate",type:"year",bind:{valueFormat:"yyyy"},comp:"el-date-picker"},{label:"日期",value:"valDate",comp:"t-date-picker",rules:{required:!0,message:"请选择element日期",trigger:"change"},bind:{type:"daterange",isPickerOptions:!0}},{label:"邮箱",value:"email",type:"input",comp:"el-input"},{label:"treeSelect",value:"status1",placeholder:"t-tree-select多选",comp:"t-tree-select",isSelfCom:!0,bind:{options:[],treeProps:{value:"id",children:"children",label:"name"},multiple:!0},eventHandle:{handleNodeClick:function(t){return e.selectDrop(t)}}},{label:"描述",value:"desc",type:"textarea",comp:"el-input",className:"t-form-block"}],rules:{account:[{required:!0,message:"请输入账号",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],name:[{required:!0,message:"请输入昵称",trigger:"blur"}],phone:[{required:!0,message:"请输入手机号码",trigger:"blur"}],sex:[{required:!0,message:"请选择性别",trigger:"change"}],hobby:[{required:!0,message:"请至少选择一个爱好",trigger:"change"}],status1:[{required:!0,message:"请选择treeSelect",trigger:"change"}],email:[{validator:this.validatorEmail,message:"自定义配置校验规则",trigger:"blur"}]},operatorList:[{label:"提交",type:"danger",fun:this.submitForm},{label:"重置",type:"primary",fun:this.resetForm},{label:"清除校验",type:"danger",fun:this.clearValidate}],listTypeInfo:{hobbyList:[{label:"吉他",value:"0"},{label:"看书",value:"1"},{label:"美剧",value:"2"},{label:"旅游",value:"3"},{label:"音乐",value:"4"}],sexList:[{key:"女",value:1},{key:"男",value:0}],accountTypeList:{0:"手机用户",1:"论坛用户",2:"平台用户"},statusList:[{key:"启用",value:1},{key:"停用",value:0}]}}}},mounted:function(){var e=[{id:"1",name:"一级 1菈妮",children:[{id:"1-1",name:"二级 1-1",children:[{id:"1-1-1",name:"三级 1-1-1"}]}]},{name:"一级 2",id:"2",children:[{id:"2-1",name:"二级 2-1",children:[{id:"2-1-1",name:"三级 2-1-1"}]},{id:"2-2",name:"二级 2-2",children:[{id:"2-2-1",name:"三级 2-2-1鸡腿"}]}]}];this.formOpts.fieldList.map((function(t){switch(t.value){case"status1":t.bind.options=e}}))},methods:{selectDrop:function(e){console.log("t-tree-select多选",e),this.formOpts.formData.status1=e},validatorEmail:function(e,t,a){t&&!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(t)&&a(new Error(e.message)),a()},handleEvent:function(e,t){switch(e){case"checkbox":console.log("checkbox",t,e)}},submitForm:function(){var e=this;this.formOpts.ref.validate((function(t){console.log(88,t),console.log(77,e.formOpts.formData),t&&console.log("最终数据",e.formOpts.formData)}))},resetForm:function(){Object.assign(this.$data.formOpts.formData,this.$options.data().formOpts.formData),this.formOpts.ref.clearValidate()},clearValidate:function(){this.formOpts.ref.clearValidate()}}},r=a(2),s=Object(r.a)(l,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("t-layout-page",[a("t-layout-page-item",[a("t-form",{attrs:{"ref-obj":e.formOpts.ref,formOpts:e.formOpts,widthSize:1},on:{"update:refObj":function(t){return e.$set(e.formOpts,"ref",t)},"update:ref-obj":function(t){return e.$set(e.formOpts,"ref",t)},handleEvent:e.handleEvent}})],1)],1)}),[],!1,null,null,null);t.default=s.exports}}]);