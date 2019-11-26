var Project = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    domain: "company",
    table: null,
    myswitchery:null,
    phoneswitchery:null,
    calltypeswitchery:null,
    // phoneencryptswitchery:null
};

//loading button
var ladda;
var editDualSelector;
//定时器
var interval;

/**
 * jqGrid初始化参数
 */
Project.initOptions = function () {
    var options = {
        url: "/project/grid",
        autowidth: true,
        // multiselect: true,
        // multiboxonly:true,
        // gridComplete: hideSelectAll,
        // beforeSelectRow: beforeSelectRow,
        postData: {
            companyid: $("#companyId2").val()
        },
        colNames: ['编号', '名称', '实时呼出数量', '实时接通数量', '实时接通率', '实时转接率', '坐席等待时长','在线坐席数', '并发数', '状态'/*, '创建时间'*/, '操作'],////, '处理队列'
        colModel: [
            {name: 'id', index: 'id', width: 50, sorttype: "int"},
            {name: 'name', index: 'name', width: 150, sortable: false},
            // {name: 'queue_name', index: 'queueName', width: 90, sortable: false},
            // {name: 'caller_config_name', index: 'caller_config_name', width: 20, sortable: false},
            {name: 'callnum', index: 'callnum', width: 90, sortable: false},
            {name: 'answernum', index: 'answernum', width: 90, sortable: false},
            {name: 'batchcallpercent', index: 'batchallpercent', width: 90, sortable: false},
            {name: 'batchtransferpercent', index: 'batchtransferpercent', width: 90, sortable: false},
            {name: 'stafffreetime', index: 'stafffreetime', width: 90, sortable: false},
            {name: 'staffNum', index: 'staffNum', width: 100, sortable: false},
            {name: 'botnum', index: 'botnum', width: 50, sortable: false},
            // {name: 'callpercent', index: 'callpercent', width: 30, sortable: false, formatter: function (cellValue) {
            //     return "1:" + (parseInt(cellValue) / 100);
            // }},
            {
                name: 'state', index: 'state', width: 60, sortable: false, formatter: function (cellValue) {
                    if (cellValue == 2) {
                        return "启动";
                    } else if (cellValue == 3) {
                        return "暂停";
                    }
                }
            },
            // {name: 'weight', index: 'weight', width: 20, sortable: false},
            /*{
                name: 'create_date',
                index: 'create_date',
                width: 150,
                sortable: false,
                formatter: function (cellValue, options, rowObject) {
                    return new Date(cellValue).toLocaleString();
                }
            }
            ,*/
            {
                name: 'operations',
                index: 'operations',
                width: 750,
                sortable: false,
                title:false,
                formatter: function (cellValue, options, rowObject) {
                    var id = rowObject["id"];
                    var str = '';
                    var state = rowObject["state"];
                    var offlineFlag = rowObject["offlineFlag"];
                    if (state == 2) {
                        str += '<button class="control-auth btn btn-sm btn-warning ladda-button"  data-auth="project_changestate" data-style="zoom-out" onclick="Project.switchStateStart(' + id + ', 3, this)">暂停</button>';
                        str += '<input type="button" class="control-auth btn btn-sm btn-primary"  data-auth="project_phone_batch" value="号码库" onclick="Project.phoneBatchList(' + id + ')"/>';
                        //if (offlineFlag == 1) {
                            str += '<input type="button" class="control-auth btn btn-sm btn-info" data-auth="project_make_staff_offline" value="预约下线" onclick="Project.showForMakeStaffOffline(' + id + ')"/>';
                        //}
                    } else {
                        str += '<button class="control-auth btn btn-sm btn-warning ladda-button"  data-auth="project_changestate" data-style="zoom-out" id="title'+id+'" onmouseover="Project.getTopTitle('+id+')" title="" onclick="Project.switchStateStop(' + id + ', 2, this)">启动</button>';
                        str += '<input type="button" class="control-auth btn btn-sm btn-primary"  data-auth="project_phone_batch" value="号码库" onclick="Project.phoneBatchList(' + id + ')"/>';
                        str += '<input type="button" class="control-auth btn btn-sm btn-info"  data-auth="project_smsTemplate" value="短信模板配置" onclick="Project.send(' + id + ')"/>';
                        str += '<input type="button" class="control-auth btn btn-sm btn-info"  data-auth="project_edit" value="外呼配置" onclick="Project.edit(' + id + ')"/>';
                        str += '<input type="button" class="control-auth btn btn-sm btn-info"  data-auth="project_update_caller" value="线路配置" onclick="Project.drawEdit(' + id + ')"/>';
                        str += '<input type="button" class="control-auth btn btn-sm btn-info"  data-auth="project_update_billing" value="计费配置" onclick="Project.billingConfig(' + id + ')"/>';
                        str += '<input type="button" class="control-auth btn btn-sm btn-info"  data-auth="project_editZX" value="配置坐席" onclick="Project.staffGroup.edit(' + id + ')"/>';
                        str += '<input type="button" class="control-auth btn btn-sm btn-info"  data-auth="project_update_group" value="项目分组配置" onclick="Project.editGroup(' + id + ')"/>';
                        str += '<input type="button" class="control-auth btn btn-sm btn-info"  data-auth="project_edit_warn" value="项目预警配置" onclick="Project.editWarn(' + id + ')"/>';
                        str += '<input type="button" class="control-auth btn btn-sm btn-info"  data-auth="project_url" value="地址" onclick="Project.url(' + id + ')"/>';
                        str += '<input type="button" class="control-auth btn btn-sm btn-info"  data-auth="project_recount_account" value="重新计算费用" onclick="Project.showForRecountAccount(' + id + ')"/>';
                        str += '<input type="button" class="control-auth btn btn-sm btn-danger"  data-auth="project_delete" value="删除" onclick="Project.delete(' + id + ')"/>';
                    }

                    return str;
                }
            }
        ],
        gridComplete: function () {
            refreshPermission(Project.domain);
            var ids = $("#grid-table").jqGrid('getDataIDs');
            if (ids.length != 0) {
                interval = setInterval(function () {
                    Project.concurrency();
                }, 3000);
            }
        }
    };
    return options;
};

function hideSelectAll() {
    $("#cb_grid-table").hide();
    return (true);
}

function beforeSelectRow(rowid, e) {
    $("#grid-table").jqGrid('resetSelection');
    return (true);
}
Project.getTopTitle = function(id){
    var elem = $("#title"+id);
    elem.attr("title","");
    $.ajax({
        url:"/project/getTitle?pid="+id,
        type:"GET",
        dataType:"JSON",
        success:function (r) {
            if(r.code===0){
                var data = r.obj;
                elem.attr("title","上次停止原因："+data.info);
            }
        }
    });
}
/**
 * 根据关键词搜索
 */
Project.search = function () {
    clearInterval(interval);
    var searchParam = {};
    searchParam.name = $("#name").val().trim();
    Project.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Project.resetSearch = function () {
    clearInterval(interval);
    $("#name").val("");
    Project.search();
    Project.getState();
};

Project.build = function (form) {
    var project = {};
    var regulations = new Array();
    var weights = new Array();
    jQuery('.regulationId').each(function (key, value) {
        regulations[key] = $(this).val();

    });
    jQuery('.rweight').each(function (key, value) {
        weights[key] = $(this).val();

    });
    var callerStr = "";
    var botnumStr = "";
    var regulationStr = "";
    var weightStr = "";
    for (var i = 0; i < regulations.length; i++) {
        regulationStr += regulations[i] + "#";
        weightStr += weights[i] + "#";
    }
    project.name = form.find("input[name='name']").val();
    var a = form.find("input[name='callerConfigId']");
    //project.callerStr = callerStr.substring(0,callerStr.length-1);
    project.extQueueId = form.find("select[name='extQueueId']").val();
    project.callPercent = form.find("select[name='callPercent']").val();
    project.companyId = form.find("input[name='companyId']").val();
    project.cid = form.find("select[name='categoryId']").val();
    project.labelGroupId = form.find("select[name='labelGroup']").val();
    // project.headerGroupId = form.find("select[name='headerGroup']").val();
    project.projectType = form.find("select[name='addprojectType']").val();
    project.leadstarget = form.find("input[name='leadstarget']").val();
    project.regulationStr = regulationStr.substring(0, regulationStr.length - 1);
    project.weightStr = weightStr.substring(0, weightStr.length - 1);
//    project.botnumStr = botnumStr.substring(0,botnumStr.length-1);
    project.regulationId = form.find("select[name='regulationId']").val();
    var callTime = {};
    callTime.flg = form.find("input[name='flg']").prop("checked") ? 1 : 0;
    var amStartHour = form.find("input[name='amStartHour']").val();
    var amStartMinute = form.find("input[name='amStartMinute']").val();
    var amEndHour = form.find("input[name='amEndHour']").val();
    var amEndMinute = form.find("input[name='amEndMinute']").val();
    var pmStartHour = form.find("input[name='pmStartHour']").val();
    var pmStartMinute = form.find("input[name='pmStartMinute']").val();
    var pmEndHour = form.find("input[name='pmEndHour']").val();
    var pmEndMinute = form.find("input[name='pmEndMinute']").val();
    callTime.amStartTime = handle(amStartHour) + ":" + handle(amStartMinute);
    callTime.amEndTime = handle(amEndHour) + ":" + handle(amEndMinute);
    callTime.pmStartTime = handle(pmStartHour) + ":" + handle(pmStartMinute);
    callTime.pmEndTime = handle(pmEndHour) + ":" + handle(pmEndMinute);

    var week = [];

    form.find("input[name='day']:checked").each(function () {
        week.push(parseInt($(this).val()));
    });
    callTime.week = week;
    project.callTime = JSON.stringify(callTime);

    function handle(str) {
        if (str.length === 1) {
            return "0" + str;
        }
        return str;
    }

    return project;
};
/**
 *  分配项目组
 * @param id
 */
Project.editGroup = function (id) {
    $.ajax({
        url: "/project/getGroup?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            $("#editGro").html("");
            if (r.code === 0) {
                var object = r.obj;
                var selectedId = object.selected;
                var projectId = object.id;
                var groups = object.groups;
                var str = "";
                if (selectedId != "") {

                    str += "<div class=\"row m-b-xs\">";
                    str += "<div class=\"col-sm-7\">";
                    str += "<select class=\"form-control edit-select1\" name=\"groupconfigId\" id='groupconfigId'>";
                    for (var j = 0; j < groups.length; j++) {
                        if (selectedId === groups[j].id) {
                            str += '<option value="' + groups[j].id + '" selected=\"selected\">' + groups[j].name + '</option>';
                        } else {
                            str += '<option value="' + groups[j].id + '">' + groups[j].name + '</option>';
                        }
                    }
                    str += "</select>";
                    str += "</div>";
                    str += "</div>";

                } else {
                    str += "<div class=\"row m-b-xs\">";
                    str += "<div class=\"col-sm-7\">";
                    str += "<select class=\"form-control edit-select1\" name=\"groupconfigId\" id='groupconfigId'>";
                    str += '<option value="" selected=\"selected\">请选择</option>';
                    for (var j = 0; j < groups.length; j++) {
                        str += '<option value="' + groups[j].id + '">' + groups[j].name + '</option>';
                    }
                }
                var form = $("#editGroup-form");
                form.find("input[name='id']").val(projectId);
                $("#editGro").append(str);
                $("#editGroup").modal();
            }
        }
    })
}

