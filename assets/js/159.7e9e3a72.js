(window.webpackJsonp=window.webpackJsonp||[]).push([[159],{944:function(e,t,a){"use strict";a.r(t);var n={data:function(){var e=this,t=this.$createElement;return{table:{columns:[{prop:"name",label:"姓名",minWidth:"100",renderHeader:function(a){return t("el-checkbox",{style:"width:100%;",attrs:{value:a.check},on:{change:function(t){return e.handleCheckboxChange(t,a)}}},[t("span",{style:"font-size:13px;font-weight: 700;color:red;"},[a.label])])},children:[{prop:"name",label:"姓名",minWidth:"100",children:[{prop:"type",label:"类型",minWidth:"100",children:[{prop:"date1",label:"日期2552",minWidth:"180"}]}]},{prop:"type",label:"表头合并1",minWidth:"100",children:[{prop:"type",label:"类型",minWidth:"100",renderHeader:function(a){return t("el-checkbox",{style:"width:100%;",attrs:{value:a.check},on:{change:function(t){return e.handleCheckboxChange(t,a)}}},[t("span",{style:"font-size:13px;font-weight: 700;color:red;"},[a.label])])},children:[{prop:"date1",label:"日期2552",minWidth:"180"}]}]},{prop:"address",label:"地址allShow",minWidth:"100",allShow:!0},{prop:"date",label:"表头合并2",minWidth:"180",children:[{prop:"type",label:"类型",minWidth:"100"},{prop:"date",label:"日期",minWidth:"180",children:[{prop:"date1",label:"日期22",minWidth:"180"}]}]}]},{prop:"name",label:"姓名",minWidth:"100",children:[{prop:"type",label:"类型",minWidth:"100",children:[{prop:"date1",label:"日期",minWidth:"180"}]}]},{prop:"type",label:"表头合并1",minWidth:"100",children:[{prop:"type",label:"类型",minWidth:"100",children:[{prop:"date1",label:"日期2552",minWidth:"180"}]}]},{prop:"name",label:"姓名",minWidth:"100"},{prop:"date",label:"表头合并2",minWidth:"180",children:[{prop:"type",label:"类型",minWidth:"100"},{prop:"status",label:"render渲染",minWidth:"100",render:function(e,a,n){var l="",r="";switch(e){case"1":l="",r="待处理";break;case"2":l="warning",r="进行中";break;case"3":l="success",r="已完成"}return t("el-tag",{attrs:{type:l}},[r])}},{prop:"date",label:"日期",minWidth:"180",children:[{prop:"date1",label:"日期22",minWidth:"180"}]}]},{prop:"address",label:"地址",minWidth:"220"},{prop:"date1",label:"日期",minWidth:"180"},{prop:"address1",label:"地址",minWidth:"220"}],data:[{id:"1",type:"入库",date:"2019-09-25",date1:"2019-09-25",name:"张三",status:"2",address:"广东省广州市天河区广东省广州市天河区444",address1:"广东省广州市天河区"},{id:"3",type:"入库",date:"2019-09-27",date1:"2019-09-27",name:"张三2",status:"1",address:"广东省广州市天河区广东省广州市天河区5555",address1:"广东省广州市天河区3"},{id:"4",type:"出库",date:"2019-09-27",date1:"2019-09-27",name:"张三3",status:"3",address:"广东省广州市天河区3",address1:"广东省广州市天河区3"},{id:"5",type:"出库",date:"2019-09-27",date1:"2019-09-27",name:"张三4",status:"3",address:"广东省广州市天河区3",address1:"广东省广州市天河区3"}]}}},methods:{handleCheckboxChange:function(e,t){console.log("点击表头复选框",e,t)}}},l=a(2),r=Object(l.a)(n,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("t-layout-page",[a("t-layout-page-item",[a("t-table",{attrs:{table:e.table,isShowPagination:!1,columns:e.table.columns},scopedSlots:e._u([{key:"slotNameHeader",fn:function(t){var a=t.param;return[e._v(e._s(a.row.date1))]}},{key:"slotNameHeader1",fn:function(t){var a=t.param;return[e._v(e._s(a.row.name))]}},{key:"slotNameHeader12",fn:function(t){var a=t.param;return[e._v(e._s(a.row.date1))]}}])})],1)],1)}),[],!1,null,null,null);t.default=r.exports}}]);