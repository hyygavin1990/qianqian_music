//toastr消息提示插件配置
toastr.options = {
    closeButton: true,
    progressBar: true,
    showMethod: 'slideDown'
};

//全局的ajax访问，处理ajax清求时异常
$.ajaxSetup({
    complete:function(xmlHttpRequest){
        //通过XMLHttpRequest取得响应结果
        var jsonData = xmlHttpRequest.responseJSON;
        if(!jsonData){
            jsonData = JSON.parse(xmlHttpRequest.responseText);
        }
        // console.log(jsonData);
        //如果是后台成功返回的result
        if (isServerResult(jsonData)) {
            //如果是401码，用户未认证，跳到登录页
            if (jsonData.code === 401) {
                window.location.href = "/login?expired";
            } else if (jsonData.code === 403) {
                window.location.href = "/403";
            } else if (jsonData.code !== 0) {
                toastr.error(jsonData.msg, "error");
            }
        }
    }
});

function showError(errorMsg){
    toastr.error(errorMsg, "error");
}

function isServerResult(json) {
    return json !== null && json.hasOwnProperty("code") && json.hasOwnProperty("msg");
}

function getFormJson(frm) {
    var o = {};
    var a = $(frm).serializeArray();//表单对象数组 每个对象有两个属性 name:dom 对应的name值 value dom对应的value值
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {//a遍历对象该对象对应名在o对象中没有相对应名的数组 //有相同name值才能触发
                o[this.name] = [o[this.name]];  //把o对象中对应于遍历对象的name值的对象 初始化为数组放入并覆盖 到name值为名字的对象
            }
            o[this.name].push(this.value || '');//再放入遍历对象的value值
        } else {
            o[this.name] = this.value || ''; //一般的加入对象中
        }
    });

    return o;
}

/**
 * 改造 去除前后空格值
 * @param frm
 */
function getFormJsonWithTrim(frm) {
    var o = {};
    var a = $(frm).serializeArray();//表单对象数组 每个对象有两个属性 name:dom 对应的name值 value dom对应的value值
    $.each(a, function () {
        if(this.value !==0 && this.value){//排除0 其他undefined ,"" ,null 三个 都为false
            this.value=this.trim();//输入框值预trim()
        }
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {//a遍历对象该对象对应名在o对象中没有相对应名的数组 //有相同name值才能触发
                o[this.name] = [o[this.name]];  //把o对象中对应于遍历对象的name值的对象 初始化为数组放入并覆盖 到name值为名字的对象
            }
            o[this.name].push(this.value || '');//再放入遍历对象的value值
        } else {
            o[this.name] = this.value || ''; //一般的加入对象中
        }
    });

    return o;
}

//sweet alert 警告框
function warning(title, text, fn) {
    swal({
        title: title,
        text: text,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        closeOnConfirm: false
    }, fn);
}
//sweet waiting 等待中
function waiting(title) {
    swal({
        title: "<h2>"+title+"</h2>",
        text: '<div class="spiner-example" style="height:162px;">' +
        '<div class="sk-spinner sk-spinner-wave">' +
        '<div class="sk-rect1"></div>' +
        '<div class="sk-rect2" style="margin-left: 2px"></div>' +
        '<div class="sk-rect3" style="margin-left: 2px"></div>' +
        '<div class="sk-rect4" style="margin-left: 2px"></div>' +
        '<div class="sk-rect5" style="margin-left: 2px"></div>' +
        '</div>' +
        '</div>',
        html: true,
        showConfirmButton: false
    });
}

function info(text) {
    swal(text);
}

//sweet alert 成功框
function success(title, text) {
    swal(title, text, "success");
}

//页面遮罩
function waitMask() {
    $.blockUI({
        message: '<img src="/static/img/loading.gif">',
        css: {
            border: "none",
            backgroundColor: "none"
        }
    });
}

//解除页面遮罩
function clearMask() {
    $.unblockUI();
}



/*
 * 切换Switchery开关函数
 * * switchElement Switchery对象
 * * checkedBool 选中的状态
 */
function setSwitchery(switchElement, checkedBool) {
    if ((checkedBool && !switchElement.isChecked()) || (!checkedBool && switchElement.isChecked())) {
        switchElement.setPosition(true);
        switchElement.handleOnchange(true);
    }
}

function isEmpty(str) {
    return str === undefined || str === "";
}


/**
 * 刷新页面上的权限
 * @param domain
 */