/**
 * 更新项目组配置
 */
Project.updateGroup = function () {
    var form = $("#editGroup-form");
    var ProjectGroupDto = {};
    ProjectGroupDto.id = form.find("input[name='id']").val();
    ProjectGroupDto.groupId = $("#groupconfigId").val();
    if (ProjectGroupDto.groupId === "") {
        info("项目组未分配");
        return;
    }
    // alert("更新")
    $.ajax({
        url: "/project/updateGroup",
        type: 'POST',
        data: JSON.stringify(ProjectGroupDto),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editGroup").modal("hide");
                Project.search();
                Project.getState();
                success("保存成功");
            }
        }

    })


}
Project.buildEdit = function (form) {
    var project = {};
    var regulations = new Array();
    var weights = new Array();
    jQuery('.regulationIdEdit').each(function (key, value) {
        regulations[key] = $(this).val();

    });
    jQuery('.rweightEdit').each(function (key, value) {
        weights[key] = $(this).val();

    });
    var regulationStr = "";
    var weightStr = "";
    for (var i = 0; i < regulations.length; i++) {
        regulationStr += regulations[i] + "#";
        weightStr += weights[i] + "#";
    }
    project.name = form.find("input[name='name']").val();
    project.maxcalltimeout = form.find("input[name='maxcalltimeout']").val();
    // var a = form.find("input[name='callerConfigId']");
    // project.callPercent = form.find("select[name='callPercent']").val();
    project.companyId = form.find("input[name='companyId']").val();
    project.labelGroupId = form.find("select[name='labelGroup']").val();
    // project.headerGroupId = form.find("select[name='headerGroup']").val();
    project.failquestionGroupId =form.find("select[name='failquestionGroup']").val();
    project.cid = form.find("select[name='categoryIdEdit']").val();
    project.projectType = form.find("select[name='projectType']").val();
    project.regulationStr = regulationStr.substring(0,regulationStr.length-1);
    project.weightStr = weightStr.substring(0,weightStr.length-1);
    project.leadstarget = form.find("input[name='leadstarget']").val();
    project.regulationStr = regulationStr.substring(0, regulationStr.length - 1);
    project.weightStr = weightStr.substring(0, weightStr.length - 1);
    var callTime = {};
    callTime.flg = form.find("input[name='flg']").prop("checked") ? 1 : 0;
    var amStartHour = form.find("input[name='amStartHour']").val();
    var amStartMinute = form.find("input[name='amStartMinute']").val();
    var amEndHour = form.find("input[name='amEndHour']").val();
    var amEndMinute = form.find("input[name='amEndMinute']").val();
    var pmStartHour = form.find("input[name='pmStartHour']").val();
    var pmStartMinute = form.find("input[name='pmStartMinute']").val();
    var pmEndHour = form.find("input[name='pmEndHour']").val();
    var pmEndMinute = form.find("input[name='pmEndMinute']").val();
    callTime.amStartTime = handle(amStartHour) + ":" + handle(amStartMinute);
    callTime.amEndTime = handle(amEndHour) + ":" + handle(amEndMinute);
    callTime.pmStartTime = handle(pmStartHour) + ":" + handle(pmStartMinute);
    callTime.pmEndTime = handle(pmEndHour) + ":" + handle(pmEndMinute);
    var week = [];
    form.find("input[name='day']:checked").each(function () {
        week.push(parseInt($(this).val()));
    });
    callTime.week = week;
    project.callTime = JSON.stringify(callTime);

    function handle(str) {
        if (str.length === 1) {
            return "0" + str;
        }
        return str;
    }
    //获取是否打开三网形式
    project.phonetype = document.querySelector("#editModal #switchThree").checked;
    //M1H2固定并发
    project.calltype = document.querySelector("#editModal #calltype").checked;
    //手机号是否加密
    // project.phoneencrypt=document.querySelector("#editModal #phoneencrypt").checked;
    return project;
};
/**
 * 新增弹框
 */
Project.create = function () {
    $("#insert1").nextAll().remove();
    $("#regulation").nextAll().remove();
    var categoryId = $("#categoryId").val();
    $.ajax({
        url: "/project/getregulation?categoryId=" + categoryId,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            if (r.code == 0) {
                $("#regulationId").empty();
                var list = r.obj;
                console.log(list);
                var html = "";
                for (var i = 0; i < list.length; i++) {
                    if (i === 0) {
                        html += "<option selected value='" + list[i].id + "'>" + list[i].tag + list[i].version + "</option>";
                    } else {
                        html += "<option value='" + list[i].id + "'>" + list[i].tag + list[i].version + "</option>";
                    }
                }
                $("#regulationId").append(html);
                $("#createModal").modal();
            }
        }
    })
};
/**
 *
 */
Project.changeSelect = function () {
    var categoryId = $("#categoryId").val();
    $.ajax({
        url: "/project/getregulation?categoryId=" + categoryId,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            if (r.code == 0) {
                $("#regulationId").empty();
                var list = r.obj;
                console.log(list);
                var html = "";
                for (var i = 0; i < list.length; i++) {
                    if (i === 0) {
                        html += "<option selected value='" + list[i].id + "'>" + list[i].tag + list[i].version + "</option>";
                    } else {
                        html += "<option value='" + list[i].id + "'>" + list[i].tag + list[i].version + "</option>";
                    }
                }
                $("#regulationId").append(html);
            } else {
                Alert("错误", r.msg);
            }
        },
    })
}
/**
 * 新增项目时新增线路选择.
 *
 */
Project.addRegulationDiv = function () {
    var categoryId = $("#categoryId").val();
    $.ajax({
        url: "/project/getregulation?categoryId=" + categoryId,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            if (r.code == 0) {
                var list = r.obj;
                var html = "";
                html += "<div class=\"row m-b-xs\">";
                html += "<div class=\"col-sm-7\">";
                html += "<select name='regulationId' class='form-control regulationId'>"
                for (var i = 0; i < list.length; i++) {
                    if (i === 0) {
                        html += "<option selected value='" + list[i].id + "'>" + list[i].tag + list[i].version + "</option>";
                    } else {
                        html += "<option value='" + list[i].id + "'>" + list[i].tag + list[i].version + "</option>";
                    }
                }
                html += "</select>";
                html += "</div><div class=\"col-sm-4  p-l-none\">";
                html += "<input type=\"text\" class=\"form-control rweight\" name=\"rweight\"/></div>";
                html += "<div class=\"col-sm-1  p-l-none\"> <i class=\"fa fa-minus minus-btn\"  onclick=\"Project.removecallerDiv(this)\"></i>";
                html += "</div></div>";
                $("#newRegulation").append(html);
            } else {
                Alert("错误", r.msg);
            }
        },
    })
}
/**
 * 编辑项目时新增线路选择
 */
Project.addRegulationDiv2 = function () {
    var categoryId = $("#categoryIdEdit").val();
    $.ajax({
        url: "/project/getregulation?categoryId=" + categoryId,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            if (r.code == 0) {
                var list = r.obj;
                var html = "";
                html += "<div class=\"row m-b-xs\">";
                html += "<div class=\"col-sm-7\">";
                html += "<select name='regulationIdEdit' class='form-control regulationIdEdit'>";
                for (var i = 0; i < list.length; i++) {
                    if (i === 0) {
                        html += "<option selected='selected' value='" + list[i].id + "'>" + list[i].tag + list[i].version + "</option>";
                    } else {
                        html += "<option value='" + list[i].id + "'>" + list[i].tag + list[i].version + "</option>";
                    }
                }
                html += "</select>";
                html += "</div><div class=\"col-sm-4  p-l-none\">";
                html += "<input type=\"text\" class=\"form-control rweightEdit\" name=\"rweightEdit\"/>";
                html += " </div><div class=\"col-sm-1  p-l-none\">";
                html += " <i class=\"fa fa-minus minus-btn\"  onclick=\"Project.removecallerDiv(this)\"></i>";
                html += "</div></div>";
                $("#editRegulationDiv").append(html);

            } else {
                Alert("错误", r.msg);
            }
        },
    })
}
Project.addBillingDiv = function () {
    var str = "<div class=\"row m-b-xs\">";
    str += "<div class=\"col-sm-3\">";
    str += "<input type=\"text\" class=\"form-control ai-min\" name=\"minnum\" value=''/>";
    ;
    str += "</div>";
    str += "<div class=\"col-sm-3\">";
    str += "<input type=\"text\" class=\"form-control ai-max\" name=\"minnum\" value=''/>";
    ;
    str += "</div><div class=\"col-sm-3  p-l-none\">";
    str += "<input type=\"text\" class=\"form-control ai-money\" name=\"minnum\" value=''/>";
    ;
    str += " </div><div class=\"col-sm-1  p-l-none\">";
    str += "<i class=\"fa fa-minus minus-btn\"  onclick=\"Project.removecallerDiv(this)\"></i>";
    $("#billingAIDiv").append(str);

}
Project.addBillingDiv2 = function () {
    var str = "<div class=\"row m-b-xs\">";
    str += "<div class=\"col-sm-3\">";
    str += "<input type=\"text\" class=\"form-control call-min\" name=\"num\" value=''/>";
    ;
    str += "</div>";
    str += "<div class=\"col-sm-3\">";
    str += "<input type=\"text\" class=\"form-control call-max\" name=\"minnum\" value=''/>";
    ;
    str += "</div><div class=\"col-sm-3  p-l-none\">";
    str += "<input type=\"text\" class=\"form-control call-money\" name=\"minnum\" value=''/>";
    ;
    str += " </div><div class=\"col-sm-1  p-l-none\">";
    str += "<i class=\"fa fa-minus minus-btn\"  onclick=\"Project.removecallerDiv(this)\"></i>";
    $("#billingCallDiv").append(str);

}
/**
 * 编辑时新增线路选择
 */
