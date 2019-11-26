<!DOCTYPE HTML>
<html dir="ltr" lang="zh-CN">
<head>
    <title>right</title>
    <link rel="stylesheet" type="text/css" href="/static/css/right.css" media="" />
    <script src="/static/js/script/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="/static/js/rightfun.js" type="text/javascript"></script>
    <script src="/static/js/right.js" type="text/javascript"></script>
</head>
<body >
<div id="rightheader" >
    <#if musicuser?? >
        欢迎您  ${musicuser.nickname} <span id="logoutspan">退出</span>
    <#else>
        <span id="loginspan">登录</span>/<span id="regspan">注册</span>
    </#if>
</div>
<div id="rightnav">
    <span>首页</span><span>歌手</span><span >专辑</span><span>搜索</span><span>搜索</span><span>搜索</span><span>搜索</span><span>搜索</span>
</div>
<div id="searcharea">
    <div id="baidulogo">
        <input type="image" src="/static/images/logo.png" />
    </div>
    <div style="height:40px;width: inherit;text-align: center;"><input type="text" id="searchsongs" style="width: 60%;"/><input type="button" id="baidusearch"  class ='rightbutton' value="search"></div>
    <div id ="sea" style="position:absolute;text-align: center;border:1px solid black;display:none;">
    </div>
</div>
<footer></footer>

</body>
</html>
