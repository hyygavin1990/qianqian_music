<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/chosen/bootstrap-chosen.css" rel="stylesheet">
    <link href="/static/css/style.css" rel="stylesheet">
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>用户管理</h2>
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
                                        <select id="roleId" class="form-control" style="width: 150px;">
                                            <option value="" selected="selected">--选择角色--</option>
                                            <#list roles as role>
                                                <option value="${role.id}">${role.name}</option>
                                            </#list>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="username" class="sr-only">用户名</label>
                                        <input type="text" placeholder="用户名" id="username" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="nickname" class="sr-only">昵称</label>
                                        <input type="text" placeholder="昵称" id="nickname" class="form-control">
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="User.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="User.resetSearch()">重置
                                    </button>
                                    <button class="control-auth btn btn-primary" data-auth="user_create"
                                            onclick="User.create()">新增
                                    </button>
                                    <#--<select class="chosen-select"  tabindex="2">-->
                                        <#--<option value="">Select</option>-->
                                        <#--<option value="United States">United States</option>-->
                                        <#--<option value="United Kingdom">United Kingdom</option>-->
                                        <#--<option value="Afghanistan">Afghanistan</option>-->
                                        <#--<option value="Aland Islands">Aland Islands</option>-->
                                        <#--<option value="Albania">Albania</option>-->
                                    <#--</select>-->
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
<div class="modal fade" id="createModal" tabindex="-1"  role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">新增用户</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="create-form">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">用户名</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="username">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">昵称</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="nickname">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">手机号</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="phone">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="User.insert()">确定</button>
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
                        <label class="col-sm-2 control-label">用户名</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="username">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">昵称</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="nickname">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">手机号</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="phone">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="User.update()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--分配角色弹框-->
<div class="modal fade" id="allocateRoleModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">分配角色</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="">
                    <input type="hidden" id="userId" name="userId">
                    <div class="form-group">
                        <label class="col-sm-2 control-label"></label>
                        <div class="col-sm-10">
                            <div id="role_container">
                            </div>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="User.saveRoles()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--分配项目弹框-->
<div class="modal fade" id="allocateProjectModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" >分配项目</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="projectForm">
                    <input type="hidden" name="userId">
                    <div class="form-group">
                        <select class="form-control dual_select" name="projectIds" multiple></select>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="User.saveProjects()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--分配坐席组弹框-->
<div class="modal fade" id="allocateGroupModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" >分配分组</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="groupForm">
                    <input type="hidden" name="userId">
                    <div class="form-group">
                        <select class="form-control dual_select" name="groupIds" multiple></select>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="User.saveGroups()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#include "/templates/layout/commonjs.ftl">
<script src="/static/js/plugins/dualListbox/jquery.bootstrap-duallistbox.js"></script>
<script src="/static/modular/system/user/user.js"></script>
<script src="/static/js/plugins/chosen/chosen.jquery.js"></script>

</body>
</html>
