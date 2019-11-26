var RobotVoice = {
    tableId: "#grid-table-5",
    pagerId: "#grid-pager-5",
    selectId: null, //grid选择的条目id
    table: null,
    domain: "regulation_list" ,
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
        shrinkToFit: true,
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
                    str ='<button class="control-auth btn btn-sm btn-primary"  data-auth="regulation_voice_enable" onclick="RobotVoice.enable(\''+id+'\');">启用</button>&nbsp;';
                }else{
                    str ='<button class="control-auth btn btn-sm btn-danger"  data-auth="regulation_voice_enable" onclick="RobotVoice.enable(\''+id+'\');">禁用</button>&nbsp;';
                }
                str +=  '<button class="control-auth btn btn-sm btn-info" data-auth="regulation_voice_edit" onclick="RobotVoice.createEditVoiceModal(\''+id+'\');">编辑</button>&nbsp;';
                str +=  '<button class="control-auth btn btn-sm btn-info" data-auth="regulation_voice_upload" onclick="RobotVoice.batchupload(\''+id+'\',\''+name+'\');">上传录音</button>&nbsp;';
                str +=  '<button class="control-auth btn btn-sm btn-info" data-auth="regulation_voice_sync" onclick="RobotVoice.syncVoiceModal(\''+id+'\');">录音同步</button>&nbsp;';
                return str;
            } }
        ],
        gridComplete: function () {
            $(RobotVoice.tableId).setGridWidth(document.body.clientWidth*0.6);
            var tabid = $("#addRobotVoiceBtn").parent().parent().attr("id");
            Wizard.refreshPermission(RobotVoice.domain,tabid);
        }
    };
    return options;
};




/**
 * 新增弹窗
 */
RobotVoice.createInsertVoiceModal = function () {
    $("#insertVoiceModal").find("input[name=rid]").val(Wizard.rid);
    $("#insertVoiceModal").modal();
};

/**
 * 编辑弹窗
 */
RobotVoice.createEditVoiceModal = function (id) {
    $("#editVoiceModal").find("input[name=rid]").val(Wizard.rid);
    $.ajax({
        url: "/voice/getVoice?id=" +id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var res = r.obj;
                var form = $("#editVoice-form");
                form.find("input[name='id']").val(res.id);
                form.find("input[name='name']").val(res.name);
                form.find("select[name='sex']").val(res.sex);
                $("#editVoiceModal").modal();
            }else{
                $("#editVoiceModal").modal();
            }
        }
    });
};

/**
 * 批量上传录音弹窗
 */
RobotVoice.batchupload = function (id,name) {
    $("#batchUploadVoice").find("input[name=rid]").val(Wizard.rid);
    $("#batchUploadVoice").find("input[name=id]").val(id);
    $("#batchUploadVoice").find("h2[name=name]").text(name+"的录音文件");
    $("#batchUploadVoice").modal();
};


/**
 * 批量上传录音弹窗
 */
RobotVoice.syncVoiceModal = function (id) {
    $("#syncVoiceModal").find("input[name=voiceId]").val(id);
    var ctiList = [];
    $.ajax({
        url: "/voice/getCtiList",
        type: 'GET',
        async: false,
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                ctiList = r.obj;
            }
        }
    });
    var str = '';
    for (var i = 0; i < ctiList.length; i++) {
        var cti = ctiList[i];
        str += '<label><input type="checkbox" name="cti" value="' + cti.id + '" ';
        str += '>' + cti.ip + '</label><br>';
    }

    $("#cti_container").html(str);
    $("#syncVoiceModal").modal();
};



function checkAll() {
    var all = document.getElementById('all');//获取到点击全选的那个复选框的id
    var one = document.getElementsByName('cti');//获取到复选框的名称
//因为获得的是数组，所以要循环 为每一个checked赋值
    for (var i = 0; i < one.length; i++) {
        one[i].checked = all.checked; //直接赋值不就行了嘛
    }

}
/**
 * 批量上传录音弹窗
 */
RobotVoice.syncVoice = function (id) {
    var id = $("#syncVoiceModal").find("input[name=voiceId]").val();
    var ctiIds = [];
    $.each($("#cti_container").find("input[name='cti']:checked"), function (index, data) {
        ctiIds.push(data.value);
    });
    $.ajax({
        url: "/voice/syncVoice?id="+id+"&rid="+Wizard.rid,
        type: 'POST',
        data: JSON.stringify({
            id: id,
            rid:Wizard.rid,
            ctiIds: ctiIds
        }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#syncVoiceModal").modal('hide');
                success("同步成功");
            }
        }
    });
};


RobotVoice.batchImport = function (obj) {
    var flag = 0;
    if (flag != 0) {
        return;
    }
    flag = 1;
    obj.disabled = true;
    var rid = $("#batchUploadVoice").find("input[name=rid]").val();
    var id = $("#batchUploadVoice").find("input[name=id]").val();
    if (rid == null || rid == "") {
        alert("请选择需要上传的录音！");
        flag = 0;
        obj.disabled = false;
        return;
    }
    //这里出现遮罩
    waitMask();
    var formData = new FormData($('#voiceImport-form')[0]);
    formData.append("rid", rid);
    formData.append("voiceNum",id)
    $.ajax({
        url: '/voice/batchUploadFile',
        type: 'POST',
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (r) {
            //这里遮罩消失
            clearMask();
            flag = 0;
            obj.disabled = false;
            if (r.code === 0) {
                info('导入成功！');
                $("#batchUploadVoice").modal("hide");
            } else {
                info('导入失败，请重新导入！');
                $("#batchUploadVoice").modal("hide");
            }
            RobotVoice.resetSearch();
        },
        error: function () {
            //这里遮罩消失
            clearMask();
            alert('服务错误请刷新后重新提交！');
            flag = 0;
            obj.disabled = false;
        }
    });
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


/**
 * 保存
 */
RobotVoice.insertVoice = function () {
    var rid =  $("#voice-form").find("input[name=rid]").val();
    var name =  $("#voice-form").find("input[name=name]").val();
    var sex =  $("#voice-form").find("select[name=sex]").val();
    $.ajax({
        url: "/voice/insertVoice",
        type: 'GET',
        data: {
            rid: rid,
            name:name,
            sex:sex
        },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#insertVoiceModal").modal("hide");
                success("保存成功");
                RobotVoice.resetSearch();
                $("#voice-form")[0].reset();
            }else if(r.code === 2) {
            }
        }
    })
};


/**
 * 更新话术
 */
RobotVoice.updateVoice = function () {
    var rid =  $("#editVoice-form").find("input[name=rid]").val();
    var id =  $("#editVoice-form").find("input[name=id]").val();
    var name =  $("#editVoice-form").find("input[name=name]").val();
    var sex =  $("#editVoice-form").find("select[name=sex]").val();
    $.ajax({
        url: "/voice/updateVoice",
        type: 'POST',
        data: JSON.stringify({
            id:id,
            rid: rid,
            name:name,
            sex:sex
        }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editVoiceModal").modal("hide");
                success("保存成功");
                $("#editVoice-form")[0].reset();
                RobotVoice.resetSearch();
            }else if(r.code === 2) {
            }
        }
    })
};




/**
 * 删除标签
 *
 * @param id
 */
RobotVoice.deleteVoiceRobot = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/voice/delete?id=" + id, function () {
            success("成功删除");
            RobotVoice.resetSearch();
        });
    })
};

RobotVoice.init = function (rid) {
    var jqGrid = new JqGrid("#grid-table-5", "#grid-pager-5", RobotVoice.initOptions(rid));
    RobotVoice.table = jqGrid.init();
};
