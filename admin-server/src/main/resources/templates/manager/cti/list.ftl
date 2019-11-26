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
                <h2>cti管理</h2>
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
                                        <label for="username" class="sr-only">Cti管理</label>
                                        <input type="text"  placeholder="ip" id="ip" class="form-control">
                                    </div>
                                    <div class="form-group" style="margin-left: 5px">
                                        <label>状态：</label>
                                        <select id="state" class="form-control" style="">
                                            <option value="" >全部</option>
                                            <option value="1" selected>上线</option>
                                            <option value="0">下线</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="Cti.search()" style="margin-left: 5px">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="Cti.resetSearch()">重置</button>
                                    <button class="control-auth btn btn-primary" data-auth="cti_create" type="button" onclick="Cti.create()">新增</button>
                                    <button class="control-auth btn btn-primary" data-auth="ext_logins" style="background-color:#9370DB" type="button" onclick="Cti.ctiLoginAll()">上线所有CTI</button>
                                    <button class="control-auth btn btn-primary" data-auth="ext_logouts" type="button" onclick="Cti.ctiLogoutAll()">下线所有CTI</button>
                                    <button class="control-auth btn btn-primary" data-auth="ext_setConcurrent" style="background-color:#009ceb"  type="button" onclick="Cti.setConcurrent()">一键设置并发</button>
                                    <div style="float: right;">
                                        分机状态统计：通话中（<span name="busy"></span>）;&nbsp;空闲（<span name="free"></span>）;&nbsp;离线（<span name="off_line"></span>）
                                    </div>
                                </div>
                            </div>
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
                        <label class="col-sm-3 control-label">终端服务器ip</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="terminalIp">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">最大并发</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="maxline">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Cti.insert()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--设置并发弹框-->
<div class="modal fade" id="setModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">一键设置并发</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="set-form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">最大并发</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="maxline">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Cti.setUpdate()">确定</button>
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
                        <label class="col-sm-3 control-label">终端服务器ip</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="terminalIp">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">最大并发</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="maxline">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Cti.update()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script src="/static/modular/manager/cti/cti.js"></script>

</body>
</html>
