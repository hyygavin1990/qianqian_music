<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/dualListbox/bootstrap-duallistbox.min.css" rel="stylesheet">
    <link href="/static/css/plugins/chosen/bootstrap-chosen.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.min.css" />


        <style>
        .info-container {
            display: none;
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
                <h2>质检管理</h2>
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
                                        <select id="companyId" class="form-control" onchange="Quality.changeCompany();" style="width: 150px;">
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
                                        <select id="projectId" class="form-control" onchange="Quality.changeProject();" style="width: 150px;">
                                            <option value="">不限</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>坐席：</label>
                                        <select id="seat" class="form-control" style="width: 150px;" >
                                            <option value="">不限</option>
                                        </select>
                                    </div>
                                    <#--<div class="form-group">
                                        <label>坐席组：</label>
                                        <select id="staffGroupId" class="form-control" style="width: 150px;">
                                            <option value="">不限</option>
                                        <#list staffGroups as staffGroup>
                                            <option value="${staffGroup.id}">${staffGroup.name}</option>
                                        </#list>
                                        </select>
                                    </div>-->
                                    <div class="form-group">
                                        <label>应答模式：</label>
                                        <select id="projectType" class="form-control" style="width: 150px;"   >
                                            <option value="" selected>不限</option>
                                            <option value="0" >M1</option>
                                            <option value="1">M1H2</option>
                                            <option value="2">复播</option>
                                            <option value="3">纯人工</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>批次导入时间：</label>
                                        <input type="text" class="form-control" id="batchDate"  onchange="Quality.changeProject();" style="width: 120px;">
                                    </div>
                                    <div class="form-group">
                                        <label>批次名：</label>
                                        <select id="batchId" class="form-control" style="width: 150px;">
                                            <option value="">不限</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>录音时长：</label>
                                        <input type="text"  placeholder="秒数" id="thirty" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>状态：</label>
                                        <select id="state" class="form-control" style="width: 150px;"   >
                                            <option value="">不限</option>
                                            <option value="13" >成功未质检</option>
                                            <option value="12">失败</option>
                                            <option value="16">失败无拒绝</option>
                                            <option value="14" selected >已质检成功</option>
                                            <option value="15">已质检失败</option>
                                            <option value="16">需回访</option>
                                            <option value="10">通话结束</option>
                                            <option value="99">转接失败</option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label>质检员：</label>
                                        <select id="qualityUser" class="form-control" style="width: 150px;" >
                                            <option value="">不限</option>
                                            <#list qualityUsers as qualityUser>
                                                <option value="${qualityUser.id}">${qualityUser.nickname}</option>
                                            </#list>
                                        </select>
                                    </div>
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
                                        <label>手机号：</label>
                                        <input type="text"  placeholder="客户手机号" id="phone" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>拨打日期：</label>
                                        <input type="text" class="form-control" id="date" style="width: 150px;">
                                    </div>
                                    <#--<div class="form-group">
                                        <label>小时：</label>
                                        <select id="hour" class="form-control" style="width: 80px;"   >
                                            <option value="">不限</option>
                                            <option value="0" >0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                        </select>
                                    </div>-->
                                    <div class="form-group" style="display: none;">
                                        <label>挂断时状态：</label>
                                        <input type="text" class="form-control" id="endState" style="width: 150px;margin-top: 2px" placeholder="挂断状态">
                                    </div>
                                    <button class="btn btn-success"  id="search" type="button" onclick="Quality.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="Quality.resetSearch()">重置</button>
                                    <button class="control-auth btn btn-success" data-auth="quality_download" id="download" type="button" onclick="Quality.download()">导出</button>

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
<script src="/static/modular/ai/quality/quality.js"></script>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>





</body>
</html>
