var ReguConfig={};
ReguConfig.init=function() {
    ReguConfig.refreshAllTable();
};

ReguConfig.showTriggerLineSet = function (btn) {
    var id = $(btn).siblings('input').eq(0).val();
    var config=null;
    $.ajax({
        url:"/regulation/config/getById",
        async:false,
        data:{
            id:id
        },
        success:function (d) {
            config = d.obj;
        }
    });
    $.ajax({
        url:"/trigger/set/get",
        data:{
            id:config.setids
        },
        success:function (d) {
            var content = d.obj;
            info(content);
        }
    });
};

ReguConfig.refreshMoodTable = function () {
    var list =ReguConfigUtil.getList(1,0);
    var tbody = $("#mood-regu-div").find("tbody");
    tbody.html('');
    if(list.length>0){
        var mood = list[0];
        var id = mood.id;
        $("#mood-regu-div").find("input[name=id]").val(id);
        var froms = mood.froms.split(",");
        var tos = mood.tos.split(",");
        for (var i = 0; i < froms.length; i++) {
            var from = froms[i];
            var to = tos[i];
            tbody.append('<tr><td>'+from+'</td><td>'+to+'</td></tr>');
        }
    }

};

ReguConfig.refreshNotHearTable = function () {
    var list =ReguConfigUtil.getList(1,4);
    if(list.length>0){
        var nothear = list[0];
        var tbody = $("#nothear-regu-div").find("tbody");
        tbody.html('');
        tbody.append('<tr><td>'+nothear.froms+'</td></tr>');
    }
};
ReguConfig.refreshCorrectTable = function () {
    var list =ReguConfigUtil.getList(2,0);
    if(list.length==0) return;

    var actions = list[0].tos.split(",");
    var statuses = list[0].froms.split(",");

    var tbody = $("#correct-regu-div").find("tbody");
    tbody.html('');
    tbody.append('<tr><td>通用模块</td><td>all</td></tr>');
    for (var i = 0; i < actions.length; i++) {
        var name = actions[i];
        var status = statuses[i];
        if(name.length>0&&status.length>0)
        tbody.append('<tr><td>'+name+'</td><td>'+status+'</td></tr>');
    }
};
ReguConfig.refreshLocationTable = function () {
    var list =ReguConfigUtil.getList(2,1);
    var tbody = $("#location-regu-div").find("tbody");
    tbody.html('');
    for (var i = 0; i < list.length; i++) {
        var val = list[i];
        if(val.value){
            tbody.append('<tr><td>'+val.value+'</td></tr>');
        }
    }
};

ReguConfig.refreshAllTable = function () {
    ReguConfig.refreshMoodTable();
    ReguConfig.refreshNotHearTable();
    ReguConfig.refreshCorrectTable();
    ReguConfig.refreshLocationTable();

    var tableOptions = ReguConfigData.tableOptions;
    for(var key in tableOptions){
        var option = tableOptions[key];
        if(key!='set'){
            option.buttons = undefined;
        }else{
            option.buttons = [{class:'btn-info',opt:'ReguConfig.showTriggerLineSet(this)',text:'集合'}];
        }

        if(key=='deny'){
            var index  =-1;
            $(option.cols).each(function (n) {
                if(this.index=="buttons"){
                    index=n;
                    return false;
                }
            });
            if(index>-1){
                option.cols.splice(index,1);
            }
        }
        if(key=='interrupt'){
            option.complete=undefined;
        }
        ReguConfigUtil.refreshTable(option);
    }
};