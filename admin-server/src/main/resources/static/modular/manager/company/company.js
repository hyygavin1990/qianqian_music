var Company = {
    tableId: "#grid-table",
    pagerId: "#grid-pager",
    table: null,
    domain: "company"
};
var createSwitchery;
var editSwitchery;
/**
 * jqGrid初始化参数
 */
Company.initOptions = function () {
    var options = {
        url: "/company/grid",
        autowidth: true,
        colNames: ['编号', '企业名称'/*, '注册时间'*/, /*'坐席数',*/ '分机数','已使用', '企业状态', '今日消费金额（元）', '账户余额（元）', '操作'],
        colModel: [
            {name: 'id', index: 'id', width: 50, sorttype: "int"},
            {name: 'name', index: 'name', width: 200},
           /* {
                name: 'createDate',
                index: 'createDate',
                width: 200,
                sortable: false,
                formatter: function (cellValue, options, rowObject) {
                    return DateFormat.format(new Date(cellValue), "yyyy-MM-dd hh:mm:ss");
                }
            },*/
            // {name: 'staffnum', index: 'staffnum', width: 60, sortable: false},
            {name: 'botnum', index: 'botnum', width: 60, sortable: false},
            {name: 'projectUsedBotnum', index: 'projectUsedBotnum', width: 60, sortable: false,formatter:function (cellValue) {
                    if(cellValue!=null){
                        return cellValue;
                    }else {
                        return 0;
                    }
                }},
            {
                name: 'state',
                index: 'state',
                width: 60,
                sortable: false,
                formatter: function (cellValue, options, rowObject) {
                    if (cellValue == 0) {
                        return "已下线";
                    } else if (cellValue == 1) {
                        return "已上线";
                    }
                }
            },
            {
                name: 'balance', index: 'balance', width: 100, sortable: false, formatter: function (cellValue) {
                    if (cellValue != null) {
                        return "￥" + cellValue;
                    } else {
                        return "￥0.000";
                    }
                }
            },
            {
                name: 'totalAmount',
                index: 'totalAmount',
                width: 100,
                sortable: false,
                formatter: function (cellValue, options, rowObject) {
                    var totalAmount = rowObject["totalAmount"];
                    var consumptionAmount = rowObject["consumptionAmount"];
                    if (totalAmount == null) {
                        totalAmount = 0;
                    }
                    if (consumptionAmount == null) {
                        consumptionAmount = 0;
                    }
                    var balance = (totalAmount - consumptionAmount) / 1000;
                    return "￥" + balance.toFixed(3);
                }
            },
            {
                name: 'operations',
                index: 'operations',
                width: 500,
                sortable: false,
                formatter: function (cellValue, options, rowObject) {
                    var id = rowObject["id"];
                    var state = rowObject["state"];
                    var name = "'" + rowObject["name"] + "'";
                    var str = '<input type="button" class="control-auth btn btn-sm btn-info" data-auth="company_edit" value="编辑" onclick="Company.edit(' + id + ')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-danger" data-auth="company_delete" value="删除" onclick="Company.delete(' + id + ')"/>';
                    if (state == 0) {
                        str += '<input type="button" class="control-auth btn btn-sm btn-warning" data-auth="company_logout" value="上线企业" onclick="Company.updateCompanyState(' + id + ',1)"/>';
                    } else {
                        str += '<input type="button" class="control-auth btn btn-sm btn-warning" data-auth="company_login" value="下线企业" onclick="Company.updateCompanyState(' + id + ',0)"/>';
                    }
                    str += '<input type="button" class="control-auth btn btn-sm btn-success" data-auth="company_toProject" value="项目列表" onclick="Company.projectList(' + id + ')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-primary" data-auth="cmp_config_menu_permission" value="分配菜单" onclick="Company.permissionModal(' + id + ')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-primary" data-auth="cmp_config_user_admin" value="设置管理员" onclick="Company.adminModal(' + id + ')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-primary" data-auth="company_recharge" value="企业充值" onclick="Company.recharge(' + id + ',' + name + ')"/>';
                    str += '<input type="button" class="control-auth btn btn-sm btn-info" data-auth="company_warn" value="企业预警配置" onclick="Company.editWarn(' + id + ')"/>';
                    return str;
                }
            }
        ],
        gridComplete: function () {
            refreshPermission(Company.domain);
            interval = setInterval(function () {
                Company.concurrency();
            }, 3000);
        },
        loadComplete: function () {
            //在表格加载完成后执行
            var ids = $("#grid-table").jqGrid("getDataIDs");//获取所有行的id
            var rowDatas = $("#grid-table").jqGrid("getRowData");//获取所有行的数据
            for (var i = 0; i < rowDatas.length; i++) {
                var rowData = rowDatas[i];
                var totalAmount = rowData.totalAmount.replace("￥", "");
                var balance = rowData.balance.replace("￥", "");
                if (totalAmount - balance < 1000) {//如果某一行中的“tax”为0，那就把这一整行的背景颜色设为红色
                    $("#" + ids[i]).css("background-color", "#FF7575");
                }
            }
        }
    };
    return options;
};

