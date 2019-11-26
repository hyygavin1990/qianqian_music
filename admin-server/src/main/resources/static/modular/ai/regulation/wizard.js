jQuery(function($) {
    // statelist.init(450);
    // 处理选项卡显示（显示进度条）
    function _handleTabShow(tab, navigation, index, wizard) {
        var liEles = navigation.find('li');
        var liEleWidths =[];
        $(liEles).each(function () {
            liEleWidths.push($(this).innerWidth());
        });
        var calWidth =0;
        for (var i = 0; i <=index; i++) {
            calWidth+=liEleWidths[i];
        }

        navigation.find('li').eq(0).outerWidth();

        navigation.find('li').removeClass('done');
        navigation.find('li.active').prevAll().addClass('done');
        wizard.find('.progress-bar').css({width: calWidth+'px'});
    }

// 初始化向导插件
    $('#rootwizard').bootstrapWizard({
        onTabShow: function(tab, navigation, index) {//index 从0 开始
            if(index==1) {
                Stateinfo.init(Wizard.rid);
            }
            if(index==2) {
                Eventinfo.init(Wizard.rid);
            }
            if(index==3) {
                InterruptDetail.init(Wizard.rid);
            }
            if(index==4) {
                Sentiment.init(Wizard.rid);
            }

            if(index==5) {
                ReguConfig.init(Wizard.rid);
            }

            if(index==6) {
                Voice.init(Wizard.rid);
            }

            if(index==7) {
                RobotVoice.init(Wizard.rid);
            }

            setTimeout(function () {
                _handleTabShow(tab, navigation, index, $('#rootwizard'));
            },1);

        },
        onNext: function(tab, navigation, index) {
            if(index>0){
                if(!Wizard.rid){
                    info("请先设置标签和版本！");
                    return false;
                }
            }
        },
        onLast: function(tab, navigation, index) {
            if(index>0){
                if(!Wizard.rid){
                    info("请先设置标签和版本！");
                    return false;
                }
            }
        },
        onTabClick:function (tab, navigation, index) {
            if(index==0){
                if(!Wizard.rid){
                    info("请先设置标签和版本！");
                    return false;
                }
            }
        }
    });

    if(Wizard.rid){
        var industries =[];
        $.ajax({
            url:"/industry/alist",
            async:false,
            success:function (d) {
                industries = d.obj;
            }
        });
        var select1 = $("#init-form").find("select[name=industryId]");
        select1.html("");
        for(var j=0;  j< industries.length;j++){
            select1.append('<option value="'+industries[j].id+'">'+industries[j].name+'</option>');
        }
        $.ajax({
            url:"/regulation/get",
            data:{
                id:Wizard.rid
            },
            success:function (d) {
                var regu = d.obj;
                $("#init-form").find("input[name=tag]").val(regu.tag);
                $("#init-form").find("input[name=version]").val(regu.version.substring(1));
                $("#init-form").find("select[name=industryId]").val(regu.industryId);
            }

        });

    }
    $('.submit').click(function () {
        var arr = $(this).attr('data').split('|');
        var formid = arr[0];
        var con = formid.indexOf("state")!=-1;
        if(!con){
            var name = $("#sets-upload-form").find("input[name=name]").val();
            name = $.trim(name);
            if(name==""){
                alert("集合名称不能为空");
                return;
            }
        }
        var formurl = arr[1];
        var formData = new FormData($('#'+formid)[0]);
        var btn = this;
        btn.disabled = true;
        alert('已经提交请勿重复点击或者刷新页面,耐心等待返回结果！！！');
        $.ajax({
            url: formurl,
            type: 'POST',
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            success: function (d) {
                var data = d.obj;

                if (data == 0) {
                    alert("文件为空");
                }
                if (data == 1) {
                    alert(con?"上传失败，请检查数据格式":"名称有重复！");
                }
                if (data == 2) {
                    success("批量导入成功！");
                }
                $('#'+formid).resetForm();

                if(con){
                    Stateinfo.init(Wizard.rid);
                }else{
                    TriggerLineSet.init(Wizard.rid);
                }
                $("#"+formid).find("div.uploadFileBox span").html(con?"上传xls文件":"上传txt文件(UTF8格式)");
                btn.disabled = false;
            },
            error: function () {
                alert('服务错误请刷新后重新提交！');
            }
        });
    });
});
Wizard.addOrUpdateRegu =function() {

    var tag = $("#init-form").find("input[name=tag]").val();
    var version = $("#init-form").find("input[name=version]").val();
    if((!tag)||tag.trim().length==0){
        info("标签为空");
        return;
    }

    if((!version)||parseInt(version)<=0){
        info("版本必须大于0");
        return;
    }

    var params = $("#init-form").serialize();
    $.ajax({
        url:"/regulation/addOrUpdate",
        data:params,
        success:function (d) {
            if(d.obj==0){
                success("执行成功");
            }else if(d.obj==1){
                info("标签或者版本为空");
            }else if(d.obj==2){
                info("版本不能重复");
            }
        }
    });
};


/*Wizard.changeIndustry=function(industryId){

    var models =[];
    $.ajax({
        url:"/modelgroup/getListByIndustryId",
        data:{industryId:industryId},
        async:false,
        success:function (d) {
            models = d.obj;
        }
    });
    var select = $("#init-form").find("select[name=mid]");
    select.html("");
    select.append('<option value="-1">无</option>');
    for(var i=0;  i< models.length;i++){
        select.append('<option value="'+models[i].id+'">'+models[i].name+'</option>');
    }

};*/

Wizard.showfile = function (input) {
    $(input).siblings("span").eq(0).html($(input).val());
};

Wizard.refreshPermission = function(domain,tabid) {
    console.log("domain=="+ domain);
    var permissions = JSON.parse(window.localStorage.getItem("permissions"));
    var resourceList = getResourceList(permissions, domain);
    $("#"+tabid+" .control-auth").each(function () {
        console.log($(this));
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

};

