var Voice = {
    tableId: "#grid-table-4",
    pagerId: "#grid-pager-4",
    selectId: null, //grid选择的条目id
    table: null,
    domain: "regulation_list" ,
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
        shrinkToFit: true,
        rowNum:100,
        multiselect: true,
        colNames : ['id','staffids','paths','名称','话术','操作'],
        colModel : [
            {name:'id',index:'id',hidden: true,sortable:false},
            {name:'staffids',index:'staffids',  hidden: true,sortable:false},
            {name:'paths',index:'paths',  hidden: true,sortable:false},
            {name:'name',index:'name', width:30, editable: true,sortable:false},
            {name:'content',index:'content', width:250, editable: true,sortable:false},
            {name:'opt',index:'opt', width:80, editable: false,sortable:false,formatter: function (cellvar, options, rowObject) {
                var id=rowObject["id"];
                var str ='<button class="control-auth btn btn-sm btn-primary"  data-auth="regulation_robot_voice_edit" onclick="Voice.editVoiceRobot(\''+id+'\');">修改</button>&nbsp;';
                str +=  '<button class="control-auth btn btn-sm btn-info" data-auth="regulation_robot_voice_listen" onclick="Voice.playVoice(\''+id+'\');">试听</button>&nbsp;';
                str +=  '<button class="control-auth btn btn-sm btn-info" data-auth="regulation_robot_voice_delete" onclick="Voice.deleteVoiceRobot(\''+id+'\');">删除</button>&nbsp;';

                return str;
            } }
        ],
        gridComplete: function () {
            $(Voice.tableId).setGridWidth(document.body.clientWidth*0.6);
            var tabid = $("#speakForm").parent().parent().attr("id");
            Wizard.refreshPermission(Voice.domain,tabid);
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
 * 新增话术弹窗
 */
Voice.createVoiceRobot = function () {
    $("#insertVoiceRobotModal").find("input[name=rid]").val(Wizard.rid);
    $("#insertVoiceRobotModal").modal();
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
 * 编辑话术弹窗
 */
Voice.editVoiceRobot = function (id) {
    $("#editVoiceRobotModal").find("input[name=rid]").val(Wizard.rid);
    $.ajax({
        url: "/voice/getVoiceRobotMain?id=" +id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var res = r.obj;
                var form = $("#editVoiceRobot-form");
                form.find("input[name='id']").val(res.id);
                form.find("input[name='name']").val(res.name);
                form.find("input[name='content']").val(res.content);
                $("#editVoiceRobotModal").modal();
            }else{
                $("#editVoiceRobotModal").modal();
            }
        }
    });
};

//显示文件路劲
Voice.showfile = function () {
    $("#xls").siblings("span").eq(0).html($("#xls").val());
}

//上传话术xls
Voice.uploadFile = function (obj) {

    var formData = new FormData($('#speakForm')[0]);
    formData.append("rid",Wizard.rid);
    obj.disabled = true;
    alert('已经提交请勿重复点击或者刷新页面,耐心等待返回结果！！！');
    $.ajax({
        url: "/voice/uploadFile",
        type: 'POST',
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.obj == 2) {
                info("文件为空")
            }
            if (data.obj == 4) {
                info("上传失败，请检查数据格式")
            }
            Voice.resetSearch();
            $('#speakForm').resetForm();
            $("#xls").siblings("span").eq(0).html("上传文件");
            obj.disabled = false;
        },
        error: function () {
            info('服务错误请刷新后重新提交！');
        }
    });
}


//下载话术xls模板
Voice.downloadFile = function (obj) {
    //从静态服中下载话术的xls模板
    var voiceLocalUrl = $("#voiceLocalUrl").val();
    window.open(voiceLocalUrl+"/home/datawin/upload/excelModel/voicecontent.xls");
}


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

/**
 * 新增话术
 */
Voice.insertVoiceRobot = function () {
    var rid =  $("#voiceRobot-form").find("input[name=rid]").val();
    var name =  $("#voiceRobot-form").find("input[name=name]").val();
    var content =  $("#voiceRobot-form").find("input[name=content]").val();
    $.ajax({
        url: "/voice/insertVoiceRobot",
        type: 'get',
        data: {
            rid: rid,
            name:name,
            content:content
        },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#insertVoiceRobotModal").modal("hide");
                success("保存成功");
                $("#voiceRobot-form")[0].reset();
                Voice.resetSearch();
            }else if(r.code === 2) {
            }
        }
    })
};

/**
 * 更新话术
 */
Voice.updateVoiceRobot = function () {
    var rid =  $("#editVoiceRobot-form").find("input[name=rid]").val();
    var id =  $("#editVoiceRobot-form").find("input[name=id]").val();
    var name =  $("#editVoiceRobot-form").find("input[name=name]").val();
    var content =  $("#editVoiceRobot-form").find("input[name=content]").val();
    $.ajax({
        url: "/voice/updateVoiceRobot",
        type: 'POST',
        data: JSON.stringify({
            id:id,
            rid: rid,
            name:name,
            content:content
        }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editVoiceRobotModal").modal("hide");
                success("保存成功");
                $("#editVoiceRobot-form")[0].reset();
                Voice.resetSearch();
            }else if(r.code === 2) {
            }
        }
    })
};




/**
 * 删除
 *
 * @param id
 */
Voice.deleteVoiceRobot = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/voice/delete?id=" + id, function () {
            success("成功删除,请重新上传录音文件");
            Voice.resetSearch();
        });
    })
};

/**
 * 多选删除
 *
 * @param id
 */
Voice.deleteVoiceRobots = function dels() {
    var ids = $("#grid-table-4").jqGrid('getGridParam','selarrrow');
    if(ids.length==0){
        info("请选中ID");
        return;
    }
    warning("确定删除吗", "", function () {
        $.ajax({
            url: "/voice/deletes",
            type: "POST",
            data: {
                'ids': JSON.stringify(ids)
            },
            dataType: "json",
            success: function (r) {
                success("成功删除,请重新上传录音文件");
                Voice.resetSearch();
            }
        })
    })

};

Voice.checkMerge = function () {
        $.ajax({
            url: "/voice/checkMerge",
            type: "POST",
            data:{rid:Wizard.rid},
            dataType: "json",
            success: function (r) {
                var data = r.obj;
                var info = "";
                if(data.base&&data.base.length>0){
                    info+="缺少基础录音："+data.base.join(',');
                }
                if(data.merge&&data.merge.length>0){
                    info+="\r\n缺少合并录音："+data.merge.join(',');
                }
                if(info==""){
                    success("未缺少录音");
                }else{
                    warning(info);
                }
            }
        })

};

Voice.init = function (rid) {
    var jqGrid = new JqGrid("#grid-table-4", "#grid-pager-4", Voice.initOptions(rid));
    Voice.table = jqGrid.init();
};
