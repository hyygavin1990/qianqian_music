<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>cti</title>

    <link href="/static/css/bootstrap.min.css" rel="stylesheet">
    <link href="/static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="/static/css/animate.css" rel="stylesheet">
    <link href="/static/css/style.css" rel="stylesheet">
    <link href="/static/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">


</head>

<body class="gray-bg">

<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-lg-7">
            <div class="ibox center-block">
                <div class="ibox-title">
                    <h5>密码初始化<small></small></h5>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-6 b-r"><h3 class="m-t-none m-b"></h3>
                            <p></p>
                            <form class="form-horizontal" id="passwordEdit-form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">用户名</label>
                                    <div class="col-sm-10">
                                        <input type="username" class="form-control" name="username"  required="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">旧密码</label>
                                    <div class="col-sm-10">
                                        <input type="password" class="form-control" name="oldPassword" required="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">新密码</label>
                                    <div class="col-sm-10">
                                        <input type="password" class="form-control" name="newPassword" required="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">确认密码</label>
                                    <div class="col-sm-10">
                                        <input type="password" class="form-control" name="repeatNewPassword" required="">
                                    </div>
                                </div>
                            </form>
                            <div>
                                <button class="btn btn-sm btn-primary pull-right m-t-n-xs" type="submit" onclick="updateInitPassword();"><strong>确认修改</strong></button>
                            </div>
                        </div>
                        <div class="col-sm-6"><h4>返回登录页</h4>
                            <p class="text-center">
                                <a href="/login"><i class="fa fa-sign-in big-icon"></i></a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Mainly scripts -->
<script src="/static/js/jquery-3.1.1.min.js"></script>
<script src="/static/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/static/js/plugins/sweetalert/sweetalert.min.js"></script>
<script type="text/javascript" src="/static/js/common.js"></script>


</body>
<script>
    function updateInitPassword() {
        var username = $("#passwordEdit-form").find("input[name=username]").val();
        var oldPassword =  $("#passwordEdit-form").find("input[name=oldPassword]").val();
        var newPassword =  $("#passwordEdit-form").find("input[name=newPassword]").val();
        var repeatNewPassword =  $("#passwordEdit-form").find("input[name=repeatNewPassword]").val();
        $.ajax({
            url: "/updateInitPassword",
            type: 'POST',
            data: JSON.stringify({
                username:username,
                oldPassword:oldPassword,
                newPassword:newPassword,
                repeatNewPassword:repeatNewPassword
            }),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (r.code === 0) {
                    $("#passwordEdit-form")[0].reset();
                    success("修改密码成功");
                    window.location.href = ("/login");
                }
                else if (r.code === 405) {
                    info("两次密码输入不一致");
                }
                else if (r.code === 406) {
                    info("旧密码输入错误");
                }
                else if (r.code === 407) {
                    info("用户不存在");
                }
            }
        })
    }


</script>

</html>
