var CallerConfig = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "caller"
};
/**
 * jqGrid初始化参数
 */
CallerConfig.initOptions = function () {
    var options = {
        url : "/callerConfig/grid",
        postData:{deleted:parseInt($("#deleted").val())},
        autowidth:true,
        colNames: ['编号', '线路名称',  '主叫号码显示', '所属分组','计费单价(厘)','计费时长(秒)','号码前缀','操作'],
        multiselect: true,
        colModel: [
            {name: 'id', index: 'id', width: 45, sorttype: "int"},
            {name: 'name', index: 'name', width: 120},
            //{name: 'currentinuse', index: 'currentinuse', width: 100, sortable: false},
            {name: 'caller', index: 'caller', width: 100, sortable: false},
            {name: 'callergroup', index: 'callergroup', width: 100, sortable: false},
            {name: 'price', index: 'price', width: 50, sortable: false},
            {name: 'price_time', index: 'price_time', width: 50, sortable: false},
            {name: 'prefix', index: 'prefix', width: 80, sortable: false},
            {name: 'operations', index: 'operations', width: 120, sortable: false, formatter: function (cellValue, options, rowObject) {
                var id = rowObject["id"];
                var deleted = rowObject["deleted"];
                var str='';
                if(deleted){
                    str = '<input type="button" class="control-auth btn btn-sm btn-warning" data-auth="callerConfig_edit" value="恢复" onclick="CallerConfig.recovery(' + id + ')"/>';
                }else{
                    str = '<input type="button" class="control-auth btn btn-sm btn-info" data-auth="callerConfig_edit" value="编辑" onclick="CallerConfig.edit(' + id + ')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-danger" data-auth="callerConfig_delete" value="删除" onclick="CallerConfig.delete(' + id + ')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-success" data-auth="callerConfig_detail" value="详情" onclick="CallerConfig.detail(' + id + ')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-info" data-auth="callerConfig_warn" value="线路预警配置" onclick="CallerConfig.editWarn(' + id + ')"/>';
                }
                return str;
            }}
        ],
        gridComplete: function () {
            refreshPermission(CallerConfig.domain);
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
CallerConfig.search = function () {
    var searchParam = {};
    //searchParam.callerConfigname = $("#callerConfigname").val();
    searchParam.name = $("#name").val().trim();
    searchParam.callerGroupId=$("#callerGroupId").val();
    searchParam.deleted=parseInt($("#deleted").val());
    CallerConfig.table.reload(searchParam);
};

/**
 * 重置搜索
 */
CallerConfig.resetSearch = function () {
    //$("#callerConfigname").val("");
    $("#name").val("");
    $("#deleted").val("0");
    $.ajax({
        url:"/callerConfig/rest",
        type:"GET",
        dataType:"JSON",
        success:function (r) {
            if(r.code===0){
                var data = r.obj;
                var html = "<option value=\"\">全部</option>";
                for(var i=0;i<data.length;i++){
                    html +="<option value=\""+data[i].id+"\">"+data[i].name+"</option>";
                }
                $("#callerGroupId").empty().append(html).trigger("chosen:updated");
                CallerConfig.search();
            }
        }
    });
};

/**
 * 新增弹框
 */
CallerConfig.create = function () {
    $.ajax({
        url: "/callerConfig/beforeInsert",
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $("#createModal").modal();
        }
    })

};

/**
 * 保存用户
 */
CallerConfig.insert = function () {
    var callerConfig = getFormJson($("#create-form"));
    if($("#price1").val() <=0){
        info("计费单价必须大于0");
        return;
    }
    if($("#priceTime1").val()<=0){
        info("计费时长必须大于0");
        return;
    }
    $.ajax({
        url: "/callerConfig/insert",
        type: 'POST',
        data: JSON.stringify(callerConfig),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                CallerConfig.search();
                $("#create-form")[0].reset();
            }
        }
    })
};

/**
 * 编辑弹框
 * @param id    callerConfigId
 */
