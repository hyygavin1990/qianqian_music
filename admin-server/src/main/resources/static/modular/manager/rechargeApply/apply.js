var Apply = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "rechargeApply"
};

/**
 * jqGrid初始化参数
 */
Apply.initOptions = function () {
    var options = {
        url : "/rechargeApply/grid",
        postData: {
            // month: $("#month").val(),
            // startDay: $("#startDay").val(),
            // endDay: $("#endDay").val()
            inittime:$("#inittime").val(),
            status:parseInt($("#status").val())
        },
        autowidth:true,
        sortname: "inittime",
        sortorder: "asc",
        colNames: ['公司', '申请金额（元）', '申请时间','申请人','申请备注', '状态', '审核人','审核时间','审核备注'],
        colModel: [
            {name: 'company', index: 'company', width: 50,sortable: false,align:"center"},
            {name: 'money', index: 'money', width: 30, sortable: false,align:"center",formatter:function (cellValue) {
            if(cellValue!=null){
                return "￥"+cellValue/1000;
            }else {
             return "￥0.000";
            }
        }},
            {name: 'inittime', index: 'inittime', width: 30,align:"center"},
            {name: 'applyname', index: 'applyname', width: 70, sortable: false,align:"center"},
            {name: 'applymemo', index: 'applymemo', width: 40, sortable: false,align:"center"},
            {name: 'status', index: 'status', width: 50, sortable: false,align:"center", formatter: function (cellValue, options, rowObject) {
                if(cellValue ===1){
                    return "审核通过";
                }else if (cellValue===2) {
                    return "审核失败";
                }else{
                    return "未审核";
                }
            }},
            {name: 'checkname', index: 'checkname', width: 30, sortable: false,align:"center"},
            {name: 'audittime', index: 'audittime', width: 70, sortable: false,align:"center"},
            {name: 'memo', index: 'memo', width: 40, sortable: false,align:"center"}
            // {name: 'operations', index: 'operations', width: 280, sortable: false, formatter: function (cellValue, options, rowObject) {
            //     var id = rowObject["id"];
            //     var state = rowObject["state"];
            //     var str = '';
            //     var style=cellValue == 1 ? "" : "";
            //     // str += '<input type="button" class="control-auth btn btn-sm btn-info" data-auth="cti_edit" value="编辑" onclick="Cti.edit(' + id + ')"/>&nbsp;';
            //     return str;
            // }}
        ],
        gridComplete: function () {
            refreshPermission(Apply.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
Apply.search = function () {
    var searchParam = {};
    searchParam.companyid = $("#companyId").val();
    searchParam.status= $("#status").val();
    searchParam.inittime= $("#inittime").val();
    searchParam.endtime= $("#inittimeEnd").val();
    Apply.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Apply.resetSearch = function () {
    var dateTimePickerOption = {
        minView:'month',
        format: 'yyyy-mm-dd',
        todayBtn: true,
        autoclose: true,
        minuteStep: 1
    };
    var startDate = $('#inittime');
    var endDate =$('#inittimeEnd');
    //开始日期默认今天零点
    var today = new Date();
    var date = today.toLocaleDateString().replace(/\//g, "-");
    startDate.val(date);
    startDate.datetimepicker(dateTimePickerOption);
    endDate.val(date);
    endDate.datetimepicker(dateTimePickerOption);
    //结束日期默认明天零点
    dateTimePickerOption.initialDate = today;
    $("#companyId").val("");
    $("#status").val("0");
    Apply.search();
};

/**
 * 新增弹框
 */
Apply.create = function () {
    $("#createModal").modal();
};

function initDateTimePicker() {
    var dateTimePickerOption = {
        minView:'month',
        format: 'yyyy-mm-dd',
        todayBtn: true,
        autoclose: true,
        minuteStep: 1
    };
    var startDate = $('#inittime');
    var endDate =$('#inittimeEnd');
    //开始日期默认今天零点
    var today = new Date();
    var date = today.toLocaleDateString().replace(/\//g, "-");
    startDate.val(date);
    startDate.datetimepicker(dateTimePickerOption);
    endDate.val(date);
    endDate.datetimepicker(dateTimePickerOption);
    //结束日期默认明天零点
    dateTimePickerOption.initialDate = today;
}

$(function() {
    initDateTimePicker();
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", Apply.initOptions());
    Apply.table = jqGrid.init();

    // $('#inittime').val("");
});