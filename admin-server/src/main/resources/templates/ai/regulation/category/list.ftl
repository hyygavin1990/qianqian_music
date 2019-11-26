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
                <h2>规则组管理</h2>
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
                                        <label for="username" class="sr-only">名称</label>
                                        <input type="text"  placeholder="名称" id="name" class="form-control">
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="Category.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="Category.resetSearch()">重置</button>
                                    <button class="control-auth btn btn-primary" data-auth="category_create" onclick="Category.create()">新增</button>
                                </div>
                            </div>
                            <#--<div class="bar operate-bar">
                                <button class="btn btn-sm btn-primary" onclick="User.allocateRoleModal()">授权</button>
                                <button class="btn btn-sm btn-info" onclick="User.edit()">编辑</button>
                                <button class="btn btn-sm btn-danger" onclick="User.delete()">删除</button>
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
</div>

<#--新增弹框-->
<div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">新增规则分类</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="create-form">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">名字</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">路由标识</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="route">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Category.insert()">确定</button>
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
                <h4 class="modal-title" id="modalTitle">编辑规则分类</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="edit-form">
                    <input type="hidden" id="id" name="id">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">名字</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">路由标识</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="route">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Category.update()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#include "/templates/layout/commonjs.ftl">
<script src="/static/modular/ai/regulation/category.js"></script>
<script type="text/javascript">


</script>
</body>
</html>
