var Eventinfo = {
    tableId: "#grid-table-1",
    pagerId: "#grid-pager-1",
    selectId: null, //grid选择的条目id
    table: null,
    isInit:false
};


/**
 * jqGrid初始化参数
 */
Eventinfo.initOptions = {
    url: "/eventinfo/grid",
    rowNum:10,
    shrinkToFit: true,
    colNames: ['from状态', 'to状态','情感类型','是否主线','标记'],
    colModel: [
        {name: 'from', index: 'from', width: 20, editable: false, sortable: false,align:"center"},
        {name: 'to', index: 'to', width: 20, editable: false, sortable: false,align:"center"},
        {name: 'sname', index: 'sname', width: 20, editable: true, sortable: false,align:"center"},
        {name: 'isMainDiv', index: 'isMainDiv', width: 20, editable: true, sortable: false,align:"center",formatter: function (cellvar, options, rowObject) {
            var isMain = rowObject['isMain'];
            isMain = isMain?isMain:0;
            return isMain==1?"是":"否";
        }},
        {name: 'marks', index: 'marks', width: 50, editable: true, sortable: false,align:"center"}

    ],
    gridComplete: function () {
        $(Eventinfo.tableId).setGridWidth(document.body.clientWidth*0.8);
    }
};

Eventinfo.init = function (rid) {
    if(Eventinfo.isInit){
        Eventinfo.table.reload({});
    }else{
        Eventinfo.initOptions.url += "?rid="+rid;
        var jqGrid = new JqGrid(Eventinfo.tableId,Eventinfo.pagerId, Eventinfo.initOptions);
        Eventinfo.table = jqGrid.init();
        Eventinfo.isInit = true;
        document.getElementById('statetree').src="/stateinfo/singletree?rid="+Wizard.rid;
    }

};
