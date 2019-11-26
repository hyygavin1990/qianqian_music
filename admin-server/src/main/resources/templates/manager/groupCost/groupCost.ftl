<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.min.css" />
    <link href="/static/css/plugins/chosen/bootstrap-chosen.css" rel="stylesheet">
    <link href="/static/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
    <link href="/static/css/style.css" rel="stylesheet">
    <style>
        #gbox_grid-table1{
            width: 100%;height: 500px;
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
                <h2>小组话费统计</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="/main">首页</a>
                    </li>
                    <li class="active">
                        <strong>统计</strong>
                    </li>
                </ol>
            </div>
        </div>
        <div class="wrapper wrapper-content">
            <div class="bar search-bar">
                <div class="form-inline">
                    <div class="form-group">
                        <label>公司：</label>
                        <select id="company" class="form-control" style="width: 150px;">
                            <option value="">请选择</option>
                            <#list companyList as company>
                              <option value="${company.id}">${company.name}</option>
                            </#list>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>项目：</label>
                        <select id="project" class="form-control" style="width: 150px;">
                            <option value="">不限</option>
                            <#--<#list projectList as project>-->
                              <#--<option value="${project.id}">${project.name}</option>-->
                            <#--</#list>-->
                        </select>
                    </div>
                    <div class="form-group" id="daySearch">
                        <label>日期：</label>
                        <input type="text" class="form-control" id="day" style="width: 150px;">
                    </div>
                    <button class="btn btn-primary btn-outline"onclick="GroupCost.search()">搜索</button>

                </div>
            </div>
            <#--//-->
            <div class="row">
            <#--表格数据开始-->
                <div class="tab-content">
                        <div >
                        <#--表一-->
                            <div class="jqGrid_wrapper1">
                            <#--jqgrid 表格栏-->
                                <table id="grid-table1"></table>
                            </div>

                            <div class="hr-line-dashed"></div>
                        <#--表二-->
                            <div class="jqGrid_wrapper3">
                            <#--jqgrid 表格栏-->
                                <table id="grid-table3" ></table>
                            </div>

                </div>
            <#--表格数据结束-->
                </div>
            </div>

        <#include "/templates/layout/footer.ftl">
    </div>
</div>
<#include "/templates/layout/commonjs.ftl">
<script src="/static/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script src="/static/js/plugins/datapicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>
    <script src="/static/js/plugins/currencyFormatter/currencyFormatter.min.js"></script>
<script src="/static/js/plugins/chosen/chosen.jquery.js"></script>
<script src="/static/modular/manager/groupCost/groupCost.js"></script>
</body>
</html>
