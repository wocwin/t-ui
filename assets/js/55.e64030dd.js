(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{807:function(e){e.exports=JSON.parse('{"success":true,"code":200,"msg":"成功","data":{"pageNo":12,"total":604,"pageSize":10,"rows":[{"userId":1,"userName":"张丽","nickName":"装国识布西","deptName":"表音角管","roleName":"全眼进由","descript":"次响红老位期断北管确复点规子写共因装铁得带下求。","createTime":"1992-04-18 03:50:22"},{"userId":2,"userName":"马军","nickName":"按厂加重单","deptName":"革前引活","roleName":"向难矿直","descript":"目向能律同型制相周强空体县近起矿类求海信见么存收运知马代它易手在流政果存法张断日与员体主般。","createTime":"2019-09-26 05:48:29"},{"userId":3,"userName":"李丽","nickName":"府叫空水采","deptName":"更经应代","roleName":"例几农专","descript":"四华体此际千国基整土何约然铁把采日百每程效建五约许验十算党广线养地复青规看并场和千主记却及。","createTime":"2011-05-13 01:11:02"},{"userId":4,"userName":"冯刚","nickName":"商过际无江","deptName":"治规质细","roleName":"族样较采","descript":"信走后干习长教教如阶地交展现精片技我话值导安明我极什才的化周十易值。","createTime":"1973-07-04 03:17:13"},{"userId":5,"userName":"袁娟","nickName":"整规查约品","deptName":"不八区受","roleName":"万百家商","descript":"越许叫对己加基他民红书开长节加道理列米叫风完电低支战养正周形支团心办价或别发马活员场段精八权图空。","createTime":"2004-03-17 09:53:09"},{"userId":6,"userName":"侯涛","nickName":"则斗规具所","deptName":"定种养志","roleName":"切质她劳","descript":"条引指的二表每我油住团他许外志书件济今行花包情改还政给展保际参极口老状儿管之党从水。","createTime":"1996-07-14 04:40:28"},{"userId":7,"userName":"武刚","nickName":"况单平层称","deptName":"必交方特","roleName":"农更温基","descript":"除准期导开至即与火正现社节情太法因后须我金共温运们类意铁红准采济酸好亲象。","createTime":"2016-07-09 06:12:55"},{"userId":8,"userName":"薛刚","nickName":"非计也着极","deptName":"劳效持何","roleName":"完消点传","descript":"标近状同先太领规方低教表处今以需器需改海多车和级持你共经起团。","createTime":"1974-12-15 10:19:15"},{"userId":9,"userName":"毛娟","nickName":"万重切号容","deptName":"养率了你","roleName":"表报维儿","descript":"集们并千它几温料深后构线情青带那放可严加议名第。","createTime":"1982-03-09 02:06:34"},{"userId":10,"userName":"杜秀英","nickName":"事习深图思","deptName":"后点去火","roleName":"断化值院","descript":"车较半便适制组间物外行二气料阶影办人府一老种况平生更强数石类造流表响原等系劳调看观没都四求。","createTime":"2011-01-21 06:46:18"}]}}')},963:function(e,t,a){"use strict";a.r(t);a(25),a(33),a(454);var i=a(807),l={name:"TtableSingleEditRules",data:function(){var e=this;return{num:2,tableData:[],table:{rules:{hobby:[{required:!0,message:"请至少选择一个爱好",trigger:"change"}],deptCode:[{required:!0,message:"请选择用户名称",trigger:"change"}],year:[{required:!0,message:"请选择年份",trigger:"change"}],name:[{required:!0,message:"请输入姓名",trigger:"blur"}]},firstColumn:{type:"index",label:"序列"},data:[],columns:[{prop:"name",label:"姓名",minWidth:"160",canEdit:!0,headerRequired:!0,configEdit:{label:"姓名",type:"input",editComponent:"el-input"}},{prop:"deptCode",label:"t-select-table使用",minWidth:"280",headerRequired:!0,canEdit:!0,configEdit:{label:"用户名称",editComponent:"t-select-table",isSelfCom:!0,bind:{isKeyup:!0,maxHeight:400,selectWidth:240,defaultSelectVal:[],keywords:{label:"userName",value:"userId"},table:{data:[]},columns:[{prop:"userName",label:"登录名",minWidth:"120"},{prop:"nickName",label:"插槽使用",minWidth:"120"},{prop:"deptName",label:"部门",minWidth:"120"},{prop:"roleName",label:"角色",minWidth:"120"},{prop:"descript",label:"描述",minWidth:"180"},{prop:"createTime",label:"创建时间",minWidth:"180"}]},eventHandle:{radioChange:function(t){var a=t.row,i=t.scope;return e.radioChange(a,i)}}}},{prop:"unit",label:"单位",minWidth:"220",canEdit:!0,headerRequired:!0,configEdit:{label:"单位",append:"吨",rules:{required:!0,message:"请输入单位",trigger:"blur"},bind:{"prefix-icon":"el-icon-search"},editComponent:"el-input"}},{prop:"hobby",label:"爱好单选",minWidth:"180",headerRequired:!0,canEdit:!0,configEdit:{label:"爱好单选",type:"select-arr",editComponent:"el-select",list:"hobbyList",event:"hobbyList",arrLabel:"label",arrKey:"value"}},{prop:"year",label:"日期年",minWidth:"180",canEdit:!0,headerRequired:!0,configEdit:{label:"日期年",type:"year",editComponent:"el-date-picker",bind:{valueFormat:"YYYY"}}},{prop:"time",label:"日期时间",minWidth:"180",canEdit:!0,configEdit:{label:"日期时间",type:"datetime",editComponent:"el-date-picker",bind:{valueFormat:"yyyy-MM-dd hh:mm:ss"}}},{prop:"number",label:"计数器",minWidth:"220",canEdit:!0,configEdit:{label:"计数器",type:"inputNumber",bind:{min:0,max:99},editComponent:"el-input-number"}},{prop:"remake",label:"备注",minWidth:"220",canEdit:!0,configEdit:{label:"备注",type:"textarea",bind:{type:"textarea"},editComponent:"el-input"}}],operator:[{type:"danger",text:"删除",fun:this.editDel}],operatorConfig:{fixed:"right"}},listTypeInfo:{hobbyList:[{label:"吉他",value:"0"},{label:"看书",value:"1"},{label:"美剧",value:"2"},{label:"旅游",value:"3"},{label:"音乐",value:"4"}]}}},created:function(){this.getSelectTableList()},methods:{getSelectTableList:function(){var e=this,t=i;t.success&&(this.tableData=null==t?void 0:t.data.rows,this.table.columns.map((function(t){"deptCode"===t.prop&&(t.configEdit.bind.table.data=e.tableData)})))},add:function(){var e=this;if(this.num>0){for(var t=0;t<this.num;t++)this.table.data.push({deptCode:null});setTimeout((function(){e.$refs.singleEditTSelectTable.clearValidate()}),100)}},radioChange:function(e,t){this.table.data[t.$index].deptCode=e.userId},singleSave:function(e){console.log("单个单元格编辑保存",e)},validateError:function(e){var t=this;e.map((function(e){setTimeout((function(){t.$message.error("".concat(e,"是必填项！"))}),100)}))},save:function(){console.log("另一种获取的table数据--save",this.$refs.singleEditTSelectTable),this.$refs.singleEditTSelectTable.saveMethod((function(e){console.log("另一种获取的table数据--saveMethod",e)}))},clearValidate:function(){this.$refs.singleEditTSelectTable.clearValidate()},reset:function(){this.$refs.singleEditTSelectTable.resetFields()},editDel:function(e,t,a){a.splice(t,1),console.log("删除",e,a,t)},handleEvent:function(e,t){switch(e){case"hobbyList":console.log("爱好选择",e,t)}}}},r=a(2),n=Object(r.a)(l,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("t-layout-page",[a("t-layout-page-item",[a("t-table",{ref:"singleEditTSelectTable",attrs:{title:"单元格编辑TSelectTable--rules",table:e.table,columns:e.table.columns,isShowPagination:!1,listTypeInfo:e.listTypeInfo,isShowFooterBtn:""},on:{handleEvent:e.handleEvent,save:e.singleSave,validateError:e.validateError},scopedSlots:e._u([{key:"toolbar",fn:function(){return[a("div",{staticClass:"add_data",staticStyle:{display:"flex","margin-right":"10px"}},[a("el-input-number",{attrs:{size:"small",clearable:"",placeholder:"请输入追加条数"},model:{value:e.num,callback:function(t){e.num=t},expression:"num"}}),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.add}},[e._v("追加"+e._s(e.num?e.num:"")+"条数据")])],1),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.save}},[e._v("另一种获取table数据")]),e._v(" "),a("el-button",{attrs:{size:"small"},on:{click:e.clearValidate}},[e._v("清除校验规则")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.reset}},[e._v("重置表单")])]},proxy:!0}])})],1)],1)}),[],!1,null,null,null);t.default=n.exports}}]);