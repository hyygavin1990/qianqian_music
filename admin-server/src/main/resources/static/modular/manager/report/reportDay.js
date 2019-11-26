var Day = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    table2: null,
    domain: "report_day"
}
//jqGrid初始化
Day.initJqGrid = function () {
    var tableInstance = $("#grid-table").jqGrid({
        url:"/report_day/grid2",
        autowidth:true,
        mtype: "GET",
        height: 150,
        viewrecords : true, //是否要显示总记录数
        datatype: "json",
        caption: "基本数据",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "callerid"
        },
        colNames: ['leads数', '成单率', '外呼时长', '号码总数', '接通量（接通率）', '单个leads消耗量','坐席人数','人均成单量' +
        '（H2成单率）','转接数量（转接率）','人均接通量','人均通话时长(人均等待时长)','人均单通通话时长','成单未质检数' +
        '（成单未质检率）','质检人数','已质检量（已质检率）','人均质检量（质检通过率）'],
        colModel: [
            {name: 'leads_num', index: 'leads_num', width: 150, sortable: false},
            {name: 'leads_percent', index: 'leads_percent', width: 150, sortable: false},
            {name: 'duration', index: 'duration', width: 150, sortable: false},
            {name: 'call_num', index: 'call_num', width: 150, sortable: false},
            {name: 'connect_num_percent', index: 'connect_num_percent', width: 150, sortable: false},
            {name: 'leads_use_num', index: 'leads_use_num', width: 150, sortable: false},
            {name: 'staff_num', index: 'staff_num', width: 150, sortable: false},
            {name: 'avg_leads_num_percent', index: 'avg_leads_num_percent', width: 150, sortable: false},
            {name: 'transfer_num_percent', index: 'transfer_num_percent', width: 150, sortable: false},
            {name: 'avg_connect_num', index: 'avg_connect_num', width: 150, sortable: false},
            {name: 'avg_call_time_free', index: 'avg_call_time_free', width: 150, sortable: false},
            {name: 'avg_time', index: 'avg_time', width: 150, sortable: false},
            {name: 'no_quality_percent', index: 'no_quality_percent', width: 150, sortable: false},
            {name: 'quality_user_num', index: 'quality_user_num', width: 150, sortable: false},
            {name: 'quality_num_percent', index: 'quality_num', width: 150, sortable: false},
            {name: 'avg_quality_num_percent', index: 'avg_quality_num_percent', width: 150, sortable: false}
        ],
        shrinkToFit:false,
        autoScroll: true
    });
    return tableInstance;
};
Day.initJqGrid2 = function () {
    var tableInstance = $("#grid-table2").jqGrid({
        url : "/report_day/grid3",
        autowidth:true,
        mtype: "GET",
        height: 150,
        viewrecords : true, //是否要显示总记录数
        datatype: "json",
        caption:"当日成本、营收数据展示",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "id"
        },
        colNames: ['单个leads成本', '话费成本','平均单通话费', '翻译费用', '人工成本', '税收成本', '其他成本','预计营收','利润','毛利润率'],
        colModel: [
            {name: 'oneLeadsFree', index: 'oneLeadsFree', width: 200, sortable: false},
            {name: 'callCost', index: 'callCost', width: 200, sortable: false},
            {name: 'avgCallCost', index: 'avgCallCost', width: 200, sortable: false},
            {name: 'transLateCost', index: 'transLateCost', width: 200, sortable: false},
            {name: 'laborCost', index: 'laborCost', width: 200, sortable: false},
            {name: 'taxCost', index: 'taxCost', width: 200, sortable: false},
            {name: 'otherCost', index: 'otherCost', width: 200, sortable: false},
            {name: 'planRevenue', index: 'planRevenue', width: 200, sortable: false},
            {name: 'profit', index: 'profit', width: 200, sortable: false},
            {name: 'profitPercent', index: 'profitPercent', width: 200, sortable: false}
        ],
        shrinkToFit:false,
        autoScroll: true
    });
    return tableInstance;
};
//导出excel
Day.exportExcel = function() {
    var id = $("#projectId").val();
    var day = $("#dateTime").val();
    $.ajax({
        type : 'GET',
        url: '/report_day/recharge/export?id=' + id+'&day='+day,
        success : function(data) {
            if (data.code === 0) {
                window.open("/report_day/recharge/download?key="+data.obj);
            }
        }
    });
};
Day.exportExcel2 = function() {
    var id = $("#projectId").val();
    var day = $("#dateTime").val();
    $.ajax({
        type : 'GET',
        url: '/report_day/recharge/export2?id=' + id+'&day='+day,
        success : function(data) {
            if (data.code === 0) {
                window.open("/report_day/recharge/download2?key="+data.obj);
            }
        }
    });
};
Day.gettable = function(projectGroupId,dateTime){
    $.ajax({
        url:"/report_day/table?pGroupId="+projectGroupId+"&day="+dateTime,
        type:"GET",
        dateType:"json",
        success:function (r) {
            if(r.code===0){
                var data = r.obj;
                var pPriceConfigList = data.pPriceConfigList;
                var projectGroup = data.projectGroup;
                var projects = data.projects;
                var tbody = $(".tbody");
                tbody.empty();
                for(var i=0;i<pPriceConfigList.length;i++){
                    tbody.append("<tr>\n" +
                        "<td><label>"+pPriceConfigList[i].pname+"</label></td>\n" +
                        "<input type=\"hidden\" value=\""+pPriceConfigList[i].pid+"\">\n" +
                        "<td><input type=\"text\" value=\""+pPriceConfigList[i].leadsprice+"\"/></td>\n" +
                        // "<td><input type=\"text\" value=\""+pPriceConfigList[i].translatecost+"\"/></td>\n" +
                        "<td><input type=\"text\" value=\""+pPriceConfigList[i].laborcost+"\"/></td>\n" +
                        // "<td><input type=\"text\" value=\""+pPriceConfigList[i].callcost+"\"/></td>\n" +
                        "<td><input type=\"text\" value=\""+pPriceConfigList[i].othercost+"\"/></td>\n" +
                        "</tr>");
                }
                var projectId = $("#projectId");
                projectId.empty();
                projectId.append("<option value=\"g"+projectGroup.id+"\">"+projectGroup.name+"项目组</option>");
                for(var j=0;j<projects.length;j++){
                    projectId.append("<option value=\"p"+projects[j].id+"\">"+projects[j].name+"</option>");
                }
            }
        }
    });
}
Day.getTomorrowTarger = function(projectGroupId,dateTime){
    $.ajax({
        url: "/report_day/getTomorrowTarget?groupid=" + projectGroupId + "&day=" + dateTime,
        type: "GET",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var data = r.obj;
                $(".planRevenueTomorrow").text(data.planRevenueDay);
                $(".profitTomorrow").text(data.profitDay);
                $(".leadsTomorrow").text(data.leadsDay);
            }
        }
    });
}
Day.getDayFinishi = function(projectGroupId,dateTime){
    $.ajax({
        url: "/report_day/getDayFinishTarget?groupid=" + projectGroupId + "&day=" + dateTime,
        type: "GET",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var data = r.obj;
                var datadayF=[];
                var dataday=[];
                datadayF.push(data.planRevenueDayF);
                datadayF.push(data.profitDayF);
                datadayF.push(data.leadsnumDayF);
                dataday.push(data.planRevenueDay);
                dataday.push(data.profitDay);
                dataday.push(data.leadsDay);
                var mychart = Day.chart();
                mychart.hideLoading();
                mychart.setOption({
                    series: [{
                        name:'当日目标',
                        data: dataday
                    },
                        {
                            name:'当日已完成',
                            data: datadayF
                        }]
                });
            }
        }
    });
}
//根据关键词搜索
Day.search = function () {
    var projectGroupId = $("#projectGroupId").val();
    var dateTime = $("#dateTime").val();
    Day.gettable(projectGroupId,dateTime);
    Day.getTomorrowTarger(projectGroupId,dateTime);
    Day.getDayFinishi(projectGroupId,dateTime);
    Day.reload();
}
Day.reload = function () {
    var hidehead = ["leads_num","leads_percent","duration","call_num","connect_num_percent","leads_use_num","staff_num","avg_leads_num_percent","transfer_num_percent","avg_connect_num","avg_call_time_free","avg_time","no_quality_percent","quality_user_num","quality_num_percent","avg_quality_num_percent"];
    var hidehead2 = ["oneLeadsFree","callCost","avgCallCost","transLateCost","laborCost","taxCost","otherCost","planRevenue","profit","profitPercent"];
    var searchParam = {};
    searchParam.id = "g"+$("#projectGroupId").val();
    searchParam.day = $("#dateTime").val();
    $.ajax({
        url:"/report_day/getHeardInit?groupid="+$("#projectGroupId").val(),
        type:"GET",
        dataType:"json",
        success:function (r) {
            if(r.code===0){
                var headInit = r.obj;
                Day.table.setGridParam({
                    url : "/report_day/grid",
                    postData: searchParam
                }).showCol(headInit).trigger("reloadGrid");
            }
        },
        beforeSend:function(mes){
            Day.table.setGridParam({url:"/report_day/grid2"}).hideCol(hidehead).trigger("reloadGrid");
            Day.table2.setGridParam({url:"/report_day/grid3"}).hideCol(hidehead2).trigger("reloadGrid");
        },
        complete:function () {
            $.ajax({
                url:"/report_day/getHeardInit2?groupid="+$("#projectGroupId").val(),
                type:"GET",
                dataType:"json",
                success:function (r) {
                    if(r.code===0){
                        var headInit = r.obj;
                        Day.table2.setGridParam({
                            url : "/report_day/gridd",
                            postData: searchParam
                        }).showCol(headInit).trigger("reloadGrid");
                    }
                }
            });
        }
    });
};
//基本信息下拉框触发事件
Day.tableReload = function(){
    var searchParam = {};
    searchParam.id = $("#projectId").val();
    searchParam.day = $("#dateTime").val();
    Day.table.setGridParam({
        url:"/report_day/grid",
        postData:searchParam
    }).trigger("reloadGrid");
    Day.table2.setGridParam({
        url:"/report_day/gridd",
        postData:searchParam
    }).trigger("reloadGrid");
}
//提交每日计费配置
Day.submit = function () {
    var projectGroupId = $("#projectGroupId").val();
    var dateTime = $("#dateTime").val();
    var listParam = getParam();
    $.ajax({
        url:"/report_day/submit",
        data:JSON.stringify(listParam),
        contentType: "application/json;charset=utf-8",
        type:"POST",
        success:function (r) {
            if(r.code===0){
                success(r.msg);
            }
        },
        complete:function () {
            Day.gettable(projectGroupId,dateTime);
            Day.getTomorrowTarger(projectGroupId,dateTime);
            Day.getDayFinishi(projectGroupId,dateTime);
            Day.reload();
        }
    });
}
//组装form表单的信息
function getParam(){
    var listParam=new Array();
    $("#form1 tr").each(function (i) {
        if(i!=0){
            var param={};
            param.pid=$(this).find("input").val();
            param.day=$("#dateTime").val();
            $(this).children("td").each(function (j) {
                var para = $(this).find("input").val();
                var value = para;
                if(j==1){
                    param.leadsPrice=value;
                }else if(j==2){
                    param.translateCost=value;
                }else if(j==3){
                    param.laborCost=value;
                }else if(j==4){
                    param.callCost=value;
                }else if(j==5){
                    param.otherCost=value;
                }
            });
            listParam[i-1]=param;
        }
    });
    return listParam;
}
//配置表头1
Day.showTableHead = function() {
    $.ajax({
        url: "/report_day/selectHead?groupId="+$("#projectGroupId").val(),
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var list = r.obj;
                var form = $("#create-form");
                var html = '';
                for(var i=0;i<list.length;i++){
                    if(list[i].selected === 'true'){
                        html += '<label class="col-md-6"><input style="width:30px;height:15px"  type="checkbox" checked  value='+list[i].id+'>'+list[i].name+'</input></label>';
                    }else{
                        html += '<label class="col-md-6"><input style="width:30px;height:15px"  type="checkbox"  value='+list[i].id+'>'+list[i].name+'</input></label>';
                    }
                    if((i+1)%3 ===0){
                        html += '<br>';
                    }
                }
                form.html(html);
                $("#createModal").modal();
            }
        }
    })

};
//配置表头2
Day.showTableHead2 = function() {
    $.ajax({
        url: "/report_day/selectHead2?groupId="+$("#projectGroupId").val(),
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var list = r.obj;
                var form = $("#create-form2");
                var html = '';
                for(var i=0;i<list.length;i++){
                    if(list[i].selected === 'true'){
                        html += '<label class="col-md-6"><input style="width:30px;height:15px"  type="checkbox" checked  value='+list[i].id+'>'+list[i].name+'</input></label>';
                    }else{
                        html += '<label class="col-md-6"><input style="width:30px;height:15px"  type="checkbox"  value='+list[i].id+'>'+list[i].name+'</input></label>';
                    }
                    if((i+1)%3 ===0){
                        html += '<br>';
                    }

                }
                form.html(html);
                $("#createModal2").modal();
            }
        }
    })

};
//全选
Day.checkAll = function () {
    $("#create-form").children().find("input[type=checkbox]").prop("checked",true);
}
Day.checkAll2 = function () {
    $("#create-form2").children().find("input[type=checkbox]").prop("checked",true);
}
//全不选
Day.checkNo = function () {
    $("#create-form").children().find("input[type=checkbox]").prop("checked",false);
}
Day.checkNo2 = function () {
    $("#create-form2").children().find("input[type=checkbox]").prop("checked",false);
}
//保存表头数据
Day.insert = function () {
    var arr = new Array();
    $("#create-form :checkbox").each(function () {
        if ($(this).is(':checked')) {
            arr.push( $(this).val());
        }
    });
    if(arr.length == 0){
        info("请最少选择一个表头");
        return;
    }
    var str = arr.join(',');
    $.ajax({
        type : 'GET',
        url: '/report_day/insert?str=' + str+'&groupid='+$("#projectGroupId").val(),
        success : function(data) {
            if (data.code === 0){
                success("保存成功");
                $("#createModal").modal("hide");
                Day.reloadHead(str);
                // window.location.href = "/report_month/list"
            }
        }
    })
};
Day.insert2 = function () {
    var arr = new Array();
    $("#create-form2 :checkbox").each(function () {
        if ($(this).is(':checked')) {
            arr.push( $(this).val());
        }
    });
    if(arr.length == 0){
        info("请最少选择一个表头");
        return;
    }
    var str = arr.join(',');
    $.ajax({
        type : 'GET',
        url: '/report_day/insert2?str=' + str+'&groupid='+$("#projectGroupId").val(),
        success : function(data) {
            if (data.code === 0){
                success("保存成功");
                $("#createModal2").modal("hide");
                Day.reloadHead2(str);
                // window.location.href = "/report_month/list"
            }
        }
    })
};
Day.reloadHead = function (str) {
    var hidehead = ["leads_num","leads_percent","duration","call_num","connect_num_percent","leads_use_num","staff_num","avg_leads_num_percent","transfer_num_percent","avg_connect_num","avg_call_time_free","avg_time","no_quality_percent","quality_user_num","quality_num_percent","avg_quality_num_percent"];
    $.ajax({
        url:"/report_day/getHeardSelected?str="+str,
        type:"GET",
        dateType:"json",
        success:function (r) {
            if(r.code===0){
                var searchParam = {};
                var head = r.obj;
                searchParam.id = $("#projectId").val();
                searchParam.day = $("#dateTime").val();
                Day.table.setGridParam({
                    url : "/report_day/grid",
                    postData: searchParam
                }).showCol(head).trigger("reloadGrid");
            }
        },
        beforeSend:function (mes) {
            Day.table.setGridParam().hideCol(hidehead).trigger("reloadGrid");
        }
    });
};
Day.reloadHead2 = function (str) {
    var hidehead2 = ["oneLeadsFree","callCost","avgCallCost","transLateCost","laborCost","taxCost","otherCost","planRevenue","profit","profitPercent"];
    $.ajax({
        url:"/report_day/getHeardSelected?str="+str,
        type:"GET",
        dateType:"json",
        success:function (r) {
            if(r.code===0){
                var searchParam = {};
                var head = r.obj;
                searchParam.id = $("#projectId").val();
                searchParam.day = $("#dateTime").val();
                Day.table2.setGridParam({
                    url : "/report_day/gridd",
                    postData: searchParam
                }).showCol(head).trigger("reloadGrid");
            }
        },
        beforeSend:function (mes) {
            Day.table2.setGridParam().hideCol(hidehead2).trigger("reloadGrid");
        }
    });
};
// 基于准备好的dom，初始化echarts实例
Day.chart = function () {
    var chart = echarts.init(document.getElementById('chart'));
    option = {
        title : {
            text: '当日目标',
            subtext: '包括当日完成情况'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer:{
                type:'shadow'
            }
        },
        legend: {
            data:[
                '当日目标','当日已完成',
            ]
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar','stack']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        grid: {y: 70, y2:30, x2:20},
        xAxis : [
            {
                type : 'category',
                data : ['营收目标','利润目标','leads目标']
            },
            {
                type : 'category',
                axisLine: {show:false},
                axisTick: {show:false},
                axisLabel: {show:false},
                splitArea: {show:false},
                splitLine: {show:false},
                data : ['营收目标','利润目标','leads目标']
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel:{formatter:'{value}'}
            }
        ],
        series : [
            {
                name:'当日目标',
                type:'bar',
                itemStyle: {normal: {color:'#009999', label:{show:true}}},
                data:[]
            },
            {
                name:'当日已完成',
                type:'bar',
                itemStyle: {normal: {color:'#55c9dd', label:{show:true,textStyle:{color:'#27727B'}}}},
                data:[]
            }
        ]
    };
    chart.showLoading();
    chart.setOption(option);
    return chart;
}
//初始化日期插件
function initDateTimePicker() {
    var dateTimePickerOption = {
        minView:'month',
        format: 'yyyy-mm-dd',
        todayBtn: true,
        autoclose: true,
        minuteStep: 1
    };
    var dateTime = $('#dateTime');
    //开始日期默认今天零点
    var today = new Date();
    dateTime.val(dateFtt("yyyy-MM-dd",today));
    dateTime.datetimepicker(dateTimePickerOption);
    //结束日期默认明天零点
    dateTimePickerOption.initialDate = today;
}
function dateFtt(fmt,date) { //author: meizz
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
$(function() {
    //日期
    initDateTimePicker();
    //初始图表
    Day.chart();
    Day.table = Day.initJqGrid();
    Day.table2 = Day.initJqGrid2();
    var projectGroupId = $("#projectGroupId").val();
    var dateTime = $("#dateTime").val();
    Day.gettable(projectGroupId,dateTime);
    Day.getTomorrowTarger(projectGroupId,dateTime);
    Day.getDayFinishi(projectGroupId,dateTime);
    Day.reload();
});