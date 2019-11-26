<!DOCTYPE html>
<html>

<head>
<#include "/templates/layout/meta.ftl">
    <link href="/static/css/plugins/chosen/bootstrap-chosen.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/css/bootstrap-datetimepicker.min.css" />
    <link href="/static/css/style.css" rel="stylesheet">

    <Style>
        .password{
             position: relative;
         }
        .password .fa{
            position: absolute;
            right: 25px;
            top:8px;
            font-size: 20px;
            cursor: pointer;
        }
    </Style>
</head>

<body>
<div id="wrapper">
<#include "/templates/layout/left.ftl">
    <div id="page-wrapper" class="gray-bg">
    <#include "/templates/layout/header.ftl">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>坐席管理</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="/main">首页</a>
                    </li>
                    <li class="active">
                        <strong>列表</strong>
                    </li>
                    <li class="active" style="float:right ">
                        <label style="font-size: 18px">企业坐席注册地址:</label>
                        <input type="hidden" id="copy" value="${registerUrl}">
                        <input  id="copyUrl" value="${registerUrl}" readonly="readonly" style="color: blue;width: 270px"></input>
                        <button class="btn btn-success" type="button" onclick="Staff.copyUrl()">复制地址</button>
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
                                        <label>姓名</label>
                                        <input type="text" class="form-control" id="name" style="width: 150px;">
                                    </div>
                                    <div class="form-group">
                                        <label>手机号</label>
                                        <input type="text" class="form-control" id="phone" style="width: 150px;">
                                    </div>
                                    <div class="form-group">
                                        <label>所属公司</label>
                                        <select id="companyid" class="form-control" onchange="Staff.changeCompany();" style="width: 150px;">
                                            <option value="">全部</option>
                                            <#list companys as company>
                                                <option value="${company.id}">${company.name}</option>
                                            </#list>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>所属项目</label>
                                        <select id="pid" class="form-control"  style="width: 150px;">
                                            <option value="">全部</option>
                                            <option value="-1">未绑定</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>所属分组</label>
                                        <select id="groupid" class="form-control"  style="width: 150px;">
                                            <option value="">全部</option>
                                            <option value="-1">未绑定</option>
                                        </select>
                                    </div>
                                    <button class="btn btn-success"  id="search" type="button" onclick="Staff.search()">搜索</button>
                                    <button class="btn btn-success" type="button" onclick="Staff.resetSearch()">重置</button>
                                    <button class=" btn btn-success" data-auth="setAll" type="button" onclick="Staff.setAll()">批量目标设定</button>
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

<#--多设定弹框-->
<div class="modal fade" id="editModalAll" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">批量目标设定</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="edit-formAll">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">所属公司</label>
                        <div class="col-sm-9">
                            <select id="company" class="form-control" onchange="Staff.changeCompanyV2();" style="width: 150px;" name="companyid">
                                <option value="">请选择</option>
                                            <#list companys as company>
                                                <option value="${company.id}">${company.name}</option>
                                            </#list>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">所属项目</label>
                        <div class="col-sm-9">
                            <select id="project" class="form-control"  style="width: 150px;" name="projectId" onchange="Staff.changeProjectV2()">
                                <option value="">请选择</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">所属分组</label>
                        <div class="col-sm-9">
                            <select id="group" class="form-control"  style="width: 150px;" name="groupid">
                                <option value="">请选择</option>
                            </select>
                        </div>

                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">工作天数</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="workDays">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">成单量月目标(单)</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="leads">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">成单率月目标(%)</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="leadsPercent">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">接通量月目标(通)</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="connectNum">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">通话时长月目标(分钟)</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="duration">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Staff.setInAll()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--设定弹框-->
<div class="modal fade" id="editModalOne" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">坐席目标设定</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="edit-formOne">
                    <input type="hidden" name="staffId">
                    <input type="hidden" name="projectId">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">工作天数</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="workDays">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">成单量月目标(单)</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="leads">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">成单率月目标(%)</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="leadsPercent">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">接通量月目标(通)</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="connectNum">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">通话时长月目标(分钟)</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="duration">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Staff.setIn()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<#--修改设定弹框-->
<div class="modal fade" id="editModalTwo" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="modalTitle">坐席目标修改</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="edit-formTwo">
                    <input type="hidden" name="staffId">
                    <input type="hidden" name="projectId">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">工作天数</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="workDays">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">成单量月目标(单)</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="leads">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">成单率月目标(%)</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="leadsPercent">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">接通量月目标(通)</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="connectNum">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">通话时长月目标(分钟)</label>
                        <div class="col-sm-9" >
                            <input type="text" class="form-control" name="duration">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Staff.updateSet()">确定</button>
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
                <h4 class="modal-title" id="modalTitle">编辑</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="edit-form">
                    <input type="hidden" name="id">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">姓名</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">手机号</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="phone">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Staff.update()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#--修改密码弹框-->
<div class="modal fade" id="editPasswordStaffModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" >修改密码</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="passwordEditStaff-form">
                    <input  type="hidden" name="id">
                    <#--<div class="form-group">-->
                        <#--<label class="col-sm-2 control-label">旧密码</label>-->
                        <#--<div class="password password1 col-sm-10">-->
                            <#--<input type="password" class="form-control" name="oldPassword" required="">-->
                            <#--<i class="fa fa-eye-slash" id="type1"></i>-->
                        <#--</div>-->
                    <#--</div>-->
                    <div class="form-group">
                        <label class="col-sm-2 control-label">新密码</label>
                        <div class="password password2 col-sm-10">
                            <input type="password" class="form-control" name="newPassword" required="">
                            <i class="fa fa-eye-slash" id="type2"></i>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">确认密码</label>
                        <div class="password password3 col-sm-10">
                            <input type="password" class="form-control" name="repeatNewPassword" required="">
                            <i class="fa fa-eye-slash" id="type3"></i>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Staff.updatePassword()">确定</button>
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
                <h4 class="modal-title" id="modalTitle">编辑用户</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="editZX-form">
                    <#--<input type="hidden" id="companyId" name="companyId">-->
                    <div class="form-group" >
                        <label class="col-sm-2 control-label">公司名称</label>
                        <select id="companyid2" name="companyId" class="form-control" onclick="Staff.checkCompany()" style="width: 150px;">
                            <#list companys as company>
                                <option value="${company.id}">${company.name}</option>
                            </#list>
                        </select>
                    </div>

                    <select class="form-control dual_select" multiple name="selectExtIds">
                    </select>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="Staff.updateZX()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<#include "/templates/layout/commonjs.ftl">
<script src="/static/js/bootstrap-datetimepicker.min.js"></script>
<script src="/static/js/plugins/chosen/chosen.jquery.js"></script>
<script src="/static/modular/manager/staff/staff.js"></script>
<script src="/static/js/plugins/dualListbox/jquery.bootstrap-duallistbox.js"></script>
<script type="text/javascript">

</script>
</body>
</html>
