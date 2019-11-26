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
                                    <select id="companyId" class="form-control" onchange="CallDetail.changeCompany();" style="width: 150px;">
                                        <#list companies as company>
                                            <option value="${company.id}">${company.name}</option>
                                        </#list>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>项目：</label>
                                    <select id="projectId" class="form-control" onchange="CallDetail.changeProject();" style="width: 150px;">
                                    </select>
                                </div>
                                <div class="form-group">
                                    <div class="input-group date">
                                        <span class="input-group-addon">
                                            <i class="fa fa-calendar"></i>
                                        </span>
                                        <input id="day" readonly type="text" class="form-control" value="" style="width: 100px">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>线路：</label>
                                    <select id="callerid" class="form-control"   style="width: 150px;">

                                    </select>
                                </div>
                                <div class="form-group" >
                                    <label>规则：</label>
                                    <select id="rid" class="form-control"  style="width: 150px;">

                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>批次：</label>
                                    <select id="batchid" class="form-control"  style="width: 150px;">

                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>录音：</label>
                                    <select id="voiceid" class="form-control"  style="width: 150px;">

                                    </select>
                                </div>

                                    <button class="btn btn-success"  id="search" type="button" onclick="CallDetail.search()">搜索</button>
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
                            <div class="jqGrid_wrapper">
                                <#--jqgrid 表格栏-->
                                <table id="grid-table2"></table>
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
<script src="/static/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script src="/static/js/plugins/datapicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="/static/modular/manager/statistics/call_detail/call_detail.js"></script>

</body>
</html>