/**
 * 根据关键词搜索
 */
Company.search = function () {
    var searchParam = {};
    searchParam.state = $("#stateSelector").val();
    Company.table.reload(searchParam);
};

/**
 * 重置搜索
 */
Company.resetSearch = function () {
    $("#stateSelector").val("");
    Company.search();
};

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
/**
 * 新增弹框
 */
Company.create = function () {
    $("#createModal").modal();

    //上传文件对象
    var inputObj = document.getElementById('cfileUpload');
    //预览对象
    var imgObj = document.getElementById('cpreview');
    imgObj.src = "";
    //浏览器预览方法
    preview(inputObj, imgObj);
};

/**
 * 保存用户
 */
Company.insert = function () {
    var createForm = document.getElementById("create-form");
    var form = $("#create-form");

    var name = form.find("input[name='name']").val().trim();
    // var botnum = form.find("input[name='botnum']").val().trim();
    // var staffnum = form.find("input[name='staffnum']").val().trim();
    var reg = /^[0-9]+$/;
    // if (!reg.test(botnum)) {
    //     toastr.error("机器分机数只能为数字", "error");
    //     return false;
    // }
    // if (!reg.test(staffnum)) {
    //     toastr.error("坐席分机数只能为数字", "error");
    //     return false;
    // }
    if (name === "" || name === undefined) {
        info("名称不能为空！");
        return;
    }
    // if (botnum === "" || botnum === undefined) {
    //     info("机器人分机数不能为空！");
    //     return;
    // }
    // if (staffnum === "" || staffnum === undefined) {
    //     info("坐席分机不能为空！");
    //     return;
    // }
    var formData = new FormData(createForm);
    // var hiden = document.querySelector("#createModal .js-switch").checked;
    // formData.append("hiden", hiden);

    // $("#editModal").modal();
    $.ajax({
        url: "/company/insert",
        type: 'POST',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#createModal").modal("hide");
                success("保存成功");
                Company.search();
                Company.getState();
                $("#create-form")[0].reset();
            }
        }
    })
};

function uploadStyleUpdate() {
    $(".uploadPic").bind({
        mouseenter: function () {
            $(this).find(".uploadPic_btn_box").show();
        }, mouseleave: function () {
            $(this).find(".uploadPic_btn_box").hide();
        }
    });
    $('.uploadPicBtn_del').click(function () {
        $(this).parent().parent().find('img').attr("src", "/static/img/point.gif");
        $(this).parent().find(':file').val('');
    });

    $(".uploadPicBtn").click(function () {
        $(this).parent().find('input').click();
    });
}

/**
 * 编辑弹框
 * @param id    callerConfigId
 */
