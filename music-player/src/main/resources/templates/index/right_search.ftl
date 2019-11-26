<!DOCTYPE HTML>
<html dir="ltr" lang="zh-CN">
<head>
    <title>right_search</title>
    <link rel="stylesheet" type="text/css" href="/static/css/right.css" media="" />
    <script src="/static/js/script/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="/static/js/right.js" type="text/javascript"></script>
    <script src="/static/js/rightfun.js" type="text/javascript"></script>
    <script src="/static/js/search.js" type="text/javascript"></script>
</head>
<body >

<div id="rightextra">
    <div id="rightheader">
        <#if nickname?? >
            欢迎您  ${nickname} <span id="logoutspan">退出</span>
        <#else>
            <span id="loginspan">登录</span>/<span id="regspan">注册</span>
        </#if>
    </div>
    <div id="rightnav">
        <span>首页</span>
        <span>歌手</span>
        <span>专辑</span>
        <span>搜索</span>
        <span>搜索</span>
        <span>搜索</span>
        <span>搜索</span>
        <span>搜索</span>
    </div>
    <div id="searcharea">
        <div style="height:80px;width:inherit;text-align: center;margin-left:5%;">
            <div style="float:left;">
                <input type="image" src="/static/images/logo1.png" />
            </div>
            <div style="float:left; padding-top:4.5%;">
                <input type="text" value="" style="width:300px;" id="searchsongs" /><input type="button" value="search" class="rightbutton" id="baidusearch" />
            </div>
        </div>
        <div style="position: absolute; border: 1px solid gray; z-index: 1; background: none repeat scroll 0% 0% white; display: none; " id="sea">
        </div>
        <ul style="margin-top:8%">
            <li style="border-top: 1px  dotted  gray;" class="searchlistonpage">
                <input type="checkbox" style="height:20px"/><span style="width:150px; display:inline-block;white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow: hidden;">全选</span>
                <span style="width:300px;display:inline-block; white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow: hidden;">
                            <input type="button" value="播放" class="rightbutton" />
                            <input type="button" value="添加" class="rightbutton" />
                            <input type="button" value="收藏" class="rightbutton" />
                            <input type="button" value="下载" class="rightbutton" />
                            <input type="button" value="发送到手机" class="rightbutton" />
                        </span>
            </li>
            <#list musiclist as song>
                <li id="0" class="searchlistonpage">
                    <input type="checkbox" style="height:20px"/><span style="width:250px; display:inline-block;white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow: hidden;">${song.name}</span>
                    <span style="width:150px;display:inline-block; white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow: hidden;">${song.name}</span>
                    <span style="display:none;">${song.id}</span>
                </li>
            </#list>
        </ul>
        <ul class="pager">${page}</ul>
    </div>
</div>

<footer></footer>
</body>
</html>


