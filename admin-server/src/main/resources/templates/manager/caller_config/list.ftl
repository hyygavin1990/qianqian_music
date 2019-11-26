<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
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

    </style>
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>线路管理</h2>
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
                                        <label for="username" class="sr-only">线路组</label>
                                        <select id="callerGroupId" class="dept_select form-control">
                                            <option value="">全部</option>
                                            <#list groupList as group>
                                                <option value="${group.id}">${group.name}</option>
                                            </#list>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="username" class="sr-only">线路名称</label>
                                        <input type="text"  placeholder="线路名称" id="name" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="username" class="sr-only">是否删除</label>
                                        <select id="deleted" class="form-control">
                                            <option value="0" selected>未删除</option>
                                            <option value="1">已删除</option>
                                        </select>
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="CallerConfig.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="CallerConfig.resetSearch()">重置</button>
                                    <button class="control-auth btn btn-primary" data-auth="callerConfig_create" onclick="CallerConfig.create()">新增</button>
                                </div>
                            </div>
                            <#--<div class="bar operate-bar">
                                <button class="control-auth btn btn-sm btn-primary" data-auth="callerConfig_create" onclick="CallerConfig.create()">新增</button>
                            </div>-->
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
                        <label class="col-sm-3 control-label">线路名称</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">注册类型</label>
                        <div class="col-sm-9">
                            <label> <input type="radio" checked value="">IP注册</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">网关IP地址</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="ip">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">网关地址端口</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="port">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">主叫号码</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="caller">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">线路分组</label>
                        <div class="col-sm-9">
                            <select name="callerGroupId" class="form-control">
                                <#list groupList as group>
                                        <option value="${group.id}">---${group.name}---</option>
                                </#list>
                            </select>

                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">录音编码</label>
                        <div class="col-sm-9">
                            <select name="encode" class="form-control">
                                <option value="PCMU">PCMU</option>
                                <option value="PCMA">PCMA</option>
                                <option value="G729">G729</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">计费单价(厘)</label>
                        <div class="col-sm-9">
                            <input type="number" class="form-control" name="price" id="price1">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">计费时长(秒)</label>
                        <div class="col-sm-9">
                            <input type="number" class="form-control" name="priceTime" id="priceTime1">
                        </div>
                    </div>
                   <#--<div class="form-group">
                             <label class="col-sm-3 control-label">当前使用线路数</label>
                             <div class="col-sm-9">
                                  <input type="text" class="form-control" name="currentinuse">
                             </div>
                    </div>-->
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="CallerConfig.insert()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--编辑弹框-->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">编辑用户</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="edit-form">
                    <input type="hidden" id="id" name="id">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">线路名称</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">注册类型</label>
                        <div class="col-sm-9">
                            <label> <input type="radio" checked value="">IP注册</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">网关IP地址</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="ip">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">网关地址端口</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="port">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">主叫号码</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="caller">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">线路分组</label>
                        <div class="col-sm-9" id="editGroup">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">录音编码</label>
                        <div class="col-sm-9">
                            <select name="encode" class="form-control">
                                <option value="PCMU">PCMU</option>
                                <option value="PCMA">PCMA</option>
                                <option value="G729">G729</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label"  >计费单价(厘)</label>
                        <div class="col-sm-9">
                            <input type="number" class="form-control" name="price" id="price2">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label"  >计费时长(秒)</label>
                        <div class="col-sm-9">
                            <input type="number" class="form-control" name="priceTime" id="priceTime2" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label"  >号码前缀(数字)</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="prefix" id="prefix" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">手机号三网比率</label>
                        <div class="col-sm-9">
                            <div class="row">
                                &nbsp;&nbsp;&nbsp;&nbsp;<label>移动</label>
                                <input type="text" id="mobile" name="mobile" style="width: 50px;">&nbsp;&nbsp;
                                <label>联通</label>
                                <input type="text" id="unicom" name="unicom" style="width: 50px;">&nbsp;&nbsp;
                                <label>电信</label>
                                <input type="text" id="telecom" name="telecom" style="width: 50px;">
                            </div>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="CallerConfig.update()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--详情弹框-->
<div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">详情</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="detail-form">
                    <table class ="table">
                        <thead>
                        <tr>
                            <th>线路名称 </th>
                            <th>公司名称</th>
                            <th>项目名称</th>
                            <th>并发数</th>
                        </tr>
                        </thead>
                        <tbody id="tbody1">
                        <!-- 填充数据-->
                        </tbody>
                    </table>
                </form>
            </div>
            <div class="modal-footer">
                <#--<button type="button" class="btn btn-sm btn-primary" onclick="CallerConfig.update()">确定</button>-->
                <button type="button" class="btn btn-sm btn-success" data-dismiss="modal">确定</button>
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
                <button type="button" class="btn btn-sm btn-primary" onclick="CallerConfig.updateWarn()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-sm btn-primary"  onclick="CallerConfig.deleteAll()">清空</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script src="/static/modular/manager/caller_config/caller_config.js"></script>
<script src="/static/js/plugins/chosen/chosen.jquery.js"></script>

</body>
</html>
