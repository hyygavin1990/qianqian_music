var Category = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "category"
};

/**
 * jqGrid初始化参数
 */
Category.initOptions = function () {
    var options = {
        url : "/category/grid",
        autowidth:true,
        colNames: ['编号', '分类名称','路由标识', '操作'],
        colModel: [
            {name: 'id', index: 'id', width: 60, sorttype: "int"},
            {name: 'name', index: 'name', width: 90, sortable: false},
            {name: 'route', index: 'route', width: 90, sortable: false},
            {name: 'operations', index: 'operations', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var str = "";
                str += '<input type="button" class="control-auth btn btn-sm btn-info" data-auth="category_edit" value="编辑" onclick="Category.edit(' + id + ')"/>&nbsp;';
                str += '<input type="button" class="control-auth btn btn-sm btn-danger" data-auth="category_delete" value="删除" onclick="Category.delete(' + id + ')"/>';
                return str;
            }}
        ],
        gridComplete: function () {
            refreshPermission(Category.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
Category.search = function () {
    var searchParam = {};
    searchParam.name = $("#name").val().trim();
    Category.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Category.resetSearch = function () {
    $("#name").val("");
    Category.search();
};

/**
 * 新增弹框
 */
Category.create = function () {
    $("#createModal").modal();
};

/**
 * 保存用户
 */
Category.insert = function () {
    var name = $("#create-form").find("input[name=name]").val().trim();
    var route = $("#create-form").find("input[name=route]").val().trim();
    var usern = /^[a-z0-9]{1,}$/;

    if (!route.match(usern)) {
        var msg = "路由标识只能由小写字母和数字组成";
        info(msg);
        return false;
    }

    $.ajax({
        url: "/category/insert",
        type: 'GET',
        data: {
            "name":name,
            "route":route
        },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                Category.search();
                $("#create-form")[0].reset();
            }else if(r.code == 1){
                info("route重复");
            }
        }
    })
};

/**
 * 编辑弹框
 */
Category.edit = function (id) {
    $.ajax({
        url: "/category/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var category = r.obj;
                var form = $("#edit-form");
                form.find("input[name='name']").val(category.name);
                form.find("input[name='id']").val(category.id);
                form.find("input[name='route']").val(category.route);
                $("#editModal").modal();
            }
        }
    })
};

/**
 * 更新用户
 */
Category.update = function () {
    var id = $("#edit-form").find("input[name=id]").val();
    var name = $("#edit-form").find("input[name=name]").val().trim();
    var route = $("#edit-form").find("input[name=route]").val().trim();

    var usern = /^[a-z0-9]{1,}$/;

    if (!route.match(usern)) {
        var msg = "路由标识只能由小写字母和数字组成";
        info(msg);
        return false;
    }

    $.ajax({
        url: "/category/update",
        type: 'GET',
        data: {
            "name":name,
            "id" : id,
            "route" : route
        },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                Category.search();
                success("保存成功");
            }else if(r.code == 1){
                info("route重复");
            }
        }
    })
};

/**
 * 删除用户
 *
 * @param id    userId
 */
Category.delete = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/category/delete?id=" + id, function () {
            success("成功删除");
            Category.search();
        });
    })
};





$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", Category.initOptions());
    Category.table = jqGrid.init();
});