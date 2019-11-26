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
                <h2>预警提醒日志</h2>
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
        <div class="bar search-bar">
            <div class="form-inline">
                <div class="form-group">
                    <label>类型：</label>
                    <select id="type" name="type" class="form-control" onchange="WarningLog.changeType()">
                        <option value="" selected>不限</option>
                        <option value="1" >企业</option>
                        <option value="2" >项目</option>
                        <option value="3" >线路</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>相关选项：</label>
                    <select id="outid" name="outid" class="form-control">
                        <option value="" selected>不限</option>
                    </select>
                </div>
                <button class="btn btn-success" type="button" onclick="WarningLog.search()">搜索</button>
                <button class="btn btn-success" type="button" onclick="WarningLog.resetSearch()">重置</button>
            </div>
        </div>
        <div class="wrapper wrapper-content">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">
                        <div class="ibox-content">
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
<#include "/templates/layout/commonjs.ftl">
<script src="/static/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script src="/static/js/plugins/datapicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="/static/modular/manager/warning_log/warning_log.js"></script>


</body>
</html>
