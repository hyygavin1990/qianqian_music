var Task = {};

Task.saveCallTimeMonitorMaxTime = function () {
    $.ajax({
        url: "/task/callTimeMonitor/refresh?maxTime=" + $("#maxTime").val(),
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
        url: "/task/refresh/voiceMergeTask?minTime=" + $("#minTime").val(),
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#voiceMergeModal").modal("hide");
            }
        }
    });
};

$(function() {

    new Switchery(document.querySelector("#callTimeMonitor .js-switch"), {color: '#1AB394'});
    new Switchery(document.querySelector("#voiceMergeTask .js-switch"), {color: '#1AB394'});


    //switch添加change事件
    $(".js-switch").on("change", function () {
        console.log($(this).parents(".config-item"));
        var object = $(this).parents(".config-item").attr("id");
        var opened = $(this).prop("checked");
        console.log(object + opened);
        $.ajax({
            url: "/task/" + object + "/switch?opened=" + opened,
            type: 'GET',
            dataType: "json",
            success: function (r) {
            }
        });
    });


});