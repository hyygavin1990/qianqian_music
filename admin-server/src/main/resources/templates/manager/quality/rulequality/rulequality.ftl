<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/dualListbox/bootstrap-duallistbox.min.css" rel="stylesheet">
    <link href="/static/css/plugins/chosen/bootstrap-chosen.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.min.css" />
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>规则录音质检管理</h2>
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
                                    <input value=${params} type="hidden" id="params">
                                    <input id="timeParam" type="hidden" value="" />
                                    <div class="form-group">
                                        <label>企业：</label>
                                        <select id="companyId" class="form-control" onchange="RuleQuality.changeCompany();" style="width: 150px;">
                                            <#--<#if (companies?size>1)>-->
                                                <#--<option value="">不限</option>-->
                                            <#--</#if>-->
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
                                        <select id="projectId" class="form-control" onchange="RuleQuality.changeProject();" style="width: 150px;">
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>批次名：</label>
                                        <#--<select id="batchId" class="form-control" style="width: 150px;">-->
                                            <#--<option value="">不限</option>-->
                                        <#--</select>-->
                                        <input type="text"  placeholder="" id="batchname" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>状态：</label>
                                        <select id="state" class="form-control" style="width: 150px;" onchange="RuleQuality.changeState();"  >
                                            <option value="">不限</option>
                                            <option value="13" >bot判为成功</option>
                                            <option value="12">bot判为失败</option>
                                            <option value="14" selected >坐席判为成功</option>
                                            <option value="15">坐席判为失败</option>
                                            <option value="16">需回访</option>
                                            <option value="10">结束未提交</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>手机号：</label>
                                        <input type="text"  placeholder="客户手机号" id="phone" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>拨打时间：</label>
                                        <input type="text" class="form-control" id="date" style="width: 150px;">
                                    </div>
                                    <#--<div class="form-group" id="stateverify">-->
                                        <#--<label>审核状态：</label>-->
                                        <#--<select id="verifystate" class="form-control" style="width: 150px;"   >-->
                                            <#--<option value="">未审核</option>-->
                                            <#--<option value="0" >审核不合格</option>-->
                                            <#--<option value="1" >审核合格</option>-->
                                        <#--</select>-->
                                    <#--</div>-->
                                    <div class="form-group">
                                        <label>问题筛选：</label>
                                        <select id="questionType" class="form-control" style="width: 150px;" >
                                            <option value="">不限</option>
                                            <#list questionTypes as questionType>
                                                <option value="${questionType.id}">${questionType.name}</option>
                                            </#list>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>失败问题筛选：</label>
                                        <select id="failQuestion" class="form-control" style="width: 150px;" >
                                            <option value="">不限</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>录音时长：</label>
                                        <input type="text"  placeholder="秒数" id="thirty" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>筛选规则：</label>
                                        <select id="rule" class="form-control" style="width: 150px;"  onchange="RuleQuality.changeRule();" >
                                            <option value="">不限</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>筛选录音：</label>
                                        <select id="voice" class="form-control" style="width: 150px;" >
                                            <option value="">不限</option>
                                        </select>
                                    </div>
                                    <button class="btn btn-success"  id="search" type="button" onclick="RuleQuality.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="RuleQuality.resetSearch()">重置</button>
                                    <button class="control-auth btn btn-success" data-auth="rulequality_download" id="download" type="button" onclick="RuleQuality.download()">导出</button>

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
<#include "/templates/layout/commonjs.ftl">
</div>
<script src="/static/js/plugins/chosen/chosen.jquery.js"></script>
<script src="/static/modular/manager/quality/rulequality/rulequality.js"></script>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>
</body>
</html>
