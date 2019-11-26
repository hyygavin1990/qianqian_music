package com.qianqian.security;

import com.alibaba.fastjson.JSONArray;
import com.qianqian.constant.Constants;
import com.qianqian.constant.LoginType;
import com.qianqian.core.log.LogManager;
import com.qianqian.core.log.LogTaskFactory;
import com.qianqian.util.*;
import com.qianqian.entity.mysql.oauth.Menu;
import com.qianqian.service.oauth.MenuService;
import com.qianqian.util.http.HttpUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.util.CollectionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {


    @Override
    public void setDefaultTargetUrl(String defaultTargetUrl) {
        super.setDefaultTargetUrl(defaultTargetUrl);
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        UserDetail userDetail = SpringSecurityUtil.getUser();

        //记录登录日志
        LogManager.execute(LogTaskFactory.login(LoginType.SUCCESS, userDetail.getId(), userDetail.getUsername(), HttpUtil.getIp()));

        //如果是初始密码跳到修改密码页
        if (new BCryptPasswordEncoder().matches(Constants.DEFAULT_PASSWORD,userDetail.getPassword())){
            getRedirectStrategy().sendRedirect(request, response, "/initPassword");
        } else {
            MenuService menuService = SpringContextUtil.getBean(MenuService.class);
            //所有有权限看到的菜单（包括按钮等）
            List<Menu> all;
            //如果是超级管理员
            if (Constants.SUPER_ADMIN.equals(userDetail.getUsername())) {
                all = menuService.selectAll();
            } else {
                all = menuService.selectAllEnabledByUser(userDetail.getId());
            }
            //去重
            all = new ArrayList<>(new HashSet<>(all));
            //构造菜单树
            List<ActivableMenu> activableMenus = new MenuTreeBuilder<>(all).buildMenuTree();
            if (!CollectionUtils.isEmpty(activableMenus)) {
                String defaultUrl = activableMenus.get(0).getUrl();
                setDefaultTargetUrl(defaultUrl);
            }
            //获取页面对应的资源列表
            List<Resources> resourcesList = getResourcesList(all, activableMenus);
            userDetail.setActivableMenus(activableMenus);
            userDetail.setAll(all);
            userDetail.setResourcesList(resourcesList);
            JSONArray jsonArray = new JSONArray();
            jsonArray.addAll(resourcesList);
            request.getSession().setAttribute("permissions", jsonArray.toString());
            request.getSession().setAttribute("nickname", userDetail.getNickname());
            request.getSession().setAttribute("id", userDetail.getId());
            super.onAuthenticationSuccess(request, response, authentication);
        }
    }

    private List<Resources> getResourcesList(List<Menu> all, List<ActivableMenu> activableMenus) {
        List<Resources> resourcesList = new ArrayList<>();
        for (ActivableMenu menu : activableMenus) {
            //如果不是父级菜单
            if (!"#".equals(menu.getUrl())) {
                resourcesList.add(getResources(all, menu));
            } else {
                //如果是父级菜单，循环子菜单
                //注意，这里可以这么写是因为系统只支持两级菜单
                for (ActivableMenu m : menu.getChildren()) {
                    resourcesList.add(getResources(all, m));
                }
            }
        }

        return resourcesList;
    }

    private Resources getResources(List<Menu> all, ActivableMenu m) {
        List<Resource> firstLevel = getResourceChildren(all, m.getCode());
        for (Resource resource : firstLevel) {
            getResourceList(all, resource);
        }
        Resources resources = new Resources();
        resources.setDomain(m.getCode());
        resources.setResources(firstLevel);
        return resources;
    }

    private void getResourceList(List<Menu> all, Resource parent) {
        List<Resource> children = getResourceChildren(all, parent.getCode());
        if (!CollectionUtils.isEmpty(children)) {
            for (Resource child : children) {
                getResourceList(all, child);
            }
        }
        parent.getChildren().addAll(children);
    }

    private List<Resource> getResourceChildren(List<Menu> all, String pcode) {
        List<Resource> children = new ArrayList<>();
        for (Menu menu : all) {
            if (menu.getPcode() != null && menu.getPcode().equals(pcode)) {
                Resource resource = new Resource();
                resource.setCode(menu.getCode());
                resource.setName(menu.getName());
                resource.setChildren(new ArrayList<>());
                children.add(resource);
            }
        }
        return children;
    }


}
