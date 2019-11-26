<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/jsTree/style.min.css" rel="stylesheet">

</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>通话问题统计</h2>
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
                                        <label>企业：</label>
                                        <select id="companyId" class="form-control" onchange="Questiontype.changeCompany();" style="width: 150px;">
                                            <#if (companies?size>1)>
                                                <option value="">不限</option>
                                            </#if>
                                            <#list companies as company>
                                                <#if company_index == 0>
                                                    <option value="${company.id}" selected="selected">${company.name}</option>
                                                <#else >
                                                    <option value="${company.id}">${company.name}</option>
                                                </#if>
                                            </#list>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>项目：</label>
                                        <select id="projectId" class="form-control"  style="width: 150px;">
                                            <option value="">不限</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>拨打时间：</label>
                                        <input type="text" class="form-control" id="date" style="width: 150px;">
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="Questiontype.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="Questiontype.resetSearch()">重置</button>
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


</div>

<#include "/templates/layout/commonjs.ftl">
<script src="/static/js/plugins/jsTree/jstree.min.js"></script>
<script src="/static/modular/manager/question_type/questiontype.js"></script>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>

</body>
</html>
