package com.qianqian.util;

import com.qianqian.entity.mysql.oauth.Menu;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author fonlin
 * @date 2018/4/22
 */
public class MenuTreeBuilder<M extends Menu> {

    private List<M> nodes;


    public MenuTreeBuilder(List<M> all) {
        //过滤出菜单类型
        this.nodes = all.stream().filter(menu -> menu.getType() == 1).collect(Collectors.toList());
        //排序
        this.nodes.sort(Comparator.comparingInt(M::getSequence));
    }


    public List<ActivableMenu> buildMenuTree() {
        List<ActivableMenu> firstLevelMenus = new ArrayList<>();
        //找出所有第一级菜单
        for (M each : nodes) {
            if (StringUtils.isEmpty(each.getPcode())) {
                firstLevelMenus.add(transToActivableMenu(each));
            }
        }
        //循环一级菜单找出子菜单
        for (ActivableMenu nestedMenu : firstLevelMenus) {
            buildChildren(nestedMenu);
        }
        return firstLevelMenus;
    }

    private void buildChildren(ActivableMenu parent) {
        List<M> children = getChildren(parent.getCode());
        if (!CollectionUtils.isEmpty(children)) {
            for (M child : children) {
                ActivableMenu nestedChild = transToActivableMenu(child);
                buildChildren(nestedChild);
                parent.getChildren().add(nestedChild);
            }
        }
    }

    private List<M> getChildren(String parent) {
        List<M> children = new ArrayList<>();
        for (M temp : nodes) {
            if (temp.getPcode() != null && temp.getPcode().equals(parent)) {
                children.add(temp);
            }
        }
        return children;
    }

    private ActivableMenu transToActivableMenu(M menu) {
        ActivableMenu nestedMenu = new ActivableMenu();
        nestedMenu.setId(menu.getId());
        nestedMenu.setUrl(menu.getUrl());
        nestedMenu.setName(menu.getName());
        nestedMenu.setCode(menu.getCode());
        nestedMenu.setIcon(menu.getIcon());
        nestedMenu.setChildren(new ArrayList<>());
        nestedMenu.setDisplayed(menu.getDisplayed());
        return nestedMenu;
    }

}
