var WhiteList = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "whiteList"
};

/**
 * jqGrid初始化参数
 */
WhiteList.initOptions = function () {
    var options = {
        url : "/whiteList/grid",
        autowidth:true,
        colNames: ['id', '手机号', '操作'],
        colModel: [
            {name: 'id', index: 'id', width: 90, sortable: false},
            {name: 'phone', index: 'phone', width: 90, sortable: false},
            {name: 'operations', index: 'operations', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var str = "";
                str += '<input type="button" class="control-auth btn btn-sm btn-danger" data-auth="whiteList_delete" value="删除" onclick="WhiteList.delete(' + id + ')"/>';
                return str;
            }}
        ],
        gridComplete: function () {
            refreshPermission(WhiteList.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
WhiteList.search = function () {
    var searchParam = {};
    searchParam.phone = $("#phone").val().trim();
    WhiteList.table.reload(searchParam);
};


/**
 * 新增弹框
 */
WhiteList.create = function () {
    $("#createModal").modal();
};

/**
 * 保存用户
 */
WhiteList.insert = function () {
    var phone = $("#create-form").find("input[name=phone]").val().trim();
    console.log(phone)
    $.ajax({
        url: "/whiteList/insert?phone="+phone,
        type: 'GET',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                WhiteList.search();
                $("#create-form")[0].reset();
            }
        }
    })
};


WhiteList.delete = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/whiteList/delete?id=" + id, function () {
            success("成功删除");
            WhiteList.search();
        });
    })
};

/**
 * 重置搜索
 */
WhiteList.resetSearch = function () {
    $("#phone").val("");
    WhiteList.search();
};


$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", WhiteList.initOptions());
    WhiteList.table = jqGrid.init();
});