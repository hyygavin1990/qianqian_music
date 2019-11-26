var Ext = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "ext"
};


/**
 * jqGrid初始化参数
 */
Ext.initOptions = function () {
    var options = {
        url : "/ext/grid",
        postData:{
            worktype : $("#worktype").val(),
            ctiId:$("#ctiId").val()
        },
        autowidth:true,
        multiselect: true,
        colNames: ['分机号', '工作状态', '状态', '操作'],
        colModel: [
            {name: 'extid', index: 'extid', width: 90, sortable: false},
            {name: 'worktype', index: 'worktype', width: 90, sortable: false, hidden:true},
            {name: 'state', index: 'state', width: 100, sortable: false, formatter: function (cellValue) {
                if (cellValue == 0) {
                    return '离线';
                } else if (cellValue == 1) {
                    return '空闲';
                } else if (cellValue == 2) {
                    return '忙碌';
                }
            }},
            {name: 'operations', index: 'operations', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var worktype = rowObject["worktype"];//工作类型
                var idArr = [id];
                var str= '';
                if(worktype == 1){//当工作类型为机器人的时候显示上下线功能
                    str += '<input type="button" class="control-auth btn btn-sm btn-primary" data-auth="ext_login" value="上线" onclick="Ext.login(' + idArr + ')"/>&nbsp;';
                    str += '<input type="button" class="control-auth btn btn-sm btn-warning" data-auth="ext_logout" value="下线" onclick="Ext.logout(' + idArr + ')"/>&nbsp;';
                }
                return str;
            }}
        ],
        gridComplete: function () {
            refreshPermission(Ext.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
Ext.search = function () {
    var searchParam = {};
    searchParam.worktype = $("#worktype").val();
    searchParam.ext = $("#ext").val().trim();
    searchParam.state = $("#stateSelector").val();
    Ext.table.reload(searchParam);
    Ext.getState();
};

/**
 * 重置搜索
 */
Ext.resetSearch = function () {
    $("#ext").val("");
    $("#worktype").val("1");
    $("#stateSelector").val("");
    Ext.search();
    Ext.getState();
};


/**
 * 分机上线
 */
Ext.login = function (idArr) {
    var arr = [];
    if (!(idArr instanceof Array)) {
        arr.push(idArr);
    } else {
        arr = idArr;
    }
    var rowData = Ext.table.getRowById(arr[0]);
    if(rowData.worktype === '2'){
        info("坐席无法进行此操作！");
        return;
    }
    waitMask();
    $.ajax({
        url: "/ext/login",
        type: "POST",
        data: {
            'extIds': arr
        },
        dataType: "json",
        success: function (r) {
            setTimeout(function () {
                clearMask();
                if (r.code === 0) {
                    Ext.search();
                    Ext.getState();
                }
            }, 2000);
        }
    })
};

/**
 * 分机下线
*/
Ext.logout = function (idArr) {
    var arr = [];
    if (!(idArr instanceof Array)) {
        arr.push(idArr);
    } else {
        arr = idArr;
    }

    var rowData = Ext.table.getRowById(arr[0]);
    if(rowData.worktype === '2'){
        info("坐席无法进行此操作！");
        return;
    }
    waitMask();
    $.ajax({
        url: "/ext/logout",
        type: "POST",
        data: {
            'extIds': arr
        },
        dataType: "json",
        success: function (r) {
            setTimeout(function () {
                clearMask();
                if (r.code === 0) {
                    Ext.search();
                    Ext.getState();
                }
            }, 1000);
        }
    })
};

/**
 * 批量上线按钮
 */
Ext.loginBatch = function () {
    var ids = Ext.table.getSelectedRowIds();
    if (ids && ids.length > 0) {
        Ext.login(ids);
    } else {
        info("至少要选择一行");
    }
};

/**
 * 批量下线按钮
 */
Ext.logoutBatch = function () {
    var ids = Ext.table.getSelectedRowIds();
    if (ids && ids.length > 0) {
        Ext.logout(ids);
    } else {
        info("至少要选择一行");
    }
};

Ext.getState = function () {
    $.ajax({
        url: "/ext/getByCti?worktype="+$("#worktype").val()+"&ctiId="+$("#ctiId").val(),
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var states = r.obj;
                $("span[name='free']").html(states.free);
                $("span[name='off_line']").html(states.offline);
                $("span[name='busy']").html(states.busy);
            }
        }
    })
}

$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", Ext.initOptions());
    Ext.table = jqGrid.init();
    Ext.getState();
});