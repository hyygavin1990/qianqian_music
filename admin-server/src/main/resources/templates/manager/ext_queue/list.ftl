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
                <h2>队列管理</h2>
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
                                    <input type="hidden" id="companyId" name="companyId" value="${companyId}">
                                    <div class="form-group">
                                        <select id="companyName" class="form-control" style="" >
                                            <#if (companies?size>1)>
                                                <option value="">全部</option>
                                            </#if>
                                            <#list companies as company>
                                                <option value="${company.id}">${company.name}</option>
                                            </#list>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="username" class="sr-only">队列名称</label>
                                        <input type="text"  placeholder="队列名称" id="name" class="form-control">
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="ExtQueue.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="ExtQueue.resetSearch()">重置</button>
                                </div>
                            </div>
                            <div class="bar operate-bar">
                                <button class="btn btn-sm btn-primary" onclick="ExtQueue.create()">新增</button>
                                <button class="btn btn-sm btn-info" onclick="ExtQueue.edit()">编辑</button>
                                <button class="btn btn-sm btn-danger" onclick="ExtQueue.delete()">删除</button>
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

<#include "/templates/layout/commonjs.ftl">
</div>

<#--新增弹框-->
<div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">新增</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="create-form">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">队列名称</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">公司名称</label>
                        <div class="col-sm-10">
                            <select name="companyId" class="form-control" >
                                <#list companies as company>
                                    <option value="${company.id}">${company.name}</option>
                                </#list>
                            </select>
                        </div>
                    </div>
                    <select class="form-control dual_select" multiple name="selectExtIds">
                    </select>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="ExtQueue.insert()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--编辑弹框-->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">编辑用户</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="edit-form">
                    <input type="hidden" id="id" name="id">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">队列名称</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">公司名称</label>
                        <div class="col-sm-10">
                            <select id="companyId" name="companyId" class="form-control" >
                            <#list companies as company>
                                <option value="${company.id}">${company.name}</option>
                            </#list>
                            </select>
                        </div>
                    </div>
                    <select class="form-control dual_select" multiple name="selectExtIds">
                    </select>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="ExtQueue.update()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script src="/static/js/plugins/dualListbox/jquery.bootstrap-duallistbox.js"></script>
<script src="/static/modular/manager/ext_queue/ext_queue.js"></script>

</body>
</html>
