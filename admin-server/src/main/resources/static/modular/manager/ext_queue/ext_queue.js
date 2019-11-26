var ExtQueue = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    selectId: null, //grid选择的条目id
    table: null
};

var createDualSelector;
var editDualSelector;

/**
 * jqGrid初始化参数
 */

ExtQueue.initOptions = function () {
    var options = {
        url : "/ext_queue/grid",
        postData:{
            companyId : $("#companyId").val()
        },
        autowidth:true,
        multiselect: true,
        colNames: ['企业','编号', '队列名称', '创建时间', '分机'],
        colModel: [
            {name: 'companyName', index: 'companyName', width: 60, sortable: false},
            {name: 'id', index: 'id', width: 60, sorttype: "int"},
            {name: 'name', index: 'name', width: 90},
            {name: 'create_date', index: 'createDate', width: 100, sortable: false, formatter: function (cellValue, options, rowObject) {
                return DateFormat.format(new Date(cellValue), "yyyy-MM-dd hh:mm:ss");
            }},
            {name: 'exts', index: 'exts', width: 100, sortable: false}
        ]
    };
    return options;
};

/**
 * 根据关键词搜索
 */
ExtQueue.search = function () {
    var searchParam = {};
    searchParam.name = $("#name").val().trim();
    searchParam.companyId = $("#companyName").val();
    ExtQueue.table.reload(searchParam);
};

/**
 * 重置搜索
 */
ExtQueue.resetSearch = function () {
    $("#name").val("");
    $("#companyName").val("");
    ExtQueue.search();
};


ExtQueue.check = function () {
    var ids = this.table.getSelectedRowIds();
    if (ids === undefined || ids.length === 0) {
        toastr.warning("必须先选择记录再操作");
        // info("必须先选择记录再操作");
        return false;
    } else {
        this.selectId = ids[0];
        return true;
    }
};

/**
 * 新增弹框
 */
ExtQueue.create = function () {
    $.get("/ext_queue/unboundExt", function (r) {
        if (r.code === 0) {
            var exts = r.obj;
            var str = "";
            for (var i = 0; i < exts.length; i++) {
                var ext = exts[i];
                str += '<option value="' + ext.id + '">' + ext.extid + '</option>';
            }
            $("#create-form").find(".dual_select").html(str);
            createDualSelector.bootstrapDualListbox('refresh');
            $("#createModal").modal();
        }
    });

};

/**
 * 保存队列
 */
ExtQueue.insert = function () {
    var createForm = $("#create-form");
    var extQueue = getFormJson(createForm);
    if (extQueue.selectExtIds && !Array.isArray(extQueue.selectExtIds)) {
        extQueue.selectExtIds = new Array(extQueue.selectExtIds);
    }
    $.ajax({
        url: "/ext_queue/insert",
        type: 'POST',
        data: JSON.stringify(extQueue),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                ExtQueue.search();
                $("#create-form")[0].reset();
            }else if(r.code == 1){
                success(r.message);
            }
        }
    })
};

/**
 * 编辑弹框
 * @param id    extQueueId
 */
ExtQueue.edit = function () {
    if (this.check()) {
        $.ajax({
            url: "/ext_queue/get?id=" + this.selectId,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    var extQueue = r.obj.extQueue;
                    var boundExtList = r.obj.boundExtList;
                    var unBoundExtList = r.obj.unBoundExtList;
                    var form = $("#edit-form");
                    form.find("input[name='name']").val(extQueue.name);
                    form.find("input[name='id']").val(extQueue.id);
                    var str = '';
                    for (var i = 0; i < boundExtList.length; i++) {
                        var boundExt = boundExtList[i];
                        str += '<option selected value="' + boundExt.id + '">' + boundExt.extid + '</option>';
                    }
                    for (var j = 0; j < unBoundExtList.length; j++) {
                        var unBoundExt = unBoundExtList[j];
                        str += '<option value="' + unBoundExt.id + '">' + unBoundExt.extid + ' </option>';
                    }
                    $(form).find(".dual_select").html(str);
                    editDualSelector.bootstrapDualListbox('refresh');
                    $("#editModal").modal();
                }
            }
        })
    }
};

/**
 * 更新队列
 */
ExtQueue.update = function () {
    var extQueue = getFormJson($("#edit-form"));
    if (extQueue.selectExtIds && !Array.isArray(extQueue.selectExtIds)) {
        extQueue.selectExtIds = new Array(extQueue.selectExtIds);
    }
    $.ajax({
        url: "/ext_queue/update",
        type: 'POST',
        data: JSON.stringify(extQueue),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                ExtQueue.search();
                success("保存成功");
            }else if(r.code == 1){
                success(r.message);
            }
        }
    })
};

/**
 * 删除队列
 *
 * @param id    extQueueId
 */
ExtQueue.delete = function del() {
    if (this.check()) {
        var id = this.selectId;
        warning("确定删除吗", "", function () {
            $.get("/ext_queue/delete?id=" + id, function () {
                success("成功删除");
                ExtQueue.search();
            });
        })
    }
};

var dualOptions = {
    selectorMinimalHeight: 160,
    selectedListLabel: "已选：",
    nonSelectedListLabel: "未选：",
    // showFilterInputs: false,
    infoText: false,
};

$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", ExtQueue.initOptions());
    ExtQueue.table = jqGrid.init();
    //初始化左右选择器
    createDualSelector = $("#create-form").find(".dual_select").bootstrapDualListbox(dualOptions);
    editDualSelector = $("#edit-form").find(".dual_select").bootstrapDualListbox(dualOptions);
    $("#companyName").val($("#companyId").val());
});