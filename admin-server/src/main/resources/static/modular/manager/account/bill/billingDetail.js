var BillingDetail = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    domain:"billing",
    table: null
};

//loading button
var ladda;
//定时器
var interval;

/**
 * jqGrid初始化参数
 */
BillingDetail.initOptions = function () {
    var options = {
        url : "/getProgectDetail",
        autowidth:true,
        postData : {
            companyid :$("#companyid").val(),
            pid:$("#pid").val(),
            dateTime:new Date($("#startDate").val().replace(/-/g,"/"))
        },
        colNames: ['','项目', '手机号','呼叫时间', '通话时长(秒)','AI计费（元）', '通话费用（元）','合计费用（元）',  '操作'],////, '处理队列'
        colModel: [
            {name: 'objectId', index: 'objectId', width: 100, sorttype: false,hidden:true},
            {name: 'pname', index: 'pname', width: 100, sorttype: false},
            {name: 'phone', index: 'phone', width: 100, sortable: false},
            {name: 'time', index: 'time', width: 100, sortable: false},
            {name: 'phoneTime', index: 'phoneTime', width: 100, sortable: false,formatter:function(cellValue,options,rowObject){
                    var phoneTime = rowObject['phoneTime'];
                    return phoneTime+"s";
                }},
            {name: 'aiMoney', index: 'aiMoney', width: 100, sortable: false,formatter:function (cellValue,options,rowObject) {
                    var aiMoney = rowObject['aiMoney'];
                    return "￥"+aiMoney;
                }},
            {name: 'phoneMoney', index: 'phoneMoney', width: 100, sortable: false,formatter:function (cellValue,options,rowObject) {
                    var phoneMoney = rowObject['phoneMoney'];
                    return "￥"+phoneMoney;
                }},
            {name: 'allMoney', index: 'allMoney', width: 100, sortable: false,formatter:function (cellValue,options,rowObject) {
                    var allMoney = rowObject['allMoney'];
                    return "￥"+allMoney;
                }},
            {name: 'pid', index: 'pid', width: 100, sortable: false,formatter: function (cellvar, options, rowObject) {
                    var phone=rowObject['phone'];
                    var objectId=rowObject['objectId'];
                    console.info("1212:"+objectId)
                    var str ='<button class="btn btn-sm btn-primary" onclick="BillingDetail.toQuality(\''+phone+'\',\''+objectId+'\');">质检</button>';
                    return str;
            }}
            ],
        gridComplete: function () {
            $.ajax({
               type:"post",
                url:"/liss",
                data:{pId:$("#projectName").val(),dateTime:$("#startDate").val(),companyId:$("#companyName").val()},
                dataType : "json",
                success:function (r) {
                   if(r.code===0){
                       var data=r.obj;
                       var result = data.result;
                       $("#nowTime").html(result.nowTime);
                       $("#totalnum").html(result.totalnum);
                       $("#sumainum").html(result.sumainum);
                       $("#order").html(result.order);
                       $("#consume").html(result.consume);
                   }
                }
            });
        }
    };
    return options;
};
/**
 * 根据关键词搜索
 */
BillingDetail.search = function () {
    var searchParam = {};
    searchParam.companyid = $("#companyName").val();
    // searchParam.month = $("#month").val();
    var startDate = $("#startDate").val();
    startDate = startDate.replace(/-/g,"/");
    var date = new Date(startDate );
    searchParam.dateTime = date;
    searchParam.pid =  $("#projectName").val();
    BillingDetail.table.reload(searchParam);
};
//初始化日期插件
function initDateTimePicker() {
    var dateTimePickerOption = {
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        startView: 2,
        minView: 2,
        forceParse: false,
        language: 'zh-CN'
    };
    var startDate = $('#startDate');
    startDate.val($("#dateTime").val());
    startDate.datetimepicker(dateTimePickerOption);
}
BillingDetail.projectNameSelected = function(companyId, $select) {
    $.ajax({
        url: "/getCompanyProject?companyId=" + companyId+"&date="+$("#startDate").val(),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            if (r.code === 0) {
                BillingDetail.resetSelect($select, r.obj);
            } else {
                info("错误", r.msg);
            }
        },
    })
}
//重置select选择框
BillingDetail.resetSelect= function($select, list) {
    $($select).empty();
    var pid = $("#pid").val();
    var html = "";
    for (var i = 0; i < list.length; i++) {
        if (pid==list[i].id) {
            html += "<option selected value='" + list[i].id + "'>" + list[i].name + "</option>";
        } else {
            html += "<option value='" + list[i].id + "'>" + list[i].name + "</option>";
        }
    }
    $($select).append(html);
}
/**
 * 具体质检页面
 */
BillingDetail.toQuality = function (phone,phoneId) {
    window.open("/leadsquality/detailComm?&companyId="+$("#companyName").val()
        +"&phone="+phone+"&projectId="+$("#projectName").val()+"&phoneId="+phoneId+"&time="+$("#startDate").val()+"&endState=");
}
$(function() {

    //初始化日期插件
    initDateTimePicker();
    var projectName = $("#projectName");
    BillingDetail.projectNameSelected($("#companyName").val(),$(projectName));

    $("#companyName").change(function () {
        var projectName = $("#projectName");
        BillingDetail.projectNameSelected(this.value, $(projectName));
    });
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", BillingDetail.initOptions());
    BillingDetail.table = jqGrid.init();
});