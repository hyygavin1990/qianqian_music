var ProjectGroup = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "projectGroup"
};
var ladda;
/**
 * jqGrid初始化参数
 */
ProjectGroup.initOptions = function () {
    var options = {
        url : "/projectGroup/grid",
        autowidth:true,
        colNames: ['编号', '分组名称','操作'],
        colModel: [
            {name: 'id', index: 'id', width: 150, sorttype: "int",align:'center'},
            {name: 'name', index: 'name', width: 150,align:'center'},
            {name: 'operations', index: 'operations', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var str=" ";
                str+= '<input type="button" class=" btn btn-sm btn-info"  value="编辑" onclick="ProjectGroup.edit(' + id + ')"/>&nbsp;';
                str+= '<input type="button" class=" btn btn-sm btn-info"  value="查看项目绑定" onclick="ProjectGroup.getPro(' + id + ')"/>&nbsp;';
                str += '<input type="button" class=" btn btn-sm btn-danger"  value="删除" onclick="ProjectGroup.delete(' + id + ')"/>';
                return str;
            }}
        ],
        gridComplete: function () {
            refreshPermission(ProjectGroup.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
ProjectGroup.search = function () {
    var Param = {};
    Param.name = $("#groupName").val().trim();
    ProjectGroup.table.reload(Param);
};

/**
 * 重置搜索
 */
ProjectGroup.resetSearch = function () {
    $("#groupName").val("");
    ProjectGroup.search();
};

/**
 * 新增弹框
 */
ProjectGroup.create = function () {
    $("#createModal").modal();

};

/**
 * 保存
 */
ProjectGroup.insert = function () {

    var form = $("#create-form");
    var  projectGroup={};
    projectGroup.name =form.find("input[name='name']").val().trim();

    $.ajax({
        url: "/projectGroup/insert",
        type: 'POST',
        data: JSON.stringify(projectGroup),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                ProjectGroup.search();
                success("保存成功");
            }
        }
    })
};

/**
 * 编辑弹框
 * @param id
 */
ProjectGroup.edit = function (id) {

    $.ajax({
        url: "/projectGroup/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var ProjectGroup = r.obj;
                var form = $("#edit-form");
                form.find("input[name='name']").val(ProjectGroup.name);
                form.find("input[name='id']").val(ProjectGroup.id);
                $("#editModal").modal();
            }
        }
    })


};

/**
 * 更新分组
 */
ProjectGroup.update = function () {
    var form = $("#edit-form");
    var projectGroup ={};
    projectGroup.id =form.find("input[name='id']").val();
    projectGroup.name =form.find("input[name='name']").val().trim();
    $.ajax({
        url: "/projectGroup/update",
        type: 'POST',
        data: JSON.stringify(projectGroup),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                ProjectGroup.search();
                success("保存成功");
            }
        }
    })
};
/**
 *  回车触发搜索
 * @param IdElement 元素id
 * @param func 搜索函数
 */
function onEnterSearchBy(Element,func){
    // var searchid =document.getElementById(IdElement);
    $(Element).keyup(function(event) {//给输入框绑定按键事件
         // console.log("进入回车处理函数"+event.keyCode+event.which);
        if (event.which === 13) {//判断如果按下的是回车键则执行下面的代码
             // console.log("搜索中"+typeof func);
            func();
        }
    });
}
/**
 * 跳转绑定分组 项目
 * @param id
 */
ProjectGroup.getPro = function(id){
    window.location.href = "/projectGroup/projectList?groupId="+id;
}
/**
 * 删除
 *
 * @param id
 */
ProjectGroup.delete = function del(id) {

    warning("确定删除吗", "", function () {
        $.ajax({
            url: "/projectGroup/delete",
            type: "POST",
            data: {
                'id': id
            },
            dataType: "json",
            success: function (r) {
                success("成功删除");
                ProjectGroup.search();
            }
        })
    })


};

$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", ProjectGroup.initOptions());
    ProjectGroup.table = jqGrid.init();
    onEnterSearchBy("#groupName",ProjectGroup.search)
});