Project.addcallerDiv = function () {
    $.ajax({
        type: 'get',
        url: "/project/getAllCaller",
        async: false,
        success: function (r) {
            var callerList = r.obj;
            var length = $("#editDiv").children('div').length;
            var str = "";
            str += "<div class=\"row m-b-xs\">";
            str += "<div class=\"col-sm-7\">";
            str += "<select class=' form-control edit-select chosen-select' name='callerConfigId'>";
            for (var i = 0; i < callerList.length; i++) {
                var caller = callerList[i];
                str += "<option value='" + caller.id + "'>" + caller.name + "</option>";
            }
            str += " </select>";
            str += "</div><div class=\"col-sm-4  p-l-none\">";
            str += "<input type=\"text\" class=\"form-control edit-text\" style=\"height:30px\" name=\"botnum\" >";
            str += " </div><div class=\"col-sm-1  p-l-none\">";
            str += " <i class=\"fa fa-minus minus-btn\"  onclick=\"Project.removecallerDiv(this)\"></i>";
            str += "</div></div>";
            $("#editDiv").append(str);
            $(".edit-select").chosen({width: "100%"});
        }
    })
}
/**
 * 编辑时删除
 */
Project.removecallerDiv = function (btn) {

    $(btn).parent().parent().remove();


}
/**
 * 新增时增加线路选择
 */
Project.addcallerDiv2 = function () {

    var str = "";
    $.ajax({
        url: "/project/getAllCaller",
        async: false,
        success: function (r) {
            var callerList = r.obj;
            var length = $("#insertDiv").children('div').length;
            str += "<div class=\"row m-b-xs\">";
            str += "<div class=\"col-sm-7\">";
            str += "<select class='form-control insert-select' name='callerConfigId'>";
            for (var i = 0; i < callerList.length; i++) {
                var caller = callerList[i];
                str += "<option value='" + caller.id + "'>" + caller.name + "</option>";
            }
            str += " </select>";
            str += "</div><div class=\"col-sm-4  p-l-none\">";
            str += "<input type=\"text\" class=\"form-control insert-text\" name=\"botnum\" >";
            str += " </div><div class=\"col-sm-1  p-l-none\">";
            str += " <i class=\"fa fa-minus minus-btn\"  onclick=\"Project.removecallerDiv(this)\"></i>";
            str += "</div></div>";
            $("#insertDiv").append(str);
        }
    })
}
/**
 * 新增时删除
 */
Project.removecallerDiv2 = function (btn) {
    $(btn).parent().remove();
}
Project.changeSelectEdit = function (cid, regulationId) {
    var categoryId = 0;
    if (categoryId != 0) {
        categoryId = cid;
    } else {
        categoryId = $("#categoryIdEdit").val();
    }

    $.ajax({
        url: "/project/getregulation?categoryId=" + categoryId,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            if (r.code == 0) {
                $("#editRegulationDiv").empty();
                var list = r.obj;
                console.log(list);
                var html = "";
                html += "<div class=\"row m-b-xs\">";
                html += "<div class=\"col-sm-7\">";
                html += "<select class=\"form-control regulationIdEdit\" name=\"regulationIdEdit\">";
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id == regulationId) {
                        html += "<option selected value='" + list[i].id + "'>" + list[i].tag + list[i].version + "</option>";
                    } else {
                        html += "<option value='" + list[i].id + "'>" + list[i].tag + list[i].version + "</option>";
                    }
                }
                html += "</select>";
                html += "</div><div class=\"col-sm-4  p-l-none\">";
                html += "<input type=\"text\" class=\"form-control rweightEdit\" name=\"rweight\"/>";
                html += " </div><div class=\"col-sm-1  p-l-none\">";
                html += "<i class=\"fa fa-plus plus-btn\"  onclick=\"Project.addRegulationDiv2()\"></i>";
                html += "</div></div>";
                $("#editRegulationDiv").append(html);
            } else {
                Alert("错误", r.msg);
            }
        },
    })
}
// Project.changeSelectEdit2 = function(regulationId){
//     var categoryId = $("#categoryIdEdit").val();
//     $.ajax({
//         url: "/project/getregulation?categoryId=" + categoryId,
//         contentType: "application/json;charset=utf-8",
//         dataType: "json",
//         async: false,
//         success: function (r) {
//             if (r.code == 0) {
//                 $("#regulationIdEdit").empty();
//                 var list = r.obj;
//                 console.log(list);
//                 var html = "";
//                 for (var i = 0; i < list.length; i++) {
//                     if (list[i].id == regulationId) {
//                         html += "<option selected value='" + list[i].id + "'>" + list[i].tag + list[i].version +"</option>";
//                     } else {
//                         html += "<option value='" + list[i].id + "'>" + list[i].tag + list[i].version +"</option>";
//                     }
//                 }
//                 $("#regulationIdEdit").append(html);
//             } else {
//                 Alert("错误", r.msg);
//             }
//         },
//     })
// }
/**
 * 保存
 */
Project.insert = function () {
    var createForm = $("#create-form");
    var project = Project.build(createForm);
    if (Project.validate(project)) {
        $.ajax({
            url: "/project/insert",
            type: 'POST',
            data: JSON.stringify(project),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    $("#createModal").modal("hide");
                    success("保存成功");
                    Project.search();
                    Project.getState();
                    $("#create-form")[0].reset();
                }
            }
        });
    }
};
Project.billingConfig = function (id) {
    $.ajax({
        url: "/project/getBilling?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            $("#billingAIDiv").html("");
            $("#billingCallDiv").html("");
            if (r.code === 0) {
                var object = r.obj;
                var aiBillings = object.aiBilling;
                var callBillings = object.callBilling;
                var project = object.project;
                var str = "<label class=\"col-sm-3 \">AI计费</label>"
                str += "<div class=\"row m-b-xs\">";
                str += "<div class=\"col-sm-12\">";
                str += "<label class=\"col-sm-3 \" style='padding-top: 6px'>梯度起点</label>";
                str += "<label class=\"col-sm-3 \" style='padding-top: 6px'>梯度终点</label>";
                str += "<label class=\"col-sm-4 \" style='padding-top: 6px'>计费单价(厘)</label>";
                str += "</div>";
                str += "</div>";
                if (aiBillings.length > 0) {
                    for (var i = 0; i < aiBillings.length; i++) {
                        str += "<div class=\"row m-b-xs\">";
                        str += "<div class=\"col-sm-3\">";
                        str += "<input type=\"text\" class=\"form-control ai-min\" name=\"minnum\" value='" + aiBillings[i].minnum + "'/>";
                        ;
                        str += "</div>";
                        str += "<div class=\"col-sm-3\">";
                        console.log(aiBillings[i].maxnum)
                        if (aiBillings[i].maxnum == undefined) {
                            str += "<input type=\"text\" class=\"form-control ai-max\" name=\"minnum\" value=''/>";
                            ;
                        } else {
                            str += "<input type=\"text\" class=\"form-control ai-max\" name=\"\" value='" + aiBillings[i].maxnum + "'/>";
                        }
                        str += "</div><div class=\"col-sm-3  p-l-none\">";
                        str += "<input type=\"text\" class=\"form-control ai-money\" name=\"minnum\" value='" + aiBillings[i].money + "'/>";
                        ;
                        str += " </div><div class=\"col-sm-1  p-l-none\">";
                        if (i == 0) {
                            str += "<i class=\"fa fa-plus plus-btn\"  onclick=\"Project.addBillingDiv()\"></i>";
                        } else {
                            str += "<i class=\"fa fa-minus minus-btn\"  onclick=\"Project.removecallerDiv(this)\"></i>";

                        }
                        str += "</div>";
                        str += "</div>";
                    }
                } else {
                    str += "<div class=\"row m-b-xs\">";
                    str += "<div class=\"col-sm-3\">";
                    str += "<input type=\"text\" class=\"form-control ai-min\" name=\"minnum\" />";
                    ;
                    str += "</div>";
                    str += "<div class=\"col-sm-3\">";
                    str += "<input type=\"text\" class=\"form-control ai-max\" name=\"minnum\" value=''/>";
                    ;
                    str += "</div><div class=\"col-sm-3  p-l-none\">";
                    str += "<input type=\"text\" class=\"form-control ai-money\" name=\"minnum\" value=''/>";
                    ;
                    str += " </div><div class=\"col-sm-1  p-l-none\">";
                    str += "<i class=\"fa fa-plus plus-btn\"  onclick=\"Project.addBillingDiv()\"></i>";
                    str += "</div>";
                    str += "</div>";
                }
                $("#billingAIDiv").append(str);
                str = "";
                str += "<label class=\"col-sm-3 \" style='padding-top: 6px'>通话计费</label>";
                str += "<div style='clear: both'></div><div class=\"row m-b-xs\">";
                str += "<label class=\"col-sm-3\" style='padding-top: 6px'>计费时长(s)</label>";
                str += "<div class=\"col-sm-3\">";
                str += "<input type=\"text\" class=\"form-control \" name=\"second\" value=''/>";
                str += "</div></div>";
                str += "<div class=\"row m-b-xs\">";
                str += "<div class=\"col-sm-12\">";
                str += "<label class=\"col-sm-3\" style='padding-top: 6px'>梯度起点</label>";
                ;
                str += "<label class=\"col-sm-3 \" style='padding-top: 6px'>梯度终点</label>";
                ;
                str += "<label class=\"col-sm-4 \" style='padding-top: 6px'>计费单价(厘)</label>";
                str += "</div></div>";
                if (callBillings.length > 0) {
                    for (var i = 0; i < callBillings.length; i++) {
                        str += "<div class=\"row m-b-xs\">";
                        str += "<div class=\"col-sm-3\">";
                        str += "<input type=\"text\" class=\"form-control call-min\" name=\"\" value='" + callBillings[i].minnum + "'/>";
                        ;
                        str += "</div>";
                        str += "<div class=\"col-sm-3\">";
                        console.log(callBillings[i].maxnum)
                        if (callBillings[i].maxnum == undefined) {
                            str += "<input type=\"text\" class=\"form-control call-max\" name=\"\" value=''/>";
                        } else {
                            str += "<input type=\"text\" class=\"form-control call-max\" name=\"\" value='" + callBillings[i].maxnum + "'/>";
                        }
                        str += "</div><div class=\"col-sm-3  p-l-none\">";
                        str += "<input type=\"text\" class=\"form-control call-money\" name=\"\" value='" + callBillings[i].money + "'/>";
                        str += " </div><div class=\"col-sm-1  p-l-none\">";
                        if (i == 0) {
                            str += "<i class=\"fa fa-plus plus-btn\"  onclick=\"Project.addBillingDiv2()\"></i>";
                        } else {
                            str += "<i class=\"fa fa-minus minus-btn\"  onclick=\"Project.removecallerDiv(this)\"></i>";

                        }
                        str += "</div>";
                        str += "</div>";
                    }
                } else {
                    str += "<div class=\"row m-b-xs\">";
                    str += "<div class=\"col-sm-3\">";
                    str += "<input type=\"text\" class=\"form-control call-min\" name=\"minnum\" value=''/>";
                    str += "</div>";
                    str += "<div class=\"col-sm-3\">";
                    str += "<input type=\"text\" class=\"form-control call-max\" name=\"minnum\" value=''/>";
                    str += "</div><div class=\"col-sm-3  p-l-none\">";
                    str += "<input type=\"text\" class=\"form-control call-money\" name=\"minnum\" value=''/>";
                    str += " </div><div class=\"col-sm-1  p-l-none\">";
                    str += "<i class=\"fa fa-plus plus-btn\"  onclick=\"Project.addBillingDiv2()\"></i>";
                    str += "</div>";
                    str += "</div>";
                }
                var form = $("#billing-form");
                $("#billingCallDiv").append(str);
                form.find("input[name='id']").val(project.id);
                form.find("input[name='second']").val(project.second);
                $("#editBilling").modal();
            }
        }
    })
}
Project.drawEdit = function (id) {
    $.ajax({
        url: "/project/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            $("#editDiv").html("");
            if (r.code === 0) {
                var object = r.obj;
                var callerIdList = object.callerIdList;
                var project = object.project;
                var callerConfigList = object.callerConfigList;
                var str = "";
                if (callerIdList.length > 0) {
                    for (var i = 0; i < callerIdList.length; i++) {

                        str += "<div class=\"row m-b-xs\">";
                        str += "<div class=\"col-sm-7\">";
                        str += "<select class=\"form-control edit-select chosen-select\" name=\"callerConfigId\">";
                        for (var j = 0; j < callerConfigList.length; j++) {
                            if (callerIdList[i].callerid == callerConfigList[j].id) {
                                str += '<option value="' + callerConfigList[j].id + '" selected=\"selected\">' + callerConfigList[j].name + '</option>';
                            } else {
                                str += '<option value="' + callerConfigList[j].id + '">' + callerConfigList[j].name + '</option>';
                            }
                        }
                        str += "</select>";
                        str += "</div><div class=\"col-sm-4  p-l-none\">";
                        str += "<input type=\"text\" class=\"form-control edit-text\" style=\"height:30px\" name=\"botnum\" value='" + callerIdList[i].weight + "'>";
                        str += " </div><div class=\"col-sm-1  p-l-none\">";
                        if (i == 0) {
                            str += "<i class=\"fa fa-plus plus-btn\"  onclick=\"Project.addcallerDiv()\"></i>";
                        } else {
                            str += "<i class=\"fa fa-minus minus-btn\"  onclick=\"Project.removecallerDiv(this)\"></i>";

                        }
                        str += "</div>";
                        str += "</div>";
                    }
                } else {
                    str += "<div class=\"row m-b-xs\">";
                    str += "<div class=\"col-sm-7\">";
                    str += "<select class=\"form-control edit-select\" name=\"callerConfigId\">";
                    for (var j = 0; j < callerConfigList.length; j++) {
                        str += '<option value="' + callerConfigList[j].id + '">' + callerConfigList[j].name + '</option>';
                    }
                    str += "</select>";
                    str += "</div><div class=\"col-sm-4  p-l-none\">";
                    str += "<input type=\"text\" class=\"form-control edit-text\" style=\"height:30px\" name=\"botnum\" >";
                    str += "</div><div class=\"col-sm-1  p-l-none\"> <i class=\"fa fa-plus plus-btn\"  onclick=\"Project.addcallerDiv()\"></i>";
                    str += "</div></div>";
                }
                var form = $("#editCallrer-form");
                form.find("input[name='id']").val(project.id);
                $("#editDiv").append(str);
                $("#editCaller").modal();
                $(".edit-select").chosen({width: "100%"});
            }
        }
    })
}

