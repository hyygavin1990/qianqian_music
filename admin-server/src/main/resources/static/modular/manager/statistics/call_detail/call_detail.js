var CallDetail = {
    tableId: "#grid-table",
    tableId2: "#grid-table2",
    table: null,
    table2: null
};

//m1项目表头及图表图例
CallDetail.M1 = {
    colNames: ['线路', '规则', '录音', '批次', '外呼总时长', '外呼总数量', '接通量(率)', '成单未质检量(率)', '成单量(率)', '单个leads消耗量', '质检通过率'],
    colModel: [
        {name: 'caller', index: 'caller', width: 60, sortable: false},
        {name: 'r', index: 'r', width: 60, sortable: false},
        {name: 'voice', index: 'voice', width: 60, sortable: false},
        {name: 'batch', index: 'batch', width: 60, sortable: false},
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
CallDetail.M1H2 = {
    colNames: ['线路', '规则', '录音', '批次', '外呼总时长', '外呼总数量', '接通量(率)', '成单未质检量(率)', '成单量(率)', '单个leads消耗量', 'H2接听量（率）', 'H2成单率', '可转接量(率)', '没有可转接坐席量(率)'],
    colModel: [
        {name: 'caller', index: 'caller', width: 60, sortable: false},
        {name: 'r', index: 'r', width: 60, sortable: false},
        {name: 'voice', index: 'voice', width: 60, sortable: false},
        {name: 'batch', index: 'batch', width: 60, sortable: false},
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
CallDetail.H2 = {
    colNames: ['线路', '规则', '录音', '批次', '外呼总时长', '外呼总数量', '接通量(率)', '成单量(率)', '单个leads消耗量'],
    colModel: [
        {name: 'caller', index: 'caller', width: 60, sortable: false},
        {name: 'r', index: 'r', width: 60, sortable: false},
        {name: 'voice', index: 'voice', width: 60, sortable: false},
        {name: 'batch', index: 'batch', width: 60, sortable: false},
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


//jqGrid初始化参数
CallDetail.initOptions = {
    url : "/call_detail_statistics/grid",
    height: 30,
    autowidth:true,
    multiselect: false,
    jsonReader : {
        //返回json的格式匹配
        root: function (data) {
            return data.obj
        },
        repeatitems: false,
        id: "date"
    }
};

CallDetail.initOptions2 = {
    url : "/call_detail_statistics/grid2",
    height: 350,
    autowidth:true,
    multiselect: false,
    jsonReader : {
        //返回json的格式匹配
        root: function (data) {
            return data.obj
        },
        repeatitems: false,
        id: "date"
    }
};

/**
 * 根据关键词搜索
 */
CallDetail.search = function () {
    var searchParam = {};
    searchParam.pid = $("#projectId").val();
    searchParam.day = $("#day").val();
    searchParam.callerid = $("#callerid").val();
    searchParam.batchid = $("#batchid").val();
    searchParam.rid = $("#rid").val();
    searchParam.voiceid = $("#voiceid").val();
    CallDetail.table.reload(searchParam);
    CallDetail.table2.reload(searchParam);
};

/**
 * 切换公司
 */
CallDetail.changeCompany = function () {
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
                CallDetail.changeProject();
            }
    })
};


/**
 * 改变项目状态
 */
CallDetail.changeProject = function () {
    CallDetail.refreshSelect();
    //获取项目类型
    var type = $("#projectId").find("option:selected").attr("data-type");
    var colModel;
    var colNames;
    //根据类型匹配表头
    if (type == 0) {
        colModel = CallDetail.M1.colModel;
        colNames = CallDetail.M1.colNames;
    } else if (type == 1) {
        colModel = CallDetail.M1H2.colModel;
        colNames = CallDetail.M1H2.colNames;
    } else {
        colModel = CallDetail.H2.colModel;
        colNames = CallDetail.H2.colNames;
    }
    CallDetail.initOptions.colModel = colModel;
    CallDetail.initOptions.colNames = colNames;
    CallDetail.initOptions2.colModel = colModel;
    CallDetail.initOptions2.colNames = colNames;
    if (CallDetail.table !== null) {
        $(CallDetail.tableId).GridUnload();
        $(CallDetail.tableId2).GridUnload();
    }
    CallDetail.initJqGrid();
};

CallDetail.refreshSelect = function() {
    $.ajax({
        url: "/call_detail_statistics/project/changed?pid=" + $("#projectId").val() + "&day=" + $("#day").val(),
        type: 'GET',
        dataType: "json",
        success: function (r) {
            var calleridArr = r.obj.callerid;
            var batchidArr = r.obj.batchid;
            var ridArr = r.obj.rid;
            var voiceidArr = r.obj.voiceid;
            $("#callerid").html(optionHtml(calleridArr));
            $("#rid").html(optionHtml(ridArr));
            $("#voiceid").html(optionHtml(voiceidArr));
            $("#batchid").html(optionHtml(batchidArr));
        }
    });

    function optionHtml(arr) {
        var str = '<option value="">不限</option>';
        for(var i = 0; i < arr.length; i++){
            str+='<option value="'+arr[i].id+'">'+arr[i].name+'</option>';
        }
        return str;
    }
};

/**
 * 初始化jqgrid
 */
CallDetail.initJqGrid = function(){
    var postData = {
        pid: $("#projectId").val(),
        day: $("#day").val()
    };
    CallDetail.initOptions.postData = postData;
    var jqGrid = new JqGrid(CallDetail.tableId, null, CallDetail.initOptions);
    CallDetail.table = jqGrid.init();
    CallDetail.initOptions2.postData = postData;
    var jqGrid2 = new JqGrid(CallDetail.tableId2, null, CallDetail.initOptions2);
    CallDetail.table2 = jqGrid2.init();
};


$(function() {
    var day = DateFormat.format(new Date(), "yyyy-MM-dd");
    var $day = $("#day");
    $day.val(day);
    $day.datepicker({
        minViewMode: 0,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN"
    }).on("changeDate", function () {
        CallDetail.refreshSelect();
    });
    CallDetail.changeCompany();
});