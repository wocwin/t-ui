(window.webpackJsonp=window.webpackJsonp||[]).push([[158],{943:function(e,t,l){"use strict";l.r(t);l(25),l(454);var n={name:"HeaderGroupEditTable",data:function(){return{table:{data:[{name:"张三",hobby:null,hobby1:null,year:"2021",time:null,remake:"",number:12},{name:"李四",hobby:null,hobby1:null,year:"2021",time:null,remake:"",number:15}],columns:[{prop:"name",label:"姓名",minWidth:"100"},{prop:"firstEditor",label:"一级编辑列",minWidth:"180",children:[{prop:"remake",label:"输入框",minWidth:"220",canEdit:!0,configEdit:{label:"备注",append:"吨",rules:{required:!0,message:"请输入备注",trigger:"blur"},bind:{"prefix-icon":"el-icon-search"},editComponent:"el-input"}},{prop:"hobby",label:"爱好单选",minWidth:"180",canEdit:!0,configEdit:{label:"爱好单选",editComponent:"t-select",isSelfCom:!0,bind:{optionSource:[],valueKey:"value"}}},{prop:"hobby1",label:"爱好多选",minWidth:"180",canEdit:!0,configEdit:{label:"爱好多选",editComponent:"t-select",isSelfCom:!0,bind:{optionSource:[],valueKey:"value",multiple:!0}}}]},{label:"一级表头",minWidth:"180",children:[{label:"二级表头",minWidth:"180",children:[{prop:"time",label:"日期时间",minWidth:"180",canEdit:!0,configEdit:{label:"日期时间",type:"datetime",editComponent:"el-date-picker",bind:{valueFormat:"yyyy-MM-dd hh:mm:ss"}}}]}]},{prop:"",label:"不编辑列",minWidth:"180",children:[{prop:"year",label:"日期年",minWidth:"180"},{prop:"number",label:"计数器",minWidth:"220"}]}],operator:[{type:"danger",text:"删除",fun:this.editDel}]}}},created:function(){this.getList()},methods:{getList:function(){var e=[{label:"吉他",value:"0"},{label:"看书",value:"1"},{label:"美剧",value:"2"},{label:"旅游",value:"3"},{label:"音乐",value:"4"}];this.table.columns.map((function(t){"firstEditor"===t.prop&&t.children.map((function(t){switch(t.prop){case"hobby":case"hobby1":t.configEdit.bind.optionSource=e}}))}))},save:function(e){console.log("获取的table数据--save",e)},singleSave:function(){this.$refs.singleHeaderEdit.saveMethod((function(e){console.log("另一种获取的table数据--saveMethod",e)}))},editDel:function(e,t,l){l.splice(t,1),console.log("删除",e,l,t)},handleEvent:function(e,t){console.log("handleEvent",e,t)}}},i=l(2),a=Object(i.a)(n,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("t-layout-page",[l("t-layout-page-item",[l("t-table",{ref:"singleHeaderEdit",attrs:{table:e.table,columns:e.table.columns,isShowFooterBtn:""},on:{handleEvent:e.handleEvent,save:e.save},scopedSlots:e._u([{key:"toolbar",fn:function(){return[l("el-button",{attrs:{type:"primary"},on:{click:e.singleSave}},[e._v("另一种获取table数据")])]},proxy:!0}])})],1)],1)}),[],!1,null,null,null);t.default=a.exports}}]);