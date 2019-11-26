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
                <h2>规则通话时长分布统计</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="/main">首页</a>
                    </li>
                    <li class="active">
                        <strong>图表</strong>
                    </li>
                </ol>
            </div>
        </div>

        <div class="wrapper wrapper-content">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox">
                        <div class="ibox-content">
                            <div class="bar search-bar">
                                <div class="form-inline">
                                    <div class="form-group">
                                        <label>公司：</label>
                                        <select id="companyId" class="form-control" style="width: 150px;">
                                           <#if companyList??>
                                               <option value="" selected>请选择公司</option>
                                               <#list companyList as company>
                                                   <option value="${company.id}">${company.name}</option>
                                               </#list>
                                           </#if>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>项目：</label>
                                        <select id="projectId" class="form-control" style="width: 150px;">
                                            <option value="" selected>请选择项目</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>日期：</label>
                                        <input type="text" class="form-control" id="dateTime" style="width: 100px;">
                                    </div>
                                    <div class="form-group">
                                        <input type="text" id="startTime" value="0" class="form-control" style="width: 50px">
                                    </div>
                                    -
                                    <div class="form-group">
                                        <input type="text" id="endTime" value="24" class="form-control" style="width: 50px">
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="RuleDuration.search()">搜索</button>
                                </div>
                            </div>
                            <div id="echarts" style="width: 100%;height:700px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <#include "/templates/layout/footer.ftl">
    </div>
</div>
<#include "/templates/layout/commonjs.ftl">
<script src="/static/js/plugins/echarts/echarts.min.js"></script>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>
<script src="/static/modular/manager/ruleDuration_chart/ruleDurationChart.js"></script>
</body>
</html>
