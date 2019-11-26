var Role = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null ,
    domain: "role"
};

var createSwitchery;
var editSwitchery;


/**
 * jqGrid初始化参数
 */
Role.initOptions = function () {
    var options = {
        url : "/role/grid",
        autowidth:true,
        colNames: ['编号', '角色名', '角色key', '可用', '操作'],
        colModel: [
            {name: 'id', index: 'id', width: 60, sorttype: "int"},
            {name: 'name', index: 'name', width: 90},
            {name: 'roleKey', index: 'roleKey', width: 100},
            {name: 'enabled', index: 'enabled', width: 100, formatter: function (cellValue, options, rowObject) {
                return cellValue ? '是' : '否';
            }},
            {name: 'operations', index: 'operations', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var str;
                str = '<input type="button" class="control-auth btn btn-sm btn-primary" data-auth="role_permission" value="分配权限" onclick="Role.permissionModal(' + id + ')"/>';
                str += '<input type="button" class="control-auth btn btn-sm btn-info" data-auth="role_update" value="编辑" onclick="Role.edit(' + id + ')"/>';
                str += '<input type="button" class="control-auth btn btn-sm btn-danger" data-auth="role_delete" value="删除" onclick="Role.delete(' + id + ')"/>';
                return str;
            }}
        ],
        gridComplete: function () {
            refreshPermission(Role.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
Role.search = function () {
    var searchParam = {};
    searchParam.name = $("#name").val().trim();
    searchParam.roleKey = $("#roleKey").val().trim();
    Role.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Role.resetSearch = function () {
    $("#name").val("");
    $("#roleKey").val("");
    Role.search();
};

/**
 * 新增弹框
 */
Role.create = function () {
    $("#createModal").modal();
};

/**
 * 保存角色
 */
Role.insert = function () {
    var role = getFormJson($("#create-form"));
    role.enabled = document.querySelector("#createModal .js-switch").checked;
    $.ajax({
        url: "/role/insert",
        type: 'POST',
        data: JSON.stringify(role),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                Role.search();
                $("#create-form")[0].reset();
            }
        }
    })
};

/**
 * 编辑弹框
 * @param id    roleId
 */
Role.edit = function (id) {
    $.ajax({
        url: "/role/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var role = r.obj;
                var form = $("#edit-form");
                form.find("input[name='id']").val(role.id);
                form.find("input[name='name']").val(role.name);
                form.find("input[name='roleKey']").val(role.roleKey);
                form.find("input[name='description']").val(role.description);
                form.find("input[name='id']").val(role.id);
                setSwitchery(editSwitchery, role.enabled);
                $("#editModal").modal();
            }
        }
    })
};

/**
 * 更新角色
 */
Role.update = function () {
    var role = getFormJson($("#edit-form"));
    role.enabled = document.querySelector("#editModal .js-switch").checked;
    $.ajax({
        url: "/role/update",
        type: 'POST',
        data: JSON.stringify(role),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                Role.search();
                success("保存成功");
            }
        }
    })
};

/**
 * 删除角色
 *
 * @param id    roleId
 */
Role.delete = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/role/delete?id=" + id, function () {
            success("成功删除");
            Role.search();
        });
    })
};

var jstreeOptions = {
    core: {
        data: [],
        themes: {
            "variant" : "large"
        }
    },
    checkbox: {
        "keep_selected_style": false
    },
    plugins: ["wholerow", "checkbox" ]   //引用插件："wholerow"-行点击；"checkbox"-加上复选框
};

/**
 *
 * @param roleId
 */
Role.permissionModal = function (roleId) {
    $("#roleId").val(roleId);
    var menuTree = $("#menu_tree");
    menuTree.jstree("destroy");
    $.ajax({
        url: "/role/permission?roleId=" + roleId,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var nodes = r.obj;
                jstreeOptions.core.data = nodes;
                menuTree.jstree(jstreeOptions);
                $("#permissionModal").modal();
            }
        }
    });

};

/**
 * 保存授权
 */
Role.savePermissions = function () {
    var jstree = $('#menu_tree').jstree();
    //先获取选中的code
    var codes = jstree.get_selected();
    //因为jstree对部分选中的不算选中，所以我们手动加上
    for (var i = 0; i < codes.length; i++) {
        var pcode = jstree.get_parent(codes[i]);
        if (pcode !== "#") {
            codes.push(pcode);
        }
    }
    //去重
    codes = Array.from(new Set(codes));
    console.log(codes);
    var roleId = $("#roleId").val();
    $.ajax({
        url: "/role/permission/save",
        type: 'POST',
        data: JSON.stringify({
            id: roleId,
            codes: codes
        }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#permissionModal").modal('hide');
                success("保存成功");
            }
        }
    });
};

$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", Role.initOptions());
    Role.table = jqGrid.init();

    //初始化Switchery选择插件
    createSwitchery = new Switchery(document.querySelector('#createModal .js-switch'), {color: '#1AB394'});
    editSwitchery = new Switchery(document.querySelector('#editModal .js-switch'), {color: '#1AB394'});

});