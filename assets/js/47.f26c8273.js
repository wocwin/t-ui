(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{800:function(e){e.exports=JSON.parse('{"success":true,"code":200,"msg":"成功","data":[{"code":"17","valueName":"好水易达黄边店","sort":null},{"code":"32","valueName":"到水吉祥(金铂天地店)","sort":null},{"code":"33","valueName":"到水吉祥(集贤店)","sort":null},{"code":"34","valueName":"到水吉祥(花都店)","sort":null},{"code":"36","valueName":"到水吉祥(京溪店)","sort":null},{"code":"37","valueName":"到水吉祥(黄石店)","sort":null},{"code":"38","valueName":"到水吉祥(东平店)","sort":null},{"code":"39","valueName":"到水吉祥(梅花园店)","sort":null},{"code":"40","valueName":"到水吉祥水超市总仓","sort":null},{"code":"41","valueName":"到水吉祥水超市(鹤林店)","sort":null},{"code":"42","valueName":"同和金铂广场店","sort":null},{"code":"43","valueName":"新门店","sort":null},{"code":"46","valueName":"肇庆店","sort":null},{"code":"47","valueName":"到水吉祥(宝龙店)","sort":null},{"code":"48","valueName":"hjj1231","sort":null},{"code":"49","valueName":"hejj-东平hjj111","sort":null}]}')},840:function(e,t,a){"use strict";a.r(t);var l=a(18),o=a(34),r=(a(23),a(800)),s={name:"dhFormDemo",data:function(){var e=this;return{formOpts:{ref:null,formData:{sex:null,hobby:null,createDate:null,valDate1:null,valDate2:null,valDate3:null,desc:null,deptCode:[],deptCode1:[],status:null},fieldList:[{label:"性别",value:"sex",placeholder:"TSelect单选",isSelfCom:!0,comp:"t-select",bind:{optionSource:this.sexList,valueKey:"value"}},{label:"状态",value:"status",placeholder:"TSelect单选",isSelfCom:!0,comp:"t-select",bind:{optionSource:this.statusList,valueKey:"value"}},{label:"爱好",value:"hobby",placeholder:"TSelect多选",isSelfCom:!0,comp:"t-select",bind:{multiple:!0,valueKey:"value",optionSource:this.hobbyList}},{label:"年份",value:"createDate",placeholder:"TDatePicker选择年份",bind:{type:"year"},comp:"t-date-picker"},{label:"门店11",value:"deptCode1",placeholder:"t-select-table单选使用",comp:"t-select-table",isSelfCom:!0,bind:{isKeyup:!0,maxHeight:400,selectWidth:500,defaultSelectVal:[],keywords:{label:"valueName",value:"code"},table:{data:[]},columns:[{prop:"code",label:"code",minWidth:"120"},{prop:"valueName",label:"门店名称",minWidth:"120"}]},eventHandle:{radioChange:function(t){return e.radioChange(t,"deptCode1")}}},{label:"月份范围",value:"valDate1",comp:"t-date-picker",bind:{type:"monthrange",isPickerOptions:!0}},{label:"日期范围",value:"valDate2",comp:"t-date-picker",bind:{type:"daterange",isPickerOptions:!0}},{label:"时间范围",value:"valDate3",comp:"t-date-picker",bind:{type:"datetimerange",isPickerOptions:!0}},{label:"门店",value:"deptCode",placeholder:"t-select-table单选使用",comp:"t-select-table",isSelfCom:!0,bind:{isKeyup:!0,maxHeight:400,selectWidth:500,defaultSelectVal:[],keywords:{label:"valueName",value:"code"},table:{data:[]},columns:[{prop:"code",label:"code",minWidth:"120"},{prop:"valueName",label:"门店名称",minWidth:"120"}]},eventHandle:{radioChange:function(t){return e.radioChange(t,"deptCode")}}},{label:"描述",value:"desc",type:"textarea",comp:"el-input",widthSize:1}],operatorList:[{label:"提交",type:"danger",fun:this.submitForm},{label:"重置",type:"primary",fun:this.resetForm}]},hobbyList:[],sexList:[],statusList:[]}},created:function(){var e=this;return Object(o.a)(Object(l.a)().mark((function t(){return Object(l.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getSelectList();case 2:case"end":return t.stop()}}),t)})))()},mounted:function(){console.log(222,this.hobbyList),this.formOpts.formData={sex:0,hobby:["0","2"],createDate:"2028",valDate1:["2022-01","2022-12"],valDate2:["2022-11-12","2022-12-12"],valDate3:["2022-11-05 17:27:37","2022-12-05 17:27:37"],desc:"8888",deptCode:["37"],deptCode1:["38"],status:1}},methods:{getSelectList:function(){var e=this;this.hobbyList=[{label:"吉他",value:"0"},{label:"看书",value:"1"},{label:"美剧",value:"2"},{label:"旅游",value:"3"},{label:"音乐",value:"4"}],this.sexList=[{label:"女",value:1},{label:"男",value:0}],this.statusList=[{label:"启用",value:1},{label:"停用",value:0}];var t=r;this.formOpts.fieldList.map(function(){var a=Object(o.a)(Object(l.a)().mark((function a(o){return Object(l.a)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:a.t0=o.value,a.next="sex"===a.t0?3:"status"===a.t0?5:"hobby"===a.t0?7:"deptCode1"===a.t0?9:"deptCode"===a.t0?14:19;break;case 3:return o.bind.optionSource=e.sexList,a.abrupt("break",19);case 5:return o.bind.optionSource=e.statusList,a.abrupt("break",19);case 7:return o.bind.optionSource=e.hobbyList,a.abrupt("break",19);case 9:return a.next=11,t.data;case 11:return o.bind.table.data=a.sent,o.bind.defaultSelectVal=["38"],a.abrupt("break",19);case 14:return a.next=16,t.data;case 16:return o.bind.table.data=a.sent,o.bind.defaultSelectVal=["37"],a.abrupt("break",19);case 19:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}())},radioChange:function(e,t){this.formOpts.formData[t]=[null==e?void 0:e.code]},submitForm:function(){var e=this;this.formOpts.ref.validate((function(t){console.log(88,t),console.log(77,e.formOpts.formData),t&&console.log("最终数据",e.formOpts.formData)}))},resetForm:function(){this.$refs.referenceDemo.resetFieldsSelf()}}},n=a(2),u=Object(n.a)(s,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("t-layout-page",[a("t-layout-page-item",[a("t-form",{ref:"referenceDemo",attrs:{"ref-obj":e.formOpts.ref,formOpts:e.formOpts,widthSize:1},on:{"update:refObj":function(t){return e.$set(e.formOpts,"ref",t)},"update:ref-obj":function(t){return e.$set(e.formOpts,"ref",t)}}})],1)],1)}),[],!1,null,null,null);t.default=u.exports}}]);