CallerConfig.edit = function (id) {

    $.ajax({
        url: "/callerConfig/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var obj = r.obj;
                var callerConfig = obj.cc;
                var list = obj.groupList;
                var form = $("#edit-form");
                form.find("input[name='name']").val(callerConfig.name);
                form.find("input[name='ip']").val(callerConfig.ip);
                form.find("input[name='port']").val(callerConfig.port);
                form.find("input[name='caller']").val(callerConfig.caller);
                form.find("select[name='encode']").val(callerConfig.encode);
                //form.find("input[name='currentinuse']").val(callerConfig.currentinuse);
                form.find("input[name='id']").val(callerConfig.id);
                form.find("input[name='price']").val(callerConfig.price);
                form.find("input[name='priceTime']").val(callerConfig.priceTime);
                form.find("input[name='prefix']").val(callerConfig.prefix);
                var rate = callerConfig.rate;
                if(rate!=null){
                    var rates = new Array();
                    rates=rate.split(":");
                    form.find("input[name='mobile']").val(rates[0]);
                    form.find("input[name='unicom']").val(rates[1]);
                    form.find("input[name='telecom']").val(rates[2]);
                }else{
                    form.find("input[name='mobile']").val("");
                    form.find("input[name='unicom']").val("");
                    form.find("input[name='telecom']").val("");
                }
                var str = "";
                str+="<select name=\"callerGroupId\" class=\"form-control\">"
                for(var i=0;i<list.length;i++){
                    if(callerConfig.callerGroupId==list[i].id){
                        str+=" <option value=\""+list[i].id+"\" selected=\"selected\">"+list[i].name+"</option>";
                    }
                    else{
                        str+=" <option value=\""+list[i].id+"\" >"+list[i].name+"</option>";
                    }
                }
                str+="</select>"
                $("#editGroup").html(str);
                $("#editModal").modal();
            }
        }
    })

    /*var ids = this.table.getSelectedRowIds();
    if (ids === undefined || ids.length === 0) {
        toastr.warning("必须先选择记录再操作");
        // info("必须先选择记录再操作");
        return;
    } else if (ids.length > 1) {
        toastr.warning("只能选择一条记录");
        return;
    } else {
        $.ajax({
            url: "/callerConfig/get?id=" + ids[0],
            type: 'GET',
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    var callerConfig = r.obj;
                    var form = $("#edit-form");
                    form.find("input[name='name']").val(callerConfig.name);
                    form.find("input[name='ip']").val(callerConfig.ip);
                    form.find("input[name='port']").val(callerConfig.port);
                    form.find("input[name='caller']").val(callerConfig.caller);
                    form.find("input[name='maxline']").val(callerConfig.maxline);
                    //form.find("input[name='currentinuse']").val(callerConfig.currentinuse);
                    form.find("input[name='id']").val(callerConfig.id);
                    $("#editModal").modal();
                }
            }
        })
    }*/
};

/**
 * 更新用户
 */
CallerConfig.update = function () {
    var callerConfig = getFormJson($("#edit-form"));
    var reg= /^\d+(\.{0,1}\d+){0,1}$/;
    var re = new RegExp(reg);
    var reg2=/^\+?[1-9][0-9]*$/;
    var re2 = new RegExp(reg2);
    var reg3 = /^[1-9]\d*$/;
    var re3 = new RegExp(reg3);
    if(!re.test($("#price2").val())){
        info("计费单价必须为大于等于0");
        return;
    }
    var priceTime=$("#priceTime2").val();
    if(!re2.test(priceTime)){
        info("计费时长必须为正整数");
        return;
    }
    //号码前缀
    // var prefix=$("#prefix").val();
    // if(!re.test(prefix)){
    //     info("号码前缀必须为数字");
    //     return;
    // }
    //移动 联通 电信 的值必须为大于零的整数
    var mobile = $("#mobile").val();
    var unicom = $("#unicom").val();
    var telecom = $("#telecom").val();
    if(!re3.test(mobile)||!re3.test(unicom)||!re3.test(telecom)){
        info("三网比率只能输正整数");
        return;
    }
    $.ajax({
        url: "/callerConfig/update",
        type: 'POST',
        data: JSON.stringify(callerConfig),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                CallerConfig.search();
                success("保存成功");
            }
        }
    })
};

/**
 * 删除用户
 *
 * @param id    callerConfigId
 */
