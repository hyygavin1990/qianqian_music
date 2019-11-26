<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/dualListbox/bootstrap-duallistbox.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.min.css" />
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
                <h2>失败问题管理</h2>
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
                                    <input type="text"  placeholder="问题名" id="failQuestionName" class="form-control">
                                    <button class="btn btn-success"  id="search" type="button" onclick="Failquestion.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="Failquestion.resetSearch()">重置</button>
                                    <button class="control-auth btn btn-primary" data-auth="failquestion_manager_insert" onclick="Failquestion.create();">新增</button>
                                    <button class="control-auth btn btn-info" data-auth="failquestion_manager_update" onclick="Failquestion.edit();">编辑</button>
                                    <button class="control-auth btn btn-danger" data-auth="failquestion_manager_delete" onclick="Failquestion.delete();">删除</button>
                                </div>
                            </div>
                            <div class="jqGrid_wrapper">
                            <#--jqgrid 表格栏-->
                                <table id="grid-table"></table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <#--新增弹框-->
        <div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="modalTitle">新增失败问题</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" id="create-form">
                            <div class="form-group">
                                <label class="col-sm-4 control-label">问题名</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" name="name">
                                </div>
                            </div>
                        </form>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-primary" onclick="Failquestion.insert()">确定</button>
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
                        <h4 class="modal-title" id="modalTitle">编辑失败问题</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" id="edit-form">
                            <input type="hidden" id="id" name="id">
                            <div class="form-group">
                                <label class="col-sm-4 control-label">问题名</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" name="name">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-primary" onclick="Failquestion.update()">确定</button>
                        <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    <#include "/templates/layout/footer.ftl">
    </div>
<#include "/templates/layout/commonjs.ftl">
</div>
<script src="/static/modular/manager/failQuestion/failquestion.js"></script>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>
</body>
</html>
