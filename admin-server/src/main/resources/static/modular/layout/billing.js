var Billing = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    domain:"billing",
    table: null
};

//loading button
var ladda;
var editDualSelector;
//定时器
var interval;

/**
 * jqGrid初始化参数
 */
Billing.initJqGrid = function () {
    var tableInstance = $("#grid-table").jqGrid({
        url : "/grid",
        postData: {
            pid: $("#pid").val(),
            note:$("#note").val()
        },
        rowNum: 10,
        autowidth:true,
        mtype: "GET",
        height: "auto",
        width: "auto",
        page: 1,    //初始页码
        viewrecords : true, //是否要显示总记录数
        rowList: [10,20,30,50,100],
        pager: "#grid-pager",
        datatype: "json",
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
            id: "id"
        },
        colNames: ['','公司名称', '外呼量（条）','接通量（条）', 'AI费用（元）', '话费（元）', '合计（元）','余额（元）'],////, '处理队列'
        colModel: [
            {name: 'companyId', index: 'companyId', width: 0, sortable: false,hidden:true},
            {name: 'pName', index: 'pName', width: 100, sortable: false},
            {name: 'totalNum', index: 'totalNum', width: 100, sortable: false},
            {name: 'sumaiNum', index: 'sumaiNum', width: 100, sortable: false},
            {name: 'aiMoney', index: 'aiMoney', width: 100, sortable: false,formatter:function (cellValue) {
                    if(cellValue!=null){
                        return "￥"+cellValue;
                    }
                }},
            {name: 'phoneMoney', index: 'phoneMoney', width: 100, sortable: false,formatter:function (cellValue) {
                    if(cellValue!=null){
                        return "￥"+cellValue;
                    }
                }},
            {name: 'sum', index: 'sum', width: 100, sortable: false,formatter:function (cellValue) {
                    if(cellValue!=null){
                        return "￥"+cellValue;
                    }
                }},
            {name: 'yesterdayBalance', index: 'yesterdayBalance', width: 100, sortable: false,formatter:function (cellValue) {
                    if(cellValue!=null){
                        return "￥"+cellValue;
                    }
                }}
        ],
        subGrid : true,
        subGridRowExpanded: function(subgrid_id, row_id) {
            var rowDatas = $("#grid-table").jqGrid('getRowData', row_id);
            var subgrid_table_id;
            subgrid_table_id = subgrid_id + "_t";
            $("#" + subgrid_id).html(
                "<table id='" + subgrid_table_id
                + "' class='scroll'></table>");
            $("#" + subgrid_table_id).jqGrid({
                url : "/gridSon?companyid=" + rowDatas.companyId,
                datatype : "json",
                colNames: ['项目名称', '外呼量（条）','接通量（条）', 'AI费用（元）', '话费（元）', '合计（元）','操作'],
                colModel: [
                    {name: 'pName', index: 'pName', width: 210, sortable: false},
                    {name: 'totalNum', index: 'totalNum', width: 210, sortable: false},
                    {name: 'sumaiNum', index: 'sumaiNum', width: 210, sortable: false},
                    {name: 'aiMoney', index: 'aiMoney', width: 210, sortable: false,formatter:function (cellValue) {
                            return "￥"+cellValue;
                        }},
                    {name: 'phoneMoney', index: 'phoneMoney', width: 210, sortable: false,formatter:function (cellValue) {
                            return "￥"+cellValue;
                        }},
                    {name: 'sum', index: 'sum', width: 210, sortable: false,formatter:function (cellValue) {
                            return "￥"+cellValue;
                        }},
                    {name: 'operations', index: 'operations', width: 120, sortable: false, formatter: function (cellValue, options, rowObject) {
                            var pid = rowObject["pId"];
                            var companyid = rowObject["companyId"];
                            var str = '<input type="button" class=" btn btn-sm btn-success" value="详情" onclick="Billing.detail(' + pid + ','+companyid+')"/>';;
                            return str;
                        }}
                ],
                rowNum : 100,
                height : '100%',
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
                    id: "id"
                },
                gridComplete: function () {
                    refreshPermission(Billing.domain);
                    var ids = $("#grid-table").jqGrid('getDataIDs');
                    if(ids.length!=0){
                        interval = setInterval(function(){
                        },3000);
                    }
                }
            });
        }
    });

    function calc(num1, num2) {
        var percent;
        if (num2 === 0) {
            percent = '0.00%';
        } else {
            percent = ((num1 / num2) * 100).toFixed(2) + '%';
        }
        return num1 + "<span class='red-font'>(" + percent + ")</span>";
    }

    return tableInstance;
};
/**
 * 项目消费详情
 */
Billing.detail = function (pid,companyid) {
    var dateTime = getNowFormatDate();
    window.location.href = "/listt?pId="+pid+"&dateTime="+dateTime+"&companyId="+companyid;
};
//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year +"-"+ month+"-" + strDate;
    return currentdate;
}
$(function() {
    Billing.table = Billing.initJqGrid();
});