var UnBindCti = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "bindCti",
}

var ladda;
/**
 * jqGrid初始化参数
 */
UnBindCti.initOptions = function () {
    var groupId= $("#groupid").val();
    var options = {
        url : "/callerGroup/unBindGrid?groupId="+groupId,
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
            {name: 'operations', index: 'operations', width: 50, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var id = rowObject["id"];
                    var str='';
                    str += '<button class=" btn btn-sm btn-warning ladda-button"  data-style="zoom-out" onclick="UnBindCti.unbind(' + id + ',this)">解绑CTI</<button>';
                    return str;
                }}

        ],
    };
    return options;
};

/**
 * 根据关键词搜索
 */
UnBindCti.search = function () {
    var searchParam = {};
    searchParam.ip = $("#ip").val();
    UnBindCti.table.reload(searchParam);
};

/**
 * 重置搜索
 */
UnBindCti.resetSearch = function () {
    $("#ip").val("");
    UnBindCti.search();
};




/**
 *
 */
UnBindCti.unbind = function (id,btn) {
    var l = $(btn).ladda();
    l.ladda('start');
    var groupId=$("#groupid").val();
        var conf= confirm("确认解绑CTI？");
        if(conf==true) {
            $.ajax({
                url: '/callerGroup/unbindCti',
                type: 'POST',
                data: JSON.stringify({id: id, groupId: groupId}),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (r) {
                    if (r.code === 0) {
                        setTimeout(function () {
                            l.ladda('stop');
                            UnBindCti.search()
                        }, 1000)
                    } else {
                        l.ladda('stop');
                        alert("解绑失败：" + r.msg);
                    }
                }
            })
        }

};

$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", UnBindCti.initOptions());
    UnBindCti.table = jqGrid.init();
});