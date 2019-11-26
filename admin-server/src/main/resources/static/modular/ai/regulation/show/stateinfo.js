var Stateinfo = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    selectId: null, //grid选择的条目id
    table: null,
    isInit:false
};


/**
 * jqGrid初始化参数
 */
Stateinfo.initOptions = {
    url: "/stateinfo/grid",
    rowNum:10,
    colNames: ['名称', '话术', '评分'],
    colModel: [
        {name: 'name', index: 'name', width: 20, editable: false, sortable: false,align:"center"},
        {name: 'value', index: 'value', width: 200, editable: false, sortable: false,align:"center"},
        {name: 'score', index: 'score', width: 20, editable: true, sortable: false,align:"center"}
    ],
    gridComplete: function () {
        $(Stateinfo.tableId).setGridWidth(document.body.clientWidth*0.7);
        var obj=$(Stateinfo.tableId).jqGrid("getRowData");
        $("#create-state-form").find("input[name=name]").val(obj.length+1);

    }
};
Stateinfo.search = function () {
    var searchParam = {};
    Stateinfo.table.reload(searchParam);
};
Stateinfo.init = function (rid) {
    if(Stateinfo.isInit){
        Stateinfo.search();
    }else{
        Stateinfo.initOptions.url += "?rid="+rid;
        var jqGrid = new JqGrid(Stateinfo.tableId, Stateinfo.pagerId, Stateinfo.initOptions);
        Stateinfo.table = jqGrid.init();
        Stateinfo.isInit = true;
    }

};