CallerConfig.delete = function del(id) {
    var a = "";
    $.ajax({
        url: "/callerConfig/detail?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var form = $("#detail-form");
                var obj = r.obj;
                form.find('tbody').empty();
                $.each(obj,function (i,item) {
                    var e = obj[i];//查看是否绑定
                    a=e.pname;
                });
                console.log(a);
                if(a != "未绑定"){
                   info("绑定了项目不能删除");
                   return;
                }
                warning("确定删除吗", "", function () {
                    //var ids = CallerConfig.table.getSelectedRowIds();
                    $.ajax({
                        url: "/callerConfig/delete",
                        type: "POST",
                        data: {
                            'id': id
                        },
                        dataType: "json",
                        success: function (r) {
                            success("成功删除");
                            CallerConfig.search();
                        }
                    })
                })

            }
        }
    });
    
    /*var ids = this.table.getSelectedRowIds();
    if (ids === undefined || ids.length === 0) {
        toastr.warning("必须先选择记录再操作");
        // info("必须先选择记录再操作");
        return;
    } else {
        warning("确定删除吗", "", function () {
            var ids = CallerConfig.table.getSelectedRowIds();
            $.ajax({
                url: "/callerConfig/delete",
                type: "POST",
                data: {
                    'ids': ids
                },
                dataType: "json",
                success: function (r) {
                    success("成功删除");
                    CallerConfig.search();
                }
            })
        })
    }*/

};

/***
 * 恢复用户
 */
CallerConfig.recovery = function (id) {
    warning("确定恢复吗？","",function () {
        $.ajax({
            url:"/callerConfig/recovery?id="+id,
            type:"GET",
            dataType:"JSON",
            success:function (r) {
                if(r.code===0){
                    success("恢复成功");
                    CallerConfig.search();
                }
            }
        });
    });
}

/**
 * 详情
 * @param id
 */
CallerConfig.detail = function (id) {

    $.ajax({
        url: "/callerConfig/detail?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var form = $("#detail-form");
                var obj = r.obj;
                form.find('tbody').empty();
                // for(var key in obj){
                //     var e = obj[key];
                //     form.find('tbody').append("<tr>\n" +
                //         "  <td> "+e.name +"</td>\n" +
                //         "  <td> "+e.cname +"</td>\n" +
                //         "  <td> "+e.pname +"</td>\n" +
                //         "  <td> "+e.weight +"</td>\n" +
                //         "  </tr>")
                // }
                for(var i=0;i<obj.length;i++){
                    var e=obj[i];
                    form.find('tbody').append("<tr>\n" +
                        "  <td> "+e.name +"</td>\n" +
                        "  <td> "+e.cname +"</td>\n" +
                        "  <td> "+e.pname +"</td>\n" +
                        "  <td> "+e.weight +"</td>\n" +
                        "  </tr>")
                }
                $("#detalModal").modal();
            }
        }
    })
    $("#detailModal").modal();
    };

/**
 * 编辑预警
 */
