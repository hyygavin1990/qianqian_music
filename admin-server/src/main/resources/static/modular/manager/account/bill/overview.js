var Overview = {
    table1: null,
    table2: null,
    domain: "bill",
    gridWidth: null
};

//初始化tab1
Overview.initTab1 = function() {
    //初始化月份日期插件
    var month = DateFormat.format(new Date(), "yyyyMM");
    var $month = $("#month1");
    $month.val(month);
    $month.datepicker({
        minViewMode: 1,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayHighlight: true,
        format: "yyyymm",
        language: "zh-CN"
    }).on("changeDate", function () {
        var searchParam = {};
        searchParam.month = $("#month1").val();
        Overview.table1.setGridParam({
            postData: searchParam
        });
        Overview.table1.trigger("reloadGrid");
        Overview.table2.setGridParam({
            postData: searchParam
        });
        Overview.table2.trigger("reloadGrid");
    });
    // 基于准备好的dom，初始化echarts实例
    var chart = echarts.init(document.getElementById('chart'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '呼叫数据'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['AI消费','通话消费', '充值', '总消费']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            name: '天',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value',
            name: "厘"
        },
        series: [
            {
                name:'AI消费',
                type:'line',
                data:[]
            },
            {
                name:'通话消费',
                type:'line',
                data:[]
            },
            {
                name:'充值',
                type:'line',
                data:[]
            },
            {
                name:'总消费',
                type:'line',
                data:[]
            }
        ]
    };
    Overview.table1 = $("#grid-table1").jqGrid({
        url : "/bill/overview/grid",
        postData: {
            month: month
        },
        width: Overview.gridWidth,
        mtype: "GET",
        height: 300,
        rowNum: -1,
        viewrecords : true, //是否要显示总记录数
        datatype: "json",
        caption: "总费用",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "_id"
        },
        colNames: ['企业编号', '企业名称', '总呼出量', '总接通量', '总充值', 'AI总消费', '通话总消费', '总消费', '操作'],
        colModel: [
            {name: '_id', index: '_id', width: 20, sortable: false},
            {name: 'companyName', index: 'companyName', width: 50, sortable: false},
            {name: 'total_dialout', index: 'total_dialout', width: 30, sortable: false},
            {name: 'total_answer', index: 'total_answer', width: 30, sortable: false},
            {name: 'total_recharge', index: 'total_recharge', width: 30, sortable: false, formatter: Overview.formatMoney},
            {name: 'total_ai_cons', index: 'total_ai_cons', width: 30, sortable: false, formatter: Overview.formatMoney},
            {name: 'total_call_cons', index: 'total_call_cons', width: 30, sortable: false, formatter: Overview.formatMoney},
            {name: 'total_all', index: 'total_all', width: 30, sortable: false, formatter: Overview.formatMoney},
            {name: 'operations', index: 'operations', width: 20, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var companyId = rowObject["_id"];
                    var str = '<input type="button" class="control-auth btn btn-sm btn-info" data-auth="bill_overview_detail" value="明细" onclick="Overview.companyBill(' + companyId + ')"/>&nbsp;';
                    return str;
                }}
        ],
        gridComplete: function() {
            refreshPermission(Overview.domain);
        },
        subGrid : true,
        subGridRowExpanded: function(subgrid_id, row_id) {
            var subgrid_table_id;
            subgrid_table_id = subgrid_id + "_t";
            $("#" + subgrid_id).html(
                "<table id='" + subgrid_table_id
                + "' class='scroll'></table>");
            $("#" + subgrid_table_id).jqGrid({
                url : "/bill/overview/subgrid?companyId=" + row_id + "&month=" + $("#month1").val(),
                datatype : "json",
                colNames : ['项目编号', '项目名称', '总呼出量', '总接通量', 'AI总消费', '通话总消费', '总消费'],
                colModel : [
                    {name: '_id', index: '_id', width: 20, sortable: false},
                    {name: 'projectName', index: 'projectName', width: 50, sortable: false},
                    {name: 'total_dialout', index: 'total_dialout', width: 30, sortable: false},
                    {name: 'total_answer', index: 'total_answer', width: 30, sortable: false},
                    {name: 'total_ai_cons', index: 'total_ai_cons', width: 30, sortable: false, formatter: Overview.formatMoney},
                    {name: 'total_call_cons', index: 'total_call_cons', width: 30, sortable: false, formatter: Overview.formatMoney},
                    {name: 'total_all', index: 'total_all', width: 30, sortable: false, formatter: Overview.formatMoney}
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
                    id: "_id"
                },
                gridComplete: function () {
                    // $(this).closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide();
                }
            });
        }
    });
    Overview.table2 = $("#grid-table2").jqGrid({
        url : "/bill/overview/grid2",
        postData: {
            month: month
        },
        width: Overview.gridWidth,
        mtype: "GET",
        height: 250,
        caption: "每日流水",
        viewrecords : true, //是否要显示总记录数
        datatype: "json",
        rowNum: -1,
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "_id"
        },
        colNames: ['日期', '总呼出量', '总接通量', '总充值', 'AI总消费', '通话总消费', '总消费'],
        colModel: [
            {name: '_id', index: '_id', width: 20, sortable: false},
            {name: 'total_dialout', index: 'total_dialout', width: 30, sortable: false},
            {name: 'total_answer', index: 'total_answer', width: 30, sortable: false},
            {name: 'total_recharge', index: 'total_recharge', width: 30, sortable: false, formatter: Overview.formatMoney},
            {name: 'total_ai_cons', index: 'total_ai_cons', width: 30, sortable: false, formatter: Overview.formatMoney},
            {name: 'total_call_cons', index: 'total_call_cons', width: 30, sortable: false, formatter: Overview.formatMoney},
            {name: 'total_all', index: 'total_all', width: 30, sortable: false, formatter: Overview.formatMoney},
        ],
        loadComplete: function(r) {
            //直接可以用数据初始化图表
            if (r.code === 0) {
                var docs = r.obj;
                var dayArr = [];
                var aiConsArr = [];
                var callConsArr = [];
                var rechargeArr = [];
                var totalArr = [];
                for (var i = 0; i < docs.length; i++) {
                    var doc = docs[i];
                    dayArr[i] = doc._id;
                    aiConsArr[i] = doc.total_ai_cons;
                    callConsArr[i] = doc.total_call_cons;
                    rechargeArr[i] = doc.total_recharge;
                    totalArr[i] = doc.total_all;
                }
                option.xAxis.data = dayArr;
                option.series[0].data = aiConsArr;
                option.series[1].data = callConsArr;
                option.series[2].data = rechargeArr;
                option.series[3].data = totalArr;
                // 使用刚指定的配置项和数据显示图表。
                chart.setOption(option, true);
            }
        },
        subGrid : true,
        subGridRowExpanded: function(subgrid_id, row_id) {
            var subgrid_table_id;
            subgrid_table_id = subgrid_id + "_t";
            $("#" + subgrid_id).html(
                "<table id='" + subgrid_table_id
                + "' class='scroll'></table>");
            $("#" + subgrid_table_id).jqGrid({
                url : "/bill/overview/subgrid2?day=" + row_id,
                datatype : "json",
                colNames : ['企业编号', '企业名称', '总呼出量', '总接通量', '总充值', 'AI总消费', '通话总消费', '总消费'],
                colModel : [
                    {name: '_id', index: '_id', width: 20, sortable: false},
                    {name: 'companyName', index: 'companyName', width: 50, sortable: false},
                    {name: 'total_dialout', index: 'total_dialout', width: 30, sortable: false},
                    {name: 'total_answer', index: 'total_answer', width: 30, sortable: false},
                    {name: 'total_recharge', index: 'total_recharge', width: 30, sortable: false, formatter: Overview.formatMoney},
                    {name: 'total_ai_cons', index: 'total_ai_cons', width: 30, sortable: false, formatter: Overview.formatMoney},
                    {name: 'total_call_cons', index: 'total_call_cons', width: 30, sortable: false, formatter: Overview.formatMoney},
                    {name: 'total_all', index: 'total_all', width: 30, sortable: false, formatter: Overview.formatMoney},
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
                    id: "_id"
                },
                subGrid : true,
                subGridRowExpanded: function(subgrid_id, row_id) {
                    var subgrid_table_id;
                    subgrid_table_id = subgrid_id + "_t";
                    $("#" + subgrid_id).html(
                        "<table id='" + subgrid_table_id
                        + "' class='scroll'></table>");
                    $("#" + subgrid_table_id).jqGrid({
                        url: "/bill/overview/subgrid3?companyId=" + row_id + "&day=" + subgrid_table_id.substr(12, 8),
                        datatype: "json",
                        colNames: ['项目编号', '项目名称', '总呼出量', '总接通量', 'AI总消费', '通话总消费', '总消费'],
                        colModel: [
                            {name: '_id', index: '_id', width: 20, sortable: false},
                            {name: 'projectName', index: 'projectName', width: 50, sortable: false},
                            {name: 'total_dialout', index: 'total_dialout', width: 30, sortable: false},
                            {name: 'total_answer', index: 'total_answer', width: 30, sortable: false},
                            {name: 'total_ai_cons', index: 'total_ai_cons', width: 30, sortable: false, formatter: Overview.formatMoney},
                            {name: 'total_call_cons', index: 'total_call_cons', width: 30, sortable: false, formatter: Overview.formatMoney},
                            {name: 'total_all', index: 'total_all', width: 30, sortable: false, formatter: Overview.formatMoney}
                        ],
                        rowNum: 100,
                        height: '100%',
                        width: 700,
                        jsonReader: {
                            //返回json的格式匹配
                            root: function (data) {
                                return data.obj
                            },
                            repeatitems: false,
                            id: "_id"
                        }
                    })
                }
            });
        }
    });
};

