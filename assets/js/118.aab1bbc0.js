(window.webpackJsonp=window.webpackJsonp||[]).push([[118],{893:function(o,e,l){"use strict";l.r(e);var t={name:"queryData-slot",data:function(){return{queryData:{likeCargoNo:null,likeBookNo:null,likeTransportNo:null,likeTransportNo1:[],likeCargoName:null}}},computed:{opts:function(){return{likeCargoNo:{label:"货源编号",comp:"el-input"},likeTransportNo:{label:"运单编号",comp:"el-input",slotName:"likeTransportNo"},likeBookNo:{label:"订单编号",comp:"el-input"},likeCargoName:{label:"货品名称",comp:"el-input"},likeTransportNo1:{label:"多选",defaultVal:[],span:4,slotName:"likeTransportNo1"}}},getQueryData:function(){var o=this.queryData;return{likeCargoNo:o.likeCargoNo,likeBookNo:o.likeBookNo,likeTransportNo:o.likeTransportNo,likeTransportNo1:o.likeTransportNo1,likeCargoName:o.likeCargoName}}},methods:{conditionEnter:function(o){console.log("查询条件",o),this.queryData=o,console.log("最终条件",this.getQueryData)}}},a=l(2),r=Object(a.a)(t,(function(){var o=this,e=o.$createElement,l=o._self._c||e;return l("t-layout-page",[l("t-layout-page-item",[l("t-query-condition",{ref:"queryCondition",attrs:{opts:o.opts,isExpansion:""},on:{submit:o.conditionEnter},scopedSlots:o._u([{key:"likeTransportNo",fn:function(e){var t=e.scope;return[l("el-input",{attrs:{clearable:"",placeholder:"自定义插槽输入框"},model:{value:t.likeTransportNo,callback:function(e){o.$set(t,"likeTransportNo",e)},expression:"scope.likeTransportNo"}})]}},{key:"likeTransportNo1",fn:function(e){var t=e.param;return[l("el-checkbox-group",{model:{value:t.likeTransportNo1,callback:function(e){o.$set(t,"likeTransportNo1",e)},expression:"param.likeTransportNo1"}},[l("el-checkbox",{attrs:{label:"显示禁用科目"}}),o._v(" "),l("el-checkbox",{attrs:{label:"显示辅助核算"}}),o._v(" "),l("el-checkbox",{attrs:{label:"显示无余额无发生科目"}})],1)]}}])})],1)],1)}),[],!1,null,null,null);e.default=r.exports}}]);