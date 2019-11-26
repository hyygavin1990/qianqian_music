<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet">
    <link href="/static/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.min.css" />
    <link href="/static/css/style.css" rel="stylesheet">
</head>
<style>
    .target{
        background: #009999;
        box-shadow:6px 3px 3px #bfbfbf;
        margin:0 auto;
    }
    .box1{
        box-shadow:6px 3px 3px #bfbfbf;
        margin:0 auto;
        background-color: #ffffff;
    }
    .box2 input{
        box-shadow:2px 2px 1px #bfbfbf inset;
        border-radius: 10px;
        outline: none;
    }

</style>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">
        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="row">
                <div class="col-lg-10">
                    <h2>ROI月报</h2>
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
        </div>

        <div class="wrapper wrapper-content" style="padding-bottom: 0px">
            <div class="row">
                <div class="col-lg-12">
                         <div class="box3">
                             <div class="bar search-bar">
                                 <div class="form-inline">
                                     <div class="form-group">
                                         <label>项目组：</label>
                                         <select id="groupId" class="form-control"  style="width: 150px;" name="projectGroupId">
                                             <#if (projectGroups?size>1)>
                                             </#if>
                                             <#list projectGroups as projectGroup>
                                                 <option value="${projectGroup.id}">${projectGroup.name}</option>
                                             </#list>
                                         </select>
                                     </div>
                                     <div class="form-group">
                                         <label>月份：</label>
                                         <input id="month" name="month" readonly type="text" class="form-control"  style="width: 140px">
                                     </div>
                                     <button class="btn btn-success" type="button" onclick="ReportMonth.search()">查询</button>
                                 </div>
                             </div>
                         </div>
                </div>
            </div>
        </div>
        <div class="wrapper wrapper-content" id="table" >
            <div class="row">
                <div class="col-md-12" style="height: 300px;">
                    <div class="box1 col-md-6" id="target-insert">
                        <form class="box2 form-horizontal" id="commit-form">
                            <br>
                            <div>
                                <h4><strong>当月目标设定&nbsp;(&nbsp;<font style="color:#bfbfbf;">请手动输入数据</font>&nbsp;)</strong></h4>
                            </div>
                            <br>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">leads单价(元):</label>
                                <div class="col-md-2">
                                    <input type="number" class="form-control" name="leadsprice" id="leadsprice" style="border-radius: 10px;width: 100px">
                                </div>
                                <label class="col-sm-3 control-label">leads目标(个):</label>
                                <div class="col-md-3">
                                    <input type="number" class="form-control" name="leads" id="leads" style="border-radius: 10px;width: 120px">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">话费单价(厘):</label>
                                <div class="col-md-2">
                                    <input type="number" class="form-control" name="callprice" id="callprice" style="border-radius: 10px;width: 100px">
                                </div>
                                <label class="col-sm-3 control-label">利润目标(元):</label>
                                <div class="col-md-3">
                                    <input type="number" class="form-control" name="profit" id="profit" style="border-radius: 10px;width: 120px">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">AI单价(厘):</label>
                                <div class="col-md-2">
                                    <input type="number" class="form-control" name="aiprice" id="aiprice" style="border-radius: 10px;width: 100px">
                                </div>
                                <label class="col-sm-3 control-label">营收目标(元):</label>
                                <div class="col-md-3">
                                    <input type="number" class="form-control" name="revenue" id="revenue" style="border-radius: 10px;width: 120px">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-5">

                                </div>
                                <label class="col-sm-3 control-label">工作天数(天):</label>
                                <div class="col-md-3">
                                    <input type="number" class="form-control" name="workday" id="workday" style="border-radius: 10px;width: 120px">
                                </div>
                            </div>
                            <div>
                                <div class="col-lg-5">

                                </div>
                                <div class="col-lg-7">
                                    <button class="btn btn-success" type="button" style="border-radius: 10px;margin-bottom: 10px" onclick="ReportMonth.commit()" >确认提交</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="box2 col-md-6" style="height: 270px;">
                        <div class="ibox-content" style="padding-left: 0px">
                            <div id="cylinder" style="width: 100%;height: 270px; ">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" style="height: 30px;margin-top: 20px">
                <div class="col-md-12" >
                    <div class="ibox-content" style="padding-left: 0px">
                        <div id="chart" style="width: 100%; height: 300px;">
                        </div>
                    </div>
                </div>

            </div>
            <div class="row" style="margin-top: 20px">
                <div class="col-lg-12">
                    <div class="ibox ">
                        <div class="ibox-content">
                            <div>
                            <#--<strong>当月数据汇总展示</strong>-->
                                <button class="btn btn-success" type="button" onclick="ReportMonth.exportExcel()">导出EXCEL</button>
                                <button class="btn btn-success" type="button" onclick="ReportMonth.showTableHead()">配置显示表头</button>
                            </div>
                            <br>
                            <div class="jqGrid_wrapper">
                            <#--jqgrid 表格栏-->
                                <table id="grid-table"></table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <#include "/templates/layout/footer.ftl">
        </div>
    </div>
</div>
<#include "/templates/layout/commonjs.ftl">

<#--配置表头弹框-->
<div class="modal fade" style="width: auto" id="createModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">配置月报表表头</h4>
            </div>
            <div class="modal-body">
                <button type="button"  class="btn btn-success btn-primary" onclick="ReportMonth.checkAll()">全选</button>
                <button type="button"  class="btn btn-success btn-primary" onclick="ReportMonth.checkNo()">全不选</button>
                <form class="form-horizontal" id="create-form" style="width: auto">

                </form>
            </div>
            <div class="modal-footer" style="border-top: 0px;">
                <button type="button" class="btn btn-sm btn-primary" onclick="ReportMonth.insert()">保存</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<script src="/static/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script src="/static/js/plugins/datapicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="/static/js/plugins/echarts/echarts.min.js"></script>
<script src="/static/js/plugins/currencyFormatter/currencyFormatter.min.js"></script>
<script src="/static/modular/manager/report/reportMonth.js"></script>
    <script>
        $(function () {
            var date = new Date();
            var month = $('#month');
            month.val(DateFormat.format(date, "yyyyMM"));
            month.datepicker({
                minViewMode: 1,
                keyboardNavigation: false,
                forceParse: false,
                autoclose: true,
                todayHighlight: true,
                format: "yyyymm",
                language: "zh-CN"
            }).on("changeDate", function (e) {
                // CompanyBill.changeDate();
            });
        })
    </script>
</body>
</html>
