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
                <h2>线路分组管理</h2>
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
                                    <div class="form-group">
                                        <label for="username" class="sr-only">线路名称</label>
                                        <input type="text"  placeholder="线路名称" id="name" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="username" class="sr-only">绑定CTI</label>
                                        <select id="ctiip" class="form-control">
                                            <option value="">请选择CTI</option>
                                            <#if citList??>
                                                <#list citList as cti>
                                                    <option value="${cti}">${cti}</option>
                                                </#list>
                                            </#if>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="username" class="sr-only">线路组状态</label>
                                        <select id="status" class="form-control">
                                            <option value="0" selected>启用</option>
                                            <option value="1">停用</option>
                                        </select>
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="CallerGroup.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="CallerGroup.resetSearch()">重置</button>
                                    <button class=" btn btn-success" data-auth="callerGroup_create" onclick="CallerGroup.create()">新增</button>
                                </div>
                            </div>
                            <#--<div class="bar operate-bar">
                                <button class="control-auth btn btn-sm btn-primary" data-auth="callerConfig_create" onclick="CallerGroup.create()">新增</button>
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
                        <label class="col-sm-3 control-label">线路名称</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control create-input" name="name" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">消息队列</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control create-input" name="queue" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label ">最大线路数</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control create-input" name="maxline">
                        </div>
                    </div>



                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="CallerGroup.insert()">确定</button>
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
                        <label class="col-sm-3 control-label">线路名称</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">消息队列</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="queue" readonly="readonly">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">最大线路数</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="maxline">
                        </div>
                    </div>

                <#--<div class="form-group">
                    <label class="col-sm-3 control-label">当前使用线路数</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" name="currentinuse">
                    </div>
                </div>-->
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="CallerGroup.update()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script src="/static/js/plugins/ladda/spin.min.js"></script>
<script src="/static/js/plugins/ladda/ladda.min.js"></script>
<script src="/static/js/plugins/ladda/ladda.jquery.min.js"></script>
<script src="/static/modular/manager/caller_group/caller_group.js"></script>

</body>
</html>