Project.drawEditRegulation = function (projectRids, rids) {
    var str = "";
    if (projectRids.length > 0) {
        for (var i = 0; i < projectRids.length; i++) {
            str += "<div class=\"row m-b-xs\">";
            str += "<div class=\"col-sm-7\">";
            str += "<select class=\"form-control regulationIdEdit\" name=\"regulationIdEdit\">";
            for (var j = 0; j < rids.length; j++) {
                if (projectRids[i].rid == rids[j].id) {
                    str += '<option value="' + rids[j].id + '" selected=\"selected\">' + rids[j].tag + rids[j].version + '</option>';
                } else {
                    str += '<option value="' + rids[j].id + '" >' + rids[j].tag + rids[j].version + '</option>';
                }
            }
            str += "</select>";
            str += "</div><div class=\"col-sm-4  p-l-none\">";
            str += "<input type=\"text\" class=\"form-control rweightEdit\" name=\"rweightEdit\" value='" + projectRids[i].weight + "'/>";
            str += " </div><div class=\"col-sm-1  p-l-none\">";
            if (i == 0) {
                str += "<i class=\"fa fa-plus plus-btn\"  onclick=\"Project.addRegulationDiv2()\"></i>";
            } else {
                str += "<i class=\"fa fa-minus minus-btn\"  onclick=\"Project.removecallerDiv(this)\"></i>";
            }
            str += "</div></div>";
        }
    } else {
        str += "<div class=\"row m-b-xs\">";
        str += "<div class=\"col-sm-7\">";
        str += "<select class=\"form-control regulationIdEdit\" name=\"regulationIdEdit\">";
        for (var j = 0; j < rids.length; j++) {
            str += '<option value="' + rids[j].id + '" >' + rids[j].tag + rids[j].version + '</option>';
        }
        str += "</select>";
        str += "</div><div class=\"col-sm-4  p-l-none\">";
        str += "<input type=\"text\" class=\"form-control rweightEdit\" name=\"rweight\"/>";
        str += " </div><div class=\"col-sm-1  p-l-none\">";
        str += "<i class=\"fa fa-plus plus-btn\"  onclick=\"Project.addRegulationDiv2()\"></i>";
        str += "</div></div>";
    }
    console.log(str)
    $("#editRegulationDiv").append(str);
}
/**
 * 编辑弹框
 */
Project.edit = function (id) {
    $.ajax({
        url: "/project/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            $("#editRegulationDiv").html("");
            if (r.code === 0) {
                var object = r.obj;
                var project = object.project;
                var projectRids = object.projectRids;
                var rids = object.rids;
                Project.drawEditRegulation(projectRids, rids);//渲染规则
                var form = $("#edit-form");
                form.find("input[name='name']").val(project.name);
                form.find("input[name='maxcalltimeout']").val(project.maxcalltimeout);
                form.find("input[name='id']").val(project.id);
                // form.find("select[name='callerConfigId']").val(project.callerid);
                // form.find("select[name='extQueueId']").val(project.extqueueid);
                // form.find("select[name='callPercent']").val(project.callpercent);
                form.find("select[name='categoryIdEdit']").val(project.cid);
                form.find("select[name='labelGroup']").val(project.labelGroupId);
                // form.find("select[name='headerGroup']").val(project.headerGroupId);
                form.find("select[name='failquestionGroup']").val(project.failquestionGroupId);
                form.find("select[name='projectType']").val(project.type);
                form.find("input[name='leadstarget']").val(project.leadstarget);
                // form.find("input[name='botnum']").val(project.botnum);
                // Project.changeSelectEdit(project.cid,project.rid);

                var callTime = JSON.parse(project.calltime);
                if (callTime.flg == 0) {
                    form.find("input[name='flg']").prop("checked", false);
                } else {
                    form.find("input[name='flg']").prop("checked", true);
                }
                var amStartArr = callTime.amStartTime.split(":");
                form.find("input[name='amStartHour']").val(amStartArr[0]);
                form.find("input[name='amStartMinute']").val(amStartArr[1]);
                var amEndArr = callTime.amEndTime.split(":");
                form.find("input[name='amEndHour']").val(amEndArr[0]);
                form.find("input[name='amEndMinute']").val(amEndArr[1]);
                var pmStartArr = callTime.pmStartTime.split(":");
                form.find("input[name='pmStartHour']").val(pmStartArr[0]);
                form.find("input[name='pmStartMinute']").val(pmStartArr[1]);
                var pmEndArr = callTime.pmEndTime.split(":");
                form.find("input[name='pmEndHour']").val(pmEndArr[0]);
                form.find("input[name='pmEndMinute']").val(pmEndArr[1]);
                var week = callTime.week;
                $.each(week, function (index, value) {
                    form.find("input[name='day'][value=" + value + "]").prop("checked", true);
                });
                $("#editModal").modal();
                if (project.type == 0) {
                    $("#regulationEdit").show();
                } else {
                    $("#regulationEdit").hide();
                }
                if(project.phonetype==1){
                    setSwitchery(Project.phoneswitchery,true);
                }else {
                    setSwitchery(Project.phoneswitchery,false);
                }
                if (project.calltype==1) {
                    setSwitchery(Project.calltypeswitchery,true);
                } else {
                    setSwitchery(Project.calltypeswitchery,false);
                }
                // if (project.encryptphone==1) {
                //     setSwitchery(Project.phoneencryptswitchery,true);
                // } else {
                //     setSwitchery(Project.phoneencryptswitchery,false);
                // }
            }
        }
    })
};

/**
 * 更新规则 时间
 */
Project.update = function () {
    var form = $("#edit-form");
    var project = Project.buildEdit(form);
    project.id = form.find("input[name='id']").val();
    if (project.maxcalltimeout === undefined || project.maxcalltimeout < 0) {
        toastr.error("通话限制配置错误", "error");
        return;
    }
    console.log(project);
    if (Project.validate(project)) {
        $.ajax({
            url: "/project/update",
            type: 'POST',
            data: JSON.stringify(project),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    $("#editModal").modal("hide");
                    Project.search();
                    Project.getState();
                    success("保存成功");
                }
            }

        })
    }
};
Project.getArray = function (key) {
    var arr = new Array();
    jQuery(key).each(function (key, value) {
        arr[key] = $(this).val();
    });
    return arr;
}
Project.getTextArray = function (key) {
    var arr = new Array();
    jQuery(key).each(function (key, value) {
       var o= $(this).find('option:selected');
        arr[key] = o.text();
    });
    return arr;
}
Project.getCheckArray = function (key) {
    var arr = new Array();
    jQuery(key).each(function (key, value) {
        var temarr = new Array();
        $(this).find(":checkbox").each(function () {
            if ($(this).is(':checked')) {
                temarr.push($(this).val());
            }
        });
        var vals = temarr.join(",");
        arr[key] = vals;
    });
    return arr;
}

/**
 * 更新计费规则
 */
