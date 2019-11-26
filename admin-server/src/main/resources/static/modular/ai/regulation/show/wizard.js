jQuery(function($) {
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
        onTabShow: function(tab, navigation, index) {
            if(index==0) {
                Stateinfo.init(Wizard.rid);
            }
            if(index==1) {
                Eventinfo.init(Wizard.rid);
            }
            if(index==2) {
                InterruptDetail.init(Wizard.rid);
            }
            if(index==3) {
                ReguConfig.init(Wizard.rid);
            }
            if(index==4) {
                Sentiment.init(Wizard.rid);
            }
            if(index==5) {
                Voice.init(Wizard.rid);
            }
            if(index==6) {
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

});
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
