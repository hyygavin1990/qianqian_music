<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-9">
                <h2>短信统计</h2>
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
                                        <label>企业：</label>
                                        <select id="companyId" class="form-control" style="width: 150px;">
                                        <#list companies as company>
                                            <option value="${company.id}">${company.name}</option>
                                        </#list>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>项目：</label>
                                        <select id="projectId" class="form-control" style="width: 150px;">
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group date">
                                                            <span class="input-group-addon">
                                                                <i class="fa fa-calendar"></i>
                                                            </span>
                                            <input id="month" readonly type="text" class="form-control" value="" style="width: 140px">
                                        </div>
                                    </div>
                                    <button class="btn btn-success"  id="search" type="button" onclick="Sms.search()">搜索</button>
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

    <#include "/templates/layout/footer.ftl">
    </div>
</div>
<#include "/templates/layout/commonjs.ftl">
<script src="/static/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script src="/static/js/plugins/datapicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="/static/modular/manager/statistics/sms/sms.js"></script>
</body>
</html>
