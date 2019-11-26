var CallerGroup = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "callerGroup"
};
var ladda;
/**
 * jqGrid初始化参数
 */
CallerGroup.initOptions = function () {
    var options = {
        url : "/callerGroup/grid",
        postData:{status:parseInt($("#status").val())},
        autowidth:true,
        colNames: ['编号', '线路名称',  '消息队列', '最大线路数','状态','绑定CTI','操作'],
        multiselect: false,
        colModel: [
            {name: 'id', index: 'id', width: 20, sorttype: "int",hidden:true},
            {name: 'name', index: 'name', width: 80},
            //{name: 'currentinuse', index: 'currentinuse', width: 100, sortable: false},
            {name: 'queue', index: 'queue', width: 60, sortable: false},
            {name: 'maxline', index: 'maxline', width: 40, sortable: false},
            {name: 'status', index: 'status', width: 40, sortable: false,hidden:true, formatter: function (cellValue) {
                    return cellValue === 0 ? "启用" : "停用";
                }},
            {name: 'ctiip', index: 'ctiip', width: 80, sortable: false},
            {name: 'operations', index: 'operations', width: 80, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var status = rowObject["status"];
                var str=" ";
                    if (status == 0) {
                        str += '<button  class=" btn btn-sm btn-warning ladda-button" data-style="zoom-out" data-auth="group_logout"   onclick="CallerGroup.logout(' + id + ',this)">停用</button>&nbsp;';
                    } else {
                        str += '<button class=" btn btn-sm btn-warning ladda-button" data-style="zoom-out" style="background-color:#9370DB"  data-auth="group_login"  onclick="CallerGroup.login(' + id + ',this)">启用</button>&nbsp;';
                    }
                str+= '<input type="button" class=" btn btn-sm btn-info"  value="编辑" onclick="CallerGroup.edit(' + id + ')"/>&nbsp;';
                // str += '<input type="button" class=" btn btn-sm btn-danger"  value="删除" onclick="CallerGroup.delete(' + id + ')"/>';
                str+= '<input type="button" class=" btn btn-sm btn-info"  value="查看已绑Cti " onclick="CallerGroup.getCti(' + id + ')"/>&nbsp;';
                str+= '<input type="button" class=" btn btn-sm btn-info"  value="绑定Cti" onclick="CallerGroup.bindCti(' + id + ')"/>&nbsp;';
                return str;
            }}
        ],

    };
    return options;
};

/**
 * 根据关键词搜索
 */
CallerGroup.search = function () {
    var searchParam = {};
    //searchParam.callerConfigname = $("#callerConfigname").val();
    searchParam.name = $("#name").val().trim();
    searchParam.ctiip = $("#ctiip").val();
    searchParam.status = parseInt($("#status").val());
    CallerGroup.table.reload(searchParam);
};

/**
 * 重置搜索
 */
CallerGroup.resetSearch = function () {
    //$("#callerConfigname").val("");
    $("#name").val("");
    $("#ctiip").val("");
    $("#status").val("0");
    CallerGroup.search();
};

/**
 * 新增弹框
 */
CallerGroup.create = function () {

    $("#createModal").modal();


};

/**
 * 保存用户
 */
CallerGroup.insert = function () {
    var callerGroup = getFormJson($("#create-form"));

    $.ajax({
        url: "/callerGroup/insert",
        type: 'POST',
        data: JSON.stringify(callerGroup),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                CallerGroup.search();
                $("#create-form")[0].reset();
            }
        }
    })
};

/**
 * 编辑弹框
 * @param id    callerConfigId
 */
CallerGroup.edit = function (id) {

    $.ajax({
        url: "/callerGroup/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var callerGroup = r.obj;
                var form = $("#edit-form");
                form.find("input[name='name']").val(callerGroup.name);
                form.find("input[name='queue']").val(callerGroup.queue);
                form.find("input[name='maxline']").val(callerGroup.maxline);
                form.find("input[name='id']").val(callerGroup.id);
                $("#editModal").modal();
            }
        }
    })


};

/**
 * 更新用户
 */
CallerGroup.update = function () {
    var callerGroup = getFormJson($("#edit-form"));
    $.ajax({
        url: "/callerGroup/update",
        type: 'POST',
        data: JSON.stringify(callerGroup),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                CallerGroup.search();
                success("保存成功");
            }else{
                success(r.msg);
            }
        }
    })
};
/**
 * 跳转已经绑定CTI页面
 * @param id
 */
CallerGroup.getCti = function(id){
    window.location.href = "/callerGroup/jumpBinded?groupId="+id;

}
/**
 * 删除用户
 *
 * @param id    callerConfigId
 */
CallerGroup.delete = function del(id) {

    warning("确定删除吗", "", function () {
        //var ids = CallerGroup.table.getSelectedRowIds();
        $.ajax({
            url: "/callerGroup/delete",
            type: "POST",
            data: {
                'id': id
            },
            dataType: "json",
            success: function (r) {
                success("成功删除");
                CallerGroup.search();
            }
        })
    })


};
/**
 * 下线
 */
CallerGroup.logout = function (id,btn){
    var l = $(btn).ladda();
    l.ladda('start');
    $.ajax({
        url: "/callerGroup/logout?id=" + id+"&status=0",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                setTimeout(function () {
                    l.ladda('stop');
                    CallerGroup.search();
                }, 1000)
            } else {
                l.ladda('stop');
            }
        }
    })
};

/**
 * s
 */
CallerGroup.login = function (id,btn) {
    var l = $(btn).ladda();
    l.ladda('start');
    $.ajax({
        url: "/callerGroup/logout?id=" + id+"&status=1",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                setTimeout(function () {
                    l.ladda('stop');
                    CallerGroup.search();
                }, 1000)
            }else{
                l.ladda('stop');
            }
        }
    })
};
CallerGroup.bindCti = function(id){
    window.location.href="/callerGroup/ctilist?groupId="+id;
}
$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", CallerGroup.initOptions());
    CallerGroup.table = jqGrid.init();
});