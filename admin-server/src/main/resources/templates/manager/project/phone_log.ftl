<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>通话记录</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="/main">首页</a>
                    </li>
                    <li>
                        <a href="/company/list">企业列表</a>
                    </li>
                    <li>
                        <a href="/project/list?companyId=${companyId}">项目列表</a>
                    </li>
                    <li>
                        <a href="/project/phone_batch/list?pid=${pid}&companyId=${companyId}">号码库</a>
                    </li>
                    <li class="active">
                        <strong>通话日志</strong>
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
                            <div class="bar search-bar">
                                <div class="form-inline">
                                    <input type="text" value="${batchId}" id="batchId" style="display: none">
                                    <input type="hidden" id="pid" class="form-control" value="${pid}">
                                    <div class="form-group">
                                        <input type="text"  placeholder="手机号" id="phone" class="form-control">
                                    </div>
                                <#--<div class="form-group">-->
                                <#--<div class="input-group date">-->
                                <#--<span class="input-group-addon">-->
                                <#--<i class="fa fa-calendar"></i>-->
                                <#--</span>-->
                                <#--<input id="month" type="text" class="form-control" value="" style="width: 140px">-->
                                <#--</div>-->
                                <#--</div>-->
                                <#--<div class="form-group">-->
                                <#--<input type="text"  placeholder="起始天" id="startDay" value="" class="form-control" style="width: 50px">-->
                                <#--</div>-->
                                <#----->
                                <#--<div class="form-group">-->
                                <#--<input type="text"  placeholder="结束天" id="endDay" value="" class="form-control" style="width: 50px">-->
                                <#--</div>-->
                                    <button class="btn btn-success" type="button" onclick="PhoneLog.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="PhoneLog.resetSearch()">重置</button>
                                </div>

                            </div>
                            <div class="jqGrid_wrapper">
                            <#--jqgrid 表格栏-->
                                <table id="grid-table"></table>
                            <#--jqgrid 分页栏-->
                                <div id="grid-pager"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <#include "/templates/layout/footer.ftl">
    </div>
</div>
<div class="modal fade" id="listenModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close closeModal" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">试听录音</h4>
            </div>
            <div class="modal-body">
                <p>
                    <audio src="" controls="" id="voice" autoplay>浏览器不支持</audio>
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-default closeModal" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#include "/templates/layout/commonjs.ftl">
<script src="/static/modular/manager/project/phone_log.js"></script>
<script src="/static/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script src="/static/js/plugins/datapicker/locales/bootstrap-datepicker.zh-CN.js"></script>


</body>
</html>
