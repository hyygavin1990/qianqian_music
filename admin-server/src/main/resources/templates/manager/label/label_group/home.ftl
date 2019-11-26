<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Examples</title>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link href="/static/css/bootstrap.min.css" rel="stylesheet">
    <link href="/static/css/plugins/jquery-confirm/jquery-confirm.css" rel="stylesheet">
    <link href="/static/css/ace.min.css" rel="stylesheet">
    <link href="/static/modular/css/ai.css" rel="stylesheet">
    <link href="/static/modular/css/common.css" rel="stylesheet">
    <link href="/static/modular/css/home.css" rel="stylesheet">
    <link href="/static/modular/css/admin.css" rel="stylesheet">
    <link href="/static/css/plugins/bootstrap-tab/bootstrap-tab.css" rel="stylesheet">

</head>
<body>
<div class="shengdongContent">
    <div class="shengdongMain">
        <div class="sdAITopWrap clearfix">
            <img class="sdAILogo fl" src="/static/img/sdLogo.png">
            <div class="userInforBox fr">
                <input id="groupId" hidden value="${groupId}">
                <input id="batch" hidden value="${batch}">
                <button class="btn btn-sm btn-primary" id="effect">生效</button>&nbsp;&nbsp;
                <span class="userHeader"><img src="/static/img/headerImg.png"></span>
                <span class="userName"><input type="hidden" id="" value="">测试</span>
                <span class="userStatusBox">状态：<input type="hidden" id="" value=""><label id="">空闲</label><!--忙碌|空闲|休息 --></span>
                <span class="workRestBtn"><i class="coffeIcon"></i><i class="workTyoe">休息一下</i></span>
                <span class="quitBtn1" style="width: 155px; margin-right: 20px;" onclick=""><i>AI超级教练</i></span>
                <br>
                <div class="btn-group" style="margin-right: 20px">
                    <button type="button" class="quitBtn1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                        设置 <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a href="#" onclick="">编辑Leads</a></li>
                        <li><a href="#" onclick="">黑名单</a></li>
                        <li><a href="#" onclick="">复拨Leads</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#" onclick="">修改性别</a></li>
                        <li><a href="#" onclick="">退出</a></li>
                    </ul>
                </div>

            </div>

        </div>
        <div class="sdAIBoxLists">
            <div class="sdAIBoxWrap firstAIBox">
                <div class="haveAIContentBox clearfix" id="scrollDiv">
                    <div class="container-fluid">
                        <div class="row">
                            <div id="tabContainer">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="mask"></div>
<!--点击关闭弹窗信息-->
<div class="showPopWin">
    <p class="tips"><i class="tipsIcon"></i>提交黑名单手机号</p>
    <p class="tips">手机号：<input type="text" id="blackphone"></p>
    <p class="tips">等级：<select id="blacktype"  style="width:146px;" >
        <option value="0" >非常反感</option>
        <option value="1" >反感</option>
        <option value="2" >不配合</option>
        <option value="3" selected >已经拨打有意向</option>
    </select></p>
    <div class="optBtns"><span class="sureBtn">确定</span><span class="closeBtn">取消</span></div>
</div>

<script src="/static/js/jquery-3.1.1.min.js"></script>
<script src="/static/js/bootstrap.min.js"></script>
<script src="/static/js/plugins/jquery-confirm/js/jquery-confirm.js"></script>
<script src="/static/js/plugins/bootstrap-tab/bootstrap-tab.js"></script>
<script type="text/javascript" src="/static/js/plugins/sweetalert/sweetalert.min.js"></script>
<script src="/static/modular/manager/label/label_group/home.js"></script>
<script>


</script>
</body>
</html>