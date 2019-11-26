<!DOCTYPE HTML>
<html dir="ltr" lang="zh-CN">
<head>
    <title>register</title>
    <link rel="stylesheet" type="text/css" href="/static/css/right.css" media="" />
    <link rel="stylesheet" type="text/css" href="/static/css/login.css" media="" />
    <script src="/static/js/script/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="/static/js/login/register.js" type="text/javascript" ></script>
</head>
<body >
<div id="rightheader" >
</div>
<div id="rightnav">
    <span onclick="gotoIndex()">首页</span>
</div>
<form id="regFm" action= '/user/register_handle'  method="post">
    <div id="regbox"  class="formbox" >

        <div >
            用户名称：
            <input type="text" name="username"   />
        </div>
        <div >
            昵　　称：
            <input type="text" name="nickname"   />
        </div>
        <div >
            密　　码：
            <input type="password" name="password"  />
        </div>
        <div >
            确认密码：
            <input type="password"  name="confirmpwd" />
        </div>
        <div>
            生　　日：
            <input type="text" name="birthday"   id="birthday"
                   readonly="readonly" onclick=
                           "WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d'})"  />
        </div>
        <div >
            性　　别：
            <input type="radio"  name="gender" value="m"/> 男
            <input type="radio"  name="gender" value="f"/> 女
        </div>
        <div >
            手　　机：
            <input type="text"  name="mobile"/>
        </div>
        <div >
            邮　　箱：
            <input type="text"  name="email" />
        </div>
        <div ></div>
        <div  id="autologindiv" class="submitBox">
       <span style="margin-left:100px;"><input type="button" id="regbtn"
                                               value="提交" onclick="regSubmit();" /></span>
        </div>

    </div>
</form>
<script src="/static/js/plugins/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
<footer></footer>
<script type='text/javascript'>
    var APP='__GROUP__';
</script>
</body>
</html>