Company.edit = function (id) {

    $.ajax({
        url: "/company/get?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var company = r.obj;
                var form = $("#edit-form");
                form.find("input[name='name']").val(company.name);
                form.find("select[name='state']").val(company.state);
                // form.find("input[name='botnum']").val(company.botnum);
                // form.find("input[name='staffnum']").val(company.staffnum);
                form.find("input[name='id']").val(company.id);
                // setSwitchery(editSwitchery, company.hiden);
                var file = company.logo;
                $("fileUpload").val("");
                if (company.logo !== null) {
                    document.getElementById('epreview').src = "http://61.160.248.137:9088" + file;
                } else {
                    $("#epreview").val("");
                    document.getElementById('epreview').src = "";

                }
                //浏览器预览
                var inputObj = document.getElementById('efileUpload');
                var imgObj = document.getElementById('epreview');
                //浏览器预览方法
                preview(inputObj, imgObj);

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
            url: "/company/get?id=" + ids[0],
            type: 'GET',
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    var company = r.obj;
                    var form = $("#edit-form");
                    form.find("input[name='name']").val(company.name);
                    form.find("input[name='state']").val(company.state);
                    form.find("input[name='botnum']").val(company.botnum);
                    form.find("input[name='staffnum']").val(company.staffnum);
                    form.find("input[name='id']").val(company.id);
                    $("#editModal").modal();
                }
            }
        })
    }*/
};

function preview(inputObj, imgObj) {

    inputObj.onchange = function () {
        // 获取上传的文件信息
        var pic = inputObj.files[0];
        // 创建FileReader对象
        var reader = new FileReader();
        // 编码成Data URL (这一步最为关键)
        reader.readAsDataURL(pic);
        // 监听上传完成
        reader.onload = function () {
            // 拿到base64的路径
            var src = reader.result;
            // 改变img的src属性值
            imgObj.src = src;
        }
    };
}


/**
 * 更新用户
 */
