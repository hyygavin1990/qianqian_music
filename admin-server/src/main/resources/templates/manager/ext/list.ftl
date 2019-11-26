<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/dualListbox/bootstrap-duallistbox.min.css" rel="stylesheet">
    <style>
        .info-container {
            display: none;
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
                <h2>分机管理</h2>
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
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">
                        <div class="ibox-content">
                            <div class="bar search-bar">
                                <div class="form-inline">
                                    <input id="ctiId" value="${ctiId!}" hidden>
                                    <div class="form-group">
                                        <select id="worktype" class="form-control" style="width: 150px;">
                                            <option value="1">机器人分机</option>
                                            <option value="2">坐席分机</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <select id="stateSelector" class="form-control" style="width: 150px;">
                                            <option value="">选择状态</option>
                                            <option value="0">离线</option>
                                            <option value="1">空闲</option>
                                            <option value="2">忙碌</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <input type="text"  placeholder="分机号" id="ext" class="form-control">
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="Ext.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="Ext.resetSearch()">重置</button>
                                    <button class="control-auth btn btn btn-primary" data-auth="ext_logins" onclick="Ext.loginBatch()">批量上线</button>
                                    <button class="control-auth btn btn btn-warning" data-auth="ext_logouts"  onclick="Ext.logoutBatch()">批量下线</button>
                                    <div style="float: right;">
                                        分机状态统计：通话中（<span name="busy"></span>）;&nbsp;空闲（<span name="free"></span>）;&nbsp;离线（<span name="off_line"></span>）
                                    </div>
                                </div>
                            </div>
                            <#--<div class="bar operate-bar">
                                    <button class="control-auth btn btn btn-sm btn-primary" data-auth="ext_logins" onclick="Ext.loginBatch()">批量上线</button>
                                    <button class="control-auth btn btn btn-sm btn-warning" data-auth="ext_logouts"  onclick="Ext.logoutBatch()">批量下线</button>
                            </div>-->
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

<#include "/templates/layout/commonjs.ftl">
</div>

<script src="/static/modular/manager/ext/ext.js"></script>

</body>
</html>