function refreshPermission(domain) {
    var permissions = JSON.parse(window.localStorage.getItem("permissions"));
    var resourceList = getResourceList(permissions, domain);
    $(".control-auth").each(function () {
        var auth = $(this).attr("data-auth");
        console.log(auth);
        if (hasAuth(resourceList, auth)) {
            $(this).show();
        } else {
            $(this).remove();
        }
    });

    function getResourceList(permissions, domain) {
        for (var i = 0; i < permissions.length; i++) {
            var permission = permissions[i];
            if (permission.domain === domain) {
                return permission.resources;
            }
        }
        return [];
    }

    function hasAuth(resourceList, auth) {
        for (var i = 0; i < resourceList.length; i++) {
            var resource = resourceList[i];
            var children = resource.children;
            if (resource.code === auth) {
                return true;
            } else {
                if (children !== undefined && children.length > 0) {
                    if (hasAuth(children, auth)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

}

//修改密码
function createPasswordModal() {
    $("#editPasswordModal").modal();
}

function updatePassword() {
    var userId = $("#passwordEdit-form").find("input[name=userId]").val();
    var oldPassword =  $("#passwordEdit-form").find("input[name=oldPassword]").val();
    var newPassword =  $("#passwordEdit-form").find("input[name=newPassword]").val();
    var repeatNewPassword =  $("#passwordEdit-form").find("input[name=repeatNewPassword]").val();
    $.ajax({
        url: "/updatePassword",
        type: 'POST',
        data: JSON.stringify({
            userId:userId,
            oldPassword:oldPassword,
            newPassword:newPassword,
            repeatNewPassword:repeatNewPassword
        }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.code === 0) {
                $("#editPasswordModal").modal("hide");
                success("修改成功");
                $("#passwordEdit-form")[0].reset();
            }
        }
    })
}

var pendingRequests = {};
$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    var key = options.url;
    if (!pendingRequests[key] && key.indexOf('.html') == -1) {
        pendingRequests[key] = jqXHR;
    } else if(key.indexOf('.html') == -1){
        console.log('abort:' + key);
        jqXHR.abort();	// 放弃后触发的重复提交
//pendingRequests[key].abort();	// 放弃先触发的提交
    }

    var complete = options.complete;
    options.complete = function(jqXHR, textStatus) {
        pendingRequests[key] = null;
        if ($.isFunction(complete)) {
            console.log('apply:' + key);
            complete.apply(this, arguments);
        }
    };
});


/**
 * 初始化日期格式插件
 *
 * @param $date     dom
 * @param format    日期format
 * @param date      初始化的日期
 * @param mode      0-天  1-月份
 */
function initDatePicker($date, format, date, mode) {
    $date.val(date);
    $date.datepicker({
        minViewMode: mode,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayHighlight: true,
        format: format,
        language: "zh-CN"
    });
}


/**
 * 构造select options
 *
 * @param arr   对象数组
 * @param all   bool，是否添加'不限'option
 * @returns {string}
 */
function buildOptions(arr, all) {
    var str = '';
    if (all) {
        str += '<option value="">不限</option>';
    }
    if(!arr){
        return str;
    }
    for(var i = 0; i < arr.length; i++){
        str+='<option value="'+arr[i].id+'">'+arr[i].name+'</option>';
    }
    return str;
}

/**
 * 将秒数转为时分秒格式
 *
 * @param seconds
 * @returns {string}
 */
function second2hms(seconds) {
    var str = '';
    if (seconds) {
        var hours = parseInt(seconds / 3600);
        if (hours > 0) {
            str += hours + "h ";
        }
        var minutes = parseInt((seconds - hours * 3600) / 60);
        if (minutes > 0) {
            str += minutes + "m ";
        }
        str += parseInt(seconds - hours * 3600 - minutes * 60) + "s";
    }
    if(!str){
        return "0s";
    }
    return str;
}

/**
 * 返回字符串
 *
 * @param str
 * @returns {*}
 */
function prettyStr(str) {
    if (str) {
        return str;
    }
    return '';
}

/**
 * 切换公司
 */
function companyChanged($company, $project, unlimited, fn) {
    var companyId = $company.val();
    if (companyId) {
        $.ajax({
            url: "/common/company/changed/user?companyId=" + companyId,
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var projects = r.obj;
                var html = '';
                if (unlimited) {
                    html += '<option value="">不限</option>';
                }
                for(var i = 0; i < projects.length; i++){
                    html+='<option value="'+projects[i].id+'">'+projects[i].name+'</option>';
                }
                $project.html(html);
                if (fn) {
                    fn.call();
                }
            }
        })
    }
}

/**
 * 切换项目
 */
function projectChanged($project, $staffGroup, unlimited, fn) {
    var id = $project.val();
    if (id) {
        $.ajax({
            url: "/common/project/changed/user",
            data: {
                pid: id
            },
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var staffGroups = r.obj;
                var html = '';
                if (unlimited) {
                    html += '<option value="">不限</option>';
                }
                for(var i = 0; i < staffGroups.length; i++){
                    html+='<option value="'+staffGroups[i].id+'">'+staffGroups[i].name+'</option>';
                }
                $staffGroup.html(html);
                if (fn) {
                    fn.call();
                }
            }
        })
    }
}