CallerConfig.editWarn = function (id) {
    $.ajax({
        url: "/callerConfig/getWarns?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            $("#editwarnDiv").html("");
            if (r.code === 0) {
                var object = r.obj;
                var projectWarns = object.projectWarns;

                var allprojectWarns = object.allprojectWarns;
                var allUsers = object.alluser;
                var str = "";
                if (projectWarns.length > 0) {
                    for (var i = 0; i < projectWarns.length; i++) {
                        str += "<div><div class=\"row m-b-xs\">" +
                            "<div class=\"col-sm-12\">" +
                            "<label class=\"col-sm-3 \" >预警名称</label>" +
                            "<label class=\"col-sm-2 \" >操作符号</label>" +
                            "<label class=\"col-sm-2 \" >数值</label>" +
                            "<label class=\"col-sm-3 \" >处理方式</label>" +
                            "<label class=\"col-sm-2 \" >预警颜色</label>" +
                            "</div></div>";
                        str += "<div class=\"row m-b-xs\">";
                        str += "<div class=\"col-sm-3\">";
                        str += "<select class=\"form-control warn-name\" name=\"warnConfigName\">";
                        for (var j = 0; j < allprojectWarns.length; j++) {
                            if (projectWarns[i].name === allprojectWarns[j].name) {
                                str += '<option value="' + allprojectWarns[j].name + '" selected>' + allprojectWarns[j].showname + '</option>';
                            } else {
                                str += '<option value="' + allprojectWarns[j].name + '">' + allprojectWarns[j].showname + '</option>';
                            }
                        }
                        str += "</select>";
                        str += "</div><div class=\"col-sm-2  p-l-none\" style=\"padding-left: 20px;\">";
                        str += "<select  class=\"from-control warn-operator\" >";
                        if (projectWarns[i].operator === "lte") {
                            str += '<option value="gte" >\>=</option>';
                            str += '<option value="lte" selected>\<=</option>';
                        } else {
                            str += '<option value="gte" selected>\>=</option>';
                            str += '<option value="lte">\<=</option>';
                        }
                        str += "</select>";
                        if (projectWarns[i].value == undefined) {
                            str += "</div><div class=\"col-sm-2  p-l-none\"> <input type=\"text\" class=\"form-control warn-value\"  value=''>";
                        } else {
                            str += "</div><div class=\"col-sm-2  p-l-none\"> <input type=\"text\" class=\"form-control warn-value\"  value='" + projectWarns[i].value + "'>";
                        }
                        str += "</div><div class=\"col-sm-3  p-l-none warn-handle\"> ";

                        if (projectWarns[i].handle == undefined) {
                            str += "<label><input value=\"1\"  type=\"checkbox\" >弹框</label>";
                            str += "<label><input value=\"2\"  type=\"checkbox\" >停呼</label>";
                            str += "<label><input value=\"3\"  type=\"checkbox\" >短信</label>";
                        } else {
                            var arrhandle = projectWarns[i].handle.split(",");
                            var all= [1,2,3];
                            var temarr=all.minus(arrhandle);

                            // for (var k = 0; k < arrhandle.length; k++) {
                            //     if (arrhandle[k] === "1") {
                            //         str += "<label><input value=\"1\"  type=\"checkbox\" checked>弹框</label>";
                            //     }
                            //     if (arrhandle[k] === "2") {
                            //         str += "<label><input value=\"2\"  type=\"checkbox\" checked>停呼</label>";
                            //     }
                            //     if (arrhandle[k] === "3") {
                            //         str += "<label><input value=\"3\"  type=\"checkbox\" checked>短信</label>";
                            //     }
                            // }
                            for (var k = 0; k < all.length; k++) {
                                if (arrhandle.indexOf(all[k]+"")>=0) {
                                    if (all[k]===1)
                                    {
                                        str += "<label><input value=\"1\"  type=\"checkbox\" checked>弹框</label>";
                                    }
                                    if (all[k] === 2) {
                                        str += "<label><input value=\"2\"  type=\"checkbox\" checked>停呼</label>";
                                    }
                                    if (all[k] === 3) {
                                        str += "<label><input value=\"3\"  type=\"checkbox\" checked>短信</label>";
                                    }
                                }else{
                                    if (all[k]===1)
                                    {
                                        str += "<label><input value=\"1\"  type=\"checkbox\" >弹框</label>";
                                    }
                                    if (all[k] === 2) {
                                        str += "<label><input value=\"2\"  type=\"checkbox\" >停呼</label>";
                                    }
                                    if (all[k] === 3) {
                                        str += "<label><input value=\"3\"  type=\"checkbox\" >短信</label>";
                                    }
                                }
                            }
                        }

                        str += "</div><div class=\"col-sm-2  p-l-none\">";
                        str += "<select  class=\"from-control warn-color\" >"
                        if (projectWarns[i].color == undefined) {
                            str += '<option value="yellow">黄色</option>';
                            str += '<option value="orange">橙色</option>';
                            str += '<option value="red">红色</option>';
                        } else {
                            if (projectWarns[i].color === "yellow") {
                                str += '<option value="yellow" selected>黄色</option>';
                            } else {
                                str += '<option value="yellow">黄色</option>';
                            }

                            if (projectWarns[i].color === "orange") {
                                str += '<option value="orange" selected>橙色</option>';
                            } else {
                                str += '<option value="orange">橙色</option>';
                            }

                            if (projectWarns[i].color === "red") {
                                str += '<option value="red" selected>红色</option>';
                            } else {
                                str += '<option value="red">红色</option>';
                            }
                        }
                        str += "</select>";
                        str += "</div></div>";
                        str += "<div class=\"row m-b-xs\">" +
                            "<div class=\"col-sm-12\">" +
                            "<label class=\"col-sm-2 \" >预警对象</label>";
                        str += "<div class=\"col-sm-9  p-l-none\">";
                        str += "<select  data-placeholder=\"---选择对象---\" class=\"my-chosen-select warn-user\" multiple >"
                        for (var j = 0; j < allUsers.length; j++) {
                            if (projectWarns[i].userid == undefined) {
                                str += '<option value="' + allUsers[j].id + '">' + allUsers[j].nickname + '</option>';
                            } else {
                                var arruser = projectWarns[i].userid.split(",");
                                if (arruser.length>0&&arruser.indexOf(allUsers[j].id+"")>=0){
                                    str += '<option value="' + allUsers[j].id + '" selected>' + allUsers[j].nickname + '</option>';
                                }else{
                                    str += '<option value="' + allUsers[j].id + '" >' + allUsers[j].nickname + '</option>'
                                }
                            }
                        }
                        str += "</select></div><div class=\"col-sm-1  p-l-none\">";
                        if (i == 0) {
                            str += "<i class=\"fa fa-plus plus-btn\"  onclick=\"CallerConfig.addwarnDiv()\"></i>";
                        } else {
                            str += "<i class=\"fa fa-minus minus-btn\"  onclick=\"CallerConfig.removewarnDiv(this)\"></i>";

                        }
                        str += "</div></div>";
                        str += "</div>";
                    }
                } else {
                    str += "<div class=\"row m-b-xs\">" +
                        "<div class=\"col-sm-12\">" +
                        "<label class=\"col-sm-3 \" >预警名称</label>" +
                        "<label class=\"col-sm-2 \" >操作符号</label>" +
                        "<label class=\"col-sm-2 \" >数值</label>" +
                        "<label class=\"col-sm-3 \" >处理方式</label>" +
                        "<label class=\"col-sm-2 \" >预警颜色</label>" +
                        "</div></div>";
                    str += "<div class=\"row m-b-xs\">";
                    str += "<div class=\"col-sm-3\">";
                    str += "<select class=\"form-control warn-name\" name=\"warnConfigName\">";
                    for (var j = 0; j < allprojectWarns.length; j++) {
                        str += '<option value="' + allprojectWarns[j].name + '">' + allprojectWarns[j].showname + '</option>';
                    }
                    str += "</select>";
                    str += "</div><div class=\"col-sm-2  p-l-none\" style=\"padding-left: 20px;\">";
                    str += "<select  class=\"from-control warn-operator\" >"
                    str += '<option value="gte">\>=</option>';
                    str += '<option value="lte">\<=</option>';
                    str += "</select>";
                    str += "</div><div class=\"col-sm-2  p-l-none\"> <input type=\"text\" class=\"form-control warn-value\"  value=''>";
                    str += "</div><div class=\"col-sm-3  p-l-none warn-handle\"> <label><input value=\"1\"  type=\"checkbox\" >弹框</label>";
                    str += "<label><input value=\"2\"  type=\"checkbox\" >停呼</label>"
                    str += "<label><input value=\"3\"  type=\"checkbox\" >短信</label>"
                    str += "</div><div class=\"col-sm-2  p-l-none\">";
                    str += "<select  class=\"from-control warn-color\" >"
                    str += '<option value="yellow">黄色</option>';
                    str += '<option value="orange">橙色</option>';
                    str += '<option value="red">红色</option>';
                    str += "</select>";
                    str += "</div></div>";
                    str += "<div class=\"row m-b-xs\">" +
                        "<div class=\"col-sm-12\">" +
                        "<label class=\"col-sm-2 \" >预警对象</label>";
                    str += "<div class=\"col-sm-9  p-l-none\">";
                    str += "<select  data-placeholder=\"---选择对象---\" class=\"my-chosen-select warn-user\" multiple >"
                    for (var j = 0; j < allUsers.length; j++) {
                        str += '<option value="' + allUsers[j].id + '">' + allUsers[j].nickname + '</option>';
                    }
                    str += "</select></div><div class=\"col-sm-1  p-l-none\"><i class=\"fa fa-plus plus-btn\"onclick=\"CallerConfig.addwarnDiv()\"></i>";
                    str += "</div></div>";
                }
                $("#editwarnDiv").append(str);
                $("#projectId_warn").val(id);
                $("#editWarn").modal();
                $(".my-chosen-select").chosen({width: "100%"});
            }
        }
    })
};

