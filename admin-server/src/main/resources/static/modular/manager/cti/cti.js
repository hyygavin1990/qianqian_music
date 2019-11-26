var Cti = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "cti"
};

/**
 * jqGrid初始化参数
 */
Cti.initOptions = function () {
    var options = {
        url : "/cti/grid",
        postData:{
            state:$("#state").val()
        },
        sortname: "ip",
        sortorder: "asc",
        colNames: ['ip', '端口', '并发数','终端服务器ip', '状态', '已绑定线路组','操作'],
        colModel: [
            {name: 'ip', index: 'ip', width: 50,align:"center"},
            {name: 'port', index: 'port', width: 15, sortable: false,align:"center"},
            {name: 'maxline', index: 'maxline', width: 30, sortable: false,align:"center"},
            {name: 'terminalIp', index: 'terminalIp', width: 100, sortable: false,hidden:true},
            {name: 'state', index: 'state', width: 30, sortable: false,align:"center", formatter: function (cellValue, options, rowObject) {
                return cellValue === 1 ? "上线" : "下线";
            }},
            {name: 'caller_group', index: 'caller_group', width: 100, sortable: false,align:"center"},
            {name: 'operations', index: 'operations', width: 200, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var state = rowObject["state"];
                var str = '';
                var style=cellValue == 1 ? "" : "";
                if (state === 1) {
                    str += '<input type="button" class="control-auth btn btn-sm btn-primary" data-auth="cti_logout" value="下线" onclick="Cti.logout(' + id + ')"/>&nbsp;';
                } else {
                    str += '<input type="button" class="control-auth btn btn-sm btn-primary" style="background-color:#9370DB" data-auth="cti_login" value="上线" onclick="Cti.login(' + id + ')"/>&nbsp;';
                }
                str += '<input type="button" class="control-auth btn btn-sm btn-info" data-auth="cti_edit" value="编辑" onclick="Cti.edit(' + id + ')"/>&nbsp;';
                str += '<input type="button" class="control-auth btn btn-sm btn-danger" data-auth="cti_delete" value="删除" onclick="Cti.delete(' + id + ')"/>&nbsp;';
                str += '<input type="button" class="control-auth btn btn-sm btn-warning" data-auth="cti_toTerminal" value="配置终端" onclick="Cti.terminal(' + id + ')"/>&nbsp;';
                str += '<input type="button" class="control-auth btn btn-sm btn-warning" data-auth="ext_toExtList" value="分机列表" onclick="Cti.toExtList(' + id + ')"/>';
                return str;
            }}
        ],
        gridComplete: function () {
            refreshPermission(Cti.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
Cti.search = function () {
    var searchParam = {};
    searchParam.ip = $("#ip").val().trim();
    searchParam.state = $("#state").val();
    Cti.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Cti.resetSearch = function () {
    $("#ip").val("");
    //默认选中在线
    document.getElementById('state').value=1;
    Cti.search();
};

/**
 * 新增弹框
 */
Cti.create = function () {
    $("#createModal").modal();
};

/**
 *  上线
 */
Cti.login = function (id) {
    $.ajax({
        url: "/cti/login?id=" + id,
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                Cti.search();
            }
        }
    })
};

/**
 * 下线
 */
Cti.logout = function (id) {
    $.ajax({
        url: "/cti/logout?id=" + id,
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                Cti.search();
            }
        }
    })
};

/**
 * 保存用户
 */
Cti.insert = function () {
    var cti = getFormJson($("#create-form"));
    $.ajax({
        url: "/cti/insert",
        type: 'POST',
        data: JSON.stringify(cti),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                Cti.search();
                $("#create-form")[0].reset();
            }
        }
    })
};
/**
 *  批量设置 并发 弹窗
 */
Cti.setConcurrent=function(){
    var form = $("#set-form");
    form.find("input[name='maxline']").val("");
    $("#setModal").modal();
};
/**
 *  批量设置 并发 弹窗
 */
Cti.setUpdate=function(){
    var set = getFormJson($("#set-form"));
    if(!set.maxline){
        info("请输入并发数！");
        return;
    }else if(!check.checkNumber(set.maxline)){
        return;
    }
    console.log(JSON.stringify(set));
    $.ajax({
        url: "/cti/setConcurrent?maxline="+parseInt(set.maxline),
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#setModal").modal("hide");
                success("一键设置成功");
                Cti.search();
                $("#set-form")[0].reset();
            }
        }
    })
};
/**
 * 编辑弹框
 * @param id    callerConfigId
 */
