var Staff = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "staff"
};

/**
 * jqGrid初始化参数
 */
Staff.initOptions = function () {
    var options = {
        url : "/staff/grid",
        postData:{
            name:$("#name").val(),
            phone : $("#phone").val(),
            companyid :$("#companyid").val(),
            groupid : $("#groupid").val(),
            pid :$("#pid").val()
        },
        autowidth:true,
        sortname: "id",
        sortorder: "asc",
        colNames: ['编号','姓名','手机号','状态','性别','所属公司','所属项目','所属分组','成交量目标','成交率目标','接通量目标','通话时长目标','工作天数','操作'],
        colModel: [
            {name: 'id', index: 'id', width: 30,align: "center",hidden:true},
            {name: 'name', index: 'name', width: 40,sortable: false,align: "center"},
            {name: 'phone', index: 'phone', width: 40,sortable: false,align: "center"},
            {name: 'status', index: 'status', width: 40,sortable: false,align: "center",formatter: function (cellValue, options, rowObject) {
                    var status = rowObject["status"];
                    var str = "";
                    if(status === 0){
                        str = "离线";
                    }else if(status === 1){
                        str = "空闲";
                    }else if(status === 2){
                        str = "忙碌";
                    }else{
                        str = "等待下线";
                    }
                    return str;
            }},
            {name: 'sex', index: 'sex', width: 20,sortable: false,align: "center",hidden:true,formatter: function (cellValue, options, rowObject) {
                    var sex = rowObject["sex"];
                    var str = '';
                    if(sex === 1){
                        str = "男";
                    }else if(sex ===2){
                        str = "女";
                    }
                    return str;
            }},
            {name: 'companyName', index: 'companyName', width: 50,sortable: false,align: "center"},
            {name: 'pName', index: 'pName', width: 50,sortable: false,align: "center"},
            {name: 'sgName', index: 'sgName', width: 50,sortable: false,align: "center"},
            {name: 'leads', index: 'leads', width: 40,sortable: false,align: "center"},
            {name: 'leads_percent', index: 'leads_percent', width: 40,sortable: false,align: "center",formatter: function (cellValue, options, rowObject) {
                    var leadsPercent = rowObject["leads_percent"];
                    if(leadsPercent){
                        return parseFloat(leadsPercent*100).toFixed(0)+"%";
                    }
                    return '';
                }},
            {name: 'connect_num', index: 'connect_num', width: 40,sortable: false,align: "center"},
            {name: 'duration', index: 'duration', width: 40,sortable: false,align: "center"},
            {name: 'work_days', index: 'work_days', width: 40,sortable: false,align: "center"},
            {name: 'operations', index: 'operations', width: 200, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var id = rowObject["id"];
                    var str = "";
                    str += '<input type="button" class="control-auth btn btn-sm btn-info"  data-auth="edit" value="编辑" onclick="Staff.edit(' + id + ')"/>&nbsp;';
                    str += '<input type="button" class="control-auth btn btn-sm btn-info"  data-auth="updatepassword" value="修改密码" onclick="Staff.editPassword(' + id + ')"/>&nbsp;';
                    var pid=rowObject["projectId"];
                    if(pid){
                        var targetId = rowObject["targetId"];
                        console.log(targetId+"-----------------------");
                        if(targetId){
                            str += '<input type="button" class=" btn btn-sm btn-info" data-auth="staffSet"  value="目标修改" onclick="Staff.set(' + id +","+pid+","+targetId+')"/>&nbsp;';
                        }else {
                            str += '<input type="button" class=" btn btn-sm btn-info" data-auth="staffSet"  value="目标设定" onclick="Staff.set(' + id +","+pid+')"/>&nbsp;';
                        }
                    }
                    str += '<input type="button" class="control-auth btn btn-sm btn-danger"  data-auth="staffDelete" value="删除" onclick="Staff.delete(' + id + ')"/>&nbsp;';

                    return str;
                }}
        ],
        gridComplete: function () {
            refreshPermission(Staff.domain);
        }
    };
    return options;
};
/**
 * 弹框
 * @param id    callerConfigId
 */
