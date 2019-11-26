var StaffGroup = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "staffGroup"
};
/**
 * jqGrid初始化参数
 */
StaffGroup.initOptions = function () {
    var options = {
        url : "/staff_group/grid",
        postData:{},
        dataType:"JSON",
        autowidth:true,
        colNames: ['公司id','项目id','编号', '分组名称', '公司','项目','在线坐席数','创建时间', '操作'],////, '处理队列'
        colModel: [
            {name: 'companyid', index: 'companyid', width: 20, sortable: false,hidden:true},
            {name: 'projectid', index: 'projectid', width: 20, sortable: false,hidden:true},
            {name: 'id', index: 'id', width: 20, sortable: false},
            {name: 'name', index: 'name', width: 50, sortable: false},
            {name: 'companyName', index: 'companyName', width: 50, sortable: false},
            {name: 'projectName', index: 'projectName', width: 50, sortable: false},
            {name: 'staffNum', index: 'staffNum', width: 20, sortable: false,formatter:function (cellValue) {
                    return cellValue+"人";
                }},
            {name: 'createDate', index: 'createDate', width: 60, sortable: false,formatter:function (cellValue) {
                    var time = formatDateTime(new Date(cellValue));
                    return time;
                }},
            {name: 'operations', index: 'operations', width: 100, sortable: false,formatter: function (cellValue, options, rowObject) {
                    var id = rowObject["id"];
                    var companyid = rowObject["companyid"];
                    var projectid = rowObject["projectid"];
                    var str = '';
                    str += '<button  class=" btn btn-sm btn-primary control-auth" data-auth="update"  onclick="StaffGroup.updateModal(' + id + ')">编辑</button>&nbsp;&nbsp;';
                    str += '<button  class=" btn btn-sm btn-danger control-auth" data-auth="delete"  onclick="StaffGroup.delete(' + id + ','+companyid+','+projectid+')">删除</button>&nbsp;&nbsp;';
                    str += '<button  class=" btn btn-sm btn-info control-auth" data-auth="bindingStaff"  onclick="StaffGroup.binding(' + id + ','+companyid+')">绑定坐席</button>&nbsp;&nbsp;';
                    str += '<button  class=" btn btn-sm btn-info control-auth" data-auth="download" onclick="StaffGroup.download(' + id + ','+companyid+')">下载分机密码</button>';
                    str += '<button  class=" btn btn-sm control-auth" data-auth="census" onclick="StaffGroup.census(' + id + ','+companyid+')">统计配置</button>';
                    return str;
                }}
        ],
        gridComplete: function () {
            refreshPermission(StaffGroup.domain);
        }
    };
    return options;
};
var formatDateTime = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var seconds = date.getSeconds();
    seconds = seconds<10?('0'+seconds):seconds;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+seconds;
};
//搜索
StaffGroup.search = function(){
    var params = {};
    params.name=$("#name").val().trim();
    params.companyid=$("#companyIdF").val();
    StaffGroup.table.reload(params);
}
//重置
StaffGroup.reset = function(){
    $("#name").val("");
    $("#companyIdF").val("");
    var params = {};
    params.name=null;
    params.companyid=null;
    StaffGroup.table.reload(params);
}
//编辑
StaffGroup.updateModal = function(id){
    var elem = $("#updateModal");
    $.ajax({
        url:"/staff_group/updateModal?id="+id,
        type:"GET",
        dataType:"JSON",
        success:function (r) {
            if(r.code===0){
                var data = r.obj;
                elem.find("input[name='id']").val(data.id);
                elem.find("input[name='name']").val(data.name);
                elem.find("input[name='companyName']").val(data.companyName);
                elem.find("input[name='companyId']").val(data.companyId);
                $("#updateModal").modal();
            }
        }
    });
}
StaffGroup.update = function(){
    var elem = $("#updateModal");
    var id = elem.find("input[name='id']").val();
    var name = elem.find("input[name='name']").val().trim();
    var companyId = elem.find("input[name='companyId']").val();
    $.ajax({
        url:"/staff_group/update?id="+id+"&name="+name+"&companyId="+companyId,
        type:"GET",
        dataType:"JSON",
        success:function (r) {
            if(r.code===0){
                success("修改成功");
                StaffGroup.search();
                $("#updateModal").modal('hide');
            }else{
                info(r.msg);
            }
        }
    });
}
//绑定界面
StaffGroup.add = function(){
    var elem = $("#createModal").find("#companyid");
    elem.empty();
    $("#createModal").find("input[name='name']").val("");
    $.ajax({
        url:"/staff_group/getCompany",
        type:"GET",
        dataType:"JSON",
        success:function (r) {
            if(r.code===0){
                var data = r.obj;
                for(var i=0;i<data.length;i++){
                    if(i==0){
                        elem.append("<option value=\""+data[i].id+"\" selected>"+data[i].name+"</option>");
                    }else{
                        elem.append("<option value=\""+data[i].id+"\">"+data[i].name+"</option>");
                    }
                }
                $("#createModal").modal();
            }
        }
    });
}
StaffGroup.insert = function(){
    var params = {};
    params.name=$("#createModal").find("input[name='name']").val().trim();
    params.companyid=$("#createModal").find("#companyid").val();
    if(params.name==""){
        info("分组名不能为空！");
        return;
    }else if(params.companyid==""){
        info("公司不能为空！");
        return;
    }
    $.ajax({
        url:"/staff_group/insert",
        data:JSON.stringify(params),
        type:"POST",
        dataType:"JSON",
        contentType:"application/json;charset=utf8",
        success:function (r) {
            if(r.code===0){
                success("绑定成功");
                StaffGroup.search();
                $("#createModal").modal('hide');
            }else{
                info(r.msg);
            }
        }
    });
}
//解绑
StaffGroup.delete = function(id,companyid,projectid){
    warning("确定要删除吗?","",function () {
        $.ajax({
            url:"/staff_group/delete?id="+id+"&companyid="+companyid+"&projectid="+projectid,
            type:"GET",
            dataType:"JSON",
            success:function (r) {
                if(r.code===0){
                    success("删除成功");
                    StaffGroup.search();
                }
            }
        });
    });
}
//配置坐席
StaffGroup.binding = function(id,companyid){
    $.ajax({
        url:"/staff_group/binding?id="+id+"&companyid="+companyid,
        type:"GET",
        dataType:"JSON",
        success:function (r) {
            if(r.code===0){
                var data = r.obj;
                var bindingList = data.bindingList;
                var unbindingList = data.unbindingList;
                var form = $("#editZX-form");
                form.find("input[name='id']").val(id);
                form.find("input[name='companyId']").val(companyid);
                var str = '';
                var bindingIdArr = [];
                for (var i = 0; i < bindingList.length; i++) {
                    var binding = bindingList[i];
                    str += '<option selected value="' + binding.id + '">' + binding.name + '</option>';
                    bindingIdArr.push(binding.id);
                }
                StaffGroup.oldBindingIdArr = bindingIdArr;
                for (var j = 0; j < unbindingList.length; j++) {
                    var unbinding = unbindingList[j];
                    str += '<option value="' + unbinding.id + '">' + unbinding.name + ' </option>';
                }
                $(form).find(".dual_select").html(str);
                editDualSelector.bootstrapDualListbox('refresh');
                $("#editZXModal").modal();
            }
        }
    });
}
//更新坐席
StaffGroup.updateStaff = function () {
    var extQueue = getFormJson($("#editZX-form"));
    var selectExtIds = extQueue.selectExtIds;
    if(!Array.isArray(selectExtIds)){
        var arr = [];
        arr.push(selectExtIds);
        extQueue.selectExtIds = arr;
    }
    //计算出被移除的坐席id
    var removedExtIdArr = [];
    for (var i = 0; i < StaffGroup.oldBindingIdArr.length; i++) {
        if (!contains(extQueue.selectExtIds, StaffGroup.oldBindingIdArr[i])) {
            removedExtIdArr.push(StaffGroup.oldBindingIdArr[i]);
        }
    }
    extQueue.removedExtIds = removedExtIdArr;
    $.ajax({
        url:"/staff_group/updateBinding",
        type:"POST",
        data:JSON.stringify(extQueue),
        dataType:"JSON",
        contentType:"application/json;charset=utf8",
        success:function (r) {
            if(r.code===0){
                $("#editZXModal").modal('hide');
                success("分配成功");
                StaffGroup.search();
            }
        }
    });
};
//下载分机密码
StaffGroup.download = function (id,companyid) {
    $.ajax({
        type : 'GET',
        url: '/staff_group/recharge/export?id=' + id+'&companyid='+companyid,
        success : function(data) {
            if (data.code === 0) {
                window.open("/staff_group/recharge/download?key="+data.obj);
            }else{
                info(data.msg);
            }
        }
    });
}
//统计配置
StaffGroup.census = function (id) {
    var form = $("#census-form");
    $.each(form.find("input[type='number']"),function (i,item) {
       $(item).val("");
    });
    $.ajax({
        url:"/staff_group/censusModal?id="+id,
        type:"GET",
        dataType:"JSON",
        success:function (r) {
            if(r.code===0){
                var durationTime = r.obj;
                if(durationTime!=undefined){
                    var time = JSON.parse(durationTime);
                    addTime(time);
                }
                form.find("input[name='id']").val(id);
                $("#censusModal").modal();
            }
        }
    });
    //赋值
    function addTime(dutationTime){
        var amStartTime = dutationTime.amStartTime;
        var amEndTime = dutationTime.amEndTime;
        var pmStartTime = dutationTime.pmStartTime;
        var pmEndTime = dutationTime.pmEndTime;
        var amStart = detailTime(amStartTime);
        form.find("input[name='amStartHour']").val(amStart[0]);
        form.find("input[name='amStartMinute']").val(amStart[1]);
        var amEnd = detailTime(amEndTime);
        form.find("input[name='amEndHour']").val(amEnd[0]);
        form.find("input[name='amEndMinute']").val(amEnd[1]);
        var pmStart = detailTime(pmStartTime);
        form.find("input[name='pmStartHour']").val(pmStart[0]);
        form.find("input[name='pmStartMinute']").val(pmStart[1]);
        var pmEnd = detailTime(pmEndTime);
        form.find("input[name='pmEndHour']").val(pmEnd[0]);
        form.find("input[name='pmEndMinute']").val(pmEnd[1]);
    }
    //处理时间
    function detailTime(time){
        var arr = new Array();
        arr = time.split(":");
        return arr;
    }
}
//统计配置确认
StaffGroup.censusInsert = function (id) {
    var form = $("#census-form");
    var durationTime = durationTime(form);
    var id = form.find("input[name='id']").val();
    var params={};
    params.id = id;
    params.durationTime = durationTime;
    if(params.durationTime!=""){
        $.ajax({
            url:"/staff_group/censusInsert",
            type:"POST",
            dataType:"JSON",
            data:JSON.stringify(params),
            contentType:"application/json;charset=utf8",
            success:function (r) {
                if(r.code===0){
                    $("#censusModal").modal('hide');
                    success("配置成功");
                }
            }
        });
    }else {
        info("请将时间填写完整");
        return;
    }
    //获取设置时长
    function durationTime(form) {
        var amStartHour = form.find("input[name='amStartHour']").val();
        var amStartMinute = form.find("input[name='amStartMinute']").val();
        var amEndHour = form.find("input[name='amEndHour']").val();
        var amEndMinute = form.find("input[name='amEndMinute']").val();
        var pmStartHour = form.find("input[name='pmStartHour']").val();
        var pmStartMinute = form.find("input[name='pmStartMinute']").val();
        var pmEndHour = form.find("input[name='pmEndHour']").val();
        var pmEndMinute = form.find("input[name='pmEndMinute']").val();
        var amStartTime = checkTime(amStartHour)+":"+checkTime(amStartMinute);
        var amEndTime = checkTime(amEndHour)+":"+checkTime(amEndMinute);
        var pmStartTime = checkTime(pmStartHour)+":"+checkTime(pmStartMinute);
        var pmEndTime = checkTime(pmEndHour)+":"+checkTime(pmEndMinute);
        if(amStartHour==""||amStartMinute==""||amEndHour==""||amEndMinute==""||pmStartHour==""||pmStartMinute==""||pmEndMinute==""||amStartTime==""){
            return "";
        }else {
            var durationTime={};
            durationTime.amStartTime = amStartTime;
            durationTime.amEndTime = amEndTime;
            durationTime.pmStartTime = pmStartTime;
            durationTime.pmEndTime = pmEndTime;
            return JSON.stringify(durationTime);
        }
    }

    function checkTime(time) {
        if(time.length===1){
            return "0"+time;
        }else {
            return time;
        }
    }
}
var dualOptions = {
    selectorMinimalHeight: 160,
    selectedListLabel: "已选：",
    nonSelectedListLabel: "未选：",
    // showFilterInputs: false,
    infoText: false,
};
$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", StaffGroup.initOptions());
    StaffGroup.table = jqGrid.init();
    editDualSelector = $("#editZX-form").find(".dual_select").bootstrapDualListbox(dualOptions);
});