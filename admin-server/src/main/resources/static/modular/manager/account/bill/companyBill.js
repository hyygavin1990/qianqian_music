var CompanyBill = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    table2: null,
    table3: null,
    table4: null,
    table5: null,
    domain: "bill",
    width:null
};

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
        name: 'day',
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

CompanyBill.formatMoney = function(number) {
    if(number === undefined){
        number = 0;
    }
    return OSREC.CurrencyFormatter.format(number / 1000, {currency: 'CNY', pattern: "!#,##0.000"});
};


/**
 * jqGrid初始化
 */
CompanyBill.initJqGrid = function () {
    var tableInstance = $("#grid-table").jqGrid({
        url : "/bill/company_bill/grid",
        postData: {
            month: $("#month").val(),
            companyId:$("#companyId").val()
        },
        width:CompanyBill.width,
        mtype: "GET",
        height: 30,
        datatype: "json",
        rowNum: -1,
        caption:"企业总消费",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "_id"
        },
        colNames : ['企业编号', '企业名称', '总充值','总呼出量', '总接通量','总成交量', 'AI总消费', '通话总消费', '总话费消费'],
        colModel : [
            {name: 'companyId', index: 'companyId', width: 20, sortable: false,align: "center",hidden:true},
            {name: 'projectName', index: 'projectName', width: 30, sortable: false,align: "center"},
            {name: 'total_recharge', index: 'total_recharge', width: 30, sortable: false,align: "center",hidden:true,formatter: CompanyBill.formatMoney},
            {name: 'total_dialout', index: 'total_dialout', width: 30, sortable: false,align: "center"},
            {name: 'total_answer', index: 'total_answer', width: 30, sortable: false,align: "center"},
            {name: 'count', index: 'count', width: 30, sortable: false,hidden:true,align: "center"},
            {name: 'total_ai_cons', index: 'total_ai_cons', width: 30, sortable: false,align: "center",formatter: CompanyBill.formatMoney},
            {name: 'total_call_cons', index: 'total_call_cons', width: 30, sortable: false,align: "center",formatter: CompanyBill.formatMoney},
            {name: 'total_all', index: 'total_all', width: 30, sortable: false,align: "center",formatter: CompanyBill.formatMoney}
        ],
    });
    return tableInstance;
};


CompanyBill.initJqGrid2 = function () {
    var tableInstance = $("#grid-table2").jqGrid({
        url : "/bill/company_bill/grid2",
        width:CompanyBill.width,
        postData: {
            month: $("#month").val(),
            companyId:$("#companyId").val()
        },
        mtype: "GET",
        height: 150,
        datatype: "json",
        rowNum: -1,
        caption:"企业项目消费详情",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "_id"
        },
        colNames : ['项目编号', '项目名称', '总呼出量', '总接通量', 'AI总消费', '通话总消费', '总话费消费'],
        colModel : [
            {name: '_id', index: '_id', width: 30, sortable: false,align:"center",hidden:true},
            {name: 'projectName', index: 'projectName', width: 30, sortable: false,align: "center"},
            {name: 'total_dialout', index: 'total_dialout', width: 30, sortable: false,align: "center"},
            {name: 'total_answer', index: 'total_answer', width: 30, sortable: false,align: "center"},
            {name: 'total_ai_cons', index: 'total_ai_cons', width: 30, sortable: false,align: "center",formatter: CompanyBill.formatMoney},
            {name: 'total_call_cons', index: 'total_call_cons', width: 30, sortable: false,align: "center",formatter: CompanyBill.formatMoney},
            {name: 'total_all', index: 'total_all', width: 30, sortable: false,align: "center",formatter: CompanyBill.formatMoney}
        ],

    });
    return tableInstance;
}