Staff.set = function (staffId,pid,targetId) {
    if(targetId){//修改
        $.ajax({
            url: "/staff/getTarget?staffId=" + staffId+"&&projectId="+pid,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    var staffTarget = r.obj;
                    var form = $("#edit-formTwo");
                    form.find("input[name='staffId']").val(staffId);
                    form.find("input[name='projectId']").val(pid);
                    form.find("input[name='workDays']").val(staffTarget.workDays);
                    form.find("input[name='leads']").val(staffTarget.leads);
                    form.find("input[name='leadsPercent']").val(parseFloat(staffTarget.leadsPercent).toFixed(0));
                    form.find("input[name='connectNum']").val(staffTarget.connectNum);
                    form.find("input[name='duration']").val(staffTarget.duration);
                    $("#editModalTwo").modal();
                }
            }
        })
    }else {//新增
        var form = $("#edit-formOne");
        form.find("input[name='staffId']").val(staffId);
        form.find("input[name='projectId']").val(pid);
        form.find("input[name='workDays']").val("");
        form.find("input[name='leads']").val("");
        form.find("input[name='leadsPercent']").val("");
        form.find("input[name='connectNum']").val("");
        form.find("input[name='duration']").val("");
        $("#editModalOne").modal();
    }


};
/**
 * 检查输入框
 */
Staff.checkAllSet=function(obj){
    if(!obj.projectId||obj.projectId==-1){
        info("请选择项目");
        return false;
    }
    if(!obj.groupid||obj.groupid==-1){
        info("请选择分组");
        return false;
    }
    if(!obj.workDays){
        info("请输入工作天数");
        return false;
    }else if(!Staff.checkNumber(obj.workDays)){
        info("工作天数请输入正整数！");
        return false;
    }else if(parseInt(obj.workDays)<0||parseInt(obj.workDays)>31){
        info("工作天数范围为1-31天！");
        return false;
    }
    if(!obj.leads){
        info("请输入成单量");
        return false;
    }else if(!Staff.checkNumber(obj.leads)){
        info("成单量请输入正整数！");
        return false;
    }

    if(!obj.leadsPercent){
        info("请输入成单率");
        return false;
    }else if(!Staff.checkNumber(obj.leadsPercent)){
        info("请输入正整数！");
        return false;
    }else if(parseInt(obj.leadsPercent)<0||parseInt(obj.leadsPercent)>100){
        info("成单率范围为1-100！");
        return false;
    }
    if(!obj.connectNum){
        info("请输入接通量");
        return false;
    }else if(!Staff.checkNumber(obj.connectNum)){
        info("接通量请输入正整数！");
        return false;
    }

    if(!obj.duration){
        info("请输入通话时长");
        return false;
    }else if(!Staff.checkNumber(obj.duration)){
        info("通话时长请输入正整数！");
        return false;
    }
    return true;
};

/**
 * 检查输入框
 */
Staff.checkOneSet=function(obj){
    if(!obj.workDays){
        info("请输入工作天数");
        return false;
    }else if(!Staff.checkNumber(obj.workDays)){
        info("工作天数请输入正整数！");
        return false;
    }else if(obj.workDays<0||obj.workDays>31){
        info("工作天数范围为1-31天！");
        return false;
    }
    if(!obj.leads){
        info("请输入成单量");
        return false;
    }else if(!Staff.checkNumber(obj.leads)){
        info("成单量请输入正整数！");
        return false;
    }

    if(!obj.leadsPercent){
        info("请输入成单率");
        return false;
    }else if(!Staff.checkNumber(obj.leadsPercent)){
        info("请输入正整数！");
        return false;
    }else if(obj.leadsPercent<0||obj.leadsPercent>100){
        info("成单率范围为1-100！");
        return false;
    }
    if(!obj.connectNum){
        info("请输入接通量");
        return false;
    }else if(!Staff.checkNumber(obj.connectNum)){
        info("接通量请输入正整数！");
        return false;
    }

    if(!obj.duration){
        info("请输入通话时长");
        return false;
    }else if(!Staff.checkNumber(obj.duration)){
        info("通话时长请输入正整数！");
        return false;
    }
    return true;
};
Staff.checkNumber=function(n){
    var number=/^([1-9][0-9]*)$/;
    var re = new RegExp(number);
    if(!re.test(n)){
        return false;
    }else {
        return true;
    }
};
Staff.checkDecimal=function(n){
    var decimal=/^(([1-9][0-9]+|0)\.([0-9]{1,2}))$/;
    var re = new RegExp(decimal);
    if(!re.test(n)){
        info("请输入正确小数！");
        return false;
    }else {
        return true;
    }
};
Staff.checkNumberRange=function(n){
    var number=/^[1-9]+$/;
    var re = new RegExp(number);
    if(!re.test(n)){
        info("请输入开头不为0的数字！");
        return false;
    }else {
        return true;
    }
};
Staff.checkPhone=function(phone){
 var phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;
    var rePhone = new RegExp(phoneReg);
    if(!rePhone.test(phone)){
       info("请输入有效手机号码！");
       return false;
    }else {
        return true;
    }
};

