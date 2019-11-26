var Leads = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null ,
    domain: "leads_manager"
};

//从后台接受key数组
var keyArr ;

//从后台接受name数组
var nameArr ;

var colNames;
var colModel = [];


//    for (var i = 0; i < colNames.length; i++) {
//        var name = colNames[i];
//        if(name=='省市'){
//            colNames[i]="省,市";
//        }
//    }



/**
 * jqGrid初始化参数
 */
Leads.initOptions = function () {
    var options = {
        url : "/leads/grid",
        postData: {
            projectId: $("#projectId").val(),
            groupId: $("#staffGroupId").val(),
            startDate: $("#startDate").val(),
            endDate: $("#endDate").val(),
            leadsType : $("#leadsType").val(),
            flg: $("#flg").val(),
            labal: $("#label").val(),
            labelvalue: $("#labelvalue").val(),
        },
        autowidth:true,
        multiselect: false,
        colNames: colNames,
        colModel:colModel,
        gridComplete: function () {
        refreshPermission(Leads.domain);
    }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
Leads.search = function () {
    var checkResult = Leads.check();
    if(checkResult==0){
        return ;
    }
    var searchParam = {};
    searchParam.projectId = $("#projectId").val();
    searchParam.groupId = $("#staffGroupId").val();
    searchParam.startDate = $("#startDate").val();
    searchParam.endDate = $("#endDate").val();
    searchParam.phone = $("#phone").val().trim();
    searchParam.seat = $("#staffId").val();
    searchParam.leadsType = $("#leadsType").val();
    searchParam.province = $("#province").val();
    searchParam.city = $("#city").val();
    searchParam.flg = $("#flg").val();
    searchParam.label = $("#label").val();
    searchParam.labelvalue = $("#labelvalue").val();
    Leads.table.reload(searchParam);
};


/**
 * 重置搜索
 */
Leads.resetSearch = function () {
    $("#phone").val("");
    $("#staffId").val("");
    $("#leadsType").val("");
    $("#province").val("");
    $("#city").val("");
    $("#labelvalue").val("");
    Leads.search();
};


/**
 * 改变项目  更新批次下拉框
 */
Leads.changeCompany = function () {
    //改变工程  更新项目下拉框
    var companyId =$("#companyId").val();
    var html = '<option value="">不限</option>';
    $.ajax({
        url: "/common/company/changed/user?companyId=" + companyId,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            var projects = r.obj;
            if(projects.length>0){
                for(var i=0;i<projects.length;i++){
                    html+='<option value="'+projects[i].id+'">'+projects[i].name+'</option>';
                }
            }
            $("#projectId").html(html);
        }
    })
};


//改变项目状态
Leads.changeProject = function () {
    //改变项目  更新批次下拉框
    var projectId =$("#projectId").val();
    if(projectId==''){
        return ;
    }
    $.ajax({
        type : 'get',
        url: '/leads/getKeyAndNameBypId?pid='+projectId,
        success : function(data) {
            keyArr = data.obj.keys.split(",");
            nameArr = data.obj.names.split(",");
            colNames = nameArr;
            for (var i = 0; i < keyArr.length; i++) {
                var key = keyArr[i];
                colModel.push({
                    name: key, index: key, width: 20, sortable:false
                });
            }
            colNames.unshift("手机号");
            colModel.unshift({
                name: 'phone', index: 'phone', width: 25, sortable:false
            });

            keyArr.unshift("phone");
            console.log(colNames);
            console.log(colModel);
            //销毁jqgrid
            $("#grid-table").GridUnload();
            //初始化jqgrid
            Leads.init();
            //初始化Jqrid后将参数重置
            colNames = null;
            colModel = [];
            console.log(colNames);
            console.log(colModel);

            //标签过滤框
            $("#label").html("");
           // var labellist=data.labelList;
            var arr=['phone','leadsType','province','city','flg'];
            var str="" ;
            for(var i=0;i<keyArr.length;i++){
                //var label=labellist[i];
                if($.inArray(keyArr[i], arr)!=-1){
                    continue;
                }
                str+="<option value='"+keyArr[i]+"' >"+nameArr[i]+"</option>";
            }
            $("#labelDiv").css("display","block");
            $("#label").html(str);
        }
    });

    $.ajax({
        url: "/common/project/changed?pid=" + projectId,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            var staffGroupArr = r.obj;
            $("#staffGroupId").html(buildOptions(staffGroupArr, true));
            $("#staffGroupId").val("");
        }
    });
}

