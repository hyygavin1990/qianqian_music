var User = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "user"
};

var projectDualSelector,groupDualSelector;

/**
 * jqGrid初始化参数
 */
User.initOptions = function () {
    var options = {
        url : "/user/grid",
        autowidth:true,
        colNames: ['编号', '用户名', '昵称', '手机号','操作'],
        colModel: [
            {name: 'id', index: 'id', width: 60, sorttype: "int"},
            {name: 'username', index: 'username', width: 100},
            {name: 'nickname', index: 'nickname', width: 100, sortable: false},
            {name: 'phone', index: 'phone', width: 100, sortable: false},
            {name: 'operations', index: 'operations', width: 130, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var str = "";
                if (id != 1) {
                    str += '<input type="button" class="control-auth btn btn-sm btn-primary" data-auth="user_permission" value="授权" onclick="User.allocateRoleModal(' + id + ')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-info" data-auth="user_edit" value="编辑" onclick="User.edit(' + id + ')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-success" data-auth="user_reset_password" value="重置密码" onclick="User.resetPassword(' + id + ')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-danger" data-auth="user_delete" value="删除" onclick="User.delete(' + id + ')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-warning" data-auth="user_project" value="分配项目" onclick="User.allocateProjectModal(' + id + ')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-warning" data-auth="user_group" value="分配坐席组" onclick="User.allocateGroupModal(' + id + ')"/>';
                }
                return str;
            }}
        ],
        gridComplete: function () {
            refreshPermission(User.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
User.search = function () {
    var searchParam = {};
    searchParam.username = $("#username").val().trim();
    searchParam.nickname = $("#nickname").val().trim();
    searchParam.roleId = $("#roleId").val();
    User.table.reload(searchParam);
};

/**
 * 重置搜索
 */
User.resetSearch = function () {
    $("#username").val("");
    $("#nickname").val("");
    $("#roleId").val("");
    User.search();
};

/**
 * 新增弹框
 */
User.create = function () {
    $("#createModal").modal();
};

/**
 * 保存用户
 */
User.insert = function () {
    var user = getFormJson($("#create-form"));
    if(isPoneAvailable(user.phone)){
        $.ajax({
            url: "/user/insert",
            type: 'POST',
            data: JSON.stringify(user),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    $("#createModal").modal("hide");
                    success("保存成功");
                    User.search();
                    $("#create-form")[0].reset();
                }
            }
        })
    }
};

/**
 * 编辑弹框
 */
User.edit = function (id) {
    $("#selectCompany2").hide();
    $.ajax({
        url: "/user/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var user = r.obj;
                var form = $("#edit-form");
                form.find("input[name='username']").val(user.username);
                form.find("input[name='nickname']").val(user.nickname);
                form.find("input[name='phone']").val(user.phone);
                form.find("input[name='id']").val(user.id);
                $("#editModal").modal();
            }
        }
    })
};

/**
 * 更新用户
 */
User.update = function () {
    var form = $("#edit-form");
    var user = {};
    user.id = form.find("input[name='id']").val()
    user.username =  form.find("input[name='username']").val();
    user.nickname =  form.find("input[name='nickname']").val();
    user.phone =  form.find("input[name='phone']").val();
    // console.log(user);
    if(isPoneAvailable(user.phone)){
        $.ajax({
            url: "/user/update",
            type: 'POST',
            data: JSON.stringify(user),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    $("#editModal").modal("hide");
                    User.search();
                    success("保存成功");
                }
            }
        })
    }
};

/**
 * 分配项目modal
 */
User.allocateProjectModal = function allocateProjectModal(userId) {
    $("#projectForm").find("input[name='userId']").val(userId);
    $.ajax({
        url: "/user/project?userId=" + userId,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var selected = r.obj.selected;
                var nonSelected = r.obj.nonSelected;
                var form = $("#projectForm");
                var str = '';
                for (var i = 0; i < selected.length; i++) {
                    var p1 = selected[i];
                    str += '<option selected value="' + p1.pid + '">' + p1.pname + '</option>';
                }
                for (var j = 0; j < nonSelected.length; j++) {
                    var p2 = nonSelected[j];
                    str += '<option value="' + p2.pid + '">' + p2.pname + ' </option>';
                }
                $(form).find(".dual_select").html(str);
                projectDualSelector.bootstrapDualListbox('refresh');
                $("#allocateProjectModal").modal();
            }
        }
    });
};

/**
 * 保存分配的项目
 */
User.saveProjects = function () {
    var selected = getFormJson($("#projectForm"));
    //判断是否是数组     如果只有一个数据，返回的是字符串，将字符串转化为数组
    if(!Array.isArray(selected.projectIds)){
        var arr = [] ;
        arr.push(selected.projectIds);
        selected.projectIds = arr;
    }
    $.ajax({
        url: "/user/project/save",
        type: 'POST',
        data: JSON.stringify(selected),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#allocateProjectModal").modal('hide');
                success("保存成功");
            }
        }
    });

};

