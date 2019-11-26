<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/dualListbox/bootstrap-duallistbox.min.css" rel="stylesheet">
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
                <h2>Leads统计</h2>
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
                                        <select id="companyId" class="form-control" style="width: 150px;">
                                        <#if (companies?size>1)>
                                        </#if>
                                        <#list companies as company>
                                            <option value="${company.id}">${company.name}</option>
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
                                        <label>坐席组：</label>
                                        <select id="staffGroupId" class="form-control" style="width: 150px;">
                                            <option value="">不限</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>坐席：</label>
                                        <select id="staffId" class="form-control" style="" >
                                            <option value="">不限</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>开始日期：</label>
                                        <input type="text" class="form-control" id="startDate" style="width: 150px;">
                                    </div>
                                    <div class="form-group">
                                        <label>结束日期：</label>
                                        <input type="text" class="form-control" id="endDate" style="width: 150px;">
                                    </div>
                                    <div class="form-group">
                                        <label>手机号：</label>
                                        <input type="text"  placeholder="手机号" id="phone" class="form-control" style="width: 150px;">
                                    </div>

                                    <div class="form-group">
                                        <label>是否复播：</label>
                                        <select id="leadsType" class="form-control" style="" >
                                            <option value="">全部</option>
                                            <option value="2">是</option>
                                            <option value="1" selected>否</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>省份：</label>
                                        <select id="province" class="form-control" style="" onchange="Leads.appendCity();" >
                                            <option value="" selected >全部</option>
                                        <#list provinceList as province>
                                            <option value="${province}">${province}</option>
                                        </#list>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>城市：</label>
                                        <select id="city" class="form-control" style="" >
                                            <option value="" selected >全部</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>标记：</label>
                                        <select id="flg" class="form-control" style="" >
                                            <option value="" >不限</option>
                                            <option value="是" selected>标记成功</option>
                                            <option value="否" >标记失败</option>
                                            <option value="需回访" >需回访</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <div id="labelDiv" style="display:none">
                                            <label>标签：</label>
                                            <select id="label" class="form-control" style="" >

                                            </select>
                                            <input type='text' class="form-control" id='labelvalue'/ >
                                        </div>
                                    </div>
                                    <button class="btn btn-success"  id="search" type="button" onclick="Leads.search()">搜索</button>
                                    <button class="control-auth btn btn-success" data-auth="leads_leadsdownload" id="leads_download" type="button">leads导出</button>
                                    <button class="control-auth btn btn-success" data-auth="leads_voicedownload"  id="voice_download" type="button" >录音批量导出</button>
                                    <button class="control-auth btn btn-success" data-auth="leads_h2voicedownload"  id="h2_voice_download" type="button" >h2录音批量导出</button>
                                    <button class="control-auth btn btn-success" data-auth="leads_h2voicedownload2"  id="h2_voice_download2" type="button" >h2录音批量处理导出</button>
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

        <div class="modal fade" id="exportModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="modalTitle">Leads导出</h4>
                    </div>
                    <div class="modal-body">
                        <div id="exportContent">

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-primary" onclick="Leads.export()">导出</button>
                        <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

    <#include "/templates/layout/footer.ftl">
    </div>

<#include "/templates/layout/commonjs.ftl">
</div>

<script src="/static/js/bootstrap-datetimepicker.min.js"></script>
<script src="/static/modular/ai/leads/leads.js"></script>

</body>
</html>
