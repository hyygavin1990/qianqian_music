<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
    <link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.min.css" />
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>充值审核</h2>
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
                                        <label for="username">公司：</label>
                                        <select id="companyId" class="form-control">
                                            <option value="">全部</option>
                                            <#list companyList as company>
                                                <option value="${company.id}">${company.name}</option>
                                            </#list>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="username">审核状态：</label>
                                        <select id="status" class="form-control">
                                            <option value="0">未审核</option>
                                            <option value="1">审核通过</option>
                                            <option value="2">审核失败</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>开始日期：</label>
                                        <input type="text" class="form-control" id="startTime" style="width: 150px;">
                                    </div>
                                    <div class="form-group">
                                        <label>结束日期：</label>
                                        <input type="text" class="form-control" id="endTime" style="width: 150px;">
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="AuditRecord.search()">搜索</button>
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
    <#include "/templates/layout/footer.ftl">
    </div>
<#--审核失败弹框-->
    <div class="modal fade" id="rechargeModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="modalTitle">审核失败</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" id="recharge-form">
                        <input type="hidden" name="id">
                        <div class="form-group">
                            <label class="col-sm-3 control-label" >企业名称</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="name" readonly="readonly">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">申请金额(元)</label>
                            <div class="col-sm-9" >
                                <input type="text" class="form-control" name="money" readonly="readonly">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">失败原因</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="memo" >
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-primary" onclick="AuditRecord.doRecharge()">确定</button>
                    <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>
<#include "/templates/layout/commonjs.ftl">
</div>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>
<script src="/static/modular/manager/audit_record/audit_record.js"></script>

</body>
</html>
