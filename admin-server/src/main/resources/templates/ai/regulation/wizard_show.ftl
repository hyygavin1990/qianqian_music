<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/wizard/prettify.css" rel="stylesheet"/>
    <link href="/static/css/plugins/chosen/chosen.min.css" rel="stylesheet"/>
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
        .width-30{
            width: 30px;
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
                                                <span class='title'>状态机列表</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#step2' data-toggle='tab'>
                                                <span class='step'>2</span>
                                                <span class='title'>跳转详情</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#step3' data-toggle='tab'>
                                                <span class='step'>3</span>
                                                <span class='title'>打断库列表</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#step4' data-toggle='tab'>
                                                <span class='step'>4</span>
                                                <span class='title'>特殊规则</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#step5' data-toggle='tab'>
                                                <span class='step'>5</span>
                                                <span class='title'>初始化模型</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#step6' data-toggle='tab'>
                                                <span class='step'>6</span>
                                                <span class='title'>话术</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a href='#step7' data-toggle='tab'>
                                                <span class='step'>7</span>
                                                <span class='title'>坐席录音</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class='progress' style="margin-top: 1%;">
                                        <div class='progress-bar progress-bar-primary'></div>
                                    </div>
                                </div>
                                <div class='tab-content clearfix'>
                                    <div class='tab-pane active' id='step1'>
                                        <table id="grid-table"></table>

                                        <div id="grid-pager"></div>
                                    </div>
                                    <div class='tab-pane' id='step2'>
                                        <iframe id="statetree" name="statetree" style="height:600px;border: none;width: 100%;"></iframe>
                                        <h3 class="lighter block blue">跳转关系列表</h3>
                                        <table id="grid-table-1"></table>

                                        <div id="grid-pager-1"></div>
                                    </div>

                                    <div class='tab-pane row' id='step3'>
                                        <div class="col-xs-12">
                                            <h3 class="lighter block blue">打断库列表</h3>
                                            <table id="grid-table-2"></table>

                                            <div id="grid-pager-2"></div>
                                        </div>
                                    </div>
                                    <div class='tab-pane' id='step4'>
                                        <div class="row" style="margin-left:-2%;margin-top: 2%;">
                                            <div class="ibox ">
                                            <#include "/templates/ai/regulation/reguconfig_show.ftl">
                                            </div>

                                        </div>
                                    </div>
                                    <div class='tab-pane' id='step5'>
                                    <#include "/templates/ai/regulation/model.ftl">
                                    </div>
                                    <div class='tab-pane' id='step6'>
                                        <input id="voiceLocalUrl" value="${voiceLocalUrl}" hidden>
                                        <div class="row">
                                            <form enctype="multipart/form-data" method="post" id="speakForm">
                                                <div class="col-xs-2">
                                                    <div class="uploadFileBox">
                                                        <input class="form-control" id="xls" name="xls" onchange="Voice.showfile()" type="file"/>
                                                        <span>上传xls文件</span>
                                                    </div>
                                                </div>
                                                <input type="button" value="导入话术" style="margin-top:0.5%;margin-left: 2%;" onclick="Voice.uploadFile(this)"    class="btn btn-sm btn-primary">
                                                <input type="button" value="下载模板" style="margin-top:0.5%;margin-left: 2%;" onclick="Voice.downloadFile(this)"    class="btn btn-sm btn-primary">
                                                <input type="button" value="新增状态话术" style="margin-top:0.5%;margin-left: 1.85%;" onclick="Voice.createVoiceRobot()"  class="btn btn-sm btn-danger">
                                                <input type="button" value="多选删除" style="margin-top:0.5%;margin-left: 1.85%;" onclick="Voice.deleteVoiceRobots()"  class="btn btn-sm btn-danger">
                                                <input type="button" value="录音校验" style="margin-top:0.5%;margin-left: 1.85%;" onclick="Voice.checkMerge()"  class="btn btn-sm btn-warning">
                                                <input type="hidden" value="" id="voiceUrl">
                                            </form>
                                        </div>
                                        <div class="col-xs-12">
                                        <#--<h3 class="lighter block blue">录音上传</h3>-->
                                            <button class="submit btn btn-sm btn-primary" style="margin: 5px;"
                                                    onclick="Voice.createInitParam();">配置初始化项目参数
                                            </button>
                                            <table id="grid-table-4"></table>
                                            <div id="grid-pager-4"></div>
                                        </div>
                                    </div>
                                    <div class='tab-pane' id='step7'>
                                        <div class="col-xs-12">
                                            <button class="submit btn btn-sm btn-primary" style="margin: 5px;" id="addRobotVoiceBtn"
                                                    onclick="RobotVoice.createInsertVoiceModal();">增加录音
                                            </button>
                                            <table id="grid-table-5"></table>
                                            <div id="grid-pager-5"></div>
                                        </div>
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
<#include "/templates/ai/regulation/dialog.ftl">

<script type="text/javascript">
    var Wizard = {rid: '${rid?if_exists}'};
</script>
<script src="/static/js/jquery.form.js"></script>
<script src="/static/js/plugins/chosen/chosen.jquery.min.js"></script>
<script src="/static/js/plugins/wizard/jquery.bootstrap.wizard.js"></script>
<script src="/static/js/plugins/wizard/prettify.js"></script>
<script src="/static/modular/ai/regulation/show/stateinfo.js"></script>
<script src="/static/modular/ai/regulation/show/eventinfo.js"></script>
<script src="/static/modular/ai/regulation/show/interruptdetail.js"></script>
<script src="/static/js/plugins/dualListbox/jquery.bootstrap-duallistbox.js"></script>
<script src="/static/modular/ai/regulation/corpus.js"></script>
<script src="/static/modular/ai/regulation/model.js"></script>
<script src="/static/modular/ai/regulation/reguconfig_data.js"></script>
<script src="/static/modular/ai/regulation/show/reguconfig.js"></script>
<script src="/static/modular/ai/regulation/voice.js"></script>
<script src="/static/modular/ai/regulation/robotvoice.js"></script>
<script src="/static/modular/ai/regulation/show/wizard.js"></script>

</body>
</html>
