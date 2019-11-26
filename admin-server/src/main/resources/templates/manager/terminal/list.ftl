<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">

</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>终端管理</h2>
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
                                        <label for="username" class="sr-only">终端管理</label>
                                        <input type="text"  placeholder="ip" id="ip" class="form-control">
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="Terminal.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="Terminal.resetSearch()">重置</button>
                                    <button class="control-auth btn btn-primary" data-auth="terminal_create" onclick="Terminal.create()">新增</button>
                                </div>
                            </div>
                            <#--<div class="bar operate-bar">
                                <button class="control-auth btn btn-sm btn-primary" data-auth="terminal_create" onclick="Terminal.create()">新增</button>
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
                    <input type="hidden" id="ctiid" name="ctiid" value="${ctiid}">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">ip</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="ip">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">端口</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="port">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">接口路径</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="path">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Terminal.insert()">确定</button>
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
                    <input type="hidden" id="ctiid" name="ctiid">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">ip</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="ip">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">端口</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="port">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">接口路径</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="path">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Terminal.update()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script src="/static/modular/manager/terminal/terminal.js"></script>

</body>
</html>
