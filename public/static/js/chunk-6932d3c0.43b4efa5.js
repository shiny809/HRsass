(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6932d3c0"],{"173d":function(t,e,n){"use strict";n.d(e,"e",(function(){return r})),n.d(e,"g",(function(){return c})),n.d(e,"f",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"j",(function(){return s})),n.d(e,"d",(function(){return l})),n.d(e,"a",(function(){return u})),n.d(e,"h",(function(){return p})),n.d(e,"b",(function(){return d})),n.d(e,"i",(function(){return b}));var a=n("b775");function r(t){return Object(a["a"])({url:"/salarys/list",data:t,method:"post"})}function c(t){return Object(a["a"])({url:"/salarys/tips/".concat(t)})}function i(){return Object(a["a"])({url:"/salarys/settings"})}function o(){return Object(a["a"])({url:"/salarys/company-settings"})}function s(t){return Object(a["a"])({url:"/salarys/settings",method:"post",data:t})}function l(t){return Object(a["a"])({url:"/salarys/modify/".concat(t)})}function u(t){return Object(a["a"])({url:"/salarys/modify/".concat(t.userId),method:"post",data:t})}function p(t){return Object(a["a"])({url:"/salarys/init/".concat(t.userId),method:"post",data:t})}function d(t){return Object(a["a"])({url:"/salarys/reports/".concat(t.yearMonth),params:t})}function b(t){return Object(a["a"])({url:"/salarys/reports/".concat(t.yearMonth,"/newReport"),method:"put",data:t})}},"32c3":function(t,e,n){},"9fca":function(t,e,n){"use strict";n("32c3")},f42a:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"monthStatementBox"},[t._m(0),n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"monthStatementTable"},[n("div",{staticClass:"itemDropDown"},[n("div",{staticClass:"topLab"},[n("div"),n("div",{staticClass:"rightLabBox"},[n("a",{staticClass:"el-button fr el-button--primary el-button--mini",attrs:{title:"导出"},on:{click:function(e){return t.handleExport()}}},[t._v("导出")])])]),n("el-table",{staticStyle:{width:"100%","text-align":"center"},attrs:{id:"item",data:t.contentData,border:""}},[n("el-table-column",{attrs:{type:"index",label:"序号",center:"",width:"50"}}),n("el-table-column",{attrs:{prop:"username",label:"姓名",width:"150px"}}),n("el-table-column",{attrs:{prop:"mobile",label:"手机号",width:"150px"}}),n("el-table-column",{attrs:{prop:"workNumber",label:"工号",width:"150px"}}),n("el-table-column",{attrs:{prop:"departmentName",label:"部门名称",width:"150px"}}),n("el-table-column",{attrs:{prop:"inServiceStatus",formatter:t.inService,label:"在职状态",width:"150px"}}),n("el-table-column",{attrs:{prop:"providentFundIndividual",label:"公积金个人",width:"150px"}}),n("el-table-column",{attrs:{prop:"socialSecurityIndividual",label:"社保个人",width:"150px"}}),n("el-table-column",{attrs:{prop:"socialSecurityEnterprise",label:"社保企业",width:"150px"}}),n("el-table-column",{attrs:{prop:"providentFundEnterprises",label:"公积金企业",width:"150px"}}),n("el-table-column",{attrs:{prop:"socialSecurityProvidentFundEnterprises",label:"公积金社保企业",width:"150px"}}),n("el-table-column",{attrs:{prop:"currentBaseSalary",label:"基本工资",width:"150px"}}),n("el-table-column",{attrs:{prop:"currentBaseSalary",label:"岗位工资",width:"150px"}}),n("el-table-column",{attrs:{prop:"salaryChangeAmount",label:"福利津贴",width:"150px"}}),n("el-table-column",{attrs:{prop:"attendanceDeductionMonthly",label:"考勤扣款",width:"150px"}}),n("el-table-column",{attrs:{prop:"currentSalaryTotalBase",label:"税前工资合计",width:"150px"}}),n("el-table-column",{attrs:{prop:"salaryByTax",label:"应纳税工资",width:"150px"}}),n("el-table-column",{attrs:{prop:"tax",label:"应扣税",width:"150px"}}),n("el-table-column",{attrs:{prop:"payment",label:"实发工资",width:"150px"}})],1)],1)]),n("el-row",{staticStyle:{height:"60px"},attrs:{type:"flex",justify:"center",align:"middle"}},[n("el-col",{attrs:{span:12}},[n("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.archivingReportForm}},[t._v("归档"+t._s(t.yearMonth?t.yearMonth.substr(4):"")+"报表")]),n("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.createReportForm}},[t._v("新建报表")]),n("el-button",{attrs:{size:"small"},on:{click:function(e){return t.$router.back()}}},[t._v("取消")])],1)],1)],1)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"monthStatementTop"},[n("div",{staticClass:"title"},[n("span",[t._v("工资报表")])])])}],c=n("c7eb"),i=n("1da1"),o=(n("fb6a"),n("173d")),s={name:"HistoricalArchiving",data:function(){return{loading:!1,num:0,contentData:[],yearMonth:this.$route.query.yearMonth}},created:function(){this.getArchivingCont()},methods:{inService:function(t){return"1"===t.inServiceStatus?"在职":"离职"},getArchivingCont:function(){var t=this;return Object(i["a"])(Object(c["a"])().mark((function e(){var n;return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,n=t.yearMonth,e.next=4,Object(o["b"])({yearMonth:n,opType:1});case 4:t.contentData=e.sent,t.loading=!1;case 6:case"end":return e.stop()}}),e)})))()},clickCancel:function(){this.$router.back(-1)},archivingReport:function(){var t=this;return Object(i["a"])(Object(c["a"])().mark((function e(){var n;return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:n="您确认归档当月报表吗？(报表归档将覆盖上一次归档记录，无法恢复)",t.$confirm(n,"归档"+t.yearMonth+"报表").then((function(){t.$message.success("success")}));case 2:case"end":return e.stop()}}),e)})))()},archivingReportForm:function(){var t=this;this.$confirm("您确认归档当月报表吗？").then(Object(i["a"])(Object(c["a"])().mark((function e(){return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.$message.success("归档成功");case 1:case"end":return e.stop()}}),e)}))))},createReportForm:function(){var t=this,e=this.getNextMonth(),n=e.substring(0,4),a=e.substring(4);this.$confirm("您将创建 《 "+n+"年"+a+"月 》 报表").then((function(){t.yearMonth=e,t.createNewReport(t.yearMonth),t.$message.success("新建报表成功"),t.getArchivingCont()}))},createNewReport:function(t){return Object(i["a"])(Object(c["a"])().mark((function e(){return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["i"])({yearMonth:t});case 2:case"end":return e.stop()}}),e)})))()},getNextMonth:function(){var t=this.yearMonth.substring(0,4),e=this.yearMonth.slice(4),n=t,a=parseInt(e)+1;13===a&&(n=parseInt(n)+1,a=1),a<10&&(a="0"+a);var r=n+a;return r},handleExport:function(){}}},l=s,u=(n("9fca"),n("2877")),p=Object(u["a"])(l,a,r,!1,null,"3c1a42b4",null);e["default"]=p.exports}}]);