/**
 * 编辑时新增预警配置
 */
CallerConfig.addwarnDiv = function () {
    $.ajax({
        type: 'get',
        url: "/callerConfig/getWarnsConfig",
        async: false,
        success: function (r) {
            var object = r.obj;
            var allprojectWarns = object.allprojectWarns;
            var allUsers = object.alluser;
            var str = "";
            str += "<div><div class=\"row m-b-xs\">" +
                "<div class=\"col-sm-12\">" +
                "<label class=\"col-sm-3 \" >预警名称</label>" +
                "<label class=\"col-sm-2 \" >操作符号</label>" +
                "<label class=\"col-sm-2 \" >数值</label>" +
                "<label class=\"col-sm-3 \" >处理方式</label>" +
                "<label class=\"col-sm-2 \" >预警颜色</label>" +
                "</div></div>";
            str += "<div class=\"row m-b-xs\">";
            str += "<div class=\"col-sm-3\">";
            str += "<select class=\"form-control warn-name\" name=\"warnConfigName\">";
            for (var j = 0; j < allprojectWarns.length; j++) {
                str += '<option value="' + allprojectWarns[j].name + '">' + allprojectWarns[j].showname + '</option>';
            }
            str += "</select>";
            str += "</div><div class=\"col-sm-2  p-l-none\" style=\"padding-left: 20px;\">";
            str += "<select  class=\"from-control warn-operator\" >"
            str += '<option value="gte">\>=</option>';
            str += '<option value="lte">\<=</option>';
            str += "</select>";
            str += "</div><div class=\"col-sm-2  p-l-none\"> <input type=\"text\" class=\"form-control warn-value\"  value=''>";
            str += "</div><div class=\"col-sm-3  p-l-none warn-handle\"> <label><input value=\"1\"  type=\"checkbox\" >弹框</label>";
            str += "<label><input value=\"2\"  type=\"checkbox\" >停呼</label>"
            str += "<label><input value=\"3\"  type=\"checkbox\" >短信</label>"
            str += "</div><div class=\"col-sm-2  p-l-none\">";
            str += "<select  class=\"from-control warn-color\" >"
            str += '<option value="yellow">黄色</option>';
            str += '<option value="orange">橙色</option>';
            str += '<option value="red">红色</option>';
            str += "</select>";
            str += "</div></div>";
            str += "<div class=\"row m-b-xs\">" +
                "<div class=\"col-sm-12\">" +
                "<label class=\"col-sm-2 \" >预警对象</label>";
            str += "<div class=\"col-sm-9  p-l-none\">";
            str += "<select  data-placeholder=\"---选择对象---\" class=\"my-chosen-select warn-user\" multiple >"
            for (var j = 0; j < allUsers.length; j++) {
                str += '<option value="' + allUsers[j].id + '">' + allUsers[j].nickname + '</option>';
            }
            str += "</select></div><div class=\"col-sm-1  p-l-none\"><i class=\"fa fa-minus minus-btn\"onclick=\"CallerConfig.removewarnDiv(this)\"></i>";
            str += "</div></div></div>";
            $("#editwarnDiv").append(str);
            $(".my-chosen-select").chosen({width: "100%"});
        }
    })
}
/**
 * 编辑时删除预警配置
 */
