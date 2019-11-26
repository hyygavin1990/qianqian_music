var StaffCount = {
    tableId: "#grid-table1",
    pagerId: "#grid-pager1",
    pagerId1:"#grid-pager3",
    table: null,
    table2: null,
    domain: "staffCount",
    width:null
}
//jqGrid初始化
StaffCount.initJqGrid = function () {
    var tableInstance = $("#grid-table1").jqGrid({
        url:"/staffCount/grid1",
        postData:{
            projectId: $("#project").val(),
            staffGroupId : $("#staffGroup").val(),
            // staffId : $("#staff").val(),
            day:$("#day").val().replace(/-/g,""),
            companyId:$("#company").val()
        },
        width:StaffCount.width,
        height:500,
        mtype: "GET",
        viewrecords : true, //是否要显示总记录数
        page: 1,    //初始页码
        rowNum:  -1, //初始化pageSize
        pager : StaffCount.pagerId,
        datatype: "json",
        caption: "当日统计",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj.rows
            },
            page: function (data) {
                return data.obj.page
            },
            total: function (data) {
                return data.obj.total
            },
            records: function (data) {
                return data.obj.records
            },
            repeatitems: false,
            id: "_id"
        },
        colNames: ['坐席','接通量','成单量(H2成单率)','通话时长(单通时长)','等待时长(平均等待时长)'],
        colModel: [
            {name: '_id', index: '_id', align:"center",sortable: false},
            {name: 'connect_num', index: 'connect_num',align:"center",sortable: false},
            {name: 'leads_num', index: 'leads_num',align:"center",  sortable: false},
            {name: 'h2duration', index: 'h2duration',align:"center", sortable: false},
            {name: 'free_time', index: 'free_time', align:"center", sortable: false},
        ]

    });
    return tableInstance;
};
StaffCount.initJqGrid2 = function () {
    var tableInstance = $("#grid-table3").jqGrid({
        url : "/staffCount/grid2",
        postData:{
            projectId: $("#project").val(),
            staffGroupId : $("#staffGroup").val(),
            // staffId : $("#staff").val(),
            month:$("#month").val().replace(/-/g,""),
            companyId:$("#company").val()
        },
        width:StaffCount.width,
        height:500,
        mtype: "GET",
        viewrecords : true, //是否要显示总记录数
        page: 1,    //初始页码
        rowNum: -1, //初始化pageSize
        pager : StaffCount.pagerId1,
        datatype: "json",
        caption:"单月统计",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj.rows
            },
            page: function (data) {
                return data.obj.page
            },
            total: function (data) {
                return data.obj.total
            },
            records: function (data) {
                return data.obj.records
            },
            repeatitems: false,
            id: "_id"
        },
        colNames: ['坐席','接通量','成单量(H2成单率)','通话时长(单通时长)','等待时长(平均等待时长)'],
        colModel: [
            {name: '_id', index: '_id', align:"center",sortable: false},
            {name: 'connect_num', index: 'connect_num',align:"center",sortable: false},
            {name: 'leads_num', index: 'leads_num',align:"center",  sortable: false},
            {name: 'h2duration', index: 'h2duration',align:"center", sortable: false},
            {name: 'free_time', index: 'free_time', align:"center", sortable: false},
        ]
    });
    return tableInstance;
};



StaffCount.dayTotal = function(){
    dayBarShow();
    StaffCount.width =$(".tabs-container").width();
    StaffCount.table = StaffCount.initJqGrid();
    // StaffCount.search();
    // StaffCount.table.trigger("reloadGrid");
    $.ajax({
        url: "/staffCount/dayTotal?projectId=" + $("#project").val() + "&day=" + $("#day").val().replace(/-/g,"")+ "&month=" + $("#month").val().replace(/-/g,"")+ "&companyId=" + $("#company").val()+"&staffGroupId="+$("#staffGroup").val(),
        type: "GET",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var data = r.obj.day;
                $("#leads").text(data.leads);
                $("#connectAvg").text(data.avg_tranfernum);
                $("#leadsAvg").text(data.avg_leadsnum);
                $("#durationAvg").text(data.avg_h2duartion);
                $("#freeAvg").text(data.avg_freetime);
            }
          StaffCount.search();
        }
    });
}