Company.update = function () {
    var form = $("#edit-form");

    var name = form.find("input[name='name']").val().trim();
    // var botnum = form.find("input[name='botnum']").val().trim();
    // var staffnum = form.find("input[name='staffnum']").val().trim();
    // var reg = /^[0-9]+$/;
    // if (!reg.test(botnum)) {
    //     toastr.error("机器分机数只能为数字", "error");
    //     return false;
    // }
    // if (!reg.test(staffnum)) {
    //     toastr.error("坐席分机数只能为数字", "error");
    //     return false;
    // }
    if (name === "" || name === undefined) {
        info("名称不能为空！");
        return;
    }
    // if (botnum === "" || botnum === undefined) {
    //     info("机器人分机数不能为空！");
    //     return;
    // }
    // if (staffnum === "" || staffnum === undefined) {
    //     info("坐席分机不能为空！");
    //     return;
    // }

    var createForm = document.getElementById("edit-form");
    var formData = new FormData(createForm);
    // var hiden = document.querySelector("#editModal .js-switch").checked;
    // formData.append("hiden", hiden);
    $.ajax({
        url: "/company/update",
        type: 'POST',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editModal").modal("hide");
                Company.search();
                Company.getState();
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
Company.delete = function del(id) {
    var ids = [id];
    warning("确定删除吗", "", function () {
        //var ids = Company.table.getSelectedRowIds();
        $.ajax({
            url: "/company/delete",
            type: "POST",
            data: {
                'ids': ids
            },
            dataType: "json",
            success: function (r) {
                success("成功删除");
                Company.getState();
                Company.search();
            }
        })
    })

    /*var ids = this.table.getSelectedRowIds();
    if (ids === undefined || ids.length === 0) {
        toastr.warning("必须先选择记录再操作");
        // info("必须先选择记录再操作");
        return;
    } else {
        warning("确定删除吗", "", function () {
            var ids = Company.table.getSelectedRowIds();
            $.ajax({
                url: "/company/delete",
                type: "POST",
                data: {
                    'ids': ids
                },
                dataType: "json",
                success: function (r) {
                    success("成功删除");
                    Company.search();
                }
            })
        })
    }
*/
};

/**
 * 更新公司状态
 */
Company.updateCompanyState = function (id, operate) {
    var name = "";
    if (operate === 1) {
        name = "上线";
    } else if (operate === 0) {
        name = "下线";
    }
    warning("确定" + name + "吗", "", function () {
        //var ids = Company.table.getSelectedRowIds();
        $.ajax({
            url: "/company/updateCompanyState?id=" + id + "&operate=" + operate,
            type: "GET",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    success(name + "成功");
                    Company.search();
                    Company.getState();
                }
            }
        })
    })
};

/**
 * 队列列表
 */
Company.extQueueList = function () {
    var ids = this.table.getSelectedRowIds();
    if (ids === undefined || ids.length === 0) {
        toastr.warning("必须先选择记录再操作");
        return;
    } else if (ids.length > 1) {
        toastr.warning("只能选择一条记录");
        return;
    } else {
        window.location.href = "/company/extQueue/list?companyId=" + ids[0];
    }
}

/**
 * 项目列表
 */
Company.projectList = function (id) {
    //post('/project/list', {'companyId':id});
    window.location.href = "/project/list?companyId=" + id;
};

function post(URL, PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
    temp.style.display = "none";
    for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        // alert(opt.name)
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}

var jstreeOptions = {
    core: {
        data: [],
        themes: {
            "variant": "large"
        }
    },
    checkbox: {
        "keep_selected_style": false
    },
    plugins: ["wholerow", "checkbox"]   //引用插件："wholerow"-行点击；"checkbox"-加上复选框
};

Company.permissionModal = function (companyId) {
    $("#companyId").val(companyId);
    var menuTree = $("#menu_tree");
    menuTree.jstree("destroy");
    $.ajax({
        url: "/cmp_config/menu/permission?companyId=" + companyId,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var nodes = r.obj;
                jstreeOptions.core.data = nodes;
                menuTree.jstree(jstreeOptions);
                $("#permissionModal").modal();
            }
        }
    });

};

/**
 * 保存授权
 */
Company.savePermissions = function () {
    var jstree = $('#menu_tree').jstree();
    //先获取选中的code
    var codes = jstree.get_selected();
    //因为jstree对部分选中的不算选中，所以我们手动加上
    for (var i = 0; i < codes.length; i++) {
        var pcode = jstree.get_parent(codes[i]);
        if (pcode !== "#") {
            codes.push(pcode);
        }
    }
    //去重
    codes = Array.from(new Set(codes));
    console.log(codes);
    var companyId = $("#companyId").val();
    $.ajax({
        url: "/cmp_config/menu/permission/save",
        type: 'POST',
        data: JSON.stringify({
            id: companyId,
            codes: codes
        }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#permissionModal").modal('hide');
                success("保存成功");
            }
        }
    });
};

Company.adminModal = function (id) {
    $.ajax({
        url: "/cmp_config/user/getAdmin?companyId=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                //如果已经设置管理员
                if (r.obj !== null) {
                    swal({
                        title: "警告",
                        text: "已经设置过管理员，用户名：" + r.obj.username,
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        cancelButtonText: "取消",
                        confirmButtonText: "确定",
                        closeOnConfirm: true
                    }, function () {
                        $("#companyId2").val(id);
                        $("#adminModal").modal();
                    });
                } else {
                    $("#companyId2").val(id);
                    $("#adminModal").modal();
                }
            }
        }
    })

};

Company.setAdmin = function () {
    var user = getFormJson($("#admin-form"));
    user.companyId = $("#companyId2").val();
    $.ajax({
        url: "/cmp_config/user/admin",
        type: 'POST',
        data: JSON.stringify(user),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#adminModal").modal("hide");
                success("保存成功");
            }
        }
    })
};

