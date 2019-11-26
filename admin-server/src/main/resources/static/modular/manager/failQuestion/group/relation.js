var Relation = {
    tableId: "#grid-table",
    pagerId: null,
    selectId: null, //grid选择的条目id
    table: null,
    domain: "questionGroup"
};

//标签的填写形式
var typeArr = ['单选', '复选', '文本', '日期','联动下拉框'];


//排序input
var $sequenceInput = $("#sequenceInput");

//标签类别多选框
var $labelTypeSelect = $("#labelTypeSelect");

//
var $radio1 = $("#radio1");
var $radio2 = $("#radio2");

/**
 * jqGrid初始化参数
 */
Relation.initOptions = function () {
    var options = {
        url : "/failquestionGroup/relation/grid",
        postData: {
            groupId: $("#groupId").val()
        },
        autowidth:true,
        multiselect: true,
        height: 700,
        rowNum: -1,
        colNames : ['编号', '问题名称','组'],
        colModel : [
            {name:'id',index:'id', width:5, editable: true,sortable:false,align: "center"},
            {name:'name',index:'name', width:20, editable: true,sortable:false,align: "center"},
            {name:'groupId',index:'groupId', width:20, hidden:true}
        ],
        jsonReader: {
            root: function (data) {
                return data.obj;
            },
            id: "id"
        },
        gridComplete : function() {
            refreshPermission(Relation.domain);
            //grid完成时设置当前项目的标签为选中状态
            var groupId = $("#groupId").val();
            var $grid = $("#grid-table");
            var rows =  $($grid).jqGrid('getRowData');
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (row.groupId) {
                    if (row.groupId == groupId) {
                        $($grid).jqGrid('setSelection', row.id);
                    }
                }
            }
        }
    };
    return options;
};


/**
 * 新增弹框
 */
Relation.create = function () {

};

/**
 * 根据关键词搜索
 */
Relation.search = function () {
    var searchParam = {};
    searchParam.groupId = $("#groupId").val();
    Relation.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Relation.resetSearch = function () {
    Relation.search();
};


Relation.check = function () {
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

Relation.copy = function () {
    $("#editModal").modal();
};

$(function() {
    var jqGrid = new JqGrid("#grid-table", null, Relation.initOptions());
    Relation.table = jqGrid.init();

    //覆盖
    $("#copy").on("click", function () {
        var labelRelationMap = {};
        labelRelationMap.groupId = $("#groupId").val();
        if(!$("#otherId").val()){
            warning("未选择项目")
            return;
        }
        labelRelationMap.otherId = $("#otherId").val();

        console.log(labelRelationMap);
        warning("确定复制吗？", "", function () {
            $.ajax({
                url: '/failquestionGroup/relation/copy',
                type: 'POST',
                data: JSON.stringify(labelRelationMap),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (r) {
                    if (r.code === 0) {
                        success("复制成功");
                        $("#editModal").modal("hide");
                        Relation.resetSearch();
                    } else {
                        toastr.warning("复制失败");
                    }
                }
            })
        })
    });

    $("#save").on("click", function () {
        var labelRelationMap = {};
        var ids = $("#grid-table").jqGrid('getGridParam','selarrrow');
        labelRelationMap.groupId = $("#groupId").val();
        labelRelationMap.selectedIds = ids;
        console.log(labelRelationMap);
        warning("确定保存吗？", "", function () {
            $.ajax({
                url: '/failquestionGroup/relation/save',
                type: 'POST',
                data: JSON.stringify(labelRelationMap),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (r) {
                    if (r.code === 0) {
                        success("保存成功");
                        Relation.resetSearch();
                    } else {
                        toastr.warning("保存失败");
                    }
                }
            })
        })
    });

});