/**
 * 弹框
 * @param id    callerConfigId
 */
Staff.updateSet = function (id) {
    $.ajax({
        url: "/staffTarget/get?staffId=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var staffTarget = r.obj;
                var form = $("#edit-form");
                form.find("input[name='id']").val(staffTarget.id);
                form.find("input[name='phone']").val(staffTarget.phone);
                $("#editModal").modal();
            }
        }
    })
};
/**
 *  获取 项目与分组
 */
Staff.getProjectAndGroup=function(staffTarget){
    document.getElementById('companyid').value=staffTarget.companyid;
    console.log(JSON.stringify(staffTarget)+"-----------------------------");
    //改变工程  更新项目下拉框
        $.ajax({
            url: "/staff/getPGData?companyId=" + staffTarget.companyid,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var projects = r.obj.projects;
                var groups = r.obj.groups;
                var html="<option value=\"\">全部</option>";
                html +="<option value=\"-1\">未绑定</option>";
                if(groups.length>0){
                    for(var i=0;i<groups.length;i++){

                            html+='<option value="'+groups[i].id+'">'+groups[i].name+'</option>';

                    }
                }
                $("#groupid").html(html);
                document.getElementById('groupid').value=staffTarget.groupid;
                var htmlc="<option value=\"\">全部</option>";
                htmlc +="<option value=\"-1\">未绑定</option>";
                if(projects.length>0){
                    for(var i=0;i<projects.length;i++){

                            htmlc+='<option value="'+projects[i].id+'">'+projects[i].name+'</option>';

                    }
                }
                $("#pid").html(htmlc);
                document.getElementById('pid').value=staffTarget.projectId;
                Staff.search();
            }
        })



};
/**
 * 弹框
 * @param id    callerConfigId
 */
Staff.setAll = function (id) {
    var form = $("#edit-formAll");
    form.find("input[name='workDays']").val("");
    form.find("input[name='leads']").val("");
    form.find("input[name='leadsPercent']").val("");
    form.find("input[name='connectNum']").val("");
    form.find("input[name='duration']").val("");
    $("#editModalAll").modal();

};

/**
 * 设定单条
 */
Staff.setIn = function () {
    var staffTarget = getFormJson($("#edit-formOne"));
    if(staffTarget){
        console.log(JSON.stringify(staffTarget));
        if(!Staff.checkOneSet(staffTarget)){
            return
        }
    }else {
        info("请输入数值！");
        return;
    }
    $.ajax({
        url: "/staff/setOne",
        type: 'POST',
        data: JSON.stringify(staffTarget),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModalOne").modal("hide");
                Staff.search();
                success("保存成功");
            }else {
                $("#editModalOne").modal("hide");
                info(r.msg);
            }
        }
    })
};
/**
 * 更新单条
 */
Staff.updateSet = function () {
    var staffTarget = getFormJson($("#edit-formTwo"));
    if(staffTarget){
        console.log(JSON.stringify(staffTarget));
        if(!Staff.checkOneSet(staffTarget)){
            return
        }
    }else {
        info("请输入数值！");
        return;
    }
    $.ajax({
        url: "/staff/updateTarget",
        type: 'POST',
        data: JSON.stringify(staffTarget),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModalTwo").modal("hide");
                Staff.search();
                success("保存成功");
            }else {
                $("#editModalTwo").modal("hide");
                info(r.msg);
            }
        }
    })
};
/**
 * 更新多条
 */
