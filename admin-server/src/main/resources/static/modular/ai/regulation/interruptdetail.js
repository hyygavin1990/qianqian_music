var InterruptDetail = {
    tableId: "#grid-table-2",
    pagerId: "#grid-pager-2",
    selectId: null, //grid选择的条目id
    table: null,
    isInit:false
};

var createSwitchery;
var editSwitchery;
/**
 * jqGrid初始化参数
 */
InterruptDetail.initOptions = {
    url: "/interruptdetail/grid",
    rowNum:20,
    shrinkToFit:true,
    colNames: ['名称','适用状态','话术','情感类型','sid','转接类型', '操作','zjtype'],
    colModel: [
        {name: 'name', index: 'name', width: 20, editable: false, sortable: false,align:"center"},
        {name: 'status', index: 'status', width: 20, editable: false, sortable: false,align:"center"},
        {name: 'content', index: 'content', width: 150, editable: false, sortable: false,align:"center"},
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
        {
            name: 'opt',
            index: 'opt',
            width: 40,
            editable: false,
            sortable: false,
            formatter: function (cellvar, options, rowObject) {
                var id = rowObject['id'];
                var buttons ="";
                if(rowObject['sname']&&rowObject['sdesc']){
                    buttons+='<input type="button" class="btn btn-sm btn-primary" value="编辑" onclick="InterruptDetail.edit(' + id+ ')"/>&nbsp;' ;
                }

                buttons+='<input type="button" class="btn btn-sm btn-danger" value="删除" onclick="InterruptDetail.delete(' + id + ')"/>&nbsp;';
                return buttons;
            }
        },
        {name: 'zjtype', index: 'zjtype', width: 20, hidden:true}
    ],
    gridComplete: function () {
        $(InterruptDetail.tableId).setGridWidth(document.body.clientWidth*0.7);
        var obj=$(InterruptDetail.tableId).jqGrid("getRowData");
        var count=0;
        for (var i = 0; i < obj.length; i++) {
            if(obj[i].name.indexOf("T")!=-1) count++;
        }
        $("#create-inde-form").find("input[name=name]").val(count+1);
    }
};


/**
 * 新增弹框
 */
InterruptDetail.create = function () {
    $.ajax({
        url:"/stateinfo/map",
        data:{
            rid:Wizard.rid
        },
        success:function (d) {
            var stateMap = d.obj;
            $("#add_status_div").html('<select multiple="multiple" id="add_status_input"  class="chosen-select" name="status"  data-placeholder="选择状态"></select>');

            $("#add_status_input").html('<option value="all">所有</option>');
            for(var key in stateMap){
                $("#add_status_input").append('<option value="'+key+'">'+key+':'+stateMap[key]+'</option>');
            }
            $("#add_status_input").val("all");
            $("#add_status_input").chosen({
                no_results_text: "没有状态",
                placeholder_text : "选择状态",
                search_contains: true,
                disable_search_threshold: 10,
                width:"100%"
            });
        }
    });

    $.ajax({
        url:"/industry/list",
        success:function (d) {
            var industries = d.obj;
            $("#industrySel2").html("");
            for (var i = 0; i < industries.length; i++) {
                var obj = industries[i];
                if(i==0){
                    InterruptDetail.setSenti("#sentiSel2",obj.id);
                }
                $("#industrySel2").append(' <option value="'+obj.id+'">'+obj.name+'</option>');
            }
        }
    });

    $("#createIndeModal").find("input[name=rid]").val(Wizard.rid);
    $("#createIndeModal").modal();
    setSwitchery(createSwitchery, true);
};

