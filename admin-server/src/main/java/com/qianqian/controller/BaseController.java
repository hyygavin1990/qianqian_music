package com.qianqian.controller;

import com.qianqian.core.Result;
import com.qianqian.security.UserDetail;
import com.qianqian.util.ActivableMenu;
import com.qianqian.util.SpringSecurityUtil;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.util.CollectionUtils;

import java.util.List;

/**
 * @author fonlin
 * @date 2018/1/5
 */
public class BaseController {

    protected final Result OK = new Result();

    //设置菜单激活状态？？？？有其他好办法吗
    protected List<ActivableMenu> getMenus(String domain) {
        UserDetail userDetail = SpringSecurityUtil.getUser();
        List<ActivableMenu> menus = userDetail.getActivableMenus();
        clearActive(menus);
        for (ActivableMenu activableMenu : menus) {
            activableMenu.setActive(activeMenu(activableMenu, domain));
        }
        return menus;
    }

    private void clearActive(List<ActivableMenu> menus) {
        for (ActivableMenu menu : menus) {
            menu.setActive(false);
            if (!CollectionUtils.isEmpty(menu.getChildren())) {
                clearActive(menu.getChildren());
            }
        }
    }

    private boolean activeMenu(ActivableMenu menu, String domain) {
        //如果是父级菜单
        if ("#".equals(menu.getUrl())) {
            List<ActivableMenu> children = menu.getChildren();
            if (!CollectionUtils.isEmpty(children)) {
                for (ActivableMenu child : children) {
                    if (activeMenu(child, domain)) {
                        child.setActive(true);
                        return true;
                    }
                }
            }
        } else {
            if (ArrayUtils.contains(menu.getUrl().split("/"), domain)) {
                menu.setActive(true);
                return true;
            }
        }
        return false;
    }


}
