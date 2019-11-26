<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet">
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>绑定cti</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="/main">首页</a>
                    </li>
                    <li class="active">
                        <strong>CTI列表</strong>
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
                                    <div class="form-group">
                                        <label for="" class="sr-only">Cti管理</label>
                                        <input type="text"  placeholder="ip" id="ip" class="form-control">
                                        <input type="hidden" id="groupid" value="${groupId}"/>
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="GroupCti.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="GroupCti.resetSearch()">重置</button>
                                    <button class="control-auth btn btn-primary" data-auth="groupcti_update" type="button" onclick="GroupCti.bind()">绑定所选CTI</button>
                                </div>
                            <#--</div>-->
                            <#--<div class="bar operate-bar">
                                <button class="control-auth btn btn-sm btn-primary" data-auth="cti_create" type="button" onclick="Cti.create()">新增</button>
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
    <script src="/static/js/plugins/ladda/spin.min.js"></script>
    <script src="/static/js/plugins/ladda/ladda.min.js"></script>
    <script src="/static/js/plugins/ladda/ladda.jquery.min.js"></script>
    <script src="/static/modular/manager/caller_group/group_cti.js"></script>

</body>
</html>