Project.updateBilling = function () {
    var form = $("#billing-form");
    var billing = {};
    var aimins = Project.getArray('.ai-min');
    var aimaxs = Project.getArray('.ai-max'); //或者写成：var btns= [];
    var aimoneys = Project.getArray('.ai-money'); //或者写成：var btns= [];
    var callmins = Project.getArray('.call-min');
    var callmaxs = Project.getArray('.call-max'); //或者写成：var btns= [];
    var callmoneys = Project.getArray('.call-money'); //或者写成：var btns= [];
    var aimin = "";
    var aimax = "";
    var aimoney = "";
    var callmin = "";
    var callmax = "";
    var callmoney = "";
    for (var i = 0; i < aimins.length; i++) {
        aimin += aimins[i] + "#";
        aimax += aimaxs[i] + "#";
        aimoney += aimoneys[i] + "#";
    }
    for (var i = 0; i < callmins.length; i++) {
        callmin += callmins[i] + "#";
        callmax += callmaxs[i] + "#";
        callmoney += callmoneys[i] + "#";
    }
    billing.second = form.find("input[name='second']").val();
    billing.id = form.find("input[name='id']").val();
    billing.companyId = form.find("input[name='companyId']").val();
    billing.aimin = aimin.substring(0, aimin.length - 1);
    billing.aimax = aimax.substring(0, aimax.length - 1);
    billing.aimoney = aimoney.substring(0, aimoney.length - 1);
    billing.callmin = callmin.substring(0, callmin.length - 1);
    billing.callmax = callmax.substring(0, callmax.length - 1);
    billing.callmoney = callmoney.substring(0, callmoney.length - 1);
    if (Project.validateBilling(billing)) {
        $.ajax({
            url: "/project/updateBilling",
            type: 'POST',
            data: JSON.stringify(billing),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    $("#editBilling").modal("hide");
                    Project.search();
                    Project.getState();
                    success("保存成功");
                }
            }

        })
    }

}
/**
 * 更新线路配置
 */
Project.updateCaller = function () {
    var form = $("#editCallrer-form");
    var project = {};
    var callerIds = new Array();
    var botnums = new Array(); //或者写成：var btns= [];
    jQuery('.edit-select').each(function (key, value) {
        callerIds[key] = $(this).val();

    });
    jQuery('.edit-text').each(function (key, value) {
        botnums[key] = $(this).val();

    });
    var callerStr = "";
    var botnumStr = "";
    for (var i = 0; i < callerIds.length; i++) {
        callerStr += callerIds[i] + "#";
        botnumStr += botnums[i] + "#";
    }
    project.id = form.find("input[name='id']").val();
    project.companyId = form.find("input[name='companyId']").val();
    project.callerStr = callerStr;
    project.botnumStr = botnumStr;
    if (Project.validateCaller(project)) {
        $.ajax({
            url: "/project/updateCaller",
            type: 'POST',
            data: JSON.stringify(project),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    $("#editCaller").modal("hide");
                    Project.search();
                    Project.getState();
                    success("保存成功");
                }
            }

        })
    }

}
Project.validateBilling = function (billing) {
    var aimin = billing.aimin.split("#");
    var aimax = billing.aimax.split("#");
    var aimoney = billing.aimoney.split("#");
    var callmin = billing.callmin.split("#");
    var callmax = billing.callmax.split("#");
    var callmoney = billing.callmoney.split("#");
    var second = billing.second;
    var reg = /^\+?[1-9][0-9]*$/;
    //var regu = /^\d+(\.{0,1}\d+){0,1}$/;
    var regu = /^\d+$/;
    var re = new RegExp(reg);
    var re2 = new RegExp(regu);
    if (!re.test(second)) {
        toastr.error("计费时长必须为正整数", "error");
        return false;
    }
    //如果没有配置线路i
    if (aimin.length === 1 && aimin[0] == "") {
        toastr.error("必须设置AI计费", "error");
        return false;
    }
    if (aimin.length !== aimax.length || aimoney.length !== aimin.length) {
        toastr.error("计费规则有误", "error");
        return false;
    }
    for (var i = 0; i < aimin.length; i++) {
        var ii = i;
        var min = aimin[i];
        var max = aimax[i];
        if (!re2.test(aimoney[i])) {
            toastr.error("项目计费为整数", "error");
            return false;
        }
        if (parseInt(min) >= parseInt(max)) {
            toastr.error("同梯度起点应小于终点", "error");
            return false;
        }
        if (aimin[i] == "" || aimoney[i] == "") {
            toastr.error("非最后终点不能设空值", "error");
            return false;
        } else {
            if (i !== aimin.length - 1 && aimax[i] == "") {
                toastr.error("非最后终点不能设空值", "error");
                return false;
            }
        }
        if (i == 0) {
            continue;
        } else {
            if (parseInt(aimin[i]) <= parseInt(aimax[i - 1])) {
                toastr.error("起点必须比上梯度终点高", "error");
                return false;
            }
        }
    }

    if (callmin.length === 1 && callmin[0] == "") {
        if (billing.second == "") {
            toastr.error("通话计费必须设置计费时长", "error");
            return false;
        }
        toastr.error("必须设置通话计费", "error");
        return false;
    }
    if (callmin.length !== callmax.length || callmoney.length !== callmin.length) {
        toastr.error("计费规则有误", "error");
        return false;
    }
    for (var i = 0; i < callmin.length; i++) {
        if (!re2.test(callmoney[i])) {
            toastr.error("项目计费为整数", "error");
            return false;
        }
        if (parseInt(callmin[i]) >= parseInt(callmax[i])) {
            toastr.error("同梯度起点应小于终点", "error");
            return false;
        }

        if (callmin[i] == "" || callmoney[i] == "") {
            toastr.error("非最后终点不能设空值", "error");
            return false;
        } else {
            if (i !== callmin.length - 1 && callmax[i] == "") {
                toastr.error("非最后终点不能设空值", "error");
                return false;
            }
        }
        if (i == 0) {
            continue;
        } else {
            if (parseInt(callmin[i]) <= parseInt(callmax[i - 1])) {
                toastr.error("起点必须比上梯度终点高", "error");
                return false;
            }
        }
    }
    return true;
};
Project.validateCaller = function (project) {
    var callerIdArr = project.callerStr.split("#");
    //如果没有配置线路
    if (callerIdArr.length === 0) {
        toastr.error("必须配置线路", "error");
        return false;
    }
    //如果配置重复线路
    if (new Set(callerIdArr).size < callerIdArr.length) {
        toastr.error("不能配置同一条线路", "error");
        return false;
    }
    var botnumArr = project.botnumStr === "" ? [] : project.botnumStr.split("#");
    if (botnumArr.length !== callerIdArr.length) {
        toastr.error("线路配置有误", "error");
        return false;
    }
    return true;
}

/**
 * 校验
 */
Project.validate = function(project) {
    var protypeval=project.projectType;
    var regu = /^\d+$/;
    var re2 =  new RegExp(regu);
    console.log("leadstarget:"+project.leadstarget)
    if(!re2.test(project.leadstarget)){
        toastr.error("leads目标必须为整数", "error");
        return false;
    }
    //alert(protypeval);
    if(protypeval==1){
        return true;
    }
    var regulationArr = project.regulationStr.split("#");
    //如果没有配置规则
    if (regulationArr.length === 0) {
        toastr.error("必须配置规则", "error");
        return false;
    }
    //如果配置重复规则
    if (new Set(regulationArr).size < regulationArr.length) {
        toastr.error("不能配置同一个规则", "error");
        return false;
    }
    var weightArr = project.weightStr === "" ? [] : project.weightStr.split("#");
    if (weightArr.length !== regulationArr.length) {
        toastr.error("规则配置有误", "error");
        return false;
    }
    return true;
};

/**
 * 删除
 *
 * @param id    extQueueId
 */
Project.delete = function del(id) {
    warning("确定删除吗", "", function () {
        $.get("/project/delete?id=" + id, function () {
            success("成功删除");
            Project.search();
            Project.getState();
        });
    })
};

/**
 * 切换项目状态：启动/暂停
 */
Project.switchStateStart = function (id, state, btn) {
    var l = $(btn).ladda();
    l.ladda('start');
    $.ajax({
        url: "/project/updateState?id=" + id + "&state=" + state,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                setTimeout(function () {
                    l.ladda('stop');
                    Project.search();
                }, 1000)
            } else {
                l.ladda('stop');
            }
        }
    })
// }
};
/**
 * 切换项目状态：启动/暂停
 */
Project.switchStateStop = function (id, state, btn) {
    var l = $(btn).ladda();
    l.ladda('start');
    $.ajax({
        url: "/project/updateState?id=" + id + "&state=" + state,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                setTimeout(function () {
                    l.ladda('stop');
                    Project.search();
                }, 1000)
            } else {
                l.ladda('stop');
            }
        }
    })
};
Project.phoneBatchList = function (id) {
    window.location.href = "/project/phone_batch/list?companyId=" + $("#companyId2").val() + "&pid=" + id;
};

Project.staffGroup = {
    jsonData: null,
    edit: function (pid) {
        $("#zx-pid").val(pid);
        Project.staffGroup.jsonData = null;
        $("#selectedStaffGroup").html("");
        $.ajax({
            url: "/project/zxget",
            data: {
                pid: pid
            },
            type: 'GET',
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    Project.staffGroup.jsonData = r.obj;
                    var companyStr = "";
                    var strArr = [];
                    for (var i = 0; i < Project.staffGroup.jsonData.length; i++) {
                        var company = Project.staffGroup.jsonData[i];
                        companyStr += '<p class="zx-company" data-id="' + company.id + '">' + company.name + '</p>';
                        var staffGroups = company.staffGroups;
                        for (var k = 0; k < staffGroups.length; k++) {
                            if (staffGroups[k].selected) {
                                var str = company.name + staffGroups[k].name;
                                strArr.push(str);
                            }
                        }
                    }
                    $("#companyPanel").html(companyStr);
                    $("#selectedStaffGroup").html(strArr.join("，"));
                    $(".zx-company:first").eq(0).click();
                    $("#editZXModal").modal();
                }
            }
        });
    },
    update: function() {
        var staffGroupIdArr = [];
        for (var i = 0; i < Project.staffGroup.jsonData.length; i++) {
            var company = Project.staffGroup.jsonData[i];
            var staffGroups = company.staffGroups;
            for (var k = 0; k < staffGroups.length; k++) {
                if (staffGroups[k].selected) {
                    staffGroupIdArr.push(staffGroups[k].id);
                }
            }
        }
        $.ajax({
            url: "/project/zxupdate",
            data: {
                pid: $("#zx-pid").val(),
                groupIdArr: staffGroupIdArr.join(",")
            },
            type: 'GET',
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    $("#editZXModal").modal("hide");
                    success("保存成功");
                }
            }
        });
    },
    companySelected: function (companyId) {
        var staffGroupList = [];
        for (var i = 0; i < Project.staffGroup.jsonData.length; i++) {
            if (companyId == Project.staffGroup.jsonData[i].id) {
                staffGroupList = Project.staffGroup.jsonData[i].staffGroups;
            }
        }
        var str = '';
        for (var j = 0; j < staffGroupList.length; j++) {
            var staffGroup = staffGroupList[j];
            str += '<input type="checkbox" id="sg-' + staffGroup.id + '" ';
            if (staffGroup.selected) {
                str += 'checked';
            }
            str += '><label for="sg-' + staffGroup.id + '">' + staffGroup.name + '</label>';
        }
        $("#staffGroupPanel").html(str);
    }

};


