<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet">
    <link href="/static/css/plugins/dropzone/basic.css" rel="stylesheet">
    <link href="/static/css/plugins/jsTree/style.min.css" rel="stylesheet">
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>坐席分组</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="/main">首页</a>
                    </li>
                    <li class="active">
                        <a href="#"> <strong>列表</strong></a>
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
                                        <input type="text"  placeholder="请输入坐席分组名称..." id="name" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-9">
                                            <select id="companyIdF" class="form-control">
                                                <option value="">请选择公司...</option>
                                                <#if companys??>
                                                    <#list companys as company>
                                                        <option value="${company.id}">${company.name}</option>
                                                    </#list>
                                                </#if>
                                            </select>
                                        </div>
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="StaffGroup.search();">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="StaffGroup.reset();">重置</button>
                                    <button class="btn btn-success control-auth" data-auth="binding" type="button" onclick="StaffGroup.add();">新增分组</button>
                                </div>
                                <div class="jqGrid_wrapper" style="margin-top: 10px;">
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

        </div>
      <#include "/templates/layout/footer.ftl">
      </div>
    </div>
    <#include "/templates/layout/commonjs.ftl">
    <#--新增弹框-->
    <div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">新增分组</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="create-form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">分组名称</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control create-input" name="name" placeholder="请输入分组名称...">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">公司</label>
                        <div class="col-sm-5">
                            <select id="companyid" class="form-control">
                            </select>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="StaffGroup.insert();">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--编辑弹框-->
<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">编辑</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="create-form2">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">分组名称</label>
                        <div class="col-sm-7">
                            <input type="hidden" name="id">
                            <input type="hidden" name="companyId">
                            <input type="text" class="form-control create-input" name="name" placeholder="请输入分组名称...">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">公司</label>
                        <div class="col-sm-5">
                            <input type="text" class="form-control create-input" name="companyName" disabled>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="StaffGroup.update();">确定</button>
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
                <h4 class="modal-title" id="modalTitle">绑定坐席</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="editZX-form">
                    <input type="hidden" name="id">
                    <input type="hidden" name="companyId">
                    <#--<div class="form-group" >
                        <label class="col-sm-2 control-label">公司名称</label>
                        <input type="text" name="companyName" disabled>
                    </div>
                    <div class="form-group" >
                        <label class="col-sm-2 control-label">坐席分组</label>
                        <input type="text" name="name" disabled>
                    </div>-->
                    <select class="form-control dual_select" multiple name="selectExtIds">
                    </select>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="StaffGroup.updateStaff();">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--统计配置弹框-->
<div class="modal fade" id="censusModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title" id="modalTitle">统计配置</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="census-form">
                    <input type="hidden" name="id">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">分组每日外呼时长</label>
                    </div>
                    <div class="form-group">
                        <#--<label class="col-sm-3 control-label">外呼总时长(h):</label>-->
                        <div class="col-sm-9">
                            <div class="col-sm-6">
                                <label class="col-sm-8 col-sm-offset-2 control-label">上午开始时间</label>
                            </div>
                            <div class="col-sm-6">
                                <label class="col-sm-8 col-sm-offset-2 control-label">上午结束时间</label>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-sm-11 col-sm-offset-2 no-padding">
                                    <input type="number" size="3" name="amStartHour" min="0" max="23">时
                                    <input type="number" size="3" name="amStartMinute" min="0" max="59">分
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-sm-11 col-sm-offset-2 no-padding">
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
                                <div class="col-sm-11 col-sm-offset-2 no-padding">
                                    <input type="number" size="3" name="pmStartHour" min="0" max="23">时
                                    <input type="number" size="3" name="pmStartMinute" min="0" max="59">分
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-sm-11 col-sm-offset-2 no-padding">
                                    <input type="number" size="3" name="pmEndHour" min="0" max="23">时
                                    <input type="number" size="3" name="pmEndMinute" min="0" max="59">分
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="StaffGroup.censusInsert();">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script src="/static/modular/manager/staff_group/staffGroup.js"></script>
<script src="/static/js/plugins/dualListbox/jquery.bootstrap-duallistbox.js"></script>
</body>
</html>
