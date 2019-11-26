<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">

</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>规则列表</h2>
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
                                        分类：<select id="cid"  class="form-control" style="width: 150px;" onchange="Regulation.changeCidSelect()">
                                        <option value="-1">所有</option>
                                            <#list categories as v>
                                                <option value="${v.id}">${v.name}</option>
                                            </#list>
                                        </select>

                                        <select id="scid"  class="form-control" style="width: 150px;">
                                            <option value="-1">所有</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        行业：<select id="inid"  class="form-control" style="width: 150px;">
                                            <option value="-1">所有</option>
                                        <#list industries as industry>
                                            <option value="${industry.id}">${industry.name}</option>
                                        </#list>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label for="tag" class="sr-only">标签</label>
                                        <input type="text"  placeholder="标签" id="tag" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="nickname" class="sr-only">版本</label>
                                        <input type="text" placeholder="版本" id="version" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        状态：<select id="state" class="form-control" style="width: 150px;">
                                        <option value="">所有</option>
                                        <option value="0">未审核</option>
                                        <option value="1">已审核</option>
                                        <option value="2">已废弃</option>
                                        </select>
                                    </div>
                                    <button class="btn btn-success" type="button" onclick="Regulation.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="Regulation.resetSearch()">重置</button>
                                    <button class="control-auth btn btn-primary" type="button"  data-auth="regulation_insert" onclick="Regulation.create()">新增</button>
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

<#--新增弹框-->
<div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">新增规则</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="create-form">
                    <div class="form-group">
                        <label class="col-sm-2 control-label" style="width: 120px;">标签</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="tag">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" style="width: 120px;">版本</label>
                        <div class="col-sm-1 control-label" style="width: 2px;">V-</div>
                        <div class="col-md-2" style="padding:0px;">
                            <input type="number" class="form-control" name="version"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" style="width: 120px;">行业</label>
                        <div class="col-sm-4">
                            <select name="industryId" class="form-control" ></select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" style="width: 120px;">模型类型</label>
                        <div class="col-sm-4">
                            <select name="mtype" class="form-control" >
                                <option value="0">情感类型</option>
                                <option value="1">通知类型</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" style="width: 120px;">分类</label>
                        <div class="col-sm-4">
                            <select name="scid" class="form-control" ></select>
                            <input type="hidden" name="cid">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" style="width: 120px;">复制</label>
                        <div class="col-sm-1 width-30 " style="padding-right: 0;">
                            <input type="checkbox"  style="width: 20px;height: 20px;margin-top: 7px;">
                            <input type="hidden" name="iscopy">
                        </div>
                        <div class="cpridSelect col-sm-3" style="visibility:hidden;padding: 0" >
                            <select name="cpscid" class="form-control" ></select>
                        </div>
                        <div  class="cpridSelect col-sm-5" style="visibility:hidden;" >
                            <select name="cprid" class="form-control" ></select>
                        </div>

                    </div>

                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Regulation.insert()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--测试接口弹框-->
<div class="modal fade" id="remoteTestModal" tabindex="-1" role="dialog" aria-labelledby="remoteTestModalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="remoteTestModalTitle">测试接口</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="remote-test-form">
                    <input type="hidden" class="form-control" name="rid">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">文字</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" name="calltext">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">状态</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" name="fromstatus">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-sm-2 control-label">结果</label>
                        <div class="col-sm-10">
                            <p class="form-control-static" style="word-break:normal;white-space:pre-warp;word-wrap:break-word;"></p>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <!-- Split button -->
                <div class="btn-group">
                    <button type="button" class="btn btn-info" onclick="Regulation.remoteTest()">测试</button>
                    <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="caret"></span>
                        <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a href="#" onclick="Regulation.remoteTest()" >测试</a></li>
                        <li><a href="#" onclick="Regulation.remoteTest(true)">刷新测试</a></li>
                    </ul>
                </div>

                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--激活接口弹框-->
<div class="modal fade" id="activeModal" tabindex="-1" role="dialog" aria-labelledby="activeModalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="activeModalTitle">激活规则</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="active-form">
                    <input type="hidden" class="form-control" name="rid">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">激活数目</label>
                        <div class="col-sm-4">
                            <input type="number" class="form-control" name="num">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">版本</label>
                        <div class="col-sm-4">
                            <select name="branchid" class="form-control" ></select>
                        </div>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Regulation.active()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--外呼任务列表-->
<div class="modal fade" id="projectModal" tabindex="-1" role="dialog" aria-labelledby="projectModalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="projectModalTitle">外呼任务列表</h4>
            </div>
            <div class="modal-body">
                <table class="table table-striped table-bordered table-hover dataTables-example">
                    <thead>
                        <tr>
                            <th>公司名</th>
                            <th>项目id</th>
                            <th>名称</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--绑分类弹框-->
<div class="modal fade" id="subcategoryModal" tabindex="-1" role="dialog" aria-labelledby="activeModalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="activeModalTitle">绑定分类</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="subcategory-form">
                    <input type="hidden" id="sub_rid"/>
                    <input type="hidden" class="form-control" name="rid">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">规则分类</label>
                        <div class="col-sm-4" id="subcategoryDiv">

                        </div>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Regulation.subcategory()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#include "/templates/layout/commonjs.ftl">
<script src="/static/modular/ai/regulation/list.js"></script>
<script type="text/javascript">


</script>
</body>
</html>
