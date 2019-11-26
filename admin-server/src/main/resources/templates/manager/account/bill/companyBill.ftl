<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet">
    <link href="/static/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.min.css" />
    <link href="/static/css/style.css" rel="stylesheet">
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>企业明细</h2>
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
                        <div class="ibox-content" id="ibox_content">
                            <div class="bar search-bar">
                                <div class="form-inline" >
                                    <div class="form-group">
                                        <label>企业：</label>
                                        <select id="companyId" class="form-control"  style="width: 150px;" name="companyId">
                                            <#if (companies?size>1)>
                                            </#if>
                                            <#list companies as company>
                                                <#if company.id == companyId>
                                                    <option selected value="${company.id}">${company.name}</option>
                                                <#else >
                                                    <option value="${company.id}">${company.name}</option>
                                                </#if>

                                            </#list>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>月份：</label>
                                        <input id="month" name="month" readonly type="text" class="form-control" value="${month}" style="width: 140px">
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="CompanyBill.search()">搜索</button>
                                    <ul class="nav nav-tabs" style="float: right">
                                        <li class="active"><a data-toggle="tab" href="#tab-1">外呼费用</a></li>
                                        <li class=""><a data-toggle="tab" href="#tab-2">企业流水</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="tab-content" id="tab-content">
                            <div id="tab-1" class="tab-pane active">
                                <div >
                                    <br>
                                    <div class="jqGrid_wrapper">
                                    <#--jqgrid 表格栏-->
                                        <table id="grid-table"></table>
                                    </div>
                                    <br>
                                    <div>
                                        <button class="btn btn-success" type="button" onclick="CompanyBill.exportExcel1()">导出EXCEL</button>
                                    </div>
                                    <div class="jqGrid_wrapper">
                                    <#--jqgrid 表格栏-->
                                        <table id="grid-table2"></table>
                                    </div>

                                    <br>
                                    <div>
                                        <button class="btn btn-success" type="button" onclick="CompanyBill.exportExcel2()">导出EXCEL</button>
                                    </div>
                                    <div class="jqGrid_wrapper">
                                    <#--jqgrid 表格栏-->
                                        <table id="grid-table3"></table>
                                    </div>


                                    <div class="ibox ">
                                        <div class="ibox-content">
                                            <div class="col-lg-12">
                                                <div id="chart" style="width: 100%; height: 500px;">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tab-2" class="tab-pane">
                                <div >
                                    <br>
                                    <div class="jqGrid_wrapper">
                                    <#--jqgrid 表格栏-->
                                        <table id="grid-table4"></table>
                                    </div>

                                    <br>
                                    <div class="form-inline">
                                        <div class="form-group">
                                            <label >选择类型：</label>
                                            <select id="typeId" class="form-control"  style="width: 150px;" onchange="CompanyBill.change()">
                                            <#list types as map>
                                                <option value="${map.id}">${map.name}</option>
                                            </#list>
                                            </select>
                                            <button class="btn btn-success" type="button" onclick="CompanyBill.exportExcel3()">导出EXCEL</button>
                                        </div>
                                    </div>

                                    <div class="jqGrid_wrapper">
                                    <#--jqgrid 表格栏-->
                                        <table id="grid-table5"></table>
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
<script src="/static/modular/manager/account/bill/companyBill.js"></script>
</body>
</html>