CallerConfig.removewarnDiv = function (btn) {
    //通过父元素删除
    $(btn).parent().parent().parent().parent().remove();
}

/**
 * 更新预警配置
 */
CallerConfig.updateWarn = function () {
    var form = $("#editWarn-form");
    var project = {};
    var warnnames = CallerConfig.getArray('.warn-name');
    var warnshownames = CallerConfig.getTextArray('.warn-name');
    var warnoperators = CallerConfig.getArray('.warn-operator');
    var warnvalues = CallerConfig.getArray('.warn-value');
    var warnhandles = CallerConfig.getCheckArray('.warn-handle');
    var warncolors = CallerConfig.getArray('.warn-color');
    //观察预警对象多对象输出为英文逗号分隔
    var warnusers = CallerConfig.getArray('.warn-user');
    var warnname = "";
    var warnshowname = "";
    var warnoperator = "";
    var warnvalue = "";
    var warnhandle = "";
    var warncolor = "";
    var warnuser = "";
    for (var i = 0; i < warnnames.length; i++) {
        warnname += warnnames[i] + "#";
        warnshowname +=warnshownames[i] + "#";
        warnoperator += warnoperators[i] + "#";
        warnvalue += warnvalues[i] + "#";
        warncolor += warncolors[i] + "#";
        warnuser += warnusers[i] + "#";
        warnhandle += warnhandles[i] + "#";
    }
    // alert(warnname);
    // alert(warnoperator);
    // alert(warnvalue);
    // alert(warncolor);
    // alert(warnuser);
    // alert(warnhandle);
    // alert(warnshowname);

    project.pid =$("#projectId_warn").val();
    project.name =warnname.substring(0,warnname.length-1);
    project.showname = warnshowname.substring(0,warnshowname.length-1);
    project.operator = warnoperator.substring(0,warnoperator.length-1);
    project.value = warnvalue.substring(0,warnvalue.length-1);
    project.color = warncolor.substring(0,warncolor.length-1);
    project.userid = warnuser.substring(0,warnuser.length-1);
    project.handle = warnhandle.substring(0,warnhandle.length-1);
    if (CallerConfig.validateWarn(project)) {
        $.ajax({
            url: "/callerConfig/updateWarn",
            type: 'POST',
            data: JSON.stringify(project),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    $("#editWarn").modal("hide");
                    CallerConfig.search();
                    success("保存成功");
                }
            }

        })
    }

}