/**
 * 切换坐席组
 */
function staffGroupChanged($staffGroup, $staff, unlimited, fn) {
    var id = $staffGroup.val();
    if (id) {
        $.ajax({
            url: "/common/staffGroup/changed",
            data: {
                staffGroupId: id
            },
            type: 'GET',
            dataType: "json",
            success: function (r) {
                var staffList = r.obj;
                var html = '';
                if (unlimited) {
                    html += '<option value="">不限</option>';
                }
                for(var i = 0; i < staffList.length; i++){
                    html+='<option value="'+staffList[i].id+'">'+staffList[i].name+'</option>';
                }
                $staff.html(html);
                if (fn) {
                    fn.call();
                }
            }
        })
    }
}
var check={};
const Pattern={};
Pattern.model={
    Phone:/^[1][3,4,5,7,8][0-9]{9}$/,
    Integer:/^([0-9]+)$/,
    PositiveNumber:/^([1-9][0-9]*)$/,
    checkPhone:function (n) {
        if(this.Phone.test(n)){
            return true;
        }
        return false;
    },
    checkInteger:function () {
        if(this.Integer.test(n)){
            return true;
        }
        return false;
    },
    checkPositiveNumber:function () {
        if(this.PositiveNumber.test(n)){
            return true;
        }
        return false;
    },
};
check.checkNumber=function(n){
    let number=/^([1-9][0-9]*)$/;
    let re = new RegExp(number);
    if(!re.test(n)){
        info("请输入数字");
        return false;
    }else {
        return true;
    }
};
check.checkNumberv2=function(n){
    let number=/^([0-9]+)$/;
    let re = new RegExp(number);
    if(!re.test(n)){
        info("请输入数字");
        return false;
    }else {
        return true;
    }
};
check.checkDecimal=function(n){
    let decimal=/^(([1-9][0-9]+|0)\.([0-9]{1,2}))$/;
    let re = new RegExp(decimal);
    if(!re.test(n)){
        info("请输入正确小数！");
        return false;
    }else {
        return true;
    }
};
check.checkNumberRange=function(n){
    let number=/^[1-9]+$/;
    let re = new RegExp(number);
    if(!re.test(n)){
        info("请输入开头不为0的数字！");
        return false;
    }else {
        return true;
    }
};
check.checkPhone=function(phone){
    let phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;
    let rePhone = new RegExp(phoneReg);
    if(!rePhone.test(phone)){
        info("请输入有效手机号码！");
        return false;
    }else {
        return true;
    }
};
var Dev={};
/**
 * 是否 开启
 * @type {boolean}
 */
Dev.status=false;
Dev.style={};
Dev.devBox={
    "isDev":1,
    "earnFreeWidth":1
};
Dev.earnFreeWidth=function(){
    //约等于 ---真实能展示的最大宽度
    let width=$("div .footer").width();//底栏CopyRight宽度
    Dev.style.freeWidth=width-45;
    if(this.style.freeWidth){
        console.log("-----------♪(^∇^*)--------------自适应宽度------------♪(^∇^*)------------>>>>>>",width,"px",Dev.style.freeWidth);
    }
};
Dev.main=function(){
    for(let func in Dev.devBox){
        Dev[func]();
    }
};
Dev.isDev=function(){
    let port=window.location.port;
    let host=window.location.host.replace(":"+port,"");
    let hostDev={
        localhost:1,"127.0.0.1":1
    };
    this.status=!!hostDev[host];
    if(this.status){
        console.log("-----------♪(^∇^*)--------------本地js环境------------♪(^∇^*)------------")
    }
};
Dev.print=function (str) {
      if(Dev.status){
          console.log(str);
      }
};
Dev.alert=function (str) {
    if(Dev.status){
       alert(str);
    }
};
Dev.assert=function (exp) {
    if(exp){
        console.log(exp.toString()+"=>true非空");
    }else {
     console.log("=>false空");
    }
};
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] == obj) {
            return true;
        }
    }
    return false;
}
