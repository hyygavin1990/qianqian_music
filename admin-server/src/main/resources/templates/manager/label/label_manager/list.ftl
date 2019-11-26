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
                <h2>标签管理</h2>
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
                                    <input type="text"  placeholder="标签名" id="labelName" class="form-control">
                                    <input type="text"  placeholder="英文名" id="englishName" class="form-control">
                                    <button class="btn btn-success"  id="search" type="button" onclick="Label.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="Label.resetSearch()">重置</button>
                                    <button class="control-auth btn btn-primary" data-auth="label_manager_insert" onclick="Label.create();">新增</button>
                                    <button class="control-auth btn btn-info" data-auth="label_manager_update" onclick="Label.edit();">编辑</button>
                                    <button class="control-auth btn btn-danger" data-auth="label_manager_delete" onclick="Label.delete();">删除</button>
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
                        <h4 class="modal-title" id="modalTitle">新增标签</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" id="create-form">
                            <div class="form-group">
                                <label class="col-sm-4 control-label">标签名</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" name="name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">英文名（表字段）</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" name="englishName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">填写形式</label>
                                <div class="col-sm-8">
                                    <input name="type" type="checkbox" value="0">单选框 <input name="type" type="checkbox" value="1">复选框 <input name="type" type="checkbox" value="2">文本框<input name="type" type="checkbox" value="3">日期选择<input name="type" type="checkbox" value="4">二级联动下拉框
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">填写内容</label>
                                <div class="col-sm-8">
                                    <input class="form-control" name="content" type="text"  />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">备注</label>
                                <div class="col-sm-8">
                                    <input  class="form-control" name="memo" type="text"   />
                                </div>
                            </div>
                        </form>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-primary" onclick="Label.insert()">确定</button>
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
                        <h4 class="modal-title" id="modalTitle">编辑标签</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" id="edit-form">
                            <input type="hidden" id="id" name="id">
                            <div class="form-group">
                                <label class="col-sm-4 control-label">标签名</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" name="name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">英文名（表字段）</label>
                                <div class="col-sm-8">
                                    <input type="text"  readonly class="form-control" name="englishName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">填写形式</label>
                                <div class="col-sm-8">
                                    <input name="type" type="checkbox" value="0">单选框 <input name="type" type="checkbox" value="1">复选框 <input name="type" type="checkbox" value="2">文本框<input name="type" type="checkbox" value="3">日期选择<input name="type" type="checkbox" value="4">二级联动下拉框
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">填写内容</label>
                                <div class="col-sm-8">
                                    <input class="form-control" name="content" type="text"  />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">备注</label>
                                <div class="col-sm-8">
                                    <input class="form-control" name="memo" type="text"   />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-primary" onclick="Label.update()">确定</button>
                        <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    <#include "/templates/layout/footer.ftl">
    </div>
<#include "/templates/layout/commonjs.ftl">
</div>
<script src="/static/modular/manager/label/label_manager/label.js"></script>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>
</body>
</html>
