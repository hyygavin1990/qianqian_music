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
    shrinkToFit:true,
    colNames: ['名称', '话术','value', '评分', '操作'],
    colModel: [
        {name: 'name', index: 'name', width: 20, editable: false, sortable: false,align:"center"},
        {name: 'valueDiv', index: 'valueDiv', width: 200, editable: false, sortable: false,align:"center",formatter:function(cellvar, options, rowObject){
            return rowObject['value'];
        }},
        {name: 'value', index: 'value', width: 200, editable: false, sortable: false,hidden:true},
        {name: 'score', index: 'score', width: 20, editable: true, sortable: false,align:"center"},
        {
            name: 'opt',
            index: 'opt',
            width: 40,
            editable: false,
            sortable: false,
            formatter: function (cellvar, options, rowObject) {
                var id = rowObject['id'];
                var value = rowObject['value'];
                var score = rowObject['score'];
                var buttons = '<input type="button" class="btn btn-sm btn-primary" value="编辑" onclick="Stateinfo.edit(' + id + ')"/>&nbsp;' +
                    '<input type="button" class="btn btn-sm btn-danger" value="删除" onclick="Stateinfo.delete(' + id + ')"/>&nbsp;';
                return buttons;
            }
        }
    ],
    gridComplete: function () {
        $(Stateinfo.tableId).setGridWidth(document.body.clientWidth*0.7);
        var obj=$(Stateinfo.tableId).jqGrid("getRowData");
        $("#create-state-form").find("input[name=name]").val(obj.length+1);

    }
};


/**
 * 新增弹框
 */
Stateinfo.create = function () {

    $("#createStateModal").find("input[name=rid]").val(Wizard.rid);
    $("#createStateModal").modal();
};

/**
 * 根据关键词搜索
 */
Stateinfo.search = function () {
    var searchParam = {};
    Stateinfo.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Stateinfo.resetSearch = function () {
    Stateinfo.search();
};



/**
 * 保存标签
 */
Stateinfo.insert = function () {
    $.ajax({
        url: "/stateinfo/insert",
        type: 'POST',
        data: $("#create-state-form").serialize(),
        dataType: "json",
        success: function (r) {
            if (r.obj === 0) {
                $("#createStateModal").modal("hide");
                success("保存成功");
                Stateinfo.search();
                $("#create-state-form")[0].reset();
            }else if (r.obj === 1) {
                info("话术或者评分不能为空");
            }else if (r.obj === 2) {
                info("评分必须大于0，小于1000");
            }
        }
    })
};


Stateinfo.edit = function (id) {

    var rowData = $(Stateinfo.tableId).jqGrid('getRowData', id );


    $("#editStateModal").find("input[name=id]").val(id);
    $("#editStateModal").find("textarea[name=value]").val(rowData.value.trim());
    $("#editStateModal").find("input[name=score]").val(rowData.score);

    $("#editStateModal").modal();
};


/**
 * 更新标签
 */
Stateinfo.update = function () {
    $.ajax({
        url: "/stateinfo/update",
        type: 'POST',
        data: $("#edit-state-form").serialize(),
        dataType: "json",
        success: function (r) {

            if (r.obj === 0) {
                $("#editStateModal").modal("hide");
                $("#edit-state-form")[0].reset();
                Stateinfo.search();
                success("保存成功");
            }else if (r.obj === 1) {
                info("话术或者评分不能为空");
            }else if (r.obj === 2) {
                info("评分必须大于0，小于1000");
            }

        }
    })
};

/**
 * 删除标签
 *
 * @param id
 */
Stateinfo.delete = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/stateinfo/delete?id=" + id, function (d) {

            if(d.obj==0){
                success("成功删除");
                Stateinfo.search();
            }else{
                info("跳转关系中包含该状态！");
            }

        });
    })
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
