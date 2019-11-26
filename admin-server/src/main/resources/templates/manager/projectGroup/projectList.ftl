<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet">
    <link href="/static/css/plugins/dropzone/basic.css" rel="stylesheet">
    <link href="/static/css/plugins/jsTree/style.min.css" rel="stylesheet">
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>绑定项目</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="/main">首页</a>
                    </li>
                    <li class="active">
                        <a href="/projectGroup/list"> <strong>项目组列表</strong></a>
                    </li>
                    <li class="active">
                        <a href="#"> <strong>列表</strong></a>
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
                                        <label for="" class="sr-only">项目管理</label>
                                        <input type="text"  placeholder="项目名称" id="name" class="form-control">
                                        <input type="hidden" id="groupid" value="${groupId}"/>
                                    </div>
                                    <button class="btn btn-success" type="button" id="searchButton" onclick="ProjectList.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="ProjectList.resetSearch()">重置</button>
                                    <button class="btn btn-success" type="button" onclick="ProjectList.permissionModal()">绑定</button>
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

        </div>
      <#include "/templates/layout/footer.ftl">
      </div>
    </div>
<#--分配权限-->
<div class="modal fade" id="permissionModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">分配项目组</h4>
            </div>
            <div class="modal-body" style="max-height: 400px; overflow-y: auto">
                <input type="hidden" id="group">
                <div id="menu_tree">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="ProjectList.savePermissions()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
    <#include "/templates/layout/commonjs.ftl">
    <script src="/static/js/plugins/jsTree/jstree.min.js"></script>
    <script src="/static/modular/manager/project_group/projectList.js"></script>
<script type="text/javascript">
</script>
</body>
</html>