Cti.edit = function (id) {
    $.ajax({
        url: "/cti/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var cti = r.obj;
                var form = $("#edit-form");
                form.find("input[name='ip']").val(cti.ip);
                form.find("input[name='port']").val(cti.port);
                form.find("input[name='terminalIp']").val(cti.terminalIp);
                form.find("input[name='maxline']").val(cti.maxline);
                form.find("input[name='id']").val(cti.id);
                $("#editModal").modal();
            }
        }
    })
    /*var ids = this.table.getSelectedRowIds();
    if (ids === undefined || ids.length === 0) {
        toastr.warning("必须先选择记录再操作");
        // info("必须先选择记录再操作");
        return;
    } else if (ids.length > 1) {
        toastr.warning("只能选择一条记录");
        return;
    } else {
        $.ajax({
            url: "/cti/get?id=" + ids[0],
            type: 'GET',
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    var cti = r.obj;
                    var form = $("#edit-form");
                    form.find("input[name='ip']").val(cti.ip);
                    form.find("input[name='port']").val(cti.port);
                    form.find("input[name='path']").val(cti.path);
                    form.find("input[name='id']").val(cti.id);
                    $("#editModal").modal();
                }
            }
        })
    }*/
};

/**
 * 更新用户
 */
Cti.update = function () {
    var cti = getFormJson($("#edit-form"));
    $.ajax({
        url: "/cti/update",
        type: 'POST',
        data: JSON.stringify(cti),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                Cti.search();
                success("保存成功");
            }
        }
    })
};

/**
 * 删除用户
 *
 * @param id    callerConfigId
 */
Cti.delete = function del(id) {
    var ids = [id];
    Dev.print(ids+"------------------");
    warning("确定删除吗", "", function () {
        //var ids = Cti.table.getSelectedRowIds();
        $.ajax({
            url: "/cti/delete",
            type: "POST",
            data: {
                ids:ids
            },
            dataType: "json",
            success: function (r) {
                success("成功删除");
                Cti.search();
            }
        })
    })

};

/**
 * 配置终端
 */
Cti.terminal = function (id) {
    window.location.href = "/cti/terminal/list?ctiid=" + id;
    /*var ids = this.table.getSelectedRowIds();
    if (ids === undefined || ids.length === 0) {
        toastr.warning("必须先选择记录再操作");
        return;
    } else if (ids.length > 1) {
        toastr.warning("只能选择一条记录");
        return;
    } else {
        window.location.href = "/cti/terminal/list?ctiid=" + ids[0];
    }*/
};


/**
 * 上线所有分机
 */
Cti.ctiLoginAll = function () {
    waitMask();
    $.ajax({
        url: "/cti/loginAll",
        type: "POST",
        data: {
        },
        dataType: "json",
        success: function (r) {
            setTimeout(function () {
                clearMask();
                if (r.code === 0) {
                    info("上线成功");
                    document.getElementById("state").value=1;
                    Cti.getState();
                    Cti.search();
                }
            }, 2000);
        }
    })
};

/**
 * 下线所有分机
 */
Cti.ctiLogoutAll = function () {
    waitMask();
    $.ajax({
        url: "/cti/logoutAll",
        type: "POST",
        data: {
        },
        dataType: "json",
        success: function (r) {
            setTimeout(function () {
                clearMask();
                if (r.code === 0) {
                    info("下线成功");
                    document.getElementById("state").value=0;
                    Cti.getState();
                    Cti.search();
                }
            }, 1000);
        }
    })
};



/**
 * 上线CTI的所有分机
 */
Cti.batchLoginWithCti = function (id) {
    waitMask();
    $.ajax({
        url: "/ext/loginWithCti",
        type: "POST",
        data: {
            ctiId:id
        },
        dataType: "json",
        success: function (r) {
            setTimeout(function () {
                clearMask();
                if (r.code === 0) {
                    info("上线成功");
                    Cti.getState();

                }
            }, 2000);
        }
    })
};

/**
 * 下线cti的分机
 */
Cti.batchLogoutWithCti = function (id) {
    waitMask();
    $.ajax({
        url: "/ext/logoutWithCti",
        type: "POST",
        data: {
            ctiId:id
        },
        dataType: "json",
        success: function (r) {
            setTimeout(function () {
                clearMask();
                if (r.code === 0) {
                    info("下线成功");
                    Cti.getState();
                }
            }, 1000);
        }
    })
};

/**
 * 分机列表
 */
Cti.toExtList = function (id) {
    window.location.href = "/ext/toExtList?ctiId=" + id;
};

Cti.getState = function () {
    $.ajax({
        url: "/ext/get?worktype=1",
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

/**
 * 服务管理页
 */
Cti.task = function (ip) {
    window.location.href = "/task/list?ip=" + ip;
};

$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", Cti.initOptions());
    Cti.table = jqGrid.init();
    Cti.getState();
});