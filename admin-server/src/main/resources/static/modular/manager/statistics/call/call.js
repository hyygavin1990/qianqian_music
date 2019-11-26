var Call = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null
};

Call.KeyName = {
    duration: "外呼总时长",
    callnum: "外呼总数量",
    connectnum: "接通量",
    connectpercent: "接通率",
    noquality: "成单未质检量",
    noqualitypercent: "成单未质检率",
    leadsnum: "成单量",
    leadspercent: "成单率",
    leadsusenum: "单个leads消耗量",
    qualityleadspercent: "质检通过率",
    transfernum: "H2接听量",
    dutransferpercentration: "H2接听率",
    h2leadspercent: "H2成单率",
    cantransfernum: "可转接量",
    cantransferpercent: "可转接率",
    nostaffnum: "没有可转接坐席量",
    nostaffpercent: "没有可转接坐席率"

};

//m1项目表头及图表图例
Call.M1 = {
    colNames: ['日期', '外呼总时长', '外呼总数量', '接通量(率)', '成单未质检量(率)', '成单量(率)', '单个leads消耗量', '质检通过率'],
    colModel: [
        {name: 'date', index: 'date', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
            var day = rowObject['date'];
            return '<span class="toHourChart" onclick="Call.initDayChart(\'' + day + '\')">' + day + '</span>';
            }},
        {name: 'duration', index: 'duration', width: 60, sortable: false},
        {name: 'callnum', index: 'callnum', width: 60, sortable: false},
        {name: 'connectnum', index: 'connectnum', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                return rowObject['connectnum'] + "(" + rowObject['connectpercent'] + ")";
            }},
        {name: 'noquality', index: 'noquality', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                return rowObject['noquality'] + "(" + rowObject['noqualitypercent'] + ")";
            }},
        {name: 'leadsnum', index: 'leadsnum', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                return rowObject['leadsnum'] + "(" + rowObject['leadspercent'] + ")";
            }},
        {name: 'leadsusenum', index: 'leadsusenum', width: 60, sortable: false},
        {name: 'qualityleadspercent', index: 'qualityleadspercent', width: 60, sortable: false}
    ],
    legend: ['外呼总时长', '外呼总数量', '接通量', '接通率', '成单未质检量', '成单未质检量率', '成单量', '成单率', '单个leads消耗量', '质检通过率']
};

//m1h2项目表头及图表图例
Call.M1H2 = {
    colNames: ['日期', '外呼总时长', '外呼总数量', '接通量(率)', '成单未质检量(率)', '成单量(率)', '单个leads消耗量', 'H2接听量（率）', 'H2成单率', '可转接量(率)', '没有可转接坐席量(率)'],
    colModel: [
        {name: 'date', index: 'date', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                var day = rowObject['date'];
                return '<span class="toHourChart" onclick="Call.initDayChart(\'' + day + '\')">' + day + '</span>';
            }},
        {name: 'duration', index: 'duration', width: 60, sortable: false},
        {name: 'callnum', index: 'callnum', width: 60, sortable: false},
        {name: 'connectnum', index: 'connectnum', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                return rowObject['connectnum'] + "(" + rowObject['connectpercent'] + ")";
            }},
        {name: 'noquality', index: 'noquality', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                return rowObject['noquality'] + "(" + rowObject['noqualitypercent'] + ")";
            }},
        {name: 'leadsnum', index: 'leadsnum', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                return rowObject['leadsnum'] + "(" + rowObject['leadspercent'] + ")";
            }},
        {name: 'leadsusenum', index: 'leadsusenum', width: 60, sortable: false},
        {name: 'transfernum', index: 'transfernum', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                return rowObject['transfernum'] + "(" + rowObject['transferpercent'] + ")";
            }},
        {name: 'h2leadspercent', index: 'h2leadspercent', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                return rowObject['leadsnum'] + "(" + rowObject['h2leadspercent'] + ")";
            }},
        {name: 'cantransfernum', index: 'cantransfernum', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                return rowObject['cantransfernum'] + "(" + rowObject['cantransferpercent'] + ")";
            }},
        {name: 'nostaffnum', index: 'nostaffnum', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                return rowObject['nostaffnum'] + "(" + rowObject['nostaffpercent'] + ")";
            }}
    ],
    legend: ['外呼总时长', '外呼总数量', '接通量', '接通率', '成单未质检量', '成单未质检量率', '成单量', '成单率', '单个leads消耗量', 'H2接听量', 'H2接听率', 'H2成单率', '可转接量', '可转接率', '没有可转接坐席量', '没有可转接坐席率']
};

//纯人工表头及图表图例
Call.H2 = {
    colNames: ['日期', '外呼总时长', '外呼总数量', '接通量(率)', '成单量(率)', '单个leads消耗量'],
    colModel: [
        {name: 'date', index: 'date', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                var day = rowObject['date'];
                return '<span class="toHourChart" onclick="Call.initDayChart(\'' + day + '\')">' + day + '</span>';
            }},
        {name: 'duration', index: 'duration', width: 60, sortable: false},
        {name: 'callnum', index: 'callnum', width: 60, sortable: false},
        {name: 'connectnum', index: 'connectnum', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                return rowObject['connectnum'] + "(" + rowObject['connectpercent'] + ")";
            }},
        {name: 'leadsnum', index: 'leadsnum', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                return rowObject['leadsnum'] + "(" + rowObject['leadspercent'] + ")";
            }},
        {name: 'leadsusenum', index: 'leadsusenum', width: 60, sortable: false}
    ],
    legend: ['外呼总时长', '外呼总数量', '接通量', '接通率', '成单量', '成单率', '单个leads消耗量']
};

