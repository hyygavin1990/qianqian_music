<nav class="navbar-default navbar-static-side my-block" role="navigation">
    <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
            <!--个人中心模块-->
            <li class="nav-header">
                <div class="dropdown profile-element">
                    <span>
                        <img alt="image" class="img-circle" src="/static/img/profile_small.jpg"/>
                    </span>
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#" aria-expanded="false">
                        <span class="clear">
                            <span class="block m-t-xs">
                                <strong class="font-bold">${nickname}</strong>
                                <b class="caret"></b>
                            </span>
                        </span>
                    </a>
                    <ul class="dropdown-menu animated fadeInRight m-t-xs">
                        <li>
                            <a href="#" onclick="createPasswordModal();">
                                <i class="fa fa-pencil-square-o"></i><b>修改密码</b>
                            </a>
                        </li>
                        <li>
                            <a href="/logout">
                                <i class="fa fa-sign-out"></i><b>退出</b>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="logo-element">
                    <i class="fa fa-bars navbar-minimalize" style="cursor: pointer"></i>
                </div>
            </li>

            <#--暂定只支持二级菜单-->
            <#list menus as menu>
                <#assign children = menu.children />
                <#if menu.displayed>
                    <#if children?? && (children?size > 0)>
                        <li class="${menu.active?string('active', '')}">
                            <a href="${menu.url}">
                                <i class="fa ${menu.icon!"fa-th-large"}"></i> <span class="nav-label">${menu.name}</span> <span
                                    class="fa arrow"></span>
                            </a>
                            <ul class="nav nav-second-level collapse ${menu.active?string('in', '')}">
                                <#list children as child>
                                    <li class="${child.active?string('active', '')}"><a href="${child.url}">${child.name}</a></li>
                                </#list>
                            </ul>
                        </li>
                    <#else>
                        <li class="${menu.active?string('active', '')}">
                            <a href="${menu.url}"><i class="fa ${menu.icon!"fa-th-large"}"></i> <span class="nav-label">${menu.name}</span></a>
                        </li>
                    </#if>
                </#if>
            </#list>

        </ul>
    </div>
</nav>

<#--编辑弹框-->
<div class="modal fade" id="editPasswordModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" >修改密码</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="passwordEdit-form">
                    <input type="hidden" value="${id}" name="userId">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">旧密码</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" name="oldPassword" required="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">新密码</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" name="newPassword" required="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">确认密码</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" name="repeatNewPassword" required="">
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" onclick="updatePassword()">确定</button>
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">关闭</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>