Company.getState = function () {
    $.ajax({
        url: "/company/getStaffNum",
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var states = r.obj;
                $("span[name='enable']").html(states.enable);
                // $("span[name='over']").html(states.over);
                $("span[name='used']").html(states.used);
                // $("span[name='free']").html(states.free);
            }
        }
    })
};

Company.recharge = function (id, name) {
    var form = $("#recharge-form");
    $("#recharge-form input").val("");
    form.find("input[name='name']").val(name);
    form.find("input[name='id']").val(id);
    $("#rechargeModal").modal();
};

Company.doRecharge = function () {
    var form = $("#recharge-form");
    var accountlog = {};
    accountlog.money = form.find("input[name='money']").val().trim();
    accountlog.type = form.find("select[name='type']").val();
    accountlog.memo = form.find("input[name='memo']").val().trim();
    accountlog.id = form.find("input[name='id']").val();
    if (Company.validateRecharge(accountlog)) {
        $.ajax({
            url: "/company/doRechargeApply",
            type: 'POST',
            data: JSON.stringify(accountlog),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    $("#rechargeModal").modal("hide");
                    Company.search();
                    Company.getState();
                    success("保存成功");
                }
            }
        })
    }
}
Company.validateRecharge = function (accountlog) {
    var reg = /^[0-9]+$/;
    if (!reg.test(accountlog.money)) {
        toastr.error("充值金额只能为数字", "error");
        return false;
    }
    // if(accountlog.project==""){
    //         //     toastr.error("充值项目不能为空", "error");
    //         //     return false;
    //         // }
    return true;
}


/**
 * 编辑预警
 */