//百度图表配置项
Call.chartOption = {
    title: {
        text: '外呼数据'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        type: 'scroll',
        left:100,
        //单选
        selectedMode: 'single',
        data:[]
    },
    grid: {
        left: '1%',
        right: '1%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: []
};


//jqGrid初始化参数
Call.initOptions = {
    url : "/call_statistics/grid",
    postData: {

    },
    height: 300,
    autowidth:true,
    rowNum: -1,
    multiselect: false,
    jsonReader : {
        //返回json的格式匹配
        root: function (data) {
            return data.obj
        },
        repeatitems: false,
        id: "date"
    },
    loadComplete: function (r) {
        Call.initMonthChart(r);
    },
    subGrid : true,
    subGridRowExpanded: function(subgrid_id, row_id) {
        var subgrid_table_id;
        subgrid_table_id = subgrid_id + "_t";
        $("#" + subgrid_id).html(
            "<table id='" + subgrid_table_id
            + "' class='scroll'></table>");
        var colNames = Call.initOptions.colNames;
        var colModel = Call.initOptions.colModel;
        colModel[0]['formatter'] = null;
        $("#" + subgrid_table_id).jqGrid({
            url : "/call_statistics/subgrid?day=" + row_id + "&pid=" + $("#projectId").val(),
            datatype : "json",
            colNames : colNames,
            colModel : colModel,
            rowNum : 100,
            height : '100%',
            width: 850,
            jsonReader : {
                //返回json的格式匹配
                root: function (data) {
                    return data.obj
                },
                repeatitems: false,
                id: "_id"
            }
        });
    }
};

/**
 * 根据关键词搜索
 */
Call.search = function () {
    var searchParam = {};
    searchParam.pid = $("#projectId").val();
    searchParam.month = $("#month").val();
    Call.table.reload(searchParam);
};

/**
 * 切换公司
 */
Call.changeCompany = function () {
    //改变工程  更新项目下拉框
    var companyId =$("#companyId").val();
    $.ajax({
        url: "/common/company/changed/user/type?companyId=" + companyId,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            var projects = r.obj;
            if (projects.length > 0)
                var html = '';
                for(var i=0;i<projects.length;i++){
                    html+='<option value="'+projects[i].id+'" data-type="' + projects[i].type + '">'+projects[i].name+'</option>';
                }
                $("#projectId").html(html);
                Call.changeProject();
            }
    })
};


/**
 * 改变项目状态
 */
Call.changeProject = function () {
    //获取项目类型
    var type = $("#projectId").find("option:selected").attr("data-type");
    var colModel;
    var colNames;
    var chartLegend;
    //根据类型匹配表头
    if (type == 0) {
        colModel = Call.M1.colModel;
        colNames = Call.M1.colNames;
        chartLegend = Call.M1.legend;
    } else if (type == 1) {
        colModel = Call.M1H2.colModel;
        colNames = Call.M1H2.colNames;
        chartLegend = Call.M1H2.legend;
    } else {
        colModel = Call.H2.colModel;
        colNames = Call.H2.colNames;
        chartLegend = Call.H2.legend;
    }
    Call.initOptions.colModel = colModel;
    Call.initOptions.colNames = colNames;
    //设置图表配置
    var series = [];
    for (var i = 0; i < chartLegend.length; i++) {
        series.push({
            name: chartLegend[i],
            type:'line',
            stack: '总量',
            data:[]
        });
    }
    Call.chartOption.legend.data = chartLegend;
    Call.chartOption.series = series;
    if (Call.table !== null) {
        $(Call.tableId).GridUnload();
    }
    Call.initJqGrid();
};

/**
 * 初始化jqgrid
 */
Call.initJqGrid = function(){
    var postData = {
        month: $("#month").val(),
        pid: $("#projectId").val()
    };
    Call.initOptions.postData = postData;
    var jqGrid = new JqGrid(Call.tableId, Call.pagerId, Call.initOptions);
    Call.table = jqGrid.init();
};

/**
 * 初始化月百度图表
 */
Call.initMonthChart = function(r) {
    if (!Call.monthChart) {
        Call.monthChart = echarts.init(document.getElementById('chart'));
    }
    var docs = r.obj;
    initChart(docs, Call.monthChart);
};

Call.initDayChart = function(day) {
    if (!Call.dayChart) {
        Call.dayChart = echarts.init(document.getElementById('dayChart'));
    }
    $.ajax({
        url: "/call_statistics/subgrid?day=" + day + "&pid=" + $("#projectId").val(),
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                initChart(r.obj, Call.dayChart);
                $("#dayChartModal").modal();
            }
        }
    })
};

function initChart(docs, chart) {
    var dayArr = [];
    for (var i = 0; i < docs.length; i++) {
        var doc = docs[i];
        dayArr.push(doc.date);
    }
    Call.chartOption.xAxis.data = dayArr;
    var series = Call.chartOption.series;
    for (var j = 0; j < series.length; j++) {
        var each = series[j];
        var key = getKey(each.name);
        var dataArr = [];
        for (var k = 0; k < docs.length; k++) {
            var data = docs[k][key];
            if ((typeof data) === "string") {
                data = data.replace("%", "");
            }
            dataArr.push(data);
        }
        each.data = dataArr;
    }
    chart.setOption(Call.chartOption);

    function getKey(name) {
        for (var key in Call.KeyName) {
            if (Call.KeyName[key] === name) {
                return key;
            }
        }
        return "";
    }
}


$(function() {
    var month = DateFormat.format(new Date(), "yyyyMM");
    var $month = $("#month");
    $month.val(month);
    $month.datepicker({
        minViewMode: 1,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayHighlight: true,
        format: "yyyymm",
        language: "zh-CN"
    });
    Call.changeCompany();
});