(window.webpackJsonp=window.webpackJsonp||[]).push([[146],{933:function(a,e,t){"use strict";t.r(e);var n={name:"redioDemo",data:function(){return{activeName:"name",table:{firstColumn:{type:"expand"},data:[{id:"1",date:"2019-09-25",name:"张三",status:"2",address:"广东省广州市天河区"},{id:"2",date:"2019-09-26",name:"张三1",status:"1",address:"广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"},{id:"3",date:"2019-09-27",name:"张三2",status:"3",address:"广东省广州市天河区3"}],columns:[{prop:"name",label:"姓名",minWidth:"100"},{prop:"date",label:"日期",minWidth:"180"},{prop:"address",label:"地址",minWidth:"220"},{prop:"date",label:"日期",minWidth:"180"}]}}},methods:{handleClick:function(a,e){console.log("切换tab",a,e)}}},l=t(2),s=Object(l.a)(n,(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("t-layout-page",[t("t-layout-page-item",[t("t-table",{attrs:{title:"展开行",table:a.table,columns:a.table.columns,isShowPagination:!1},scopedSlots:a._u([{key:"expand",fn:function(e){var n=e.scope;return[t("el-tabs",{staticClass:"demo-tabs",on:{"tab-click":a.handleClick},model:{value:a.activeName,callback:function(e){a.activeName=e},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"姓名",name:"name"}},[t("div",[a._v("姓名："+a._s(n.row.name))])]),a._v(" "),t("el-tab-pane",{attrs:{label:"日期",name:"date"}},[t("div",[a._v("日期："+a._s(n.row.date))])]),a._v(" "),t("el-tab-pane",{attrs:{label:"状态",name:"status"}},[t("div",[a._v("状态："+a._s(n.row.status))])])],1)]}}])})],1)],1)}),[],!1,null,null,null);e.default=s.exports}}]);