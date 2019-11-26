var Failquestion = {
    tableId: "#grid-table",
    pagerId: null,
    selectId: null, //grid选择的条目id
    table: null,
    domain: "failquestion_manager"
};


/**
 * jqGrid初始化参数
 */
Failquestion.initOptions = function () {
    var options = {
        url : "/failquestion/grid",
        autowidth:true,
        multiselect: true,
        height: 700,
        // shrinkToFit: true,
        //不分页
        rowNum: -1,
        colNames : ['编号','名称'],
        colModel: [
            {name:'id',index:'id', width:50, editable: false,sortable:false},
            {name:'name',index:'name', width:985, editable: false,sortable:false}
        ],
        jsonReader: {
            root: function (data) {
                return data.obj;
            },
            id: "id"
        },
        gridComplete: function () {
            refreshPermission(Failquestion.domain);
        }
    };
    return options;
};


/**
 * 新增弹框
 */
Failquestion.create = function () {
    $("input[name='type']").each(function () {
        $(this).attr("checked", false);
    });
    $("#createModal").modal();
};

/**
 * 根据关键词搜索
 */
Failquestion.search = function () {
    var searchParam = {};
    searchParam.name = $("#failQuestionName").val().trim();
    Failquestion.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Failquestion.resetSearch = function () {
    $("#failQuestionName").val("");
    Failquestion.search();
};


Failquestion.check = function () {
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
 * 保存标签
 */
Failquestion.insert = function () {
    var failquestion = getFormJson($("#create-form"));
    $.ajax({
        url: "/failquestion/insert",
        type: 'POST',
        data: JSON.stringify(failquestion),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                Failquestion.search();
                $("#create-form")[0].reset();
            }else if(r.code === 2) {
            }
        }
    })
};


Failquestion.edit = function () {
    if (this.check()) {
        $.ajax({
            url: "/failquestion/get?id=" + this.selectId,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    var failqeustion = r.obj;
                    var form = $("#edit-form");
                    $("#id").val(failqeustion.id);
                    form.find("input[name='name']").val(failqeustion.name);
                    $("#editModal").modal();
                }
            }
        })
    }
};


/**
 * 更新标签
 */
Failquestion.update = function () {
    var failquestion = getFormJson($("#edit-form"));
    $.ajax({
        url: "/failquestion/update",
        type: 'POST',
        data: JSON.stringify(failquestion),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                $("#edit-form")[0].reset();
                Failquestion.search();
                success("保存成功");
            }
        }
    })
};

/**
 * 删除标签
 *
 * @param id
 */
Failquestion.delete = function del() {
        if (this.check()) {
            var id = this.selectId;
            warning("确定删除吗", "", function () {
                $.get("/failquestion/delete?id=" + id, function () {
                    success("成功删除");
                    Failquestion.search();
                });
            })
        }
};

function changToValue(str) {
    //0单选框  1复选框  2 文本框 3 日期选择 4 二级联动下拉框
    if(str ==0 ){
        return "单选框";
    }
    if(str ==1 ){
        return "复选框";
    }
    if(str ==2 ){
        return "文本框";
    }
    if(str ==3 ){
        return "日期选择";
    }
    if(str ==4 ){
        return "二级联动下拉框";
    }
}


$(function() {
    var jqGrid = new JqGrid(Failquestion.tableId, Failquestion.pagerId, Failquestion.initOptions());
    Failquestion.table = jqGrid.init();
});