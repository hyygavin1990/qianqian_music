<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.min.css" />
    <link href="/static/css/style.css" rel="stylesheet">
    <style>
        .tbody input{
            width: 80px;
            border-radius: 10px;
            outline: none;
        }
        .submitBtn{
            width: 100px;
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
                <h2>ROI日报</h2>
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
                        <label>项目组：</label>
                        <select id="projectGroupId" class="form-control" style="width: 150px;">
                            <#list projectGroupList as projectGroup>
                              <option value="${projectGroup.id}">${projectGroup.name}</option>
                            </#list>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>&nbsp;&nbsp;日期：</label>
                        <div class="input-group date">
                                            <span class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </span>
                            <input type="text" class="form-control" id="dateTime" style="width: 120px;"/>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-outline"onclick="Day.search()">搜索</button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-7" style="width: 60%">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>当日动态数据（注:如果当天没有提交过将按照0处理，保证数据正确请提交后查看！）</h5>
                            <div class="ibox-tools">
                                <#--<a class="collapse-link">
                                    <i class="fa fa-chevron-up"></i>
                                </a>-->
                            </div>
                        </div>
                        <div class="ibox-content">
                            <form id="form1" action="#">
                                <div style="overflow-x: auto; overflow-y: auto; height: 310px;">
                                    <table class="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>项目名称</th>
                                            <th>leads单价（元）</th>
                                            <#--<th>翻译费用（元）</th>-->
                                            <th>人工成本（元）</th>
                                            <#--<th>话费成本（元）</th>-->
                                            <th>其他成本（元）</th>
                                        </tr>
                                        </thead>
                                        <tbody class="tbody">
                                        </tbody>
                                    </table>
                                </div>
                                <button type="button" class="submitBtn btn btn-outline btn-primary" onclick="Day.submit()">提交</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="box2 col-md-8 day" style="height: 400px;width:40%">
                    <div class="ibox-content" style="padding-left: 0px">
                        <div id="chart" style="width: 100%;height: 400px; ">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox table1">
                        <div class="ibox-content">
                            <div class="bar search-bar">
                                <div class="form-inline">
                                    <div class="form-group">
                                        <select id="projectId" class="form-control" onchange="Day.tableReload()" style="width: 150px;">
                                        </select>
                                    </div>
                                    <button class="btn btn-primary btn-outline"onclick="Day.exportExcel()">导出EXCEL</button>
                                    <button class="btn btn-info btn-outline"onclick="Day.showTableHead()">配置显示表头</button>
                                </div>
                            </div>
                            <div class="jqGrid_wrapper">
                            <#--jqgrid 表格栏-->
                                <table id="grid-table"></table>
                            </div>
                        </div>
                    </div>
                    <div class="ibox table1">
                        <div class="ibox-content">
                            <div class="bar search-bar">
                                <div class="form-inline">
                                    <button class="btn btn-primary btn-outline"onclick="Day.exportExcel2()">导出EXCEL</button>
                                    <button class="btn btn-info btn-outline"onclick="Day.showTableHead2()">配置显示表头</button>
                                </div>
                            </div>
                            <div class="jqGrid_wrapper">
                            <#--jqgrid 表格栏-->
                                <table id="grid-table2"></table>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 tomorrowTarget">
                        <div class="ibox float-e-margins">
                            <div class="ibox-title">
                                <h5>明日目标展示 </h5>
                                <div class="ibox-tools">
                                    <a class="collapse-link">
                                        <i class="fa fa-chevron-up"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="ibox-content">
                                <div class="widget style1 lazur-bg">
                                    <div class="row vertical-align">
                                        <div class="col-xs-4">
                                            <h4 class="font-bold">营收目标</h4>
                                        </div>
                                        <div class="col-xs-4 text-right">
                                            <h3 class="font-bold planRevenueTomorrow"></h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="widget style1 lazur-bg">
                                    <div class="row vertical-align">
                                        <div class="col-xs-4">
                                            <h4 class="font-bold">利润目标</h4>
                                        </div>
                                        <div class="col-xs-4 text-right">
                                            <h3 class="font-bold profitTomorrow"></h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="widget style1 lazur-bg">
                                    <div class="row vertical-align">
                                        <div class="col-xs-4">
                                            <h4 class="font-bold">leads数目标</h4>
                                        </div>
                                        <div class="col-xs-4 text-right">
                                            <h3 class="font-bold leadsTomorrow"></h3>
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
</div>
<#include "/templates/layout/commonjs.ftl">
<#--配置表头弹框1-->
<div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">配置日报表表头</h4>
            </div>
            <div class="modal-body">
                <button type="button"  class="btn btn-success btn-primary" onclick="Day.checkAll()">全选</button>
                <button type="button"  class="btn btn-success btn-primary" onclick="Day.checkNo()">全不选</button>
                <form class="form-horizontal" id="create-form">
                </form>
            </div>
            <div class="modal-footer" style="border-top: 0px;">
                <button type="button" class="btn btn-sm btn-primary" onclick="Day.insert()">保存</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--配置表头弹框2-->
<div class="modal fade" id="createModal2" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">配置日报表表头</h4>
            </div>
            <div class="modal-body">
                <button type="button"  class="btn btn-success btn-primary" onclick="Day.checkAll2()">全选</button>
                <button type="button"  class="btn btn-success btn-primary" onclick="Day.checkNo2()">全不选</button>
                <form class="form-horizontal" id="create-form2">

                </form>
            </div>
            <div class="modal-footer" style="border-top: 0px;">
                <button type="button" class="btn btn-sm btn-primary" onclick="Day.insert2()">保存</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>
<script src="/static/modular/manager/report/reportDay.js"></script>
<!-- echarts -->
<script src="/static/js/plugins/echarts/echarts.min.js"></script>
</body>
</html>