Company.editWarn = function (id) {
    $.ajax({
        url: "/company/getWarns?id=" + id,
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
                            var all = [1, 2, 3];
                            var temarr = all.minus(arrhandle);

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
                                if (arrhandle.indexOf(all[k] + "") >= 0) {
                                    if (all[k] === 1) {
                                        str += "<label><input value=\"1\"  type=\"checkbox\" checked>弹框</label>";
                                    }
                                    if (all[k] === 2) {
                                        str += "<label><input value=\"2\"  type=\"checkbox\" checked>停呼</label>";
                                    }
                                    if (all[k] === 3) {
                                        str += "<label><input value=\"3\"  type=\"checkbox\" checked>短信</label>";
                                    }
                                } else {
                                    if (all[k] === 1) {
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
                                if (arruser.length > 0 && arruser.indexOf(allUsers[j].id + "") >= 0) {
                                    str += '<option value="' + allUsers[j].id + '" selected>' + allUsers[j].nickname + '</option>';
                                } else {
                                    str += '<option value="' + allUsers[j].id + '" >' + allUsers[j].nickname + '</option>'
                                }
                            }
                        }
                        str += "</select></div><div class=\"col-sm-1  p-l-none\">";
                        if (i == 0) {
                            str += "<i class=\"fa fa-plus plus-btn\"  onclick=\"Company.addwarnDiv()\"></i>";
                        } else {
                            str += "<i class=\"fa fa-minus minus-btn\"  onclick=\"Company.removewarnDiv(this)\"></i>";
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
                    str += "</select></div><div class=\"col-sm-1  p-l-none\"><i class=\"fa fa-plus plus-btn\"onclick=\"Company.addwarnDiv()\"></i>";
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
Company.addwarnDiv = function () {
    $.ajax({
        type: 'get',
        url: "/company/getWarnsConfig",
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
            str += "</select></div><div class=\"col-sm-1  p-l-none\"><i class=\"fa fa-minus minus-btn\"onclick=\"Company.removewarnDiv(this)\"></i>";
            str += "</div></div></div>";
            $("#editwarnDiv").append(str);
            $(".my-chosen-select").chosen({width: "100%"});
        }
    })
}
/**
 * 编辑时删除预警配置
 */
Company.removewarnDiv = function (btn) {
    //通过父元素删除
    $(btn).parent().parent().parent().parent().remove();
}

/**
 * 更新预警配置
 */
Company.updateWarn = function () {
    var form = $("#editWarn-form");
    var project = {};
    var warnnames = Company.getArray('.warn-name');
    var warnshownames = Company.getTextArray('.warn-name');
    var warnoperators = Company.getArray('.warn-operator');
    var warnvalues = Company.getArray('.warn-value');
    var warnhandles = Company.getCheckArray('.warn-handle');
    var warncolors = Company.getArray('.warn-color');
    //观察预警对象多对象输出为英文逗号分隔
    var warnusers = Company.getArray('.warn-user');
    var warnname = "";
    var warnshowname = "";
    var warnoperator = "";
    var warnvalue = "";
    var warnhandle = "";
    var warncolor = "";
    var warnuser = "";
    for (var i = 0; i < warnnames.length; i++) {
        warnname += warnnames[i] + "#";
        warnshowname += warnshownames[i] + "#";
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

    project.pid = $("#projectId_warn").val();
    project.name = warnname.substring(0, warnname.length - 1);
    project.showname = warnshowname.substring(0, warnshowname.length - 1);
    project.operator = warnoperator.substring(0, warnoperator.length - 1);
    project.value = warnvalue.substring(0, warnvalue.length - 1);
    project.color = warncolor.substring(0, warncolor.length - 1);
    project.userid = warnuser.substring(0, warnuser.length - 1);
    project.handle = warnhandle.substring(0, warnhandle.length - 1);
    if (Company.validateWarn(project)) {
        $.ajax({
            url: "/company/updateWarn",
            type: 'POST',
            data: JSON.stringify(project),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    $("#editWarn").modal("hide");
                    Company.search();
                    Company.getState();
                    success("保存成功");
                }
            }

        })
    }

}

/**
 * 校验预警数据
 */
Company.validateWarn = function (projcet) {
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
    if (warnname.length !== warnvalue.length) {
        toastr.error("预警设置有误", "error");
        return false;
    }
    for (var i = 0; i < warnname.length; i++) {

        var value = warnvalue[i];
        if (!re.test(value)) {
            toastr.error("阀值必须为数字", "error");
            return false;
        }

        if (warnhandle[i] == "") {
            toastr.error("必须设置处理方式", "error");
            return false;
        }
    }
    return true;
}

Company.getArray = function (key) {
    var arr = new Array();
    jQuery(key).each(function (key, value) {
        arr[key] = $(this).val();
    });
    return arr;
}
Company.getTextArray = function (key) {
    var arr = new Array();
    jQuery(key).each(function (key, value) {
        var o = $(this).find('option:selected');
        arr[key] = o.text();
    });
    return arr;
}
Company.getCheckArray = function (key) {
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

Company.resetAll = function(){
    var warnnames = Company.getArray('.warn-name');
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
Company.deleteAll = function () {
    var  id=$("#projectId_warn").val();
    $.ajax({
        url: "/company/deleteWarns?id=" + id,
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editWarn").modal("hide");
                Company.search();
                Company.getState();
                success("清空完成");
            }
        }
    })
}
/**
 * 并发量
 */
Company.concurrency = function () {
    $.ajax({
        url: "/company/concurrency",
        type: 'GET',
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                var concurrency = r.obj;
                $("span[name='using']").html(concurrency.callNum);
            }
        }
    })
};

$(function () {
    var jqGrid = new JqGrid("#grid-table", "#grid-pager", Company.initOptions());
    Company.table = jqGrid.init();
    //初始化Switchery选择插件
    // createSwitchery = new Switchery(document.querySelector('#createModal .js-switch'), {color: '#1AB394'});
    // editSwitchery = new Switchery(document.querySelector('#editModal .js-switch'), {color: '#1AB394'});
    Company.getState();
    uploadStyleUpdate();

});