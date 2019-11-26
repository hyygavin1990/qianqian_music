<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="bar search-bar">
                <div class="form-inline">
                    <br>
                    <div class="form-group">
                        <label>企业：</label>
                        <select id="companyId" class="form-control" onchange="QualityStatistics.changeCompany();" style="width: 150px;">
                            <#if (companies?size>1)>
                            </#if>
                            <#list companies as company>
                                <option value="${company.id}">${company.name}</option>
                            </#list>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>项目：</label>
                        <select id="projectId" class="form-control" onchange="QualityStatistics.changeProject();" style="width: 150px;">
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="wrapper wrapper-content" style="height: 1000px;">
                <iframe style="width: 100%;height: 100%" "></iframe>
        </div>
    <#include "/templates/layout/footer.ftl">
    </div>
<#include "/templates/layout/commonjs.ftl">
</div>
<script src="/static/modular/manager/statistics/quality.js"></script>
<script>
</script>
</body>
</html>