CompanyBill.initJqGrid3 = function () {
    var tableInstance = $("#grid-table3").jqGrid({
        url : "/bill/company_bill/grid3",
        postData: {
            companyId: $("#companyId").val(),
            month: $("#month").val()
        },
        width:CompanyBill.width,
        mtype: "GET",
        height: 300,
        rowNum: -1,
        viewrecords : true, //是否要显示总记录数
        datatype: "json",
        caption:"企业消费流水",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "_id"
        },
        colNames: ['日期','总充值',  '总呼出量', '总接通量', 'AI总消费', '通话总消费', '总话费消费'],
        colModel: [
            {name: '_id', index: '_id', width: 26, sortable: false,align:"center"},
            {name: 'total_recharge', index: 'total_recharge', width: 30, sortable: false,align: "center",hidden:true,formatter: CompanyBill.formatMoney},
            {name: 'total_dialout', index: 'total_dialout', width: 30, sortable: false,align: "center"},
            {name: 'total_answer', index: 'total_answer', width: 30, sortable: false,align: "center"},
            {name: 'total_ai_cons', index: 'total_ai_cons', width: 30, sortable: false,align: "center",formatter: CompanyBill.formatMoney},
            {name: 'total_call_cons', index: 'total_call_cons', width: 30, sortable: false,align: "center",formatter: CompanyBill.formatMoney},
            {name: 'total_all', index: 'total_all', width: 30, sortable: false,align: "center",formatter: CompanyBill.formatMoney},
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
        subGridRowExpanded: function(subgrid_id) {
            var subgrid_table_id;
            subgrid_table_id = subgrid_id + "_t";
            $("#" + subgrid_id).html(
                "<table id='" + subgrid_table_id
                + "' class='scroll'></table>");
            $("#" + subgrid_table_id).jqGrid({
                url: "/bill/company_bill/subgrid3?companyId=" + $("#companyId").val() + "&day=" + subgrid_table_id.substr(12, 8),
                datatype: "json",
                colNames: ['项目编号', '项目名称', '总呼出量', '总接通量', 'AI总消费', '通话总消费', '总消费','操作'],
                colModel: [
                    {name: '_id', index: '_id', width: 30, sortable: false,align: "center"},
                    {name: 'projectName', index: 'projectName', width: 50, sortable: false},
                    {name: 'total_dialout', index: 'total_dialout', width: 30, sortable: false},
                    {name: 'total_answer', index: 'total_answer', width: 30, sortable: false},
                    {name: 'total_ai_cons', index: 'total_ai_cons', width: 30, sortable: false,formatter: CompanyBill.formatMoney},
                    {name: 'total_call_cons', index: 'total_call_cons', width: 30, sortable: false,formatter: CompanyBill.formatMoney},
                    {name: 'total_all', index: 'total_all', width: 30, sortable: false,formatter: CompanyBill.formatMoney},
                    {name: 'operations', index: 'operations', width: 30, sortable: false, formatter: function (cellValue, options, rowObject) {
                            var projectId = rowObject["_id"];
                            var day = subgrid_table_id.substr(12, 8);
                            var str = '<input type="button" class="control-auth btn btn-sm btn-info" data-auth="bill_project_detail" value="明细" onclick="CompanyBill.projectBill(' + projectId +','+  day +')"/>&nbsp;';
                            return str;
                        }}
                    ],
                gridComplete: function() {
                    refreshPermission(CompanyBill.domain);
                },
                rowNum: 100,
                height: '100%',
                width: 900,
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
    return tableInstance;
};





/**
 * jqGrid初始化
 */
CompanyBill.initJqGrid4 = function () {
    var tableInstance = $("#grid-table4").jqGrid({
        url : "/bill/company_bill/grid4",
        postData: {
            month: $("#month").val(),
            companyId:$("#companyId").val()
        },
        width:CompanyBill.width,
        mtype: "GET",
        height: 30,
        rowNum: -1,
        datatype: "json",
        caption:"企业总流水",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "_id"
        },
        colNames : ['企业编号', '企业名称', '总充值', '总扣款','总补贴'],
        colModel : [
            {name: 'companyId', index: 'companyId', width: 20, sortable: false,align: "center",hidden:true},
            {name: 'projectName', index: 'projectName', width: 30, sortable: false,align:"center",edittype:'select'},
            {name: 'recharge', index: 'recharge', width: 30, sortable: false,align:"center",edittype:'select',formatter: CompanyBill.formatMoney},
            {name: 'deduct', index: 'deduct', width: 30, sortable: false,align:"center",edittype:'select',formatter: CompanyBill.formatMoney},
            {name: 'subsidy', index: 'subsidy', width: 30, sortable: false,align:"center",edittype:'select',formatter: CompanyBill.formatMoney},

        ],
    });
    return tableInstance;
};

CompanyBill.initJqGrid5 = function () {
    var tableInstance = $("#grid-table5").jqGrid({
        url : "/bill/company_bill/grid5",
        postData: {
            companyId: $("#companyId").val(),
            month: $("#month").val(),
            typeId:$("#typeId").val()
        },
        width:CompanyBill.width,
        mtype: "GET",
        height: 300,
        rowNum: -1,
        viewrecords : true, //是否要显示总记录数
        datatype: "json",
        caption:"企业账户流水",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "time"
        },
        colNames: ['日期', '企业名称', '类型', '企业补贴'],
        colModel: [
            {name: 'day', index: 'day', width: 30, sortable: false,align:"center"},
            {name: 'companyName', index: 'companyName', width: 30, sortable: false,align:"center"},
            {name: 'type', index: 'type', width: 30, sortable: false,align:"center"},
            {name: 'money', index: 'money', width: 30, sortable: false,align:"center",formatter: function (cellValue, options, rowObject) {
                    var money = rowObject["money"];
                    var type = rowObject["type"];
                    money = CompanyBill.formatMoney(money);
                    if (type.startsWith("其他")) {
                        money = "<label class='text-danger'>-" + money + "</label>";
                    } else {
                        money = "<label class='text-navy'>+" + money + "</label>";
                    }
                    return money;
                }}
        ],
    });
    return tableInstance;
};

/**
 * 根据关键词搜索
 */
CompanyBill.search = function () {
    var searchParam = {};
    searchParam.companyId = $("#companyId").val();
    searchParam.month = $("#month").val();
    searchParam.typeId = $("#typeId").val();
    // alert(searchParam.typeId);
    CompanyBill.table.setGridParam({
        postData: searchParam
    });
    CompanyBill.table.trigger("reloadGrid");
    CompanyBill.table2.setGridParam({
        postData: searchParam
    });
    CompanyBill.table2.trigger("reloadGrid");
    CompanyBill.table3.setGridParam({
        postData: searchParam
    });
    CompanyBill.table3.trigger("reloadGrid");
    CompanyBill.table4.setGridParam({
        postData: searchParam
    });
    CompanyBill.table4.trigger("reloadGrid");

    CompanyBill.table5.setGridParam({
        postData: searchParam
    });
    CompanyBill.table5.trigger("reloadGrid");


};

/**
 * 导出excel1
 */
CompanyBill.exportExcel1 = function() {
    $.ajax({
        type : 'GET',
        url: '/bill/company_bill/recharge/export1?month=' + $("#month").val()+'&companyId='+$("#companyId").val(),
        success : function(data) {
            if (data.code === 0) {
                window.open("/bill/company_bill/recharge/download1?key="+data.obj);
            }
        }
    });
}

/**
 * 导出excel2
 */
CompanyBill.exportExcel2 = function() {
    $.ajax({
        type : 'GET',
        url: '/bill/company_bill/recharge/export2?month=' + $("#month").val()+'&companyId='+$("#companyId").val(),
        success : function(data) {
            if (data.code === 0) {
                window.open("/bill/company_bill/recharge/download2?key="+data.obj);
            }
        }
    });
};

/**
 * 导出excel3
 */
CompanyBill.exportExcel3 = function() {
    $.ajax({
        type : 'GET',
        url: '/bill/company_bill/recharge/export3?month=' + $("#month").val()+'&companyId='+$("#companyId").val()+'&typeId='+$("#typeId").val(),
        success : function(data) {
            if (data.code === 0) {
                window.open("/bill/company_bill/recharge/download3?key="+data.obj);
            }
        }
    });
};

/**
 * 选择类型事件
 */
CompanyBill.change = function () {
    var searchParam = {};
    searchParam.companyId = $("#companyId").val();
    searchParam.month = $("#month").val();
    searchParam.typeId = $("#typeId").val();
    CompanyBill.table5.setGridParam({
        postData: searchParam
    });
    CompanyBill.table5.trigger("reloadGrid");
}

//调转到日期界面
CompanyBill.projectBill = function(projectId,day) {
    var companyId = $("#companyId").val();
    window.location.href = "/list?companyId=" + companyId + "&day=" + day +"&projectId="+projectId;
};

$(function() {
    // var date = new Date();
    var month = $('#month');
    // month.val(DateFormat.format(date, "yyyyMM"));
    month.datepicker({
        minViewMode: 1,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayHighlight: true,
        format: "yyyymm",
        language: "zh-CN"
    }).on("changeDate", function (e) {
        // CompanyBill.changeDate();
    });

    var width = $("#tab-1").width();
    CompanyBill.width = width;

    // console.log("宽"+width);

    CompanyBill.table = CompanyBill.initJqGrid();

    CompanyBill.table2 = CompanyBill.initJqGrid2();

    CompanyBill.table3 = CompanyBill.initJqGrid3();

    CompanyBill.table4 = CompanyBill.initJqGrid4();

    CompanyBill.table5 = CompanyBill.initJqGrid5();


});