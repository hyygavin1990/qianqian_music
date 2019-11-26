var Voice = {
    tableId: "#grid-table-4",
    pagerId: "#grid-pager-4",
    selectId: null, //grid选择的条目id
    table: null,
    domain: "quality" ,
    isInit:false
};


/**
 * jqGrid初始化参数
 */
Voice.initOptions = function (rid) {
    var options = {
        url : "/voice/grid",
        postData: {
            rid:rid
        },
        width:1200,
        autowidth:true,
        rowNum:10,
        colNames : ['id','staffids','paths','名称','话术','操作'],
        colModel : [
            {name:'id',index:'id',hidden: true,sortable:false},
            {name:'staffids',index:'staffids',  hidden: true,sortable:false},
            {name:'paths',index:'paths',  hidden: true,sortable:false},
            {name:'name',index:'name', width:30, editable: true,sortable:false},
            {name:'content',index:'content', width:250, editable: true,sortable:false},
            {name:'opt',index:'opt', width:20, editable: false,sortable:false,formatter: function (cellvar, options, rowObject) {
                var id=rowObject["id"];
                return '<button class="control-auth btn btn-sm btn-info" data-auth="quality_subSuper" onclick="Voice.playVoice(\''+id+'\');">试听</button>&nbsp;';
            } }
        ],
        gridComplete: function () {
            $(Voice.tableId).setGridWidth(document.body.clientWidth*0.6);
            refreshPermission(Voice.domain);
        }
    };
    return options;
};


/**
 * 初始化参数弹框
 */
Voice.createInitParam = function () {
    $("#editInitParamModal").find("input[name=rid]").val(Wizard.rid);
    $.ajax({
        url: "/voice/getInitParamByRid?rid="+Wizard.rid,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                if(r.obj.isUpdate == true){
                    $("#editInitParamModal").find("input[name=isUpdate]").val(true);
                }
                var res = r.obj.initParam;
                var content = "";
                for(var i=0;i<res.length;i++){
                    var initParam = res[i];
                    content += " <div class=\"form-group\">" +
                        "                        <label class=\"col-sm-4 control-label\">"+initParam.memo+"</label>" +
                        "                        <div class=\"col-sm-8\">" +
                        "                            <input type=\"text\"  class=\"form-control ruleInitParam\" value=\""+initParam.value+"\" name=\""+initParam.name+"\">" +
                        "                        </div>" +
                        "                    </div>"
                }

                $("#initParam-form").html(content);
                $("#editInitParamModal").modal();
            }else{
                $("#editInitParamModal").modal();
            }
        }
    })
};




/**
 * 试听录音弹窗
 */
Voice.playVoice = function (id) {
    var voiceLocalUrl = $("#voiceLocalUrl").val();
    $.ajax({
        url:"/voice/getVoiceByContent?vMainId="+id,
        async:false,
        dataType:'json',
        success:function (r) {
            var voices = r.obj;
            var content = "";
            for(var i=0;i<voices.length;i++){
                var voiceRobot = voices[i];
                content +='<p>'+voiceRobot.voiceName +":"+ voiceRobot.name+'</p>' ;
                content +='<p ><audio src="'+voiceLocalUrl+voiceRobot.store_filepath+'" controls="">浏览器不支持</audio>';
            }
            $("#allVoice").html(content);
        }
    });
    $("#playVoice").modal();
};




/**
 * 根据关键词搜索
 */
Voice.search = function () {
    var searchParam = {};
    Voice.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Voice.resetSearch = function () {
    Voice.search();
};


/**
 * 保存规则初始化参数
 */
Voice.insertInitParam = function () {
    var rid = $("#editInitParamModal").find("input[name=rid]").val();
    var isUpdate = $("#editInitParamModal").find("input[name=isUpdate]").val();
    var names = [];
    var values = [];
    $(".ruleInitParam").each(function(){
        names.push($(this).attr("name"));
        values.push($(this).val());
    });
    $.ajax({
        url: "/voice/insertInitParam",
        type: 'POST',
        data: JSON.stringify({
            rid: rid,
            names:names,
            isUpdate:isUpdate,
            values:values
        }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editInitParamModal").modal("hide");
                success("保存成功");
                $("#initParam-form")[0].reset();
            }else if(r.code === 2) {
            }
        }
    })
};


Voice.init = function (rid) {
    var jqGrid = new JqGrid("#grid-table-4", "#grid-pager-4", Voice.initOptions(rid));
    Voice.table = jqGrid.init();
};
