var PhoneLog = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null
};


/**
 * jqGrid初始化参数
 */
PhoneLog.initOptions = function () {

    var options = {
        url : "/phone_log/grid",
        rowNum: 20,
        postData: {
            month: $("#month").val(),
            startDay: $("#startDay").val(),
            endDay: $("#endDay").val()
        },
        autowidth:true,
        sortname: "inittime",
        sortorder: "desc",
        colNames: [ 'id','号码', '使用主叫', '外呼时间', '接通时间', '通话时长', '处理分机', '类型',
            '备注', 'ip', '录音'],//'外呼任务',
        colModel: [
            //{name: 'projectName', index: 'projectName', width: 70, sortable: false},
            {name: 'id',index:'id',hidden: true, sortable:false },
            {name: 'phone', index: 'phone', width: 70, sortable: false},
            {name: 'caller', index: 'caller', width: 70, sortable: false},
            {name: 'inittime', index: 'inittime', width: 100, sortable: true, formatter: function (cellValue) {
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
            {name: 'extid', index: 'extid', width: 50, sortable: false},
            {name: 'transfer', index: 'transfer', width: 50, sortable: false, formatter: function (cellValue) {
                return cellValue == 3 ? '纯人工' : (cellValue == 2 ? '复拨' : (cellValue == 1 ? 'h2' : 'm1'));
            }},
            {name: 'note', index: 'note', width: 70, sortable: false},
            {name: 'ip', index: 'ip', width: 70, sortable: false},
            {name: 'operations', index: 'operations', width: 60, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var starttime = rowObject['starttime'];
                var calltime = "'"+rowObject['calltime']+"'";
                var transfer = rowObject['transfer'];
                if (starttime) {
                    var str = '<button class="btn btn-sm btn-info" onclick="PhoneLog.listenVoice(' + "'"+id+"',"+calltime +","+transfer+ ')"><i class="fa fa-play"></i></button>&nbsp;';
                    // str += '<button class="btn btn-sm btn-primary" onclick="PhoneLog.downloadVoice(' + id + ')"><i class="fa fa-download"></i></button>';
                    return str;
                } else {
                    return "";
                }

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
    searchParam.phone = $("#phone").val().trim();
    searchParam.month = $("#month").val();
    var startDay = $("#startDay").val();
    if (isEmpty(startDay)) {
        startDay = 1;
    }
    var endDay = $("#endDay").val();
    if (isEmpty(endDay)) {
        endDay = 31;
    }
    searchParam.startDay = startDay;
    searchParam.endDay = endDay;
    searchParam.projectId =  $("#projectName").val();
    PhoneLog.table.reload(searchParam);
};

/**
 * 重置搜索
 */
PhoneLog.resetSearch = function () {
    $("#phone").val("");
    $("#companyName").val("");
    $("#projectName").empty();
    $("#projectName").html("<option value=''>---请选择---</option>");
    PhoneLog.search();
};

/**
 * 试听录音
 */
PhoneLog.listenVoice = function (id,calltime,flag) {
    $.ajax({
        url: "/phone_log/listen?id=" + id+"&calltime="+calltime+"&flag="+flag,
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

PhoneLog.projectNameSelected = function(companyId, $select) {
    $.ajax({
        url: "/phone_log/projectName/selected?companyId=" + companyId,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            if (r.code === 0) {
                PhoneLog.resetSelect($select, r.obj);
            } else {
                info("错误", r.msg);
            }
        },
    })
}

//重置select选择框
PhoneLog.resetSelect= function($select, list) {
    $($select).empty();
    var html = "";
    for (var i = 0; i < list.length; i++) {
        if (i === 0) {
            html += "<option selected value='" + list[i].id + "'>" + list[i].name + "</option>";
        } else {
            html += "<option value='" + list[i].id + "'>" + list[i].name + "</option>";
        }
    }
    $($select).append(html);
}

$(function() {
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

    $("#companyName").change(function () {
        var projectName = $("#projectName");
        PhoneLog.projectNameSelected(this.value, $(projectName));
    });
    // PhoneLog.projectNameSelected($("#companyName").val(), $("#projectName"));


    var jqGrid = new JqGrid("#grid-table", "#grid-pager", PhoneLog.initOptions());
    PhoneLog.table = jqGrid.init();

    $(".closeModal").click(function(){
        $("#voice")[0].pause();
    });


});