Staff.setInAll = function () {
    var staffTarget = getFormJson($("#edit-formAll"));
    if(staffTarget){
       console.log(JSON.stringify(staffTarget));
       if(!Staff.checkAllSet(staffTarget)){
           return;
       }else {
           $.ajax({
               url: "/staff/setAll",
               type: 'POST',
               data: JSON.stringify(staffTarget),
               contentType: "application/json;charset=utf-8",
               dataType: "json",
               success: function (r) {
                   if (r.code === 0) {
                       Staff.getProjectAndGroup(staffTarget);
                       $("#editModalAll").modal("hide");
                       success("保存成功");
                   }else {
                       $("#editModalAll").modal("hide");
                       info(r.msg);
                   }
               }
           })
       }
    }else {
        info("请输入数值！");
        return;
    }

};

/**
 * 根据关键词搜索
 */
Staff.search = function () {
    var searchParam = {};
    searchParam.name = $("#name").val().trim();
    searchParam.phone = $("#phone").val().trim();
    searchParam.companyid = $("#companyid").val();
    searchParam.groupid = $("#groupid").val();
    searchParam.pid = $("#pid").val();
    console.log(searchParam);
    // Staff.table.trigger("reloadGrid");
    Staff.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Staff.resetSearch = function () {
    $("#name").val("");
    $("#phone").val("");
    $("#companyid").val("");
    $("#groupid").val("");
    $("#pid").val("");
    Staff.search();
};


/**
 * 编辑弹框
 * @param id    callerConfigId
 */
Staff.edit = function (id) {
    $.ajax({
        url: "/staff/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var staff = r.obj;
                var form = $("#edit-form");
                form.find("input[name='id']").val(staff.id);
                form.find("input[name='name']").val(staff.name);
                form.find("input[name='phone']").val(staff.phone);
                $("#editModal").modal();
            }
        }
    })
};

/**
 * 更新用户
 */
Staff.update = function () {
    var staff = getFormJson($("#edit-form"));
    if(!Staff.checkPhone(staff.phone)){
        return;
    }
    $.ajax({
        url: "/staff/update",
        type: 'POST',
        data: JSON.stringify(staff),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                Staff.search();
                success("保存成功");
            }else {
                $("#editModal").modal("hide");
                info(r.msg);
            }
        }
    })
};
/**
 *  删除坐席 及关联分机用户
 */
Staff.delete=function(id){
    warning("确定删除吗？", "", function () {
        $.ajax({
            url: "/staff/delete",
            type: 'Get',
            data: {"id":id},
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    Staff.search();
                    success("删除成功");
                }else {
                    info(r.msg);
                }
            }
        })
    })
}
/**
 * 设定目标 弹窗 改变项目  更新批次下拉框
 */
Staff.changeCompanyV2 = function () {
    //改变工程  更新项目下拉框
    var companyId =$("#company").val();
    if(companyId==""){
        var htmlc = '<option value="">请选择</option>';
        $("#project").html(htmlc);
    }else{
        var htmlc = '<option value="">请选择</option>';
        $.ajax({
            url: "/staff/getProjectData?companyId=" + companyId,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var projects = r.obj;
                if(projects.length>0){
                    for(var i=0;i<projects.length;i++){
                        htmlc+='<option value="'+projects[i].id+'">'+projects[i].name+'</option>';
                    }
                }
                $("#project").html(htmlc);
            }
        })
    }
    if(companyId==""){
        var html = '<option value="">请选择</option>';
        $("#group").html(html);
    }else{
        var html = '<option value="">请选择</option>';
        $.ajax({
            url: "/staff/getGroupData?companyId=" + companyId,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var groups = r.obj;
                if(groups.length>0){
                    for(var i=0;i<groups.length;i++){
                        html+='<option value="'+groups[i].id+'">'+groups[i].name+'</option>';
                    }
                }
                $("#group").html(html);
            }
        })
    }
};

/**
 * 改变项目  更新批次下拉框
 */
