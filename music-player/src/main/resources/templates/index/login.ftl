<!DOCTYPE HTML>
<html dir="ltr" lang="zh-CN">
<head>
    <title>right</title>
    <link rel="stylesheet" type="text/css" href="/static/css/right.css" media="" />
    <link rel="stylesheet" type="text/css" href="/static/css/login.css" media="" />
    <script src="/static/js/script/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="/static/js/script/jquery.form.js" type="text/javascript"></script>
    <script src="/static/js/login/login.js" type="text/javascript"></script>
</head>
<body >

<div id="rightheader" >
</div>
<div id="rightnav">
    <span onclick="gotoIndex()">首页</span>
</div>
<form id="loginFm" action= '/login_handle' method="post">
    <div id="loginbox"  class="formbox" >
        <div >
            用户名：
            <input type="text"  name="username" />
        </div>
        <div >
            密　码：
            <input type="password"  name="password" />
        </div>
        <div style="height:22px;">
            验证码：
            <input type="text"  name="verify" />&nbsp;
            <div  id="verifyimg">
                <img src='/common/defaultKaptcha'
                onclick="this.src=this.src+'?p='+Math.random()*1000;"
                style="position:abslute;" />
            </div>
        </div>
        <div ></div>
        <div  id="autologindiv" class="submitBox">
            <span style="margin-left:45px;"><input type="checkbox" name="autologin" />自动登录</span>
            <span style="margin-left:35px;"><input type="button" id="loginbtn"
                                                   value="提交" onclick="login();"/></span>
        </div>
    </div>
</form>
<footer></footer>
</body>
</html>