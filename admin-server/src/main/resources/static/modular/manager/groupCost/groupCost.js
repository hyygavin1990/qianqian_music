var GroupCost = {
    tableId: "#grid-table1",
    pagerId: "#grid-pager1",
    pagerId1:"#grid-pager3",
    table: null,
    table2: null,
    domain: "GroupCost",
    width:null
}
//jqGrid初始化
GroupCost.initJqGrid = function () {
    var tableInstance = $("#grid-table1").jqGrid({
        url:"/groupCost/grid1",
        postData:{
            projectId: $("#project").val(),
            day:$("#day").val().replace(/-/g,""),
            companyId:$("#company").val()
        },
        width:GroupCost.width,
        height:null,
        mtype: "GET",
        viewrecords : true, //是否要显示总记录数
        page: 1,    //初始页码
        rowNum:  -1, //初始化pageSize
        pager : GroupCost.pagerId,
        datatype: "json",
        caption: "坐席分组消费统计",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "company"
        },
        colNames: ['公司','项目','坐席分组','AI总消费','通话总消费','总消费'],
        colModel: [
            {name: 'company', index: 'company', align:"center",sortable: false},
            {name: 'project', index: 'project',align:"center",sortable: false},
            {name: 'group', index: 'group',align:"center",  sortable: false},
            {name: 'ai', index: 'ai',align:"center", sortable: false,  formatter:  GroupCost.formatMoney},
            {name: 'call', index: 'call', align:"center", sortable: false,  formatter:  GroupCost.formatMoney},
            {name: 'total', index: 'total', align:"center", sortable: false,   formatter: GroupCost.formatMoney}
        ]

    });
    return tableInstance;
};
GroupCost.initJqGrid2 = function () {
    var tableInstance = $("#grid-table3").jqGrid({
        url : "/groupCost/grid2",
        postData:{
            projectId: $("#project").val(),
            day:$("#day").val().replace(/-/g,""),
            companyId:$("#company").val()
        },
        width:GroupCost.width,
        height:200,
        mtype: "GET",
        viewrecords : true, //是否要显示总记录数
        page: 1,    //初始页码
        rowNum: -1, //初始化pageSize
        pager : GroupCost.pagerId1,
        datatype: "json",
        caption:"项目消费合计",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "company"
        },
        colNames: ['公司','项目','AI总消费','通话总消费','总消费'],
        colModel: [
            {name: 'company', index: 'company', align:"center",sortable: false},
            {name: 'project', index: 'project',align:"center",sortable: false},
            {name: 'ai', index: 'ai',align:"center", sortable: false,  formatter:  GroupCost.formatMoney},
            {name: 'call', index: 'call', align:"center", sortable: false,  formatter: GroupCost.formatMoney},
            {name: 'total', index: 'total', align:"center", sortable: false,formatter:  GroupCost.formatMoney}
        ]
    });
    return tableInstance;
};
//格式化金钱
GroupCost.formatMoney = function(number) {
    return OSREC.CurrencyFormatter.format(number / 1000, {currency: 'CNY', pattern: "!#,##0.000"});
};
function number_format(number, decimals, dec_point, thousands_sep) {
     /*
  * 参数说明：
  * number：要格式化的数字
  * decimals：保留几位小数
  * dec_point：小数点符号
  * thousands_sep：千分位符号
  * */
     number = (number + '').replace(/[^0-9+-Ee.]/g, '');
      var n = !isFinite(+number) ? 0 : +number,
       prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
       sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
       dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
       s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.ceil(n * k) / k;
            };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
            s[0] = s[0].replace(re, "$1" + sep + "$2");
   }

    if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
    }
      return s.join(dec);
  }
//根据关键词搜索
GroupCost.search = function () {
    var searchParam = {};
    searchParam.projectId =$("#project").val();

    searchParam.companyId =  $("#company").val();
    if(!searchParam.companyId||!searchParam.projectId){
        info("请选择公司或项目！");
        return;
    }
    searchParam.day=$("#day").val().replace(/-/g,"");
    GroupCost.width =$(".wrapper-content").width();
    GroupCost.table = GroupCost.initJqGrid();
    GroupCost.table2 = GroupCost.initJqGrid2();
    GroupCost.table.setGridParam({
            postData: searchParam
        });
    GroupCost.table2.setGridParam({
        postData: searchParam
    });
    GroupCost.table.trigger("reloadGrid");
    GroupCost.table2.trigger("reloadGrid");
}

//初始化日 -日期插件
function initDayTimePicker() {
    var dateTimePickerOption = {
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        startView: 2,
        minView: 2,
        forceParse: false,
        language: 'zh-CN'
    };
    var startDate = $('#day');
    var today = new Date();
    startDate.val(dateFtt("yyyy-MM-dd",today));
    startDate.datetimepicker(dateTimePickerOption);
}
function initMonthTimePicker(){
    var month = $('#month');
    var today = new Date();
     month.val(DateFormat.format(today,"yyyy-MM"));
    month.datepicker({
        minViewMode: 1,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayHighlight: true,
        format: "yyyy-mm",
        language: "zh-CN"
    }).on("changeDate", function (e) {
        // CompanyBill.changeDate();
    });

}
function dateFtt(fmt,date)
{ //author: meizz
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
function changeCompany(){
    $("#company").change(function () {
        var company = $("#company").val();
        var project =$("#project").val();
        $.ajax({
            url:"/groupCost/getProjectList?companyId="+company,
            type: 'GET',
            contentType: "application/json",
            success:function (r) {
                var projectList = r.obj.projectList;
                var optionProject;//项目下拉框
                $("#project").empty();
                 // optionProject="<option value=\"\">全部</option>";
                if(projectList!==undefined && projectList !==null) {
                    for (var i = 0; i < projectList.length; i++) {
                        optionProject += "<option  value='" + projectList[i].id + "'>" + projectList[i].name + "</option>";
                    }
                }
                $("#project").append(optionProject);
            }
        });
    });
}
$(function() {
    initDayTimePicker();
    changeCompany();
});