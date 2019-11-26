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
                <h2>该问题组绑定的问题有
                <#--<#list projects as project >
                        ${project.name}&nbsp;&nbsp;
                </#list>-->
                </h2>
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
                            <input type="text" id="groupId" value="${groupId}" style="display: none;">
                            <div class="bar operate-bar">
                                <button class="control-display btn btn-sm btn-primary" id="save">保存更改</button>
                                <button class="control-disabled btn btn-sm btn-primary" id="copyModel" onclick="Relation.copy()">复制</button>
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


    <#include "/templates/layout/footer.ftl">
    </div>

    <#--编辑弹框-->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="modalTitle">复制</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" id="edit-form">
                        <div class="form-group">
                            <label class="col-sm-3 control-label">组名称</label>
                            <div class="col-sm-8">
                                <select id="otherId" class="form-control" onchange="Overview.refreshTable4()">
                                          <option value="">请选择</option>
                                                    <#list groups as group>
                                                        <option value="${group.id}">${group.name}</option>
                                                    </#list>
                                </select>
                            </div>
                        </div>
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" id="copy" class="btn btn-sm btn-primary" onclick="Relation.copy()">确定</button>
                    <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>
<#include "/templates/layout/commonjs.ftl">
</div>

<script src="/static/modular/manager/failQuestion/group/relation.js"></script>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>



</body>
</html>
