<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/jsTree/style.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.min.css" />
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>充值申请</h2>
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
                                        <label for="username" >公司：</label>
                                        <select id="companyId" class="form-control"  style="width: 150px;">
                                            <option value="">不限</option>
                                        <#list companies as company>
                                            <option value="${company.id}">${company.name}</option>
                                        </#list>
                                        </select>
                                        <label for="username" >审核状态：</label>
                                        <select id="status" class="form-control" style="width: 150px;">
                                            <option value="0" selected>未审核</option>
                                            <option value="1">审核通过</option>
                                            <option value="2">审核失败</option>
                                        </select>
                                        <label for="username" >开始日期：</label>
                                        <input type="text"   id="inittime" class="form-control">
                                        <label for="username" >结束日期：</label>
                                        <input type="text"   id="inittimeEnd" class="form-control">
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="Apply.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="Apply.resetSearch()">重置</button>
                                </div>
                            </div>
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
    <#include "/templates/layout/footer.ftl">
    </div>

<#include "/templates/layout/commonjs.ftl">
</div>
<script src="/static/modular/manager/rechargeApply/apply.js"></script>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>
</body>
</html>
