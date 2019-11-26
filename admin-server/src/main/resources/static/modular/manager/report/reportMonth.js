var ReportMonth = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "report"
};

/**
 * jqGrid初始化参数
 */
ReportMonth.init = function () {
    var jqGrid = $("#grid-table").jqGrid({
        url : "/report_month/grid",
        autowidth:true,
        mtype: "GET",
        datatype: "json",
        postData:{
            groupId:$("#groupId").val(),
            month:$("#month").val()
        },
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj.list
            },
            repeatitems: false,
            id: "_id"
        },
        height:400,
        shrinkToFit:false,
        caption:"当月数据汇总展示",
        colNames: ['时间', 'leads数', '成单率','外呼时长','号码总数', '接通量(接通率)', '单个leads消耗量','坐席人数','人均成单量(H2成单率)','转接数量(转接率)','人均接通量','人均通话时长(人均等待时长)','人均单通通话时长','成单未质检数(成单未质检率)','质检人数','已质检量(已质检率)','人均质检量(质检通过率)','单个leads成本','话费成本','平均单通话费','翻译费用','人工成本','税收成本','其他成本','预计营收','利润','毛利润率'],
        colModel: [
            {name: '_id', index: '_id', width: 80,align:"center",sortable: false,frozen:true, formatter: function (cellValue, options, rowObject){
                var str = '';
                var id = rowObject["_id"];
                if(id ==='汇总'){
                    return id;
                }
                return id;
            }},
            {name: 'leads_num', index: 'leads_num', width: 60, sortable: false},
            {name: 'leads_percent', index: 'leads_percent', width: 60, sortable: false},
            {name: 'duration', index: 'duration', width: 60, sortable: false},
            {name: 'call_num', index: 'call_num', width: 60, sortable: false},
            {name: 'connect_num_percent', index: 'connect_num_percent', width: 80, sortable: false},
            {name: 'leads_use_num', index: 'leads_use_num', width: 60, sortable: false},
            {name: 'staff_num', index: 'staff_num', width: 60,sortable: false},
            {name: 'avg_leads_num_percent', index: 'avg_leads_num_percent', width: 80, sortable: false},
            {name: 'transfer_num_percent', index: 'transfer_num_percent', width: 80, sortable: false},
            {name: 'avg_connect_num', index: 'avg_connect_num', width: 60, sortable: false},
            {name: 'avg_call_time_free', index: 'avg_call_time_free', width: 80, sortable: false},
            {name: 'avg_time', index: 'avg_time', width: 60, sortable: false},
            {name: 'no_quality_percent', index: 'no_quality_percent', width: 80, sortable: false},
            {name: 'quality_user_num', index: 'quality_user_num', width: 60, sortable: false},
            {name: 'quality_num_percent', index: 'quality_num_percent', width: 80, sortable: false},
            {name: 'avg_quality_num_percent', index: 'avg_quality_num_percent', width: 80, sortable: false},
            {name: 'oneLeadsFree', index: 'oneLeadsFree', width: 60, sortable: false},
            {name: 'callCost', index: 'callCost', width: 60, sortable: false},
            {name: 'avgCallCost', index: 'avgCallCost', width: 60, sortable: false},
            {name: 'transLateCost', index: 'transLateCost', width: 60, sortable: false},
            {name: 'laborCost', index: 'laborCost', width: 60, sortable: false},
            {name: 'taxCost', index: 'taxCost', width: 60, sortable: false},
            {name: 'otherCost', index: 'otherCost', width: 60, sortable: false},
            {name: 'planRevenue', index: 'planRevenue', width: 60, sortable: false},
            {name: 'profit', index: 'profit', width: 60, sortable: false},
            {name: 'profitPercent', index: 'profitPercent', width: 60, sortable: false}

        ],

        loadComplete: function(r) {
            if (r.code === 0) {
                var list = r.obj.list;
                var dayArr = [];
                var doProfit = [];
                var doLeads = [];
                var doRevenue = [];
                var month = [];
                var domonth = [];
                for(var i=0;i<list.length;i++){
                    if(list[i]._id === '汇总'){
                        month.push(list[i].profit.substring(1));
                        month.push(list[i].leads_num);
                        month.push(list[i].planRevenue.substring(1));
                    }else{
                        var doc = list[i];
                        dayArr[i] = parseInt(doc._id);
                        doProfit[i] = doc.profit.substring(1);
                        doLeads[i] = doc.leads_num;
                        doRevenue[i] = doc.planRevenue.substring(1);
                    }

                }
                // var headAll = r.obj.headAll;
                // for(var i=0;i<headAll.length;i++){
                //     $("#grid-table").setGridParam().showCol(headAll[i].head);
                // }

                var heads = r.obj.heads;
                for(var i=0;i<heads.length;i++){
                    $("#grid-table").setGridParam().hideCol(heads[i]);
                }



                $("#grid-table").trigger("reloadGrid")

                var pgt = r.obj.pgt;
                if(pgt!=null){
                    domonth.push(pgt.profit);
                    domonth.push(pgt.leads);
                    domonth.push(pgt.revenue);

                    $("#profit").val(pgt.profit);
                    $("#leads").val(pgt.leads);
                    $("#revenue").val(pgt.revenue);
                    $("#workday").val(pgt.workday);
                    $("#leadsprice").val(pgt.leadsprice);
                    $("#callprice").val(pgt.callprice);
                    $("#aiprice").val(pgt.aiprice);
                }else{
                    return info("查询的月份目标没配置");
                }


                option.xAxis.data = dayArr;
                option.series[0].data = doProfit;
                option.series[1].data = doLeads;
                option.series[2].data = doRevenue;
                // 使用刚指定的配置项和数据显示图表。
                chart.setOption(option, true);

                option2.series[0].data = month;
                option2.series[1].data = domonth;
                cylinder.setOption(option2,true);
            }
        }
    });
    $("#grid-table").jqGrid('setFrozenColumns');//滑动时此列冻结设置
    // $("#grid-table").jqGrid('setFrozenRows');//滑动时此列冻结设置
    return jqGrid;
};