/**
 * 分配分组modal
 */
User.allocateGroupModal = function allocateGroupModal(userId) {
    $("#groupForm").find("input[name='userId']").val(userId);
    $.ajax({
        url: "/staff_group/getStaffGroupAll?userId="+userId,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var selected = r.obj.staffGroupSelected;
                var nonSelected = r.obj.staffGroupAll;
                var form = $("#groupForm");
                var str = '';
                for (var i = 0; i < selected.length; i++) {
                    var g1 = selected[i];
                    str += '<option selected value="' + g1.id + '">' + g1.name + '</option>';
                }
                for (var j = 0; j < nonSelected.length; j++) {
                    var g2 = nonSelected[j];
                    str += '<option value="' + g2.id + '">' + g2.name + ' </option>';
                }
                $(form).find(".dual_select").html(str);
                groupDualSelector.bootstrapDualListbox('refresh');
                $("#allocateGroupModal").modal();
            }
        }
    });
};

/**
 * 保存分配的项目
 */
User.saveGroups = function () {
    var selected = getFormJson($("#groupForm"));
    //判断是否是数组     如果只有一个数据，返回的是字符串，将字符串转化为数组
    if(!Array.isArray(selected.groupIds)){
        var arr = [] ;
        arr.push(selected.groupIds);
        selected.groupIds = arr;
    }
    $.ajax({
        url: "/staff_group/saveGroup",
        type: 'POST',
        data: JSON.stringify(selected),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#allocateGroupModal").modal('hide');
                success("保存成功");
            }
        }
    });

};

/**
 * 删除用户
 *
 * @param id    userId
 */
User.delete = function (id) {
    warning("确定删除吗", "", function () {
        $.get("/user/delete?id=" + id, function (r) {
            if (r.code === 0) {
                success("成功删除");
                User.search();
            }
        });
    })
};

/**
 * 重置密码
 *
 * @param id    userId
 */
User.resetPassword = function (id) {
    warning("即将重置为初始密码", "", function () {
        $.get("/user/resetPassword?id=" + id, function (r) {
            if (r.code === 0) {
                success("操作成功");
            }
        });
    })
};

User.allocateRoleModal = function allocateRoleModal(userId) {
    $("#userId").val(userId);
    var roles = [];
    $.ajax({
        url: "/user/role?userId=" + userId,
        type: 'GET',
        async: false,
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                roles = r.obj;
            }
        }
    });
    var str = '';
    for (var i = 0; i < roles.length; i++) {
        var role = roles[i];
        str += '<label><input type="checkbox" name="role" value="' + role.id + '" ';
        if (role.selected) {
            str += 'checked';
        }
        str += '>' + role.name + '</label><br>';
    }
    $("#role_container").html(str);
    $("#allocateRoleModal").modal();
};


/**
 * 授权
 */
User.saveRoles = function () {
    var roleIds = [];
    $.each($("#role_container").find("input[name='role']:checked"), function (index, data) {
        roleIds.push(data.value);
    });
    var userId = $("#userId").val();
    $.ajax({
        url: "/user/role/save",
        type: 'POST',
        data: JSON.stringify({
            userId: userId,
            roleIds: roleIds
        }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#allocateRoleModal").modal('hide');
                User.search();
                success("保存成功");
            }
        }
    });
};


var dualOptions = {
    selectorMinimalHeight: 160,
    selectedListLabel: "已选：",
    nonSelectedListLabel: "未选：",
    filterTextClear: "展示全部",
    filterPlaceHolder: "过滤",
    infoText: false
};

function isPoneAvailable(phone) {
    var myreg=/^[1][0-9]{10}$/;
    if (!myreg.test(phone)) {
        toastr.error("手机号格式不正确", "error");
        return false;
    }
    return true;
}


$(function() {
    $("input[type=radio][name=permission]").change(function(){
        if(this.value == "option2"){
            $("#selectCompany").show();
        }else{
            $("#selectCompany").hide();
        }
    });
    $("input[type=radio][name=permission2]").change(function(){
        if(this.value == "option4"){
            $("#selectCompany2").show();
        }else{
            $("#selectCompany2").hide();
        }
    });
    $('.chosen-select').chosen({width: "100%"});
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", User.initOptions());
    User.table = jqGrid.init();

    projectDualSelector = $("#projectForm").find(".dual_select").bootstrapDualListbox(dualOptions);
    groupDualSelector = $("#groupForm").find(".dual_select").bootstrapDualListbox(dualOptions);
});