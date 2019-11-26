var HeaderGroup = {
    tableId: "#grid-table",
    pagerId: "grid-pager",
    selectId: null, //grid选择的条目id
    table: null,
    domain: "headergroup"
};


/**
 * jqGrid初始化参数
 */
HeaderGroup.initOptions = function () {
    var options = {
        url : "/headergroup/grid",
        autowidth:true,
        multiselect: true,
        colNames : ['编号', '名称','操作'],
        colModel: [
            {name:'id',index:'id', width:50, editable: false,sortable:false},
            {name:'name',index:'name', width:100, editable: false,sortable:false},
            {name: 'operations', index: 'operations', width: 50, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var id = rowObject["id"];
                    var str = '';
                    str += '<input type="button" class="control-auth btn btn-sm btn-info" value="编辑" data-auth="headergroup_edit" onclick="HeaderGroup.edit('+id+')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-primary" value="关联表头" data-auth="headergroup_config_list" onclick="HeaderGroup.toRelation('+id+')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-danger" value="删除" data-auth="headergroup_delete" onclick="HeaderGroup.delete('+id+')"/>';
                    return str;
                }}
        ],
        gridComplete: function () {
            refreshPermission(HeaderGroup.domain);
        }
    };
    return options;
};


/**
 * 新增弹框
 */
HeaderGroup.create = function () {
    // $("input[name='type']").each(function () {
    //     $(this).attr("checked", false);
    // });
    $("#createModal").modal();
};

/**
 * 根据关键词搜索
 */
HeaderGroup.search = function () {
    var searchParam = {};
    searchParam.name = $("#name").val().trim();
    HeaderGroup.table.reload(searchParam);
};

/**
 * 重置搜索
 */
HeaderGroup.resetSearch = function () {
    $("#name").val("");
    HeaderGroup.search();
};

/**
 * 关联标签
 */
HeaderGroup.toRelation = function (id) {
    window.location.href = "/headergroup/config/list?groupId=" + id;
};


/**
 * 保存标签
 */
HeaderGroup.insert = function () {
    var group = getFormJson($("#create-form"));
    $.ajax({
        url: "/headergroup/insert",
        type: 'POST',
        data: JSON.stringify(group),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                HeaderGroup.search();
                $("#create-form")[0].reset();
            }
        }
    })
};


HeaderGroup.edit = function (id) {
    $.ajax({
        url: "/headergroup/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var headerGroup = r.obj;
                var form = $("#edit-form");
                form.find("input[name='name']").val(headerGroup.name);
                form.find("input[name='id']").val(headerGroup.id);
                $("#editModal").modal();
            }
        }
    })
};


/**
 * 更新标签组
 */
HeaderGroup.update = function () {
    var headerGroup = getFormJson($("#edit-form"));
    $.ajax({
        url: "/headergroup/update",
        type: 'POST',
        data: JSON.stringify(headerGroup),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                $("#edit-form")[0].reset();
                HeaderGroup.search();
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
HeaderGroup.delete = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/headergroup/delete?id=" + id, function () {
            success("成功删除");
            HeaderGroup.search();
        });
    })
};

$(function() {
    var jqGrid = new JqGrid(HeaderGroup.tableId, HeaderGroup.pagerId, HeaderGroup.initOptions());
    HeaderGroup.table = jqGrid.init();
});