/**
 * 质检地址
 */
Project.url = function (id) {

    var projectId = id;

    $.ajax({
        url: "/project/url?projectId=" + projectId,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var url = r.obj.iframeurl;
                var form = $("#editURL-form");
                form.find("input[name='projectId']").val(id);
                form.find("input[name='projectUrl']").val(url);
                $("#editUrl").modal();
            }

        }
    })

}
/**
 * 更新地址
 */
Project.updateUrl = function () {
    var id = $("#projectId").val();
    var url = $("#projectUrl").val();

    $.ajax({
        url: "/project/updateUrl",
        type: 'POST',
        data: ({
            url: url,
            id: id
        }),
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editUrl").modal("hide");
                Project.search();
                success("保存成功");
            } else if (r.code == 1) {
                success(r.message);
            }
        }
    })
}

/**
 * 设置坐席预约下线人数
 */
Project.showForMakeStaffOffline = function (pid) {
    $("#makeStaffOffline-pid").val("");
    $("#makeStaffOffline-num").val("");
    $("#makeStaffOffline-info").html("");
    $.ajax({
        url: "/project/showForMakeStaffOffline",
        type: 'POST',
        data: {pid: pid},
        dataType: "json",
        success: function (r) {
            if (r.code == 0) {
                var num = r.obj.num;
                var diffTime = r.obj.diff;
                var flag = r.obj.flag;
                $("#makeStaffOffline-pid").val(pid);
                if (num != undefined && num > 0) {
                    $("#makeStaffOffline-num").val(num);
                    $("#makeStaffOffline-submit").hide();
                    if (flag == 1) {
                        $("#makeStaffOffline-info").html("<span style='color: blue;'>现在坐席可以下线</span>");
                    } else {
                        $("#makeStaffOffline-info").html("<span style='color: red;'>距离可下线时间还剩余" + diffTime + "秒</span>");
                        Project.intervalForStaffOffline = setInterval(function () {
                            Project.showMakeStaffOfflineForInterval(pid);
                        }, 1000);
                    }
                } else {
                    $("#makeStaffOffline-submit").show();
                }
                $("#makeStaffOffline").modal();
            }
        }
    });
};

Project.showMakeStaffOfflineForInterval = function (pid) {
    $.ajax({
        url: "/project/showForMakeStaffOffline",
        type: 'POST',
        data: {pid: pid},
        dataType: "json",
        success: function (r) {
            if (r.code == 0) {
                var num = r.obj.num;
                var diffTime = r.obj.diff;
                var flag = r.obj.flag;
                $("#makeStaffOffline-pid").val(pid);
                if (num != undefined && num > 0) {
                    $("#makeStaffOffline-num").val(num);
                    $("#makeStaffOffline-submit").hide();
                    if (flag == 1) {
                        $("#makeStaffOffline-info").html("<span style='color: blue;'>现在坐席可以下线</span>");
                    } else {
                        $("#makeStaffOffline-info").html("<span style='color: red;'>距离可下线时间还剩余" + diffTime + "秒</span>");
                    }
                } else {
                    $("#makeStaffOffline-num").val(0);
                    $("#makeStaffOffline-info").html("<span style='color: blue;'>预约下线数已达成</span>");
                    window.clearInterval(Project.intervalForStaffOffline);
                }
            }
        }
    });
};

/**
 * 设置坐席预约下线人数
 */
Project.makeStaffOffline = function () {
    var pid = $("#makeStaffOffline-pid").val();
    var staffNum = $("#makeStaffOffline-num").val();
    $.ajax({
        url: "/project/makeStaffOffline",
        type: 'POST',
        data: {pid: pid, num: staffNum},
        dataType: "json",
        success: function (r) {
            if (r.code == 0) {
                $("#makeStaffOffline").modal("hide");
                //Project.search();
                success("设置成功");
            } else {
                Alert("错误", r.msg);
            }
        }
    });
};

/**
 * 指定项目和日期重新计算和结算话费
 */
Project.showForRecountAccount = function (pid) {
    $("#recountAccount-pid").val("");
    $("#recountAccount-day").val("");
    $("#recountAccount-aiprice").val("");
    $("#recountAccount-second").val("");
    $("#recountAccount-callprice").val("");
    $("#recountAccount").modal();
};

/**
 * 指定项目和日期重新计算和结算话费
 */
Project.recountAccount = function () {
    var pid = $("#recountAccount-pid").val();
    var day = $("#recountAccount-day").val();
    var aiprice = $("#recountAccount-aiprice").val();
    var second = $("#recountAccount-second").val();
    var callprice = $("#recountAccount-callprice").val();
    $.ajax({
        url: "/project/recountAccount",
        type: 'POST',
        data: {pid: pid, day: day, aiprice: aiprice, second: second, callprice: callprice},
        dataType: "json",
        success: function (r) {
            if (r.code == 0) {
                $("#recountAccount").modal("hide");
                //Project.search();
                success("设置成功");
            } else {
                Alert("错误", r.msg);
            }
        }
    });
};



/**
 * 并发量
 */
Project.concurrency = function () {
    $.ajax({
        url: "/project/concurrency?id=" + $("#companyId2").val(),
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var concurrency = r.obj;
                for (var i = 0; i < concurrency.length; i++) {
                    $("#" + concurrency[i].pid + "").find("td[aria-describedby='grid-table_callnum']").html(concurrency[i].callNum);//
                    $("#" + concurrency[i].pid + "").find("td[aria-describedby='grid-table_answernum']").html(concurrency[i].answerNum);
                    $("#" + concurrency[i].pid + "").find("td[aria-describedby='grid-table_batchcallpercent']").html(concurrency[i].batchCallPercent);
                    $("#" + concurrency[i].pid + "").find("td[aria-describedby='grid-table_batchtransferpercent']").html(concurrency[i].batchTransferPercent);
                    $("#" + concurrency[i].pid + "").find("td[aria-describedby='grid-table_stafffreetime']").html(concurrency[i].staffFreetime);
                    $("#" + concurrency[i].pid + "").find("td[aria-describedby='grid-table_staffNum']").html(concurrency[i].staffNum);
                }
                // alert($("#1633").find("td[aria-describedby='grid-table_callnum']").html());
            } else {
            }
        }
    })
};

Project.getState = function () {
    $.ajax({
        url: "/company/getCompanyStaffNum?companyId=" + $("#companyId2").val(),
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var states = r.obj;
                // $("span[name='enable']").html(states.enable);
                $("span[name='over']").html(states.over);
                // $("span[name='free']").html(states.free);
            }
        }
    })
}


Project.downExtPassword = function () {
    $("#editZXModal").modal("hide");
    waitMask();
    $.ajax({
        url: "/project/downExtPassword?projectId=" + $("#projectId_zx").val(),
        type: 'GET',
        dataType: "json",
        success: function (data) {
            window.open("/project/download?key=" + data.obj);
            clearMask();
        }
    })
}

Project.changeaddProjectType = function () {
    var proval = $("#addprojectType").val();
    if (proval == 0) {
        $("#regulationAdd").show();
    } else {
        $("#regulationAdd").hide();
    }
}

Project.changeeditProjectType = function () {
    var proval = $("#projectType").val();
    if (proval == 0) {
        $("#regulationEdit").show();
    } else {
        $("#regulationEdit").hide();
    }
}

/**
 * 编辑预警
 */
