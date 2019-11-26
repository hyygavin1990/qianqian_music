<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/jsTree/style.min.css" rel="stylesheet">
    <link href="/static/css/plugins/chosen/bootstrap-chosen.css" rel="stylesheet">

</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>问题类型质检人员工作量统计</h2>
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
                                        <select id="companyId" class="form-control"
                                                onchange="QualityPerson.changeCompany();" style="width: 150px;">
                                            <#if (companies?size>1)>
                                                <option value="">不限</option>
                                            </#if>
                                            <#list companies as company>
                                                <#if company_index == 0>
                                                    <option value="${company.id}"
                                                            selected="selected">${company.name}</option>
                                                <#else >
                                                    <option value="${company.id}">${company.name}</option>
                                                </#if>
                                            </#list>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>项目：</label>
                                        <select id="projectId" class="form-control" style="width: 150px;">
                                            <option value="">不限</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>质检员：</label>
                                        <select id="quser" class="form-control quser-select" style="width: 150px;">
                                             <#if (qualityusers?size>1)>
                                                <option value="">不限</option>
                                             </#if>
                                               <#list qualityusers as quser>
                                                   <option value="${quser.id}">${quser.nickname}</option>
                                               </#list>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>月份：</label>
                                        <input type="text" class="form-control" id="date" style="width: 150px;">
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="QualityPerson.search()">搜索
                                    </button>
                                    <button class="btn btn-success" type="button" onclick="QualityPerson.resetSearch()">
                                        重置
                                    </button>
                                    <button class="btn btn-success" type="button" onclick="QualityPerson.download()">
                                        导出Excel
                                    </button>
                                </div>
                            </div>

                            <div class="table-responsive" id="datatable" style="overflow:scroll;height: 600px">
                                <table class="table table-hover text-nowrap">
                                    <thead>
                                    <tr id="tablehead">
                                        <th>时间</th>
                                         <#list days as day>
                                             <th>${day}</th>
                                         </#list>
                                        <th>合计</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                   <#list datas as data>
                                   <tr>
                                       <#list data?keys as key>
                                       <td>${key}</td>
                                       </#list>
                                       <#list data?values as value>
                                           <#list value as userdata>
                                           <td>${userdata}</td>
                                           </#list>
                                       </#list>
                                   </tr>
                                   </#list>
                                    </tbody>
                                </table>
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
<script src="/static/modular/manager/qtype_quality_person/qtypequalityperson.js"></script>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>
<script src="/static/js/plugins/chosen/chosen.jquery.js"></script>
<script type="text/javascript">
    $('.quser-select').chosen();
</script>
</body>
</html>
