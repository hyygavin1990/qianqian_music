var LabelGroup = {
    tableId: "#grid-table",
    pagerId: "grid-pager",
    selectId: null, //grid选择的条目id
    table: null,
    domain: "label_group"
};


/**
 * jqGrid初始化参数
 */
LabelGroup.initOptions = function () {
    var options = {
        url : "/label_group/grid",
        autowidth:true,
        multiselect: true,
        colNames : ['编号', '名称','操作'],
        colModel: [
            {name:'id',index:'id', width:50, editable: false,sortable:false},
            {name:'name',index:'name', width:100, editable: false,sortable:false},
            {name: 'operations', index: 'operations', width: 50, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var id = rowObject["id"];
                    var str = '';
                    str += '<input type="button" class="control-auth btn btn-sm btn-info" value="编辑" data-auth="label_group_update" onclick="LabelGroup.edit('+id+')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-primary" value="关联标签" data-auth="label_group_relation" onclick="LabelGroup.toRelation('+id+')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-danger" value="删除" data-auth="label_group_delete" onclick="LabelGroup.delete('+id+')"/>';
                    return str;
                }}
        ],
        gridComplete: function () {
            refreshPermission(LabelGroup.domain);
        }
    };
    return options;
};


/**
 * 新增弹框
 */
LabelGroup.create = function () {
    $("input[name='type']").each(function () {
        $(this).attr("checked", false);
    });
    $("#createModal").modal();
};

/**
 * 根据关键词搜索
 */
LabelGroup.search = function () {
    var searchParam = {};
    searchParam.name = $("#name").val().trim();
    LabelGroup.table.reload(searchParam);
};

/**
 * 重置搜索
 */
LabelGroup.resetSearch = function () {
    $("#name").val("");
    LabelGroup.search();
};

/**
 * 关联标签
 */
LabelGroup.toRelation = function (id) {
    window.location.href = "/label_group/relation/list?labelGroupId=" + id;
};


/**
 * 保存标签
 */
LabelGroup.insert = function () {
    var labelGroup = getFormJson($("#create-form"));
    $.ajax({
        url: "/label_group/insert",
        type: 'POST',
        data: JSON.stringify(labelGroup),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                LabelGroup.search();
                $("#create-form")[0].reset();
            }
        }
    })
};


LabelGroup.edit = function (id) {
    $.ajax({
        url: "/label_group/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var labelGroup = r.obj;
                var form = $("#edit-form");
                form.find("input[name='name']").val(labelGroup.name);
                form.find("input[name='id']").val(labelGroup.id);
                $("#editModal").modal();
            }
        }
    })
};


/**
 * 更新标签组
 */
LabelGroup.update = function () {
    var labelGroup = getFormJson($("#edit-form"));
    $.ajax({
        url: "/label_group/update",
        type: 'POST',
        data: JSON.stringify(labelGroup),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                $("#edit-form")[0].reset();
                LabelGroup.search();
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
LabelGroup.delete = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/label_group/delete?id=" + id, function () {
            success("成功删除");
            LabelGroup.search();
        });
    })
};

$(function() {
    var jqGrid = new JqGrid(LabelGroup.tableId, LabelGroup.pagerId, LabelGroup.initOptions());
    LabelGroup.table = jqGrid.init();
});