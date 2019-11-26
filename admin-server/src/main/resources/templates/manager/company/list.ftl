<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/jsTree/style.min.css" rel="stylesheet">
    <link href="/static/css/plugins/dropzone/basic.css" rel="stylesheet">
    <link href="/static/css/plugins/chosen/bootstrap-chosen.css" rel="stylesheet">
    <style>
        .week-box {
            padding: 7px 0 0 0;
        }
        .p-l-none {
            padding-left: 0;
        }
        .plus-btn {
            padding-top: 9px;
            font-size: 18px;
            cursor: pointer;
        }
        .minus-btn {
            padding-top: 9px;
            font-size: 18px;
            cursor: pointer;
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
                <h2>企业管理</h2>
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
                                        <select id="stateSelector" class="form-control" style="width: 150px;">
                                            <option value="">所有</option>
                                            <option value="0">下线</option>
                                            <option value="1">上线</option>
                                        </select>
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="Company.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="Company.resetSearch()">重置</button>
                                    <button class="control-auth btn btn-primary" data-auth="company_create" onclick="Company.create()">新增</button>
                                    <div style="float: right;">
                                        分机数量统计：合计（<span name="enable"></span>）;&nbsp;&nbsp;已使用（<span name="used"></span>）;&nbsp;&nbsp;正在用（<span name="using"></span>）
                                    </div>
                                </div>
                            </div>
                           <#-- <div class="bar operate-bar">
                                <button class="control-auth btn btn-sm btn-primary" data-auth="company_create" onclick="Company.create()">新增</button>
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
                <h4 class="modal-title" id="modalTitle">新增</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="create-form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">企业名称</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">企业状态</label>
                        <div class="col-sm-9">
                            <select name="state" class="form-control">
                                <option value="0">下线</option>
                                <option value="1">上线</option>
                            </select>
                        </div>
                    </div>
                    <#--<div class="form-group">-->
                        <#--<label class="col-sm-3 control-label">机器人分机数</label>-->
                        <#--<div class="col-sm-9">-->
                            <#--<input type="text" class="form-control" name="botnum">-->
                        <#--</div>-->
                    <#--</div>-->
                    <#--<div class="form-group">-->
                        <#--<label class="col-sm-3 control-label">坐席分机数</label>-->
                        <#--<div class="col-sm-9">-->
                            <#--<input type="text" class="form-control" name="staffnum">-->
                        <#--</div>-->
                    <#--</div>-->
                    <#--<div class="form-group">-->
                        <#--<label class="col-sm-3 control-label">手机号保密</label>-->
                        <#--<div class="col-sm-9">-->
                            <#--<input type="checkbox"  name="hiden" class="js-switch" checked />-->
                        <#--</div>-->
                    <#--</div>-->
                    <div class="form-group">
                        <label class="col-sm-3 control-label">logo上传</label>
                        <div class="col-sm-9">
                            <div class="uploadPic" title="">
                                <div class="upload pic_img">
                                    <img  class="file-pic-img" id="cpreview" name="cpreview" src="" height="170" width="400"/>
                                    <i class="icon icon_img mt30 mb10"></i>
                                    </p>
                                </div>
                                <div class="uploadPic_btn_box">
                                <#--<input type="file" name="fileUpload" />-->
                                    <input type="file"  name="fileUpload" id="cfileUpload" data-file_type="image/jpg|image/png|image/jpeg" style="display: none"  data-max_size="2024000">
                                    <div class="btn_upload uploadPicBtn uploadpic">重新上传</div><div class="btn_upload uploadPicBtn_del delpic0">删除</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Company.insert()">确定</button>
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
                <form class="form-horizontal" id="edit-form" enctype="multipart/form-data">
                    <input type="hidden" id="id" name="id">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">企业名称</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">企业状态</label>
                        <div class="col-sm-9">
                            <select name="state" class="form-control">
                                <option value="0">下线</option>
                                <option value="1">上线</option>
                            </select>
                        </div>
                    </div>
                    <#--<div class="form-group">-->
                        <#--<label class="col-sm-3 control-label">机器人分机数</label>-->
                        <#--<div class="col-sm-9">-->
                            <#--<input type="text" class="form-control" name="botnum">-->
                        <#--</div>-->
                    <#--</div>-->
                    <#--<div class="form-group">-->
                        <#--<label class="col-sm-3 control-label">坐席分机数</label>-->
                        <#--<div class="col-sm-9">-->
                            <#--<input type="text" class="form-control" name="staffnum">-->
                        <#--</div>-->
                    <#--</div>-->
                    <#--<div class="form-group">-->
                        <#--<label class="col-sm-3 control-label">手机号保密</label>-->
                        <#--<div class="col-sm-9">-->
                            <#--<input type="checkbox"  name="hiden" class="js-switch" checked />-->
                        <#--</div>-->
                    <#--</div>-->
                    <div class="form-group">
                        <label class="col-sm-3 control-label">logo上传</label>
                        <div class="col-sm-9">
                            <div class="uploadPic" title="">
                                <div class="upload pic_img">
                                    <img  class="file-pic-img" id="epreview" name="epreview" src="" height="170" width="400"/>
                                    <i class="icon icon_img mt30 mb10"></i>
                                    </p>
                                </div>
                                <div class="uploadPic_btn_box">
                                    <#--<input type="file" name="fileUpload" />-->
                                    <input type="file"  name="fileUpload" id="efileUpload" data-file_type="image/jpg|image/png|image/jpeg" style="display: none"  data-max_size="2024000">
                                    <div class="btn_upload uploadPicBtn uploadpic">重新上传</div><div class="btn_upload uploadPicBtn_del delpic0">删除</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Company.update()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--分配权限-->
<div class="modal fade" id="permissionModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">分配权限</h4>
            </div>
            <div class="modal-body" style="max-height: 400px; overflow-y: auto">
                <input type="hidden" id="companyId">
                <div id="menu_tree">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Company.savePermissions()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--设置管理员弹框-->
<div class="modal fade" id="adminModal" tabindex="-1"  role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">设置管理员</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="admin-form">
                    <div class="form-group">
                        <input type="hidden" id="companyId2">
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
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Company.setAdmin()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--充值弹框-->
<div class="modal fade" id="rechargeModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">企业充值</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="recharge-form">
                    <input type="hidden"  name="id">
                    <div class="form-group">
                        <label class="col-sm-3 control-label" >企业名称</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="name" readonly="readonly">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">充值类型</label>
                        <div class="col-sm-9">
                            <select name="type" class="form-control">
                                <option value="2" selected>充值</option>
                                <option value="3">其他扣款</option>
                                <option value="4">平台补贴</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">金额(元)</label>
                        <div class="col-sm-9" >
                            <input type="text" class="form-control" name="money" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">备注</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="memo" >
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Company.doRecharge()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--预警配置弹框-->
<div class="modal fade" id="editWarn" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">预警配置</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="editWarn-form">
                    <input type="hidden" id="projectId_warn" name="id">
                    <div class="form-group">
                        <div class="col-sm-12" id="editwarnDiv">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Company.updateWarn()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-sm btn-primary" id="warnreset" onclick="Company.deleteAll()">清空</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#include "/templates/layout/commonjs.ftl">
<script src="/static/js/plugins/jsTree/jstree.min.js"></script>
<script src="/static/js/plugins/chosen/chosen.jquery.js"></script>
<script src="/static/modular/manager/company/company.js"></script>
<script type="text/javascript">
</script>
</body>
</html>
