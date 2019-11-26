var PhoneLog = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null
};


/**
 * jqGrid初始化参数
 */
PhoneLog.initOptions = function () {
    var date = new Date();
    var month = $('#month');
    month.val(DateFormat.format(date, "yyyy-MM"));
    month.datepicker({
        minViewMode: 1,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayHighlight: true,
        format: "yyyy-mm",
        language: "zh-CN"
    });

    var currentDay = date.getDate();
    $("#startDay").val(currentDay);
    $("#endDay").val(currentDay);
    var options = {
        url : "/project/phone_batch/phone_log/grid",
        postData: {
            projectId: $("#pid").val(),
            batchId: $("#batchId").val()
            // month: $("#month").val(),
            // startDay: $("#startDay").val(),
            // endDay: $("#endDay").val()
        },
        rowNum: 20,
        autowidth:true,
        sortname: "inittime",
        sortorder: "desc",
        colNames: ['号码', '外呼时间', '接通时间', '通话时长', '操作'],
        colModel: [
            {name: 'phone', index: 'phone', width: 70, sortable: false},
            {name: 'calltime', index: 'calltime', width: 100, sortable: true, formatter: function (cellValue) {
                    if (cellValue) {
                        return DateFormat.format(new Date(cellValue), "yyyy-MM-dd hh:mm:ss");
                    } else {
                        return "";
                    }
                }},
            {name: 'starttime', index: 'starttime', width: 100, sortable: false, formatter: function (cellValue) {
                    if (cellValue) {
                        return DateFormat.format(new Date(cellValue), "yyyy-MM-dd hh:mm:ss");
                    } else {
                        return "";
                    }
                }},
            {name: 'duration', index: 'duration', width: 40, sortable: true},
            {name: 'operations', index: 'operations', width: 80, sortable: false, formatter: function (cellValue, options, rowObject) {
                    var pid = rowObject["pid"];
                    var rid = rowObject["rid"];
                    var phone = "'"+rowObject['phone']+"'";
                    var str ="";
                    str += '<input type="button" class="btn btn-sm btn-primary" value="再次外呼" onclick="PhoneLog.callAgain('+phone+','+pid+','+rid+')"/>';
                    return str;

                }}
        ]
    };

    return options;
};

/**
 * 根据关键词搜索
 */
PhoneLog.search = function () {
    var searchParam = {};
    // searchParam.month= $("#month").val();
    // searchParam.startDay= $("#startDay").val();
    // searchParam.endDay= $("#endDay").val();
    searchParam.phone = $("#phone").val().trim();
    searchParam.batchId = $("#batchId").val();
    PhoneLog.table.reload(searchParam);
};

/**
 * 重置搜索
 */
PhoneLog.resetSearch = function () {
    $("#phone").val("");
    PhoneLog.search();
};

/**
 * 试听录音
 */
PhoneLog.listenVoice = function (id,calltime,flag) {
    $.ajax({
        url: "/project/listen?id=" + id+"&calltime="+calltime+"&flag="+flag,
        type: 'GET',
        // async: false,
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#voice").attr("src", r.obj);
                $("#listenModal").modal();
            }
        }
    })
};
/**
 * 再次外呼
 */
PhoneLog.callAgain = function (phone,pid,rid) {
    $.ajax({
        url: "/project/callagain?phone=" + phone+"&projectId="+pid+"&rid="+rid,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                // $("#voice").attr("src", r.obj);
                success("再次外呼成功");
            }
        }
    })
};

/*PhoneLog.downloadVoice = function (id) {
    $.ajax({
        url: "/project/phone_batch/phone_log/download?id=" + id,
        type: 'GET',
        // async: false,
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#voice").attr("src", r.obj);
            }
        }
    })
};*/



$(function() {

    $(".closeModal").click(function(){
        $("#voice")[0].pause();
    });
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", PhoneLog.initOptions());
    PhoneLog.table = jqGrid.init();
});