ReportMonth.format = function(number){
    return number = number*100+'%';
}

// 基于准备好的dom，初始化echarts实例
var chart = echarts.init(document.getElementById('chart'));

// 基于准备好的dom，初始化echarts实例
var cylinder = echarts.init(document.getElementById('cylinder'));

// 指定图表的配置项和数据——折线图
var option = {
    title: {
        text: '当月目标完成度'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['利润目标','leads目标', '营收目标']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        name: 'day',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value',
        name: " "
    },
    series: [
        {
            name:'利润目标',
            type:'line',
            data:[]
        },
        {
            name:'leads目标',
            type:'line',
            data:[]
        },
        {
            name:'营收目标',
            type:'line',
            data:[]
        }

    ]
};

option2 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['当月完成数', '总目标数']
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack','tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    calculable: true,
    grid: {y: 70, y2:30, x2:20},
    xAxis: [
        // {
        //     type: 'category',
        //     axisTick: {show: false},
        //     data: ['利润', 'leads数', '营收']
        // }
        {
            type : 'category',
            data : ['利润', 'leads数', '营收']
        },
        {
            type : 'category',
            axisLine: {show:false},
            axisTick: {show:false},
            axisLabel: {show:false},
            splitArea: {show:false},
            splitLine: {show:false},
            data : ['利润', 'leads数', '营收']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '当月完成数',
            type: 'bar',
            itemStyle: {
                normal: {
                    color:'#009999',
                    label:{
                        show:true,
                        position: 'top',
                        textStyle: {
                            color: 'black'
                        }
                    }
                }
            },
            barWidth : 60,//柱图宽度
            data: []
        },
        {
            name: '总目标数',
            type: 'bar',
            itemStyle: {
                normal: {
                    color:'#55c9dd',
                    label:{
                        show:true,
                        position: 'top',
                        textStyle: {
                            color: 'black'
                        }
                    }
                }
            },
            barWidth : 60,//柱图宽度
            data: []
        }
    ]
};




/**
 * 提交月目标
 */

ReportMonth.commit = function(){
    var createForm = getFormJson($("#commit-form"));
    createForm.profit = parseInt(createForm.profit);
    createForm.leads = parseInt(createForm.leads);
    createForm.revenue = parseInt(createForm.revenue);
    createForm.workday = parseInt(createForm.workday);
    createForm.leadsprice = parseInt(createForm.leadsprice);
    createForm.callprice = parseInt(createForm.callprice);
    createForm.aiprice = parseInt(createForm.aiprice);
    if(createForm.workday >31 || createForm.workday <=0){
        return info("工作天数在1~31以内");
    }
    var month = $("#month").val();
    var groupId = parseInt($("#groupId").val());
    createForm.month = month;
    createForm.groupid = groupId;
    console.log(createForm);
    $.ajax({
        url:"/report_month/insertSelective",
        type:"post",
        data:JSON.stringify(createForm),
        contentType:"application/json;charset=UTF-8",
        success:function (r) {
            if (r.code === 0) {
                success("保存成功");
                ReportMonth.search();
            }
        }
    });
}

/**
 * 根据关键词搜索
 */
ReportMonth.search = function () {
    var searchParam = {};
    searchParam.groupId = $("#groupId").val();
    searchParam.month = $("#month").val();
    $("#grid-table").GridUnload();
    ReportMonth.init();
    ReportMonth.table.setGridParam({
        postData: searchParam
    });
    ReportMonth.table.trigger("reloadGrid");

};
/**
 * 导出excel
 */
ReportMonth.exportExcel = function() {
    $.ajax({
        type : 'GET',
        url: '/report_month/recharge/export?month=' + $("#month").val()+'&groupid='+$("#groupId").val(),
        success : function(data) {
            if (data.code === 0) {
                window.open("/report_month/recharge/download?key="+data.obj);
            }
        }
    });
};

/**
 * 配置表头
 */
ReportMonth.showTableHead = function() {
    // $("#create-form").html("");
    $.ajax({
        url: "/report_month/selectHead?groupId="+$("#groupId").val(),
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

/**
 * 保存表头数据
 */
ReportMonth.insert = function () {
    var arr = new Array();
    $("#create-form :checkbox").each(function () {
        if ($(this).is(':checked')) {
            arr.push( $(this).val());
        }
    });
    if(arr.length == 0){
        info("请最少选择一个表头");
    }
    var str = arr.join(',');
    $.ajax({
        type : 'GET',
        url: '/report_month/insert?str=' + str+'&groupid='+$("#groupId").val(),
        success : function(data) {
            if (data.code === 0) {
                success("保存成功");
                $("#createModal").modal("hide");
                ReportMonth.search();
                // window.location.href ="/report_month/list";
            }
        }
    })
};
/**
 * 全选
 */
ReportMonth.checkAll = function () {
    $("#create-form").children().find("input[type=checkbox]").prop("checked",true);
}

/**
 * 全不选
 */
ReportMonth.checkNo = function () {
    $("#create-form").children().find("input[type=checkbox]").prop("checked",false);
}


$(function() {

    var date = new Date();
    var month = $('#month');
    month.val(DateFormat.format(date, "yyyyMM"));
    month.datepicker({
        minViewMode: 1,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayHighlight: true,
        format: "yyyymm",
        language: "zh-CN"
    }).on("changeDate", function (e) {
        // Overview.changeDate();
    });


    ReportMonth.table = ReportMonth.init();

});