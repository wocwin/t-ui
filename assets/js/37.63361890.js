(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{775:function(e,t,n){},803:function(e,t,n){"use strict";n(775)},923:function(e,t,n){"use strict";n.r(t);var a={data:function(){var e=this;return{table:{data:[{id:"1",date:"2019-09-25",name:"张三",status:"2",address:"广东省广州市天河区"},{id:"2",date:"2019-09-26",name:"张三1",status:"1",address:"广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"},{id:"3",date:"2019-09-27",name:"张三2",status:"3",address:"广东省广州市天河区3"}]},columns:[{prop:"name",label:"姓名",minWidth:"100",sort:!0},{prop:"date",label:"日期",minWidth:"180",sort:!0},{prop:"address",label:"地址",minWidth:"220",sort:!0,noShowTip:!0},{prop:"date",label:"日期",minWidth:"180",sort:!0},{prop:"address",label:"地址",minWidth:"220",customRender:{comps:[{comp:"el-link",text:"编辑",bind:{type:"primary"},event:function(t){return{click:function(){e.handleEditTable("编辑",t.row)}}}},{comp:"el-popconfirm",bind:{title:"确认删除该条数据？"},event:function(t){return{confirm:function(){e.handledeleteTable(t.row)}}},child:[{slot:"reference",comp:"el-link",text:"删除",bind:{type:"primary"}}]}]}}]}},methods:{handleEditTable:function(e,t){console.log("编辑",e,t)},handledeleteTable:function(e){console.log("删除",e)},rowClassName:function(e){e.row;return e.rowIndex%2==0?"warning-row":"success-row"}}},o=(n(803),n(2)),l=Object(o.a)(a,(function(){var e=this.$createElement,t=this._self._c||e;return t("t-layout-page",{staticClass:"row_class_name"},[t("t-layout-page-item",[t("t-table",{attrs:{onlyIconSort:"",title:"此排序仅可点击图标才生效",table:this.table,columns:this.columns,"header-cell-style":{background:"red",height:"50px"},"row-style":{height:"52px"},size:"mini",rowClassName:this.rowClassName}})],1)],1)}),[],!1,null,null,null);t.default=l.exports}}]);