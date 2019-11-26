var WarningLog = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null
};


/**
 * jqGrid初始化参数
 */
WarningLog.initOptions = function () {

    var options = {
        url : "/warninglog/grid",
        rowNum: 20,
        postData: {
            type:$("#type").val(),
            outid:$("#outid").val(),
        },
        autowidth:true,
        sortname: "inittime",
        sortorder: "desc",
        colNames: [ 'id','类型', '相关ID', '创建时间', '预警名称', '信息', '颜色'],
        colModel: [
            {name: 'id',index:'id',hidden: true, sortable:false },
            {name: 'type', index: 'type', width: 50, sortable: false,formatter:function (cellValue) {
                    if (cellValue===1){
                        return "公司"
                    }
                    if (cellValue===2){
                        return "项目"
                    }
                    if (cellValue===3){
                        return "线路"
                    }
                }},
            {name: 'outname', index: 'outname', width: 50, sortable: false},
            {name: 'inittime', index: 'inittime', width: 70, sortable: true, formatter: function (cellValue) {
                    if (cellValue) {
                        return DateFormat.format(new Date(cellValue), "yyyy-MM-dd hh:mm:ss");
                    } else {
                        return "";
                    }

                }},
            {name: 'showname', index: 'showname', width: 70, sortable: true},
            {name: 'info', index: 'info', width: 130, sortable: false},
            {name: 'color', index: 'color', width: 40,cellattr:addCellAttr, sortable: false,formatter: function (cellValue) {
                    if (cellValue==="yellow") {
                        return "黄";
                    }
                    if (cellValue==="red") {
                        return "红";
                    }
                    if (cellValue==="orange") {
                        return "橙";
                    }
                }},
        ]
    };
    return options;
};

function addCellAttr(rowId, val, rawObject, cm, rdata) {
        return "style='background-color:"+rawObject.color+"'";
}
WarningLog.changeType=function(){
//改变企业  更新项目下拉框
    var type =$("#type").val();
    if(type==""){
        $("#outid").html('<option value="">不限</option>');
    }else{
        var html = '<option value="">不限</option>';
        $.ajax({
            url: "/warninglog/getwarns?type=" + type,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var result = r.obj;
                if(result.length>0){
                    for(var i=0;i<result.length;i++){
                        html+='<option value="'+result[i].id+'">'+result[i].name+'</option>';
                    }
                }
                $("#outid").html(html);
            }
        })
    }
}

/**
 * 根据关键词搜索
 */
WarningLog.search = function () {
    var searchParam = {};
    searchParam.type = $("#type").val();
    searchParam.outid = $("#outid").val();
    WarningLog.table.reload(searchParam);
};

/**
 * 重置搜索
 */
WarningLog.resetSearch = function () {
    $("#type").val("");
    $("#outid").val("")
    WarningLog.search();
};

$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", WarningLog.initOptions());
    WarningLog.table = jqGrid.init();
});