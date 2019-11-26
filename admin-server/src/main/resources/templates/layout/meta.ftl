<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>外呼管理系统</title>

<!--common css-->
<link href="/static/css/bootstrap.min.css" rel="stylesheet">
<link href="/static/font-awesome/css/font-awesome.css" rel="stylesheet">
<link href="/static/css/animate.css" rel="stylesheet">
<link href="/static/css/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.css" rel="stylesheet">
<link href="/static/css/plugins/jqGrid/ui.jqgrid.css" rel="stylesheet">
<link href="/static/css/plugins/toastr/toastr.min.css" rel="stylesheet">
<link href="/static/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
<link href="/static/css/plugins/switchery/switchery.css" rel="stylesheet">
<link href="/static/css/style.css" rel="stylesheet">
<link href="/static/css/common.css" rel="stylesheet">

<style type="text/css">
    .pop{position: fixed;right:10px;bottom:10px;box-shadow: 0 5px 15px rgba(0,0,0,.5);}
    .popHead{background:#fff;width:260px;border:1px solid #e0e0e0;font-size:14px;padding: 10px;}
    .popClose{float: right;color: #f25656;}
    .popHead span{font-size: 15px;}
    .popContext{height: 80px;padding: 15px;}
</style>

<script>
    //------------------------------------------------------
    function gopop(title,text,bccolor){

        if(title==undefined)
            title = "預警提示";

        if(text==undefined)
            text = "暂时无预警消息";

        if(bccolor==undefined)
            bccolor = "yellow";

        $("#popHead span").html("<b>"+title+"</b>");
        $("#popTxt").html("<b>"+text+"</b>");

        $("#pop").css({"background-color":bccolor});

        $("#pop").show();
    }

    function closePop() {
        $("#pop").hide();
    }
</script>