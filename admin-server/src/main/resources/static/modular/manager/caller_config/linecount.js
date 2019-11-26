var LineCount = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    table2: null,
    domain: "line_count"
};

/**
 * jqGrid初始化
 */
LineCount.initJqGrid = function () {
    var tableInstance = $("#grid-table").jqGrid({
        url : "/line_count/grid",
        postData: {
            month: $("#month").val()
        },
        autowidth:true,
        mtype: "GET",
        height: 350,
        viewRecords : true, //是否要显示总记录数
        datatype: "json",
        caption: "线路统计（月）",
        rowNum:-1,
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "callerid"
        },
        colNames: ['线路名称', '总呼出量（条）', '总接通量（条）', '计费单元数（个）', '单价（元）', '总消费（元）'],
        colModel: [
            // {name: '_id', index: '_id', width: 20, sortable: false},
            {name: 'name', index: 'name', width: 50, sortable: false},
            {name: 'totalnum', index: 'totalnum', width: 35, sortable: false},
            {name: 'sumainum', index: 'sumainum', width: 35, sortable: false},
            {name: 'sumnumcaller', index: 'sumnumcaller', width: 35, sortable: false},
            {name: 'price', index: 'price', width: 35, sortable: false,formatter:function (cellValue) {
                    var price = cellValue/1000;
                    return "￥"+price.toFixed(3);
                }},
            {name: 'consum', index: 'consum', width: 35, sortable: false,formatter:function (cellValue) {
                    return "￥"+cellValue;
                }}
        ],
        subGrid : true,
        subGridRowExpanded: function(subgrid_id, row_id) {
            var subgrid_table_id;
            subgrid_table_id = subgrid_id + "_t";
            $("#" + subgrid_id).html(
                "<table id='" + subgrid_table_id
                + "' class='scroll'></table>");
            $("#" + subgrid_table_id).jqGrid({
                url : "/line_count/gridSon?callerid=" + row_id + "&month=" + $("#month").val(),
                datatype : "json",
                colNames : ['企业名称', '项目名称', '呼出量（条）', '接通量（条）','计费单元数（个）', '总消费（元）'],
                colModel : [
                    {name: 'cname', index: 'cname', width: 50, sortable: false},
                    {name: 'pname', index: 'pname', width: 50, sortable: false},
                    {name: 'totalnum', index: 'totalnum', width: 50, sortable: false},
                    {name: 'sumainum', index: 'sumainum', width: 50, sortable: false},
                    {name: 'sumnumcaller', index: 'sumnumcaller', width: 50, sortable: false},
                    {name: 'consum', index: 'consum', width: 50, sortable: false,formatter:function (cellValue) {
                            return "￥"+cellValue;
                        }}
                ],
                rowNum : 100,
                height : '100%',
                width: 800,
                jsonReader : {
                    //返回json的格式匹配
                    root: function (data) {
                        return data.obj
                    },
                    repeatitems: false,
                    id: "id"
                },
                gridComplete: function () {
                }
            });
        }
    });
    return tableInstance;
};