Leads.check = function () {
    var startDate = new Date($("#startDate").val());
    var endDate = new Date($("#endDate").val());
    var projectId = $("#projectId").val();
    var companyId = $("#companyId").val();
    if(companyId==null || projectId == null||companyId=="" || projectId==""){
        info("请选择公司和项目后，在操作");
        return 0;
    }
    if (startDate.getMonth() !== endDate.getMonth()) {
        info("日期区间必须在同一个月内");
        return 0;
    }
    return 1;
}

Leads.init = function(){
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", Leads.initOptions());
    Leads.table = jqGrid.init();
}

Leads.appendCity = function () {
    var province = $("#province").val();
    $.ajax({
        type : 'POST',
        url: '/leads/appendCity',
        data : {
            "province" : province
        },
        dataType : "json",
        success : function(data) {
            var cities = data.obj;
            var selDom = $("#city");
            $("#city").empty();
            selDom.append("<option value='' selected >全部</option>");
            for(var i=0;i<cities.length;i++){
                var city = cities[i];
                selDom.append("<option value='"+city+"'>"+city+"</option>");
            }
        }
    });
}



/**
 * leads导出
 */
$("#leads_download").on("click", function () {
    var colNames=$("#grid-table").jqGrid('getGridParam','colNames')
    var colModel=$("#grid-table").jqGrid('getGridParam','colModel')
    //通过手动增加一个手机号列，长度为3，如果不存在当前项目的列，返回
    var checkResult = Leads.check();
    if(checkResult==0){
        return ;
    }
    if(colModel.length<=1||colNames.length<=1){
        info("请先选择项目");
        return ;
    }

    var content = "<ul id='sortable'>";
    for(var i = 1;i<colNames.length;i++){
        var name = colNames[i];
        var key = colModel[i].name;
        content += "<li class='ui-state-default' style='margin: 0 3px 3px 3px;'><input id='"+key+"' name='"+key+"' type='checkbox' checked = 'true' value='' class='colKey'  />" +
            "<input class='colName' style='border: 0px;' value='"+name+"' />" +
            "<select class='updateDate'><option value ='1'>原数据</option><option value ='2'>替换数据</option> " +
            "<option value ='3'>追加在头</option>" +
            "<option value='4'>追加在尾</option></select><input disabled='true' style='border: 1 solid;' value=''>" +
            "</li>";
    }
    content +="</ul>";
    $("#exportContent").html(content);
    $("#exportModal").modal();
    $("#sortable" ).sortable();
    $("#sortable" ).disableSelection();
    $(".updateDate").on("change", function () {
        var type =  $(this).val();
        if(type == 1){
            $(this).next().attr("disabled",true);
        }else{
            $(this).next().attr("disabled",false);
        }
    });

});

Leads.export = function () {
    $("#exportModal").modal("hide");
    waitMask();
    var keys = [];
    var names = [];
    var dataTypes = [];
    var dataValues = [];
    var dataType=$("#dataType").attr("hidden-data");
    $("input[type='checkbox']").each(function(){
        if($(this).is(":checked"))
        {
            var key = $(this).attr("name");
            var name = $(this).next().val();
            var dataType = $(this).next().next().val();
            var dataValue = $(this).next().next().next().val();
            names.push(name);
            keys.push(key);
            dataTypes.push(dataType);
            dataValues.push(dataValue);
        }else{
        }
    });
    console.log(keys);
    console.log(names);
    console.log(dataTypes);
    console.log(dataValues);
    $.ajax({
        type : 'POST',
        url: '/leads/export',
        contentType : "application/json" ,
        data : JSON.stringify({
            "keys" : keys,
            "names":names,
            "dataTypes": dataTypes,
            "dataValues" : dataValues,
            "startDate": $("#startDate").val(),
            "endDate" : $("#endDate").val(),
            "phone": $("#phone").val().trim(),
            "seat": $("#staffId").val(),
            "leadsType": $("#leadsType").val(),
            "province": $("#province").val(),
            "city": $("#city").val(),
            "flg": $("#flg").val() ,
            "projectId":$("#projectId").val(),
            "groupId":$("#staffGroupId").val(),
            "label": $("#label").val(),
            "labelvalue": $("#labelvalue").val(),
        }),
        success : function(data) {
            window.open("/leads/download?key="+data.obj);
            clearMask();
        }
    });
}



