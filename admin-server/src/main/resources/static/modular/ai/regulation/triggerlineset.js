var TriggerLineSet = {
    tableId: "#grid-table-3",
    pagerId: "#grid-pager-3",
    selectId: null, //grid选择的条目id
    table: null,
    isInit:false
};

/**
 * jqGrid初始化参数
 */
TriggerLineSet.initOptions = {
    url: "/trigger/set/grid",
    rowNum:100,
    shrinkToFit:true,
    colNames: ['名称', '规则名','分类名', '操作'],
    colModel: [
        {name: 'name', index: 'name', width: 20, editable: false, sortable: false,align:"center"},
        {name: 'regu', index: 'regu', width: 20, editable: true, sortable: false,align:"center", formatter: function (cellvar, options, rowObject) {
            var rid = rowObject['rid'];
            return rid==0?'通用':(rowObject['tag']+'-'+rowObject['version']);
        }},
        {name: 'cname', index: 'cname', width: 20, editable: true, sortable: false,align:"center"},
        {
            name: 'opt',
            index: 'opt',
            width: 20,
            editable: false,
            sortable: false,
            formatter: function (cellvar, options, rowObject) {
                var id = rowObject['id'];
                var rid = rowObject['rid'];
                var html = '<input type="button" class="btn btn-sm btn-info" value="查看" onclick="TriggerLineSet.show(' + id + ')"/>&nbsp;';
                if(rid==Wizard.rid){
                    html +='<input type="button" class="btn btn-sm btn-danger" value="删除" onclick="TriggerLineSet.delete(' + id + ')"/>&nbsp;';
                }
                return html;
            }
        }
    ],
    gridComplete: function () {
        $(TriggerLineSet.tableId).setGridWidth(document.body.clientWidth*0.50);
        TriggerLineSet.refreshSetSelect();
    }
};

TriggerLineSet.init = function (rid) {
    if(TriggerLineSet.isInit){
        TriggerLineSet.search();
    }else{
        TriggerLineSet.initOptions.url += "?rid="+rid;
        var jqGrid = new JqGrid(TriggerLineSet.tableId,TriggerLineSet.pagerId, TriggerLineSet.initOptions);
        TriggerLineSet.table = jqGrid.init();
        TriggerLineSet.isInit = true;
    }
};

TriggerLineSet.delete = function (id) {
    warning("确定删除吗", "", function () {
        $.get("/trigger/set/delete?id=" + id, function (d) {

            if(d.obj==0){
                success("成功删除");
                TriggerLineSet.search();
            }else{
                info("规则中使用了该集合不能删除");
            }

        });
    })
};
TriggerLineSet.show = function (id) {
    $.ajax({
        url:"/trigger/set/get",
        data:{
            id:id
        },
        success:function (d) {
            var content = d.obj;
            info(content);
        }
    });
};


TriggerLineSet.search = function () {
    var searchParam = {};
    TriggerLineSet.table.reload(searchParam);
};

TriggerLineSet.refreshSetSelect = function () {
    $.ajax({
        url:"/trigger/set/map",
        data:{
            rid:Wizard.rid
        },
        success:function (d) {
            var setMap = d.obj;
            ReguConfig.chosenInit(setMap,"set-div","set_select",1);
        }
    });
};