LineCount.initJqGrid2 = function () {
    var tableInstance = $("#grid-table2").jqGrid({
        url : "/line_count/grid2",
        postData: {
            month: $("#month").val()
        },
        autowidth:true,
        mtype: "GET",
        height: 500,
        // viewrecords : true, //是否要显示总记录数
        datatype: "json",
        caption:"线路统计（天）",
        rowNum:-1,
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "id"
        },
        colNames: ['','日期', '线路名称','总呼出量（条）', '总接通量（条）','接通率', '计费单元数（个）', '单价（元）', '消费金额（元）'],
        colModel: [
            {name: 'callerid', index: 'callerid', width: 20, sortable: false,hidden:true},
            {name: 'day', index: 'day', width: 20, sortable:false},
            {name: 'name', index: 'name', width: 30, sortable: false},
            {name: 'totalnum', index: 'totalnum', width: 30, sortable: false},
            {name: 'sumainum', index: 'sumainum', width: 30, sortable: false},
            {name: 'dimensionality', index: 'dimensionality', width: 30, sortable: false,formatter:function (cellValue,index,rowObject) {
                    var total = rowObject['totalnum'];
                    var aumai = rowObject['sumainum'];
                    var dim=0;
                    if(total!=0){
                        dim = aumai/total*100;
                    }
                    return dim.toFixed(2)+"%";
                }},
            {name: 'sumnumcaller', index: 'sumnumcaller', width: 30, sortable: false},
            {name: 'price', index: 'price', width: 30, sortable: false,formatter:function (cellValue) {
                var cell = cellValue/1000;
                    return "￥"+cell.toFixed(3);
                }},
            {name: 'consum', index: 'consum', width: 30, sortable: false,formatter:function (cellValue) {
                    return "￥"+cellValue;
                }}
        ],
        subGrid : true,
        subGridRowExpanded: function(subgrid_id, row_id) {
            var subgrid_table_id;
            subgrid_table_id = subgrid_id + "_t";
            $("#" + subgrid_id).html(
                "<table id='" + subgrid_table_id
                + "' class='scroll'></table>");
            var rowData = $('#grid-table2').jqGrid('getRowData',row_id)
            $("#" + subgrid_table_id).jqGrid({
                url : "/line_count/gridSon2?callerid="+rowData.callerid  + "&month=" + rowData.day,
                datatype : "json",
                colNames : ['企业名称', '项目名称', '呼出量', '接通量','接通率', '计费单元数', '消费金额'],
                colModel : [
                    {name: 'cname', index: 'cname', width: 20, sortable: false},
                    {name: 'pname', index: 'pname', width: 50, sortable: false},
                    {name: 'totalnum', index: 'totalnum', width: 30, sortable: false},
                    {name: 'sumainum', index: 'sumainum', width: 30, sortable: false},
                    {name: 'dimensionality', index: 'dimensionality', width: 30, sortable: false,formatter:function (cellValue,index,rowObject) {
                            var total = rowObject['totalnum'];
                            var aumai = rowObject['sumainum'];
                            var dim=0;
                            if(total!=0){
                                dim = aumai/total*100;
                            }
                            return dim.toFixed(2)+"%";
                        }},
                    {name: 'sumnumcaller', index: 'sumnumcaller', width: 30, sortable: false},
                    {name: 'consum', index: 'consum', width: 30, sortable: false}
                ],
                rowNum : 100,
                height : '100%',
                width: 800,
                jsonReader : {
                    //返回json的格式匹配
                    root: function (data) {
                        return data.obj
                    },
                    repeatitems: false,
                    id: "id"
                }
            });
        }
    });
    return tableInstance;
};
LineCount.changeDate = function() {
    var searchParam = {};
    searchParam.month = $("#month").val();
    LineCount.table.setGridParam({
        postData: searchParam
    });
    LineCount.table.trigger("reloadGrid");
    LineCount.table2.setGridParam({
        postData: searchParam
    });
    LineCount.table2.trigger("reloadGrid");
};
LineCount.exportRecharge = function() {
    $.ajax({
        type : 'GET',
        url: '/line_count/recharge/export?month=' + $("#month").val(),
        success : function(data) {
            if (data.code === 0) {
                window.open("/line_count/recharge/download?key="+data.obj);
            }
        }
    });
};
LineCount.exportRechargeDay = function() {
    $.ajax({
        type : 'GET',
        url: '/line_count/recharge/exportDay?month=' + $("#month").val(),
        success : function(data) {
            if (data.code === 0) {
                window.open("/line_count/recharge/downloadDay?key="+data.obj);
            }
        }
    });
};
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
        LineCount.changeDate();
    });

    LineCount.table = LineCount.initJqGrid();

    LineCount.table2 = LineCount.initJqGrid2();
});