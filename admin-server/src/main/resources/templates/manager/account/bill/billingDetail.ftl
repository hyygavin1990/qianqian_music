<!DOCTYPE html>
<html>
<head>
    <#include "/templates/layout/meta.ftl">
    <link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.min.css" />
    <link href="/static/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet">

</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">
        <input type="hidden" id="companyid" value="${companyid}">
        <input type="hidden" id="pid" value="${pid}">
        <input type="hidden" id="dateTime" value="${dateTime}">
        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>项目消费详情</h2>
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

        <div class="row wrapper border-bottom white-bg page-heading" style="background: #CCDDFF">
            <div style="text-align: left; color: black;padding-left: 20px;padding-top: 12px">
                <span style="font-size: 26px;"><span id="nowTime"></span>消费统计</span>
            </div>
        </div>
        <div class="wrapper wrapper-content">
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-3">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title">
                                    <span class="label label-success pull-right">Total Dial-out</span>
                                    <h5>总呼出量（条）</h5>
                                </div>
                                <div class="ibox-content">
                                    <h1 class="no-margins"><span id="totalnum"></span></h1>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title">
                                    <span class="label label-info pull-right">Total Connected</span>
                                    <h5>总接通数（条）</h5>
                                </div>
                                <div class="ibox-content">
                                    <h1 class="no-margins"><span id="sumainum"></span></h1>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title">
                                    <span class="label label-danger pull-right">Order</span>
                                    <h5>成单数（条）</h5>
                                </div>
                                <div class="ibox-content">
                                    <h1 class="no-margins"><span id="order"></span></h1>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title">
                                    <span class="label label-primary pull-right">Daily Cost</span>
                                    <h5>消费金额（元）</h5>
                                </div>
                                <div class="ibox-content">
                                    <h1 class="no-margins"><span id="consume"></span></h1>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="ibox ">
                                <div class="ibox-content">
                                    <div class="bar search-bar">
                                        <div class="form-inline">
                                            <div class="form-group">
                                                <select id="companyName" name="companyName" class="form-control">
                                            <#list companyList as company>
                                                    <#if company.id==companyid>
                                                        <option value="${company.id}" selected>${company.name}</option>
                                                    <#else>
                                                     <option value="${company.id}" >${company.name}</option>
                                                    </#if>
                                            </#list>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <select id="projectName" name="projectName" class="form-control">
                                                    <option value="" selected>---请选择---</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" class="form-control" id="startDate" style="width: 150px;">
                                            </div>
                                            <button class="btn btn-success" type="button" onclick="BillingDetail.search()">搜索</button>
                                            <#--<button class="btn btn-success" type="button" onclick="BillingDetail.resetSearch()">重置</button>-->
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
            </div>
        </div>
    <#include "/templates/layout/footer.ftl">
    </div>
    <#include "/templates/layout/commonjs.ftl">
</div>
<script src="/static/js/plugins/ladda/spin.min.js"></script>
<script src="/static/js/plugins/ladda/ladda.min.js"></script>
<script src="/static/js/plugins/ladda/ladda.jquery.min.js"></script>
<script src="/static/js/plugins/dualListbox/jquery.bootstrap-duallistbox.js"></script>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>
<script src="/static/modular/manager/account/bill/billingDetail.js"></script>

<script>
</script>
</body>
</html>