//初始化tab2
Overview.initTab2 = function() {
    //初始化月份日期插件
    var month = DateFormat.format(new Date(), "yyyyMM");
    var $month = $("#month2");
    $month.val(month);
    $month.datepicker({
        minViewMode: 1,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayHighlight: true,
        format: "yyyymm",
        language: "zh-CN"
    }).on("changeDate", function () {
        var searchParam = {};
        searchParam.month = $("#month2").val();
        Overview.table3.setGridParam({
            postData: searchParam
        });
        Overview.table3.trigger("reloadGrid");

        searchParam.companyId = $("#companyId").val();
        searchParam.type = $("#type").val();
        Overview.table4.setGridParam({
            postData: searchParam
        });
        Overview.table4.trigger("reloadGrid");
    });
    Overview.table3 = $("#grid-table3").jqGrid({
        url : "/bill/overview/grid3",
        postData: {
            month: month
        },
        mtype: "GET",
        height: 300,
        rowNum: -1,
        width: Overview.gridWidth,
        viewrecords : true, //是否要显示总记录数
        datatype: "json",
        caption: "总流水",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "companyid"
        },
        colNames: ['企业编号', '企业名称', '企业充值', '其他扣款', '平台补贴'],
        colModel: [
            {name: 'companyid', index: 'companyid', width: 20, sortable: false},
            {name: 'companyName', index: 'companyName', width: 50, sortable: false},
            {name: 'total_recharge', index: 'total_recharge', width: 30, sortable: false, formatter: Overview.formatMoney},
            {name: 'total_deduct', index: 'total_deduct', width: 30, sortable: false, formatter: Overview.formatMoney},
            {name: 'total_subsidy', index: 'total_subsidy', width: 30, sortable: false, formatter: Overview.formatMoney}
        ]
    });
    Overview.table4 = $("#grid-table4").jqGrid({
        url : "/bill/overview/grid4",
        postData: {
            month: month,
            companyId: $("#companyId").val(),
            type: $("#type").val()
        },
        mtype: "GET",
        height: 300,
        rowNum: -1,
        width: Overview.gridWidth,
        viewrecords : true, //是否要显示总记录数
        datatype: "json",
        caption: "每日流水",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "companyid"
        },
        colNames: ['时间', '企业名称', '类型', '金额'],
        colModel: [
            {name: 'day', index: 'day', width: 20, sortable: false},
            {name: 'companyName', index: 'companyName', width: 30, sortable: false},
            {name: 'type', index: 'type', width: 50, sortable: false, formatter: function (cellValue, options, rowObject) {
                var type = rowObject["type"];
                var memo = rowObject["memo"];
                var str = "";
                if (type === 2) {
                    str += "企业充值";
                } else if (type === 3) {
                    str += "其他扣款";
                } else if (type === 4) {
                    str += "平台补贴";
                }
                if (type !== 2) {
                    if (isEmpty(memo)) {
                        memo = "无";
                    }
                    str += "(缘由：" + memo + ")";
                }
                return str;
            }},
            {name: 'money', index: 'money', width: 30, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var money = rowObject["money"];
                    var type = rowObject["type"];
                    money = Overview.formatMoney(money);
                    if (type === 3) {
                        money = "<label class='text-danger'>-" + money + "</label>";
                    } else {
                        money = "<label class='text-navy'>+" + money + "</label>";
                    }
                    return money;
                }}
        ]
    });
};

//格式化金钱
Overview.formatMoney = function(number) {
    return OSREC.CurrencyFormatter.format(number / 1000, {currency: 'CNY', pattern: "!#,##0.000"});
};


Overview.companyBill = function(companyId) {
    window.location.href = "/bill/company_bill/list?companyId=" + companyId + "&month=" + $("#month1").val();
};


Overview.exportRecharge = function() {
    $.ajax({
        type : 'GET',
        url: '/bill/overview/recharge/export?month=' + $("#month").val(),
        success : function(data) {
            if (data.code === 0) {
                window.open("/bill/overview/recharge/download?key="+data.obj);
            }
        }
    });
};

Overview.refreshTable4 = function() {
    var searchParam = {};
    searchParam.month = $("#month2").val();
    searchParam.companyId = $("#companyId").val();
    searchParam.type = $("#type").val();

    Overview.table4.setGridParam({
        postData: searchParam
    });
    Overview.table4.trigger("reloadGrid");
};

$(function() {

    Overview.gridWidth = $(".wrapper-content").width() - 60;
    console.log(Overview.gridWidth);

    Overview.initTab1();
    Overview.initTab2();
});