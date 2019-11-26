<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
    <style>
        .toHourChart {
            cursor: pointer;
            color: #1f3bff;
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
                <h2>外呼统计</h2>
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
                            <div class="form-inline">
                                <div class="form-group">
                                    <label>企业：</label>
                                    <select id="companyId" class="form-control" onchange="Call.changeCompany();" style="width: 150px;">
                                            <#list companies as company>
                                                <option value="${company.id}">${company.name}</option>
                                            </#list>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>项目：</label>
                                    <select id="projectId" class="form-control" onchange="Call.changeProject();" style="width: 150px;">

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
                                <button class="btn btn-success"  id="search" type="button" onclick="Call.search()">搜索</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">
                        <div class="ibox-content">
                            <div class="jqGrid_wrapper">
                            <#--jqgrid 表格栏-->
                                <table id="grid-table"></table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">
                        <div class="ibox-content">
                            <div id="chart" style="width: 100%;height: 450px;">

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
<#--弹框-->
<div class="modal fade" id="dayChartModal" tabindex="-1"  role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">每日数据</h4>
            </div>
            <div class="modal-body">
                <div id="dayChart" style="width:500px;height:300px;"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script src="/static/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script src="/static/js/plugins/datapicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="/static/js/plugins/echarts/echarts.min.js"></script>
<script src="/static/modular/manager/statistics/call/call.js"></script>

</body>
</html>
