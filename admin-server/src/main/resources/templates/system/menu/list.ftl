<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">

    <link href="/static/css/plugins/jquery-treegrid/css/jquery.treegrid.css" rel="stylesheet">
    <link href="/static/css/plugins/jsTree/style.min.css" rel="stylesheet">
    <style>
        .tree-panel {
            position: absolute;
            z-index: 999;
            display: none;
            border: 1px solid #e5e6e7;
            left: 15px;
            top: 32px;
            overflow-y: auto;
            background-color: #fafbfc;
            margin-top: 2px;
        }

        .tree-input {
            background-color: #ffffff !important;
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
                <h2>菜单管理</h2>
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

                            <div class="bar operate-bar">
                                <button class="btn btn-sm btn-primary" onclick="Menu.create()">新增</button>
                            </div>

                            <div class="bar table-bar">
                                <table id="menuTable"></table>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    <#include "/templates/layout/footer.ftl">
    </div>
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
                        <label class="col-sm-3 control-label">菜单名称</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">url</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="url">
                            <span class="help-block m-b-none">注：如果是一级菜单，url填#</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">code</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="code">
                            <span class="help-block m-b-none">注：code必须唯一</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">父菜单</label>
                        <div class="col-sm-9">
                            <input type="text" id="create-menu-input" class="tree-input form-control" readonly="readonly" name="pcode" data-code="">
                            <span class="help-block m-b-none">注：如果是一级菜单就不选</span>
                            <div id="create-menu-panel" class="tree-panel">

                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">图标</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="icon">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">是否是菜单</label>
                        <div class="col-sm-9">
                            <select name="type" class="form-control">
                                <option value="1">是</option>
                                <option value="0">不是</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">排序</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="sequence">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">启用</label>
                        <div class="col-sm-9">
                            <input type="checkbox" name="enabled" class="js-switch" checked />
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Menu.insert()">确定</button>
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
                <h4 class="modal-title" id="modalTitle">编辑</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="edit-form">
                    <input type="hidden" id="id" name="id">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">菜单名称</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">url</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="url">
                            <span class="help-block m-b-none">注：如果是一级菜单，url填#</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">code</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="code">
                            <span class="help-block m-b-none">注：code必须唯一</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">父菜单</label>
                        <div class="col-sm-9">
                            <input type="text" id="edit-menu-input" class="tree-input form-control" readonly="readonly" name="pcode" data-code="">
                            <span class="help-block m-b-none">注：如果是一级菜单就不选</span>
                            <div id="edit-menu-panel" class="tree-panel">

                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">图标</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="icon">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">是否是菜单</label>
                        <div class="col-sm-9">
                            <select name="type" class="form-control">
                                <option value="1">是</option>
                                <option value="0">不是</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">排序</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="sequence">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">启用</label>
                        <div class="col-sm-9">
                            <input type="checkbox" name="enabled" class="js-switch" checked />
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Menu.update()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#include "/templates/layout/commonjs.ftl">
<#--这是treegrid用到的js-->
<script src="/static/js/plugins/jquery-treegrid/js/jquery.treegrid.min.js"></script>
<script src="/static/js/plugins/jquery-treegrid/js/jquery.treegrid.bootstrap3.js"></script>
<script src="/static/js/plugins/jquery-treegrid/extension/jquery.treegrid.extension.js"></script>
<script src="/static/js/plugins/jquery-treegrid/tree-table-object.js"></script>
<#--jstree-->
<script src="/static/js/plugins/jsTree/jstree.min.js"></script>
<script src="/static/modular/system/menu/menu.js"></script>

</body>
</html>
