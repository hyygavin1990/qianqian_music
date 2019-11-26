package com.qianqian.util;

import java.util.List;

/**
 * 代表一个资源组，即页面上一个菜单之内按钮资源
 *
 * @author fonlin
 * @date 2018/6/27
 */
public class Resources {

    /**
     * 对应菜单code
     */
    private String domain;

    /**
     * 一张页面上的按钮资源
     */
    private List<Resource> resources;

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public List<Resource> getResources() {
        return resources;
    }

    public void setResources(List<Resource> resources) {
        this.resources = resources;
    }
}
