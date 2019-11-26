<!DOCTYPE html>
<html>

<head>
    <#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet">
    <link href="/static/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
    <style>
        .red-font {
            color: red;
        }
        .jqgrid-popover {
            text-decoration: underline;
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
                <h2>号码库</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="/main">首页</a>
                    </li>
                    <li>
                        <a href="/company/list">企业列表</a>
                    </li>
                    <li>
                        <a href="/project/list?companyId=${companyId}">项目列表</a>
                    </li>
                    <li class="active">
                        <strong>号码库</strong>
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
                                    <input type="text" value="${pid}" id="pid" hidden>
                                    <input type="text" value="${companyId}" id="companyId" hidden>
                                    <input id="modelLocalUrl" value="${modelLocalUrl}" hidden>
                                    <div class="form-group">
                                        <label for="username" class="sr-only">批次</label>
                                        <input type="text"  placeholder="批次" id="note" class="form-control">
                                    </div>
                                <#--<div class="form-group">-->
                                <#--<div class="input-group date">-->
                                <#--<span class="input-group-addon">-->
                                <#--<i class="fa fa-calendar"></i>-->
                                <#--</span>-->
                                <#--<input id="month" type="text" class="form-control" value="" style="width: 140px">-->
                                <#--</div>-->
                                <#--</div>-->
                                <#--<div class="form-group">-->
                                <#--<input type="text"  placeholder="起始天" id="startDay" value="" class="form-control" style="width: 50px">-->
                                <#--</div>-->
                                <#----->
                                <#--<div class="form-group">-->
                                <#--<input type="text"  placeholder="结束天" id="endDay" value="" class="form-control" style="width: 50px">-->
                                <#--</div>-->
                                    <button class="btn btn-success" type="button" onclick="PhoneBatch.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="PhoneBatch.resetSearch()">重置</button>
                                    <button class="control-auth btn btn-success"  data-auth="phone_batch_import"  type="button" id="import">批量导入</button>
                                    <button class=" btn btn-success"  type="button" id="importHeader">自定义标签导入</button>
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
<#--设置优先级弹框-->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">设置优先级</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="edit-form">
                    <input type="hidden" id="id" name="id">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">优先级</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" name="priority" min="0" max="99">
                            <span>*输入范围0~99，数字越大优先级越高。相同优先级下判断导入时间，先导入的先外呼。输入"0"将结束批次号，输入"1"将暂停对该批次该的外呼。</span>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="PhoneBatch.updatePriority()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!--导入模态框-->
<div class="modal fade" id="importModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="importModalTitle">批量导入</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row" style="margin-bottom: 5px">
                        <div class="col-sm-3">
                            <label>大批次名称</label>
                        </div>
                        <div class="col-sm-7">
                            <label><input id="importName" type="text" style="width: 200px"></label>
                            <input type="button" value="下载模板"  onclick="PhoneBatch.downloadFile()"    class="btn btn-sm btn-primary"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <label>文件</label>
                        </div>
                        <div class="col-sm-7">
                            <input type="text" id="labelForFile" style="width: 200px">
                            <label class="btn btn-sm btn-primary" for="file" >选择文件</label>
                            <input id="file" type="file"  style="display: none">
                        <#--<label><input id="file" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ></label>-->
                        </div>
                        <div class="col-sm-2">
                        <#--<button type="button" class="ladda-button btn btn-sm btn-primary" data-style="slide-right">上传</button>-->
                        </div>
                    </div>
                    <#--<div class="row">
                        <div class="col-sm-3">
                            <label>去重方式</label>
                        </div>
                        <div class="col-sm-7">
                            <span>三个月内已拨打号码、已导入未拨打号码去重    <input id="old" type="checkbox" name="duplicateRemoval" id="" checked style="width: 20px;height: 20px;"></span>
                            &lt;#&ndash;<br>&ndash;&gt;
                            &lt;#&ndash;<span>近两月已导入，未拨打号码去重    <input id="new" type="checkbox" name="duplicateRemoval" id="" checked style="width: 20px;height: 20px"></span>&ndash;&gt;
                        </div>
                    </div>-->
                </div>


            </div>
            <div class="modal-footer">
            <#--<button type="button" id="submit"  class="ladda-button btn btn-sm btn-primary" data-style="slide-right">提交</button>-->
                <button type="button" id="submit" onclick="PhoneBatch.submit(this)" class="ladda-button btn btn-sm btn-primary" data-style="slide-right">提交</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!--自定义导入模态框-->
<div class="modal fade" id="importModal2" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="importModalTitle2">自定义标签导入</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row" style="margin-bottom: 5px">
                        <#--<div class="col-sm-3">-->
                            <#--<label>大批次名称</label>-->
                        <#--</div>-->
                        <#--<div class="col-sm-7">-->
                            <#--<label><input id="importName" type="text" style="width: 200px"></label>-->
                            <#--<input type="button" value="下载模板"  onclick="PhoneBatch.downloadFile()"    class="btn btn-sm btn-primary"/>-->
                        <#--</div>-->
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <label>文件</label>
                        </div>
                        <div class="col-sm-7">
                            <input type="text" id="labelForFile2" style="width: 200px">
                            <label class="btn btn-sm btn-primary" for="file2" >选择文件</label>
                            <input id="file2" type="file"  style="display: none">
                        <#--<label><input id="file" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ></label>-->
                        </div>
                        <div class="col-sm-2">
                        <#--<button type="button" class="ladda-button btn btn-sm btn-primary" data-style="slide-right">上传</button>-->
                        </div>
                    </div>
                <#--<div class="row">
                    <div class="col-sm-3">
                        <label>去重方式</label>
                    </div>
                    <div class="col-sm-7">
                        <span>三个月内已拨打号码、已导入未拨打号码去重    <input id="old" type="checkbox" name="duplicateRemoval" id="" checked style="width: 20px;height: 20px;"></span>
                        &lt;#&ndash;<br>&ndash;&gt;
                        &lt;#&ndash;<span>近两月已导入，未拨打号码去重    <input id="new" type="checkbox" name="duplicateRemoval" id="" checked style="width: 20px;height: 20px"></span>&ndash;&gt;
                    </div>
                </div>-->
                </div>


            </div>
            <div class="modal-footer">
            <#--<button type="button" id="submit"  class="ladda-button btn btn-sm btn-primary" data-style="slide-right">提交</button>-->
                <button type="button" id="submit" onclick="PhoneBatch.submit2(this)" class="ladda-button btn btn-sm btn-primary" data-style="slide-right">提交</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#include "/templates/layout/commonjs.ftl">
<script src="/static/js/plugins/ladda/spin.min.js"></script>
<script src="/static/js/plugins/ladda/ladda.min.js"></script>
<script src="/static/js/plugins/ladda/ladda.jquery.min.js"></script>
<script src="/static/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script src="/static/js/plugins/datapicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="/static/modular/manager/project/phone_batch.js"></script>


</body>
</html>
