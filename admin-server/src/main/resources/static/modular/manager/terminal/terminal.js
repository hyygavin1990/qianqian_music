var Terminal = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "terminal"
};

/**
 * jqGrid初始化参数
 */
Terminal.initOptions = function () {
    var options = {
        url : "/terminal/grid",
        postData:{
          ctiid : $("#ctiid").val()
        },
        autowidth:true,
        rownumbers:true,
        colNames: ['编号', 'ip', '端口', '接口路径', '操作'],
        colModel: [
            {name: 'id', index: 'id', width: 60, sorttype: "int"},
            {name: 'ip', index: 'ip', width: 90},
            {name: 'port', index: 'port', width: 100, sortable: false},
            {name: 'path', index: 'path', width: 100, sortable: false},
            {name: 'operations', index: 'operations', width: 150, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var str = '<input type="button" class="control-auth btn btn-sm btn-info" data-auth="terminal_edit" value="编辑" onclick="Terminal.edit(' + id + ')"/>&nbsp;';
                str += '<input type="button" class="control-auth btn btn-sm btn-danger" data-auth="terminal_delete" value="删除" onclick="Terminal.delete(' + id + ')"/>';
                return str;
            }}
        ]
        ,
        gridComplete: function () {
            refreshPermission(Terminal.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
Terminal.search = function () {
    var searchParam = {};
    searchParam.ip = $("#ip").val().trim();
    Terminal.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Terminal.resetSearch = function () {
    $("#ip").val("");
    Terminal.search();
};

/**
 * 新增弹框
 */
Terminal.create = function () {
    $("#createModal").modal();
};

/**
 * 保存用户
 */
Terminal.insert = function () {
    var terminal = getFormJson($("#create-form"));
    $.ajax({
        url: "/terminal/insert",
        type: 'POST',
        data: JSON.stringify(terminal),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                Terminal.search();
                $("#create-form")[0].reset();
            }
        }
    })
};

/**
 * 编辑弹框
 * @param id    callerConfigId
 */
Terminal.edit = function (id) {

    $.ajax({
        url: "/terminal/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var teminal = r.obj;
                var form = $("#edit-form");
                form.find("input[name='ip']").val(teminal.ip);
                form.find("input[name='port']").val(teminal.port);
                form.find("input[name='path']").val(teminal.path);
                form.find("input[name='ctiid']").val(teminal.ctiid);
                form.find("input[name='id']").val(teminal.id);
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
            url: "/terminal/get?id=" + ids[0],
            type: 'GET',
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    var teminal = r.obj;
                    var form = $("#edit-form");
                    form.find("input[name='ip']").val(teminal.ip);
                    form.find("input[name='port']").val(teminal.port);
                    form.find("input[name='path']").val(teminal.path);
                    form.find("input[name='ctiid']").val(teminal.ctiid);
                    form.find("input[name='id']").val(teminal.id);
                    $("#editModal").modal();
                }
            }
        })
    }*/
};

/**
 * 更新用户
 */
Terminal.update = function () {
    var terminal = getFormJson($("#edit-form"));
    $.ajax({
        url: "/terminal/update",
        type: 'POST',
        data: JSON.stringify(terminal),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                Terminal.search();
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
Terminal.delete = function del(id) {
    var ids = [id];
    warning("确定删除吗", "", function () {
        //var ids = Terminal.table.getSelectedRowIds();
        $.ajax({
            url: "/terminal/delete",
            type: "POST",
            data: {
                'ids': ids
            },
            dataType: "json",
            success: function (r) {
                success("成功删除");
                Terminal.search();
            }
        })
    })
    /*var ids = this.table.getSelectedRowIds();
    if (ids === undefined || ids.length === 0) {
        toastr.warning("必须先选择记录再操作");
        // info("必须先选择记录再操作");
        return;
    } else {
        warning("确定删除吗", "", function () {
            var ids = Terminal.table.getSelectedRowIds();
            $.ajax({
                url: "/terminal/delete",
                type: "POST",
                data: {
                    'ids': ids
                },
                dataType: "json",
                success: function (r) {
                    success("成功删除");
                    Terminal.search();
                }
            })
        })
    }*/

};


$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", Terminal.initOptions());
    Terminal.table = jqGrid.init();
});