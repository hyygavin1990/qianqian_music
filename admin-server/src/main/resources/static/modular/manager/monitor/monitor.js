var Monitor = {}
/**
 *
 * 获取当前时间
 */
Monitor.topTime = function(){
    function getNow(s) {
        return s < 10 ? '0' + s: s;
    }
    var myDate = new Date();
//获取当前日
    var h=myDate.getHours();       //获取当前小时数(0-23)
    var m=myDate.getMinutes();     //获取当前分钟数(0-59)

    var now=getNow(h)+':'+getNow(m);
    $("#time").html(now);
}
//联动获取项目
Monitor.getProject = function(){
    var projectSelect = $("#projectId");
    projectSelect.empty().append("<option value=\"\">请选择项目......</option>");
    var companyId = $("#companyId").val();
    $.ajax({
        url:"/monitor/getProject?companyid="+companyId,
        type:"GET",
        dataType:"JSON",
        success:function (r) {
            if(r.code===0){
                var data = r.obj;
                for(var i=0;i<data.length;i++){
                    projectSelect.append("<option value="+data[i].id+">"+data[i].name+"</option>");
                }
            }
        }
    });
    if(companyId==""||companyId==undefined){
        // $("#maincontent").hide();
        $("#tabletop").slideUp(1000);
    }
}
Monitor.getProject2 = function(){
    var projectSelect = $("#projectId2");
    projectSelect.empty().append("<option value=\"\">请选择项目......</option>");
    $("#staffGroup2").empty().append("<option value=\"\">请选择坐席组......</option>");
    $(".table2").find("tbody").empty();
    $("#table2top").slideUp(1000);
    $(".table3").find("tbody").empty();
    $("#table3top").slideUp(1000);
    var companyId = $("#companyId2").val();
    $.ajax({
        url:"/monitor/getProject?companyid="+companyId,
        type:"GET",
        dataType:"JSON",
        success:function (r) {
            if(r.code===0){
                var data = r.obj;
                for(var i=0;i<data.length;i++){
                    projectSelect.append("<option value="+data[i].id+">"+data[i].name+"</option>");
                }
            }
        }
    });
}
//项目下拉框触发事件
Monitor.getTable = function(){
    //获取是所有分组还是我的分组
    var radio = $("input[name='item']:checked").val();
    var projectId = $("#projectId").val();
    if(projectId!=""&&projectId!=undefined){
        $.ajax({
            url:"/monitor/getTable?projectid="+projectId+"&radio="+radio,
            type:"GET",
            dataType:"JSON",
            success:function (r) {
                if(r.code===0){
                    var data = r.obj;
                    var str = "";
                    for(var i=0;i<data.length;i++){
                        var ap = data[i].ap;
                        var bp = data[i].bp;
                        var cp = data[i].cp;
                        var dp = data[i].dp;
                        str += "<tr>\n" +
                            "                                <td class=\"td-font\" style=\"color: #4a4a4a;\"><strong>"+data[i].name+"</strong></td>\n" +
                            "                                <td class=\"td-font\">"+data[i].staffCount+"人</td>\n" +
                            "                                <td class=\"td-font\">"+data[i].staffavgduration+"</td>\n" +
                            "                                <td class=\"td-font-td\">\n" +
                            "                                    <div class=\"progressBox\">\n" +
                            "                                        <div class=\"progress1\" style=\"width: "+ap.ap+"%;text-align: right;\">"+ap.app+"</div>\n" +
                            "                                        <div class=\"progress2\" style=\"width: "+ap.bp+"%;text-align: right;\">"+ap.bpp+"</div>\n" +
                            "                                        <div class=\"progress3\" style=\"width: "+ap.cp+"%;text-align: right;\">"+ap.cpp+"</div>\n" +
                            "                                    </div>\n" +
                            "                                </td>\n" +
                            "                                <td class=\"td-font-td\">\n" +
                            "                                    <div class=\"progressBox\">\n" +
                            "                                        <div class=\"progress1\" style=\"width: "+bp.ap+"%;text-align: right;\">"+bp.app+"</div>\n" +
                            "                                        <div class=\"progress2\" style=\"width: "+bp.bp+"%;text-align: right;\">"+bp.bpp+"</div>\n" +
                            "                                        <div class=\"progress3\" style=\"width: "+bp.cp+"%;text-align: right;\">"+bp.cpp+"</div>\n" +
                            "                                    </div>\n" +
                            "                                </td>\n" +
                            "                                <td class=\"td-font-td\">\n" +
                            "                                    <div class=\"progressBox\">\n" +
                            "                                        <div class=\"progress1\" style=\"width: "+cp.ap+"%;text-align: right;\">"+cp.app+"</div>\n" +
                            "                                        <div class=\"progress2\" style=\"width: "+cp.bp+"%;text-align: right;\">"+cp.bpp+"</div>\n" +
                            "                                        <div class=\"progress3\" style=\"width: "+cp.cp+"%;text-align: right;\">"+cp.cpp+"</div>\n" +
                            "                                    </div>\n" +
                            "                                </td>\n" +
                            "                                <td class=\"td-font-td\">\n" +
                            "                                    <div class=\"progressBox\">\n" +
                            "                                        <div></div>\n" +
                            "                                        <div class=\"progress4\" style=\"width: "+dp.ap+"%;\"></div>\n" +
                            "                                        <div class=\"progress3\" style=\"width: "+dp.bp+"%;\"></div>\n" +
                            "                                    </div>\n" +
                            "                                </td>\n" +
                            "                            </tr>";
                    }
                    $(".table1").find("tbody").html(str);
                    // $("#maincontent").show();
                    $("#tabletop").slideDown(1000);
                }
            }
        });
    }else {
        // $("#maincontent").hide();
        $("#tabletop").slideUp(1000);
    }
}
Monitor.radio = function(){
    $("input[name='item']").change(function () {
        var projectId = $("#projectId").val();
        if(projectId!=""&&projectId!=undefined){
            Monitor.getTable();
        }
    });
    $("input[name='item2']").change(function () {
        var staffGroupId = $("#staffGroup2").val();
        if(staffGroupId==""||staffGroupId==undefined){
            Monitor.getAllStaffDetail();
        }
    });
}
/**
 * 联动  项目联动坐席分组
 */
