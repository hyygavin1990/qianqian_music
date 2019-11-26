<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/wizard/prettify.css" rel="stylesheet"/>
    <link href="/static/css/plugins/nouslider/nouislider.min.css" rel="stylesheet"/>
    <link href="/static/css/plugins/chosen/chosen.min.css" rel="stylesheet"/>
    <link href="/static/css/plugins/dualListbox/bootstrap-duallistbox.min.css" rel="stylesheet"/>
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
        .label-80{
            width:80px;text-align:center;
        }
        .label-100{
            width:100px;text-align:center;
        }
        .label-120{
            width:120px;text-align:center;
        }

        .width-30{
            width: 30px;
        }
        .width-80{
            width: 80px;
        }

        .width-130{
            width: 130px;
        }
        .width-160{
            width: 160px;
        }
        .width-180{
            width: 180px;
        }
        .width-200{
            width: 200px;
        }
        .width-320{
            width: 320px;
        }
        .width-400{
            width: 400px;
        }
        .mt-10{
            margin-top: -10px;
        }
        .ml-5p{
            margin-left: -5%;
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
                                                <span class='title'>初始化</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#step2' data-toggle='tab'>
                                                <span class='step'>2</span>
                                                <span class='title'>新建状态</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#step3' data-toggle='tab'>
                                                <span class='step'>3</span>
                                                <span class='title'>配置状态跳转</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#step4' data-toggle='tab'>
                                                <span class='step'>4</span>
                                                <span class='title'>配置打断库</span>
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
                                                <span class='title'>初始化特殊规则</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a href='#step7' data-toggle='tab'>
                                                <span class='step'>7</span>
                                                <span class='title'>上传话术</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#step8' data-toggle='tab'>
                                                <span class='step'>8</span>
                                                <span class='title'>上传坐席录音</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class='progress' style="margin-top: 1%;">
                                        <div class='progress-bar progress-bar-primary'></div>
                                    </div>
                                </div>
                                <div class='tab-content clearfix'>
                                    <div class='tab-pane active' id='step1'>
                                        <div class="row" style="margin-left:-2%;margin-top: 2%;">
                                            <form class="form-horizontal" id="init-form">
                                                <div class="form-group">
                                                    <label class="col-sm-2 control-label">标签</label>
                                                    <div class="col-sm-3">
                                                        <input type="hidden" name="cid" value="${cid?if_exists}">
                                                        <input type="hidden" name="id" value="${rid?if_exists}">
                                                        <input type="text" class="form-control" name="tag">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-2 control-label">版本</label>
                                                    <div class="col-sm-1 control-label" style="width: 2px;">V-</div>
                                                    <div class="col-md-1" style="padding:0px;">
                                                        <input type="number" class="form-control" name="version" readonly/>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-2 control-label" >行业</label>
                                                    <div class="col-sm-2">
                                                        <select name="industryId" class="form-control" ></select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-2 control-label"></label>
                                                    <div class="col-sm-5">
                                                        <button type="button" class="btn btn-sm btn-primary"
                                                                onclick="Wizard.addOrUpdateRegu()">提交
                                                        </button>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                    <div class='tab-pane' id='step2'>
                                        <div class="row" style="margin-left:-2%;margin-bottom: 0.5%;">
                                            <form enctype="multipart/form-data" class="form-horizontal" method="post"
                                                  id="state-upload-form">
                                                <div class="col-xs-2">
                                                    <div class="uploadFileBox">
                                                        <input type="hidden" name="rid" value="${rid?if_exists}">
                                                        <input class="form-control"  name="xls"
                                                               onchange="Wizard.showfile(this)" type="file"/>
                                                        <span>上传xls文件</span>
                                                    </div>
                                                </div>
                                                <input type="button" value="导入状态机" data="state-upload-form|/stateinfo/addall"
                                                       style="margin-top:0.5%;margin-left: 2%;"
                                                       onclick="alert('已经提交成功！！请勿重复提交！！')"
                                                       class="submit btn btn-sm btn-primary">
                                                <input type="button" value="新增" style="margin-top:0.5%;margin-left: 2%;"
                                                       class=" btn btn-sm btn-primary" onclick="Stateinfo.create()">
                                            </form>
                                        </div>

                                        <table id="grid-table"></table>

                                        <div id="grid-pager"></div>
                                    </div>

                                    <div class='tab-pane row' id='step3'>
                                        <iframe id="statetree" name="statetree" style="height:600px;border: none;width: 100%;"></iframe>
                                        <h3 class="lighter block blue">跳转关系列表</h3>
                                        <button class="btn btn-primary" style="margin: 5px;"
                                                onclick="Eventinfo.create()">增加
                                        </button>
                                        &nbsp;&nbsp;
                                        <button class="btn btn-primary" style="margin: 5px;"
                                                onclick="Eventinfo.initEvents()">一键生成
                                        </button>
                                        <table id="grid-table-1"></table>

                                        <div id="grid-pager-1"></div>
                                    </div>
                                    <div class='tab-pane' id='step4'>
                                        <div class="col-xs-12">
                                            <h3 class="lighter block blue">打断库列表</h3>
                                            <button class="btn btn-primary" style="margin: 5px;"
                                                    onclick="InterruptDetail.create()">新增
                                            </button>

                                            <button class="btn btn-primary" style="margin: 5px;"
                                                    onclick="InterruptDetail.createw()">万能话术
                                            </button>
                                            <table id="grid-table-2"></table>

                                            <div id="grid-pager-2"></div>
                                        </div>
                                    </div>
                                    <div class='tab-pane' id='step5'>
                                    <#include "/templates/ai/regulation/model.ftl">
                                    </div>
                                    <div class='tab-pane' id='step6'>
                                        <div class="row" style="margin-left:-2%;margin-top: 2%;">
                                            <div class="ibox ">
                                            <#include "/templates/ai/regulation/reguconfig.ftl">
                                            </div>
                                        </div>
                                    </div>

                                    <div class='tab-pane' id='step7'>
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
                                    <div class='tab-pane' id='step8'>
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
<script src="/static/js/plugins/nouslider/nouislider.min.js"></script>
<script src="/static/modular/ai/regulation/stateinfo.js"></script>
<script src="/static/modular/ai/regulation/eventinfo.js"></script>
<script src="/static/modular/ai/regulation/interruptdetail.js"></script>
<script src="/static/js/plugins/dualListbox/jquery.bootstrap-duallistbox.js"></script>
<script src="/static/modular/ai/regulation/corpus.js"></script>
<script src="/static/modular/ai/regulation/model.js"></script>
<script src="/static/modular/ai/regulation/triggerlineset.js"></script>
<script src="/static/modular/ai/regulation/reguconfig_data.js"></script>
<script src="/static/modular/ai/regulation/reguconfig.js"></script>
<script src="/static/modular/ai/regulation/voice.js"></script>
<script src="/static/modular/ai/regulation/robotvoice.js"></script>
<script src="/static/modular/ai/regulation/wizard.js"></script>

</body>
</html>
