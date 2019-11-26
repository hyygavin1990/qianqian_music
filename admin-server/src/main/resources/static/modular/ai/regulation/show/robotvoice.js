var RobotVoice = {
    tableId: "#grid-table-5",
    pagerId: "#grid-pager-5",
    selectId: null, //grid选择的条目id
    table: null,
    domain: "quality" ,
    isInit:false
};


/**
 * jqGrid初始化参数
 */
RobotVoice.initOptions = function (rid) {
    var options = {
        url : "/voice/robot/grid",
        postData: {
            rid:rid
        },
        width:1200,
        autowidth:true,
        rowNum:10,
        colNames : ['id','名字','性别','录音数量','状态','操作'],
        colModel : [
            {name:'id',index:'id',width:20,sortable:false},
            {name:'name',index:'name', width:50, editable: true,sortable:false},
            {name:'sex',index:'sex', width:50, editable: true,sortable:false,
                formatter: function (cellvar, options, rowObject) {
                    if (cellvar == 1) {
                        return "男";
                    } else if (cellvar == 2) {
                        return "女";
                    }else{
                        return "--"
                    }

                }
            },
            {name:'voiceCount',index:'voiceCount', width:50, editable: true,sortable:false},
            {name:'status',index:'status', width:50, editable: true,sortable:false,
                formatter: function (cellvar, options, rowObject) {
                    if (cellvar == 0) {
                        return "未启用";
                    } else if (cellvar == 1) {
                        return "已启用";
                    }
                }
            },
            {name:'opt',index:'opt', width:150, editable: false,sortable:false,formatter: function (cellvar, options, rowObject) {
                var id=rowObject["id"];
                var status=rowObject["status"];
                var name=rowObject["name"];
                var str = '';
                if(status==0){
                    str ='<button class="control-auth btn btn-sm btn-primary"  data-auth="quality_quality" onclick="RobotVoice.enable(\''+id+'\');">启用</button>&nbsp;';
                }else{
                    str ='<button class="control-auth btn btn-sm btn-danger"  data-auth="quality_quality" onclick="RobotVoice.enable(\''+id+'\');">禁用</button>&nbsp;';
                }
                return str;
            } }
        ],
        gridComplete: function () {
            $(RobotVoice.tableId).setGridWidth(document.body.clientWidth*0.6);
            refreshPermission(RobotVoice.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
RobotVoice.search = function () {
    var searchParam = {};
    RobotVoice.table.reload(searchParam);
    document.getElementById('statetree').src="/stateinfo/singletree?rid="+Wizard.rid;
};


RobotVoice.enable = function (id) {
    $.ajax({
        url: "/voice/enableVoice",
        type: 'GET',
        data: {
           id:id
        },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                success("操作成功");
                RobotVoice.resetSearch();
            }else if(r.code === 2) {
            }
        }
    })
};

/**
 * 重置搜索
 */
RobotVoice.resetSearch = function () {
    RobotVoice.search();
};


RobotVoice.init = function (rid) {
    var jqGrid = new JqGrid("#grid-table-5", "#grid-pager-5", RobotVoice.initOptions(rid));
    RobotVoice.table = jqGrid.init();
};