$("#voice_download").on("click", function () {
        waitMask();
        var checkResult = Leads.check();
        if(checkResult==0){
            return ;
        }
        $.ajax({
            type : 'POST',
            url: '/leads/exportVoice',
            data : JSON.stringify({
                "startDate": $("#startDate").val(),
                "endDate" : $("#endDate").val(),
                "projectId":$("#projectId").val(),
                "companyId":$("#companyId").val(),
                "phone": $("#phone").val().trim(),
                "seat": $("#staffId").val(),
                "leadsType": $("#leadsType").val(),
                "province": $("#province").val(),
                "city": $("#city").val(),
                "flg": $("#flg").val(),
                "groupId":$("#staffGroupId").val(),
                "label": $("#label").val(),
                "labelvalue": $("#labelvalue").val(),
            }),
            contentType : "application/json" ,
            success : function(data) {
                clearMask();
                if (data.code === 0) {
                    window.open("/leads/downloadVoice?key=" + data.obj);
                }
            }
        });
});

$("#h2_voice_download").on("click", function () {
    waitMask();
    var checkResult = Leads.check();
    if(checkResult==0){
        return ;
    }
    $.ajax({
        type : 'POST',
        url: '/leads/exportH2Voice',
        data : JSON.stringify({
            "startDate": $("#startDate").val(),
            "endDate" : $("#endDate").val(),
            "projectId":$("#projectId").val(),
            "companyId":$("#companyId").val(),
            "phone": $("#phone").val(),
            "seat": $("#seat").val(),
            "leadsType": $("#leadsType").val(),
            "province": $("#province").val(),
            "city": $("#city").val(),
            "flg": $("#flg").val(),
            "groupId":$("#staffGroupId").val()
        }),
        contentType : "application/json" ,
        success : function(data) {
            clearMask();
            if(data.code == 0){
                window.open("/leads/downloadVoice?key=" + data.obj);
            }
        }
    });
});

$("#h2_voice_download2").on("click", function () {
    waitMask();
    var checkResult = Leads.check();
    if(checkResult==0){
        return ;
    }
    $.ajax({
        type : 'POST',
        url: '/leads/exportH2Voice2',
        data : JSON.stringify({
            "startDate": $("#startDate").val(),
            "endDate" : $("#endDate").val(),
            "projectId":$("#projectId").val(),
            "companyId":$("#companyId").val(),
            "phone": $("#phone").val(),
            "seat": $("#seat").val(),
            "leadsType": $("#leadsType").val(),
            "province": $("#province").val(),
            "city": $("#city").val(),
            "flg": $("#flg").val(),
            "groupId":$("#staffGroupId").val(),
            "label": $("#label").val(),
            "labelvalue": $("#labelvalue").val(),
        }),
        contentType : "application/json" ,
        success : function(data) {
            clearMask();
            if (data.code === 0) {
                window.open("/common/download?key=" + data.obj + "&originalName=voice.zip");
            }
        }
    });
});

//初始化日期插件
function initDateTimePicker() {
    var dateTimePickerOption = {
        format: 'yyyy-mm-dd hh:ii',
        todayBtn: true,
        autoclose: true,
        minuteStep: 1
    };
    var startDate = $('#startDate');
    var endDate = $('#endDate');
    //开始日期默认今天零点
    var today = new Date();
    var year = today.getFullYear(),
        month = today.getMonth() + 1,//月份是从0开始的
        day = today.getDate();
    var date = year + '-' +
        month + '-' +
        day + " 00:00";
    var endDateString = year + '-' +
        month + '-' +
        day + " 23:59";

    startDate.val(dateFtt("yyyy-MM-dd hh:mm",new Date(date)));
    startDate.datetimepicker(dateTimePickerOption);
    //结束日期默认明天零点
    endDate.val(dateFtt("yyyy-MM-dd hh:mm",new Date(endDateString)));
    dateTimePickerOption.initialDate = today;
    endDate.datetimepicker(dateTimePickerOption);
    startDate.datetimepicker().on('changeDate', function(e){
        endDate.datetimepicker('setStartDate', e.date);
    });
    endDate.datetimepicker().on('changeDate', function(e){
        startDate.datetimepicker('setEndDate', e.date);
    });
}


function dateFtt(fmt,date)
{ //author: meizz
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

var $company = $("#companyId");
var $project = $("#projectId");
var $staffGroup = $("#staffGroupId");
var $staff = $("#staffId");

$(function() {
    //初始化日期插件
    initDateTimePicker();

    //企业下拉框绑定change事件
    $company.on("change", function () {
        companyChanged($company, $project, true);
    });
    $project.on("change", function () {
        projectChanged($project, $staffGroup, true, Leads.changeProject);
    });
    $staffGroup.on("change", function () {
        staffGroupChanged($staffGroup, $staff, true);
    });
    //手动触发企业选中
    $company.trigger("change");
});