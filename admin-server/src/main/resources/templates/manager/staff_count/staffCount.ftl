<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.min.css" />
    <link href="/static/css/plugins/chosen/bootstrap-chosen.css" rel="stylesheet">
    <link href="/static/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
    <link href="/static/css/style.css" rel="stylesheet">
    <style>
        #gbox_grid-table1{
            width: 100%;height: 500px;
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
                <h2>坐席统计</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="/main">首页</a>
                    </li>
                    <li class="active">
                        <strong>统计</strong>
                    </li>
                </ol>
            </div>
        </div>
        <div class="wrapper wrapper-content">
            <div class="bar search-bar">
                <div class="form-inline">
                    <div class="form-group">
                        <label>公司：</label>
                        <select id="company" class="form-control" style="width: 150px;">
                            <option value="">全部</option>
                            <#list companyList as company>
                              <option value="${company.id}">${company.name}</option>
                            </#list>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>项目：</label>
                        <select id="project" class="form-control" style="width: 150px;">
                            <option value="">全部</option>
                            <#--<#list projectList as project>-->
                              <#--<option value="${project.id}">${project.name}</option>-->
                            <#--</#list>-->
                        </select>
                    </div>
                    <div class="form-group">
                        <label>坐席分组：</label>
                        <select id="staffGroup" class="form-control search-select" style="width: 150px;">
                            <option value="">全部</option>
                            <#--<#list staffGroups as staffGroup>-->
                              <#--<option value="${staffGroup.id}">${staffGroup.name}</option>-->
                            <#--</#list>-->
                        </select>
                    </div>
                    <#--<div class="form-group">-->
                        <#--<label>&nbsp;&nbsp;坐席：</label>-->
                        <#--<select id="staff" class="form-control" style="width: 150px;">-->
                            <#--<option value="">全部</option>-->
                            <#--<#list staffList as staff>-->
                              <#--<option value="${staff.id}">${staff.nick}</option>-->
                            <#--</#list>-->
                        <#--</select>-->
                    <#--</div>-->
                    <div class="form-group"  id="monthSearch">
                        <label>月：</label>
                        <input id="month" name="month"  type="text" class="form-control"  style="width: 140px">
                    </div>
                    <div class="form-group" id="daySearch">
                        <label>日：</label>
                        <input type="text" class="form-control" id="day" style="width: 150px;">
                    </div>
                    <button class="btn btn-primary btn-outline"onclick="StaffCount.search()">搜索</button>

                    <ul class="nav nav-tabs" style="float: right">
                        <li class="active" ><a  id="tabDay"data-toggle="tab" href="#tab-1" onclick="StaffCount.dayTotal()" aria-expanded="true">日</a></li>
                        <li class="" ><a data-toggle="tab" href="#tab-2"  id ="tabMonth" onclick="StaffCount.monthTotal()" aria-expanded="false">月</a></li>
                    </ul>
                </div>
            </div>
            <#--//-->
            <div class="row">
                <div class="tabs-container">
                    <#--展示栏开始-->
                    <div class="row">
                        <div class="col-lg-3" style="width: 20%;">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title" >
                                    <#--<span class="label label-success pull-right">Total Dial-out</span>-->
                                    <h5 >h2成单量</h5>
                                </div>
                                <div class="ibox-content" >
                                    <h1 class="no-margins" id="leads"></h1>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3" style="width: 20%">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title">
                                    <#--<span class="label label-info pull-right">Total Connected</span>-->
                                    <h5>人均接通量</h5>
                                </div>
                                <div class="ibox-content">
                                    <h1 class="no-margins" id="connectAvg"></h1>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3" style="width: 20%">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title">
                                    <#--<span class="label label-primary pull-right">Daily Cost</span>-->
                                    <h5>人均成单量</h5>
                                </div>
                                <div class="ibox-content">
                                    <h1 class="no-margins" id="leadsAvg"></h1>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3" style="width: 20%">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title">
                                    <#--<span class="label label-danger pull-right">Remainder</span>-->
                                    <h5>人均通话时长</h5>
                                </div>
                                <div class="ibox-content">
                                    <h1 class="no-margins" id="durationAvg"></h1>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3" style="width: 20%">
                            <div class="ibox float-e-margins">
                                <div class="ibox-title">
                                <#--<span class="label label-danger pull-right">Remainder</span>-->
                                    <h5>人均等待时长</h5>
                                </div>
                                <div class="ibox-content">
                                    <h1 class="no-margins" id="freeAvg"></h1>
                                </div>
                            </div>
                        </div>

                    </div>
                    <#--展示栏结束-->
                </div>
            </div>
            <div class="row">
            <#--表格数据开始-->
                <div class="tab-content">
                    <div id="tab-1" class="tab-pane active" style="width: 100%">
                        <div >
                        <#--表一-->
                            <div class="jqGrid_wrapper1">
                            <#--jqgrid 表格栏-->
                                <table id="grid-table1"></table>
                            </div>
                        </div>
                    </div>

                    <div id="tab-2" class="tab-pane" >
                        <div >
                        <#--表二-->
                            <div class="jqGrid_wrapper3">
                            <#--jqgrid 表格栏-->
                                <table id="grid-table3" ></table>
                            </div>
                        </div>
                    </div>

                </div>
            <#--表格数据结束-->
                </div>
            </div>

        <#include "/templates/layout/footer.ftl">
    </div>
</div>
<#include "/templates/layout/commonjs.ftl">
<script src="/static/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script src="/static/js/plugins/datapicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>
<script src="/static/js/plugins/chosen/chosen.jquery.js"></script>
<script src="/static/modular/manager/staffCount/staffCount.js"></script>
</body>
</html>
