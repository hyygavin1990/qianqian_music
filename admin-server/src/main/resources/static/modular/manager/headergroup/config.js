var Config = {
    tableId: "#grid-table",
    pagerId: null,
    selectId: null, //grid选择的条目id
    table: null,
    domain: "headergroup_config"
};



//排序input
var $seqInput = $("#seqInput");





/**
 * jqGrid初始化参数
 */
Config.initOptions = function () {
    var options = {
        url : "/headergroup/config/grid",
        postData: {
            groupid: $("#headerGroupId").val(),
        },
        autowidth:true,
        multiselect: true,
        height: 700,
        rowNum: -1,
        colNames : ['编号', '表头名称', '表头英文名','groupid'],
        colModel : [
            {name:'id',index:'id', width:5, editable: true,sortable:false},
            {name:'name',index:'name', width:20, editable: true,sortable:false},
            {name:'en_name',index:'en_name', width:20, editable: true,sortable:false},
            // {name:'seq',index:'seq', width:20, editable: true,sortable:false,  formatter: function (cellValue, options, rowObject) {
            //     var inputId = "seq" + rowObject['id'];
            //     var seq;
            //     if (cellValue === undefined) {
            //         seq = "";
            //     } else {
            //         seq = cellValue;
            //     }
            //     var $new = $($seqInput).clone();
            //     $($new).attr("id", inputId);
            //     $($new).attr('value', seq);
            //     return $new.prop("outerHTML");
            // }},
            {name:'groupid',index:'groupid', width:20, hidden:true},
        ],
        jsonReader: {
            root: function (data) {
                return data.obj;
            },
            id: "id"
        },
        gridComplete : function() {
            //grid完成时设置当前项目的标签为选中状态
            var headerGroupId = $("#headerGroupId").val();
            var $grid = $("#grid-table");
            var rows =  $($grid).jqGrid('getRowData');
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (row.groupid) {
                    if (row.groupid == headerGroupId) {
                        $($grid).jqGrid('setSelection', row.id);
                    }
                }
            }
        },
    };
    return options;
};


/**
 * 新增弹框
 */
Config.create = function () {
   
};

/**
 * 根据关键词搜索
 */
Config.search = function () {
    var searchParam = {};
    searchParam.headerGroupId = $("#headerGroupId").val();
    Config.table.reload(searchParam);
};



/**
 * 重置搜索
 */
Config.resetSearch = function () {
    Config.search();
};


Config.check = function () {
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



$(function() {
    var jqGrid = new JqGrid("#grid-table", null, Config.initOptions());
    Config.table = jqGrid.init();

    $("#save").on("click", function () {
        if(!Config.check()){
           return;
        }
        var configMap = {};
        var ids = $("#grid-table").jqGrid('getGridParam','selarrrow');
        // var seqArr = [];
        // for (var i = 0; i < ids.length; i++) {
        //     var id = ids[i];
        //     var reg=/^[0-9]*$/;
        //     var seq=$("#seq" + id).val();
        //     if(!reg.test(seq)){
        //         toastr.error("正确填写排序", "error");
        //         return;
        //     }
        //     seqArr.push(seq);
        // }
        var hasPhone=false;
        for(var i=0;i<ids.length;i++){
            var data= $("#grid-table").jqGrid('getRowData',ids[i]);
            if(data.name=="手机号"){
                hasPhone=true;
            }
        }
        if(!hasPhone){
            toastr.warning("手机号未选！");
            return;
        }
        configMap.id = $("#headerGroupId").val();
        configMap.headerids = ids;
        // configMap.seqs = seqArr;
        console.log(configMap);
        warning("确定保存吗？", "", function () {
            $.ajax({
                url: '/headergroup/config/save',
                type: 'POST',
                data: JSON.stringify(configMap),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (r) {
                    if (r.code === 0) {
                        success("保存成功");
                        Config.resetSearch();
                    } else {
                        toastr.warning("保存失败");
                    }
                }
            })
        })
    });

});