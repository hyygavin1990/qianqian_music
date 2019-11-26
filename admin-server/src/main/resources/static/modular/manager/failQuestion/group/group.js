var Group = {
    tableId: "#grid-table",
    pagerId: "grid-pager",
    selectId: null, //grid选择的条目id
    table: null,
    domain: "questionGroup"
};


/**
 * jqGrid初始化参数
 */
Group.initOptions = function () {
    var options = {
        url : "/failquestionGroup/grid",
        autowidth:true,
        // multiselect: true,
        colNames : ['编号', '名称','操作'],
        colModel: [
            {name:'id',index:'id', width:50, editable: false,sortable:false,align: "center"},
            {name:'name',index:'name', width:100, editable: false,sortable:false,align: "center"},
            {name: 'operations', index: 'operations', width: 50, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var id = rowObject["id"];
                    var str = '';
                    str += '<input type="button" class="control-auth btn btn-sm btn-info" value="编辑" data-auth="questionGroup_update" onclick="Group.edit('+id+')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-primary" value="关联问题" data-auth="questionGroup_relation" onclick="Group.toRelation('+id+')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-danger" value="删除" data-auth="questionGroup_delete" onclick="Group.delete('+id+')"/>';
                    return str;
                }}
        ],
        gridComplete: function () {
            refreshPermission(Group.domain);
        }
    };
    return options;
};


/**
 * 新增弹框
 */
Group.create = function () {
    $("input[name='type']").each(function () {
        $(this).attr("checked", false);
    });
    $("#createModal").modal();
};

/**
 * 根据关键词搜索
 */
Group.search = function () {
    var searchParam = {};
    searchParam.name = $("#name").val().trim();
    Group.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Group.resetSearch = function () {
    $("#name").val("");
    LabelGroup.search();
};

/**
 * 关联标签
 */
Group.toRelation = function (id) {
    window.location.href = "/failquestionGroup/relation/list?groupId=" + id;
};


/**
 * 保存标签
 */
Group.insert = function () {
    var group = getFormJson($("#create-form"));
    $.ajax({
        url: "/failquestionGroup/insert",
        type: 'POST',
        data: JSON.stringify(group),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                Group.search();
                $("#create-form")[0].reset();
            }
        }
    })
};


Group.edit = function (id) {
    $.ajax({
        url: "/failquestionGroup/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var group = r.obj;
                var form = $("#edit-form");
                form.find("input[name='name']").val(group.name);
                form.find("input[name='id']").val(group.id);
                $("#editModal").modal();
            }
        }
    })
};


/**
 * 更新标签组
 */
Group.update = function () {
    var group = getFormJson($("#edit-form"));
    $.ajax({
        url: "/failquestionGroup/update",
        type: 'POST',
        data: JSON.stringify(group),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                $("#edit-form")[0].reset();
                Group.search();
                success("保存成功");
            }
        }
    })
};

/**
 * 删除标签
 *
 * @param id
 */
Group.delete = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/failquestionGroup/delete?id=" + id, function () {
            success("成功删除");
            Group.search();
        });
    })
};

$(function() {
    var jqGrid = new JqGrid(Group.tableId, Group.pagerId, Group.initOptions());
    Group.table = jqGrid.init();
});