StaffCount.monthTotal= function(){
    monthBarShow();
    StaffCount.width =$(".tabs-container").width();
    StaffCount.table2 = StaffCount.initJqGrid2();
    // StaffCount.search();
    $.ajax({
        url: "/staffCount/monthTotal?projectId=" + $("#project").val()+ "&month=" + $("#month").val().replace(/-/g,"")+ "&companyId=" + $("#company").val()+"&staffGroupId="+$("#staffGroup").val(),
        type: "GET",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var data = r.obj.month;
                $("#leads").text(data.leads);
                $("#connectAvg").text(data.avg_tranfernum);
                $("#leadsAvg").text(data.avg_leadsnum);
                $("#durationAvg").text(data.avg_h2duartion);
                $("#freeAvg").text(data.avg_freetime);
            }
           StaffCount.search();
        }
    });
}
function  dayBarShow(){
    var day =document.getElementById("daySearch");
    var  month =document.getElementById("monthSearch");
    month.style.display="none";
    day.style.display="inline";
}
function  monthBarShow(){
    var day =document.getElementById("daySearch");
    var  month =document.getElementById("monthSearch");
    day.style.display="none";
    month.style.display="inline";
}
//根据关键词搜索
StaffCount.search = function () {
    var a = document.getElementById("tabMonth");
    var b = document.getElementById("tabDay");
    var searchParam = {};
    searchParam.projectId =$("#project").val();
    searchParam.staffGroupId=$("#staffGroup").val();
    // searchParam.staffId =  $("#staff").val();
    searchParam.companyId =  $("#company").val();
    searchParam.month=$("#month").val().replace(/-/g,"");
    searchParam.day=$("#day").val().replace(/-/g,"");
    if(a.innerText ==="月" && a.getAttribute("aria-expanded")==="true"){
        StaffCount.monthTotal();
        StaffCount.table2.setGridParam({
            postData: searchParam
        });
        StaffCount.initJqGrid2();
        // $("#grid-table2").GridUnload();
        StaffCount.table2.trigger("reloadGrid");
        console.log(typeof a.getAttribute("aria-expanded")+a.innerText);
    }

    if(b.innerText ==="日" && b.getAttribute("aria-expanded")==="true"){
        console.log(typeof b.getAttribute("aria-expanded")+b.innerText);
        StaffCount.dayTotal();
        // $("#grid-table1").GridUnload();
        StaffCount.initJqGrid();
        StaffCount.table.setGridParam({
            postData: searchParam
        });
        StaffCount.table.trigger("reloadGrid");
    }

}

//基本信息下拉框触发事件
StaffCount.tableReload = function(){
    var searchParam = {};
    searchParam.id = $("#projectId").val();
    searchParam.StaffCount = $("#dateTime").val();
    StaffCount.table.setGridParam({
        url:"/report_StaffCount/grid",
        postData:searchParam
    }).trigger("reloadGrid");
    StaffCount.table2.setGridParam({
        url:"/report_StaffCount/gridd",
        postData:searchParam
    }).trigger("reloadGrid");
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
        var staffGroup =$("#staffGroup").val();
        $.ajax({
            url:"/staffCount/getProjectList?companyId="+company+"&projectId="+project,
            type: 'GET',
            contentType: "application/json",
            success:function (r) {
                var projectList = r.obj.projectList;
                var staffGroupList=r.obj.staffGroupList;
                var optionProject;//项目下拉框
                var optionGroup;//分组下拉框
                $("#project").empty();
                $("#staffGroup").empty();
                 optionProject="<option value=\"\">全部</option>";
                 optionGroup="<option value=\"\">全部</option>";
               if(staffGroupList !==undefined &&staffGroupList!==null){
                    for(var i=0;i<staffGroupList.length;i++){
                            optionGroup += "<option  value='"+staffGroupList[i].id+"'>"+staffGroupList[i].name+"</option>";
                    }
               }
                if(projectList!==undefined && projectList !==null) {
                    for (var i = 0; i < projectList.length; i++) {
                        optionProject += "<option  value='" + projectList[i].id + "'>" + projectList[i].name + "</option>";
                    }
                }
                 $("#staffGroup").append(optionGroup);
                $("#project").append(optionProject);
            }
        });
    });
    $("#project").change(function () {
        var company = $("#company").val();
        var project =$("#project").val();
        var staffGroup =$("#staffGroup").val();
        $.ajax({
            url:"/staffCount/getProjectList?companyId="+company+"&projectId="+project,
            type: 'GET',
            contentType: "application/json",
            success:function (r) {

                var staffGroupList=r.obj.staffGroupList;
                var optionGroup;//分组下拉框
                $("#staffGroup").empty();
                optionGroup="<option value=\"\">全部</option>";
                if(staffGroupList!==undefined && staffGroupList !==null){
                    for(var i=0;i<staffGroupList.length;i++){
                            optionGroup += "<option  value='"+staffGroupList[i].id+"'>"+staffGroupList[i].name+"</option>";
                    }
                }
                $("#staffGroup").append(optionGroup);
            }
        });
    });
}
$(function() {
    initDayTimePicker();
    initMonthTimePicker();
    dayBarShow();
    changeCompany();
     // $('.search-select').chosen();
    StaffCount.width =$(".tabs-container").width();
    StaffCount.dayTotal();
    StaffCount.table = StaffCount.initJqGrid();
    // StaffCount.table2 = StaffCount.initJqGrid2();

});