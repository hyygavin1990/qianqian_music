var Relation = {
    tableId: "#grid-table",
    pagerId: null,
    selectId: null, //grid选择的条目id
    table: null,
    domain: "label_group"
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
        url : "/label_group/relation/grid",
        postData: {
            labelGroupId: $("#labelGroupId").val(),
            batch:$("#batchType").val(),
            batchType : currentBatch()
        },
        autowidth:true,
        multiselect: true,
        height: 700,
        rowNum: -1,
        colNames : ['编号', '标签名称', '标签英文名', '填写形式', '填写内容', '排序', 'labelGroupId', '标签类别', '前台显示状态'],
        colModel : [
            {name:'id',index:'id', width:5, editable: true,sortable:false},
            {name:'name',index:'name', width:20, editable: true,sortable:false},
            {name:'english_name',index:'english_name', width:20, editable: true,sortable:false},
            {name:'type',index:'type', width:20, editable: true,sortable:false, formatter: function (cellValue, options, rowObject) {
                var types = cellValue.split(",");
                var str = "";
                for (var i = 0; i < types.length; i++) {
                    if (i < types.length - 1) {
                        str += typeArr[types[i]] + ",";
                    } else {
                        str += typeArr[types[i]];
                    }
                }
                return str;
            }},
            {name:'content',index:'content', width:20, editable: true,sortable:false},
            {name:'sequence',index:'sequence', width:20, editable: true,sortable:false,  formatter: function (cellValue, options, rowObject) {
                var inputId = "sequence" + rowObject['id'];
                var sequence;
                if (cellValue === undefined) {
                    sequence = "";
                } else {
                    sequence = cellValue;
                }
                var $new = $($sequenceInput).clone();
                $($new).attr("id", inputId);
                $($new).attr('value', sequence);
                return $new.prop("outerHTML");
            }},
            {name:'group_id',index:'group_id', width:20, hidden:true},
            {name:'labelTypeId',index:'labelTypeId', width:20, editable: true,sortable:false,  formatter: function (cellValue, options, rowObject) {
                var selectId = "labelType" + rowObject['id'];
                var $new = $($labelTypeSelect).clone();
                $($new).attr("id", selectId);
                $($new).find("option[value="+cellValue+"]").attr("selected",true);
                return $($new).prop("outerHTML");
            }},
            {name:'isShow',index:'isShow', width:20, editable: true,sortable:false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject['id'];
                var name = 'isShow' + id;
                var $new1 = $($radio1).clone();
                var $new2 = $($radio2).clone();
                var $newRadio1 = $($new1).children("input").get(0);
                var $newRadio2 = $($new2).children("input").get(0);
                $($newRadio1).attr('name', name);
                $($newRadio2).attr('name', name);
                if (cellValue === 1) {
                    $($newRadio1).attr('checked', 'checked');
                    $($newRadio2).removeAttr('checked');
                } else if (cellValue === 0){
                    $($newRadio1).removeAttr('checked');
                    $($newRadio2).attr('checked', 'checked');
                } else {
                    $($newRadio1).removeAttr('checked');
                    $($newRadio2).removeAttr('checked');
                }
                return $($new1).prop("outerHTML") + $($new2).prop("outerHTML");
            }}
        ],
        jsonReader: {
            root: function (data) {
                return data.obj;
            },
            id: "id"
        },
        gridComplete : function() {
            //grid完成时设置当前项目的标签为选中状态
            var labelGroupId = $("#labelGroupId").val();
            var $grid = $("#grid-table");
            var rows =  $($grid).jqGrid('getRowData');
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (row.group_id) {
                    if (row.group_id == labelGroupId) {
                        $($grid).jqGrid('setSelection', row.id);
                    }
                }
            }
        },
        beforeSelectRow: function () {
            //如果是在用版本不允许选择行
            return currentBatch() == 1;
        },
        onSelectRow: function (rowId, status) {
            var name = 'isShow' + rowId;
            //如果是选中
            if (!status) {
                $("input[name='" + name + "']").prop("checked", false);
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
    searchParam.labelGroupId = $("#labelGroupId").val();
    searchParam.batch = $("#batchType").val();
    searchParam.batchType = currentBatch();
    Relation.table.reload(searchParam);
};



function currentBatch() {
    return $("#batchType").find("option:selected").attr("data-batch");
}

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

//控制元素显示与否
function controlDisplay() {
    $(".control-display").each(function(){
        $(this).is(":hidden") ? $(this).show() : $(this).hide();
    });
}

function controlDisabled() {
    //如果是在用版本
    if (currentBatch() == 2) {
        $(".control-disabled").attr("disabled","disabled");
    } else {
        $(".control-disabled").removeAttr("disabled");
    }
}


$(function() {
    var jqGrid = new JqGrid("#grid-table", null, Relation.initOptions());
    Relation.table = jqGrid.init();

    $("#batchType").on("change", function () {
        //重新加载当前版本数据
        Relation.resetSearch();
        //控制元素隐藏与显示
        controlDisplay();
        //控制元素disabled
        controlDisabled();

    });

    //覆盖当前版本
    $("#cover").on("click", function () {
        $("#save").click();
    });

    $("#preview").on("click", function () {
        window.open("/label_group/relation/preview?groupId=" + $("#labelGroupId").val() + "&batchType=" + currentBatch() + "&batch=" + $("#batchType").val());
    });

    $("#save").on("click", function () {
        var labelRelationMap = {};
        var ids = $("#grid-table").jqGrid('getGridParam','selarrrow');
        var showStatusArr = [];
        var sequenceArr = [];
        var labelTypeArr = [];
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            var name = 'isShow' + id;
            showStatusArr.push($("input[name='" + name + "']:checked").val());
            sequenceArr.push($("#sequence" + id).val());
            labelTypeArr.push($("#labelType" + id).val());
        }
        labelRelationMap.labelGroupId = $("#labelGroupId").val();
        labelRelationMap.selectedLabelIds = ids;
        labelRelationMap.showStatusArr = showStatusArr;
        labelRelationMap.sequenceArr = sequenceArr;
        labelRelationMap.labelTypeArr = labelTypeArr;
        console.log(labelRelationMap);
        warning("确定保存吗？", "", function () {
            $.ajax({
                url: '/label_group/relation/save',
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