Staff.changeCompany = function () {
    //改变工程  更新项目下拉框
    var companyId =$("#companyid").val();
    if(companyId==""){
        var htmlc = '<option value="">全部</option>';
        htmlc += '<option value="-1">未绑定</option>'
        $("#pid").html(htmlc);
    }else{
        var htmlc = '<option value="">全部</option>';
        htmlc += '<option value="-1">未绑定</option>';
        $.ajax({
            url: "/staff/getProjectData?companyId=" + companyId,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var projects = r.obj;
                if(projects.length>0){
                    for(var i=0;i<projects.length;i++){
                        htmlc+='<option value="'+projects[i].id+'">'+projects[i].name+'</option>';
                    }
                }
                $("#pid").html(htmlc);
            }
        })
    }
    if(companyId==""){
        var html = '<option value="">全部</option>';
        html += '<option value="-1">未绑定</option>'
        $("#groupid").html(html);
    }else{
        var html = '<option value="">全部</option>';
        html += '<option value="-1">未绑定</option>'
        $.ajax({
            url: "/staff/getGroupData?companyId=" + companyId,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var groups = r.obj;
                if(groups.length>0){
                    for(var i=0;i<groups.length;i++){
                        html+='<option value="'+groups[i].id+'">'+groups[i].name+'</option>';
                    }
                }
                $("#groupid").html(html);
            }
        })
    }
};
/**
 * 改变项目  更新批次下拉框
 */
Staff.changeProjectV2 = function () {
    var companyId =$("#company").val();
    var pid=$("#project").val();
    if(companyId==""){
        var html = '<option value="">全部</option>';
        html += '<option value="-1">未绑定</option>';
        $("#group").html(html);
    }else if(!pid){
        var html = '<option value="">全部</option>';

        $.ajax({
            url: "/staff/getGroupData?companyId=" + companyId,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var groups = r.obj;
                if(groups&&groups.length>0){
                    for(var i=0;i<groups.length;i++){
                        html+='<option value="'+groups[i].id+'">'+groups[i].name+'</option>';
                    }
                }
                $("#group").html(html);
            }
        })
    }else if(pid){
        var html = '<option value="">全部</option>';
        $.ajax({
            url: "/staff/getGroupDataBy?project=" + pid+"&&companyId="+companyId,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var groups = r.obj;
                if(groups&&groups.length>0){
                    for(var i=0;i<groups.length;i++){
                        html+='<option value="'+groups[i].id+'">'+groups[i].name+'</option>';
                    }
                }
                $("#group").html(html);
            }
        })
    }
};

/**
 * 配置坐席
 * @param id    extQueueId
 */
Staff.allocationCompany = function () {
    $.ajax({
        url: "/staff/zxget?id="+$("#companyid2").val(),
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                // var extQueue = r.obj.extQueue;
                var boundStaffList = r.obj.boundStaffList;
                var unBoundStaffList = r.obj.unBoundStaffList;
                var form = $("#editZX-form");
                var str = '';
                for (var i = 0; i < boundStaffList.length; i++) {
                    var boundStaff = boundStaffList[i];
                    str += '<option selected value="' + boundStaff.id + '">' + boundStaff.ext + '</option>';
                }
                for (var j = 0; j < unBoundStaffList.length; j++) {
                    var unBoundStaff = unBoundStaffList[j];
                    str += '<option value="' + unBoundStaff.id + '">' + unBoundStaff.ext + ' </option>';
                }
                $(form).find(".dual_select").html(str);
                editDualSelector.bootstrapDualListbox('refresh');
                $("#editZXModal").modal();
            }
        }
    })
};

/**
 * 切换公司查坐席
 * @param id    extQueueId
 */
Staff.checkCompany = function () {
    $.ajax({
        url: "/staff/zxget?id="+$("#companyid2").val(),
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                // var extQueue = r.obj.extQueue;
                var boundStaffList = r.obj.boundStaffList;
                var unBoundStaffList = r.obj.unBoundStaffList;
                var form = $("#editZX-form");
                var str = '';
                for (var i = 0; i < boundStaffList.length; i++) {
                    var boundStaff = boundStaffList[i];
                    str += '<option selected value="' + boundStaff.id + '">' + boundStaff.ext + '</option>';
                }
                for (var j = 0; j < unBoundStaffList.length; j++) {
                    var unBoundStaff = unBoundStaffList[j];
                    str += '<option value="' + unBoundStaff.id + '">' + unBoundStaff.ext + ' </option>';
                }
                $(form).find(".dual_select").html(str);
                editDualSelector.bootstrapDualListbox('refresh');
            }
        }
    })
};


/**
 * 更新队列
 */
