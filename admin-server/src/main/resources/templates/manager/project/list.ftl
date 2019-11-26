<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet">
    <link href="/static/css/plugins/chosen/bootstrap-chosen.css" rel="stylesheet">
    <style>
        .week-box {
            padding: 7px 0 0 0;
        }

        .p-l-none {
            padding-left: 0;
        }

        .plus-btn {
            padding-top: 9px;
            font-size: 18px;
            cursor: pointer;
        }

        .minus-btn {
            padding-top: 9px;
            font-size: 18px;
            cursor: pointer;
        }
        .zx-company {
            cursor: pointer;
        }
         p.zx-company.selected{
            font-weight: bold;
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
                <h2>项目管理</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="/main">首页</a>
                    </li>
                    <li>
                        <a href="/company/list">企业列表</a>
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
                                    <input type="hidden" id="companyId2" name="companyId2" value="${companyId}">
                                    <div class="form-group">
                                        <label for="username" class="sr-only">项目名称</label>
                                        <input type="text" placeholder="项目名称" id="name" class="form-control">
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="Project.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="Project.resetSearch()">重置
                                    </button>
                                    <button class="control-auth btn btn-primary" type="button"
                                            data-auth="project_create" onclick="Project.create()">新增
                                    </button>
                                    <div style="float: right;">
                                        分机数量统计：已用（<span name="over"></span>）
                                    </div>
                                </div>
                            </div>
                        <#--<div>-->
                        <#--<button id="start" class="btn btn-sm btn-warning ladda-button" type="button" onclick="Item.switchStateStart('启动')">启动</button>-->
                        <#--<button id="stop" class="btn btn-sm btn-warning ladda-button" type="button" onclick="Item.switchStateStop('暂停')">暂停</button>-->
                        <#--<button class="btn btn-sm btn-info" type="button" onclick="Item.phoneBatchList()">号码库</button>-->
                        <#--<button class="btn btn-sm btn-danger" type="button" onclick="Item.edit()">外呼配置</button>-->
                        <#--<button class="btn btn-sm btn-danger" type="button" onclick="Item.editZX()">坐席配置</button>-->
                        <#--<button class="btn btn-sm btn-warning" onclick="Item.delete()">删除</button>-->
                        <#--</div>-->
                            <br>
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

<#--新增弹框-->
<div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">新增</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="create-form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">名称</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                <#--<div class="form-group" >-->
                <#--<label class="col-sm-3 control-label" >线路选择</label>-->
                <#--<div class="col-sm-9" id="insertDiv">-->
                <#--<div class="row m-b-xs">-->
                <#--<div class="col-sm-7">-->
                <#--<select class="form-control insert-select " name="callerConfigId">-->
                <#--<#list callerConfigList as callerConfig>-->
                <#--<option value="${callerConfig.id}" >${callerConfig.name}</option>-->
                <#--</#list>-->
                <#--</select>-->
                <#--</div>-->
                <#--<div class="col-sm-4  p-l-none">-->
                <#--<input type="text" class="form-control insert-text" name="botnum"  />-->
                <#--</div>-->
                <#--<div class="col-sm-1  p-l-none">-->
                <#--<i class="fa fa-plus plus-btn"  onclick="Project.addcallerDiv2()"></i>-->
                <#--&lt;#&ndash;<button type=button class="btn btn-sm btn-primary""><i class="fa fa-plus"></i> </button>&ndash;&gt;-->
                <#--</div>-->
                <#--</div>-->

                <#--</div>-->
                <#--</div>-->
                    <div class="form-group">
                        <label class="col-sm-3 control-label">应答模式</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="addprojectType" id="addprojectType"
                                    onchange="Project.changeaddProjectType()">
                                <option value="0" selected="selected">智能模式</option>
                                <option value="1">人工模式</option>
                            </select>
                        </div>
                    </div>
                    <div id="regularAdd">
                        <div class="form-group">
                            <label class="col-sm-3 control-label">规则组</label>

                            <div class="col-sm-9">
                                <select class="form-control m-b" name="categoryId" id="categoryId"
                                        onchange="Project.changeSelect()">
                                <#list categoryList as category>
                                    <option value="${category.id}">${category.name}</option>
                                </#list>
                                </select>
                            </div>
                        </div>

                        <div class="form-group" id="regulationAdd">
                            <label class="col-sm-3 control-label">规则</label>
                            <div class="col-sm-9" id="newRegulation">
                                <div class="row m-b-xs">
                                    <div class="col-sm-7">
                                        <select class=" form-control regulationId" name="regulationId"
                                                id="regulationId">

                                        </select>
                                    </div>
                                    <div class="col-sm-4  p-l-none">
                                        <input type="text" class="form-control rweight" name="rweight"/>
                                    </div>
                                    <div class="col-sm-1  p-l-none">
                                        <i class="fa fa-plus plus-btn" onclick="Project.addRegulationDiv()"></i>
                                    <#--<button type=button class="btn btn-sm btn-primary""><i class="fa fa-plus"></i> </button>-->
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <input type="hidden" value="${companyId}" name="companyId" id="createCompanyId">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">标签组</label>
                        <div class="col-sm-9">
                            <select class="form-control m-b" name="labelGroup">
                                <#list labelGroupList as labelGroup>
                                    <option value="${labelGroup.id}">${labelGroup.name}</option>
                                </#list>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">leads目标</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="leadstarget">
                        </div>
                    </div>
                    <div class="form-group call-box">
                        <label class="col-sm-3 control-label"><input type="checkbox" name="flg" checked>定时外呼</label>
                        <div class="col-sm-9">
                            <div class="col-sm-6">
                                <label class="col-sm-8 col-sm-offset-2 control-label">上午开始时间</label>
                            </div>
                            <div class="col-sm-6">
                                <label class="col-sm-8 col-sm-offset-2 control-label">上午结束时间</label>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-sm-10 col-sm-offset-2 no-padding">
                                    <input type="number" size="3" name="amStartHour" min="0" max="23">时
                                    <input type="number" size="3" name="amStartMinute" min="0" max="59">分
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-sm-10 col-sm-offset-2 no-padding">
                                    <input type="number" size="3" name="amEndHour" min="0" max="23">时
                                    <input type="number" size="3" name="amEndMinute" min="0" max="59">分
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label class="col-sm-8 col-sm-offset-2 control-label">下午开始时间</label>
                            </div>
                            <div class="col-sm-6">
                                <label class="col-sm-8 col-sm-offset-2 control-label">下午结束时间</label>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-sm-10 col-sm-offset-2 no-padding">
                                    <input type="number" size="3" name="pmStartHour" min="0" max="23">时
                                    <input type="number" size="3" name="pmStartMinute" min="0" max="59">分
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-sm-10 col-sm-offset-2 no-padding">
                                    <input type="number" size="3" name="pmEndHour" min="0" max="23">时
                                    <input type="number" size="3" name="pmEndMinute" min="0" max="59">分
                                </div>
                            </div>
                            <div class="col-sm-12 week-box">
                                <div style="width:14%;float:left;" class="text-center">
                                    周一<br>
                                    <input type="checkbox" name="day" value="1" checked="checked">
                                </div>
                                <div style="width:14%;float:left;" class="text-center">
                                    周二<br>
                                    <input type="checkbox" name="day" value="2" checked="checked">
                                </div>
                                <div style="width:14%;float:left;" class="text-center">
                                    周三<br>
                                    <input type="checkbox" name="day" value="3" checked="checked">
                                </div>
                                <div style="width:14%;float:left;" class="text-center">
                                    周四<br>
                                    <input type="checkbox" name="day" value="4" checked="checked">
                                </div>
                                <div style="width:14%;float:left;" class="text-center">
                                    周五<br>
                                    <input type="checkbox" name="day" value="5" checked="checked">
                                </div>
                                <div style="width:14%;float:left;" class="text-center">
                                    周六<br>
                                    <input type="checkbox" name="day" value="6" checked="checked">
                                </div>
                                <div style="width:14%;float:left;" class="text-center">
                                    周日<br>
                                    <input type="checkbox" name="day" value="7" checked="checked">
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Project.insert()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--外呼配置弹框-->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">外呼配置</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="edit-form">
                    <input type="hidden" id="id" name="id">
                    <div class="form-group" hidden>
                        <label class="col-sm-2 control-label">公司名称</label>
                        <div class="col-sm-10">
                            <input type="text" value="${companyId}" name="companyId" id="editCompanyId">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">名称</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">通话限制(秒)</label>
                        <div class="col-sm-9">
                            <input type="number" class="form-control" name="maxcalltimeout">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">应答模式</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="projectType" id="projectType"
                                    onchange="Project.changeeditProjectType()">
                                <option value="0" selected="selected">智能模式</option>
                                <option value="1">人工模式</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">三网形式外呼</label>
                        <div class="col-sm-9">
                            <input type="checkbox" id="switchThree"  name="hiden" class="js-switch"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">M1H2固定并发</label>
                        <div class="col-sm-9">
                            <input type="checkbox" id="calltype"  name="hiden" class="js-switch"/>
                        </div>
                    </div>
                    <#--<div class="form-group">-->
                        <#--<label class="col-sm-3 control-label">手机号加密</label>-->
                        <#--<div class="col-sm-9">-->
                            <#--<input type="checkbox" id="phoneencrypt"  name="hiden" class="js-switch"/>-->
                        <#--</div>-->
                    <#--</div>-->
                    <div id="regularEdit">
                        <div class="form-group">
                            <label class="col-sm-3 control-label">规则组</label>
                            <div class="col-sm-9">
                                <select class="form-control m-b" name="categoryIdEdit" id="categoryIdEdit"
                                        onchange="Project.changeSelectEdit()">
                                    <#list categoryList as category>
                                        <option value="${category.id}">${category.name}</option>
                                    </#list>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" id="regulationEdit">
                            <label class="col-sm-3 control-label">规则</label>
                            <div class="col-sm-9" id="editRegulationDiv">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">标签组</label>
                        <div class="col-sm-9">
                            <select class="form-control m-b" name="labelGroup">
                                <#list labelGroupList as labelGroup>
                                    <option value="${labelGroup.id}">${labelGroup.name}</option>
                                </#list>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">失败问题组</label>
                        <div class="col-sm-9">
                            <select class="form-control m-b" name="failquestionGroup">
                                <#list failquestionGroupList as failquestionGroup>
                                    <option value="${failquestionGroup.id}">${failquestionGroup.name}</option>
                                </#list>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">leads目标</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="leadstarget">
                        </div>
                    </div>
                <#--<div class="form-group">-->
                <#--<label class="col-sm-3 control-label">队列设置</label>-->
                <#--<div class="col-sm-9">-->
                <#--<select class="form-control m-b" name="extQueueId">-->
                <#--&lt;#&ndash;<#list queueList as queue>&ndash;&gt;-->
                <#--&lt;#&ndash;<option value="${queue.id}">${queue.name}</option>&ndash;&gt;-->
                <#--&lt;#&ndash;</#list>&ndash;&gt;-->
                <#--</select>-->
                <#--</div>-->
                <#--</div>-->
                <#--<div class="form-group">-->
                <#--<label class="col-sm-3 control-label">线路并发</label>-->
                <#--<div class="col-sm-9">-->
                <#--<select class="form-control m-b" name="callPercent">-->
                <#--<option value="100">1:1</option>-->
                <#--<option value="150">1:1.5</option>-->
                <#--&lt;#&ndash;<option value="200">1:2</option>-->
                <#--<option value="250">1:2.5</option>-->
                <#--<option value="300">1:3</option>-->
                <#--<option value="350">1:3.5</option>-->
                <#--<option value="400">1:4</option>-->
                <#--<option value="450">1:4.5</option>-->
                <#--<option value="500">1:5</option>&ndash;&gt;-->
                <#--</select>-->
                <#--</div>-->
                <#--</div>-->
                    <div class="form-group call-box">
                        <label class="col-sm-3 control-label"><input type="checkbox" name="flg" checked>定时外呼</label>
                        <div class="col-sm-9">
                            <div class="col-sm-6">
                                <label class="col-sm-8 col-sm-offset-2 control-label">上午开始时间</label>
                            </div>
                            <div class="col-sm-6">
                                <label class="col-sm-8 col-sm-offset-2 control-label">下午结束时间</label>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-sm-10 col-sm-offset-2 no-padding">
                                    <input type="number" size="3" name="amStartHour" min="0" max="23">时
                                    <input type="number" size="3" name="amStartMinute" min="0" max="59">分
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-sm-10 col-sm-offset-2 no-padding">
                                    <input type="number" size="3" name="amEndHour" min="0" max="23">时
                                    <input type="number" size="3" name="amEndMinute" min="0" max="59">分
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label class="col-sm-8 col-sm-offset-2 control-label">下午开始时间</label>
                            </div>
                            <div class="col-sm-6">
                                <label class="col-sm-8 col-sm-offset-2 control-label">下午结束时间</label>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-sm-10 col-sm-offset-2 no-padding">
                                    <input type="number" size="3" name="pmStartHour" min="0" max="23">时
                                    <input type="number" size="3" name="pmStartMinute" min="0" max="59">分
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-sm-10 col-sm-offset-2 no-padding">
                                    <input type="number" size="3" name="pmEndHour" min="0" max="23">时
                                    <input type="number" size="3" name="pmEndMinute" min="0" max="59">分
                                </div>
                            </div>
                            <div class="col-sm-12 week-box">
                                <div style="width:14%;float:left;" class="text-center">
                                    周一<br>
                                    <input type="checkbox" name="day" value="1" checked="checked">
                                </div>
                                <div style="width:14%;float:left;" class="text-center">
                                    周二<br>
                                    <input type="checkbox" name="day" value="2" checked="checked">
                                </div>
                                <div style="width:14%;float:left;" class="text-center">
                                    周三<br>
                                    <input type="checkbox" name="day" value="3" checked="checked">
                                </div>
                                <div style="width:14%;float:left;" class="text-center">
                                    周四<br>
                                    <input type="checkbox" name="day" value="4" checked="checked">
                                </div>
                                <div style="width:14%;float:left;" class="text-center">
                                    周五<br>
                                    <input type="checkbox" name="day" value="5" checked="checked">
                                </div>
                                <div style="width:14%;float:left;" class="text-center">
                                    周六<br>
                                    <input type="checkbox" name="day" value="6" checked="checked">
                                </div>
                                <div style="width:14%;float:left;" class="text-center">
                                    周日<br>
                                    <input type="checkbox" name="day" value="7" checked="checked">
                                </div>
                            </div>

                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Project.update()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--配置坐席编辑弹框-->
<div class="modal fade" id="editZXModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">配置坐席组</h4>
            </div>
            <div class="modal-body">
                <input type="hidden" id="zx-pid">
                <div class="row">
                    <div class="col-sm-6">
                        <h3 class="text-center">公司</h3>
                        <div id="companyPanel" style="min-height: 150px;border-right: 1px solid;">
                            <p class="zx-company">数赢云</p>
                            <p class="zx-company">星路</p>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <h3 class="text-center">坐席组</h3>
                        <div id="staffGroupPanel">

                        </div>
                    </div>
                    <div class="col-sm-12">
                        <strong>已选定坐席组：</strong>
                        <span id="selectedStaffGroup">

                        </span>

                    </div>
                </div>



            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Project.staffGroup.update()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--配置地址弹框-->
<div class="modal fade" id="editUrl" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">质检地址</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="editURL-form">
                    <div class="form-group" hidden>
                        <label class="col-sm-2 control-label">项目编号</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="projectId" name="projectId">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">地址</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="projectUrl" name="projectUrl">
                        </div>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Project.updateUrl()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--配置线路弹框-->
<div class="modal fade" id="editCaller" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">配置线路</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="editCallrer-form">
                    <input type="hidden" id="projectId_caller" name="id">
                    <div class="form-group" hidden>
                        <label class="col-sm-2 control-label">公司名称</label>
                        <div class="col-sm-10">
                            <input type="text" value="${companyId}" name="companyId" id="callerCompanyId">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">线路名称</label>
                        <div class="col-sm-9" id="editDiv">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Project.updateCaller()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--配置项目分组弹框-->
<div class="modal fade" id="editGroup" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">配置分组</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="editGroup-form">
                    <input type="hidden" id="projectId_Group" name="id">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">分组名称</label>
                        <div class="col-sm-9" id="editGro">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Project.updateGroup()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--计费规则弹框-->
<div class="modal fade" id="editBilling" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">计费规则</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="billing-form">
                    <input type="hidden" id="projectId_billing" name="id">
                    <div class="form-group" hidden>
                        <label class="col-sm-2 control-label">公司名称</label>
                        <div class="col-sm-10">
                            <input type="text" value="${companyId}" name="companyId" id="billingCompanyId">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">计费规则</label>
                        <div class="col-sm-9" id="billingAIDiv">
                        </div>
                        <HR style="border:1 dashed #987cb9" width="100%" color=#987cb9 SIZE=1>
                        <div class="col-sm-9" id="billingCallDiv" style="float: right">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Project.updateBilling()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--配置预约坐席下线人数弹框-->
<div class="modal fade" id="makeStaffOffline" tabindex="-1" role="dialog" aria-labelledby="modalTitle"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">配置预约坐席下线人数</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="makeStaffOffline-form">
                    <div class="form-group" hidden>
                        <label class="col-sm-2 control-label">项目编号</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="makeStaffOffline-pid"
                                   name="makeStaffOffline-pid">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">人数</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="makeStaffOffline-num"
                                   name="makeStaffOffline-num">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label"></label>
                        <div class="col-sm-8">
                            <span id="makeStaffOffline-info"></span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" id="makeStaffOffline-submit"
                        onclick="Project.makeStaffOffline()">确定
                </button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal"
                        onclick="window.clearInterval(Project.intervalForStaffOffline);">关闭
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--指定日期重新计算和结算话费-->
<div class="modal fade" id="recountAccount" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">配置预约坐席下线人数</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="recountAccount-form">
                    <div class="form-group" hidden>
                        <label class="col-sm-2 control-label">项目编号</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="recountAccount-pid" name="recountAccount-pid">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-5 control-label">日期</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="recountAccount-day" name="recountAccount-day">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-5 control-label">AI计费单价（单位：厘）</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="recountAccount-aiprice"
                                   name="recountAccount-day">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-5 control-label">通话计费时长（单位：秒）</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="recountAccount-second"
                                   name="recountAccount-day">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-5 control-label">通话计费单价（单位：厘）</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="recountAccount-callprice"
                                   name="recountAccount-day">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" id="recountAccount-submit"
                        onclick="Project.recountAccount()">确定
                </button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--预警配置弹框-->
<div class="modal fade" id="editWarn" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">预警配置</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="editWarn-form">
                    <input type="hidden" id="projectId_warn" name="id">
                    <div class="form-group">
                        <#--<label class="col-sm-2 control-label">预警名称</label>-->
                        <div class="col-sm-12" id="editwarnDiv">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Project.updateWarn()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-sm btn-primary" onclick="Project.deleteAll()">清空</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--短信发送弹框-->
<div class="modal fade" id="sendModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">设置短信模板</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="add-form" enctype="multipart/form-data">
                    <input id = "smsprojectId" type="hidden">
                    <input id = "groupid" type="hidden">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">渠道：</label>
                        <div class="col-sm-9">
                            <select id="smsChannelName" class="form-control" onchange="Project.getTemplate();" style="width: 150px;">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">模板：</label>
                        <div class="col-sm-9">
                            <select id="smsTemplateName" class="form-control" style="width: 150px;">
                                <option value="">请选择模板</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">模板正文：</label>
                        <div class="col-sm-9">
                            <textarea id="content" class="form-control" rows="5" disabled="disabled"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">短信功能</label>
                        <div class="col-sm-9">
                            <input type="checkbox" id="switch"  name="hiden" class="js-switch"/>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Project.smsinsert()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">取消</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script src="/static/js/plugins/ladda/spin.min.js"></script>
<script src="/static/js/plugins/ladda/ladda.min.js"></script>
<script src="/static/js/plugins/ladda/ladda.jquery.min.js"></script>
<script src="/static/js/plugins/dualListbox/jquery.bootstrap-duallistbox.js"></script>
<script src="/static/js/plugins/chosen/chosen.jquery.js"></script>
<#--<script src="/static/js/plugins/bootstrap-select/bootstrap-select.js">-->


<script src="/static/modular/manager/project/project.js"></script>

<script>
</script>
</body>
</html>
