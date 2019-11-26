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
    shrinkToFit:true,
    colNames: ['from状态', 'to状态','情感类型','是否主线','标记', '操作'],
    colModel: [
        {name: 'from', index: 'from', width: 20, editable: false, sortable: false,align:"center"},
        {name: 'to', index: 'to', width: 20, editable: false, sortable: false,align:"center"},
        {name: 'sname', index: 'sname', width: 20, editable: true, sortable: false,align:"center"},
        {name: 'isMainDiv', index: 'isMainDiv', width: 20, editable: true, sortable: false,align:"center",formatter: function (cellvar, options, rowObject) {
            var is_main = rowObject['is_main'];
            is_main = is_main?is_main:0;
            return is_main==1?"是":"否";
        }},
        {name: 'marks', index: 'marks', width: 50, editable: true, sortable: false,align:"center"},
        {
            name: 'opt',
            index: 'opt',
            width: 40,
            editable: false,
            sortable: false,
            formatter: function (cellvar, options, rowObject) {
                var id = rowObject['id'];
                var sid = rowObject['sid'];
                var marks = rowObject['marks'];
                var is_main = rowObject['is_main'];
                var buttons = '<input type="button" class="btn btn-sm btn-primary" value="编辑" onclick="Eventinfo.edit(' + id+',\''+sid+'\',\''+marks+'\','+is_main+')"/>&nbsp;' +
                    '<input type="button" class="btn btn-sm btn-danger" value="删除" onclick="Eventinfo.delete(' + id+')"/>&nbsp;';
                return buttons;
            }
        }
    ],
    gridComplete: function () {
        $(Eventinfo.tableId).setGridWidth(document.body.clientWidth*0.8);
    }
};


/**
 * 新增弹框
 */
Eventinfo.create = function () {

    $.ajax({
        url:"/stateinfo/map",
        data:{
            rid:Wizard.rid
        },
        success:function (d) {
            var stateMap = d.obj;
            $("#add_from_div").html('<select multiple="multiple" id="add_from_select"  class="chosen-select" name="from"  data-placeholder="选择状态"></select>');
            $("#add_to_div").html('<select multiple="multiple" id="add_to_select"  class="chosen-select" name="to"  data-placeholder="选择状态"></select>');
            for(var key in stateMap){
                $("#add_from_select").append('<option value="'+key+'">'+key+'</option>');
                $("#add_to_select").append('<option value="'+key+'">'+key+'</option>');
            }
            $("#add_from_select").chosen({
                no_results_text: "没有状态",
                placeholder_text : "选择状态",
                search_contains: true,
                disable_search_threshold: 10,
                max_selected_options:1,
                width:"100%"
            });
            $("#add_to_select").chosen({
                no_results_text: "没有状态",
                placeholder_text : "选择状态",
                search_contains: true,
                disable_search_threshold: 10,
                max_selected_options:1,
                width:"100%"
            });
        }
    });

    $.ajax({
        url:"/industry/list",
        success:function (d) {
            var industries = d.obj;
            $("#industrySel").html("");
            for (var i = 0; i < industries.length; i++) {
                var obj = industries[i];
                if(i==0){
                    Eventinfo.setSenti("#sentiSel",obj.id);
                }
                $("#industrySel").append(' <option value="'+obj.id+'">'+obj.name+'</option>');
            }
        }
    });

    $("#createEventModal").find("input[name=rid]").val(Wizard.rid);
    $("#createEventModal").find("input[name=marks]").val("任何说法");
    $("#createEventModal").modal();
};

Eventinfo.setSenti = function (selector,inid) {
    $.ajax({
        url:"/sentiment/list",
        async:false,
        data:{type:0,inid:inid},
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

$(".industrySel").change(function () {
    Eventinfo.setSenti($(this).attr("data"),$(this).val());
    var markDiv = $(this).parent().parent().siblings('div').last();
    var sidDiv = $(this).parent().siblings('div');
    Eventinfo.fillMasks(sidDiv,markDiv);
});
$(".sentiSel").change(function () {
    var sidDiv = $(this);
    var markDiv = $(this).parent().parent().siblings('div');
    Eventinfo.fillMasks(sidDiv,markDiv);
});

Eventinfo.fillMasks = function (sidDiv,markDiv) {
    var content = sidDiv.find("option:selected").text();
    var index = content.indexOf(":")+1;
    content = content.substr(index);
    markDiv.find("input[name=marks]").val(content);
}
/**
 * 根据关键词搜索
 */
Eventinfo.search = function () {
    var searchParam = {};
    Eventinfo.table.reload(searchParam);
    document.getElementById('statetree').src="/stateinfo/singletree?rid="+Wizard.rid;
};

/**
 * 重置搜索
 */
Eventinfo.resetSearch = function () {
    Eventinfo.search();
};
Eventinfo.initEvents =function () {

    warning("该操作会重置所有数据，确定生成吗？", "", function () {
        $.ajax({
            url:"/eventinfo/init",
            data:{rid:Wizard.rid},
            success:function (d) {
                Eventinfo.search();
                success("执行成功");
            }

        });
    })


};


/**
 * 保存标签
 */
Eventinfo.insert = function () {

    $.ajax({
        url: "/eventinfo/insert",
        type: 'POST',
        data: $("#create-event-form").serialize(),
        dataType: "json",
        success: function (r) {
            var obj =r.obj;
            if (obj.code == 0) {
                $("#createEventModal").modal("hide");
                success("保存成功");
                Eventinfo.search();
                $("#create-event-form")[0].reset();
            }else {
                info(obj.errmsg);
            }
        }
    })
};

Eventinfo.edit = function (id,sid,marks,is_main) {
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
        url:"/industry/list",
        success:function (d) {
            var industries = d.obj;
            $("#industrySel1").html("");
            for (var i = 0; i < industries.length; i++) {
                var obj = industries[i];
                if(sentiment.industry_id==obj.id){
                    Eventinfo.setSenti("#sentiSel1",obj.id);
                    $("#editEventModal").find("select[name=sid]").find("option[value="+sid+"]").attr("selected",true);
                }

                $("#industrySel1").append(' <option value="'+obj.id+'">'+obj.name+'</option>');
            }
            $("#industrySel1").find("option[value="+sentiment.industry_id+"]").attr("selected",true);

        }
    });

    $("#editEventModal").modal();
    $("#editEventModal").find("input[name=id]").val(id);
    $("#editEventModal").find("input[name=marks]").val(marks);
    $("#editEventModal").find("select[name=isMain]").val(is_main?is_main:0);

};


/**
 * 更新标签
 */
Eventinfo.update = function () {
    $.ajax({
        url: "/eventinfo/update",
        type: 'POST',
        data: $("#edit-event-form").serialize(),
        dataType: "json",
        success: function (r) {
            if (r.obj === 0) {
                $("#editEventModal").modal("hide");
                $("#edit-event-form")[0].reset();
                Eventinfo.search();
                success("保存成功");
            }else if (r.obj === 1) {
                info("标记不能为空");
            }
        }
    })
};

/**
 * 删除标签
 *
 * @param id
 */
Eventinfo.delete = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/eventinfo/delete?id=" + id, function (d) {

            if(d.obj==0){
                success("成功删除");
                Eventinfo.search();
            }else{
                info("至少包含一个from状态为Z1的跳转关系");
            }

        });
    })
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