Staff.updateZX = function () {
    var extQueue = getFormJson($("#editZX-form"));
    // console.log(extQueue.selectExtIds)
    //判断是否是数组     如果只有一个数据，返回的是字符串，将字符串转化为数组
    if (!Array.isArray(extQueue.selectExtIds)) {
        // var arr = extQueue.selectExtIds.toArray();
        var arr = [];
        arr.push(extQueue.selectExtIds);
        extQueue.selectExtIds = arr;
    }
    $.ajax({
        url: "/staff/zxupdate",
        type: 'POST',
        data: JSON.stringify(extQueue),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editZXModal").modal("hide");
                Staff.search();
                success("保存成功");
            } else if (r.code == 1) {
                success(r.message);
            }
        }
    })
};


/**
 * 修改密码弹框
 * @param id    callerConfigId
 */
Staff.editPassword = function (id) {
    $("#passwordEditStaff-form").find("input[name=id]").val(id);
    $("#passwordEditStaff-form").find("input[name=oldPassword]").val("");
    $("#passwordEditStaff-form").find("input[name=newPassword]").val("");
    $("#passwordEditStaff-form").find("input[name=repeatNewPassword]").val("");
    // alert(document.getElementById("type1").className);
    if($("#type1").hasClass("fa-eye")){
        document.getElementById("type1").className="fa fa-eye-slash";
    }
    if($("#type2").hasClass("fa-eye")){
        document.getElementById("type2").className="fa fa-eye-slash";
    }
    if($("#type3").hasClass("fa-eye")){
        document.getElementById("type3").className="fa fa-eye-slash";
    }
    check(".password1");
    check(".password2");
    check(".password3");
    $("#editPasswordStaffModal").modal();
};

//密码眼睛开关
function check(str){
    $(str).on("click", ".fa-eye-slash", function () {
        $(this).removeClass("fa-eye-slash").addClass("fa-eye");
        $(this).prev().attr("type", "text");
    });

    $(str).on("click", ".fa-eye", function () {
        $(this).removeClass("fa-eye").addClass("fa-eye-slash");
        $(this).prev().attr("type", "password");
    });
}
//默认眼睛闭着
function close(str){
    $(str).on("click", ".fa-eye", function () {
        $(this).removeClass("fa-eye").addClass("fa-eye-slash");
        $(this).prev().attr("type", "password");
    });
}



/**
 * 更新密码
 */
Staff.updatePassword = function () {
    var id = $("#passwordEditStaff-form").find("input[name=id]").val();
    var oldPassword =  $("#passwordEditStaff-form").find("input[name=oldPassword]").val();
    var newPassword =  $("#passwordEditStaff-form").find("input[name=newPassword]").val();
    // alert(id);
    var repeatNewPassword =  $("#passwordEditStaff-form").find("input[name=repeatNewPassword]").val();
    $.ajax({
        url: "/staff/updatePassword",
        type: 'POST',
        data: JSON.stringify({
            id:id,
            oldPassword:oldPassword,
            newPassword:newPassword,
            repeatNewPassword:repeatNewPassword
        }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editPasswordStaffModal").modal("hide");
                success("修改成功");
                $("#passwordEditStaff-form")[0].reset();
            }else {
                $("#editPasswordStaffModal").modal("hide");
                info(r.msg);
            }
        }
    })
};

/**
 * 重置密码
 */
Staff.resetPassword = function (id) {
    warning("确定重置吗", "", function () {
        $.ajax({
            url: "/staff/resetPassword",
            type: 'POST',
            data: JSON.stringify({
                id: id
            }),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    success("重置密码成功");
                }else {
                    info(r.msg);
                }
            }
        })
    })
};
/**
 * 复制地址
 */
Staff.copyUrl=function () {
    var input = $('#copyUrl');
    var url=$('#copy').val();
    var companyId=$("#companyid").val();
    if(!companyId||companyId==-1){
        info("请选择公司");
        return;
    }
    input.val(url+"?cid="+companyId);
    input.select();
    document.execCommand("Copy");
}
var dualOptions = {
    selectorMinimalHeight: 160,
    selectedListLabel: "已选：",
    nonSelectedListLabel: "未选：",
    // showFilterInputs: false,
    infoText: false,
};

$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", Staff.initOptions());
    Staff.table = jqGrid.init();
    editDualSelector = $("#editZX-form").find(".dual_select").bootstrapDualListbox(dualOptions);

});