/**
 * 校验预警数据
 */
CallerConfig.validateWarn = function (projcet) {
    var warnname = projcet.name.split("#");
    var warnshowname = projcet.showname.split("#");
    var warnoperator = projcet.operator.split("#");
    var warnvalue = projcet.value.split("#");
    var warncolor = projcet.color.split("#");
    var warnuser = projcet.userid.split("#");
    var warnhandle = projcet.handle.split("#");

    var reg = /^\d+(\.\d+)?$/;

    var re = new RegExp(reg);

    //判断是否设置预警配置
    if (warnvalue.length === 1 && warnvalue[0] == "") {
        toastr.error("必须设置预警阀值！", "error");
        return false;
    }
    if (warnname.length !== warnvalue.length ) {
        toastr.error("预警设置有误", "error");
        return false;
    }
    for (var i = 0; i < warnname.length; i++) {

        var value = warnvalue[i];
        if (!re.test(value)) {
            toastr.error("阀值必须为数字", "error");
            return false;
        }

        if (warnhandle[i] == "" ) {
            toastr.error("必须设置处理方式", "error");
            return false;
        }
    }
    return true;
}

CallerConfig.getArray = function (key) {
    var arr = new Array();
    jQuery(key).each(function (key, value) {
        arr[key] = $(this).val();
    });
    return arr;
}
CallerConfig.getTextArray = function (key) {
    var arr = new Array();
    jQuery(key).each(function (key, value) {
        var o= $(this).find('option:selected');
        arr[key] = o.text();
    });
    return arr;
}
CallerConfig.getCheckArray = function (key) {
    var arr = new Array();
    jQuery(key).each(function (key, value) {
        var temarr = new Array();
        $(this).find(":checkbox").each(function () {
            if ($(this).is(':checked')) {
                temarr.push($(this).val());
            }
        });
        var vals = temarr.join(",");
        arr[key] = vals;
    });
    return arr;
}

CallerConfig.resetAll = function(){
    var warnnames = CallerConfig.getArray('.warn-name');
    if (warnnames.length>1){
        toastr.error("有多条预警时无法重置！", "error");
    } else{
        $(".warn-name").get(0).selectedIndex=0;
        $(".warn-operator").get(0).selectedIndex=0;
        $(".warn-value").val("");
        $(".warn-color").get(0).selectedIndex=0;
        $(".warn-user").val("")
        $(".warn-user").trigger("chosen:updated")
        $('.warn-handle').each(function () {
            $(this).find(":checkbox").removeAttr("checked")
        })
        // var warnhandles = Company.getCheckArray('.warn-handle');
    }
}
/**
 * 清空所有数据
 */
CallerConfig.deleteAll = function () {
   var id =$("#projectId_warn").val();
    $.ajax({
        url: "/callerConfig/deleteWarns?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editWarn").modal("hide");
                CallerConfig.search();
                success("清空完成");
            }
        }
    })
}

Array.prototype.minus = function (arr) {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = 1;
    }
    for (var j = 0; j < this.length; j++) {
        if (!obj[this[j]])
        {
            obj[this[j]] = 1;
            result.push(this[j]);
        }
    }
    return result;
};
$(function() {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", CallerConfig.initOptions());
    CallerConfig.table = jqGrid.init();
    $('.dept_select').chosen();
});