<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/wizard/prettify.css" rel="stylesheet"/>
    <link href="/static/css/plugins/chosen/chosen.min.css" rel="stylesheet"/>
    <link href="/static/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet">
    <style>
        .uploadFileBox {
            width: 100%;
            height: 33px;
            line-height: 31px;
            border: 1px solid #ccc;
            margin-top: 3.2%;
            margin-left: 20px;
            position: relative;
        }

        .uploadFileBox input[type=file] {
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
        }

        .uploadFileBox span {
            display: block;
            width: 100%;
            height: 100%;
            padding: 5px;
            line-height: 21px
        }

        .nav > li.active {
            border: none;
            background: none;
        }

        .navbar-fixed-bottom {
            margin-left: 80%;
            margin-bottom: 60px;
        }

        #custom-templates .empty-message {
            padding: 5px 10px;
            text-align: center;
        }

        #multiple-datasets .league-name {
            margin: 0 20px 5px 20px;
            padding: 3px 0;
            border-bottom: 1px solid #ccc;
        }

        #scrollable-dropdown-menu .tt-menu {
            max-height: 150px;
            overflow-y: auto;
        }

        #rtl-support .tt-menu {
            text-align: right;
        }

        .label-50{
            width:50px;text-align:center;
        }
        .label-60{
            width:60px;text-align:center;
        }
        .label-100{
            width:100px;text-align:center;
        }

        .width-120{
            width: 120px;
        }
        .width-180{
            width: 180px;
        }
        .width-200{
            width: 200px;
        }
        .width-400{
            width: 400px;
        }
        .mt-10{
            margin-top: -10px;
        }
        .ml-2p{
            margin-left: -2%;
        }
        .ml-1p{
            margin-left: -1%;
        }
        .inline-div{
            padding-left: 15px;margin-top: 5px;
        }

    </style>
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>初始化规则</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="/main">首页</a>
                    </li>
                    <li class="active">
                        <strong>引导页</strong>
                    </li>
                </ol>
            </div>
            <div class="col-lg-2">

            </div>
        </div>
        <div class="wrapper wrapper-content">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">
                        <div class="ibox-content">
                            <div id='rootwizard' class='form-wizard form-wizard-horizontal'>
                                <div class='form-wizard-nav'>
                                    <ul class='nav nav-justified'>
                                        <li class='active'>
                                            <a href='#step1' data-toggle='tab'>
                                                <span class='step'>1</span>
                                                <span class='title'>wechat</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#step2' data-toggle='tab'>
                                                <span class='step'>2</span>
                                                <span class='title'>url</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#step3' data-toggle='tab'>
                                                <span class='step'>3</span>
                                                <span class='title'>templet</span>
                                            </a>
                                        </li>

                                    </ul>
                                    <div class='progress' style="margin-top: 1%;">
                                        <div class='progress-bar progress-bar-primary'></div>
                                    </div>
                                </div>
                                <div class='tab-content clearfix'>
                                    <div class='tab-pane active' id='step1'>
                                        <h3 class="lighter block blue">wechat</h3>
                                        <div class="form-inline">
                                            <input type="text"  placeholder="wechat" id="wechat" class="form-control" style="width: 200px">
                                            <button class="btn btn-sm btn-primary" id="wechatSearch" >查询</button>
                                            <button class="btn btn-sm btn-warning" data-auth="wechat_add" id="wechatCreate">新增</button>
                                        </div>
                                        <table id="grid-table"></table>
                                        <div id="grid-pager"></div>
                                    </div>
                                    <div class='tab-pane' id='step2'>
                                        <h3 class="lighter block blue">url</h3>
                                        <div class="form-inline">
                                            <input type="text"  placeholder="url" id="url" class="form-control" style="width: 200px">
                                            <button class="btn btn-sm btn-primary" id="urlSearch" >查询</button>
                                            <button class="btn btn-sm btn-warning" data-auth="url_add" id="urlCreate">新增</button>
                                        </div>
                                        <table id="grid-table-1"></table>
                                        <div id="grid-pager-1"></div>
                                    </div>

                                    <div class='tab-pane row' id='step3'>
                                        <h3 class="lighter block blue">templet</h3>
                                        <div class="form-inline">
                                            <input type="text"  placeholder="templet" id="templet" class="form-control" style="width: 200px">
                                            <button class="btn btn-sm btn-primary" id="templetSearch" >查询</button>
                                            <button class="btn btn-sm btn-warning" data-auth="templet_add" id="templetCreate">新增</button>
                                        </div>
                                        <table id="grid-table-2"></table>
                                        <div id="grid-pager-2"></div>
                                    </div>
                                </div>
                                <div class='col-sm-2 col-sm-offset-1 no-padding  navbar-fixed-bottom'>
                                    <ul class='pager wizard'>
                                        <li class='previous first'><a class='btn btn-default'
                                                                      href='javascript:void(0);'>起始</a></li>
                                        <li class='previous'><a class='btn btn-default'
                                                                href='javascript:void(0);'>上一步</a></li>
                                        <li class='next last'><a class='btn btn-default'
                                                                 href='javascript:void(0);'>最后</a></li>
                                        <li class='next'><a class='btn btn-default' href='javascript:void(0);'>下一步</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <#include "/templates/layout/footer.ftl">
    </div>

