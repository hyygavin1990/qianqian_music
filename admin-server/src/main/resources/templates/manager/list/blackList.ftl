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
                <h2>黑名单管理</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="/main">首页</a>
                    </li>
                    <li class="active">
                        <strong>黑名单</strong>
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
                                        <label>手机号：</label>
                                        <input id="phone" class="form-control" style="">
                                        </input>
                                    </div>
                                    <#--<div class="form-group">-->
                                        <#--<label>类别：</label>-->
                                        <#--<select id="type" class="form-control" style="">-->
                                            <#--<option value="">不限</option>-->
                                            <#--<option value="0">非常反感</option>-->
                                            <#--<option value="1">反感</option>-->
                                            <#--<option value="2">不配合</option>-->
                                            <#--<option value="3">已经拨打有意向</option>-->
                                        <#--</select>-->
                                    <#--</div>-->
                                    <#--<div class="form-group">-->
                                        <#--<label>规则分组：</label>-->
                                        <#--<select id="cid" class="form-control" style="">-->
                                            <#--<option value="">不限</option>-->
                                            <#--<#list categorys as category>-->
                                                <#--<option value="${category.id}">${category.name}</option>-->
                                            <#--</#list>-->
                                        <#--</select>-->
                                    <#--</div>-->
                                    <button class="btn btn-success" type="button" onclick="BlackList.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="BlackList.resetSearch()">重置</button>
                                    <button class="control-auth btn btn-primary"  data-auth="blackList_insert" type="button" onclick="BlackList.create()">新增</button>
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
    <#--新增弹框-->
    <div class="modal fade" id="createModal" tabindex="-1"  role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="modalTitle">新增手机号</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" id="create-form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">手机号</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="phone">
                            </div>
                        </div>
                        <#--<div class="form-group">-->
                            <#--<label class="col-sm-2 control-label">类型</label>-->
                            <#--<div class="col-sm-10">-->
                                <#--<select name="type" class="form-control" style="">-->
                                    <#--<option value="0">非常反感</option>-->
                                    <#--<option value="1">反感</option>-->
                                    <#--<option value="2">不配合</option>-->
                                    <#--<option value="3">已经拨打有意向</option>-->
                                <#--</select>-->
                            <#--</div>-->
                        <#--</div>-->
                        <#--<div class="form-group">-->
                            <#--<label class="col-sm-2 control-label">规则分组</label>-->
                            <#--<div class="col-sm-10">-->
                            <#--<select name="cid" class="form-control" style="">-->
                                <#--<option value="-1">不限</option>-->
                                <#--<#list categorys as category>-->
                                    <#--<option value="${category.id}">${category.name}</option>-->
                                <#--</#list>-->
                            <#--</select>-->
                            <#--</div>-->
                        <#--</div>-->
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-primary" onclick="BlackList.insert()">确定</button>
                    <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>


<#include "/templates/layout/commonjs.ftl">
</div>

<script src="/static/modular/manager/list/blackList.js"></script>

</body>
</html>
