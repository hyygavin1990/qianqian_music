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
                <h2>总览</h2>
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
                    <div class="tabs-container" style="margin-bottom: 20px">
                        <ul class="nav nav-tabs">
                            <li class="active"><a data-toggle="tab" href="#tab-1">外呼费用</a></li>
                            <li class=""><a data-toggle="tab" href="#tab-2">企业流水</a></li>
                        </ul>

                        <div class="tab-content">
                            <div id="tab-1" class="tab-pane active">
                                <div class="panel-body">
                                 <#--搜索栏-->
                                    <div class="bar search-bar">
                                        <div class="form-inline">
                                            <div class="form-group">
                                                <div class="input-group date">
                                                            <span class="input-group-addon">
                                                                <i class="fa fa-calendar"></i>
                                                            </span>
                                                    <input id="month1" readonly type="text" class="form-control" value="" style="width: 140px">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="jqGrid_wrapper">
                                        <table id="grid-table1"></table>
                                    </div>

                                    <div class="hr-line-dashed"></div>

                                    <div class="jqGrid_wrapper">
                                    <#--jqgrid 表格栏-->
                                        <table id="grid-table2"></table>
                                    </div>

                                    <div class="hr-line-dashed"></div>

                                    <div id="chart" style="width: 100%; height: 400px;">

                                    </div>
                                </div>
                            </div>
                            <div id="tab-2" class="tab-pane">
                                <div class="panel-body">
                                    <#--搜索栏-->
                                    <div class="bar search-bar">
                                        <div class="form-inline">
                                            <div class="form-group">
                                                <div class="input-group date">
                                                            <span class="input-group-addon">
                                                                <i class="fa fa-calendar"></i>
                                                            </span>
                                                    <input id="month2" readonly type="text" class="form-control" value="" style="width: 140px">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="jqGrid_wrapper">
                                        <table id="grid-table3"></table>
                                    </div>

                                    <div class="hr-line-dashed"></div>
                                    <#--搜索栏-->
                                    <div class="bar search-bar">
                                        <div class="form-inline">
                                            <div class="form-group">
                                                <select id="companyId" class="form-control" onchange="Overview.refreshTable4()">
                                                    <option value="">全部</option>
                                                    <#list companies as company>
                                                        <option value="${company.id}">${company.name}</option>
                                                    </#list>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <select id="type" class="form-control" onchange="Overview.refreshTable4()">
                                                    <option value="">全部</option>
                                                    <option value="2">充值</option>
                                                    <option value="3">其他扣款</option>
                                                    <option value="4">平台补贴</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="jqGrid_wrapper">
                                    <#--jqgrid 表格栏-->
                                        <table id="grid-table4"></table>
                                    </div>
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
<#include "/templates/layout/commonjs.ftl">
<script src="/static/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script src="/static/js/plugins/datapicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="/static/js/plugins/echarts/echarts.min.js"></script>
<script src="/static/js/plugins/currencyFormatter/currencyFormatter.min.js"></script>
<script src="/static/modular/manager/account/bill/overview.js"></script>
</body>
</html>