Monitor.getStaffGroup = function(){
    var projectid = $("#projectId2").val();
    var staffGroupSelect = $("#staffGroup2");
    staffGroupSelect.empty().append("<option value=\"\">请选择坐席组......</option>");
    if(projectid!=""&&projectid!=undefined){
        $.ajax({
            url:"/monitor/getStaffGroup?projectid="+projectid,
            type:"GET",
            dataType:"JSON",
            success:function (r) {
                if(r.code===0){
                    var data = r.obj;
                    for(var i=0;i<data.length;i++){
                        staffGroupSelect.append("<option value="+data[i].id+">"+data[i].name+"</option>");
                    }
                }
            }
        });
        Monitor.getAllStaffDetail();
        // $("#maincontent").slideDown(500);
    }else {
        $(".table3").find("tbody").empty();
        $("#table3top").slideUp(1000);
    }
    $(".table2").find("tbody").empty()
    $("#table2top").slideUp(1000);
}
//坐席组下拉框触发事件
Monitor.getTable2 = function(){
    //获取是所有分组还是我的分组
    var projectId = $("#projectId2").val();
    var staffGroupId = $("#staffGroup2").val();
    var status = $("#status").val();
    if(staffGroupId!=""&&staffGroupId!=undefined){
        $.ajax({
            url:"/monitor/getTable2?projectid="+projectId+"&staffGroupId="+staffGroupId,
            type:"GET",
            dataType:"JSON",
            success:function (r) {
                if(r.code===0){
                    var data = r.obj;
                    var str = "";
                    for(var i=0;i<data.length;i++){
                        var ap = data[i].ap;
                        var bp = data[i].bp;
                        var cp = data[i].cp;
                        var dp = data[i].dp;
                        str += "<tr>\n" +
                            "                                <td class=\"td-font\" style=\"color: #4a4a4a;\"><strong>"+data[i].name+"</strong></td>\n" +
                            "                                <td class=\"td-font\">"+data[i].staffCount+"人</td>\n" +
                            "                                <td class=\"td-font\">"+data[i].staffavgduration+"</td>\n" +
                            "                                <td class=\"td-font-td\">\n" +
                            "                                    <div class=\"progressBox\">\n" +
                            "                                        <div class=\"progress1\" style=\"width: "+ap.ap+"%;text-align: right;\">"+ap.app+"</div>\n" +
                            "                                        <div class=\"progress2\" style=\"width: "+ap.bp+"%;text-align: right;\">"+ap.bpp+"</div>\n" +
                            "                                        <div class=\"progress3\" style=\"width: "+ap.cp+"%;text-align: right;\">"+ap.cpp+"</div>\n" +
                            "                                    </div>\n" +
                            "                                </td>\n" +
                            "                                <td class=\"td-font-td\">\n" +
                            "                                    <div class=\"progressBox\">\n" +
                            "                                        <div class=\"progress1\" style=\"width: "+bp.ap+"%;text-align: right;\">"+bp.app+"</div>\n" +
                            "                                        <div class=\"progress2\" style=\"width: "+bp.bp+"%;text-align: right;\">"+bp.bpp+"</div>\n" +
                            "                                        <div class=\"progress3\" style=\"width: "+bp.cp+"%;text-align: right;\">"+bp.cpp+"</div>\n" +
                            "                                    </div>\n" +
                            "                                </td>\n" +
                            "                                <td class=\"td-font-td\">\n" +
                            "                                    <div class=\"progressBox\">\n" +
                            "                                        <div class=\"progress1\" style=\"width: "+cp.ap+"%;text-align: right;\">"+cp.app+"</div>\n" +
                            "                                        <div class=\"progress2\" style=\"width: "+cp.bp+"%;text-align: right;\">"+cp.bpp+"</div>\n" +
                            "                                        <div class=\"progress3\" style=\"width: "+cp.cp+"%;text-align: right;\">"+cp.cpp+"</div>\n" +
                            "                                    </div>\n" +
                            "                                </td>\n" +
                            "                                <td class=\"td-font-td\">\n" +
                            "                                    <div class=\"progressBox\">\n" +
                            "                                        <div></div>\n" +
                            "                                        <div class=\"progress4\" style=\"width: "+dp.ap+"%;\"></div>\n" +
                            "                                        <div class=\"progress3\" style=\"width: "+dp.bp+"%;\"></div>\n" +
                            "                                    </div>\n" +
                            "                                </td>\n" +
                            "                            </tr>";
                    }
                    $(".table2").find("tbody").html(str);
                    $("#table2top").slideDown(1000);
                }
            }
        });
        //选择了坐席组  展示坐席情况
        $.ajax({
            url:"/monitor/getTable3?projectid="+projectId+"&staffGroupId="+staffGroupId+"&status="+status,
            type:"GET",
            dataType:"JSON",
            success:function (r) {
                if(r.code===0){
                    var connectnumMax = r.obj.connectnumMax;
                    var leadsnumMax = r.obj.leadsnumMax;
                    var leadspercentMax = r.obj.leadspercentMax;
                    var data = r.obj.list;
                    var str = "";
                    for(var i=0;i<data.length;i++){
                        var connectpercent,leadspercent,leadspercentpercent;
                        if(connectnumMax!=0){
                            connectpercent = (data[i].connectnum/connectnumMax)*100;
                        }else {
                            connectpercent=0;
                        }
                        if(leadsnumMax!=0){
                            leadspercent = (data[i].leadsnum/leadsnumMax)*100;
                        }else {
                            leadspercent = 0;
                        }
                        if(leadspercentMax!=0){
                            leadspercentpercent = (data[i].leadspercent/leadspercentMax)*100;
                        }else {
                            leadspercentpercent=0;
                        }
                        var status="";
                        if(data[i].status==0){
                            status = "离线";
                        }else{
                            status = "在线";
                        }
                        str += "<tr>\n" +
                            "                                <td class=\"td-font3\">"+data[i].name+"</td>\n" +
                            "                                <td class=\"td-font3\">"+status+"</td>\n" +
                            "                                <td class=\"td-font3\">"+data[i].duration+"</td>\n" +
                            "                                <td class=\"td-font-td2\">\n" +
                            "<div class='progressBox2'>"+
                            "                                    <div style=\"height: 30px;background: #81f9fa;width:"+connectpercent+"%;text-align: right;\">"+data[i].connectnum+"</div>\n" +
                            "</div>"+
                            "                                </td>\n" +
                            "                                <td class=\"td-font-td2\">\n" +
                            "<div class='progressBox2'>"+
                            "                                    <div style=\"height: 30px;background:#f1fa73;width:"+leadspercent+"%;text-align: right;\">"+data[i].leadsnum+"</div>\n" +
                            "</div>"+
                            "                                </td>\n" +
                            "                                <td class=\"td-font-td2\">\n" +
                            "<div class='progressBox2'>"+
                            "                                    <div style=\"height: 30px;background:#c995d6;width: "+leadspercentpercent+"%;text-align: right;\">"+data[i].leadspercent+"%</div>\n" +
                            "</div>"+
                            "                                </td>\n" +
                            "                            </tr>";
                    }
                    $(".table3").find("tbody").html(str);
                    $("#table3top").slideDown(1000);
                }
            }
        });
    }else {
        $(".table2").find("tbody").empty();
        $("#table2top").slideUp(1000);
        Monitor.getAllStaffDetail();
    }
    // $("#maincontent").show();
}
//查看项目下所有坐席的信息
Monitor.getAllStaffDetail = function(){
    var projectId = $("#projectId2").val();
    var status = $("#status").val();
    //获取是所有分组还是我的分组
    var radio = $("input[name='item2']:checked").val();
    $.ajax({
        url:"/monitor/getStaffAll?projectid="+projectId+"&radio="+radio+"&status="+status,
        type:"GET",
        dataType:"JSON",
        success:function (r) {
            if(r.code===0){
                var connectnumMax = r.obj.connectnumMax;
                var leadsnumMax = r.obj.leadsnumMax;
                var leadspercentMax = r.obj.leadspercentMax;
                var data = r.obj.list;
                var str = "";
                for(var i=0;i<data.length;i++){
                    var connectpercent,leadspercent,leadspercentpercent;
                    if(connectnumMax!=0){
                        connectpercent = (data[i].connectnum/connectnumMax)*100;
                    }else {
                        connectpercent=0;
                    }
                    if(leadsnumMax!=0){
                        leadspercent = (data[i].leadsnum/leadsnumMax)*100;
                    }else {
                        leadspercent = 0;
                    }
                    if(leadspercentMax!=0){
                        leadspercentpercent = (data[i].leadspercent/leadspercentMax)*100;
                    }else {
                        leadspercentpercent=0;
                    }
                    var status="";
                    if(data[i].status==0){
                        status = "离线";
                    }else{
                        status = "在线";
                    }
                    str += "<tr>\n" +
                        "                                <td class=\"td-font3\">"+data[i].name+"</td>\n" +
                        "                                <td class=\"td-font3\">"+status+"</td>\n" +
                        "                                <td class=\"td-font3\">"+data[i].duration+"</td>\n" +
                        "                                <td class=\"td-font-td2\">\n" +
                        "<div class='progressBox2'>"+
                        "                                    <div style=\"height: 30px;background: #81f9fa;width:"+connectpercent+"%;text-align: right;\">"+data[i].connectnum+"</div>\n" +
                        "</div>"+
                        "                                </td>\n" +
                        "                                <td class=\"td-font-td2\">\n" +
                        "<div class='progressBox2'>"+
                        "                                    <div style=\"height: 30px;background:#f1fa73;width:"+leadspercent+"%;text-align: right;\">"+data[i].leadsnum+"</div>\n" +
                        "</div>"+
                        "                                </td>\n" +
                        "                                <td class=\"td-font-td2\">\n" +
                        "<div class='progressBox2'>"+
                        "                                    <div style=\"height: 30px;background:#c995d6;width: "+leadspercentpercent+"%;text-align: right;\">"+data[i].leadspercent+"%</div>\n" +
                        "</div>"+
                        "                                </td>\n" +
                        "                            </tr>";
                }
                $(".table3").find("tbody").empty();
                $(".table3").find("tbody").html(str);
                $("#table3top").slideDown(1000);
            }else {
                $(".table3").find("tbody").empty();
                $("#table3top").slideUp(1000);
            }
        }
    });
}
//坐席在线状态触发
Monitor.staffStatus = function(){
    var staffGroupId = $("#staffGroup2").val();
    if(staffGroupId!=""&&staffGroupId!=undefined){
        var projectId = $("#projectId2").val();
        var status = $("#status").val();
        //选择了坐席组  展示坐席情况
        $.ajax({
            url:"/monitor/getTable3?projectid="+projectId+"&staffGroupId="+staffGroupId+"&status="+status,
            type:"GET",
            dataType:"JSON",
            success:function (r) {
                if(r.code===0){
                    var connectnumMax = r.obj.connectnumMax;
                    var leadsnumMax = r.obj.leadsnumMax;
                    var leadspercentMax = r.obj.leadspercentMax;
                    var data = r.obj.list;
                    var str = "";
                    for(var i=0;i<data.length;i++){
                        var connectpercent,leadspercent,leadspercentpercent;
                        if(connectnumMax!=0){
                            connectpercent = (data[i].connectnum/connectnumMax)*100;
                        }else {
                            connectpercent=0;
                        }
                        if(leadsnumMax!=0){
                            leadspercent = (data[i].leadsnum/leadsnumMax)*100;
                        }else {
                            var leadspercent = 0;
                        }
                        if(leadspercentMax!=0){
                            leadspercentpercent = (data[i].leadspercent/leadspercentMax)*100;
                        }else {
                            leadspercentpercent=0;
                        }
                        var status="";
                        if(data[i].status==0){
                            status = "离线";
                        }else{
                            status = "在线";
                        }
                        str += "<tr>\n" +
                            "                                <td class=\"td-font3\">"+data[i].name+"</td>\n" +
                            "                                <td class=\"td-font3\">"+status+"</td>\n" +
                            "                                <td class=\"td-font3\">"+data[i].duration+"</td>\n" +
                            "                                <td class=\"td-font-td2\">\n" +
                            "<div class='progressBox2'>"+
                            "                                    <div style=\"height: 30px;background: #81f9fa;width:"+connectpercent+"%;text-align: right;\">"+data[i].connectnum+"</div>\n" +
                            "</div>"+
                            "                                </td>\n" +
                            "                                <td class=\"td-font-td2\">\n" +
                            "<div class='progressBox2'>"+
                            "                                    <div style=\"height: 30px;background:#f1fa73;width:"+leadspercent+"%;text-align: right;\">"+data[i].leadsnum+"</div>\n" +
                            "</div>"+
                            "                                </td>\n" +
                            "                                <td class=\"td-font-td2\">\n" +
                            "<div class='progressBox2'>"+
                            "                                    <div style=\"height: 30px;background:#c995d6;width: "+leadspercentpercent+"%;text-align: right;\">"+data[i].leadspercent+"%</div>\n" +
                            "</div>"+
                            "                                </td>\n" +
                            "                            </tr>";
                    }
                    $(".table3").find("tbody").html(str);
                }
            }
        });
    }else {
        Monitor.getAllStaffDetail();
    }
}
$(function() {
    Monitor.topTime();
    //radio监听
    Monitor.radio();
    //tab监听
    var activeTab=$("li.active").children("a").text();
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        activeTab = $(e.target).text();
        if(activeTab=="分组"){
            $("#staffgroup").show();
            $("#staff").hide();
        }else {
            $("#staffgroup").hide();
            $("#staff").show();
        }
    })
});