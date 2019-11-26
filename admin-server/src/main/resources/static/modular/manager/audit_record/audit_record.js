var AuditRecord = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "auditRecord"
};
/**
 * jqGrid初始化参数
 */
AuditRecord.initOptions = function () {
    var options = {
        url : "/auditRecord/grid",
        postData:{
            companyid:$("#companyId").val(),
            status :$("#status").val(),
            starttime:$("#startTime").val(),
            endtime:$("#endTime").val()
        },
        autowidth:true,
        colNames: ['公司', '申请金额（元）', '类型', '申请时间', '申请人','申请说明','审核人','审核时间','状态','失败原因','操作'],
        multiselect: false,
        colModel: [
            /*{name: 'id', index: 'id', width: 60,hidden:true, sorttype: "int"},*/
            {name: 'companyname', index: 'companyname', width: 100},
            {name: 'money', index: 'money', width: 100, sortable: false,formatter:function (cellValue) {
                    var money = cellValue/1000;
                    return '￥'+money.toFixed(3);
                }},
            {name: 'type', index: 'type', width: 100, sortable: false,formatter:function (cellValue) {
                    if(cellValue===2){
                        return '充值'
                    }else if(cellValue===3){
                        return '其他消费'
                    }else if(cellValue===4){
                        return '平台补贴'
                    } else {
                        return "";
                    }
                }},
            {name: 'inittime', index: 'inittime', width: 100, sortable: false},
            {name: 'username', index: 'username', width: 100, sortable: false},
            {name: 'applymemo', index: 'applymemo', width: 100, sortable: false},
            {name: 'auditorname', index: 'auditorname', width: 100, sortable: false},
            {name: 'audittime', index: 'audittime', width: 100, sortable: false},
            {name: 'status', index: 'status', width: 100, sortable: false,formatter:function (cellValue) {
                    if(cellValue==1){
                        return '审核通过'
                    }else if(cellValue==2){
                        return '审核失败'
                    }else{
                        return '审核中'
                    }
                }},
            {name: 'memo', index: 'memo', width: 100, sortable: false},
            {name: 'operations', index: 'operations', width: 120, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var status = rowObject["status"];
                var companyid = rowObject["company_id"];
                var userid = rowObject["userid"];
                var applymemo = rowObject["applymemo"];
                var companyname = rowObject["companyname"];
                var money = rowObject["money"]/1000;
                var type = rowObject["type"];
                var str='';
                if(status==0){
                    str = '<input type="button" class="btn btn-sm btn-primary" value="通过" onclick="AuditRecord.recharge('+id+',' + companyid + ',' + type + ','+userid+',\''+companyname+'\','+money.toFixed(3)+',\''+applymemo+'\')"/>&nbsp;';
                    str += '<input type="button" class="btn btn-sm btn-danger" value="打回" onclick="AuditRecord.failed('+id+',\''+companyname+'\','+money.toFixed(3)+')"/>';;
                }else {
                    str = '<input type="button" class="btn btn-sm btn-primary" disabled value="通过"/>&nbsp;';
                    str += '<input type="button" class="btn btn-sm btn-danger" disabled value="打回"/>';;
                }
                return str;
            }}
        ],
        gridComplete: function () {
            refreshPermission(AuditRecord.domain);
        }
    };
    return options;
};

AuditRecord.recharge = function(id,companyid,type,userid,companyname,money,applymemo) {
    var accountlog={};
    accountlog.money = money*1000;
    accountlog.id = companyid;
    accountlog.memo = applymemo;
    accountlog.arid = id;
    accountlog.status = 1;
    accountlog.userid = userid;
    accountlog.type = type;
    var reminder = "";
    if(type==2){
        reminder = "充值金额为:";
    }else if(type ==4){
        reminder = "平台补贴为:"
    }else{
        reminder = "其他扣款为:"
    }
    warning("请确定通过",companyname+reminder+money+"元", function () {
        $.ajax({
            url: "/company/doRecharge",
            type: 'POST',
            data: JSON.stringify(accountlog),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    AuditRecord.search();
                    success("保存成功");
                }
            }
        })
    })
};

AuditRecord.failed=function(id,name,money){
    var form= $("#recharge-form");
    $("#recharge-form input").val("");
    form.find("input[name='id']").val(id);
    form.find("input[name='name']").val(name);
    form.find("input[name='money']").val("￥"+money);
    $("#rechargeModal").modal();
}

AuditRecord.doRecharge=function(){
    var form= $("#recharge-form");
    var memo=form.find("input[name='memo']").val().trim();
    var id=form.find("input[name='id']").val();
    $.ajax({
        url: "/auditRecord/update?memo="+memo+"&id="+id,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#rechargeModal").modal("hide");
                AuditRecord.search();
                success("保存成功");
            }
        }
    })
}
/**
 * 根据关键词搜索
 */
AuditRecord.search = function () {
    var searchParam = {};
    searchParam.companyid = $("#companyId").val();
    searchParam.status=$("#status").val();
    searchParam.starttime=$("#startTime").val();
    searchParam.endtime=$("#endTime").val();
    AuditRecord.table.reload(searchParam);
};
//初始化日期插件
function initDateTimePicker() {
    var dateTimePickerOption = {
        minView:'month',
        format: 'yyyy-mm-dd',
        todayBtn: true,
        autoclose: true,
        minuteStep: 1
    };
    var startTime = $('#startTime');
    var endTime = $('#endTime');
    //开始日期默认今天零点
    var today = new Date();
    startTime.val(dateFtt("yyyy-MM-dd",today));
    endTime.val(dateFtt("yyyy-MM-dd",today));
    startTime.datetimepicker(dateTimePickerOption);
    endTime.datetimepicker(dateTimePickerOption);
    //结束日期默认明天零点
    dateTimePickerOption.initialDate = today;
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
$(function() {
    //初始化日期插件
    initDateTimePicker();
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", AuditRecord.initOptions());
    AuditRecord.table = jqGrid.init();
});