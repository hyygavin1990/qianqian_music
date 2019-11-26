var CorpusNoChoose = {
    tableId: "#grid-table-cnc",
    pagerId: "#grid-pager-cnc",
    selectId: null, //grid选择的条目id
    table: null,
    sid:null,
    isInit:false
};

/**
 * jqGrid初始化参数
 */
CorpusNoChoose.initOptions = {
    url: "/model/corpus/getAllNoChoose",
    rowNum:30,
    multiselect:true,
    shrinkToFit:true,
    colNames: [ '内容','情感','聚类', '操作'],
    colModel: [
        {name: 'sentence', index: 'sentence', width: 20, editable: true, sortable: false,align:"center"},
        {name: 'sname', index: 'sname', width: 20, editable: true, sortable: false,align:"center"},
        {name: 'cluster', index: 'cluster', width: 20, editable: true, sortable: false,align:"center",
            formatter: function (cellvar, options, rowObject) {
                var cluster_id = rowObject['cluster_id'];
                return Sentiment.cmap[cluster_id];
            }},
        {
            name: 'opt',
            index: 'opt',
            width: 20,
            editable: false,
            sortable: false,
            formatter: function (cellvar, options, rowObject) {
                var id = rowObject['id'];
                var rid = rowObject['rid'];
                return '<input type="button" class="btn btn-xs btn-info" value="选择" onclick="CorpusNoChoose.batchChooseCorpus(' + id + ')"/>&nbsp;';
            }
        }
    ],
    gridComplete: function () {
        setTimeout(function () {
            var width = $("#chooseCorpusModel").find(".modal-body").width();
            $(CorpusNoChoose.tableId).setGridWidth(width*0.45);
        },150);
    }
};

CorpusNoChoose.init = function (sid,xid,type) {
    CorpusNoChoose.sid = sid;
    if(CorpusNoChoose.isInit){
        CorpusNoChoose.search();
    }else{
        CorpusNoChoose.initOptions.postData = {sid:sid,xid:xid,type:type};
        var jqGrid = new JqGrid(CorpusNoChoose.tableId,CorpusNoChoose.pagerId, CorpusNoChoose.initOptions);
        CorpusNoChoose.table = jqGrid.init();
        CorpusNoChoose.isInit = true;
    }
};

CorpusNoChoose.batchChooseCorpus = function (id) {
    var xid= $("#chooseCorpusModel").find("input[name=xid]").val();
    var type= $("#chooseCorpusModel").find("input[name=type]").val();
    var ids = [] ;
    if(id){
        ids.push(id);
    }else{
        ids=$(CorpusNoChoose.tableId).jqGrid('getGridParam','selarrrow');
        if(ids.length==0){
            info("请选择要恢复的语料");
            return;
        }
    }
    var corpusIdStr = ids.join(",");
    $.ajax({
        url:'/model/corpus/choose',
        type:'POST',
        data:{xid:xid,type:type,corpusIds:corpusIdStr,sid:CorpusNoChoose.sid},
        success:function (data) {
            CorpusNoChoose.search();
            CorpusChoose.search();
            Sentiment.search();
        }
    })
};

CorpusNoChoose.search = function () {
    var searchParam = {};
    searchParam.sid= $("#noChooseSearchDiv").find("select[name=sentiment]").val();
    searchParam.xid= $("#noChooseSearchDiv").find("input[name=xid]").val();
    searchParam.type= $("#noChooseSearchDiv").find("input[name=type]").val();
    searchParam.text= $("#noChooseSearchDiv").find("input[name=text]").val();
    searchParam.textopt= $("#noChooseSearchDiv").find("select[name=textopt]").val();
    searchParam.clusterid= $("#noChooseSearchDiv").find("select[name=clusterid]").val();
    CorpusNoChoose.table.reload(searchParam);
};


var CorpusChoose = {
    tableId: "#grid-table-cc",
    pagerId: "#grid-pager-cc",
    selectId: null, //grid选择的条目id
    table: null,
    isInit:false
};

/**
 * jqGrid初始化参数
 */
CorpusChoose.initOptions = {
    url: "/model/corpus/getAllChoose",
    rowNum:30,
    multiselect:true,
    shrinkToFit:true,
    colNames: [ '内容','情感','聚类','状态', '操作'],
    colModel: [
        {name: 'sentence', index: 'sentence', width: 20, editable: true, sortable: false,align:"center"},
        {name: 'sname', index: 'sname', width: 20, editable: true, sortable: false,align:"center"},
        {name: 'cluster', index: 'cluster', width: 20, editable: true, sortable: false,align:"center",
            formatter: function (cellvar, options, rowObject) {
                var cluster_id = rowObject['cluster_id'];
                return Sentiment.cmap[cluster_id];
            }
        },
        {name: 'statusDiv', index: 'statusDiv', width: 20, editable: false, sortable: false,align:"center",
            formatter: function (cellvar, options, rowObject) {
                var status = rowObject['status'];
                return status==0?"使用中":"已废弃";
            }},
        {
            name: 'opt',
            index: 'opt',
            width: 20,
            editable: false,
            sortable: false,
            formatter: function (cellvar, options, rowObject) {
                var id = rowObject['id'];
                var rid = rowObject['rid'];
                return '<input type="button" class="btn btn-xs btn-info" value="恢复" onclick="CorpusChoose.batchReChooseCorpus(' + id + ')"/>&nbsp;';
            }
        }
    ],
    gridComplete: function () {
        setTimeout(function () {
            var width = $("#chooseCorpusModel").find(".modal-body").width();
            $(CorpusChoose.tableId).setGridWidth(width*0.45);
        },150);
    }
};

CorpusChoose.init = function (sid,xid,type) {
    if(CorpusChoose.isInit){
        CorpusChoose.search();
    }else{
        CorpusChoose.initOptions.postData = {sid:sid,xid:xid,type:type};
        var jqGrid = new JqGrid(CorpusChoose.tableId,CorpusChoose.pagerId, CorpusChoose.initOptions);
        CorpusChoose.table = jqGrid.init();
        CorpusChoose.isInit = true;
    }
};

CorpusChoose.batchReChooseCorpus = function (id) {

    var xid= $("#chooseCorpusModel").find("input[name=xid]").val();
    var type= $("#chooseCorpusModel").find("input[name=type]").val();
    var ids = [] ;
    if(id){
        ids.push(id);
    }else{
        ids=$(CorpusChoose.tableId).jqGrid('getGridParam','selarrrow');
        if(ids.length==0){
            info("请选择要恢复的语料");
            return;
        }
    }
    var corpusIdStr = ids.join(",");
    $.ajax({
        url:'/model/corpus/rechoose',
        type:'POST',
        data:{xid:xid,type:type,corpusIds:corpusIdStr},
        success:function (data) {
            CorpusNoChoose.search();
            CorpusChoose.search();
            Sentiment.search();
        }
    })
};

CorpusChoose.search = function () {
    var searchParam = {};
    searchParam.sid= $("#chooseSearchDiv").find("select[name=sentiment]").val();
    searchParam.xid= $("#chooseSearchDiv").find("input[name=xid]").val();
    searchParam.type= $("#chooseSearchDiv").find("input[name=type]").val();
    searchParam.text= $("#chooseSearchDiv").find("input[name=text]").val();
    searchParam.textopt= $("#chooseSearchDiv").find("select[name=textopt]").val();
    searchParam.clusterid= $("#chooseSearchDiv").find("select[name=clusterid]").val();
    CorpusChoose.table.reload(searchParam);
};

