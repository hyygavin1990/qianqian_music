var BlackList = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "blackList"
};

/**
 * jqGrid初始化参数
 */
BlackList.initOptions = function () {
    var options = {
        url : "/blackList/grid",
        autowidth:true,
        colNames: ['id', '手机号', '类型','提交用户','用户类型','规则分类名','操作'],
        colModel: [
            {name: 'id', index: 'id', width: 90, sortable: false},
            {name: 'phone', index: 'phone', width: 90, sortable: false},
            {name: 'type', index: 'type', width: 90, sortable: false,hidden:true, formatter: function (cellValue, options, rowObject) {
                var type = rowObject["type"];
                if(type==0){
                    return "非常反感";
                }else if(type==1){
                    return "反感";
                }else if(type==2){
                    return "不配合";
                }else if(type==3){
                    return "已经拨打有意向";
                }
            }},
            {name: 'nickname', index: 'nickname', width: 90, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var nickname = rowObject["nickname"];
                    if(nickname){
                        return nickname;
                    }else {
                        return "已注销";
                    }
                }},
            {name: 'user_type', index: 'user_type', width: 90, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var userType = rowObject["user_type"];
                    if(userType==1){
                        return "坐席"
                    }else {
                        return "普通用户";
                    }
                }},
            {name: 'cName', index: 'cName', width: 90, sortable: false,hidden:true},
            // {name: 'rName', index: 'rName', width: 90, sortable: false},
            {name: 'operations', index: 'operations', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var str = "";
                str += '<input type="button" class="control-auth btn btn-sm btn-danger" data-auth="blackList_delete" value="删除" onclick="BlackList.delete(' + id + ')"/>';
                return str;
            }}
        ],
        gridComplete: function () {
            refreshPermission(BlackList.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
BlackList.search = function () {
    var searchParam = {};
    searchParam.phone = $("#phone").val().trim();
    // searchParam.type = $("#type").val();
    // searchParam.cid = $("#cid").val();
    BlackList.table.reload(searchParam);
};


/**
 * 新增弹框
 */
BlackList.create = function () {
    $("#createModal").modal();
};

/**
 * 保存用户
 */
BlackList.insert = function () {
    var phone = $("#create-form").find("input[name=phone]").val();
    if(phone){
        phone=phone.trim();
    }
    var b = /^[0-9a-zA-Z]*$/g;

    if(phone.length!=32||!b.test(phone)){
        info("请输入32位手机号！")
        return;
    }
    // var cid = $("#create-form").find("select[name=cid]").val();
    // var type = $("#create-form").find("select[name=type]").val();
    console.log(phone);
    $.ajax({
        url: "/blackList/insert",
        type: 'GET',
        data:{
            phone:phone
            // cid:cid,
            // type:type
        },
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                BlackList.search();
                $("#create-form")[0].reset();
            }
        }
    })
};


BlackList.delete = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/blackList/delete?id=" + id, function () {
            success("成功删除");
            BlackList.search();
        });
    })
};

/**
 * 重置搜索
 */
BlackList.resetSearch = function () {
    $("#phone").val("");
    // $("#type").val("");
    // $("#cid").val("");
    BlackList.search();
};


$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", BlackList.initOptions());
    BlackList.table = jqGrid.init();
});