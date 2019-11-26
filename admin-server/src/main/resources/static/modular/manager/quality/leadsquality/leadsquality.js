var LeadsQuality = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    domain: "leads_quality" ,
    table: null
};


/**
 * jqGrid初始化参数
 */
LeadsQuality.initOptions = function () {
    var options = {
        url : "/leadsquality/grid",
        postData: {
            companyId: $("#companyId").val(),
            projectId : $("#projectId").val(),
            status: $("#state").val(),
            time : $("#date").val(),
            phone : $("#phone").val().trim(),
            verifystate : $("#verifystate").val(),
            seat : $("#seat").val(),
        },
        autowidth:true,
        multiselect: true,
        sortname: "_id",    //默认排序的字段
        sortorder: "asc",  //默认排序方向
        colNames: ['企业名称','项目名称', '批次号','客户手机号','phoneId','通话时长','时间', '状态','审核情况','操作'],
        colModel: [
            {name: 'companyName', index: 'companyName', width: 90, align: "center",sortable: false},
            {name: 'projectName', index: 'projectName', width: 90, align: "center",sortable: false},
            {name: 'note', index: 'note', width: 90, align: "center",sortable: false},
            {name: 'phone', index: 'phone', width: 100, sortable: false ,align: "center"},
            {name: 'phoneid', index: 'phoneid', width: 100, sortable: false ,hidden:true},
            {name: 'duration', index: 'duration', width: 70,align: "center",sortable: false,formatter: function (cellvar, options, rowObject) {
                var duration=rowObject["duration"];
                if(duration==""|| duration==undefined){
                    return "";
                }
                return MillisecondToDate(duration);
            }},
            {name: 'inittime', index: 'inittime', width: 100,align: "center", editable: false,formatter: function (cellvar, options, rowObject) {
                if(cellvar==""|| cellvar==undefined){
                    return "";
                }
                var da = new Date(cellvar);
                return dateFtt("yyyy-MM-dd hh:mm:ss",da);
            }
            },
            {name: 'status', index: 'status', width: 60,align: "center", formatter: function (cellvar, options, rowObject) {
                var state=rowObject["status"];
                if(state == 1){
                    return "机器人通话";
                }
                if(state == 2){
                    return "待切换人工";
                }
                if(state == 3){
                    return "人工通话";
                }
                if(state == 4){
                    return "监听";
                }
                if(state == 10){
                    return "结束";
                }
                if(state == 11){
                    return "成功提交Leads";
                }
                if(state == 12){
                    return "失败";
                }
                if(state == 13){
                    return "成功未质检";
                }
                if(state == 14){
                    return "已质检成功";
                }
                if(state == 15){
                    return "已质检失败";
                }
                if(state == 16){
                    return "需回访";
                }
                return "";

            }},
            {name: 'verify', index: 'verify', width: 60,align: "center", formatter: function (cellvar, options, rowObject) {
                    var verify=rowObject["verify"];
                    if(verify == 1){
                        return "审核合格";
                    }
                    if(verify == 0){
                        return "审核不合格";
                    }
                    return "未审核";
                }},
            {name: 'operate', index: 'operate', width: 150, editable: false, sortable: false, formatter: function (cellvar, options, rowObject) {
                var phoneId=rowObject["id"];
                var status=rowObject["status"];
                var projectName = rowObject["projectName"];
                var batchName = rowObject["note"];
                var str ='<button class="control-auth btn btn-sm btn-primary"  data-auth="leadsquality_quality" onclick="LeadsQuality.toQuality(\''+phoneId+'\');">质检</button>';
                return str;
            }}

        ],
        gridComplete: function () {
            refreshPermission(LeadsQuality.domain);
        },
        loadComplete: function () {
            var param=$("#params").val();
            if (param!==undefined&&param!=="-1"){
                var jparam= $.parseJSON(param)
                $("#companyId").val(jparam.companyId);
                $("#projectId").val(jparam.projectId);
                $("#failQuestion").val(jparam.failQuestion);
                $("#failQuestion").val(jparam.failQuestion);
                $("#timeParam").val(jparam.time);
                initDateTimePicker();
                LeadsQuality.search();
            }
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
LeadsQuality.search = function () {

    var searchParam = {};
    if($("#date").val()==""||$("#date").val()==null){
        info("必须选择时间");
        return ;
    }
    if($("#projectId").val()==""||$("#projectId").val()==null){
        if ($("#phone").val()==""||$("#phone").val()==null) {
            info("没填手机号的情况下，必须选择项目");
            return;
        }
    }

    var phoneval=$("#phone").val().trim();
    if ($("#state").val()===''&&(phoneval===undefined||phoneval==='')){
        $("#state").val(14);
        info( '只有填写了手机号的情况下才能选状态不限！');
    }

    searchParam.companyId = $("#companyId").val();
    searchParam.projectId = $("#projectId").val();
    // searchParam.batchname = $("#batchname").val();
    searchParam.status = $("#state").val();
    searchParam.seat = $("#seat").val();
    searchParam.phone = $("#phone").val().trim();
    searchParam.time = $("#date").val();
    // searchParam.qualityUser=$("#qualityUser").val();
    // searchParam.hour = $("#hour").val();
    searchParam.verifystate=$("#verifystate").val();
    if (LeadsQuality.table === null) {
        var jqGrid = new JqGrid("#grid-table", "#grid-pager", LeadsQuality.initOptions());
        LeadsQuality.table = jqGrid.init();
    }else{
        LeadsQuality.table.reload(searchParam);
    }
};

/**
 * 重置搜索
 */
LeadsQuality.resetSearch = function () {
    // $("#companyId").val("");
    // $("#projectId").val("");
    $("#companyId").prop('selectedIndex', 0);
    $("#projectId").prop('selectedIndex', 0);
    // $("#batchname").val("");
    $("#state").val(14);
    $("#seat").val("");
    $("#phone").val("");
    // $("#qualityUser").val("");
    $("#verifystate").val("");
    // $("#hour").val("");
    initDateTimePicker();
    // LeadsQuality.search();
};




/**
 * 具体质检页面
 */
LeadsQuality.toQuality = function (phoneId) {
        window.open("/leadsquality/detailComm?phoneId="+phoneId+"&companyId="+$("#companyId").val()
            +"&phone="+$("#phone").val()+"&projectId="+$("#projectId").val()+
            "&status="+$("#state").val()+
            "&time="+$("#date").val());
};


/**
 * 改变企业  更新批次下拉框
 */
LeadsQuality.changeCompany = function () {
    var phoneval=$("#phone").val().trim();
    if ($("#state").val()===''&&(phoneval===undefined||phoneval==='')){
        $("#state").val(14);
        info( '只有填写了手机号的情况下才能选状态不限！');
    }
    //改变企业  更新项目下拉框
    var companyId =$("#companyId").val();
    if(companyId==""){
        if (phoneval===undefined||phoneval==='') {
            $("#companyId").get(0).selectedIndex =1;
            info( '只有填写了手机号的情况下才能选公司不限！');
        }else{
            $("#projectId").html('<option value="">不限</option>');
        }
        // $("#batchId").html('<option value="">不限</option>');
    }else{
        // $("#batchId").html('<option value="">不限</option>');
        // var html = '<option value="">不限</option>';
        var html = '';
        $.ajax({
            url: "/leadsquality/getProjectData?companyId=" + companyId,
            type: 'GET',
            async : false,
            dataType: "json",
            success: function (r) {
                var projects = r.obj;
                if(projects.length>0){
                    for(var i=0;i<projects.length;i++){
                        if (i===0){
                            html+='<option value="'+projects[i].id+'" selected>'+projects[i].name+'</option>';
                        } else{
                            html+='<option value="'+projects[i].id+'">'+projects[i].name+'</option>';
                        }

                    }
                }
                $("#projectId").html(html);
            }
        })
    }

    LeadsQuality.changeProject();

}


//改变项目状态
LeadsQuality.changeProject = function () {
    //改变项目  更新批次下拉框
    var projectId =$("#projectId").val();
    if(projectId==""){
        // $("#batchId").html('<option value="">不限</option>');
        $("#seat").html('<option value="">不限</option>');
        $('#seat').trigger('chosen:updated');
    }else{
        // var html = '<option value="">不限</option>';
        // $.ajax({
        //     url: "/leadsquality/getBatchData?projectId=" + projectId+"&time="+$("#batchDate").val(),
        //     type: 'GET',
        //     dataType: "json",
        //     success: function (r) {
        //         var batch = r.obj;
        //         if(batch.length>0){
        //             for(var i=0;i<batch.length;i++){
        //                 html+='<option value="'+batch[i].id+'">'+batch[i].note+'</option>';
        //             }
        //         }
        //         $("#batchId").html(html);
        //     }
        // })
        var seatHtml = '<option value="">不限</option>';
        $.ajax({
            url: "/leadsquality/getSeatData?projectId=" + projectId,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var staff = r.obj;
                if(staff.length>0){
                    for(var i=0;i<staff.length;i++){
                        seatHtml+='<option value="'+staff[i].id+'">'+staff[i].name+'</option>';
                    }
                }
                $("#seat").html(seatHtml);
                $('#seat').trigger('chosen:updated');
            }
        })
    }
}

/**
 * 更新状态
 */
LeadsQuality.changeState=function(){
    var phoneval=$("#phone").val().trim();
    if ($("#state").val()===''&&(phoneval===undefined||phoneval==='')){
        $("#state").val(14);
        info( '只有填写了手机号的情况下才能选状态不限！');
    }
    var curstate=$("#state").val();
    if (curstate==='14') {
        $("#stateverify").show();
    }else{
        $("#stateverify").hide();
    }
}

//导出复用leads
LeadsQuality.download = function () {
    var searchParam = {};
    searchParam.companyId = $("#companyId").val();
    searchParam.projectId = $("#projectId").val();
    // searchParam.batchname = $("#batchname").val();
    searchParam.status = $("#state").val();
    searchParam.seat = $("#seat").val();
    searchParam.phone = $("#phone").val().trim();
    searchParam.time = $("#date").val();
    // searchParam.qualityUser=$("#qualityUser").val();
    searchParam.verifystate=$("#verifystate").val();
    $.ajax({
        type : 'POST',
        url: '/leadsquality/export',
        contentType : "application/json" ,
        data : JSON.stringify(searchParam),
        success : function(data) {
            window.open("/leadsquality/download?key="+data.obj);
        }
    });


}

//提交到超级教练
LeadsQuality.submitSuperCoach = function (id) {
        $.ajax({
            url: "/ai/quality/submitSuperCoach",
            type: 'GET',
            data:{id:id},
            dataType: "json",
            success: function (data) {
                if (data.code == 0) {
                    success('成功', '提交成功');
                } else if (data.code == 405) {
                    success('失败', data.msg);
                } else {
                    success('失败', '提交失败');
                }
            }
        })

}

//初始化日期插件
function initDateTimePicker() {
    var timeParam =$("#timeParam").val();
    var dateTimePickerOption = {
        minView:'month',
        format: 'yyyy-mm-dd',
        todayBtn: true,
        autoclose: true,
        minuteStep: 1
    };
    var startDate = $('#date');
    // var batchDate = $('#batchDate');

    //开始日期默认今天零点
    if(timeParam==""){
        var today = new Date();
        startDate.val(dateFtt("yyyy-MM-dd",today));
        // batchDate.val(dateFtt("yyyy-MM-dd",today));
    }else{
        var today = new Date();
        startDate.val(dateFtt("yyyy-MM-dd",new Date(timeParam.replace(/-/,"/"))));
        // batchDate.val(dateFtt("yyyy-MM-dd",today));
    }

    startDate.datetimepicker(dateTimePickerOption);
    // batchDate.datetimepicker(dateTimePickerOption);
    //结束日期默认明天零点
    dateTimePickerOption.initialDate = today;
}

function MillisecondToDate(msd) {
    var time = parseFloat(msd) /1000;
    if (null!= time &&""!= time) {
        if (time >60&& time <60*60) {
            var   s  = parseInt((parseFloat(time /60.0) -
                parseInt(time /60.0)) *60);
            var m = parseInt(time /60.0);
            time = (m==0?"":m+"分")+ (s==0?"":s +"秒");
        }else if (time >=60*60&& time <60*60*24) {
            var h = parseInt(time /3600.0);
            var m =parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60)
            var   s  = parseInt((parseFloat((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60) -  parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60)) *60)
            time = (h==0?"":h+"时")+(m==0?"":m+"分")+(s==0?"":s+"秒");
        }else {
            time = parseInt(time) +"秒";
        }
    }else{
        time = "0 时 0 分0 秒";
    }
    return time;

}

function dateFtt(fmt,date) { //author: meizz
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

//提交到超级教练
LeadsQuality.toCoach = function(phoneId,status,projectName,batchName){
    if(status!=14){
        toastr.error("非质检成功不能提交至超级教练", "error");
    }else{
        var data ={
            phoneId:phoneId,
            projectName:projectName,
            batchName:batchName
        };
        $.ajax({
            url: "/leadsquality/commitToCoach",
            type: 'POST',
            contentType : "application/json" ,
            data:JSON.stringify(data),
            success: function (r) {
                if (r.code == 0) {
                    success('成功', '提交成功');
                }
            }
        })
    }
}

LeadsQuality.init =function(){
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", LeadsQuality.initOptions());
    LeadsQuality.table = jqGrid.init();
}

$(function() {
    initDateTimePicker();
    LeadsQuality.changeCompany();
    // var jqGrid = new JqGrid("#grid-table", "#grid-pager", LeadsQuality.initOptions());
    // LeadsQuality.table = jqGrid.init();
    $("#seat").chosen();
    LeadsQuality.changeProject();
});