<#include "/templates/layout/commonjs.ftl">
</div>
<!----------------------------------------------------------微信----------------------------------------------------------------->
<#--新增模板-->
<div class="modal fade" id="wechatCreateModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" >新增微信</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="wechatCreate-form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label" >微信号</label>
                        <div class="col-sm-9">
                            <input type="hidden" id="wechatCreateId" class="form-control" name="id">
                            <input type="text" id="wecahtCreateContent" class="form-control" name="content">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Wechat.submitAdd()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--编辑模板-->
<div class="modal fade" id="wechatEditModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title"  >编辑微信</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="wechatEdit-form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label" >微信号</label>
                        <div class="col-sm-9">
                            <input type="hidden" id="wechatEditId" class="form-control" name="id">
                            <input type="text" id="wechatEditContent" class="form-control" name="content">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Wechat.submitModify()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!----------------------------------------------------------url----------------------------------------------------------------->
<#--新增模板-->
<div class="modal fade" id="urlCreateModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" >新增微信</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="urlCreate-form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label" >微信号</label>
                        <div class="col-sm-9">
                            <input type="hidden" id="urlCreateId" class="form-control" name="id">
                            <input type="text" id="urlCreateContent" class="form-control" name="content">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Url.submitAdd()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--编辑模板-->
<div class="modal fade" id="urlEditModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title"  >编辑微信</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="urlEdit-form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label" >微信号</label>
                        <div class="col-sm-9">
                            <input type="hidden" id="urlEditId" class="form-control" name="id">
                            <input type="text" id="urlEditContent" class="form-control" name="content">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Url.submitModify()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!----------------------------------------------------------templet----------------------------------------------------------------->
<#--新增模板-->
<div class="modal fade" id="templetCreateModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" >新增短信模板</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="templetCreate-form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label" >短信模板</label>
                        <div class="col-sm-9">
                            <input type="hidden" id="templetCreateId" class="form-control" name="id">
                            <textarea id="templetCreateContent" class="form-control" name="content" style="height: 100px"></textarea>
                            <span>新增模板备注：模板中需要替换微信或者url的用###代替。如果有多个需要替换的内容，请在优先级中表明优先级</span><br>
                            <span>例子：这是一个举例模板，请点击链接###，或者加我微信###</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label" >优先级</label>
                        <div class="col-sm-9">
                            <input type="text" id="templetCreatePriority" name="priority" class="form-control">
                            <span>例子：url|wechat</span>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Templet.submitAdd()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--编辑模板-->
<div class="modal fade" id="templetEditModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title"  >编辑短信模板</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="templetEdit-form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label" >短信模板</label>
                        <div class="col-sm-9">
                            <input type="hidden" id="templetEditId" class="form-control" name="id">
                            <textarea id="templetEditContent" class="form-control" name="content" style="height: 200px"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label" >优先级</label>
                        <div class="col-sm-9">
                            <input type="text" id="templetEditPriority" name="priority" class="form-control">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Templet.submitModify()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#include "/templates/ai/regulation/dialog.ftl">

<script type="text/javascript">
    var Sms = {rid: '${rid?if_exists}'};
</script>

<script src="/static/js/jquery.form.js"></script>
<script src="/static/js/plugins/chosen/chosen.jquery.min.js"></script>
<script src="/static/js/plugins/wizard/jquery.bootstrap.wizard.js"></script>
<script src="/static/js/plugins/ladda/spin.min.js"></script>
<script src="/static/js/plugins/ladda/ladda.min.js"></script>
<script src="/static/js/plugins/ladda/ladda.jquery.min.js"></script>
<script src="/static/js/plugins/wizard/prettify.js"></script>
<script src="/static/modular/ai/regulation/sms/sms.js"></script>
<script src="/static/modular/ai/regulation/sms/smsprojectwechat.js"></script>
<script src="/static/modular/ai/regulation/sms/smsprojecturl.js"></script>
<script src="/static/modular/ai/regulation/sms/smsprojecttemplet.js"></script>

</body>
</html>
