<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
    <link href="/static/css/plugins/chosen/bootstrap-chosen.css" rel="stylesheet">
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-9">
                <h2>短信模板管理</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="/main">首页</a>
                    </li>
                    <li class="active">
                        <strong>列表</strong>
                    </li>
                </ol>
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
                                        <label>项目组：</label>
                                        <select id="projectGroup" class="form-control" style="width: 135px;">
                                            <#if projectGroupList??>
                                                <#list projectGroupList as pGroup>
                                                    <#if pGroup_index==0>
                                                        <option value="${pGroup.id}" selected>${pGroup.name}</option>
                                                    <#else>
                                                        <option value="${pGroup.id}">${pGroup.name}</option>
                                                    </#if>
                                                </#list>
                                            </#if>
                                        </select>
                                    </div>
                                    <button class="btn btn-success control-auth" data-auth="smsTemplate_create" onclick="SmsTemplete.create();">增加短信模板</button>
                                </div>
                            </div>
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
        <#--添加弹框-->
        <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="modalTitle">创建模板</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" id="add-form" enctype="multipart/form-data">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">项目组：</label>
                                <div class="col-sm-9">
                                    <select id="projectGroupId" class="form-control" style="width: 135px;">
                                        <#if projectGroupList??>
                                            <#list projectGroupList as pGroup>
                                                <#if pGroup_index==0>
                                                    <option value="${pGroup.id}" selected>${pGroup.name}</option>
                                                <#else>
                                                    <option value="${pGroup.id}">${pGroup.name}</option>
                                                </#if>
                                            </#list>
                                        </#if>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">短信渠道：</label>
                                <div class="col-sm-9">
                                    <select class="my-chosen-select" data-placeholder="-请选择-" name="smschannel" id="smschannel" multiple>
                                        <#if smschannelList??>
                                            <#list smschannelList as smschannel>
                                                <option value="${smschannel.id}">${smschannel.name}</option>
                                            </#list>
                                        </#if>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">模板名称：</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">模板正文：</label>
                                <div class="col-sm-9">
                                    <textarea id="content" class="form-control" rows="5"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-primary" onclick="SmsTemplete.insert()">确定</button>
                        <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">取消</button>
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
                        <h4 class="modal-title" id="modalTitle">编辑模板</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" id="add-form" enctype="multipart/form-data">
                            <input type="hidden" id="smsTmeplateId"/>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">短信渠道：</label>
                                <div class="col-sm-9">
                                    <select class="my-chosen-select" data-placeholder="-未选择渠道-" name="smschannel2" id="smschannel2" multiple disabled>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">项目组：</label>
                                <div class="col-sm-9" style="width: 120px;overflow: hidden;">
                                    <select id="projectGroupId2" class="form-control" style="width: 135px;border: 0px;" disabled>
                                        <#if projectGroupList??>
                                            <#list projectGroupList as pGroup>
                                                <option value="${pGroup.id}">${pGroup.name}</option>
                                            </#list>
                                        </#if>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">模板名称：</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="name2">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">模板正文：</label>
                                <div class="col-sm-9">
                                    <textarea id="content2" class="form-control" rows="5"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="ok" class="btn btn-sm btn-primary" onclick="SmsTemplete.update()">确定</button>
                        <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">取消</button>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    <#include "/templates/layout/footer.ftl">
    </div>
</div>
<#include "/templates/layout/commonjs.ftl">
<script src="/static/js/plugins/chosen/chosen.jquery.js"></script>
<script src="/static/modular/manager/sms_template/smstemplate.js"></script>
</body>
</html>
