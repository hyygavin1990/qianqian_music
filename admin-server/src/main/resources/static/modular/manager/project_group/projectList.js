var ProjectList = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "projectList"
};

var ladda;
/**
 * jqGrid初始化参数
 */
ProjectList.initOptions = function () {
    var options = {
        url : "/projectGroup/proGrid",
        postData: {
            groupid: $("#groupid").val()
        },
        autowidth:true,
        sortname: "id",
        sortorder: "asc",
        colNames: ['编号', '名称', '创建时间', '操作'],////, '处理队列'
        colModel: [
            {name: 'id', index: 'id', width: 100, sorttype: "int"},
            {name: 'name', index: 'name', width: 100, sortable: false},

            {name: 'create_date', index: 'create_date', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                    return new Date(cellValue).toLocaleString();
                }}
            ,
            {name: 'operations', index: 'operations', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var id = rowObject["id"];
                    var groupId =rowObject["groupid"];
                    var str = '';
                    var thegroup=parseInt($("#groupid").val());
                    console.log("thegroup"+thegroup+"groupId"+groupId+"++++++++");
                    console.log(typeof  groupId);
                    console.log("--+++");
                    console.log(typeof thegroup);
                    if(groupId === thegroup){
                        str += '<button  class=" btn btn-sm btn-warning btn-danger" data-style="zoom-out"   onclick="ProjectList.delete(' + id + ')">解绑</button>';
                    }
                    return str;
                }}

        ],
        gridComplete: function () {
            refreshPermission(ProjectList.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
ProjectList.search = function () {
    var searchParam = {};
    searchParam.name = $("#name").val().trim();
    ProjectList.table.reload(searchParam);
};

/**
 * 重置搜索
 */
ProjectList.resetSearch = function () {
    $("#name").val("");
    ProjectList.search();
};
/**
 *  回车触发搜索
 * @param IdElement 元素id
 * @param func 搜索函数
 */
function onEnterSearchBy(IdElement,func){
    // var searchid =document.getElementById(IdElement);
    $(IdElement).keyup(function(event) {//给输入框绑定按键事件
        // console.log("进入回车处理函数"+event.keyCode+event.which);
        if (event.which === 13) {//判断如果按下的是回车键则执行下面的代码
             // console.log("搜索中"+typeof func);
             func();
        }
    });
}
/**
 * 删除
 *
 * @param id
 */
ProjectList.delete = function del(id) {

    warning("确定删除吗", "", function () {
        $.ajax({
            url: "/projectGroup/deletePro",
            type: "POST",
            data: {
                'projectId': id
            },
            dataType: "json",
            success: function (r) {
                success("成功删除");
                ProjectList.search();
            }
        })
    })


};
/**
 * 更新多项项目 项目组配置
 */
ProjectList.updateGroupMany=function() {
    var ids = ProjectList.table.getSelectedRowIds();
    var ProjectGroupDto = {};
    ProjectGroupDto.ids = ids;
    ProjectGroupDto.groupId=$("#groupid").val();
    $.ajax({
        url: "/projectGroup/updateGroupMany",
        type: 'POST',
        data: JSON.stringify(ProjectGroupDto),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                ProjectList.search();
                success("绑定成功！");
            }
        }

    })


}

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
 * @param companyId
 */
ProjectList.permissionModal = function () {
   var groupId = $("#groupid").val();
   $("#group").val(groupId);
    var menuTree = $("#menu_tree");
    menuTree.jstree("destroy");
    $.ajax({
        url: "/projectGroup/menu/permission?groupId=" + groupId,
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
 * 保存
 */
ProjectList.savePermissions = function () {
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
    var groupId = $("#groupid").val();
    $.ajax({
        url: "/projectGroup/menu/permission/save",
        type: 'POST',
        data: JSON.stringify({
            id: groupId,
            codes: codes
        }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#permissionModal").modal('hide');
                ProjectList.search();
                success("绑定成功！");
            }
        }
    });
};
/**
 * 更新单项项目 项目组配置
 */
ProjectList.updateGroupOne=function(id) {
    var ProjectGroup = {};
    ProjectGroup.id = id;
    ProjectGroup.groupId= $("#groupid").val();
    $.ajax({
        url: "/projectGroup/updateGroupOne",
        type: 'POST',
        data: JSON.stringify(ProjectGroup),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                ProjectList.search();
                success("绑定成功！");
            }
        }

    })


}

$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", ProjectList.initOptions());
    ProjectList.table = jqGrid.init();
    onEnterSearchBy("#name",ProjectList.search);
});