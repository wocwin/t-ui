(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{805:function(e){e.exports=JSON.parse('{"success":true,"code":200,"msg":"成功","data":[{"area":"1","singleWeight":1,"endDate":"2022-06-06","updateBy":"jiangyx","createByName":"姜宇轩","remark":null,"isDeleted":false,"packageNumStart":1,"packageNumEnd":3,"createTime":"2022-06-06 09:44:17","isTail":false,"startDate":"2022-06-06","workOrderBatchRecordId":96,"layer":"1","id":104,"updateByName":"姜宇轩","updateTime":"2022-06-06 11:05:49","code":"FJSMH1000106","isPrint":true,"ids":[2228,2229,2230]},{"area":"2","singleWeight":1,"endDate":"2022-06-06","updateBy":"libowen","createByName":"李博文","remark":null,"isDeleted":false,"packageNumStart":1,"packageNumEnd":5,"createTime":"2022-06-08 08:37:34","isTail":false,"startDate":"2022-06-06","workOrderBatchRecordId":96,"layer":"2","id":105,"updateByName":"李博文","updateTime":"2022-06-08 08:37:34","code":"FJSMH1000106","isPrint":true,"ids":[2231,2232,2233,2234,2235]},{"area":"3","singleWeight":1,"endDate":"2022-06-06","updateBy":"libowen","createByName":"李博文","remark":null,"isDeleted":false,"packageNumStart":1,"packageNumEnd":5,"createTime":"2022-06-08 08:53:43","isTail":false,"startDate":"2022-06-06","workOrderBatchRecordId":96,"layer":"3","id":106,"updateByName":"李博文","updateTime":"2022-06-08 08:53:43","code":"FJSMH1000106","isPrint":true,"ids":[2236,2237,2238,2239,2240]}]}')},928:function(e,t,i){"use strict";i.r(t);i(25);var a=i(805),l={data:function(){return{table:{data:[],operator:[{text:"编辑",disabled:!1,fun:this.edit,noshow:[{key:"isPrint",val:[!1]},{key:"isEdit",val:[!0]}]},{text:"保存",fun:this.creatTag,disabled:!1,show:{key:"isEdit",val:[!0]}},{text:"取消",disabled:!1,fun:this.cancelEdit,show:{key:"isEdit",val:[!0]}}],operatorConfig:{fixed:"right",width:120,label:"操作"},columns:[{prop:"area",label:"装炉位置",minWidth:"120",canEdit:!0,configEdit:{label:"装炉位置",type:"select-arr",editComponent:"el-select",list:"furnaceAreaList",arrLabel:"dictLabel",arrKey:"dictValue",bind:function(e){return{disabled:!e.row.isDisabled}}}},{prop:"layer",label:"装炉层",minWidth:"120",canEdit:!0,configEdit:{label:"装炉层",type:"select-arr",editComponent:"el-select",list:"furnaceLayerList",arrLabel:"dictLabel",arrKey:"dictValue",bind:function(e){return{disabled:!e.row.isDisabled}}}},{prop:"isTail",label:"是否尾包",minWidth:"100",canEdit:!0,configEdit:{label:"是否尾包",type:"checkbox",editComponent:"el-checkbox",bind:function(e){return{disabled:!e.row.isDisabled}}}},{prop:"packageNumStart",label:"开始编号",minWidth:"100",canEdit:!0,configEdit:{label:"开始编号",type:"input",editComponent:"el-input",bind:function(e){return{disabled:!e.row.isDisabled}}}},{prop:"packageNumEnd",label:"结束编号",minWidth:"100",canEdit:!0,configEdit:{label:"结束编号",type:"input",editComponent:"el-input",bind:function(e){return{disabled:!e.row.isDisabled}}}},{prop:"startDate",label:"生产日期",minWidth:"100"},{prop:"endDate",label:"出炉日期",minWidth:"100"},{prop:"singleWeight",label:"单包重量（吨）",minWidth:"100",canEdit:!0,configEdit:{label:"单包重量（吨）",type:"input",editComponent:"el-input-number",event:"singleWeight",bind:function(e){return{controls:!1,disabled:!e.row.isDisabled,min:1,max:9999,precision:2}}}}],listTypeInfo:{furnaceAreaList:[{dictLabel:"炉头",dictValue:"1"},{dictLabel:"炉中",dictValue:"2"},{dictLabel:"炉尾",dictValue:"3"}],furnaceLayerList:[{dictLabel:"上层",dictValue:"1"},{dictLabel:"中层",dictValue:"2"},{dictLabel:"下层",dictValue:"3"}]}}}},created:function(){this.getList()},methods:{getList:function(){var e=a;e.success&&(this.table.data=e.data)},creatTag:function(e){console.log("保存",e),this.$set(e,"isEdit",!1),this.$set(e,"isDisabled",!1),e.isPrint=!0,this.table.operator.map((function(e){"编辑"==e.text&&(e.disabled=!1)}))},edit:function(e){var t=this;this.table.data.map((function(e){t.$set(e,"isEdit",!1)})),this.table.operator.map((function(e){"编辑"==e.text&&(e.disabled=!0)})),this.$set(e,"isEdit",!0),this.$set(e,"isDisabled",!0)},cancelEdit:function(e){this.table.operator.map((function(e){"编辑"==e.text&&(e.disabled=!1)})),this.$set(e,"isEdit",!1),this.$set(e,"isDisabled",!1)}}},n=i(2),d=Object(n.a)(l,(function(){var e=this.$createElement,t=this._self._c||e;return t("t-layout-page",[t("t-layout-page-item",[t("t-table",{attrs:{isShowPagination:!1,table:this.table,columns:this.table.columns,listTypeInfo:this.table.listTypeInfo}})],1)],1)}),[],!1,null,null,null);t.default=d.exports}}]);