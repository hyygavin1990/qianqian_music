var Sms = {
    table: null,
    domain: "bill",
    gridWidth: null
};

Sms.initTable = function() {
    Sms.table = $("#grid-table").jqGrid({
        url : "/sms_statistics/grid",
        postData: {
            month: $("#month").val(),
            pid: $("#projectId").val()
        },
        mtype: "GET",
        height: null,
        autowidth: true,
        rowNum: -1,
        viewrecords : true, //是否要显示总记录数
        datatype: "json",
        jsonReader : {
            //返回json的格式匹配
            root: function (data) {
                return data.obj
            },
            repeatitems: false,
            id: "id"
        },
        colNames: ['templateId', 'channelId', '时间', '项目', '模板', '渠道', '已发送', '成功', '失败', '调用接口失败', '总计'],
        colModel: [
            {name: 'templateId', index: 'templateId', hidden: true, sortable: false},
            {name: 'channelId', index: 'channelId', hidden: true, sortable: false},
            {name: 'day', index: 'day', width: 150, sortable: false},
            {name: 'project', index: 'project', width: 150, sortable: false, formatter: function () {
                    return $('#projectId option:selected').html();
                }},
            {name: 'template', index: 'template', width: 150, sortable: false},
            {name: 'channel', index: 'channel', width: 150, sortable: false},
            {name: 'sended', index: 'sended', width: 150, sortable: false},
            {name: 'success', index: 'success', width: 150, sortable: false},
            {name: 'fail', index: 'fail', width: 150, sortable: false},
            {name: 'invokefail', index: 'invokefail', width: 150, sortable: false},
            {name: 'total', index: 'total', width: 150, sortable: false}
        ],
        subGrid : true,
        subGridRowExpanded: function(subgrid_id, row_id) {
            var subgrid_table_id;
            subgrid_table_id = subgrid_id + "_t";
            $("#" + subgrid_id).html(
                "<table id='" + subgrid_table_id
                + "' class='scroll'></table>");
            var row = Sms.table.getRowData(row_id);
            console.log(row);
            $("#" + subgrid_table_id).jqGrid({
                url : "/sms_statistics/subgrid",
                postData: {
                    day: row.day,
                    pid: $("#projectId").val(),
                    templateId: row.templateId,
                    channelId: row.channelId
                },
                datatype : "json",
                colNames : ['批次号', '批次名称', '模板', '渠道', '已发送', '成功', '失败', '调用接口失败', '总计'],
                colModel : [
                    {name: 'batchId', index: 'batchId', width: 50, sortable: false},
                    {name: 'note', index: 'note', width: 150, sortable: false},
                    {name: 'template', index: 'template', width: 150, sortable: false},
                    {name: 'channel', index: 'channel', width: 150, sortable: false},
                    {name: 'sended', index: 'sended', width: 150, sortable: false},
                    {name: 'success', index: 'success', width: 100, sortable: false},
                    {name: 'fail', index: 'fail', width: 100, sortable: false},
                    {name: 'invokefail', index: 'invokefail', width: 100, sortable: false},
                    {name: 'total', index: 'total', width: 100, sortable: false}
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
                }
            });
        }
    });
};

Sms.search = function() {
    var searchParam = {};
    searchParam.month = $("#month").val();
    searchParam.pid = $("#projectId").val();

    Sms.table.setGridParam({
        postData: searchParam
    });
    Sms.table.trigger("reloadGrid");
};


var $company = $("#companyId");

var $project = $("#projectId");

$(function() {
    //初始化日期插件
    initDatePicker($("#month"), "yyyymm", DateFormat.format(new Date(), "yyyyMM"), 1);
    //企业下拉框绑定change事件
    $company.on("change", function () {
        companyChanged($company, $project, false, Sms.initTable);
    });
    //手动触发企业选中
    $company.trigger("change");
});