var Sheetheader = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "sheetheader_list"
};

/**
 * jqGrid初始化参数
 */
Sheetheader.initOptions = function () {
    var options = {
        url : "/sheetheader/grid",
        autowidth:true,
        colNames: ['id', '名称', '英文名称','操作'],
        colModel: [
            {name: 'id', index: 'id', width: 90, sortable: false},
            {name: 'name', index: 'name', width: 90, sortable: false},
            {name: 'en_name', index: 'en_name', width: 90, sortable: false,},
            {name: 'operations', index: 'operations', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var str = "";
                str += '<input type="button" class="control-auth btn btn-sm btn-warning" data-auth="sheetheader_edit" value="编辑" onclick="Sheetheader.edit(' + id + ')"/>';
                str += '<input type="button" class="control-auth btn btn-sm btn-danger" data-auth="sheetheader_delete" value="删除" onclick="Sheetheader.delete(' + id + ')"/>';
                return str;
            }}
        ],
        gridComplete: function () {
            refreshPermission(Sheetheader.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
Sheetheader.search = function () {
    var searchParam = {};
    searchParam.name = $("#name").val().trim();
    Sheetheader.table.reload(searchParam);
};


/**
 * 新增弹框
 */
Sheetheader.create = function () {
    $("#createModal").modal();
};

/**
 * 保存用户
 */
Sheetheader.insert = function () {
    var name = $("#create-form").find("input[name=name]").val();
    var en_name = $("#create-form").find("input[name=en_name]").val();
    if(name==""||en_name==""){
        toastr.error("正确填写内容", "error");
        return;
    }
    $.ajax({
        url: "/sheetheader/insert",
        type: 'GET',
        data:{
            name:name,
            en_name:en_name
        },
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                Sheetheader.search();
                $("#create-form")[0].reset();
            }
        }
    })
};
/**
 * 编辑用户
 */
Sheetheader.update = function () {
    var name = $("#edit-form").find("input[name=name]").val();
    var id = $("#edit-form").find("input[name=id]").val();
    if(name==""){
        toastr.error("正确填写内容", "error");
        return;
    }
    $.ajax({
        url: "/sheetheader/update",
        type: 'GET',
        data:{
            name:name,
            id:id
        },
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                success("保存成功");
                Sheetheader.search();
                $("#edit-form")[0].reset();
            }
        }
    })
};


Sheetheader.delete = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/sheetheader/delete?id=" + id, function () {
            success("成功删除");
            Sheetheader.search();
        });
    })
};
Sheetheader.edit = function (id) {
        $.ajax({
            url: "/sheetheader/get",
            type: 'GET',
            data:{
                id:id
            },
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    var header=r.obj;
                    $("#edit-form").find("input[name=name]").val(header.name);
                    $("#edit-form").find("input[name=en_name]").val(header.enName);
                    $("#edit-form").find("input[name=id]").val(id);
                    $("#editModal").modal();
                }
            }
        })
};

/**
 * 重置搜索
 */
Sheetheader.resetSearch = function () {
    $("#name").val("");
    Sheetheader.search();
};


$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", Sheetheader.initOptions());
    Sheetheader.table = jqGrid.init();
});