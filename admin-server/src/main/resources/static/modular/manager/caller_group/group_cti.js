var BindCti = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "groupCti"
};

var ladda;
/**
 * jqGrid初始化参数
 */
BindCti.initOptions = function () {
    var groupId = $("#groupid").val().trim();
    var options = {
        url : "/callerGroup/ctiGrid?groupId="+groupId,
        autowidth:true,
        sortname: "ip",
        sortorder: "asc",
        colNames: ['ip', '端口', '并发数','终端服务器ip', '状态', '操作'],
        multiselect: true,
        colModel: [
            {name: 'ip', index: 'ip', width: 70},
            {name: 'port', index: 'port', width: 30, sortable: false},
            {name: 'maxline', index: 'maxline', width: 30, sortable: false},
            {name: 'terminalIp', index: 'terminalIp', width: 70, sortable: false},
            {name: 'state', index: 'state', width: 50, sortable: false, formatter: function (cellValue) {
                    return cellValue === 1 ? "上线" : "下线";
                }},
            {name: 'operations', index: 'operations', width: 70, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var id = rowObject["id"];
                    var str = '';
                    str += '<button  class=" btn btn-sm btn-warning ladda-button" data-style="zoom-out"   onclick="BindCti.bind(' + id + ',this)">绑定</button>';
                    return str;
                }}

        ],
        gridComplete: function () {
            refreshPermission(BindCti.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
BindCti.search = function () {
    var searchParam = {};

    BindCti.table.reload(searchParam);
};

/**
 * 重置搜索
 */
BindCti.resetSearch = function () {

    BindCti.search();
};




/**
 *  绑定CTI
 */
BindCti.bind = function (id,btn) {
    var l = $(btn).ladda();
    l.ladda('start');
    var groupId=$("#groupid").val();
    $.ajax({
        url: '/callerGroup/bindCti',
        type: 'POST',
        data: JSON.stringify({id: id, groupId: groupId}),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (r) {
            if (r.code === 0) {
                setTimeout(function () {
                    l.ladda('stop');
                    BindCti.resetSearch();
                }, 1000)
            } else {
                l.ladda('stop');
                alert("绑定失败：" + r.msg);
            }
        }

    })

};

$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", BindCti.initOptions());
    BindCti.table = jqGrid.init();
});