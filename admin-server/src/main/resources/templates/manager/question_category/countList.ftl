<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
    <#--<link href="/static/css/plugins/jsTree/style.min.css" rel="stylesheet">-->
    <link href="/static/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.min.css" />
    <link href="/static/css/plugins/chosen/bootstrap-chosen.css" rel="stylesheet">
    <link href="/static/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
    <link href="/static/css/style.css" rel="stylesheet">
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>问题统计</h2>
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
                                        <label>公司：</label>
                                        <select id="companyId" class="form-control" onchange="QuestionCategory.changeCompany();" style="width: 100px;">
                                            <#list companys as company>
                                                <#if company_index == 0>
                                                    <option value="${company.id}" selected="selected">${company.name}</option>
                                                <#else >
                                                    <option value="${company.id}">${company.name}</option>
                                                </#if>
                                            </#list>
                                        </select>
                                    </div>
                                    <#--<div class="form-group">-->
                                        <#--<label>规则组：</label>-->
                                        <#--<select id="categoryId" class="form-control" onchange="QuestionCategory.changeCategory();" style="width: 150px;">-->
                                            <#--<#list categorys as category>-->
                                                <#--<#if category_index == 0>-->
                                                    <#--<option value="${category.id}" selected="selected">${category.name}</option>-->
                                                <#--<#else >-->
                                                    <#--<option value="${category.id}">${category.name}</option>-->
                                                <#--</#if>-->
                                            <#--</#list>-->
                                        <#--</select>-->
                                    <#--</div>-->
                                    <div class="form-group">
                                        <label>项目：</label>
                                        <select id="projectId" class="form-control" onchange="QuestionCategory.changeProject();" style="width: 100px;">

                                            <#list projects as project>
                                                <#if project_index == 0>
                                                    <option value="${project.id}" selected="selected">${project.name}</option>
                                                <#else >
                                                    <option value="${project.id}">${project.name}</option>
                                                </#if>
                                            </#list>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>规则：</label>
                                        <select id="rid" class="form-control"  style="width: 100px;">
                                                <option value="">不限</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>批次：</label>
                                        <input type="text"  placeholder="批次名" id="batchname" class="form-control">
                                    </div>
                                    <div class="form-group"  id="monthSearch">
                                        <label>月：</label>
                                        <input id="month" name="month"  type="text" class="form-control"  style="width: 140px">
                                    </div>
                                    <div class="form-group" id="daySearch">
                                        <label>日：</label>
                                        <input type="text" class="form-control" id="day" style="width: 150px;">
                                    </div>
                                    <ul class="nav nav-tabs" style="float: right">
                                        <li class="active" ><a  id="tabDay"data-toggle="tab" href="#tab-1" onclick="QuestionCategory.dayTotal()" aria-expanded="true">日</a></li>
                                        <li class="" ><a data-toggle="tab" href="#tab-2"  id ="tabMonth" onclick="QuestionCategory.monthTotal()" aria-expanded="false">月</a></li>
                                    </ul>
                                    <button class="btn btn-success" type="button" onclick="QuestionCategory.search()">搜索</button>
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
<script src="/static/modular/manager/question_categroy/question_category.js"></script>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>
<script src="/static/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script src="/static/js/plugins/datapicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="/static/js/plugins/chosen/chosen.jquery.js"></script>

</body>
</html>
