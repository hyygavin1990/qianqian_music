var Task = {};

Task.saveCallTimeMonitorMaxTime = function () {
    $.ajax({
        url: "/cti_monitor/task/callTimeMonitor/refresh?maxTime=" + $("#maxTime").val(),
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#callTimeModal").modal("hide");
            }
        }
    });
};

Task.saveVoiceMergeTaskMinTime = function () {
    $.ajax({
        url: "/cti_monitor/task/voiceMergeTask/refresh?minTime=" + $("#minTime").val(),
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#voiceMergeModal").modal("hide");
            }
        }
    });
};

Task.saveRunTimeMonitorConfig = function () {
    var config = getFormJson($("#runtimeForm"));
    $.ajax({
        url: "/cti_monitor/task/runtimeMonitor/refresh",
        type: 'POST',
        contentType: "text/plain;charset=utf-8",
        data: JSON.stringify(config),
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#runtimeModal").modal("hide");
            }
        }
    });
};

Task.saveCallDataMonitorConfig = function () {
    var config = getFormJson($("#callDataForm"));
    $.ajax({
        url: "/cti_monitor/task/callDataMonitor/refresh",
        type: 'POST',
        contentType: "text/plain;charset=utf-8",
        data: JSON.stringify(config),
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#callDataModal").modal("hide");
            }
        }
    });
};

$(function() {

    new Switchery(document.querySelector("#callTimeMonitor .js-switch"), {color: '#1AB394'});
    new Switchery(document.querySelector("#voiceMergeTask .js-switch"), {color: '#1AB394'});
    new Switchery(document.querySelector("#runtimeMonitor .js-switch"), {color: '#1AB394'});
    new Switchery(document.querySelector("#callDataMonitor .js-switch"), {color: '#1AB394'});


    //switch添加change事件
    $(".js-switch").on("change", function () {
        console.log($(this).parents(".config-item"));
        var object = $(this).parents(".config-item").attr("id");
        var opened = $(this).prop("checked");
        console.log(object + opened);
        $.ajax({
            url: "/cti_monitor/task/" + object + "/switch?opened=" + opened,
            type: 'GET',
            dataType: "json",
            success: function (r) {
            }
        });
    });


});