InterruptDetail.createw = function () {
    var html =
        "<form class=\"form-horizontal\" id=\"create-w-form\" style='text-align: left;'>\n" +
"                    <input type=\"hidden\"  name=\"rid\">\n" +
"                    <input type=\"hidden\"  name=\"sid\">\n" +
"                    <input type=\"hidden\"  name=\"zjtype\">\n" +
"                    <input type=\"hidden\"  name=\"name\">\n" +
"                    <div class=\"form-group\">\n" +
"                        <label class=\"col-sm-2 control-label\" >状态</label>\n" +
"                        <div class=\"col-sm-8\" id=\"add_w_status_div\" style='text-align: left;margin-top: 7px;'>\n" +
"                        </div>\n" +
"                    </div>\n" +
"                    <div class=\"form-group\">\n" +
"                        <label class=\"col-sm-2 control-label\">话术</label>\n" +
"                        <div class=\"col-sm-10\">\n" +
"                            <div class=\"textarea no-padding\" style='text-align: left;margin-top: 7px;'>\n" +
"                                <textarea name=\"content\" style=\"resize:none;width: 90%;height:100px;border: 1px solid #e5e6e7;border-radius: 1px;\" ></textarea>\n" +
"                            </div>\n" +
"                        </div>\n" +
"                    </div>\n" +
"                    <div class=\"form-group\">\n" +
"                        <label class=\"col-sm-2 control-label\"></label>\n" +
"                        <div class=\"col-sm-10\">\n" +
"                             <div type=\"button\" class=\"btn btn-sm btn-primary\">提交</div>&nbsp;&nbsp;&nbsp;"+
"                             <div type=\"button\" class=\"btn btn-sm btn-default\" >取消</div>"+
"                        </div>\n" +
"                    </div>\n" +
"                </form>";
    swal({
        title:  null ,
        text: html,
        showConfirmButton:false,
        html: true
    });
    $("#create-w-form").find("div.btn").eq(0).click(function () {
        InterruptDetail.insertw();
    });
    $("#create-w-form").find("div.btn").eq(1).click(function () {
        swal.close();
    });
    var stateMap=null;
    $.ajax({
        url:"/stateinfo/map",
        data:{
            rid:Wizard.rid
        },
        success:function (d) {
            stateMap = d.obj;
            $("#add_w_status_div").html('<select class="form-control"  name="status"  data-placeholder="选择状态"></select>');

            for(var key in stateMap){
                $("#add_w_status_div").find("select").append('<option value="'+key+'">'+key+':'+stateMap[key]+'</option>');
            }
        }
    });
    $("#create-w-form").find("input[name=rid]").val(Wizard.rid);
    $("#create-w-form").find("input[name=sid]").val(0);
    $("#create-w-form").find("input[name=zjtype]").val(0);
};


$(".industrySel1").change(function () {
    InterruptDetail.setSenti($(this).attr("data"),$(this).val());
});


InterruptDetail.setSenti = function (selector,inid) {
    $.ajax({
        url:"/sentiment/list",
        async:false,
        data:{type:1,inid:inid},
        success:function (d) {
            var sentis = d.obj;
            $(selector).html("");
            for (var i = 0; i < sentis.length; i++) {
                var obj = sentis[i];
                $(selector).append(' <option value="'+obj.id+'">'+obj.name+':'+obj.description+'</option>');
            }
        }

    });
};

/**
 * 根据关键词搜索
 */
InterruptDetail.search = function () {
    var searchParam = {};
    InterruptDetail.table.reload(searchParam);
};

/**
 * 重置搜索
 */
InterruptDetail.resetSearch = function () {
    InterruptDetail.search();
};

/**
 * 保存标签
 */
InterruptDetail.insert = function () {
    var checked = document.querySelector("#createIndeModal .js-switch").checked;
    var zjtype = checked?1:0;
    $("#createIndeModal").find("input[name=zjtype]").val(zjtype);
    $.ajax({
        url: "/interruptdetail/insert",
        type: 'POST',
        data: $("#create-inde-form").serialize(),
        dataType: "json",
        success: function (r) {
            if (r.obj === 0) {
                $("#createIndeModal").modal("hide");
                success("保存成功");
                InterruptDetail.search();
                $("#create-inde-form").find("textarea[name=content]").val("");

            }else if(r.obj === 1) {
                info("状态或者话术不能为空");
            }else if(r.obj === 2) {
                info("选中“所有”时，不能再选其他的状态");
            }
        }
    })
};

/**
 * 保存标签
 */
InterruptDetail.insertw = function () {

    var status = $("#create-w-form").find("select").val();
    var name = "W"+status.replace(/Z/,"");
    $("#create-w-form").find("input[name=name]").val(name);
    $.ajax({
        url: "/interruptdetail/insert",
        type: 'POST',
        data: $("#create-w-form").serialize(),
        dataType: "json",
        success: function (r) {
            if (r.obj === 0) {
                $("#createIndeModal").modal("hide");
                success("保存成功");
                InterruptDetail.search();
                $("#create-inde-form").find("textarea[name=content]").val("");

            }else if(r.obj === 1) {
                info("状态或者话术不能为空");
            }else if(r.obj === 2) {
                info("选中“所有”时，不能再选其他的状态");
            }
        }
    })
};


