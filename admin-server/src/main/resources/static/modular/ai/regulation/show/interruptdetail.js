var InterruptDetail = {
    tableId: "#grid-table-2",
    pagerId: "#grid-pager-2",
    selectId: null, //grid选择的条目id
    table: null,
    isInit:false
};
/**
 * jqGrid初始化参数
 */
InterruptDetail.initOptions = {
    url: "/interruptdetail/grid",
    rowNum:20,
    shrinkToFit: true,
    colNames: ['名称','适用状态','话术','情感类型','sid','转接类型','操作'],
    colModel: [
        {name: 'name', index: 'name', width: 20, editable: false, sortable: false,align:"center"},
        {name: 'status', index: 'status', width: 20, editable: false, sortable: false,align:"center"},
        {name: 'content', index: 'content', width: 200, editable: false, sortable: false,align:"center"},
        {name: 'sentibox', index: 'sentibox', width: 60, editable: false, sortable: false,formatter: function (cellvar, options, rowObject) {

            if(rowObject['sname']&&rowObject['sdesc']){
                return rowObject['sname']+":"+rowObject['sdesc'];
            }else{
                return "万能话术";
            }

        }},
        {name: 'sid', index: 'sid', width: 20, hidden:true},
        {name: 'zjdis', index: 'zjdis', width: 20, editable: true, sortable: false,align:"center",formatter: function (cellvar, options, rowObject) {
            return rowObject['zjtype']==0?"不转接":"转接";
        }},
        {name: 'opt', index: 'opt', width: 20, editable: true, sortable: false,align:"center",formatter: function (cellvar, options, rowObject) {
            var id = rowObject['id'];
            var zjtype = rowObject['zjtype'];
            return '<input type="button" class="btn btn-sm btn-info" value="切换" onclick="InterruptDetail.switch(' + id+','+zjtype+ ')"/>';
        }}
    ],
    gridComplete: function () {
        $(InterruptDetail.tableId).setGridWidth(document.body.clientWidth*0.7);
        var obj=$(InterruptDetail.tableId).jqGrid("getRowData");
        $("#create-inde-form").find("input[name=name]").val(obj.length+1);
    }
};

/**
 * 根据关键词搜索
 */
InterruptDetail.search = function () {
    var searchParam = {};
    InterruptDetail.table.reload(searchParam);
};

InterruptDetail.switch = function (id,zjtype) {
    zjtype = zjtype==0?1:0;
    $.ajax({
        url: "/interruptdetail/update_zj",
        type: 'POST',
        data: {id:id,zjtype:zjtype},
        dataType: "json",
        success: function (r) {
            if (r.obj === 0) {
                InterruptDetail.search();
                success("切换成功");
            }else if(r.obj===1){
                info("状态或者话术不能为空");
            }else if(r.obj === 2) {
                info("选中“所有”时，不能再选其他的状态");
            }
        }
    })
};

InterruptDetail.init = function (rid) {
    if(InterruptDetail.isInit){
        InterruptDetail.search();
    }else{
        InterruptDetail.initOptions.url += "?rid="+rid;
        var jqGrid = new JqGrid(InterruptDetail.tableId, InterruptDetail.pagerId, InterruptDetail.initOptions);
        InterruptDetail.table = jqGrid.init();
        InterruptDetail.isInit = true;
    }

};
