<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
    <style>
        .tabs-container .tabs-left > .nav-tabs {
            width: 40px;
        }

        .tabs-container .tabs-left > .nav-tabs > li > a {
            min-width: 0;
            font-size: 20px;
            text-align: center;
            font-weight: 350;
        }

        .search-bar .form-inline > .nav-tabs > li > a {
            min-width: 0;
            font-size: 20px;
            /*text-align: center;*/
            font-weight: 350;
        }
       .pad-left{
           /*padding-left: 40px;*/
       }
        .nav-tabs > li > a {
            padding: 5px 5px 5px 5px;
        }

        .tabs-container .tabs-left .panel-body {
            width: auto;
            margin-left: 40px;
        }
        .staffChart {
            width: 100%;
            height: 300px;
        }
        .compare-bar .npl {
            padding-left: 0;
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
                        <strong>列表</strong>
                    </li>
                </ol>
            </div>
            <div class="col-lg-2">

            </div>
        </div>

        <div class="wrapper wrapper-content">
            <#assign today="${.now?string['yyyy-MM-dd']}">
            <#assign thismonth="${.now?string['yyyy-MM']}">
            <div class="row">
                <div class="col-lg-12" style="padding-left: 0;padding-right: 0">
                    <div class="tabs-container">
                        <div class="tabs-left">
                            <ul class="nav nav-tabs">
                                <li class="active"><a data-toggle="tab" href="#tab-1" aria-expanded="true" onclick="Staff.initDayPanel()">日表</a></li>
                                <li class=""><a data-toggle="tab" href="#tab-2" aria-expanded="false" onclick="Staff.initMonthPanel()">月表</a></li>
                                <#--<li class="" ><a data-toggle="tab" href="#tab-3" aria-expanded="false" onclick="Staff.initComparePanel()">对比</a></li>-->
                            </ul>

                            <div class="tab-content ">
                                <#--日表-->
                                <div id="tab-1" class="tab-pane active">
                                    <div class="panel-body">
                                        <div class="bar search-bar" style="margin-bottom: 40px;">
                                            <div class="form-inline">
                                                <ul class="nav nav-tabs pad-left" style="height: 40px">
                                                    <li class="active" ><a  id="tabDay_group" data-toggle="tab"  onclick="Staff.initDayPanel('group')" aria-expanded="true" >分组</a></li>
                                                    <li class="" ><a data-toggle="tab"   id ="tabDay_staff" onclick="Staff.initDayPanel('staff')" aria-expanded="false" >坐席</a></li>
                                                </ul>
                                            </div>
                                            <div class="form-inline" style="padding-top: 10px">

                                                <div class="form-group">
                                                    <label>企业：</label>
                                                    <select id="companyId1" class="form-control" onchange="Staff.day.companyChanged();" style="width: 150px;">
                                                    <#list companies as company>
                                                        <option value="${company.id}">${company.name}</option>
                                                    </#list>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>项目：</label>
                                                    <select id="projectId1" class="form-control" onchange="Staff.day.projectChanged();" style="width: 150px;">

                                                    </select>
                                                </div>
                                                <div class="form-group" style="display: none" id="groups_day_">
                                                    <label>坐席组：</label>
                                                    <select id="staffGroupId1" class="form-control" onchange="Staff.day.groupChanged();"  style="width: 150px;">

                                                    </select>
                                                </div>
                                                <div class="form-group" style="display: none" id="workedDays_day_">
                                                    <label>已工作天数：</label>
                                                    <select id="workedDays_day" class="form-control"   style="width: 150px;">
                                                        <option value="">不限</option>
                                                        <option value="3">3天内</option>
                                                        <option value="7">1周内</option>
                                                        <option value="14">2周内</option>
                                                    </select>
                                                </div>
                                                <div class="form-group"  id="my_day_group_">
                                                    <label>内容选择：</label>
                                                    <select id="my_day_group" class="form-control"   style="width: 150px;">
                                                        <option value="">所有分组</option>
                                                        <option value="my">我的分组</option>
                                                    </select>
                                                </div>
                                                <div class="form-group" style="display: none" id="my_day_staff_">
                                                    <label>内容选择：</label>
                                                    <select id="my_day_staff" class="form-control"   style="width: 150px;">
                                                        <option value="">所有坐席</option>
                                                        <option value="my">我的坐席</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <div class="input-group date">
                                                    <span class="input-group-addon">
                                                        <i class="fa fa-calendar"></i>
                                                    </span>
                                                        <input id="day1" readonly type="text" class="form-control" value="" style="width: 140px">
                                                    </div>
                                                </div>
                                                <button class="btn btn-success"  id="search" type="button" onclick="Staff.day.search()">搜索</button>
                                                <#--<button class="btn btn-success"  type="button" onclick="">导出</button>-->
                                            </div>
                                        </div style>
                                        <div>
                                            <button class="btn btn-success" type="button" onclick="Staff.day.export()">导出EXCEL</button>
                                            <button class="btn btn-success" type="button" onclick="Staff.day.showTableHead()">配置显示表头</button>
                                        </div>
                                        <br>
                                        <div class="jqGrid_wrapper" style="margin-bottom: 40px;">
                                            <table id="grid-table1">

                                            </table>
                                        </div>
                                        <div style="padding-left: 300px">
                                      <input style="width:30px;height: 15px"  type="checkbox"   value='' id="mark_target" onclick="Staff.markThena('target')"/>目标线
                                            <span id="mark_top_1" style="display: none"> <input style="width:30px;height: 15px;"  type="checkbox"   value='' id="mark_top" onclick="Staff.markThena('top')"/>top线</span>
                                            <span id="mark_avg_1" style="display: none"> <input style="width:30px;height: 15px;"  type="checkbox"   value='' id="mark_avg" onclick="Staff.markThena('avg')"/>中位线</span>
                                            <span id="mark_low_1" style="display: none">  <input style="width:30px;height: 15px;"  type="checkbox"   value='' id="mark_low" onclick="Staff.markThena('low')"/>low线</span>
                                        </div>
                                        <div class="staffChart" id="dayChart">

                                        </div>


                                    </div>
                                </div>
                                <#--月表-->
                                <div id="tab-2" class="tab-pane">
                                    <div class="panel-body">
                                        <div class="bar search-bar" style="margin-bottom: 5px;">
                                            <div class="form-inline">
                                                <ul class="nav nav-tabs pad-left" style="height: 40px">
                                                    <li class="active" ><a  id="tabMonth_group" data-toggle="tab"  onclick="Staff.initMonthPanel('group')" aria-expanded="true" >分组</a></li>
                                                    <li class="" ><a data-toggle="tab"   id ="tabMonth_staff" onclick="Staff.initMonthPanel('staff')" aria-expanded="false" >坐席</a></li>
                                                </ul>
                                            </div>
                                            <div class="form-inline" style="padding-top: 3px">
                                                <div class="form-group">
                                                    <label>企业：</label>
                                                    <select id="companyId2" class="form-control" onchange="Staff.month.companyChanged();" style="width: 150px;">
                                                    <#list companies as company>
                                                        <option value="${company.id}">${company.name}</option>
                                                    </#list>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>项目：</label>
                                                    <select id="projectId2" class="form-control" onchange="Staff.month.projectChanged();" style="width: 150px;">

                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>坐席组：</label>
                                                    <select id="staffGroupId2" class="form-control" onchange="Staff.month.groupChanged();"  style="width: 150px;">

                                                    </select>
                                                </div>
                                                <div class="form-group"  id="searchStaff" style="display: none">
                                                    <label>坐席：</label>
                                                    <select id="staffId2" class="form-control" style="width: 100px;">

                                                    </select>
                                                </div>
                                                <div class="form-group" style="display: none" id="workedDays_month_">
                                                    <label>已工作天数：</label>
                                                    <select id="workedDays_month" class="form-control"   style="width: 150px;">
                                                        <option value="">不限</option>
                                                        <option value="3">3天内</option>
                                                        <option value="7">1周内</option>
                                                        <option value="14">2周内</option>
                                                    </select>
                                                </div>
                                                <div class="form-group" style="" id="my_month_group_">
                                                    <label>内容选择：</label>
                                                    <select id="my_month_group" class="form-control"   style="width: 150px;">
                                                        <option  value="">所有分组</option>
                                                        <option  value="my">我的分组</option>
                                                    </select>
                                                </div>
                                                <div class="form-group" style="display: none" id="my_month_staff_">
                                                    <label>内容选择：</label>
                                                    <select id="my_month_staff" class="form-control"   style="width: 150px;">
                                                        <option  value="">所有坐席</option>
                                                        <option  value="my">我的坐席</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <div class="input-group date">
                                                    <span class="input-group-addon">
                                                        <i class="fa fa-calendar"></i>
                                                    </span>
                                                        <input id="month2" readonly type="text" class="form-control" value="${thismonth}" style="width: 140px">
                                                    </div>
                                                </div>
                                                <button class="btn btn-success" type="button" onclick="Staff.month.search()">搜索</button>
                                                <#--<button class="btn btn-success"  type="button" onclick="Staff.month.export()">导出</button>-->
                                            </div>
                                        </div>
                                        <div class="row" id="target_bar" style="display: none;width: 100%;" >
                                            <div class="col-lg-3" style="width: 100%;padding-left: 0px">
                                                <div class="ibox float-e-margins" style="margin-bottom: 5px">
                                                    <div class="ibox-title" style="background-color: #f3f3f4">
                                                    <#--<span class="label label-success pull-right">Total Dial-out</span>-->
                                                        <h5 >目标</h5>
                                                    </div>
                                                    <div class="ibox-content" style="padding: 0px">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="jqGrid_wrapper" style="margin-bottom: 40px;"  id="target_">
                                            <table id="grid-table-target">

                                            </table>
                                        </div>
                                        <div style="display: none;margin-bottom: 3px" id="together_head">
                                            <div class="row">
                                                <div class="col-lg-3" style="width: 100%;">
                                                    <div class="ibox float-e-margins" style="margin-bottom: 5px">
                                                        <div class="ibox-title" style="background-color: #f3f3f4">
                                                        <#--<span class="label label-success pull-right">Total Dial-out</span>-->
                                                            <h5 >月汇总数据</h5>
                                                        </div>
                                                        <div class="ibox-content" style="padding: 0px">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <#--<button class="btn btn-success" type="button" onclick="Staff.month.export()">导出EXCEL</button>-->
                                            <button class="btn btn-success" type="button" onclick="Staff.month.showTableHead('Together')">配置显示表头</button>
                                        </div>
                                        <div class="jqGrid_wrapper" style="margin-bottom: 70px;display: none;"  id="together_">
                                            <table id="grid-table-together" >

                                            </table>
                                        </div>
                                        <div style="margin-top: 10px">
                                            <div class="row">
                                                <div class="col-lg-3" style="width: 100%;">
                                                    <div class="ibox float-e-margins" style="margin-bottom: 5px">
                                                        <div class="ibox-title" style="background-color: #f3f3f4">
                                                        <#--<span class="label label-success pull-right">Total Dial-out</span>-->
                                                            <h5 >月汇总数据</h5>
                                                        </div>
                                                        <div class="ibox-content" style="padding: 0px">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="btn btn-success" type="button" onclick="Staff.month.export()">导出EXCEL</button>
                                            <button class="btn btn-success" type="button" onclick="Staff.month.showTableHead('')">配置显示表头</button>
                                        </div>
                                        <br>
                                        <div class="jqGrid_wrapper" style="margin-bottom: 40px;">
                                            <table id="grid-table2" >

                                            </table>
                                        </div>
                                        <div style="padding-left: 300px;display: none" id="markline_2">
                                            <input style="width:30px;height: 15px"  type="checkbox"   value='' id="mark_target_" onclick="Staff.markThena('target')"/>目标线
                                            <span id="mark_top_2" ><input style="width:30px;height: 15px;"  type="checkbox"   value='' id="mark_top_" onclick="Staff.markThena('top')"/>top线
                                            </span>
                                            <span id="mark_avg_2" ><input style="width:30px;height: 15px;"  type="checkbox"   value='' id="mark_avg_" onclick="Staff.markThena('avg')"/>中位线
                                            </span>
                                            <span id="mark_low_2" ><input style="width:30px;height: 15px;"  type="checkbox"   value='' id="mark_low_" onclick="Staff.markThena('low')"/>low线
                                            </span>
                                        </div>
                                        <div class="staffChart" id="monthChart">

                                        </div>
                                        <div class="jqGrid_wrapper" style="margin-bottom: 40px;margin-top: 50px">
                                            <table id="grid-table-transfer">

                                            </table>
                                        </div>
                                        <div style="padding-left: 300px;display: none" id="markline_transfer">
                                            <input style="width:30px;height: 15px"  type="checkbox"   value='' id="mark_top_t" onclick="Staff.markThenb('top')"/>top线
                                            <input style="width:30px;height: 15px"  type="checkbox"   value='' id="mark_avg_t" onclick="Staff.markThenb('avg')"/>中位线
                                            <input style="width:30px;height: 15px"  type="checkbox"   value='' id="mark_low_t" onclick="Staff.markThenb('low')"/>low线
                                        </div>
                                        <div class="staffChart" id="transferChart">

                                        </div>
                                    </div>
                                </div>
                                    <#--对比-->
                                    <div id="tab-3" class="tab-pane">
                                        <div class="panel-body">
                                            <div class="compare-bar">
                                                <div class="col-lg-8 npl">

                                                    <div class="col-lg-3 npl">
                                                        <div class="form-group">
                                                            <label>企业</label>
                                                            <select id="companyId31" class="form-control m-b-xs" onchange="Staff.compare.companyChanged1();">
                                                            <#list companies as company>
                                                                <option value="${company.id}">${company.name}</option>
                                                            </#list>
                                                            </select>
                                                            <select id="companyId32" class="form-control" onchange="Staff.compare.companyChanged2();">
                                                            <#list companies as company>
                                                                <option value="${company.id}">${company.name}</option>
                                                            </#list>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 npl">
                                                        <div class="form-group">
                                                            <label>项目</label>
                                                            <select id="projectId31" class="form-control m-b-xs" onchange="Staff.compare.projectChanged1();">

                                                            </select>
                                                            <select id="projectId32" class="form-control" onchange="Staff.compare.projectChanged2();">

                                                            </select>
                                                        </div>

                                                    </div>
                                                    <div class="col-lg-3 npl">
                                                        <div class="form-group">
                                                            <label>坐席组</label>
                                                            <select id="staffGroupId31" class="form-control m-b-xs" onchange="Staff.compare.groupChanged1();" >

                                                            </select>
                                                            <select id="staffGroupId32" class="form-control" onchange="Staff.compare.groupChanged2();" >

                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 npl">
                                                        <div class="form-group">
                                                            <label>坐席</label>
                                                            <select id="staffId31" class="form-control m-b-xs">

                                                            </select>
                                                            <select id="staffId32" class="form-control">

                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="col-lg-4 npl">
                                                    <div class="form-group" id="date-range">
                                                        <label>日期</label>
                                                        <div class="input-daterange input-group m-b-xs" id="day3" style="width: 100%">
                                                            <input type="text" class="form-control" name="start" value="${today}">
                                                            <span class="input-group-addon">to</span>
                                                            <input type="text" class="form-control" name="end" value="${today}">
                                                        </div>
                                                        <button class="btn btn-success" type="button" style="float: right" onclick="Staff.compare.compare()">对比</button>
                                                    </div>
                                                </div>
                                            </div>



                                            <div class="jqGrid_wrapper" style="margin-bottom: 40px;margin-top: 125px;">
                                                <table id="grid-table3">

                                                </table>
                                            </div>

                                            <div class="staffChart" id="compareChart">
                                                <input type="hidden" id="type">
                                            </div>
                                        </div>
                                    </div>
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
<#--配置表头弹框-->
<div class="modal fade" style="width: auto" id="createModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <input type="hidden" id="location" value="staff_day_group">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">配置表头</h4>
            </div>
            <div class="modal-body">
                <button type="button"  class="btn btn-success btn-primary" onclick="Staff.checkAll()">全选</button>
                <button type="button"  class="btn btn-success btn-primary" onclick="Staff.checkNo()">全不选</button>
                <form class="form-horizontal" id="create-form" style="width: auto">

                </form>
            </div>
            <div class="modal-footer" style="border-top: 0px;">
                <button type="button" class="btn btn-sm btn-primary"  id="headInsert" >保存</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script src="/static/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script src="/static/js/plugins/datapicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="/static/js/plugins/echarts/echarts.min.js"></script>
<script src="/static/modular/manager/statistics/staff/staff.js"></script>

</body>
</html>