InterruptDetail.edit = function (id) {

    var rowData = $(InterruptDetail.tableId).jqGrid("getRowData",id);
    var name = rowData.name;
    var status = rowData.status;
    var content = rowData.content;
    var sid = rowData.sid;
    var zjtype = rowData.zjtype;
    var sentiment;
    $.ajax({
        url:"/sentiment/findById",
        data:{id:sid},
        async:false,
        success:function (d) {
            sentiment = d.obj;
        }
    });

    $.ajax({
        url:"/stateinfo/map",
        data:{
            rid:Wizard.rid
        },
        success:function (d) {
            var stateMap = d.obj;
            $("#edit_status_div").html('<select multiple="multiple" id="edit_status_input"  class="chosen-select" name="status"  data-placeholder="选择状态"></select>');
            $("#edit_status_input").html('<option value="all">所有</option>');
            for(var key in stateMap){
                $("#edit_status_input").append('<option value="'+key+'">'+key+':'+stateMap[key]+'</option>');
            }
            $("#edit_status_input").val(status.split(","));
            $("#edit_status_input").chosen({
                no_results_text: "没有状态",
                placeholder_text : "选择状态",
                search_contains: true,
                disable_search_threshold: 10,
                width:"100%"
            });
        }
    });

    $.ajax({
        url:"/industry/list",
        success:function (d) {
            var industries = d.obj;
            $("#industrySel3").html("");
            for (var i = 0; i < industries.length; i++) {
                var obj = industries[i];
                if(sentiment.industry_id==obj.id){
                    InterruptDetail.setSenti("#sentiSel3",obj.id);
                    $("#editIndeModal").find("select[name=sid]").find("option[value="+sid+"]").attr("selected",true);
                    $("#industrySel3").append(' <option value="'+obj.id+'" selected="selected">'+obj.name+'</option>');
                }else{
                    $("#industrySel3").append(' <option value="'+obj.id+'">'+obj.name+'</option>');
                }

            }
        }
    });
    $("#editIndeModal").find("input[name=rid]").val(Wizard.rid);
    $("#editIndeModal").find("input[name=id]").val(id);
    $("#editIndeModal").find("input[name=name]").val(name.substr(1));
    $("#editIndeModal").find("textarea[name=content]").val(content);
    setSwitchery(editSwitchery, zjtype==1);
    $("#editIndeModal").modal();
};


/**
 * 更新标签
 */
InterruptDetail.update = function () {
    var checked = document.querySelector("#editIndeModal .js-switch").checked;
    var zjtype = checked?1:0;
    $("#editIndeModal").find("input[name=zjtype]").val(zjtype);
    $.ajax({
        url: "/interruptdetail/update",
        type: 'POST',
        data: $("#edit-inde-form").serialize(),
        dataType: "json",
        success: function (r) {
            if (r.obj === 0) {
                $("#editIndeModal").modal("hide");
                $("#edit-inde-form")[0].reset();
                InterruptDetail.search();
                setSwitchery(editSwitchery, checked);
                success("保存成功");
            }else if(r.obj===1){
                info("状态或者话术不能为空");
            }else if(r.obj === 2) {
                info("选中“所有”时，不能再选其他的状态");
            }else if(r.obj === 3) {
                info("名称已经存在");
            }else if(r.obj === 4) {
                info("语料非空且修改前的情感与修改后的非父子关系，不能修改");
            }
        }
    })
};

/**
 * 删除标签
 *
 * @param id
 */
InterruptDetail.delete = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/interruptdetail/delete?id=" + id, function (d) {

            if(d.obj==0){
                success("成功删除");
                InterruptDetail.search();
            }else{
                info("跳转关系中包含该状态！");
            }

        });
    })
};

InterruptDetail.init = function (rid) {
    if(InterruptDetail.isInit){
        InterruptDetail.search();
    }else{
        createSwitchery = new Switchery(document.querySelector('#createIndeModal .js-switch'), {color: '#1AB394'});
        editSwitchery = new Switchery(document.querySelector('#editIndeModal .js-switch'), {color: '#1AB394'});
        InterruptDetail.initOptions.url += "?rid="+rid;
        var jqGrid = new JqGrid(InterruptDetail.tableId, InterruptDetail.pagerId, InterruptDetail.initOptions);
        InterruptDetail.table = jqGrid.init();
        InterruptDetail.isInit = true;
    }

};
