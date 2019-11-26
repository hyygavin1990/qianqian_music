<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/jsTree/style.min.css" rel="stylesheet">
    <style>
        .config-item {
            padding: 15px 20px;
            background: #ffffff;
            border-top: 1px solid #e7eaec;
        }
        .config-item:last-child {
            border-bottom: 1px solid #e7eaec;
        }
        .config-item:hover {
            background: #fbfbfb;
        }
        .config-title {
            display: block;
            color: inherit;
            font-size: 20px;
            font-weight: 600;
            margin-top: 5px;
            margin-bottom: 2px;
        }
        .config-title:hover,
        .config-title:focus {
            color: inherit;
        }
        .config-info,
        .config-title {
            margin-left: 20px;
        }
        .config-switcher {
            text-align: right;
            font-size: 35px;
            display: block;
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
                <h2>服务监控</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="/main">首页</a>
                    </li>
                    <li class="active">
                        <strong>列表</strong>
                    </li>
                </ol>
            </div>
            <div class="col-lg-2">

            </div>
        </div>

        <div class="wrapper wrapper-content">
            <div class="config-item" id="runtimeMonitor">
                <div class="row">
                    <div class="col-md-10">
                        <a href="#" class="config-title">
                            运行时监控
                        </a>
                        <div class="config-info">
                            监控服务器的tomcat、内存、CPU等运行情况
                        </div>
                    </div>
                    <div class="col-md-2 ">
                        <div class="config-switcher">
                            <button class="btn btn-md btn-circle btn-primary" data-toggle="modal" data-target="#runtimeModal"><i class="fa fa-edit"></i></button>
                        <#if config.runtimeMonitor.opened>
                            <input type="checkbox" class="js-switch" checked>
                        <#else>
                            <input type="checkbox" class="js-switch" >
                        </#if>
                        </div>
                    </div>
                </div>
            </div>
            <div class="config-item" id="callTimeMonitor">
                <div class="row">
                    <div class="col-md-10">
                        <a href="#" class="config-title">
                            通话时长监控
                        </a>
                        <div class="config-info">
                            当系统监测到有通话超过配置时间以上时，系统会自动关闭通话
                        </div>
                    </div>
                    <div class="col-md-2 ">
                        <div class="config-switcher">
                            <button class="btn btn-md btn-circle btn-primary" data-toggle="modal" data-target="#callTimeModal"><i class="fa fa-edit"></i></button>
                            <#if config.callTimeMonitor.opened>
                                <input type="checkbox" class="js-switch" checked>
                            <#else>
                                <input type="checkbox" class="js-switch" >
                            </#if>

                        </div>
                    </div>
                </div>
            </div>

            <div class="config-item" id="voiceMergeTask">
                <div class="row">
                    <div class="col-md-10">
                        <a href="#" class="config-title">
                            录音自动合并
                        </a>
                        <div class="config-info">
                            系统会自动转码合并给定配置的录音
                        </div>
                    </div>
                    <div class="col-md-2 ">
                        <div class="config-switcher">
                            <button class="btn btn-md btn-circle btn-primary" data-toggle="modal" data-target="#voiceMergeModal"><i class="fa fa-edit"></i></button>
                        <#if config.voiceMergeTask.opened >
                            <input type="checkbox" class="js-switch" checked>
                        <#else>
                            <input type="checkbox" class="js-switch" >
                        </#if>

                        </div>
                    </div>
                </div>
            </div>

            <div class="config-item" id="callDataMonitor">
                <div class="row">
                    <div class="col-md-10">
                        <a href="#" class="config-title">
                            呼叫质量监控
                        </a>
                        <div class="config-info">
                            监控外呼中的接通率和分机未接率
                        </div>
                    </div>
                    <div class="col-md-2 ">
                        <div class="config-switcher">
                            <button class="btn btn-md btn-circle btn-primary" data-toggle="modal" data-target="#callDataModal"><i class="fa fa-edit"></i></button>
                        <#if config.callDataMonitor.opened >
                            <input type="checkbox" class="js-switch" checked>
                        <#else>
                            <input type="checkbox" class="js-switch" >
                        </#if>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    <#include "/templates/layout/footer.ftl">
    </div>
</div>
<#--运行时监控modal-->
<div class="modal fade" id="runtimeModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">运行时监控</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="runtimeForm">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">CPU阈值(%)</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="cpuLimit" value="${config.runtimeMonitor.cpuLimit}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label">内存阈值(%)</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="memoryLimit" value="${config.runtimeMonitor.memoryLimit}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label">磁盘阈值(%)</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="diskLimit" value="${config.runtimeMonitor.diskLimit}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label">预警短信</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="warningPhone" value="${config.runtimeMonitor.warningPhone}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label">运行间隔(秒)</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="interval" value="${config.runtimeMonitor.interval}">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Task.saveRunTimeMonitorConfig()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--通话时长监控modal-->
<div class="modal fade" id="callTimeModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">通话时长监控</h4>
            </div>
            <div class="modal-body">
                <div class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">最大通话时间（秒）</label>
                        <div class="col-sm-6">
                            <input type="text" id="maxTime" class="form-control" name="maxTime" value="${config.callTimeMonitor.maxTime}">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Task.saveCallTimeMonitorMaxTime()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--录音自动合并modal-->
<div class="modal fade" id="voiceMergeModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">录音自动合并</h4>
            </div>
            <div class="modal-body">
                <div class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">最短录音时间（s）</label>
                        <div class="col-sm-6">
                            <input type="text" id="minTime" class="form-control" name="minTime" value="${config.voiceMergeTask.minTime}">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Task.saveVoiceMergeTaskMinTime()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--呼叫质量监控modal-->
<div class="modal fade" id="callDataModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">呼叫质量监控</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal"  id="callDataForm">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">接通率阈值(%)</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="successRate" value="${config.callDataMonitor.successRate}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label">分机未接率阈值(%)</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="extNoAnswerRate" value="${config.callDataMonitor.extNoAnswerRate}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label">抓取过去n(s)数据</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="timePeriod" value="${config.callDataMonitor.timePeriod}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label">预警短信</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="warningPhone" value="${config.callDataMonitor.warningPhone}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label">运行间隔(秒)</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" name="interval" value="${config.callDataMonitor.interval}">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Task.saveCallDataMonitorConfig()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#include "/templates/layout/commonjs.ftl">
<script src="/static/modular/manager/cti_monitor/task/task.js"></script>

</body>
</html>