Project.editWarn = function (id) {
    $.ajax({
        url: "/project/getWarns?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            $("#editwarnDiv").html("");
            if (r.code === 0) {
                var object = r.obj;
                var projectWarns = object.projectWarns;
                var allprojectWarns = object.allprojectWarns;
                var allUsers = object.alluser;
                var str = "";
                if (projectWarns.length > 0) {
                    for (var i = 0; i < projectWarns.length; i++) {
                        str += "<div><div class=\"row m-b-xs\">" +
                            "<div class=\"col-sm-12\">" +
                            "<label class=\"col-sm-3 \" >预警名称</label>" +
                            "<label class=\"col-sm-2 \" >操作符号</label>" +
                            "<label class=\"col-sm-2 \" >数值</label>" +
                            "<label class=\"col-sm-3 \" >处理方式</label>" +
                            "<label class=\"col-sm-2 \" >预警颜色</label>" +
                            "</div></div>";
                        str += "<div class=\"row m-b-xs\">";
                        str += "<div class=\"col-sm-3\">";
                        str += "<select class=\"form-control warn-name\" name=\"warnConfigName\">";
                        for (var j = 0; j < allprojectWarns.length; j++) {
                            if (projectWarns[i].name === allprojectWarns[j].name) {
                                str += '<option value="' + allprojectWarns[j].name + '" selected>' + allprojectWarns[j].showname + '</option>';
                            } else {
                                str += '<option value="' + allprojectWarns[j].name + '">' + allprojectWarns[j].showname + '</option>';
                            }
                        }
                        str += "</select>";
                        str += "</div><div class=\"col-sm-2  p-l-none\" style=\"padding-left: 20px;\">";
                        str += "<select  class=\"from-control warn-operator\" >";
                        if (projectWarns[i].operator === "lte") {
                            str += '<option value="gte" >\>=</option>';
                            str += '<option value="lte" selected>\<=</option>';
                        } else {
                            str += '<option value="gte" selected>\>=</option>';
                            str += '<option value="lte">\<=</option>';
                        }
                        str += "</select>";
                        if (projectWarns[i].value == undefined) {
                            str += "</div><div class=\"col-sm-2  p-l-none\"> <input type=\"text\" class=\"form-control warn-value\"  value=''>";
                        } else {
                            str += "</div><div class=\"col-sm-2  p-l-none\"> <input type=\"text\" class=\"form-control warn-value\"  value='" + projectWarns[i].value + "'>";
                        }
                        str += "</div><div class=\"col-sm-3  p-l-none warn-handle\"> ";

                        if (projectWarns[i].handle == undefined) {
                            str += "<label><input value=\"1\"  type=\"checkbox\" >弹框</label>";
                            str += "<label><input value=\"2\"  type=\"checkbox\" >停呼</label>";
                            str += "<label><input value=\"3\"  type=\"checkbox\" >短信</label>";
                        } else {
                            var arrhandle = projectWarns[i].handle.split(",");
                            var all= [1,2,3];
                            var temarr=all.minus(arrhandle);

                            // for (var k = 0; k < arrhandle.length; k++) {
                            //     if (arrhandle[k] === "1") {
                            //         str += "<label><input value=\"1\"  type=\"checkbox\" checked>弹框</label>";
                            //     }
                            //     if (arrhandle[k] === "2") {
                            //         str += "<label><input value=\"2\"  type=\"checkbox\" checked>停呼</label>";
                            //     }
                            //     if (arrhandle[k] === "3") {
                            //         str += "<label><input value=\"3\"  type=\"checkbox\" checked>短信</label>";
                            //     }
                            // }
                            for (var k = 0; k < all.length; k++) {
                                if (arrhandle.indexOf(all[k]+"")>=0) {
                                    if (all[k]===1)
                                    {
                                        str += "<label><input value=\"1\"  type=\"checkbox\" checked>弹框</label>";
                                    }
                                    if (all[k] === 2) {
                                        str += "<label><input value=\"2\"  type=\"checkbox\" checked>停呼</label>";
                                    }
                                    if (all[k] === 3) {
                                        str += "<label><input value=\"3\"  type=\"checkbox\" checked>短信</label>";
                                    }
                                }else{
                                    if (all[k]===1)
                                    {
                                        str += "<label><input value=\"1\"  type=\"checkbox\" >弹框</label>";
                                    }
                                    if (all[k] === 2) {
                                        str += "<label><input value=\"2\"  type=\"checkbox\" >停呼</label>";
                                    }
                                    if (all[k] === 3) {
                                        str += "<label><input value=\"3\"  type=\"checkbox\" >短信</label>";
                                    }
                                }
                            }
                        }

                        str += "</div><div class=\"col-sm-2  p-l-none\">";
                        str += "<select  class=\"from-control warn-color\" >"
                        if (projectWarns[i].color == undefined) {
                            str += '<option value="yellow">黄色</option>';
                            str += '<option value="orange">橙色</option>';
                            str += '<option value="red">红色</option>';
                        } else {
                            if (projectWarns[i].color === "yellow") {
                                str += '<option value="yellow" selected>黄色</option>';
                            } else {
                                str += '<option value="yellow">黄色</option>';
                            }

                            if (projectWarns[i].color === "orange") {
                                str += '<option value="orange" selected>橙色</option>';
                            } else {
                                str += '<option value="orange">橙色</option>';
                            }

                            if (projectWarns[i].color === "red") {
                                str += '<option value="red" selected>红色</option>';
                            } else {
                                str += '<option value="red">红色</option>';
                            }
                        }
                        str += "</select>";
                        str += "</div></div>";
                        str += "<div class=\"row m-b-xs\">" +
                            "<div class=\"col-sm-12\">" +
                            "<label class=\"col-sm-2 \" >预警对象</label>";
                        str += "<div class=\"col-sm-9  p-l-none\">";
                        str += "<select  data-placeholder=\"---选择对象---\" class=\"my-chosen-select warn-user\" multiple >"
                        for (var j = 0; j < allUsers.length; j++) {
                            if (projectWarns[i].userid == undefined) {
                                str += '<option value="' + allUsers[j].id + '">' + allUsers[j].nickname + '</option>';
                            } else {
                                var arruser = projectWarns[i].userid.split(",");
                                if (arruser.length>0&&arruser.indexOf(allUsers[j].id+"")>=0){
                                    str += '<option value="' + allUsers[j].id + '" selected>' + allUsers[j].nickname + '</option>';
                                }else{
                                    str += '<option value="' + allUsers[j].id + '" >' + allUsers[j].nickname + '</option>'
                                }

                                // for (var k = 0; k < arruser.length; k++) {
                                //     if (arrhandle[k] === allUsers[j].id) {
                                //         str += '<option value="' + allUsers[j].id + '" selected>' + allUsers[j].nickname + '</option>';
                                //     } else {
                                //         str += '<option value="' + allUsers[j].id + '" >' + allUsers[j].nickname + '</option>';
                                //     }
                                // }
                            }
                        }
                        str += "</select></div><div class=\"col-sm-1  p-l-none\">";
                        if (i == 0) {
                            str += "<i class=\"fa fa-plus plus-btn\"  onclick=\"Project.addwarnDiv()\"></i>";
                        } else {
                            str += "<i class=\"fa fa-minus minus-btn\"  onclick=\"Project.removewarnDiv(this)\"></i>";

                        }
                        str += "</div></div>";
                        str += "</div>";
                    }
                } else {
                    str += "<div class=\"row m-b-xs\">" +
                        "<div class=\"col-sm-12\">" +
                        "<label class=\"col-sm-3 \" >预警名称</label>" +
                        "<label class=\"col-sm-2 \" >操作符号</label>" +
                        "<label class=\"col-sm-2 \" >数值</label>" +
                        "<label class=\"col-sm-3 \" >处理方式</label>" +
                        "<label class=\"col-sm-2 \" >预警颜色</label>" +
                        "</div></div>";
                    str += "<div class=\"row m-b-xs\">";
                    str += "<div class=\"col-sm-3\">";
                    str += "<select class=\"form-control warn-name\" name=\"warnConfigName\">";
                    for (var j = 0; j < allprojectWarns.length; j++) {
                        str += '<option value="' + allprojectWarns[j].name + '">' + allprojectWarns[j].showname + '</option>';
                    }
                    str += "</select>";
                    str += "</div><div class=\"col-sm-2  p-l-none\" style=\"padding-left: 20px;\">";
                    str += "<select  class=\"from-control warn-operator\" >"
                    str += '<option value="gte">\>=</option>';
                    str += '<option value="lte">\<=</option>';
                    str += "</select>";
                    str += "</div><div class=\"col-sm-2  p-l-none\"> <input type=\"text\" class=\"form-control warn-value\"  value=''>";
                    str += "</div><div class=\"col-sm-3  p-l-none warn-handle\"> <label><input value=\"1\"  type=\"checkbox\" >弹框</label>";
                    str += "<label><input value=\"2\"  type=\"checkbox\" >停呼</label>"
                    str += "<label><input value=\"3\"  type=\"checkbox\" >短信</label>"
                    str += "</div><div class=\"col-sm-2  p-l-none\">";
                    str += "<select  class=\"from-control warn-color\" >"
                    str += '<option value="yellow">黄色</option>';
                    str += '<option value="orange">橙色</option>';
                    str += '<option value="red">红色</option>';
                    str += "</select>";
                    str += "</div></div>";
                    str += "<div class=\"row m-b-xs\">" +
                        "<div class=\"col-sm-12\">" +
                        "<label class=\"col-sm-2 \" >预警对象</label>";
                    str += "<div class=\"col-sm-9  p-l-none\">";
                    str += "<select  data-placeholder=\"---选择对象---\" class=\"my-chosen-select warn-user\" multiple >"
                    for (var j = 0; j < allUsers.length; j++) {
                        str += '<option value="' + allUsers[j].id + '">' + allUsers[j].nickname + '</option>';
                    }
                    str += "</select></div><div class=\"col-sm-1  p-l-none\"><i class=\"fa fa-plus plus-btn\"onclick=\"Project.addwarnDiv()\"></i>";
                    str += "</div></div>";
                }
                $("#editwarnDiv").append(str);
                $("#projectId_warn").val(id);
                $("#editWarn").modal();
                $(".my-chosen-select").chosen({width: "100%"});
            }
        }
    })
};

/**
 * 编辑时新增预警配置
 */
Project.addwarnDiv = function () {
    $.ajax({
        type: 'get',
        url: "/project/getWarnsConfig",
        async: false,
        success: function (r) {
            var object = r.obj;
            var allprojectWarns = object.allprojectWarns;
            var allUsers = object.alluser;
            var str = "";
            str += "<div><div class=\"row m-b-xs\">" +
                "<div class=\"col-sm-12\">" +
                "<label class=\"col-sm-3 \" >预警名称</label>" +
                "<label class=\"col-sm-2 \" >操作符号</label>" +
                "<label class=\"col-sm-2 \" >数值</label>" +
                "<label class=\"col-sm-3 \" >处理方式</label>" +
                "<label class=\"col-sm-2 \" >预警颜色</label>" +
                "</div></div>";
            str += "<div class=\"row m-b-xs\">";
            str += "<div class=\"col-sm-3\">";
            str += "<select class=\"form-control warn-name\" name=\"warnConfigName\">";
            for (var j = 0; j < allprojectWarns.length; j++) {
                str += '<option value="' + allprojectWarns[j].name + '">' + allprojectWarns[j].showname + '</option>';
            }
            str += "</select>";
            str += "</div><div class=\"col-sm-2  p-l-none\" style=\"padding-left: 20px;\">";
            str += "<select  class=\"from-control warn-operator\" >"
            str += '<option value="gte">\>=</option>';
            str += '<option value="lte">\<=</option>';
            str += "</select>";
            str += "</div><div class=\"col-sm-2  p-l-none\"> <input type=\"text\" class=\"form-control warn-value\"  value=''>";
            str += "</div><div class=\"col-sm-3  p-l-none warn-handle\"> <label><input value=\"1\"  type=\"checkbox\" >弹框</label>";
            str += "<label><input value=\"2\"  type=\"checkbox\" >停呼</label>"
            str += "<label><input value=\"3\"  type=\"checkbox\" >短信</label>"
            str += "</div><div class=\"col-sm-2  p-l-none\">";
            str += "<select  class=\"from-control warn-color\" >"
            str += '<option value="yellow">黄色</option>';
            str += '<option value="orange">橙色</option>';
            str += '<option value="red">红色</option>';
            str += "</select>";
            str += "</div></div>";
            str += "<div class=\"row m-b-xs\">" +
                "<div class=\"col-sm-12\">" +
                "<label class=\"col-sm-2 \" >预警对象</label>";
            str += "<div class=\"col-sm-9  p-l-none\">";
            str += "<select  data-placeholder=\"---选择对象---\" class=\"my-chosen-select warn-user\" multiple >"
            for (var j = 0; j < allUsers.length; j++) {
                str += '<option value="' + allUsers[j].id + '">' + allUsers[j].nickname + '</option>';
            }
            str += "</select></div><div class=\"col-sm-1  p-l-none\"><i class=\"fa fa-minus minus-btn\"onclick=\"Project.removewarnDiv(this)\"></i>";
            str += "</div></div></div>";
            $("#editwarnDiv").append(str);
            $(".my-chosen-select").chosen({width: "100%"});
        }
    })
}
/**
 * 编辑时删除预警配置
 */
Project.removewarnDiv = function (btn) {
    //通过父元素删除
    $(btn).parent().parent().parent().parent().remove();
}

/**
 * 更新预警配置
 */
