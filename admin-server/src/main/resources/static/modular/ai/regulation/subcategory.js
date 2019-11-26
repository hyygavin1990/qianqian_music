var SubCategory = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "subcategory",
};

/**
 * jqGrid初始化参数
 */
SubCategory.initOptions = function () {
    var options = {
        url : "/subcategory/grid",
        autowidth:true,
        colNames: ['编号', '分类名称','路由标识', '操作'],
        colModel: [
            {name: 'id', index: 'id', width: 60, sorttype: "int"},
            {name: 'name', index: 'name', width: 90, sortable: false},
            {name: 'route', index: 'route', width: 90, sortable: false},
            {name: 'operations', index: 'operations', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var str = "";
                str += '<input type="button" class="control-auth btn btn-sm btn-info" data-auth="subcategory_edit" value="编辑" onclick="SubCategory.edit(' + id + ')"/>&nbsp;';
                str += '<input type="button" class="control-auth btn btn-sm btn-danger" data-auth="subcategory_delete" value="删除" onclick="SubCategory.delete(' + id + ')"/>';
                return str;
            }}
        ],
        gridComplete: function () {
            refreshPermission(SubCategory.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
SubCategory.search = function () {
    var searchParam = {};
    searchParam.name = $("#name").val().trim();
    SubCategory.table.reload(searchParam);
};

/**
 * 重置搜索
 */
SubCategory.resetSearch = function () {
    $("#name").val("");
    SubCategory.search();
};

/**
 * 新增弹框
 */
SubCategory.create = function () {
    $("#createModal").modal();
};

/**
 * 保存用户
 */
SubCategory.insert = function () {
    var name = $("#create-form").find("input[name=name]").val().trim();
    var route = $("#create-form").find("input[name=route]").val().trim();
    var cid = $("#create-form").find("select[name=category]").val();
    var usern = /^[a-z0-9]{1,}$/;

    if (!route.match(usern)) {
        var msg = "路由标识只能由小写字母和数字组成";
        info(msg);
        return false;
    }
    if (cid==-1) {
        var msg = "规则组必选";
        info(msg);
        return false;
    }
    $.ajax({
        url: "/subcategory/insert",
        type: 'GET',
        data: {
            "name":name,
            "route":route,
            "cid":cid
        },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                SubCategory.search();
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
SubCategory.edit = function (id) {
    $.ajax({
        url: "/subcategory/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var subcategory = r.obj;
                var form = $("#edit-form");
                form.find("input[name='name']").val(subcategory.name);
                form.find("input[name='id']").val(subcategory.id);
                form.find("input[name='route']").val(subcategory.route);
                form.find("input[name='category']").val(subcategory.category);
                $("#editModal").modal();
            }
        }
    })
};

/**
 * 更新用户
 */
SubCategory.update = function () {
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
        url: "/subcategory/update",
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
                SubCategory.search();
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
SubCategory.delete = function del(id) {
    swal({
        title: "确定删除吗",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: 'get',
            url: "/subcategory/delete?id=" + id,
            success: function (r) {
                if (r.code == 0) {
                    success("成功删除");
                }
                SubCategory.search();
                // clearMask();
            }
        })
    });
};

SubCategory.category=function(){
    $.ajax({
        type: 'get',
        url: "/subcategory/getAllCategory",
        async: false,
        success: function (r) {
            var obj = r.obj;
            var categoryList=obj.categoryList;
            var cid = r.cid;
            var str = "";
            str += "<select class=' form-control category-select chosen-select' name=''>";
            for (var i = 0; i < categoryList.length; i++) {
                var category = categoryList[i];
                if(cid==category.id){
                    str += "<option selected value='" + category.id + "'>" + category.name + "</option>";
                }else{
                    str += "<option value='" + category.id + "'>" + category.name + "</option>";
                }
            }
            str += " </select>";

            $("#categoryDiv").append(str);
            $(".category-select").chosen({width: "100%"});
        }
    })
}



$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", SubCategory.initOptions());
    SubCategory.table = jqGrid.init();
});