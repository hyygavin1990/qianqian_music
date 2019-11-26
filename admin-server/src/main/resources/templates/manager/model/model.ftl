<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.min.css" />
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
                <h2>模型统计</h2>
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
                        <label>&nbsp;&nbsp;规则组：</label>
                        <select id="cid" class="form-control" onchange="Model.changeCategory();" style="width: 150px;">
                            <#--<option value="">请选择</option>-->
                            <#list categories as category>
                                <option value="${category.id}">${category.name}</option>
                            </#list>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>&nbsp;&nbsp;规则：</label>
                        <select id="rid" class="form-control" onchange="Model.changeRegulation();" style="width: 150px;">

                        </select>
                    </div>
                    <div class="form-group">
                        <label>&nbsp;&nbsp;语音：</label>
                        <select id="voiceid" class="form-control" style="width: 150px;">

                        </select>
                    </div>
                    <div class="form-group">
                        <label>&nbsp;&nbsp;起始状态机名称：</label>
                        <input id="from" name="from"  type="text" class="form-control"  style="width: 100px">
                    </div>
                    <div class="form-group">
                        <label>&nbsp;&nbsp;目标话术名称：</label>
                        <input id="to" name="to"  type="text" class="form-control"  style="width: 100px">
                    </div>
                    <div class="form-group">
                        <label>&nbsp;&nbsp;类型：</label>
                        <input id="type" name="type"  type="text" class="form-control"  style="width: 100px">
                    </div>
                    <div class="form-group">
                        <label>&nbsp;&nbsp;情感类型：</label>
                        <input id="emotion" name="emotion"  type="text" class="form-control"  style="width: 100px">
                    </div>
                    <div class="form-group">
                        <label>&nbsp;&nbsp;是否转接：</label>
                        <select id="resulttype" name="resulttype"  type="text" class="form-control"  style="width: 100px">
                            <option value="">全部</option>
                            <option value="是">是</option>
                            <option value="否">否</option>
                        </select>
                    </div>
                    <div class="form-group"  id="monthSearch">
                        <label>&nbsp;&nbsp;月份：</label>
                        <input id="month" name="month"  type="text" class="form-control"  style="width: 120px">
                    </div>
                    <div class="form-group" id="daySearch">
                        <label>&nbsp;&nbsp;日期：</label>
                        <input type="text" class="form-control" id="day" style="width: 120px;">
                    </div>
                    <button class="btn btn-primary btn-outline"onclick="Model.search()">搜索</button>

                    <ul class="nav nav-tabs" style="float: right">
                        <li class="active" ><a  id="tabDay"data-toggle="tab" href="#tab-1"  onclick="Model.dayTotal()" aria-expanded="true">日</a></li>
                        <li class="" ><a data-toggle="tab" href="#tab-2"  id ="tabMonth"  onclick="Model.monthTotal()" aria-expanded="false">月</a></li>
                    </ul>
                </div>
            </div>
            <div class="row">
            <#--表格数据开始-->
                <div class="tab-content">
                    <div id="tab-1" class="tab-pane active" style="width: 100%">
                        <div >
                        <#--表一-->
                            <br>
                            <div id="hidden1" hidden>
                                <button class="btn btn-success"  type="button" onclick="Model.exportExcel1()">导出EXCEL</button>
                            </div>
                            <div class="jqGrid_wrapper1">
                            <#--jqgrid 表格栏-->
                                <table id="grid-table1"></table>
                            </div>
                        </div>
                        <br>
                        <div >
                        <#--表一-->
                            <br>
                            <div id="hidden2" hidden>
                                <button class="btn btn-success" type="button" onclick="Model.exportExcel2()">导出EXCEL</button>
                            </div>
                            <div class="jqGrid_wrapper2">
                            <#--jqgrid 表格栏-->
                                <table id="grid-table2"></table>
                            </div>
                        </div>
                    </div>

                    <div id="tab-2" class="tab-pane" style="width: 100%">
                        <div >
                        <#--表二-->
                            <br>
                            <div id="hidden3" hidden>
                                <button class="btn btn-success" type="button" onclick="Model.exportExcel3()">导出EXCEL</button>
                            </div>
                            <div class="jqGrid_wrapper3">
                            <#--jqgrid 表格栏-->
                                <table id="grid-table3" ></table>
                            </div>
                        </div>
                        <br>
                        <div >
                        <#--表二-->
                            <br>
                            <div id="hidden4" hidden>
                                <button class="btn btn-success" type="button" onclick="Model.exportExcel4()">导出EXCEL</button>
                            </div>
                            <div class="jqGrid_wrapper4">
                            <#--jqgrid 表格栏-->
                                <table id="grid-table4" ></table>
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
<script src="/static/modular/manager/model/model.js"></script>
</body>
</html>