Project.updateWarn = function () {
    var form = $("#editWarn-form");
    var project = {};
    var warnnames = Project.getArray('.warn-name');
    var warnshownames = Project.getTextArray('.warn-name');
    var warnoperators = Project.getArray('.warn-operator');
    var warnvalues = Project.getArray('.warn-value');
    var warnhandles = Project.getCheckArray('.warn-handle');
    var warncolors = Project.getArray('.warn-color');
    //观察预警对象多对象输出为英文逗号分隔
    var warnusers = Project.getArray('.warn-user');
    var warnname = "";
    var warnshowname = "";
    var warnoperator = "";
    var warnvalue = "";
    var warnhandle = "";
    var warncolor = "";
    var warnuser = "";
    for (var i = 0; i < warnnames.length; i++) {
        warnname += warnnames[i] + "#";
        warnshowname +=warnshownames[i] + "#";
        warnoperator += warnoperators[i] + "#";
        warnvalue += warnvalues[i] + "#";
        warncolor += warncolors[i] + "#";
        warnuser += warnusers[i] + "#";
        warnhandle += warnhandles[i] + "#";
    }
    // alert(warnname);
    // alert(warnoperator);
    // alert(warnvalue);
    // alert(warncolor);
    //  alert(warnuser);
    // alert(warnhandle);
    // alert(warnshowname);

    project.pid =$("#projectId_warn").val();
    project.name =warnname.substring(0,warnname.length-1);
    project.showname = warnshowname.substring(0,warnshowname.length-1);
    project.operator = warnoperator.substring(0,warnoperator.length-1);
    project.value = warnvalue.substring(0,warnvalue.length-1);
    project.color = warncolor.substring(0,warncolor.length-1);
    project.userid = warnuser.substring(0,warnuser.length-1);
    project.handle = warnhandle.substring(0,warnhandle.length-1);
    if (Project.validateWarn(project)) {
        $.ajax({
            url: "/project/updateWarn",
            type: 'POST',
            data: JSON.stringify(project),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    $("#editWarn").modal("hide");
                    Project.search();
                    Project.getState();
                    success("保存成功");
                }
            }

        })
    }

}

/**
 * 校验预警数据
 */
Project.validateWarn = function (projcet) {
    var warnname = projcet.name.split("#");
    var warnshowname = projcet.showname.split("#");
    var warnoperator = projcet.operator.split("#");
    var warnvalue = projcet.value.split("#");
    var warncolor = projcet.color.split("#");
    var warnuser = projcet.userid.split("#");
    var warnhandle = projcet.handle.split("#");

    var reg = /^\d+(\.\d+)?$/;

    var re = new RegExp(reg);

    //判断是否设置预警配置
    if (warnvalue.length === 1 && warnvalue[0] == "") {
        toastr.error("必须设置预警阀值！", "error");
        return false;
    }
    if (warnname.length !== warnvalue.length ) {
        toastr.error("预警设置有误", "error");
        return false;
    }
    for (var i = 0; i < warnname.length; i++) {

        var value = warnvalue[i];
        if (!re.test(value)) {
            toastr.error("阀值必须为数字", "error");
            return false;
        }

        if (warnhandle[i] == "" ) {
            toastr.error("必须设置处理方式", "error");
            return false;
        }
    }
    return true;
}
/**
 * 重置所有按钮
 */
Project.resetAll = function(){
    var warnnames = Company.getArray('.warn-name');
    if (warnnames.length>1){
        toastr.error("有多条预警时无法重置！", "error");
    } else{
        $(".warn-name").get(0).selectedIndex=0;
        $(".warn-operator").get(0).selectedIndex=0;
        $(".warn-value").val("");
        $(".warn-color").get(0).selectedIndex=0;
        $(".warn-user").val("")
        $(".warn-user").trigger("chosen:updated")
        $('.warn-handle').each(function () {
            $(this).find(":checkbox").removeAttr("checked")
        })
        // var warnhandles = Company.getCheckArray('.warn-handle');
    }
}

/**
 * 清空所有数据
 */
Project.deleteAll = function () {
    var id =$("#projectId_warn").val();
    $.ajax({
        url: "/project/deleteWarns?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editWarn").modal("hide");
                Project.search();
                Project.getState();
                success("清空完成");
            }
        }
    })
}

Array.prototype.minus = function (arr) {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = 1;
    }
    for (var j = 0; j < this.length; j++) {
        if (!obj[this[j]])
        {
            obj[this[j]] = 1;
            result.push(this[j]);
        }
    }
    return result;
};
var dualOptions = {
    selectorMinimalHeight: 160,
    selectedListLabel: "已选：",
    nonSelectedListLabel: "未选：",
    // showFilterInputs: false,
    infoText: false,
};
//设置发送短信
Project.send = function(id){
    var modal = false;
    $("#smsprojectId").val(id);
    $("#smsChannelName").val("");
    $("#smsTemplateName").val("");
    $("#content").text("");
    setSwitchery(Project.myswitchery, false);
    $.ajax({
        url:"/project/sendModal?pid="+id,
        type:"GET",
        dataType:"JSON",
        success:function (r) {
            if (r.code === 0) {
                var result = r.obj;
                $("#groupid").val(result.groupid);
                var templateAll = result.templateAll;
                var templateSelected = result.templateIdSelected;
                var elemt = $("#smsTemplateName");
                elemt.empty();
                elemt.append("<option value=\"\">请选择模板</option>");
                for(var j=0;j<templateAll.length;j++){
                    if (templateAll[j].id == templateSelected) {
                        elemt.append("<option value=\"" + templateAll[j].id + "\" selected>" + templateAll[j].name + "</option>");
                    } else {
                        elemt.append("<option value=\"" + templateAll[j].id + "\">" + templateAll[j].name + "</option>");
                    }
                }
                var data = result.channelAll;
                var channelIdSelected = result.channelIdSelected;
                var elem = $("#smsChannelName");
                elem.empty();
                elem.append("<option value=\"\">请选择渠道</option>");
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == channelIdSelected) {
                        elem.append("<option value=\"" + data[i].id + "\" selected>" + data[i].name + "</option>");
                    } else {
                        elem.append("<option value=\"" + data[i].id + "\">" + data[i].name + "</option>");
                    }
                }
                var contentStatus = result.contentStatus;
                $("#content").text(contentStatus.content);
                if (contentStatus.status == 1) {
                    setSwitchery(Project.myswitchery, true);
                } else {
                    setSwitchery(Project.myswitchery, false);
                }
                $("#sendModal").modal();
            } else {
                info(r.msg);
            }
        }
    });
}
//渠道模板联动
Project.getTemplate = function(){
    // $("#smsTemplateName").val("");
    $("#content").text("");
    setSwitchery(Project.myswitchery, false);
    var groupid = $("#groupid").val();
    var channelid = $("#smsChannelName").val();
    if(channelid!=""&&channelid!=undefined){
        $.ajax({
            url:"/project/getTemplate?groupid="+groupid+"&channelid="+channelid,
            type:"GET",
            dataType:"JSON",
            success:function (r) {
                if(r.code===0){
                    var data = r.obj;
                    var elem = $("#smsTemplateName");
                    elem.empty();
                    elem.append("<option value=\"\">请选择模板</option>");
                    for (var i = 0; i < data.length; i++) {
                        elem.append("<option value=\"" + data[i].id + "\">" + data[i].name + "</option>");
                    }
                }
            }
        });
    }else{
        $("#smsTemplateName").empty();
        $("#smsTemplateName").append("<option value=\"\">请选择模板</option>");
    }
}
//下拉框触发事件
Project.selected = function(){
    $("#smsTemplateName").change(function () {
        var id = $("#smsTemplateName").val();
        var pid = $("#smsprojectId").val();
        var channelid = $("#smsChannelName").val();
        $.ajax({
            url:"/project/getContentStatus?id="+id+"&pid="+pid+"&channelid="+channelid,
            type:"GET",
            dataType:"JSON",
            success:function (r) {
                if(r.code===0){
                    var data = r.obj;
                    $("#content").text(data.content);
                    if(data.status==1){
                        setSwitchery(Project.myswitchery, true);
                    }else{
                        setSwitchery(Project.myswitchery, false);
                    }
                }
            }
        });
    });
};
//短信模板保存
Project.smsinsert = function(){
    var params = {};
    params.pid = $("#smsprojectId").val();
    params.templateId = $("#smsTemplateName").val();
    params.channelId = $("#smsChannelName").val();
    params.opened = document.querySelector("#sendModal .js-switch").checked;
    if(params.templateId!=""&&params.templateId!=undefined){
        $.ajax({
            url:"/project/smsInsert",
            data:JSON.stringify(params),
            type:"POST",
            dataType:"JSON",
            contentType:"application/json;charset=utf8",
            success:function (r) {
                if(r.code===0){
                    success("保存成功");
                    $("#sendModal").modal('hide');
                }
            }
        });
    }else {
        info("请选择模板后保存");
    }
};
$(function () {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", Project.initOptions());
    Project.table = jqGrid.init();
    editDualSelector = $("#editZX-form").find(".dual_select").bootstrapDualListbox(dualOptions);
    Project.getState();
    //初始化Switchery选择插件
    Project.myswitchery = new Switchery(document.querySelector('#sendModal .js-switch'), {color: '#1AB394'});
    Project.phoneswitchery = new Switchery(document.querySelector('#editModal #switchThree'), {color: '#1AB394'});
    Project.calltypeswitchery = new Switchery(document.querySelector('#editModal #calltype'), {color: '#1AB394'});
    // Project.phoneencryptswitchery = new Switchery(document.querySelector('#editModal #phoneencrypt'), {color: '#1AB394'});
    Project.selected();

    $("#companyPanel").on("click", ".zx-company", function () {
        if ($(this).hasClass("selected")) {
            return;
        }
        $(this).addClass("selected");
        $(this).siblings(".zx-company").removeClass("selected");
        var companyId = $(this).attr("data-id");
        Project.staffGroup.companySelected(companyId);
    });

    $("#staffGroupPanel").on("change", "input[type=checkbox]", function () {
        var staffGroupId = $(this).next().attr("for").split("-")[1];
        var companyId = $("p.zx-company.selected").attr("data-id");
        var strArr = [];
        for (var i = 0; i < Project.staffGroup.jsonData.length; i++) {
            var company = Project.staffGroup.jsonData[i];
            var staffGroups = company.staffGroups;
            if (companyId == company.id) {
                for (var j = 0; j < staffGroups.length; j++) {
                    var staffGroup = staffGroups[j];
                    if (staffGroupId == staffGroup.id) {
                        staffGroup.selected = !staffGroup.selected;
                        break;
                    }
                }
            }
            for (var k = 0; k < staffGroups.length; k++) {
                if (staffGroups[k].selected) {
                    var str = company.name + staffGroups[k].name;
                    strArr.push(str);
                }
            }
        }
        $("#selectedStaffGroup").html(strArr.join("，"));
    });

});